import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface ExtramaritalInterestNodeModelOptions {
  label?: string;
  color?: string;
}

export interface ExtramaritalInterestNodeModelGenerics {
  OPTIONS: ExtramaritalInterestNodeModelOptions;
}

export class ExtramaritalInterestNodeModel extends NodeModel<
  ExtramaritalInterestNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;

  constructor(
    options: ExtramaritalInterestNodeModelOptions = {
      label: 'Extramarital Interest'
    }
  ) {
    super({
      ...options,
      type: 'extramarital-interest-node',
    });

    this.person1Port = new DefaultPortModel({
      in: true,
      name: 'person',
      label: 'Person',
      alignment: PortModelAlignment.LEFT,
    });

    this.person2Port = new DefaultPortModel({
      in: true,
      name: 'spouse',
      label: 'Spouse',
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
