import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface BoolNodeModelOptions {
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
      label: 'Boolean',
      value: false,
    }
  ) {
    super({
      ...options,
      type: 'bool-node',
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
    this.deserialize(event);
  }
}
