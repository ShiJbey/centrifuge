import { stringify } from 'uuid';

// For debugging
const INDENT_STR = '    ';

export type PrimitiveValue = number | string | boolean;

export type RangePredicateOp = '<' | '>' | '<=' | '>=' | '!=' | '=';

export interface EvaluationOptions {
    ctx: BuildContext;
    portName?: string;
    depth: number;
}

export interface BuildContext {
    fncs: { [scopeId: string]: CountSyntaxNode[] };
    entities: { [scopeId: string]: EntitySyntaxNode[] };
    scope: string[];
    visited: Set<string>;
}

export interface NodePortPair<T extends SyntaxNode = SyntaxNode> {
    node: T;
    port: string;
}

export interface SyntaxNode {
    getID(): string;
    build(ctx: BuildContext): void;
    evaluate(options: EvaluationOptions): string;
}

export class PrimitiveValueNode implements SyntaxNode {
    protected value: PrimitiveValue;
    protected id: string;

    constructor(id: string, value: PrimitiveValue) {
        this.id = id;
        this.value = value;
    }

    getID(): string {
        return this.id;
    }

    build() {
        // pass
    }

    evaluate(): string {
        if (typeof this.value === 'string') return `"${this.value}"`;
        return `${this.value}`;
    }
}

export class EntitySyntaxNode implements SyntaxNode {
    /** Can be 'person' | 'occupation' | 'business' | 'event' | 'relationship' */
    protected entityType: string;
    /** Variable assigned to the entity */
    protected variableName: string;
    /** Map of attributes that have been given input values */
    protected attributeInputs: { [attributeName: string]: NodePortPair[] };
    /** Names of ports that have outgoing links */
    protected attributeOutputs: string[];
    /** Unique identifier */
    protected id: string;

    constructor(
        id: string,
        entityType: string,
        variableName: string,
        attributeInputs: { [key: string]: NodePortPair[] },
        attributeOutputs: string[]
    ) {
        this.id = id;
        this.entityType = entityType;
        this.variableName = variableName;
        this.attributeInputs = attributeInputs;
        this.attributeOutputs = attributeOutputs;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        if (ctx.visited) {
            if (ctx.visited.has(this.getID())) return;
        }

        ctx.visited.add(this.getID());

        ctx.entities[ctx.scope[ctx.scope.length - 1]].push(this);

        for (const attributeName of Object.keys(this.attributeInputs)) {
            for (const pair of this.attributeInputs[attributeName]) {
                pair.node.build(ctx);
            }
        }
    }

    getEntityType(): string {
        return this.entityType;
    }

    getEnityVariableName(): string {
        return `?${this.variableName}`;
    }

    getAttributeVariableName(portName: string): string {
        return `${this.getEnityVariableName()}_${portName}`;
    }

    evaluate(options: EvaluationOptions): string {
        if (options?.portName) {
            if (options.portName === 'ref') {
                return this.getEnityVariableName();
            }
            return this.getAttributeVariableName(options.portName);
        } else {
            const lines: string[] = [];

            for (const key of Object.keys(this.attributeInputs)) {
                for (const { node, port } of this.attributeInputs[key]) {
                    const value = node.evaluate({ ...options, portName: port });

                    const attribute_name = `"${this.entityType}/${key}"`;
                    lines.push(
                        `[${this.getEnityVariableName()} ${attribute_name} ${value}]`
                    );
                }
            }

            for (const portName of this.attributeOutputs) {
                if (portName === 'ref') continue;
                const attribute_name = `"${this.entityType}/${portName}"`;
                lines.push(
                    `[${this.getEnityVariableName()} ${attribute_name} ${this.getAttributeVariableName(
                        portName
                    )}]`
                );
            }

            if (
                Object.keys(this.attributeInputs).length === 0 &&
                this.attributeOutputs.length === 0
            ) {
                lines.push(
                    `[${this.getEnityVariableName()} "sim/${
                        this.entityType
                    }" "${this.entityType}"]`
                );
            }

            return lines.join('\n');
        }
    }
}

export class VariableSyntaxNode implements SyntaxNode {
    protected entity: EntitySyntaxNode;
    protected hidden = false;
    protected required = false;
    protected id: string;

    constructor(
        id: string,
        entity: EntitySyntaxNode,
        required?: boolean,
        hidden?: boolean
    ) {
        this.id = id;
        this.entity = entity;
        this.required = !!required;
        this.hidden = !!hidden;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        ctx.scope.push(this.getID());
        ctx.entities[this.getID()] = [];
        ctx.fncs[this.getID()] = [];
        this.entity.build(ctx);
        ctx.scope.pop();
    }

    getEntityVariableName(): string {
        return this.entity.getEnityVariableName();
    }

    evaluate(options: EvaluationOptions): string {
        const lines: string[] = [];
        for (const node of options.ctx.entities[this.getID()]) {
            lines.push(node.evaluate(options));
        }

        return lines.join('\n');
    }
}

export class CountSyntaxNode implements SyntaxNode {
    protected pair: NodePortPair<EntitySyntaxNode>;
    protected id: string;

    constructor(id: string, pair: NodePortPair<EntitySyntaxNode>) {
        this.id = id;
        this.pair = pair;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        ctx.fncs[ctx.scope[ctx.scope.length - 1]].push(this);
        this.pair.node.build(ctx);
    }

    getOutputVariableName(): string {
        return `${this.pair.node.getAttributeVariableName(
            this.pair.port
        )}_count`;
    }

    evaluate(options: EvaluationOptions): string {
        if (options?.portName === 'out') {
            return this.getOutputVariableName();
        }

        return `[(?count_attr $ ${this.pair.node.getEnityVariableName()} "${
            this.pair.port
        }") ${this.getOutputVariableName()}]`;
    }
}

export class SocialConnectionSyntaxNode implements SyntaxNode {
    protected subject: NodePortPair<EntitySyntaxNode>;
    protected other: NodePortPair<EntitySyntaxNode>;
    protected relationshipType: string;
    protected id: string;

    constructor(
        id: string,
        relationshipType: string,
        subject: NodePortPair<EntitySyntaxNode>,
        other: NodePortPair<EntitySyntaxNode>
    ) {
        this.id = id;
        this.relationshipType = relationshipType;
        this.subject = subject;
        this.other = other;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        this.subject.node.build(ctx);
        this.other.node.build(ctx);
    }

    evaluate(options: EvaluationOptions): string {
        const indent = `${INDENT_STR}`.repeat(options.depth);
        return `${indent}[${this.subject.node.getEnityVariableName()} "person/${
            this.relationshipType
        }" ${this.other.node.getEnityVariableName()}]`;
    }
}

export class RuleSyntaxNode implements SyntaxNode {
    protected params: NodePortPair<EntitySyntaxNode>[];
    protected ruleName: string;
    protected id: string;

    constructor(
        id: string,
        ruleName: string,
        params: NodePortPair<EntitySyntaxNode>[]
    ) {
        this.id = id;
        this.ruleName = ruleName;
        this.params = params;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        for (const param of this.params) {
            param.node.build(ctx);
        }
    }

    evaluate(options: EvaluationOptions): string {
        const indent = `${INDENT_STR}`.repeat(options.depth);
        return `${indent}(${toValidRuleName(this.ruleName)} ${this.params
            .map((pair) => pair.node.getEnityVariableName())
            .join(' ')})`;
    }
}

export class RangePredicateSyntaxNode implements SyntaxNode {
    protected op: RangePredicateOp;
    protected first: NodePortPair;
    protected second: NodePortPair;
    protected id: string;

    constructor(
        id: string,
        op: RangePredicateOp,
        first: NodePortPair,
        second: NodePortPair
    ) {
        this.id = id;
        this.op = op;
        this.first = first;
        this.second = second;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        this.first.node.build(ctx);
        this.second.node.build(ctx);
    }

    evaluate(options: EvaluationOptions): string {
        const firstValue = this.first.node.evaluate({
            ...options,
            portName: this.first.port,
        });
        const secondValue = this.second.node.evaluate({
            ...options,
            portName: this.second.port,
        });

        const indent = `${INDENT_STR}`.repeat(options.depth);
        return `${indent}[(${this.op} ${firstValue} ${secondValue})]`;
    }
}

export class LogicalSyntaxNode implements SyntaxNode {
    protected op: 'and' | 'or' | 'not';
    protected inputNodes: SyntaxNode[];
    protected id: string;

    constructor(
        id: string,
        op: 'and' | 'or' | 'not',
        inputNodes: SyntaxNode[]
    ) {
        this.id = id;
        this.op = op;
        this.inputNodes = inputNodes;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        for (const node of this.inputNodes) {
            node.build(ctx);
        }
    }

    evaluate(options: EvaluationOptions): string {
        const clauses: string[] = [];

        for (const node of this.inputNodes) {
            clauses.push(
                node.evaluate({
                    ...options,
                    depth: options.depth + 1,
                })
            );
        }

        const indent = `${INDENT_STR}`.repeat(options.depth);
        return `${indent}(${this.op}\n${indent}${clauses.join('\n' + indent)})`;
    }
}

export class LogicalJoinSyntaxNode implements SyntaxNode {
    protected op: 'not-join' | 'or-join';
    protected outerEntities: EntitySyntaxNode[];
    protected innerEntities: EntitySyntaxNode[];
    protected clauseNodes: SyntaxNode[];
    protected id: string;

    constructor(
        id: string,
        op: 'not-join' | 'or-join',
        outerEntities: EntitySyntaxNode[],
        innerEntities: EntitySyntaxNode[],
        clauseNodes: SyntaxNode[]
    ) {
        this.id = id;
        this.op = op;
        this.outerEntities = outerEntities;
        this.innerEntities = innerEntities;
        this.clauseNodes = clauseNodes;
    }

    getID(): string {
        return this.id;
    }

    build(ctx: BuildContext) {
        ctx.scope.push(this.getID());
        ctx.entities[this.getID()] = [];
        ctx.fncs[this.getID()] = [];

        for (const node of this.innerEntities) {
            node.build(ctx);
        }

        for (const node of this.clauseNodes) {
            node.build(ctx);
        }

        ctx.scope.pop();
    }

    evaluate(options: EvaluationOptions): string {
        const joinVariables = `[${this.outerEntities
            .map((v) => v.getEnityVariableName())
            .join(' ')}]`;

        const clauses: string[] = [];

        for (const node of options.ctx.entities[this.getID()]) {
            clauses.push(
                node.evaluate({
                    ...options,
                    depth: options.depth + 1,
                })
            );
        }

        for (const node of options.ctx.fncs[this.getID()]) {
            clauses.push(
                node.evaluate({
                    ...options,
                    depth: options.depth + 1,
                })
            );
        }

        for (const node of this.clauseNodes) {
            clauses.push(
                node.evaluate({
                    ...options,
                    depth: options.depth + 1,
                })
            );
        }

        const indent = `${INDENT_STR}`.repeat(options.depth);
        return `${indent}(${this.op} ${joinVariables}\n${
            indent + INDENT_STR
        }${clauses.join(`\n${indent}`)})`;
    }
}

export interface PatternParam {
    /** Name of the variable */
    name: string;
    /** When used as a rule, this variable must be unified in the query first */
    required?: boolean;
    /** when used as a query, this variable is added to the with-clause */
    hidden?: boolean;
}

export interface CompiledPattern {
    /** Parameter variables for rules/variables for query's find-spec */
    parameters: PatternParam[];
    /** :Where clauses used in rule/query */
    whereClauses: string;
    /** Name of this pattern when used as a rule */
    name: string;
}

export function toRuleString(pattern: CompiledPattern): string {
    const findVariables: string[] = [];
    const requiredVariables: string[] = [];
    for (const param of pattern.parameters) {
        if (param.required) {
            requiredVariables.push(param.name);
        } else {
            findVariables.push(param.name);
        }
    }
    const requiredVarsStr = requiredVariables.length
        ? `[${requiredVariables.join('')}]`
        : '';
    const ruleHeader = `(${toValidRuleName(pattern.name)} ${findVariables.join(
        ' '
    )} ${requiredVarsStr})`;
    return `[${ruleHeader}\n${pattern.whereClauses}]`;
}

/** Concer a Compiled pattern to a query */
export function toQueryString(pattern: CompiledPattern): string {
    const findVariables: string[] = [];
    const withVariables: string[] = [];
    for (const param of pattern.parameters) {
        if (param.hidden) {
            withVariables.push(param.name);
        } else {
            findVariables.push(param.name);
        }
    }

    const findSpec = `:find\n${findVariables.join(' ')}\n`;
    const withClause = withVariables.length
        ? `:with\n${withVariables.join(' ')}\n`
        : '';
    const whereClauses = `:where\n${pattern.whereClauses}]`;
    return `[${findSpec}${withClause}:in\n$ %\n${whereClauses}`;
}

export function toValidRuleName(name: string): string {
    return name
        .replace(/[^\w\s]/gi, '')
        .toLowerCase()
        .replace(/ +/g, '_');
}

export class PatternSyntaxTree {
    protected leafNodes: SyntaxNode[] = [];
    protected variableNodes: VariableSyntaxNode[] = [];

    addLeafNode(node: SyntaxNode) {
        this.leafNodes.push(node);
    }

    addVariableNode(node: VariableSyntaxNode) {
        this.variableNodes.push(node);
    }

    compile(patternName: string): CompiledPattern {
        const ctx: BuildContext = {
            fncs: { global: [] },
            entities: { global: [] },
            scope: ['global'],
            visited: new Set<string>(),
        };
        const whereClauses: string[] = [];
        const parameters: PatternParam[] = [];

        for (const node of this.variableNodes) {
            node.build(ctx);
        }

        for (const node of this.leafNodes) {
            node.build(ctx);
        }

        for (const node of this.variableNodes) {
            parameters.push({
                name: node.getEntityVariableName(),
            });
            whereClauses.push(node.evaluate({ ctx, depth: 0 }));
        }

        for (const node of ctx.entities['global']) {
            whereClauses.push(node.evaluate({ ctx, depth: 0 }));
        }

        for (const node of ctx.fncs['global']) {
            whereClauses.push(node.evaluate({ ctx, depth: 0 }));
        }

        for (const node of this.leafNodes) {
            if (node instanceof EntitySyntaxNode) continue;
            whereClauses.push(node.evaluate({ ctx, depth: 0 }));
        }

        return {
            name: patternName,
            parameters,
            whereClauses: whereClauses.join('\n'),
        };
    }
}
