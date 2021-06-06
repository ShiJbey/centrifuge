import * as React from 'react';
import { PersonNodeModel, PERSON_NODE_TYPE } from './PersonNodeModel';
import { PersonNodeWidget } from './PersonNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class PersonNodeFactory extends AbstractReactFactory<PersonNodeModel, DiagramEngine> {
	constructor() {
		super(PERSON_NODE_TYPE);
	}

	public generateModel(): PersonNodeModel {
		return new PersonNodeModel();
	}

	public generateReactWidget(event: GenerateWidgetEvent<PersonNodeModel>): JSX.Element {
		return <PersonNodeWidget engine={this.engine} node={event.model} />;
	}
}
