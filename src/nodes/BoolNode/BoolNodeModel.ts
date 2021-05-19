import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const BOOL_NODE_TYPE = 'bool-node'

export interface BoolNodeModelOptions {
  type: typeof BOOL_NODE_TYPE;
  label: string;
  value: boolean;
}

export interface BoolNodeModelGenerics {
  OPTIONS: BoolNodeModelOptions;
}

export class BoolNodeModel extends NodeModel<
  BoolNodeModelGenerics & NodeModelGenerics
> {
  public outPort: DefaultPortModel;

  constructor(
    options: BoolNodeModelOptions = {
      type: BOOL_NODE_TYPE,
      label: 'Boolean',
      value: false,
    }
  ) {
    super({
      ...options,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Bool',
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
