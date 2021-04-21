import * as React from 'react';
import { VariableNodeModel } from './VariableNodeModel';
import { VariableNodeWidget } from './VariableNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class VariableNodeFactory extends AbstractReactFactory<VariableNodeModel, DiagramEngine> {

  constructor() {
    super('variable-node');
  }

  public generateModel(): VariableNodeModel {
    return new VariableNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<VariableNodeModel>): JSX.Element {
    return <VariableNodeWidget engine={this.engine} node={event.model} />
  }
}
