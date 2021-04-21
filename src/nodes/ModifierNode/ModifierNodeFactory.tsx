import * as React from 'react';
import { ModifierNodeModel } from './ModifierNodeModel';
import { ModifierNodeWidget } from './ModifierNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ModifierNodeFactory extends AbstractReactFactory<ModifierNodeModel, DiagramEngine> {

  constructor() {
    super('modifier-node');
  }

  public generateModel(): ModifierNodeModel {
    return new ModifierNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<ModifierNodeModel>): JSX.Element {
    return <ModifierNodeWidget engine={this.engine} node={event.model} />
  }
}
