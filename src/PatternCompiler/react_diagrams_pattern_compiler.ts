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
    LogicalSyntaxNode,
    LogicalJoinSyntaxNode,
    SocialConnectionSyntaxNode,
    CountSyntaxNode,
    RuleSyntaxNode,
} from './syntaxTree';
import { CentrifugeNodeTypesModelOptions } from 'src/nodes/nodeTypes';
import { VARIABLE_NODE_TYPE } from '../nodes/VariableNode';
import { RANGE_PREDICATE_NODE_TYPE } from 'src/nodes/RangePredicateNode';
import { LOGICAL_NODE_TYPE } from 'src/nodes/LogicalNode';
import { LOGICAL_JOIN_NODE_TYPE } from 'src/nodes/LogicalJoinNode';
import { VALUE_NODE_TYPE } from 'src/nodes/ValueNode';
import { ENTITY_NODE_TYPE } from 'src/nodes/EntityNode';
import { SOCIAL_CONN_NODE_TYPE } from 'src/nodes/SocialConnNode';
import { COUNT_NODE_TYPE } from 'src/nodes/CountNode';
import { RULE_NODE_TYPE } from 'src/nodes/RuleNode';

type LinkMap = {
    [id: string]: SerializedLinkModel;
};

type SerializedNode = SerializedNodeModel & CentrifugeNodeTypesModelOptions;

interface Connection {
    portName: string;
    nodeId: string;
}

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
    [id: string]: SerializedNode;
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
    nodes: { [id: string]: SerializedNode },
    links: { [id: string]: SerializedLinkModel }
): { [portName: string]: Connection[] } {
    const ret: {
        [portName: string]: Connection[];
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
                    nodeId: link.target,
                    portName: nodes[link.target].ports.filter(
                        (port) => port.id === link.targetPort
                    )[0].name,
                });
            }
        }
    }

    return ret;
}

function getInputs(
    node: SerializedNodeModel,
    nodes: { [id: string]: SerializedNode },
    links: { [id: string]: SerializedLinkModel }
): { [portName: string]: Connection[] } {
    const ret: { [portName: string]: Connection[] } = {};

    for (const port of node.ports) {
        if (port.alignment === 'left') {
            for (const linkID of port.links) {
                const link = links[linkID];
                link.targetPort;

                if (!ret[port.name]) {
                    ret[port.name] = [];
                }

                ret[port.name].push({
                    nodeId: link.source,
                    portName: nodes[link.source].ports.filter(
                        (port) => port.id === link.sourcePort
                    )[0].name,
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
                    `Missing target for link from node (${startingNode.type}).`
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
    patternName: string
): CompiledPattern {
    const buildOrder = topSort(patternGraph);

    const links = getLinks(patternGraph);
    const nodes = getNodes(patternGraph);
    const syntaxNodes: { [key: string]: SyntaxNode } = {};

    const syntaxTree = new PatternSyntaxTree();

    for (const nodeID of buildOrder) {
        const node = nodes[nodeID];

        if (node.type === VALUE_NODE_TYPE) {
            const syntaxNode = new PrimitiveValueNode(node.id, node.value);
            syntaxNodes[node.id] = syntaxNode;
            continue;
        }

        if (node.type === ENTITY_NODE_TYPE) {
            const inputs = getInputs(node, nodes, links);
            const outputs = getOutputs(node, nodes, links);

            const inputMap: { [key: string]: NodePortPair[] } = {};
            for (const portName of Object.keys(inputs)) {
                const attributeName =
                    portName === 'ref'
                        ? 'ref'
                        : portName.substring(0, portName.length - 2);

                inputMap[attributeName] = [];
                for (const conn of inputs[portName]) {
                    inputMap[attributeName].push({
                        node: syntaxNodes[conn.nodeId],
                        port: conn.portName,
                    });
                }
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

            if (!node.entityName) {
                throw new Error(
                    `Entity of type "${node.entityType}" Node missing name`
                );
            }

            const syntaxNode = new EntitySyntaxNode(
                node.id,
                node.entityType,
                node.entityName,
                inputMap,
                activeOutoutPorts
            );

            syntaxNodes[node.id] = syntaxNode;

            continue;
        }

        if (node.type === RANGE_PREDICATE_NODE_TYPE) {
            const outputs = getOutputs(node, nodes, links);
            const inputs = getInputs(node, nodes, links);

            const first: NodePortPair = {
                node: syntaxNodes[inputs['value_a'][0].nodeId],
                port: inputs['value_a'][0].portName,
            };

            if (first.node instanceof EntitySyntaxNode) {
                first.port = first.port.substring(0, first.port.length - 2);
            }

            const second: NodePortPair = {
                node: syntaxNodes[inputs['value_b'][0].nodeId],
                port: inputs['value_b'][0].portName,
            };

            if (second.node instanceof EntitySyntaxNode) {
                second.port = second.port.substring(0, second.port.length - 2);
            }

            const syntaxNode = new RangePredicateSyntaxNode(
                node.id,
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
            const inputs = getInputs(node, nodes, links);

            if (inputs['input'] && inputs['input'].length) {
                const inputNode = syntaxNodes[
                    inputs['input'][0].nodeId
                ] as EntitySyntaxNode;
                const syntaxNode = new VariableSyntaxNode(node.id, inputNode);
                syntaxNodes[node.id] = syntaxNode;
                syntaxTree.addVariableNode(syntaxNode);
            } else {
                throw new Error('Input not found for variable node');
            }

            continue;
        }

        if (node.type === LOGICAL_NODE_TYPE) {
            const inputs = getInputs(node, nodes, links);
            const outputs = getOutputs(node, nodes, links);

            const syntaxNode = new LogicalSyntaxNode(
                node.id,
                node.op,
                inputs['in'].map((pair) => syntaxNodes[pair.nodeId])
            );

            syntaxNodes[node.id] = syntaxNode;

            if (Object.keys(outputs).length === 0) {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }

        if (node.type === LOGICAL_JOIN_NODE_TYPE) {
            const inputs = getInputs(node, nodes, links);
            const outputs = getOutputs(node, nodes, links);

            const internalEntities = inputs['internal_variables'].map(
                (pair) => syntaxNodes[pair.nodeId] as EntitySyntaxNode
            );

            const externalEntities = inputs['external_variables'].map(
                (pair) => syntaxNodes[pair.nodeId] as EntitySyntaxNode
            );

            const clauses = inputs['clauses'].map(
                (pair) => syntaxNodes[pair.nodeId]
            );

            const syntaxNode = new LogicalJoinSyntaxNode(
                node.id,
                node.op,
                externalEntities,
                internalEntities,
                clauses
            );

            syntaxNodes[node.id] = syntaxNode;

            if (Object.keys(outputs).length === 0) {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }

        if (node.type === SOCIAL_CONN_NODE_TYPE) {
            const outputs = getOutputs(node, nodes, links);
            const inputs = getInputs(node, nodes, links);

            const first: NodePortPair<EntitySyntaxNode> = {
                node: syntaxNodes[
                    inputs['subject'][0].nodeId
                ] as EntitySyntaxNode,
                port: inputs['subject'][0].portName,
            };

            const second: NodePortPair<EntitySyntaxNode> = {
                node: syntaxNodes[
                    inputs['other'][0].nodeId
                ] as EntitySyntaxNode,
                port: inputs['other'][0].portName,
            };

            const syntaxNode = new SocialConnectionSyntaxNode(
                node.id,
                node.relationshipType,
                first,
                second
            );

            syntaxNodes[node.id] = syntaxNode;

            if (Object.keys(outputs).length === 0) {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }

        if (node.type === COUNT_NODE_TYPE) {
            const inputs = getInputs(node, nodes, links);

            const inputConn: NodePortPair<EntitySyntaxNode> = {
                node: syntaxNodes[inputs['in'][0].nodeId] as EntitySyntaxNode,
                port: inputs['in'][0].portName.substring(
                    0,
                    inputs['in'][0].portName.length - 2
                ),
            };

            const syntaxNode = new CountSyntaxNode(node.id, inputConn);

            syntaxNodes[node.id] = syntaxNode;

            continue;
        }

        if (node.type === RULE_NODE_TYPE) {
            const outputs = getOutputs(node, nodes, links);
            const inputs = getInputs(node, nodes, links);

            const params: NodePortPair<EntitySyntaxNode>[] = [];

            for (const paramName of node.ruleParams) {
                params.push({
                    node: syntaxNodes[
                        inputs[paramName][0].nodeId
                    ] as EntitySyntaxNode,
                    port: inputs[paramName][0].portName,
                });
            }

            const syntaxNode = new RuleSyntaxNode(
                node.id,
                node.ruleName,
                params
            );

            if (Object.keys(outputs).length === 0) {
                syntaxTree.addLeafNode(syntaxNode);
            }

            continue;
        }
    }

    return syntaxTree.compile(patternName);
}
