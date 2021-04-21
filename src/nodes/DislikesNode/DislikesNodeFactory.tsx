import * as React from 'react';
import { DislikesNodeModel } from './DislikesNodeModel';
import { DislikesNodeWidget } from './DislikesNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DislikesNodeFactory extends AbstractReactFactory<DislikesNodeModel, DiagramEngine> {

  constructor() {
    super('dislikes-node');
  }

  public generateModel(): DislikesNodeModel {
    return new DislikesNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<DislikesNodeModel>): JSX.Element {
    return <DislikesNodeWidget engine={this.engine} node={event.model} />
  }
}
