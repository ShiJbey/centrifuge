import * as React from 'react';
import { EventNodeModel } from './EventNodeModel';
import { EventNodeWidget } from './EventNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class EventNodeFactory extends AbstractReactFactory<EventNodeModel, DiagramEngine> {

  constructor() {
    super('event-node');
  }

  public generateModel(): EventNodeModel {
    return new EventNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<EventNodeModel>): JSX.Element {
    return <EventNodeWidget engine={this.engine} node={event.model} />
  }
}
