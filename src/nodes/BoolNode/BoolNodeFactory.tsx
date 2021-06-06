import * as React from 'react';
import { BoolNodeModel, BOOL_NODE_TYPE } from './BoolNodeModel';
import { BoolNodeWidget } from './BoolNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class BoolNodeFactory extends AbstractReactFactory<BoolNodeModel, DiagramEngine> {
	constructor() {
		super(BOOL_NODE_TYPE);
	}

	public generateModel(): BoolNodeModel {
		return new BoolNodeModel();
	}

	public generateReactWidget(event: GenerateWidgetEvent<BoolNodeModel>): JSX.Element {
		return <BoolNodeWidget engine={this.engine} node={event.model} />;
	}
}
