import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface StringNodeModelOptions {
  label: string;
  value: string;
}

export interface StringNodeModelGenerics {
  OPTIONS: StringNodeModelOptions;
}

export class StringNodeModel extends NodeModel<
  StringNodeModelGenerics & NodeModelGenerics
> {
  public outPort: DefaultPortModel;

  constructor(
    options: StringNodeModelOptions = {
      label: 'String',
      value: 'new string',
    }
  ) {
    super({
      ...options,
      type: 'string-node',
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Str',
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
