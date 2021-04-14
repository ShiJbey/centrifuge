import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface PersonNodeModelOptions extends BaseModelOptions {
  label?: string;
  color?: string;
}

export class PersonNodeModel extends NodeModel{
  public label: string;
  public color: string;

  constructor(options: PersonNodeModelOptions = {label: 'Person Node'}) {
    super({
      ...options,
      type: 'person-node'
    });

    this.addPort(new DefaultPortModel({ in: false, name: 'relationship' }));
  }

  public serialize(): any {
    return {
      ...super.serialize(),
      color: this.color,
      label: this.label
    }
  }

  public deserialize(event: DeserializeEvent<this>): void {
    this.deserialize(event);
    this.color = event.data.color;
    this.label = event.data.label;
  }
}
