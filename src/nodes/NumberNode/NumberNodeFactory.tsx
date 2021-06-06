import * as React from 'react';
import { NumberNodeModel, NUMBER_NODE_TYPE } from './NumberNodeModel';
import { NumberNodeWidget } from './NumberNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class NumberNodeFactory extends AbstractReactFactory<NumberNodeModel, DiagramEngine> {
	constructor() {
		super(NUMBER_NODE_TYPE);
	}

	public generateModel(): NumberNodeModel {
		return new NumberNodeModel();
	}

	public generateReactWidget(event: GenerateWidgetEvent<NumberNodeModel>): JSX.Element {
		return <NumberNodeWidget engine={this.engine} node={event.model} />;
	}
}
