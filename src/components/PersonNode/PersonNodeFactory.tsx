import * as React from 'react';
import { PersonNodeModel } from './PersonNodeModel';
import { PersonNodeWidget } from './PersonNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class PersonNodeFactory extends AbstractReactFactory<PersonNodeModel, DiagramEngine> {

  constructor() {
    super('person-node');
  }

  public generateModel(config?: any): PersonNodeModel {
    return new PersonNodeModel(config);
  }

  public generateReactWidget(event: GenerateWidgetEvent<PersonNodeModel>): JSX.Element {
    return <PersonNodeWidget engine={this.engine} node={event.model} />
  }
}
