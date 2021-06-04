import * as React from 'react';
import { OutputNodeModel, OUTPUT_NODE_TYPE } from './OutputNodeModel';
import { OutputNodeWidget } from './OutputNodeWidget';
import {
	AbstractReactFactory,
	GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class OutputNodeFactory extends AbstractReactFactory<
	OutputNodeModel,
	DiagramEngine
> {
	constructor() {
		super(OUTPUT_NODE_TYPE);
	}

	public generateModel(): OutputNodeModel {
		return new OutputNodeModel();
	}

	public generateReactWidget(
		event: GenerateWidgetEvent<OutputNodeModel>
	): JSX.Element {
		return <OutputNodeWidget engine={this.engine} node={event.model} />;
	}
}
