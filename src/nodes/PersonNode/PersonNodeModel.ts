import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
  NodeModelGenerics,
} from '@projectstorm/react-diagrams';
import {
  BaseModelOptions,
  DeserializeEvent,
} from '@projectstorm/react-canvas-core';

export interface PersonNodeModelOptions extends BaseModelOptions {
  label?: string;
  color?: string;
  age?: string;
  occupation?: string;
  sex?: string;
  alive?: boolean;
}

export interface PersonNodeModelGenerics {
  OPTIONS: PersonNodeModelOptions;
}

export class PersonNodeModel extends NodeModel<
  PersonNodeModelGenerics & NodeModelGenerics
> {

  public outPort: DefaultPortModel;
  public sexPort: DefaultPortModel;
  public alivePort: DefaultPortModel;
  public adultPort: DefaultPortModel;

  constructor(options: PersonNodeModelOptions = { label: 'Person' }) {
    super({
      ...options,
      type: 'person-node',
    });

    this.sexPort = new DefaultPortModel({
      in: true,
      name: 'sex',
      label: 'sex',
      alignment: PortModelAlignment.LEFT,
    });

    this.alivePort = new DefaultPortModel({
      in: true,
      name: 'alive',
      label: 'alive',
      alignment: PortModelAlignment.LEFT,
    });

    this.adultPort = new DefaultPortModel({
      in: true,
      name: 'adult',
      label: 'adult',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'person',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.sexPort);
    this.addPort(this.alivePort);
    this.addPort(this.adultPort);
    this.addPort(this.outPort);
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
