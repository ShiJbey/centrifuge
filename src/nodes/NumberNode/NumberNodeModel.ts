import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const NUMBER_NODE_TYPE = 'number-node';

export interface NumberNodeModelOptions {
  type: typeof NUMBER_NODE_TYPE;
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
      type: NUMBER_NODE_TYPE,
      label: 'Number',
      value: 0,
    }
  ) {
    super({
      ...options,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Num',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.outPort);
  }

  public serialize(): SerializedNodeModel & NumberNodeModelOptions {
    return {
      ...super.serialize(),
      ...this.options,
    };
  }

  public deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.options.value = event.data.value;
  }
}
