import { BoolNodeModelOptions } from '../../nodes/BoolNode';
import { NumberNodeModelOptions } from '../../nodes/NumberNode';
import { StringNodeModelOptions } from '../../nodes/StringNode';
import { VariableNodeModelOptions } from '../../nodes/VariableNode';
import { EventNodeModelOptions } from '../../nodes/EventNode';
import { PersonNodeModelOptions } from '../../nodes/PersonNode';
import { RelationshipNodeModelOptions } from '../../nodes/RelationshipNode';
import { SerializedNodeModel } from '../serialization';

export interface TreeNode {
  params: { [key: string]: Param; out?: Param };
  toString: () => string;
}

export interface Param<T = any> {
  // name: string;
  value?: T;
  dependency?: string;
}

export class PersonSyntaxNode implements TreeNode {
  params: {
    /** Person variable name */
    out: Param<string>;
    gender?: Param<string>;
    age?: Param<number>;
    occupation?: Param<string>;
    alive?: Param<boolean>;
  };

  constructor(name: string) {
    this.params = {
      out: { value: name ? name : '?person' },
    };
  }

  toString(): string {
    let str = `[${this.params.out.value} "sim/type" "person"]`;
    if (this.params.gender) {
      str += `\n[${this.params.out.value} "person/gender" ...]`;
    }
    if (this.params.age) {
      str += `\n[${this.params.out.value} "person/age" ...]`;
    }
    if (this.params.occupation) {
      str += `\n[${this.params.out.value} "person/occupation" ...]`;
    }
    if (this.params.alive) {
      str += `\n[${this.params.out.value} "person/alive" ...]`;
    }
    return str;
  }
}

export class RelationshipSyntaxNode implements TreeNode {
  params: {
    out: Param<string>;
    owner?: Param<string>;
    target?: Param<string>;
    spark?: Param<number>;
    charge?: Param<number>;
  };

  constructor(name: string) {
    this.params = {
      out: { value: name ? name : '?relationship' },
    };
  }

  toString(): string {
    let str = `[${this.params.out.value} "sim/type" "relationship"]\n`;
    if (this.params.owner) {
      str += `[${this.params.out.value} "relationship/owner" ...]\n`;
    }
    if (this.params.target) {
      str += `[${this.params.out.value} "relationship/target" ...]\n`;
    }
    if (this.params.spark) {
      str += `[${this.params.out.value} "relationship/spark" ...]\n`;
    }
    if (this.params.charge) {
      str += `[${this.params.out.value} "relationship/charge" ...]\n`;
    }
    return str;
  }
}

export interface EventSyntaxNode extends TreeNode {
  params: {
    out: Param;
  };
}

export class VariableSyntaxNode implements TreeNode {
  params: { out: Param<string> };

  constructor(name: string) {
    this.params = { out: { value: name } };
  }

  toString(): string {
    return this.params.out.value;
  }
}

export class NumberSyntaxNode implements TreeNode {
  params: { out: Param<number> };

  constructor(value: number) {
    this.params = { out: { value: value } };
  }

  get value(): number {
    return this.params.out.value;
  }

  toString(): string {
    return this.params.out.value.toString();
  }
}

export class StringSyntaxNode implements TreeNode {
  params: { out: Param<string> };

  constructor(value: string) {
    this.params = { out: { value: value } };
  }

  get value(): string {
    return this.params.out.value;
  }

  toString(): string {
    return this.params.out.value;
  }
}

export class BooleanSyntaxNode implements TreeNode {
  params: { out: Param<boolean> };

  constructor(value: boolean) {
    this.params = { out: { value } };
  }

  get value(): boolean {
    return this.params.out.value;
  }

  toString(): string {
    return String(this.params.out.value);
  }
}

export type PrimitiveNodeTypes =
  | VariableSyntaxNode
  | NumberSyntaxNode
  | StringSyntaxNode
  | BooleanSyntaxNode;

export type SyntaxTreeNodeTypes =
  | NumberSyntaxNode
  | StringSyntaxNode
  | BooleanSyntaxNode
  | RelationshipSyntaxNode
  | PersonSyntaxNode;

export class PatternSyntaxTree {
  private usedNames: Set<string> = new Set();
  private primitives: Map<string, PrimitiveNodeTypes> = new Map();
  private dependencies: Map<string, { source: string; target: string }> =
    new Map();
  private freeVariables: Map<string, Param> = new Map<string, Param>();
  private nodes: Map<string, SyntaxTreeNodeTypes> = new Map();
  private numPersonNodes = 0;
  private numEventNodes = 0;
  private numRelationshipNodes = 0;

  /** Insert dependency link between ports */
  addDependency(id: string, source: string, target: string): void {
    this.dependencies.set(id, { source, target });
  }

  /** Add a variable node to the syntax tree */
  insertVariableNode(
    node: SerializedNodeModel & VariableNodeModelOptions
  ): void {
    const name = node.name;
    if (!this.isVariableNameTaken(node.name)) {
      const varNode = new VariableSyntaxNode('?' + name);
      this.primitives.set(node.id, varNode);
      this.nodes.set(node.id, varNode);
      this.freeVariables.set(node.ports[0].id, varNode.params.out);
    } else {
      throw new Error(`Duplicate variable name '${name}' in pattern`);
    }
  }

  insertStringNode(node: SerializedNodeModel & StringNodeModelOptions): void {
    const strNode = new StringSyntaxNode(`"${node.value}"`);
    this.primitives.set(node.id, strNode);
    this.nodes.set(node.id, strNode);
    this.freeVariables.set(node.ports[0].id, strNode.params.out);
  }

  insertNumberNode(node: SerializedNodeModel & NumberNodeModelOptions): void {
    const numNode = new NumberSyntaxNode(node.value);
    this.primitives.set(node.id, numNode);
    this.nodes.set(node.id, numNode);
    this.freeVariables.set(node.ports[0].id, numNode.params.out);
  }

  insertBoolNode(node: SerializedNodeModel & BoolNodeModelOptions): void {
    const boolNode = new BooleanSyntaxNode(node.value);
    this.primitives.set(node.id, boolNode);
    this.nodes.set(node.id, boolNode);
    this.freeVariables.set(node.ports[0].id, boolNode.params.out);
  }

  insertPersonNode(node: SerializedNodeModel & PersonNodeModelOptions): void {
    const outputVar = `?person_${this.numPersonNodes}`;
    // Map the internal options to their ports
    const syntaxNode = new PersonSyntaxNode(outputVar);
    // loop through the ports
    for (const port of node.ports) {
      if (!port.links.length) {
        continue;
      }

      switch (port.name) {
        case 'gender': {
          const freeVar: Param = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.gender = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'age': {
          const freeVar = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.age = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'occupation': {
          const freeVar = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.occupation = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'alive': {
          const freeVar = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.alive = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'out': {
          this.freeVariables.set(port.id, syntaxNode.params.out);
          break;
        }
        default:
          break;
      }
    }

    this.nodes.set(node.id, syntaxNode);

    this.numPersonNodes += 1;
  }

  insertEventNode(node: SerializedNodeModel & EventNodeModelOptions): void {
    return;
  }

  insertRelationshipNode(
    node: SerializedNodeModel & RelationshipNodeModelOptions
  ): void {
    const outputVar = `?relationship_${this.numPersonNodes}`;
    const syntaxNode = new RelationshipSyntaxNode(outputVar);

    for (const port of node.ports) {
      if (!port.links.length) {
        continue;
      }

      switch (port.name) {
        case 'owner': {
          const freeVar: Param = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.owner = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'target': {
          const freeVar: Param = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.target = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'spark': {
          const freeVar: Param = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.spark = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'charge': {
          const freeVar: Param = {
            dependency: this.dependencies.get(port.links[0]).source,
          };
          syntaxNode.params.charge = freeVar;
          this.freeVariables.set(port.id, freeVar);
          break;
        }
        case 'out': {
          this.freeVariables.set(port.id, syntaxNode.params.out);
          break;
        }
        default:
          break;
      }
    }

    this.nodes.set(node.id, syntaxNode);

    this.numRelationshipNodes += 1;
  }

  getCode(): string {
    let str = '';
    for (const [, node] of this.nodes) {
      if (node instanceof PersonSyntaxNode) {
        str += `[${node.params.out.value} "sim/type" "person"]\n`;
        if (node.params.gender) {
          const val = this.findDependency(node.params.gender);
          str += `[${node.params.out.value} "person/gender" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.age) {
          const val = this.findDependency(node.params.age);
          str += `[${node.params.out.value} "person/age" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.occupation) {
          const val = this.findDependency(node.params.occupation);
          str += `[${node.params.out.value} "person/occupation" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.alive) {
          const val = this.findDependency(node.params.alive);
          str += `[${node.params.out.value} "person/alive" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
      }
      if (node instanceof RelationshipSyntaxNode) {
        str += `[${node.params.out.value} "sim/type" "relationship"]\n`;
        if (node.params.owner) {
          const val = this.findDependency(node.params.owner);
          str += `[${node.params.out.value} "relationship/owner" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.target) {
          const val = this.findDependency(node.params.target);
          str += `[${node.params.out.value} "relationship/target" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.spark) {
          const val = this.findDependency(node.params.spark);
          str += `[${node.params.out.value} "relationship/spark" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
        if (node.params.charge) {
          const val = this.findDependency(node.params.charge);
          str += `[${node.params.out.value} "relationship/charge" ${
            val !== undefined ? val : '_'
          }]\n`;
        }
      }
    }
    return str;
  }

  findDependency(param: Param): string | boolean | number {
    let focus = param;
    while (focus && focus.dependency) {
      if (!this.freeVariables.has(focus.dependency)) {
        throw new Error ('Dependency param object missing from map');
      }
      focus = this.freeVariables.get(focus.dependency);
    }
    return focus?.value ?? '_';
  }

  private isVariableNameTaken(name: string): boolean {
    return this.usedNames.has(name);
  }
}
