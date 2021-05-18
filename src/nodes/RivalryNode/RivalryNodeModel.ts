import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface RivalryNodeModelOptions {
  label?: string;
  color?: string;
}

export interface RivalryNodeModelGenerics {
  OPTIONS: RivalryNodeModelOptions;
}

export class RivalryNodeModel extends NodeModel<
  RivalryNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;

  constructor(
    options: RivalryNodeModelOptions = {
      label: 'Rivalry'
    }
  ) {
    super({
      ...options,
      type: 'rivalry-node',
    });

    this.person1Port = new DefaultPortModel({
      in: true,
      name: 'person_1',
      label: 'Person 1',
      alignment: PortModelAlignment.LEFT,
    });

    this.person2Port = new DefaultPortModel({
      in: true,
      name: 'person_2',
      label: 'Person 2',
      alignment: PortModelAlignment.LEFT,
    });

    this.addPort(this.person1Port);
    this.addPort(this.person2Port);
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
