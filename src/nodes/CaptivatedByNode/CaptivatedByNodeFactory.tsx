import * as React from 'react';
import { CaptivatedByNodeModel } from './CaptivatedByNodeModel';
import { CaptivatedByNodeWidget } from './CaptivatedByNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class CaptivatedByNodeFactory extends AbstractReactFactory<CaptivatedByNodeModel, DiagramEngine> {

  constructor() {
    super('captivated-by-node');
  }

  public generateModel(): CaptivatedByNodeModel {
    return new CaptivatedByNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<CaptivatedByNodeModel>): JSX.Element {
    return <CaptivatedByNodeWidget engine={this.engine} node={event.model} />
  }
}
