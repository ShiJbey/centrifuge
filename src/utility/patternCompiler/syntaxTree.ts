export interface TreeNode {
  params: { [key: string]: Param };
}

export interface Param {
  name: string;
  dependency?: Param;
}

export interface Person extends TreeNode {
  params: {
    person: Param;
  };
}

export interface Relationship extends TreeNode {
  params: {
    relationship: Param;
    owner: Param;
    target: Param;
  };
}

export interface Event extends TreeNode {
  params: {
    event: Param;
  };
}

export class Variable implements TreeNode {
  params: {
    variable: Param;
  };

  constructor(name: string) {
    this.params = {
      variable: { name },
    };
  }

  toString(): string {
    return this.params.variable.name;
  }
}

export class PatternSyntaxTree {
  personCount = 0;
  relationshipCount = 0;
  eventCount = 0;

  variables: { [id: string]: Variable };

  private usedNames: Set<string> = new Set<string>();

  /** Add a variable node to the syntax tree */
  insertVariableNode(id: string, name: string): void {
    if (!this.isVariableNameTaken(name)) {
      this.variables[id] = new Variable('$' + name)
    } else {
      throw new Error(`Duplicate variable name '${name}' in pattern`);
    }
  }

  toString(): string {
    let str = '';

    // Variables
    str += 'Variables:'
    for (const v of Object.values(this.variables)) {
      str += `\t${v.toString()}\n`;
    }

    return str;
  }

  /** Check if a variable name has already been used */
  private isVariableNameTaken(name: string): boolean {
    return this.usedNames.has(name);
  }
}
