import * as React from 'react';
import { BusinessNodeModel } from './BusinessNodeModel';
import { BusinessNodeWidget } from './BusinessNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class BusinessNodeFactory extends AbstractReactFactory<BusinessNodeModel, DiagramEngine> {

  constructor() {
    super('business-node');
  }

  public generateModel(): BusinessNodeModel {
    return new BusinessNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<BusinessNodeModel>): JSX.Element {
    return <BusinessNodeWidget engine={this.engine} node={event.model} />
  }
}
