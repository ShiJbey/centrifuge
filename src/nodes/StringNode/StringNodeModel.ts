import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const STRING_NODE_TYPE = 'string-node';

export interface StringNodeModelOptions {
  type: typeof STRING_NODE_TYPE
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
      type: STRING_NODE_TYPE,
      label: 'String',
      value: 'new string',
    }
  ) {
    super({
      ...options,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Str',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.outPort);
  }

  public serialize(): SerializedNodeModel & StringNodeModelOptions  {
    return {
      ...super.serialize(),
      ...this.options,
    };
  }

  public deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.options.label = event.data.label;
    this.options.value = event.data.value;
  }
}
