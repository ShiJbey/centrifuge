import { PERSON_NODE_TYPE, PersonNodeModelOptions } from '../../nodes/PersonNode';
import { RELATIONSHIP_NODE_TYPE, RelationshipNodeModelOptions } from '../../nodes/RelationshipNode';
import { EVENT_NODE_TYPE, EventNodeModelOptions } from '../../nodes/EventNode';
import { VARIABLE_NODE_TYPE, VariableNodeModelOptions } from '../../nodes/VariableNode';
import { STRING_NODE_TYPE, StringNodeModelOptions } from '../../nodes/StringNode';
import { BOOL_NODE_TYPE, BoolNodeModelOptions } from '../../nodes/BoolNode';
import { NUMBER_NODE_TYPE, NumberNodeModelOptions } from '../../nodes/NumberNode';
import { CentrifugeNodeTypesModelOptions } from '../../nodes/nodeTypes';
import {
  SerializedDiagram,
  SerializedNodeModel,
  SerializedLinkModel,
} from '../serialization';
import { PatternSyntaxTree } from './syntaxTree';


function getLinks(model: SerializedDiagram): { [id: string]: SerializedLinkModel } {
  for (const layer of model.layers) {
    if (layer.type === 'diagram-links') {
      return layer.models;
    }
  }
  return {};
}

function getNodes(model: SerializedDiagram): { [id: string]: SerializedNodeModel & CentrifugeNodeTypesModelOptions } {
  for (const layer of model.layers) {
    if (layer.type === 'diagram-nodes') {
      return layer.models;
    }
  }
  return {};
}

export function compilePattern(diagram: SerializedDiagram): string {
  const syntaxTree = new PatternSyntaxTree();

  const nodes = getNodes(diagram);
  const links = getLinks(diagram);

  // Insert dependency links
  for (const link of Object.values(links)) {
    syntaxTree.addDependency(link.id, link.sourcePort, link.targetPort);
  }

  for (const node of Object.values(nodes)) {
    switch (node.type) {
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
      default:
        break;
    }
  }

  const code = syntaxTree.getQuery();

  return code;
}

export function toQuery(diagram: SerializedDiagram): string {
  throw new Error('Function Not Implemented');
}
