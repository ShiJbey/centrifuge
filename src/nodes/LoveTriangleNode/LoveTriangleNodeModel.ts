import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface LoveTriangleNodeModelOptions {
  label?: string;
  color?: string;
}

export interface LoveTriangleNodeModelGenerics {
  OPTIONS: LoveTriangleNodeModelOptions;
}

export class LoveTriangleNodeModel extends NodeModel<
  LoveTriangleNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;
  public person3Port: DefaultPortModel;

  constructor(
    options: LoveTriangleNodeModelOptions = {
      label: 'Love Triangle'
    }
  ) {
    super({
      ...options,
      type: 'love-triangle-node',
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

    this.person3Port = new DefaultPortModel({
      in: true,
      name: 'person_3',
      label: 'Person 3',
      alignment: PortModelAlignment.LEFT,
    });

    this.addPort(this.person1Port);
    this.addPort(this.person2Port);
    this.addPort(this.person3Port);
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
