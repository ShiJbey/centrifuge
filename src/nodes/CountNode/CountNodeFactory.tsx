import * as React from 'react';
import { CountNodeModel, COUNT_NODE_TYPE } from './CountNodeModel';
import { CountNodeWidget } from './CountNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class CountNodeFactory extends AbstractReactFactory<CountNodeModel, DiagramEngine> {
	constructor() {
		super(COUNT_NODE_TYPE);
	}

	public generateModel(): CountNodeModel {
		return new CountNodeModel();
	}

	public generateReactWidget(event: GenerateWidgetEvent<CountNodeModel>): JSX.Element {
		return <CountNodeWidget engine={this.engine} node={event.model} />;
	}
}
