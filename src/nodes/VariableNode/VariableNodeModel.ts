import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const VARIABLE_NODE_TYPE = 'variable-node';

export interface VariableNodeModelOptions {
  type: typeof VARIABLE_NODE_TYPE;
  label: string;
  name: string;
}

export interface VariableNodeModelGenerics {
  OPTIONS: VariableNodeModelOptions;
}

export class VariableNodeModel extends NodeModel<
  VariableNodeModelGenerics & NodeModelGenerics
> {
  public outPort: DefaultPortModel;

  constructor(
    options: VariableNodeModelOptions = {
      type: VARIABLE_NODE_TYPE,
      label: 'Variable',
      name: 'X',
    }
  ) {
    super({
      ...options,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Var',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.outPort);
  }

  public serialize(): any {
    return {
      ...super.serialize(),
      ...this.options,
    };
  }

  public deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
  }
}
