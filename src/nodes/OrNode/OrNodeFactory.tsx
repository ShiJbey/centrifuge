import * as React from 'react';
import { OrNodeModel, OR_NODE_TYPE } from './OrNodeModel';
import { OrNodeWidget } from './OrNodeWidget';
import {
	AbstractReactFactory,
	GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OrNodeFactory extends AbstractReactFactory<
	OrNodeModel,
	DiagramEngine
> {
	constructor() {
		super(OR_NODE_TYPE);
	}

	public generateModel(): OrNodeModel {
		return new OrNodeModel();
	}

	public generateReactWidget(
		event: GenerateWidgetEvent<OrNodeModel>
	): JSX.Element {
		return <OrNodeWidget engine={this.engine} node={event.model} />;
	}
}
