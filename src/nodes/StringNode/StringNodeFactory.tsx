import * as React from 'react';
import { StringNodeModel } from './StringNodeModel';
import { StringNodeWidget } from './StringNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class StringNodeFactory extends AbstractReactFactory<StringNodeModel, DiagramEngine> {

  constructor() {
    super('string-node');
  }

  public generateModel(): StringNodeModel {
    return new StringNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<StringNodeModel>): JSX.Element {
    return <StringNodeWidget engine={this.engine} node={event.model} />
  }
}
