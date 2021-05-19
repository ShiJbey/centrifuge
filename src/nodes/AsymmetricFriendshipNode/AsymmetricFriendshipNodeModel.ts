import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface AsymmetricFriendshipNodeModelOptions {
  label?: string;
  color?: string;
}

export interface AsymmetricFriendshipNodeModelGenerics {
  OPTIONS: AsymmetricFriendshipNodeModelOptions;
}

export class AsymmetricFriendshipNodeModel extends NodeModel<
  AsymmetricFriendshipNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;

  constructor(
    options: AsymmetricFriendshipNodeModelOptions = {
      label: 'Asymmetric Friendship'
    }
  ) {
    super({
      ...options,
      type: 'asymmetric-friendship-node',
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
