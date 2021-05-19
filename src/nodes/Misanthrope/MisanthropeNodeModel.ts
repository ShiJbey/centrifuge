import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface MisanthropeNodeModelOptions {
  label?: string;
  color?: string;
}

export interface MisanthropeNodeModelGenerics {
  OPTIONS: MisanthropeNodeModelOptions;
}

export class MisanthropeNodeModel extends NodeModel<
  MisanthropeNodeModelGenerics & NodeModelGenerics
> {
  public personPort: DefaultPortModel;

  constructor(
    options: MisanthropeNodeModelOptions = {
      label: 'Misanthrope'
    }
  ) {
    super({
      ...options,
      type: 'misanthrope-node',
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
