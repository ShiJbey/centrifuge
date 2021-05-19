import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface JealousUncleNodeModelOptions {
  label?: string;
  color?: string;
}

export interface JealousUncleNodeModelGenerics {
  OPTIONS: JealousUncleNodeModelOptions;
}

export class JealousUncleNodeModel extends NodeModel<
  JealousUncleNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;

  constructor(
    options: JealousUncleNodeModelOptions = {
      label: 'Jealous Uncle'
    }
  ) {
    super({
      ...options,
      type: 'jealous-uncle-node',
    });

    this.person1Port = new DefaultPortModel({
      in: true,
      name: 'person_1',
      label: 'Person',
      alignment: PortModelAlignment.LEFT,
    });

    this.person2Port = new DefaultPortModel({
      in: true,
      name: 'person_2',
      label: 'Uncle',
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
