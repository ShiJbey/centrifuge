import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface OnlyChildNodeModelOptions {
  label?: string;
  color?: string;
}

export interface OnlyChildNodeModelGenerics {
  OPTIONS: OnlyChildNodeModelOptions;
}

export class OnlyChildNodeModel extends NodeModel<
  OnlyChildNodeModelGenerics & NodeModelGenerics
> {
  public personPort: DefaultPortModel;

  constructor(
    options: OnlyChildNodeModelOptions = {
      label: 'Only Child'
    }
  ) {
    super({
      ...options,
      type: 'only-child-node',
    });

    this.personPort = new DefaultPortModel({
      in: true,
      name: 'person',
      label: 'Person',
      alignment: PortModelAlignment.LEFT,
    });

    this.addPort(this.personPort);
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
