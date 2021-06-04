import { PERSON_NODE_TYPE, PersonNodeModelOptions } from '../../nodes/PersonNode';
import { RELATIONSHIP_NODE_TYPE, RelationshipNodeModelOptions } from '../../nodes/RelationshipNode';
import { EVENT_NODE_TYPE, EventNodeModelOptions } from '../../nodes/EventNode';
import { VARIABLE_NODE_TYPE, VariableNodeModelOptions } from '../../nodes/VariableNode';
import { STRING_NODE_TYPE, StringNodeModelOptions } from '../../nodes/StringNode';
import { BOOL_NODE_TYPE, BoolNodeModelOptions } from '../../nodes/BoolNode';
import { NUMBER_NODE_TYPE, NumberNodeModelOptions } from '../../nodes/NumberNode';
import { BUSINESS_NODE_TYPE } from '../../nodes/BusinessNode';
import { OCCUPATION_NODE_TYPE } from '../../nodes/OccupationNode';
import { AND_NODE_TYPE } from '../../nodes/AndNode';
import { COUNT_NODE_TYPE } from '../../nodes/CountNode';
import { INEQUALITY_NODE_TYPE } from '../../nodes/InequalityNode';
import { NOT_JOIN_NODE_TYPE } from '../../nodes/NotJoinNode';
import { NOT_NODE_TYPE } from '../../nodes/NotNode';
import { OUTPUT_NODE_TYPE } from '../../nodes/OutputNode';
import { OR_NODE_TYPE } from '../../nodes/OrNode';
import { OR_JOIN_NODE_TYPE } from '../../nodes/OrJoinNode';
import { SOCIAL_CONN_NODE_TYPE } from '../../nodes/SocialConnNode';
import { CentrifugeNodeTypesModelOptions } from '../../nodes/nodeTypes';
import { SerializedDiagram, SerializedNodeModel, SerializedLinkModel } from '../serialization';
import { CompiledPattern, PatternSyntaxTree } from './syntaxTree';

/** Get a map of all the links from a serialized diagram */
function getLinks(model: SerializedDiagram): {
	[id: string]: SerializedLinkModel;
} {
	for (const layer of model.layers) {
		if (layer.type === 'diagram-links') {
			return layer.models;
		}
	}
	return {};
}

/** Get a map of all the nodes from a serialized diagram */
function getNodes(model: SerializedDiagram): {
	[id: string]: SerializedNodeModel & CentrifugeNodeTypesModelOptions;
} {
	for (const layer of model.layers) {
		if (layer.type === 'diagram-nodes') {
			return layer.models;
		}
	}
	return {};
}

/** Convert Serialized Node Diagram to reusable query format */
export function compilePattern(diagram: SerializedDiagram, name = 'pattern'): CompiledPattern {
	const syntaxTree = new PatternSyntaxTree();

	const nodes = getNodes(diagram);
	const links = getLinks(diagram);

	for (const link of Object.values(links)) {
		syntaxTree.addDependency(link.id, link.sourcePort, link.targetPort);
	}

	for (const node of Object.values(nodes)) {
		switch (node.type) {
			// Entities
			case PERSON_NODE_TYPE: {
				const personNode = node as SerializedNodeModel & PersonNodeModelOptions;
				syntaxTree.insertPersonNode(personNode);
				break;
			}
			case RELATIONSHIP_NODE_TYPE: {
				const relationshipNode = node as SerializedNodeModel & RelationshipNodeModelOptions;
				syntaxTree.insertRelationshipNode(relationshipNode);
				break;
			}
			case EVENT_NODE_TYPE: {
				const eventNode = node as SerializedNodeModel & EventNodeModelOptions;
				syntaxTree.insertEventNode(eventNode);
				break;
			}
			case BUSINESS_NODE_TYPE: {
				console.warn('Compiler skipping Business Node');
				break;
			}
			case OCCUPATION_NODE_TYPE: {
				console.warn('Compiler skipping Occupation Node');
				break;
			}
			// Modifiers
			case AND_NODE_TYPE: {
				console.warn('Compiler skipping AND Node');
				break;
			}
			case COUNT_NODE_TYPE: {
				console.warn('Compiler skipping COUNT Node');
				break;
			}
			case INEQUALITY_NODE_TYPE: {
				console.warn('Compiler skipping INEQUALITY Node');
				break;
			}
			case NOT_JOIN_NODE_TYPE: {
				console.warn('Compiler skipping NOT-JOIN Node');
				break;
			}
			case NOT_NODE_TYPE: {
				console.warn('Compiler skipping NOT Node');
				break;
			}
			case OR_JOIN_NODE_TYPE: {
				console.warn('Compiler skipping OR-JOIN Node');
				break;
			}
			case OR_NODE_TYPE: {
				console.warn('Compiler skipping OR Node');
				break;
			}
			case SOCIAL_CONN_NODE_TYPE: {
				console.warn('Compiler skipping SOCIAL CONN Node');
				break;
			}
			// Primitives
			case VARIABLE_NODE_TYPE: {
				const variableNode = node as SerializedNodeModel & VariableNodeModelOptions;
				syntaxTree.insertVariableNode(variableNode);
				break;
			}
			case STRING_NODE_TYPE: {
				const stringNode = node as SerializedNodeModel & StringNodeModelOptions;
				syntaxTree.insertStringNode(stringNode);
				break;
			}
			case BOOL_NODE_TYPE: {
				const boolNode = node as SerializedNodeModel & BoolNodeModelOptions;
				syntaxTree.insertBoolNode(boolNode);
				break;
			}
			case NUMBER_NODE_TYPE: {
				const numberNode = node as SerializedNodeModel & NumberNodeModelOptions;
				syntaxTree.insertNumberNode(numberNode);
				break;
			}
			case OUTPUT_NODE_TYPE: {
				console.warn('Compiler skipping OUTPUT Node');
				break;
			}
			default:
				break;
		}
	}

	console.log(syntaxTree.parseTree());

	return {
		name,
		parameters: [],
		whereClauses: '',
	};
}
