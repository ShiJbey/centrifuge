import * as React from 'react';
import { JealousUncleNodeModel } from './JealousUncleNodeModel';
import { JealousUncleNodeWidget } from './JealousUncleNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class JealousUncleNodeFactory extends AbstractReactFactory<JealousUncleNodeModel, DiagramEngine> {

  constructor() {
    super('jealous-uncle-node');
  }

  public generateModel(): JealousUncleNodeModel {
    return new JealousUncleNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<JealousUncleNodeModel>): JSX.Element {
    return <JealousUncleNodeWidget engine={this.engine} node={event.model} />
  }
}
