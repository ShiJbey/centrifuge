import * as React from 'react';
import { FamilyRelationshipNodeModel } from './FamilyRelationshipNodeModel';
import { FamilyRelationshipNodeWidget } from './FamilyRelationshipNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class FamilyRelationshipNodeFactory extends AbstractReactFactory<FamilyRelationshipNodeModel, DiagramEngine> {

  constructor() {
    super('family-relationship-node');
  }

  public generateModel(): FamilyRelationshipNodeModel {
    return new FamilyRelationshipNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<FamilyRelationshipNodeModel>): JSX.Element {
    return <FamilyRelationshipNodeWidget engine={this.engine} node={event.model} />
  }
}
