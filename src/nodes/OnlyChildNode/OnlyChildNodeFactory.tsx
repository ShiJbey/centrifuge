import * as React from 'react';
import { OnlyChildNodeModel } from './OnlyChildNodeModel';
import { OnlyChildNodeWidget } from './OnlyChildNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OnlyChildNodeFactory extends AbstractReactFactory<OnlyChildNodeModel, DiagramEngine> {

  constructor() {
    super('only-child-node');
  }

  public generateModel(): OnlyChildNodeModel {
    return new OnlyChildNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<OnlyChildNodeModel>): JSX.Element {
    return <OnlyChildNodeWidget engine={this.engine} node={event.model} />
  }
}
