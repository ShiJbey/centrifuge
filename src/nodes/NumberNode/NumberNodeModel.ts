import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface NumberNodeModelOptions {
  label: string;
  value: number;
}

export interface NumberNodeModelGenerics {
  OPTIONS: NumberNodeModelOptions;
}

export class NumberNodeModel extends NodeModel<
  NumberNodeModelGenerics & NodeModelGenerics
> {
  public outPort: DefaultPortModel;

  constructor(
    options: NumberNodeModelOptions = {
      label: 'Variable',
      value: 0,
    }
  ) {
    super({
      ...options,
      type: 'number-node',
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Num',
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