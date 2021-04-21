import * as React from 'react';
import { NumberNodeModel } from './NumberNodeModel';
import { NumberNodeWidget } from './NumberNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class NumberNodeFactory extends AbstractReactFactory<NumberNodeModel, DiagramEngine> {

  constructor() {
    super('number-node');
  }

  public generateModel(): NumberNodeModel {
    return new NumberNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<NumberNodeModel>): JSX.Element {
    return <NumberNodeWidget engine={this.engine} node={event.model} />
  }
}
