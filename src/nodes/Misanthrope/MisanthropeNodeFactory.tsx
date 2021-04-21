import * as React from 'react';
import { MisanthropeNodeModel } from './MisanthropeNodeModel';
import { MisanthropeNodeWidget } from './MisanthropeNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class MisanthropeNodeFactory extends AbstractReactFactory<MisanthropeNodeModel, DiagramEngine> {

  constructor() {
    super('misanthrope-node');
  }

  public generateModel(): MisanthropeNodeModel {
    return new MisanthropeNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<MisanthropeNodeModel>): JSX.Element {
    return <MisanthropeNodeWidget engine={this.engine} node={event.model} />
  }
}
