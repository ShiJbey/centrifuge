import { PERSON_NODE_TYPE } from "../../nodes/PersonNode";
import { RELATIONSHIP_NODE_TYPE } from "../../nodes/RelationshipNode";
import { EVENT_NODE_TYPE } from "../../nodes/EventNode";
import {
  STRING_NODE_TYPE,
  StringNodeModelOptions,
} from "../../nodes/StringNode";
import { BOOL_NODE_TYPE, BoolNodeModelOptions } from "../../nodes/BoolNode";
import {
  NUMBER_NODE_TYPE,
  NumberNodeModelOptions,
} from "../../nodes/NumberNode";
import { BUSINESS_NODE_TYPE } from "../../nodes/BusinessNode";
import { OCCUPATION_NODE_TYPE } from "../../nodes/OccupationNode";
import { AND_NODE_TYPE } from "../../nodes/AndNode";
import {
  InequalityNodeModelOptions,
  INEQUALITY_NODE_TYPE,
} from "../../nodes/InequalityNode";
import { NOT_JOIN_NODE_TYPE } from "../../nodes/NotJoinNode";
import { NOT_NODE_TYPE } from "../../nodes/NotNode";
import {
  OutputNodeModelOptions,
  OUTPUT_NODE_TYPE,
} from "../../nodes/OutputNode";
import { OR_NODE_TYPE } from "../../nodes/OrNode";
import { OR_JOIN_NODE_TYPE } from "../../nodes/OrJoinNode";
import {
  SocialConnNodeModelOptions,
  SOCIAL_CONN_NODE_TYPE,
} from "../../nodes/SocialConnNode";
import { CentrifugeNodeTypesModelOptions } from "../../nodes/nodeTypes";
import {
  SerializedDiagram,
  SerializedNodeModel,
  SerializedLinkModel,
} from "../serialization";
import { CompiledPattern, PatternSyntaxTree } from "./syntaxTree";

/** Get a map of all the links from a serialized diagram */
function getLinks(model: SerializedDiagram): {
  [id: string]: SerializedLinkModel;
} {
  for (const layer of model.layers) {
    if (layer.type === "diagram-links") {
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
    if (layer.type === "diagram-nodes") {
      return layer.models;
    }
  }
  return {};
}

function getParents(
  node: SerializedNodeModel,
  links: { [id: string]: SerializedLinkModel }
): string[] {
  return node.ports
    .filter((p) => p.alignment === "left")
    .map((p) => p.links)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map((linkID) => links[linkID].source);
}

function getChildren(
  node: SerializedNodeModel,
  links: { [id: string]: SerializedLinkModel }
): string[] {
  return node.ports
    .filter((p) => p.alignment === "right")
    .map((p) => p.links)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map((linkID) => links[linkID].target);
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
    .filter((port) => port.alignment === "right")
    .map((port) => port.links)
    .reduce((prev, curr) => prev.concat(curr), []);

  const links = getLinks(patternGraph);
  const nodes = getNodes(patternGraph);
  let i = ordering_index;

  for (const id of outputlinkIDs) {
    const nextNodeID = links[id].target;
    if (!visitedNodes.has(nextNodeID)) {
      i = dfs(i, nodes[nextNodeID], visitedNodes, ordering, patternGraph);
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
    ? `[${requiredVariables.join("")}]`
    : "";
  const ruleHeader = `(${pattern.name} ${findVariables.join(
    " "
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

  const findSpec = `:find\n${findVariables.join(" ")}\n`;
  const withClause = withVariables.length
    ? `:with\n${withVariables.join(" ")}\n`
    : "";
  const whereClauses = `:where\n${pattern.whereClauses}]`;
  return `[${findSpec}${withClause}:in\n$ %\n${whereClauses}`;
}

/** Convert Serialized Node Diagram to reusable query format */
export function compilePattern(
  patternGraph: SerializedDiagram,
  name = "pattern"
): CompiledPattern {
  const buildOrder = topSort(patternGraph);
  const syntaxTree = new PatternSyntaxTree();

  const links = getLinks(patternGraph);
  for (const link of Object.values(links)) {
    syntaxTree.addDependencyLink(link);
  }

  const nodes = getNodes(patternGraph);

  let numPersonNodes = 0;
  let numEventNodes = 0;
  let numRelationshipNodes = 0;
  let numBusinessNodes = 0;
  let numOccupationNodes = 0;
//   let numCountNodes = 0;

  for (const nodeID of buildOrder) {
    const node = nodes[nodeID];
    const parents = getParents(node, links);
    const children = getChildren(node, links);
    switch (node.type) {
      // Primitives
      case STRING_NODE_TYPE: {
        const stringNode = node as SerializedNodeModel & StringNodeModelOptions;
        syntaxTree.insertPrimitiveNode(`"${stringNode.value}"`, stringNode);
        break;
      }
      case BOOL_NODE_TYPE: {
        const boolNode = node as SerializedNodeModel & BoolNodeModelOptions;
        syntaxTree.insertPrimitiveNode(boolNode.value, boolNode);
        break;
      }
      case NUMBER_NODE_TYPE: {
        const numberNode = node as SerializedNodeModel & NumberNodeModelOptions;
        syntaxTree.insertPrimitiveNode(numberNode.value, numberNode);
        break;
      }
      case OUTPUT_NODE_TYPE: {
        if (parents.length === 0) {
          console.error("Variable Node is missing entity input link. Skipping");
          continue;
        }
        const outputNode = node as SerializedNodeModel & OutputNodeModelOptions;
        syntaxTree.insertOutputNode(
          outputNode.required,
          outputNode.hidden,
          node
        );
        break;
      }
      // Entities
      case PERSON_NODE_TYPE: {
        if (children.length === 0) {
          console.warn(
            "Person Node has no children/dependents and will be skipped"
          );
          continue;
        }
        syntaxTree.insertEntityNode(
          "person",
          `?person_${numPersonNodes}`,
          node
        );
        numPersonNodes += 1;
        break;
      }
      case RELATIONSHIP_NODE_TYPE: {
        if (children.length === 0) {
          console.warn(
            "Relationship Node has no children/dependents and will be skipped"
          );
          continue;
        }
        syntaxTree.insertEntityNode(
          "relationship",
          `?relationship_${numRelationshipNodes}`,
          node
        );
        numRelationshipNodes += 1;
        break;
      }
      case EVENT_NODE_TYPE: {
        if (children.length === 0) {
          console.warn(
            "Event Node has no children/dependents and will be skipped"
          );
          continue;
        }
        syntaxTree.insertEntityNode("event", `?event_${numEventNodes}`, node);
        numEventNodes += 1;
        break;
      }
      case BUSINESS_NODE_TYPE: {
        if (children.length === 0) {
          console.warn(
            "Business Node has no children/dependents and will be skipped"
          );
          continue;
        }
        syntaxTree.insertEntityNode(
          "business",
          `?business_${numBusinessNodes}`,
          node
        );
        numBusinessNodes += 1;
        break;
      }
      case OCCUPATION_NODE_TYPE: {
        if (children.length === 0) {
          console.warn(
            "Occupation Node has no children/dependents and will be skipped"
          );
          continue;
        }
        syntaxTree.insertEntityNode(
          "occupation",
          `?occupation_${numOccupationNodes}`,
          node
        );
        numOccupationNodes += 1;
        break;
      }
      // Logical Nodes
      case AND_NODE_TYPE: {
        if (parents.length === 1) {
          console.warn("AND Node should have more than one (1) input");
        } else if (parents.length === 0) {
          console.error("AND Node missing inputs.");
        }
        syntaxTree.insertLogicalOpNode("and", node);
        break;
      }
      case NOT_JOIN_NODE_TYPE: {
        console.warn("Compiler skipping NOT-JOIN Node");
        break;
      }
      case NOT_NODE_TYPE: {
        syntaxTree.insertLogicalOpNode("not", node);
        break;
      }
      case OR_JOIN_NODE_TYPE: {
        console.warn("Compiler skipping OR-JOIN Node");
        break;
      }
      case OR_NODE_TYPE: {
        syntaxTree.insertLogicalOpNode("or", node);
        break;
      }
      // Modifiers
    //   case COUNT_NODE_TYPE: {
    //     syntaxTree.insertCountNode(`?count_${numCountNodes}`, node);
    //     numCountNodes++;
    //     break;
    //   }
      case INEQUALITY_NODE_TYPE: {
        const ineqNode = node as SerializedNodeModel &
          InequalityNodeModelOptions;
        syntaxTree.insertInequalityNode(ineqNode.symbol, node);
        break;
      }

      case SOCIAL_CONN_NODE_TYPE: {
        const socialNode = node as SerializedNodeModel &
          SocialConnNodeModelOptions;
        syntaxTree.insertSocialConnNode(socialNode.relationshipType, node);
        break;
      }
      default:
        console.error(`Unhandled node type: '${node.type}'`);
    }
  }

  return syntaxTree.parseTree(name);
}
