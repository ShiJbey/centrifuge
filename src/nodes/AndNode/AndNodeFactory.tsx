import * as React from 'react';
import { AndNodeModel, AND_NODE_TYPE } from './AndNodeModel';
import { AndNodeWidget } from './AndNodeWidget';
import {
	AbstractReactFactory,
	GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class AndNodeFactory extends AbstractReactFactory<
	AndNodeModel,
	DiagramEngine
> {
	constructor() {
		super(AND_NODE_TYPE);
	}

	public generateModel(): AndNodeModel {
		return new AndNodeModel();
	}

	public generateReactWidget(
		event: GenerateWidgetEvent<AndNodeModel>
	): JSX.Element {
		return <AndNodeWidget engine={this.engine} node={event.model} />;
	}
}
