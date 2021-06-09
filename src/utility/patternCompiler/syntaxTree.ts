import { VariableNodeModelOptions } from '../../nodes/VariableNode';
import { SerializedLinkModel, SerializedNodeModel } from '../serialization';
import { isValidVariableName } from '../utils';

export interface Param {
	/** Port Name */
	portName: string;
	/** Literal value */
	value?: number | string | boolean;
	/** Link ID */
	dependency?: string;
}

export abstract class SyntaxTreeNode {
	protected params: Map<string, Param>;
	protected children: SyntaxTreeNode[] = [];

	constructor() {
		this.params = new Map();
	}

	addChild(...node: SyntaxTreeNode[]): void {
		this.children.push(...node);
	}

	getChildren(): SyntaxTreeNode[] {
		return this.children;
	}

	getParams(): Param[] {
		return Array.from(this.params.values());
	}

	addDependency(portID: string, portName: string, dependency: string): void {
		this.params.set(portID, { portName, dependency });
	}

	get(portID: string): Param {
		return this.params.get(portID);
	}
}

export type EntityType = 'person' | 'relationship' | 'event' | 'business' | 'occupation';

export class EntitySyntaxNode extends SyntaxTreeNode {
	protected entityType: EntityType;
	protected entityName: string;

	constructor(entityType: EntityType, name: string) {
		super();
		this.entityType = entityType;
		this.entityName = name;
	}

	getType(): EntityType {
		return this.entityType;
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
	protected value: number | string | boolean;

	constructor(portID: string, value: number | string | boolean) {
		super();
		this.value = value;
		this.params.set(portID, { portName: 'value', value });
	}

	getValue(): number | string | boolean {
		return this.value;
	}

	toString(): string {
		return String(this.value);
	}
}

export class OutputSyntaxNode extends SyntaxTreeNode {
	protected required: boolean;
	protected hidden: boolean;
	protected entities: EntitySyntaxNode[] = [];

	constructor(required: boolean, hidden: boolean) {
		super();
		this.required = required;
		this.hidden = hidden;
	}

	addEntitiy(entity: EntitySyntaxNode): void {
		this.entities.push(entity);
	}

	getEntities(): EntitySyntaxNode[] {
		return this.entities;
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
	protected inputVarName: string;
	protected outputVarName: string;

	constructor(inputVarName: string) {
		super();
		this.inputVarName = inputVarName;
		this.outputVarName = `${inputVarName}_count`;
	}

	getInputVarName(): string {
		return this.inputVarName;
	}

	getOutputVarName(): string {
		return this.outputVarName;
	}

	toString(): string {
		return `[(count ${this.inputVarName}) ${this.outputVarName}]\n`;
	}
}

export class SocialConnSyntaxNode extends SyntaxTreeNode {
	protected subject: string;
	protected other: string;
	protected relationshipType: string;

	constructor(relationshipType: string) {
		super();
		this.relationshipType = relationshipType;
	}

	setSubject(subject: string): void {
		this.subject = subject;
	}

	setOther(other: string): void {
		this.other = other;
	}

	toString(): string {
		return `[${this.subject} "person/${this.relationshipType}" ${this.other})]\n`;
	}
}

export class InequalitySyntaxNode extends SyntaxTreeNode {
	protected symbol: string;
	protected first: Param;
	protected second: Param;
	protected valA: number | string | boolean;
	protected valB: number | string | boolean;

	constructor(symbol: string, first: Param, second: Param) {
		super();
		this.symbol = symbol;
		this.first = first;
		this.second = second;
		this.params.set('first', first);
		this.params.set('second', second);
	}

	setValueA(value: number | string | boolean): void {
		this.valA = value;
	}

	setValueB(value: number | string | boolean): void {
		this.valB = value;
	}

	toString(): string {
		const childrenStr = this.children.map((child) => child.toString()).join('');
		return `${childrenStr}[(${this.symbol} ${this.valA} ${this.valB})]\n`;
	}
}

export class LogicalOpSyntaxNode extends SyntaxTreeNode {
	protected op: 'and' | 'or' | 'not';

	constructor(op: 'and' | 'or' | 'not') {
		super();
		this.op = op;
	}

	toString(): string {
		return `(${this.op} ${this.children.map((child) => child.toString()).join('')})\n`;
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
	private usedNames: Set<string> = new Set();
	private dependencies: Map<string, SerializedLinkModel> = new Map();
	private nodes: Map<string, SyntaxTreeNode> = new Map();
	private leafNodes: Map<string, SyntaxTreeNode> = new Map();
	private entityNodes: EntitySyntaxNode[] = [];

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
		const [outPort] = node.ports.filter((port) => port.name === 'out');

		if (!outPort) {
			throw new Error('Cannot find output port for primitive node');
		}

		if (!outPort.links.length) {
			console.warn('Primitive node lacks any children');
		}

		const syntaxNode = new PrimitiveSyntaxNode(outPort.id, value);
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
		this.entityNodes.push(syntaxNode);
	}

	insertOutputNode(required: boolean, hidden: boolean, node: SerializedNodeModel): void {
		const [inputPort] = node.ports.filter((port) => port.name === 'in');

		if (!inputPort) {
			throw new Error('Could not find input port on Output Node');
		}

		if (!inputPort.links.length) {
			throw new Error('No incoming links on output node');
		}

		if (inputPort.links.length) {
			const syntaxNode = new OutputSyntaxNode(required, hidden);

			for (const linkID of inputPort.links) {
				const depLink = this.dependencies.get(linkID);

				if (depLink.source === node.id) {
					throw new Error('Backwards connection between Ouput Node and source');
				}

				const depNode = this.nodes.get(depLink.source);

				if (!depNode) {
					throw new Error('Could not find dependecy for output');
				} else if (depNode instanceof EntitySyntaxNode) {
					syntaxNode.addEntitiy(depNode);
				} else {
					throw new Error('Output node needs to be attached to an Entity Node');
				}
			}

			this.nodes.set(node.id, syntaxNode);
			this.leafNodes.set(node.id, syntaxNode);
		}
	}

	insertInequalityNode(symbol: string, node: SerializedNodeModel): void {
		const [valueAPort] = node.ports.filter((port) => port.name === 'valueA');
		const [valueBPort] = node.ports.filter((port) => port.name === 'valueB');
		const [outputPort] = node.ports.filter((port) => port.name === 'out');

		if (!valueAPort) {
			throw new Error("Could not find port with name'valueA' on Inequality node.");
		} else if (valueAPort.links.length !== 1) {
			throw new Error('Incorrect number of inputs to first port of Inequality node');
		}

		if (!valueBPort) {
			throw new Error("Could not find port with name'valueB' on Inequality node.");
		} else if (valueBPort.links.length !== 1) {
			throw new Error('Incorrect number of inputs to second port of Inequality node');
		}

		if (!outputPort) {
			throw new Error('Could not find output port with name: out');
		}

		const syntaxNode = new InequalitySyntaxNode(
			symbol,
			{
				portName: valueAPort.name,
				dependency: valueAPort.links[0],
			},
			{
				portName: valueBPort.name,
				dependency: valueBPort.links[0],
			}
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
			this.leafNodes.set(node.id, syntaxNode);
		}
	}

	insertCountNode(name: string, node: SerializedNodeModel): void {
		const [input] = node.ports.filter((p) => p.name === 'in');
		const [output] = node.ports.filter((p) => p.name === 'out');

		if (!input) {
			throw new Error('Could not find input port with name: in');
		} else if (!input.links.length) {
			throw new Error('Count node missing input link');
		}

		if (!output) {
			throw new Error('Could not find output port with name: out');
		} else if (!output.links.length) {
			throw new Error('Count node missing output');
		}

		// Get the input variable name
		const depLink = this.dependencies.get(input.links[0]);

		if (depLink.source === node.id) {
			throw new Error('Backwards connection between Count Node and source');
		}

		const depNode = this.nodes.get(depLink.source);

		if (!depNode) {
			throw new Error('Could not find dependecy for COUNT node');
		} else if (depNode instanceof EntitySyntaxNode) {
			const syntaxNode = new CountSyntaxNode(String(depNode.get(depLink.sourcePort).value));
			this.nodes.set(node.id, syntaxNode);
			if (!output.links.length) {
				this.leafNodes.set(node.id, syntaxNode);
			}
		} else {
			throw new Error('Output node needs to be attached to an Entity Node');
		}
	}

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

		const syntaxNode = new SocialConnSyntaxNode(relationshipType);

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
			syntaxNode.setSubject(depNode.getName());
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
			syntaxNode.setOther(String(depNode.get(depLink.sourcePort).value));
		} else {
			throw new Error('Social connection only accepts Person nodes');
		}

		this.nodes.set(node.id, syntaxNode);
		if (!outputPort.links.length) {
			this.leafNodes.set(node.id, syntaxNode);
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

		const syntaxNode = new LogicalOpSyntaxNode(op);

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
				syntaxNode.addChild(depNode);
			} else {
				throw new Error(
					'Social connection only accepts Inequality, Logical, and Social Connection nodes'
				);
			}
		}

		this.nodes.set(node.id, syntaxNode);
		if (!output.links.length) {
			this.leafNodes.set(node.id, syntaxNode);
		}
	}

	parseTree(patternName: string): CompiledPattern {
		let whereClauses = '';
		const parameters: PatternParam[] = [];

		for (const entity of this.entityNodes) {
			whereClauses += entity.toString();
		}

		for (const [, node] of this.leafNodes) {
			if (node instanceof OutputSyntaxNode) {
				for (const entity of node.getEntities()) {
					parameters.push({
						name: entity.getName(),
						hidden: node.isHidden(),
						required: node.isRequired(),
					});
				}
			} else {
				whereClauses += node.toString();
			}
		}

		return {
			name: patternName,
			parameters,
			whereClauses,
		};
	}

	/** Check if a variable name has already been used */
	private isVariableNameTaken(name: string): boolean {
		return this.usedNames.has(name);
	}
}
