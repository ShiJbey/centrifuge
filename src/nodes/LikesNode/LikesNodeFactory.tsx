import * as React from 'react';
import { LikesNodeModel } from './LikesNodeModel';
import { LikesNodeWidget } from './LikesNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class LikesNodeFactory extends AbstractReactFactory<LikesNodeModel, DiagramEngine> {

  constructor() {
    super('likes-node');
  }

  public generateModel(): LikesNodeModel {
    return new LikesNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<LikesNodeModel>): JSX.Element {
    return <LikesNodeWidget engine={this.engine} node={event.model} />
  }
}
