export type PrimitiveValue = number | string | boolean;
export type RangePredicateOp = '<' | '>' | '<=' | '>=' | '!=' | '=';

export interface EvaluationOptions {
    portName?: string;
    depth?: number;
}

export interface NodePortPair {
    node: SyntaxNode;
    port?: string;
}

export interface SyntaxNode {
    evaluate(options?: EvaluationOptions): string;
}

export class PrimitiveValueNode implements SyntaxNode {
    protected value: PrimitiveValue;

    constructor(value: PrimitiveValue) {
        this.value = value;
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
    protected attributeInputs: { [key: string]: NodePortPair };
    /** Names of ports that have outgoing links */
    protected attributeOutputs: string[];

    constructor(
        entityType: string,
        variableName: string,
        attributeInputs: { [key: string]: NodePortPair },
        attributeOutputs: string[]
    ) {
        this.entityType = entityType;
        this.variableName = variableName;
        this.attributeInputs = attributeInputs;
        this.attributeOutputs = attributeOutputs;
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

    evaluate(options?: EvaluationOptions): string {
        if (options?.portName) {
            if (options.portName === 'ref') {
                return this.getEnityVariableName();
            }
            return this.getAttributeVariableName(options.portName);
        } else {
            const lines: string[] = [];

            for (const key of Object.keys(this.attributeInputs)) {
                const { node, port } = this.attributeInputs[key];

                const value = node.evaluate({ portName: port });

                const attribute_name = `"${this.entityType}/${key}"`;
                lines.push(
                    `[${this.getEnityVariableName()} ${attribute_name} ${value}]`
                );
            }

            for (const portName of this.attributeOutputs) {
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

    constructor(
        entity: EntitySyntaxNode,
        required?: boolean,
        hidden?: boolean
    ) {
        this.entity = entity;
        this.required = !!required;
        this.hidden = !!hidden;
    }

    evaluate(): string {
        return this.entity.getEnityVariableName();
    }
}

export class CountSyntaxNode implements SyntaxNode {
    protected entity: EntitySyntaxNode;
    protected attributeName: string;

    constructor(entity: EntitySyntaxNode, attributePortId: string) {
        this.entity = entity;
        this.attributeName = attributePortId;
    }

    getOutputVariableName(): string {
        return `${this.entity.getAttributeVariableName(
            this.attributeName
        )}_count`;
    }

    evaluate(options?: EvaluationOptions): string {
        if (options?.portName === 'out') {
            return this.getOutputVariableName();
        }

        return `[(?count_attr $ ${this.entity.getEnityVariableName()} "${
            this.attributeName
        }") ${this.getOutputVariableName()}]\n`;
    }
}

export class SocialConnectionSyntaxNode implements SyntaxNode {
    protected subject: EntitySyntaxNode;
    protected other: EntitySyntaxNode;
    protected relationshipType: string;

    constructor(
        relationshipType: string,
        subject: EntitySyntaxNode,
        other: EntitySyntaxNode
    ) {
        this.relationshipType = relationshipType;
        this.subject = subject;
        this.other = other;
    }

    evaluate(): string {
        return `[${this.subject.getEnityVariableName()} "person/${
            this.relationshipType
        }" ${this.other.getEnityVariableName()}]`;
    }
}

export class RangePredicateSyntaxNode implements SyntaxNode {
    protected op: RangePredicateOp;
    protected first: NodePortPair;
    protected second: NodePortPair;

    constructor(
        op: RangePredicateOp,
        first: NodePortPair,
        second: NodePortPair
    ) {
        this.op = op;
        this.first = first;
        this.second = second;
    }

    evaluate(options?: EvaluationOptions): string {
        const firstValue = this.first.node.evaluate({
            portName: this.first.port,
        });
        const secondValue = this.second.node.evaluate({
            portName: this.second.port,
        });

        const prefix = options?.depth ? '\t'.repeat(options.depth) : '';
        const suffix = options?.depth === 0 ? '\n' : '';

        return `${prefix}[(${this.op} ${firstValue} ${secondValue})]${suffix}`;
    }
}

export class LogicalSyntaxNode implements SyntaxNode {
    protected op: 'and' | 'or' | 'not';
    protected inputNodes: SyntaxNode[];

    constructor(op: 'and' | 'or' | 'not', inputNodes: SyntaxNode[]) {
        this.op = op;
        this.inputNodes = inputNodes;
    }

    evaluate(): string {
        const clauses: string[] = [];

        for (const node of this.inputNodes) {
            clauses.push(node.evaluate());
        }

        return `(${this.op}\n${clauses.join('\n')})`;
    }
}

export class LogicalJoinSyntaxNode implements SyntaxNode {
    protected op: 'not-join' | 'or-join';
    protected outerEntities: EntitySyntaxNode[];
    protected innerEntities: EntitySyntaxNode[];
    protected clauseNodes: SyntaxNode[];

    constructor(
        op: 'not-join' | 'or-join',
        outerEntities: EntitySyntaxNode[],
        innerEntities: EntitySyntaxNode[],
        clauseNodes: SyntaxNode[]
    ) {
        this.op = op;
        this.outerEntities = outerEntities;
        this.innerEntities = innerEntities;
        this.clauseNodes = clauseNodes;
    }

    evaluate(): string {
        const joinVariables = `[${this.outerEntities
            .map((v) => v.getEnityVariableName())
            .join(' ')}]`;

        const clauses: string[] = [];

        for (const node of this.innerEntities) {
            clauses.push(node.evaluate());
        }

        for (const node of this.clauseNodes) {
            clauses.push(node.evaluate());
        }

        return `(${this.op} ${joinVariables}\n${clauses.join('\n')})`;
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
    const ruleHeader = `(${pattern.name} ${findVariables.join(
        ' '
    )} ${requiredVarsStr})`;
    return `${ruleHeader}\n${pattern.whereClauses}`;
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

export class PatternSyntaxTree {
    protected name: string;
    protected leafNodes: SyntaxNode[];
    protected variableNodes: SyntaxNode[];

    constructor(
        name: string,
        nodes?: { leaf?: SyntaxNode[]; variables: SyntaxNode[] }
    ) {
        this.name = name;
        this.leafNodes = nodes?.leaf ? nodes.leaf : [];
        this.variableNodes = nodes?.variables ? nodes.variables : [];
    }

    addLeafNode(node: SyntaxNode) {
        this.leafNodes.push(node);
    }

    addVariableNode(node: VariableSyntaxNode) {
        this.variableNodes.push(node);
    }

    evaluate(): string {
        const variables = this.variableNodes
            .map((node) => node.evaluate())
            .join(' ');

        const clauses = this.leafNodes
            .map((node) => node.evaluate())
            .join('\n');

        return `[:find ${variables}\n:in $ %\n:where\n${clauses}]`;
    }

    compile(): CompiledPattern {
        const whereClauses: string[] = [];
        const parameters: PatternParam[] = [];

        for (const node of this.variableNodes) {
            parameters.push({
                name: node.evaluate(),
            });
        }

        for (const node of this.leafNodes) {
            whereClauses.push(node.evaluate());
        }

        return {
            name: this.name,
            parameters,
            whereClauses: whereClauses.join('\n'),
        };
    }
}
