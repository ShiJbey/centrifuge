import * as React from 'react';
import { LoveTriangleNodeModel } from './LoveTriangleNodeModel';
import { LoveTriangleNodeWidget } from './LoveTriangleNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class LoveTriangleNodeFactory extends AbstractReactFactory<LoveTriangleNodeModel, DiagramEngine> {

  constructor() {
    super('love-triangle-node');
  }

  public generateModel(): LoveTriangleNodeModel {
    return new LoveTriangleNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<LoveTriangleNodeModel>): JSX.Element {
    return <LoveTriangleNodeWidget engine={this.engine} node={event.model} />
  }
}
