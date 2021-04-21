import * as React from 'react';
import { RivalryNodeModel } from './RivalryNodeModel';
import { RivalryNodeWidget } from './RivalryNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class RivalryNodeFactory extends AbstractReactFactory<RivalryNodeModel, DiagramEngine> {

  constructor() {
    super('rivalry-node');
  }

  public generateModel(): RivalryNodeModel {
    return new RivalryNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<RivalryNodeModel>): JSX.Element {
    return <RivalryNodeWidget engine={this.engine} node={event.model} />
  }
}
