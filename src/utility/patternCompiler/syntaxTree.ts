import { SerializedLinkModel, SerializedNodeModel } from '../serialization';

export type PrimitiveValue = number | string | boolean;

export type EntityType = 'person' | 'relationship' | 'event' | 'business' | 'occupation';

export type InequalityOp = '<' | '>' | '<=' | '>=' | '!=' | '=';

interface SyntaxTreeNode {
	toJSON(): Record<string, unknown>;
}

interface ClauseNode {
	toClause(): string;
}

export class EntitySyntaxNode implements SyntaxTreeNode, ClauseNode {
	protected entityType: EntityType;
	protected entityName: string;
	/** MAP port IDs to attribute names */
	protected attributes: Map<string, string>;

	constructor(entityType: EntityType, name: string, attributes: Map<string, string>) {
		this.entityType = entityType;
		this.entityName = name;
		this.attributes = attributes;
	}

	getType(): EntityType {
		return this.entityType;
	}

	getName(): string {
		return this.entityName;
	}

	getEntityVarName(): string {
		return this.entityName;
	}

	getAttrVarName(attr: string): string {
		return `${this.getEntityVarName()}_attr`;
	}

	getAttrNameByPortID(portID: string): string {
		return this.attributes.get(portID);
	}

	toClause(): string {
		let str = `[${this.entityName} "sim/type" "${this.entityType}"]\n`;
		for (const [, attrName] of this.attributes) {
			str += `[${this.entityName} "${this.entityType}/${attrName}" ${this.getAttrVarName(attrName)}]\n`;
		}
		return str;
	}

	toJSON(): Record<string, unknown> {
		throw new Error('Method not implemented.');
	}
}

export class PrimitiveSyntaxNode implements SyntaxTreeNode {

	protected value: PrimitiveValue;

	constructor(value: PrimitiveValue) {
		this.value = value;
	}

	getValue(): string {
		if (typeof(this.value) === 'string') {
			return `"${this.value}"`;
		}
		return String(this.value);
	}

	toJSON(): Record<string, unknown> {
		return {
			type: 'primitive',
			value: this.value
		}
	}
}

export class VariableSyntaxNode implements SyntaxTreeNode {
	protected entity: EntitySyntaxNode;
	protected hidden = false;
	protected required = false;

	constructor(entity: EntitySyntaxNode, required?: boolean, hidden?: boolean) {
		this.entity = entity;
		this.required = !!required;
		this.hidden = !!hidden;
	}

	getVariableName(): string {
		return this.entity.getEntityVarName();
	}

	toJSON(): Record<string, unknown> {
		return {
			type: 'variable',
			entity: this.entity.getEntityVarName()
		}
	}
}

export class CountSyntaxNode implements SyntaxTreeNode {
	protected entity: EntitySyntaxNode
	protected attr: string;


	constructor(entity: EntitySyntaxNode, attr: string) {
		this.entity = entity
		this.attr = attr
	}

	get outputVarName(): string {
		return `${this.entity.getAttrVarName(this.attr)}_count`;
	}

	toClause(): string {
		return `[(?count_attr $ ?${this.entity.getEntityVarName()} "${this.attr}") ${this.outputVarName}]\n`;
	}

	toJSON(): Record<string, unknown> {
		return {
			type: 'count',
			entity: this.entity.toJSON(),
			attr: this.attr,
		}
	}
}

export class SocialConnSyntaxNode implements SyntaxTreeNode {

	protected subject: EntitySyntaxNode;
	protected other: EntitySyntaxNode;
	protected relationshipType: string;

	constructor(relationshipType: string, subject: EntitySyntaxNode, other: EntitySyntaxNode) {
		this.relationshipType = relationshipType;
		this.subject = subject;
		this.other = other;
	}

	toClause(): string {
		return `[${this.subject.getEntityVarName()} "person/${this.relationshipType}" ${this.other.getAttrVarName('id')})]\n`;
	}

	toJSON(): Record<string, unknown> {
		throw new Error('Method not implemented.');
	}
}

export class InequalitySyntaxNode implements SyntaxTreeNode {
	protected op: InequalityOp;
	protected first: EntitySyntaxNode | PrimitiveValue;
	protected second: EntitySyntaxNode | PrimitiveValue;

	constructor(op: InequalityOp, first: EntitySyntaxNode | PrimitiveValue, second: EntitySyntaxNode | PrimitiveValue) {
		this.op = op;
		this.first = first;
		this.second = second;
	}

	toJSON(): Record<string, unknown> {
		return {
			op: this.op,
		};
	}

	toClause(): string {
		const childrenStr = this.children.map((child) => child.toClause()).join('');
		return `${childrenStr}[(${this.op} ${this.first.} ${this.valB})]\n`;
	}
}

export class LogicalOpSyntaxNode implements SyntaxTreeNode, ClauseNode {

	protected op: 'and' | 'or' | 'not';
	protected clauseNodes: SyntaxTreeNode[];

	constructor(op: 'and' | 'or' | 'not', clauseNodes: SyntaxTreeNode[]) {
		super();
		this.op = op;
		this.clauseNodes = clauseNodes
	}

	toJSON(): Record<string, unknown> {
		return {
			op: this.op,
			chilren: this.clauseNodes.map((child) => child.toJSON()),
		};
	}

	toClause(): string {
		return `(${this.op} ${this.children.map((child) => child.toClause()).join('')})\n`;
	}
}

export class LogicalJoinSyntaxNode implements SyntaxTreeNode, ClauseNode {

	protected op: 'not-join' | 'or-join';
	protected variables: EntitySyntaxNode[];
	protected clauseNodes: ClauseNode[];

	constructor(op: 'not-join' | 'or-join', variables: EntitySyntaxNode[], childClauses: ClauseNode[]) {
		this.op = op;
		this.variables = variables;
		this.clauseNodes = childClauses;
	}

	toJSON(): Record<string, unknown> {
		return {
			op: this.op,
			variables: this.variables.map((v) => v.toJSON()),
			childClauses: this.clauseNodes.map((child) => child.toJSON()),
		};
	}

	toClause(): string {
		const vars = `[${this.variables.map((v) => v.getEntityVarName()).join(' ')}]`;
		const clauses = `${this.clauseNodes.map((c) => c.toClause()).join('')}`
		return `(${this.op} ${vars}\n${clauses})`
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
	private dependencies: Map<string, SerializedLinkModel> = new Map();
	private nodes: Map<string, SyntaxTreeNode> = new Map();
	private leafNodes: SyntaxTreeNode[] = [];
	private entityNodes: EntitySyntaxNode[] = [];

	addDependencyLink(link: SerializedLinkModel): void {
		this.dependencies.set(link.id, link);
	}

	insertPrimitiveNode(value: PrimitiveValue, node: SerializedNodeModel) {
		const [outPort] = node.ports.filter((port) => port.name === 'out');

		if (!outPort) {
			throw new Error('Cannot find output port for primitive node');
		}

		const syntaxNode = new PrimitiveSyntaxNode(value);

		this.nodes.set(node.id, syntaxNode);
	}

	insertEntityNode(entityType: EntityType, entityName: string, node: SerializedNodeModel): void {
		const attributes = new Map<string, string>();

		for (const port of node.ports) {
			if (port.links.length) {
				if (port.name !== 'entity_id') {
					attributes.set(port.id, port.name);
				}
			}
		}

		const syntaxNode = new EntitySyntaxNode(entityType, entityName, attributes);

		this.nodes.set(node.id, syntaxNode);

		this.entityNodes.push(syntaxNode);
	}

	insertVariableNode(node: SerializedNodeModel, options?: {required?: boolean, hidden?: boolean}): void {
		const [inputPort] = node.ports.filter((port) => port.name === 'in');

		if (!inputPort) {
			throw new Error('Could not find input port on Output Node');
		}

		if (!inputPort.links.length) {
			throw new Error('No incoming links on output node');
		}

		if (inputPort.links.length) {




			for (const linkID of inputPort.links) {
				const depLink = this.dependencies.get(linkID);

				if (depLink.source === node.id) {
					throw new Error('Backwards connection between Ouput Node and source');
				}

				const depNode = this.nodes.get(depLink.source);

				if (!depNode) {
					throw new Error('Could not find dependecy for output');
				} else if (depNode instanceof EntitySyntaxNode) {
					const syntaxNode = new VariableSyntaxNode(depNode, options?.required, options?.hidden);
					this.nodes.set(node.id, syntaxNode);
					this.leafNodes.push(syntaxNode);
				} else {
					throw new Error('Output node needs to be attached to an Entity Node');
				}
			}


		}
	}

	insertInequalityNode(op: InequalityOp, node: SerializedNodeModel): void {
		const [valueAPort] = node.ports.filter((port) => port.name === 'valueA');
		const [valueBPort] = node.ports.filter((port) => port.name === 'valueB');
		const [outputPort] = node.ports.filter((port) => port.name === 'out');

		if (!valueAPort) {
			throw new Error("Could not find port with name 'valueA' on Inequality node.");
		} else if (valueAPort.links.length !== 1) {
			throw new Error('Incorrect number of inputs to first port of Inequality node');
		}

		if (!valueBPort) {
			throw new Error("Could not find port with name 'valueB' on Inequality node.");
		} else if (valueBPort.links.length !== 1) {
			throw new Error('Incorrect number of inputs to second port of Inequality node');
		}

		if (!outputPort) {
			throw new Error('Could not find output port with name: out');
		}

		const syntaxNode = new InequalitySyntaxNode(
			op,
			this.nodes.get(this.dependencies.get(valueAPort.links[0]))
			this.nodes.get(this.dependencies.get(valueBPort.links[0]))
		);

		// Get the values for this node
		const [inputALinkID] = valueAPort.links;
		let depLink = this.dependencies.get(inputALinkID);
		if (depLink.source === node.id) {
			throw new Error('Backwards connection between first port on Inquality');
		}

		let depNode = this.nodes.get(depLink.source);
		if (!depNode) {
			throw new Error('Could not find dependency for inequality');
		} else if (depNode instanceof EntitySyntaxNode) {
			syntaxNode.setValueA(depNode.get(depLink.sourcePort).value);
		} else if (depNode instanceof PrimitiveSyntaxNode) {
			syntaxNode.setValueA(depNode.getValue());
		} else if (depNode instanceof CountSyntaxNode) {
			syntaxNode.setValueA(depNode.getOutputVarName());
			syntaxNode.addChild(depNode);
		} else {
			throw new Error(
				`Inequality node cannot accept connection from node of type ${typeof depNode}`
			);
		}

		const [inputBLinkID] = valueBPort.links;
		depLink = this.dependencies.get(inputBLinkID);
		if (depLink.source === node.id) {
			throw new Error('Backwards connection between second port on Inquality');
		}

		depNode = this.nodes.get(depLink.source);
		if (!depNode) {
			throw new Error('Could not find dependency for inequality');
		} else if (depNode instanceof EntitySyntaxNode) {
			syntaxNode.setValueB(depNode.get(depLink.sourcePort).value);
		} else if (depNode instanceof PrimitiveSyntaxNode) {
			syntaxNode.setValueB(depNode.getValue());
		} else if (depNode instanceof CountSyntaxNode) {
			syntaxNode.setValueB(depNode.getOutputVarName());
		} else {
			throw new Error(
				`Inequality node cannot accept connection from node of type ${typeof depNode}`
			);
		}

		this.nodes.set(node.id, syntaxNode);

		if (!outputPort.links.length) {
			this.leafNodes.push(syntaxNode);
		}
	}

	// insertCountNode(node: SerializedNodeModel): void {
	// 	const [input] = node.ports.filter((p) => p.name === 'in');
	// 	const [output] = node.ports.filter((p) => p.name === 'out');

	// 	if (!input) {
	// 		throw new Error('Could not find input port with name: in');
	// 	} else if (!input.links.length) {
	// 		throw new Error('Count node missing input link');
	// 	}

	// 	if (!output) {
	// 		throw new Error('Could not find output port with name: out');
	// 	} else if (!output.links.length) {
	// 		throw new Error('Count node missing output');
	// 	}

	// 	// Get the input variable name
	// 	const depLink = this.dependencies.get(input.links[0]);

	// 	if (depLink.source === node.id) {
	// 		throw new Error('Backwards connection between Count Node and source');
	// 	}

	// 	const depNode = this.nodes.get(depLink.source);

	// 	if (!depNode) {
	// 		throw new Error('Could not find dependecy for COUNT node');
	// 	} else if (depNode instanceof EntitySyntaxNode) {
	// 		const [portAttr] = depLink.s
	// 		const syntaxNode = new CountSyntaxNode(depNode, node.ports.filter));
	// 		this.nodes.set(node.id, syntaxNode);
	// 		if (!output.links.length) {
	// 			this.leafNodes.push(syntaxNode);
	// 		}
	// 	} else {
	// 		throw new Error('Output node needs to be attached to an Entity Node');
	// 	}
	// }

	insertSocialConnNode(relationshipType: string, node: SerializedNodeModel): void {
		const [subjectPort] = node.ports.filter((port) => port.name === 'subject');
		const [otherPort] = node.ports.filter((port) => port.name === 'other');
		const [outputPort] = node.ports.filter((port) => port.name === 'out');

		if (!subjectPort) {
			throw new Error('Could not find port with name: subject');
		} else if (subjectPort.links.length !== 1) {
			throw new Error('Social Connection node missing first input');
		}

		if (!otherPort) {
			throw new Error('Could not find port with name: other');
		} else if (otherPort.links.length < 1) {
			throw new Error('Social Connection node missing second input');
		}

		if (!outputPort) {
			throw new Error('Could not find port with name: out');
		}

		let subject: EntitySyntaxNode;
		let other: EntitySyntaxNode;

		// Get the information from the entities
		const [subjectLinkID] = subjectPort.links;
		let depLink = this.dependencies.get(subjectLinkID);
		if (depLink.source === node.id) {
			throw new Error('Backwards connection on social connection subject port');
		}
		let depNode = this.nodes.get(depLink.source);
		if (!depNode) {
			throw new Error('Could not find dependency for subject');
		} else if (depNode instanceof EntitySyntaxNode && depNode.getType() === 'person') {
			subject = depNode;
		} else {
			throw new Error('Social connection only accepts Person nodes');
		}

		const [otherLinkID] = otherPort.links;
		depLink = this.dependencies.get(otherLinkID);
		if (depLink.source === node.id) {
			throw new Error('Backwards connection between first port on Inquality');
		}
		depNode = this.nodes.get(depLink.source);
		if (!depNode) {
			throw new Error('Could not find dependency for inequality');
		} else if (depNode instanceof EntitySyntaxNode && depNode.getType() === 'person') {
			other = depNode;
		} else {
			throw new Error('Social connection only accepts Person nodes');
		}

		const syntaxNode = new SocialConnSyntaxNode(relationshipType, subject, other);
		this.nodes.set(node.id, syntaxNode);
		if (!outputPort.links.length) {
			this.leafNodes.push(syntaxNode);
		}
	}

	insertLogicalOpNode(op: 'and' | 'or' | 'not', node: SerializedNodeModel): void {
		const [input] = node.ports.filter((p) => p.name === 'in');
		const [output] = node.ports.filter((p) => p.name === 'out');

		if (!input) {
			throw new Error('Could not find input port with name: in');
		} else if (!input.links.length) {
			throw new Error(`Logical '${op}' node missing input link`);
		}

		if (!output) {
			throw new Error('Could not find output port with name: out');
		}

		const clauseNodes: SyntaxTreeNode[] = [];

		for (const linkID of input.links) {
			const depLink = this.dependencies.get(linkID);
			if (depLink.source === node.id) {
				throw new Error('Backwards connection on social connection subject port');
			}
			const depNode = this.nodes.get(depLink.source);
			if (!depNode) {
				throw new Error('Could not find dependency for subject');
			} else if (
				depNode instanceof InequalitySyntaxNode ||
				depNode instanceof LogicalOpSyntaxNode ||
				depNode instanceof SocialConnSyntaxNode
			) {
				clauseNodes.push(depNode);
			} else {
				throw new Error(
					'Social connection only accepts Inequality, Logical, and Social Connection nodes'
				);
			}
		}

		const syntaxNode = new LogicalOpSyntaxNode(op, clauseNodes);

		this.nodes.set(node.id, syntaxNode);
		if (!output.links.length) {
			this.leafNodes.push(syntaxNode);
		}
	}


	insertLogicalJoinNode(op: 'not-join' | 'or-join', node: SerializedNodeModel) {
		const [variablesInput] = node.ports.filter((p) => p.name === 'variables');
		const [clauseInput] = node.ports.filter((p) => p.name === 'clauses');
		const [output] = node.ports.filter((p) => p.name === 'out');

		const variables: EntitySyntaxNode[] = [];
		const clauseNodes: ClauseNode[] = [];

		for (const linkID in variablesInput.links) {
			const depLink = this.dependencies.get(linkID);
			if (depLink.source === node.id) {
				throw new Error('Backwards connection on social connection subject port');
			}
			const depNode = this.nodes.get(depLink.source);
			if (depNode instanceof EntitySyntaxNode) {
				variables.push(depNode)
			} else {
				throw new Error(`Incorrect node type '${depNode.constructor.name}' for NOT-JOIN node`)
			}
		}

		for (const linkID in clauseInput.links) {
			const depLink = this.dependencies.get(linkID);
			if (depLink.source === node.id) {
				throw new Error('Backwards connection on social connection subject port');
			}
			const depNode = this.nodes.get(depLink.source);
			clauseNodes.push(depNode as ClauseNode)
		}


		const is_leaf = !output.links.length;

		const syntaxNode = new LogicalJoinSyntaxNode(op, variables, clauseNodes);
		if (is_leaf) {
			this.leafNodes.push(syntaxNode)
		}
	}

	parseTree(patternName: string): CompiledPattern {
		let whereClauses = '';
		const parameters: PatternParam[] = [];

		for (const node of this.leafNodes) {
			if (node instanceof VariableSyntaxNode) {
				parameters.push({
					name: node.getVariableName(),
				});
			}
			whereClauses += node.toClause()
		}

		return {
			name: patternName,
			parameters,
			whereClauses,
		};
	}
}
