import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const EVENT_NODE_TYPE = 'event-node';

export interface EventNodeModelOptions {
  type: typeof EVENT_NODE_TYPE;
  label?: string;
  color?: string;
  eventType?: string;
}

export interface EventNodeModelGenerics {
  OPTIONS: EventNodeModelOptions;
}

export class EventNodeModel extends NodeModel<
  EventNodeModelGenerics & NodeModelGenerics
> {

  public subjectPort: DefaultPortModel;
  public beforePort: DefaultPortModel;
  public afterPort: DefaultPortModel;
  public outPort: DefaultPortModel;

  constructor(
    options: EventNodeModelOptions = {
      type: EVENT_NODE_TYPE,
      label: 'Event'
    }
  ) {
    super({
      ...options,
    });

    this.subjectPort = new DefaultPortModel({
      in: true,
      name: 'subjects',
      label: 'Subject(s)',
      alignment: PortModelAlignment.LEFT,
    });

    this.beforePort = new DefaultPortModel({
      in: true,
      name: 'before',
      label: 'Event Before',
      alignment: PortModelAlignment.LEFT,
    });

    this.afterPort = new DefaultPortModel({
      in: true,
      name: 'after',
      label: 'Event After',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.subjectPort);
    this.addPort(this.beforePort);
    this.addPort(this.afterPort);
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
