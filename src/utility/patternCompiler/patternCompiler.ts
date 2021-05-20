import { PersonNodeModelOptions, PERSON_NODE_TYPE } from '../../nodes/PersonNode';
import { CentrifugeNodeTypesModelOptions } from '../../nodes/nodeTypes';
import {
  SerializedDiagram,
  SerializedNodeModel,
  SerializedLinkModel,
} from '../serialization';
import { PatternSyntaxTree } from './syntaxTree';
import { RELATIONSHIP_NODE_TYPE, RelationshipNodeModelOptions } from '../../nodes/RelationshipNode';
import { EVENT_NODE_TYPE, EventNodeModelOptions } from '../../nodes/EventNode';
import { VARIABLE_NODE_TYPE, VariableNodeModelOptions } from '../../nodes/VariableNode';
import { STRING_NODE_TYPE, StringNodeModelOptions } from '../../nodes/StringNode';
import { BOOL_NODE_TYPE, BoolNodeModelOptions } from '../../nodes/BoolNode';
import { NUMBER_NODE_TYPE, NumberNodeModelOptions } from '../../nodes/NumberNode';

const linkPortToSourceMap: { [key: string]: any } = {};
const nodeIDToLvarMap: { [key: string]: any } = {};

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

function convertPersonNode(
  node: SerializedNodeModel & PersonNodeModelOptions,
  lvar: string
) {
  const ret = `(person ${lvar})`;

  for (const port of node.ports) {
    for (const link of port.links) {
      console.log(linkPortToSourceMap[link]);
    }
  }

  return ret;
}

function convertRelationshipNode(
  node: SerializedNodeModel,
  relVar: string,
  ownerVar: string,
  targetVar: string
) {
  return `(relationship ${relVar} ${ownerVar} ${targetVar})`;
}



export function compilePattern(diagram: SerializedDiagram): string {

  const syntaxTree = new PatternSyntaxTree();

  const nodes = getNodes(diagram);
  const links = getLinks(diagram);

  for (const link of Object.values(links)) {
    syntaxTree.addDependency(link.id, link.source, link.target);
  }

  for (const node of Object.values(nodes)) {
    switch (node.type) {
      case PERSON_NODE_TYPE: {
        const personNode = node as SerializedNodeModel & PersonNodeModelOptions;
        break;
      }
      case RELATIONSHIP_NODE_TYPE: {
        const relationshipNode = node as SerializedNodeModel & RelationshipNodeModelOptions;
        let owner: string;
        let target: string;
        for (const port of relationshipNode.ports) {
          if (port.name === 'owner' && port.links.length) {
            owner = port.links[0];
          } else if (port.name === 'target' && port.links.length) {
            target = port.links[0];
          }
        }
        syntaxTree.insertRelationshipNode(relationshipNode.id, relationshipNode.label, owner, target);
        break;
      }
      case EVENT_NODE_TYPE: {
        const eventNode = node as SerializedNodeModel & EventNodeModelOptions;
        break;
      }
      case VARIABLE_NODE_TYPE: {
        const variableNode = node as SerializedNodeModel & VariableNodeModelOptions;
        syntaxTree.insertVariableNode(variableNode.id, variableNode.name);
        break;
      }
      case STRING_NODE_TYPE: {
        const stringNode = node as SerializedNodeModel & StringNodeModelOptions;
        syntaxTree.insertStringNode(stringNode.id, stringNode.value);
        break;
      }
      case BOOL_NODE_TYPE: {
        const boolNode = node as SerializedNodeModel & BoolNodeModelOptions;
        syntaxTree.insertBoolNode(boolNode.id, boolNode.value);
        break;
      }
      case NUMBER_NODE_TYPE: {
        const numberNode = node as SerializedNodeModel & NumberNodeModelOptions;
        syntaxTree.insertNumberNode(numberNode.id, numberNode.value);
        break;
      }
      default:
        break;
    }
  }
  
  console.log(syntaxTree.toString());

    // if (node.type === 'person-node') {
    //   personCount++;
    //   const lvar = `?person${personCount}`;
    //   nodeIDToLvarMap[node.id] = lvar;
    // } else if (node.type === 'relationship-node') {
    //   relationshipCount++;
    //   const lvar = `?rel${relationshipCount}`;
    //   nodeIDToLvarMap[node.id] = lvar;
    // } else if (node.type === 'event-node') {
    //   eventCount++;
    //   const lvar = `?event${eventCount}`;
    //   nodeIDToLvarMap[node.id] = lvar;
    // }
  

  // Loop through all the links and map port IDs to source node IDs
  // for (const link of Object.values<SerializedLinkModel>(links)) {
  //   linkPortToSourceMap[link.targetPort] = link.source;
  // }

  // let query = '';

  // // Build query strings from nodes
  // for (const node of Object.values<SerializedNodeModel>(nodes)) {
  //   if (node.type === 'person-node') {
  //     const lvar = nodeIDToLvarMap[node.id];
  //     query += convertPersonNode(node, lvar);
  //   } else if (node.type === 'relationship-node') {
  //     const relVar = nodeIDToLvarMap[node.id];
  //     let ownerVar = '_';
  //     let targetVar = '_';
  //     for (const port of node.ports) {
  //       if (port.name === 'person_1' && port.links.length) {
  //         const [link] = port.links;
  //         ownerVar =
  //           nodeIDToLvarMap[linkPortToSourceMap[links[link].targetPort]];
  //       } else if (port.name === 'person_2' && port.links.length) {
  //         const [link] = port.links;
  //         targetVar =
  //           nodeIDToLvarMap[linkPortToSourceMap[links[link].targetPort]];
  //       }
  //     }
  //     query += convertRelationshipNode(node, relVar, ownerVar, targetVar);
  //   }
  // }

  // const lvars: string[] = Object.values(nodeIDToLvarMap)
  //   .filter((x) => x && x !== '_');

  return '';
}
