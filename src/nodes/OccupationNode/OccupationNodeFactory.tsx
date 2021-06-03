import * as React from 'react';
import { OccupationNodeModel, OCCUPATION_NODE_TYPE } from './OccupationNodeModel';
import { OccupationNodeWidget } from './OccupationNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OccupationNodeFactory extends AbstractReactFactory<OccupationNodeModel, DiagramEngine> {

  constructor() {
    super(OCCUPATION_NODE_TYPE);
  }

  public generateModel(): OccupationNodeModel {
    return new OccupationNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<OccupationNodeModel>): JSX.Element {
    return <OccupationNodeWidget engine={this.engine} node={event.model} />
  }
}
