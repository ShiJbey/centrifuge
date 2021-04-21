import * as React from 'react';
import { BoolNodeModel } from './BoolNodeModel';
import { BoolNodeWidget } from './BoolNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class BoolNodeFactory extends AbstractReactFactory<BoolNodeModel, DiagramEngine> {

  constructor() {
    super('bool-node');
  }

  public generateModel(): BoolNodeModel {
    return new BoolNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<BoolNodeModel>): JSX.Element {
    return <BoolNodeWidget engine={this.engine} node={event.model} />
  }
}
