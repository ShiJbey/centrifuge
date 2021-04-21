import * as React from 'react';
import { ExtramaritalInterestNodeModel } from './ExtramaritalInterestNodeModel';
import { ExtramaritalInterestNodeWidget } from './ExtramaritalInterestNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ExtramaritalInterestNodeFactory extends AbstractReactFactory<ExtramaritalInterestNodeModel, DiagramEngine> {

  constructor() {
    super('extramarital-interest-node');
  }

  public generateModel(): ExtramaritalInterestNodeModel {
    return new ExtramaritalInterestNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<ExtramaritalInterestNodeModel>): JSX.Element {
    return <ExtramaritalInterestNodeWidget engine={this.engine} node={event.model} />
  }
}
