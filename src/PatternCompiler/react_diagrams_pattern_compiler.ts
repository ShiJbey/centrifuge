import { PERSON_NODE_TYPE } from '../nodes/PersonNode';
import { StringNodeModelOptions, STRING_NODE_TYPE } from '../nodes/StringNode';
import { BoolNodeModelOptions, BOOL_NODE_TYPE } from '../nodes/BoolNode';
import { NumberNodeModelOptions, NUMBER_NODE_TYPE } from '../nodes/NumberNode';
import { VARIABLE_NODE_TYPE } from '../nodes/VariableNode';
import { EntityNodeModelOptions } from '../nodes/SyntaxNode';
import {
    SerializedDiagram,
    SerializedLinkModel,
    SerializedNodeModel,
} from 'src/utility/serialization';
import {
    CompiledPattern,
    EntitySyntaxNode,
    NodePortPair,
    PatternSyntaxTree,
    SyntaxNode,
    PrimitiveValueNode,
    VariableSyntaxNode,
    RangePredicateSyntaxNode,
} from './syntaxTree';
import { BUSINESS_NODE_TYPE } from 'src/nodes/BusinessNode';
import { CentrifugeNodeTypesModelOptions } from 'src/nodes/nodeTypes';
import { EVENT_NODE_TYPE } from 'src/nodes/EventNode';
import { RELATIONSHIP_NODE_TYPE } from 'src/nodes/RelationshipNode';
import { OCCUPATION_NODE_TYPE } from 'src/nodes/OccupationNode';
import { RANGE_PREDICATE_NODE_TYPE } from 'src/nodes/RangePredicateNode';

type LinkMap = {
    [id: string]: SerializedLinkModel;
};

/** Get a map of all the links from a serialized diagram */
function getLinks(model: SerializedDiagram): LinkMap {
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

function getOutputs(
    node: SerializedNodeModel,
    links: { [id: string]: SerializedLinkModel }
): { [portName: string]: { sourcePortID: string; nodeID: string }[] } {
    const ret: {
        [portName: string]: { sourcePortID: string; nodeID: string }[];
    } = {};

    for (const port of node.ports) {
        if (port.alignment === 'right') {
            for (const linkID of port.links) {
                const link = links[linkID];
                link.targetPort;

                if (!ret[port.name]) {
                    ret[port.name] = [];
                }

                ret[port.name].push({
                    nodeID: link.target,
                    sourcePortID: link.targetPort,
                });
            }
        }
    }

    return ret;
}

function getInputs(
    node: SerializedNodeModel,
    links: { [id: string]: SerializedLinkModel }
): { [portName: string]: { sourcePortID: string; nodeID: string }[] } {
    const ret: {
        [portName: string]: { sourcePortID: string; nodeID: string }[];
    } = {};

    for (const port of node.ports) {
        if (port.alignment === 'left') {
            for (const linkID of port.links) {
                const link = links[linkID];
                link.targetPort;

                if (!ret[port.name]) {
                    ret[port.name] = [];
                }

                ret[port.name].push({
                    nodeID: link.source,
                    sourcePortID: link.sourcePort,
                });
            }
        }
    }

    return ret;
}

/**
 * Helper Depth-First Search for topSort
 */
function dfs(
    ordering_index: number,
    startingNode: SerializedNodeModel,
    visitedNodes: Set<string>,
    ordering: string[],
    patternGraph: SerializedDiagram
): number {
    visitedNodes.add(startingNode.id);

    const outputlinkIDs = startingNode.ports
        .filter((port) => port.alignment === 'right')
        .map((port) => port.links)
        .reduce((prev, curr) => prev.concat(curr), []);

    const links = getLinks(patternGraph);
    const nodes = getNodes(patternGraph);
    let i = ordering_index;

    for (const id of outputlinkIDs) {
        const nextNodeID = links[id].target;
        if (!visitedNodes.has(nextNodeID)) {
            const nextNode = nodes[nextNodeID];
            if (nextNode) {
                i = dfs(
                    i,
                    nodes[nextNodeID],
                    visitedNodes,
                    ordering,
                    patternGraph
                );
            } else {
                throw new Error(
                    `Missing target for link from node (${startingNode.type})x`
                );
            }
        }
    }

    ordering[i] = startingNode.id;

    return i - 1;
}

/**
 * Preform Topological Sort on the serialized diagram and return an
 * ordering for building the tree
 */
function topSort(patternGraph: SerializedDiagram): string[] {
    const nodes = getNodes(patternGraph);
    // Total nodes in the pattern
    const nodeCount = Object.values(nodes).length;
    // IDs of visited nodes
    const visited = new Set<string>();
    // Order that nodes should be explored
    const ordering = new Array<string>(nodeCount);
    // Next position in the ordering to set
    let ordering_index = nodeCount - 1;

    for (const [nodeID, node] of Object.entries(nodes)) {
        if (!visited.has(nodeID)) {
            ordering_index = dfs(
                ordering_index,
                node,
                visited,
                ordering,
                patternGraph
            );
        }
    }

    return ordering;
}

/** Convert Serialized Node Diagram to reusable query format */
export function compilePattern(
    patternGraph: SerializedDiagram,
    patternName = 'pattern'
): CompiledPattern {
    const buildOrder = topSort(patternGraph);

    const links = getLinks(patternGraph);
    const nodes = getNodes(patternGraph);
    const syntaxNodes: { [key: string]: SyntaxNode } = {};

    const syntaxTree = new PatternSyntaxTree(patternName);

    for (const nodeID of buildOrder) {
        const node = nodes[nodeID];

        if (
            node.type === STRING_NODE_TYPE ||
            node.type === NUMBER_NODE_TYPE ||
            node.type === BOOL_NODE_TYPE
        ) {
            const diagramNode = node as SerializedNodeModel &
                (
                    | StringNodeModelOptions
                    | NumberNodeModelOptions
                    | BoolNodeModelOptions
                );
            const syntaxNode = new PrimitiveValueNode(diagramNode.value);
            syntaxNodes[diagramNode.id] = syntaxNode;
            continue;
        }

        if (
            node.type === PERSON_NODE_TYPE ||
            node.type === BUSINESS_NODE_TYPE ||
            node.type === EVENT_NODE_TYPE ||
            node.type === RELATIONSHIP_NODE_TYPE ||
            node.type === OCCUPATION_NODE_TYPE
        ) {
            // Determine the entity type
            const diagramNode = node as SerializedNodeModel &
                EntityNodeModelOptions;

            const inputs = getInputs(node, links);
            const outputs = getOutputs(node, links);

            const inputMap: { [key: string]: NodePortPair } = {};
            for (const portName of Object.keys(inputs)) {
                const attributeName = portName.substring(
                    0,
                    portName.length - 2
                );
                inputMap[attributeName] = {
                    node: syntaxNodes[inputs[portName][0].nodeID],
                };
            }

            const activeOutoutPorts: string[] = [];
            for (const portName of Object.keys(outputs)) {
                if (portName === 'ref') continue;
                if (outputs[portName].length) {
                    const attributeName = portName.substring(
                        0,
                        portName.length - 2
                    );
                    activeOutoutPorts.push(attributeName);
                }
            }

            const syntaxNode = new EntitySyntaxNode(
                diagramNode.entityType,
                diagramNode.entityName,
                inputMap,
                activeOutoutPorts
            );

            syntaxNodes[node.id] = syntaxNode;

            // Check if top/level
            if (outputs['ref']) {
                if (
                    nodes[outputs['ref'][0].nodeID].type === VARIABLE_NODE_TYPE
                ) {
                    syntaxTree.addLeafNode(syntaxNode);
                }
            } else {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }

        if (node.type === RANGE_PREDICATE_NODE_TYPE) {
            const outputs = getOutputs(node, links);
            const inputs = getInputs(node, links);

            const first: NodePortPair = {
                node: syntaxNodes[inputs['value_a'][0].nodeID],
                port: nodes[inputs['value_a'][0].nodeID].ports
                    .filter(
                        (port) => port.id === inputs['value_a'][0].sourcePortID
                    )
                    .map((port) =>
                        port.name.substring(0, port.name.length - 2)
                    )[0],
            };

            const second: NodePortPair = {
                node: syntaxNodes[inputs['value_b'][0].nodeID],
                port: nodes[inputs['value_b'][0].nodeID].ports
                    .filter(
                        (port) => port.id === inputs['value_b'][0].sourcePortID
                    )
                    .map((port) => port.name)[0],
            };

            const syntaxNode = new RangePredicateSyntaxNode(
                node.op,
                first,
                second
            );

            syntaxNodes[node.id] = syntaxNode;

            if (Object.keys(outputs).length === 0) {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }

        if (node.type === VARIABLE_NODE_TYPE) {
            const inputs = getInputs(node, links);

            if (inputs['input'] && inputs['input'].length) {
                const inputNode = syntaxNodes[
                    inputs['input'][0].nodeID
                ] as EntitySyntaxNode;
                const syntaxNode = new VariableSyntaxNode(inputNode);
                syntaxNodes[node.id] = syntaxNode;
                syntaxTree.addVariableNode(syntaxNode);
            } else {
                throw new Error('Input not found for variable node');
            }

            continue;
        }
    }

    return syntaxTree.compile();
}
