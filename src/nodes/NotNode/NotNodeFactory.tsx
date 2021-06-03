import * as React from 'react';
import { NOT_NODE_TYPE, NotNodeModel } from './NotNodeModel';
import { NotNodeWidget } from './NotNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class NotNodeFactory extends AbstractReactFactory<NotNodeModel, DiagramEngine> {

  constructor() {
    super(NOT_NODE_TYPE);
  }

  public generateModel(): NotNodeModel {
    return new NotNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<NotNodeModel>): JSX.Element {
    return <NotNodeWidget engine={this.engine} node={event.model} />
  }
}
