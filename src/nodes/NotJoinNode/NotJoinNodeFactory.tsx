import * as React from 'react';
import { NotJoinNodeModel, NOT_JOIN_NODE_TYPE } from './NotJoinNodeModel';
import { NotJoinNodeWidget } from './NotJoinNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class NotJoinNodeFactory extends AbstractReactFactory<NotJoinNodeModel, DiagramEngine> {

  constructor() {
    super(NOT_JOIN_NODE_TYPE);
  }

  public generateModel(): NotJoinNodeModel {
    return new NotJoinNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<NotJoinNodeModel>): JSX.Element {
    return <NotJoinNodeWidget engine={this.engine} node={event.model} />
  }
}
