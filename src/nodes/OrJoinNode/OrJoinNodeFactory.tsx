import * as React from 'react';
import { OrJoinNodeModel, OR_JOIN_NODE_TYPE } from './OrJoinNodeModel';
import { OrJoinNodeWidget } from './OrJoinNodeWidget';
import {
	AbstractReactFactory,
	GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OrJoinNodeFactory extends AbstractReactFactory<
	OrJoinNodeModel,
	DiagramEngine
> {
	constructor() {
		super(OR_JOIN_NODE_TYPE);
	}

	public generateModel(): OrJoinNodeModel {
		return new OrJoinNodeModel();
	}

	public generateReactWidget(
		event: GenerateWidgetEvent<OrJoinNodeModel>
	): JSX.Element {
		return <OrJoinNodeWidget engine={this.engine} node={event.model} />;
	}
}
