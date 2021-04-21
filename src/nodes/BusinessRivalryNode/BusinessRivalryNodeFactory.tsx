import * as React from 'react';
import { BusinessRivalryNodeModel } from './BusinessRivalryNodeModel';
import { BusinessRivalryNodeWidget } from './BusinessRivalryNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class BusinessRivalryNodeFactory extends AbstractReactFactory<BusinessRivalryNodeModel, DiagramEngine> {

  constructor() {
    super('business-rivalry-node');
  }

  public generateModel(): BusinessRivalryNodeModel {
    return new BusinessRivalryNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<BusinessRivalryNodeModel>): JSX.Element {
    return <BusinessRivalryNodeWidget engine={this.engine} node={event.model} />
  }
}
