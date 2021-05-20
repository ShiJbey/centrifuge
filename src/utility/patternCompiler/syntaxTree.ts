export interface TreeNode {
  params: { [key: string]: Param };
  toString: () => string;
}

export interface Param<T = any> {
  name: string;
  value?: T;
  dependency?: string;
}

export class PersonSyntaxNode implements TreeNode {
  params: {
    out: Param<string>;
    gender?: Param<string>;
    age?: Param<number>;
  };

  constructor(name: string, options?: { [key: string]: any }) {
    this.params = {
      out: { value: name ? "$" + name : "$relationship" },
    };
  }
}

export class RelationshipSyntaxNode implements TreeNode {
  params: {
    out: Param<string>;
    owner: Param<string>;
    target: Param<string>;
  };

  constructor(name: string, owner: string, target: string) {
    this.params = {
      out: { value: name ? "$" + name : "$relationship" },
      owner: owner ? { dependency: owner } : { value: "_" },
      target: target ? { dependency: target } : { value: "_" },
    };
  }

  toString(): string {
    const str =
      "== Relationship ==\n" +
      "Input:\n" +
      `\towner:${JSON.stringify(this.params.owner)}\n` +
      `\ttarget${JSON.stringify(this.params.target)}\n` +
      "Output:\n" +
      `\t${JSON.stringify(this.params.out)}`;
    return str;
  }
}

export interface EventSyntaxNode extends TreeNode {
  params: {
    event: Param;
  };
}

export class VariableSyntaxNode implements TreeNode {
  params: { variable: Param<string> };

  constructor(name: string) {
    this.params = { variable: { value: name } };
  }

  toString(): string {
    return this.params.variable.value;
  }
}

export class NumberSyntaxNode implements TreeNode {
  params: { value: Param<number> };

  constructor(value: number) {
    this.params = { value: { value: value } };
  }

  get value(): number {
    return this.params.value.value;
  }

  toString(): string {
    return this.params.value.value.toString();
  }
}

export class StringSyntaxNode implements TreeNode {
  params: { value: Param<string> };

  constructor(value: string) {
    this.params = { value: { value: value } };
  }

  get value(): string {
    return this.params.value.value;
  }

  toString(): string {
    return this.params.value.value;
  }
}

export class BooleanSyntaxNode implements TreeNode {
  params: { value: Param<boolean> };

  constructor(value: boolean) {
    this.params = { value: { value } };
  }

  get value(): boolean {
    return this.params.value.value;
  }

  toString(): string {
    return String(this.params.value.value);
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
  primitives: { [id: string]: PrimitiveNodeTypes } = {};
  dependencies: { [id: string]: { source: string; target: string } } = {};
  nodes: { [id: string]: SyntaxTreeNodeTypes } = {};
  outputValues: { [id: string]: }

  private usedNames: Set<string> = new Set<string>();

  addDependency(id: string, source: string, target: string) {
    this.dependencies[id] = { source, target };
  }

  /** Add a variable node to the syntax tree */
  insertVariableNode(id: string, name: string): void {
    if (!this.isVariableNameTaken(name)) {
      this.primitives[id] = new VariableSyntaxNode("$" + name);
    } else {
      throw new Error(`Duplicate variable name '${name}' in pattern`);
    }
  }

  insertStringNode(id: string, value: string): void {
    this.primitives[id] = new StringSyntaxNode(value);
  }

  insertNumberNode(id: string, value: number): void {
    this.primitives[id] = new NumberSyntaxNode(value);
  }

  insertBoolNode(id: string, value: boolean): void {
    this.primitives[id] = new BooleanSyntaxNode(value);
  }

  insertPersonNode(id: string): void {
    //
  }

  insertRelationshipNode(
    id: string,
    name: string,
    ownerLink: string,
    targetLink: string
  ): void {
    let owner: string;
    let target: string;

    if (ownerLink) owner = this.dependencies[ownerLink].source;

    if (targetLink) target = this.dependencies[targetLink].source;

    this.relationships[id] = new RelationshipSyntaxNode(name, owner, target);
  }

  compile(): string {
    let code = "";

    for (const v of Object.values(this.relationships)) {
      // Walk through the dependencies
      // let ownerVar =
      // if (v.params.target.dependency) {
      // }
      code += '';
    }

    return code;
  }

  toString(): string {
    let str = "";

    // Variables
    str += "Variables:\n";
    for (const v of Object.values(this.variables)) {
      str += `\t${v.toString()}\n`;
    }
    str += "Values:\n";
    for (const v of Object.values(this.values)) {
      str += `\t${v.toString()}\n`;
    }
    str += "==== Entities ===\n";
    for (const v of Object.values(this.relationships)) {
      str += `\t${v.toString()}\n`;
    }

    return str;
  }

  private findDependency(param: Param): any {
    let focus = param;
    let value = focus.value;

    while (!value) {
      focus = this.nodes[param.dependency].params['out'];
    }

    return value;
  }

  /** Check if a variable name has already been used */
  private isVariableNameTaken(name: string): boolean {
    return this.usedNames.has(name);
  }
}
