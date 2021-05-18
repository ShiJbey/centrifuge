import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface ModifierNodeModelOptions {
  label: string;
  name?: string;
}

export interface ModifierNodeModelGenerics {
  OPTIONS: ModifierNodeModelOptions;
}

export class ModifierNodeModel extends NodeModel<
  ModifierNodeModelGenerics & NodeModelGenerics
> {
  public outPort: DefaultPortModel;
  public valueAPort: DefaultPortModel;
  public valueBPort: DefaultPortModel

  constructor(
    options: ModifierNodeModelOptions = {
      label: 'Modifier',
      name: 'X',
    }
  ) {
    super({
      ...options,
      type: 'modifier-node',
    });

    this.valueAPort = new DefaultPortModel({
      in: true,
      name: 'valueA',
      label: 'value A',
      alignment: PortModelAlignment.LEFT,
    });

    this.valueBPort = new DefaultPortModel({
      in: true,
      name: 'valueB',
      label: 'value B',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'value A',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.valueAPort);
    this.addPort(this.valueBPort);
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
