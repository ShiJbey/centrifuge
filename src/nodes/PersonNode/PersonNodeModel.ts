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

export const PERSON_NODE_TYPE = 'person-node'

export interface PersonNodeModelOptions extends BaseModelOptions {
  type: typeof PERSON_NODE_TYPE,
  label?: string;
  color?: string;
  age?: string;
  occupation?: string;
  gender?: string;
  alive?: boolean;
}

export interface PersonNodeModelGenerics {
  OPTIONS: PersonNodeModelOptions;
}

export class PersonNodeModel extends NodeModel<
  PersonNodeModelGenerics & NodeModelGenerics
> {

  public outPort: DefaultPortModel;
  public agePort: DefaultPortModel;
  public genderPort: DefaultPortModel;
  public alivePort: DefaultPortModel;
  public adultPort: DefaultPortModel;
  public occupationPort: DefaultPortModel;

  constructor(options: PersonNodeModelOptions = { type: PERSON_NODE_TYPE, label: 'Person' }) {
    super({
      ...options,
    });

    this.agePort = new DefaultPortModel({
      in: true,
      name: 'age',
      label: 'age',
      alignment: PortModelAlignment.LEFT,
    });

    this.genderPort = new DefaultPortModel({
      in: true,
      name: 'gender',
      label: 'gender',
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

    this.occupationPort = new DefaultPortModel({
      in: true,
      name: 'occupation',
      label: 'Occ.',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'person',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.agePort);
    this.addPort(this.genderPort);
    this.addPort(this.alivePort);
    this.addPort(this.adultPort);
    this.addPort(this.occupationPort);
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
