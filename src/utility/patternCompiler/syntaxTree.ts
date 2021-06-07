import { VariableNodeModelOptions } from '../../nodes/VariableNode';
import { SerializedLinkModel, SerializedNodeModel } from '../serialization';
import { isValidVariableName } from '../utils';

export interface Param<T = any> {
	/** Port Name */
	portName: string;
	/** Literal value */
	value?: T;
	/** Link ID */
	dependency?: string;
}

export abstract class SyntaxTreeNode {
	protected params: Map<string, Param>;

	constructor() {
		this.params = new Map();
	}

	getParams(): Param[] {
		return Array.from(this.params.values());
	}

	addDependency(portID: string, portName: string, dependency: string): void {
		this.params.set(portID, { portName, dependency });
	}

	get(key: string): Param {
		return this.params.get(key);
	}
}

export type EntityType = 'person' | 'relationship' | 'event' | 'business' | 'occupation';

export class EntitySyntaxNode extends SyntaxTreeNode {
	protected entityType: string;
	protected entityName: string;

	constructor(entityType: EntityType, name: string) {
		super();
		this.entityType = entityType;
		this.entityName = name;
	}

	getName(): string {
		return this.entityName;
	}

	addAttribute(portID: string, portName: string, variableName: string): void {
		this.params.set(portID, { portName, value: variableName });
	}

	toString(): string {
		let str = `[${this.entityName} "sim/type" "${this.entityType}"]\n`;
		for (const [, param] of this.params) {
			str += `[${this.entityName} "${this.entityType}/${param.portName}" ${param.value}]\n`;
		}
		return str;
	}
}

export class PrimitiveSyntaxNode extends SyntaxTreeNode {
	constructor(portID: string, value: number | string | boolean) {
		super();
		this.params.set(portID, { portName: 'out', value });
	}

	toString(): string {
		for (const [, value] of this.params) {
			return String(value.value);
		}
		return '';
	}
}

export class OutputSyntaxNode extends SyntaxTreeNode {
	protected required: boolean;
	protected hidden: boolean;

	constructor(required: boolean, hidden: boolean) {
		super();
		this.required = required;
		this.hidden = hidden;
	}

	addNameDependency(param: Param): void {
		this.params.set('name', param);
	}

	isRequired(): boolean {
		return this.hidden;
	}

	isHidden(): boolean {
		return this.hidden;
	}
}

export class CountSyntaxNode extends SyntaxTreeNode {
	protected in: Param;
	protected out: Param;

	setInput(portID: string, dependency: Param): void {
		this.in = dependency;
		this.params.set(portID, dependency);
	}

	setOutputName(portID: string, name: string): void {
		this.out = { portName: 'out', value: name };
		this.params.set(portID, this.out);
	}

	toString(): string {
		return `[(count ${this.in.value}) ${this.out.value}]`;
	}
}

export class SocialConnSyntaxNode extends SyntaxTreeNode {
	protected subjectName: string;
	protected relationshipType: string;
	protected other: Param;

	constructor(relationshipType: string) {
		super();
		this.relationshipType = relationshipType;
	}

	setSubject(subject: Param): void {
		this.params.set('subject', subject);
	}

	setOther(portID: string, other: Param): void {
		this.other = other;
		this.params.set(portID, other);
	}

	setSubjectName(subject: string): void {
		this.subjectName = subject;
	}

	toString(): string {
		return `[${this.subjectName} "person/${this.relationshipType}" ${this.other?.value})]\n`;
	}
}

export class InequalitySyntaxNode extends SyntaxTreeNode {
	protected symbol: string;
	protected first: Param;
	protected second: Param;

	constructor(symbol: string, first: Param, second: Param) {
		super();
		this.symbol = symbol;
		this.first = first;
		this.second = second;
		this.params.set('first', first);
		this.params.set('second', second);
	}

	toString(): string {
		return `[(${this.symbol} ${this.first?.value} ${this.second?.value})]\n`;
	}
}

export type SyntaxTreeNodeTypes = PrimitiveSyntaxNode | EntitySyntaxNode | InequalitySyntaxNode;

export interface PatternParam {
	/** Name of the variable */
	name: string;
	/** When used as a rule, this variable must be unified in the query first */
	required?: boolean;
	/** when used as a query, this variable is added to the with-clause */
	hidden?: boolean;
}

/** Compiled JSON Data for reusable query patterns */
export interface CompiledPattern {
	/** Parameter variables for rules/variables for query's find-spec */
	parameters: PatternParam[];
	/** :Where clauses used in rule/query */
	whereClauses: string;
	/** Name of this pattern when used as a rule */
	name: string;
}

export class PatternSyntaxTree {
	private usedNames: Set<string> = new Set();
	private dependencies: Map<string, SerializedLinkModel> = new Map();
	private nodes: Map<string, SyntaxTreeNodeTypes> = new Map();

	/** Insert dependency link between ports */
	addDependencyLink(link: SerializedLinkModel): void {
		this.dependencies.set(link.id, link);
	}

	/** Add a variable node to the syntax tree */
	insertVariableNode(node: SerializedNodeModel & VariableNodeModelOptions): void {
		const name = node.name;
		if (!this.isVariableNameTaken(node.name)) {
			const varNode = new PrimitiveSyntaxNode(node.ports[0].id, `?${name}`);
			this.nodes.set(node.id, varNode);
		} else {
			throw new Error(`Duplicate variable name '${name}' in pattern`);
		}
	}

	insertPrimitiveNode(value: any, node: SerializedNodeModel) {
		const syntaxNode = new PrimitiveSyntaxNode(node.ports[0].id, value);
		this.nodes.set(node.id, syntaxNode);
	}

	insertEntityNode(entityType: EntityType, entityName: string, node: SerializedNodeModel): void {
		const syntaxNode = new EntitySyntaxNode(entityType, entityName);
		for (const port of node.ports) {
			if (port.links.length) {
				const portVarName = `${entityName}_${port.name}`;
				syntaxNode.addAttribute(port.id, port.name, portVarName);
			}
		}
		this.nodes.set(node.id, syntaxNode);
	}

	insertOutputNode(required: boolean, hidden: boolean, node: SerializedNodeModel): void {
		// if (this.isVariableNameTaken(name)) {
		// 	throw new Error(`Duplicate output variable name '${name}'`);
		// } else {
		// 	this.usedNames.add(name);
		// }

		// if (!isValidVariableName(name)) {
		// 	throw new Error(`Invalid variable name '${name}' contains special characters`);
		// }

		if (node.ports[0].links.length) {
			const syntaxNode = new OutputSyntaxNode(required, hidden);
			syntaxNode.addNameDependency({
				portName: 'in',
				dependency: node.ports[0].links[0],
			});
			this.nodes.set(node.id, syntaxNode);
		}
	}

	insertInequalityNode(symbol: string, node: SerializedNodeModel): void {
		if (node.ports[0].links.length < 1) {
			throw new Error('Inequality node missing first input');
		}
		if (node.ports[1].links.length < 1) {
			throw new Error('Inequality node missing second input');
		}
		const syntaxNode = new InequalitySyntaxNode(
			symbol,
			{
				portName: node.ports[0].name,
				dependency: node.ports[0].links[0],
			},
			{
				portName: node.ports[1].name,
				dependency: node.ports[1].links[0],
			}
		);
		this.nodes.set(node.id, syntaxNode);
	}

	insertCountNode(name: string, node: SerializedNodeModel): void {
		const [input] = node.ports.filter((p) => p.name === 'in');
		const [output] = node.ports.filter((p) => p.name === 'out');
		if (!input.links.length) {
			throw new Error('Count node missing input');
		}
		if (!output.links.length) {
			throw new Error('Count node missing output');
		}
		const syntaxNode = new CountSyntaxNode();
		syntaxNode.setInput(input.id, { portName: input.name, dependency: input.links[0] });
		syntaxNode.setOutputName(output.id, name);
		this.nodes.set(node.id, syntaxNode);
	}

	insertSocialConnNode(relationshipType: string, node: SerializedNodeModel): void {
		if (node.ports[0].links.length < 1) {
			throw new Error('Social Connection node missing first input');
		}
		if (node.ports[1].links.length < 1) {
			throw new Error('Social Connection node missing second input');
		}
		const syntaxNode = new SocialConnSyntaxNode(relationshipType);
		syntaxNode.setSubject({
			portName: node.ports[0].name,
			dependency: node.ports[0].links[0],
		});
		syntaxNode.setOther(node.ports[1].id, {
			portName: node.ports[1].name,
			dependency: node.ports[1].links[0],
		});
		this.nodes.set(node.id, syntaxNode);
	}

	parseTree(patternName: string): CompiledPattern {
		let whereClauses = '';
		const parameters: PatternParam[] = [];

		for (const [, node] of this.nodes) {
			this.propagateDependencies(node);
			if (node instanceof EntitySyntaxNode) {
				whereClauses += node.toString();
			} else if (node instanceof OutputSyntaxNode) {
				const depLink = this.dependencies.get(node.get('name').dependency);
				const depNode = this.nodes.get(depLink.source);
				if (depNode instanceof EntitySyntaxNode) {
					parameters.push({
						name: depNode.getName(),
						hidden: node.isHidden(),
						required: node.isRequired(),
					});
				} else {
					throw new Error('Output node needs to be attached to an Entity Node');
				}
			} else if (node instanceof InequalitySyntaxNode) {
				whereClauses += node.toString();
			} else if (node instanceof CountSyntaxNode) {
				//
			} else if (node instanceof SocialConnSyntaxNode) {
				const depLink = this.dependencies.get(node.get('subject').dependency);
				const depNode = this.nodes.get(depLink.source);
				if (depNode instanceof EntitySyntaxNode) {
					node.setSubjectName(depNode.getName());
					whereClauses += node.toString();
				} else {
					throw new Error('Social Conncection node needs to be attached to an Person Node');
				}
			}
		}
		return {
			name: patternName,
			parameters,
			whereClauses,
		};
	}

	private propagateDependencies(node: SyntaxTreeNode): void {
		const params: Param[] = node.getParams();
		for (const param of params) {
			this.findDependency(param);
		}
	}

	/** Traces the dependency tree to find the value of a variable */
	private findDependency(param: Param): void {
		let value: any;
		let focus = param;
		const dependencyStack = [];

		while (focus) {
			if (focus.value) {
				value = focus.value;
				break;
			} else if (focus.dependency) {
				dependencyStack.push(focus);
				// Track down the param this has a dependency on
				const depLink = this.dependencies.get(focus.dependency);
				const sourceNodeID = depLink.source;
				focus = this.nodes.get(sourceNodeID).get(depLink.sourcePort);
			}
		}

		for (const param of dependencyStack) {
			param.value = value;
		}
	}

	/** Check if a variable name has already been used */
	private isVariableNameTaken(name: string): boolean {
		return this.usedNames.has(name);
	}
}
