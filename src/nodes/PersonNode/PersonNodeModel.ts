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

  protected inputPorts: DefaultPortModel[] = [];
  public outPort: DefaultPortModel;

  constructor(options: PersonNodeModelOptions = { type: PERSON_NODE_TYPE, label: 'Person' }) {
    super({
      ...options,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out (P)',
      alignment: PortModelAlignment.RIGHT,
    });
    this.addPort(this.outPort);

    this.addInputPort('birth', 'Birth (E)');
    this.addInputPort('age', 'Age (Num)');
    this.addInputPort('gender', 'Gender (Str+)');
    this.addInputPort('tags', 'Tags (Str+)');
    this.addInputPort('alive', 'Alive (Bool)');
    this.addInputPort('death_year', 'Death Year (Num)');
    this.addInputPort('attracted_to', 'Attracted To (P+)');
    this.addInputPort('friends', 'Friends (P+)');
    this.addInputPort('enemies', 'Enemies (P+)');
    this.addInputPort('aquaintances', 'Acquiantances (P+)');
    this.addInputPort('grieving', 'Grieving (Bool)');
    this.addInputPort('college_graduate', 'College Graduate (Bool)');
    this.addInputPort('retired', 'Retired (Bool)');
    this.addInputPort('occupation', 'Occupation (Occ)');
    this.addInputPort('pregnant', 'Pregnant (Bool)');
    this.addInputPort('attracted_to', 'Attracted To (Str+)');
  }

  private addInputPort(name: string, label: string): DefaultPortModel {
    const port = new DefaultPortModel({
      in: true,
      name,
      label,
      alignment: PortModelAlignment.LEFT,
    });
    this.addPort(port);
    this.inputPorts.push(port);
    return port;
  }

  public getInPorts(): DefaultPortModel[] {
    return this.inputPorts;
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
