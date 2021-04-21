// Functions for converting the scene graph created
// in react-diagrams toDatascript code queries.

import {
  SerializedDiagram,
  SerializedNodeModel,
  SerializedLinkModel,
} from './utils';

const linkPortToSourceMap: { [key: string]: any } = {};
const nodeIDToLvarMap: { [key: string]: any } = {};


function getLinks(model: SerializedDiagram): any {
  for (const layer of model.layers) {
    if (layer.type === 'diagram-links') {
      return layer.models;
    }
  }
  return {};
}

function getNodes(model: SerializedDiagram): any {
  for (const layer of model.layers) {
    if (layer.type === 'diagram-nodes') {
      return layer.models;
    }
  }
  return {};
}

function convertPersonNode(
  node: SerializedNodeModel & { [key: string]: any },
  lvar: string
) {
  const ret = `(actor ${lvar})`;

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
  return `
    (relationship ${relVar} ${ownerVar} ${targetVar})
  `;
}

export function processDiagram(diagram: SerializedDiagram): [string[], string] {
  const nodes = getNodes(diagram);
  const links = getLinks(diagram);

  // Loop through all the links and map port IDs to source node IDs
  let personCount = 0;
  let relationshipCount = 0;
  let eventCount = 0;
  for (const node of Object.values<SerializedNodeModel>(nodes)) {
    if (node.type === 'person-node') {
      personCount++;
      const lvar = `?actor${personCount}`;
      nodeIDToLvarMap[node.id] = lvar;
    } else if (node.type === 'relationship-node') {
      relationshipCount++;
      const lvar = `?rel${relationshipCount}`;
      nodeIDToLvarMap[node.id] = lvar;
    } else if (node.type === 'event-node') {
      eventCount++;
      const lvar = `?event${eventCount}`;
      nodeIDToLvarMap[node.id] = lvar;
    }
  }

  // Loop through all the links and map port IDs to source node IDs
  for (const link of Object.values<SerializedLinkModel>(links)) {
    linkPortToSourceMap[link.targetPort] = link.source;
  }

  let query = '';

  // Build query strings from nodes
  for (const node of Object.values<SerializedNodeModel>(nodes)) {
    if (node.type === 'person-node') {
      const lvar = nodeIDToLvarMap[node.id];
      query += convertPersonNode(node, lvar);
    } else if (node.type === 'relationship-node') {
      const relVar = nodeIDToLvarMap[node.id];
      let ownerVar = '_';
      let targetVar = '_';
      for (const port of node.ports) {
        if (port.name === 'person_1' && port.links.length) {
          const [link] = port.links;
          ownerVar =
            nodeIDToLvarMap[linkPortToSourceMap[links[link].targetPort]];
        } else if (port.name === 'person_2' && port.links.length) {
          const [link] = port.links;
          targetVar =
            nodeIDToLvarMap[linkPortToSourceMap[links[link].targetPort]];
        }
      }
      query += convertRelationshipNode(node, relVar, ownerVar, targetVar);
    }
  }

  const lvars: string[] = Object.values(nodeIDToLvarMap)
    .filter((x) => x && x !== '_');

  return [lvars, query];
}
