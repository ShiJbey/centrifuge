import * as React from 'react';
import { RelationshipNodeModel, RELATIONSHIP_NODE_TYPE } from './RelationshipNodeModel';
import { RelationshipNodeWidget } from './RelationshipNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class RelationshipNodeFactory extends AbstractReactFactory<
	RelationshipNodeModel,
	DiagramEngine
> {
	constructor() {
		super(RELATIONSHIP_NODE_TYPE);
	}

	public generateModel(): RelationshipNodeModel {
		return new RelationshipNodeModel();
	}

	public generateReactWidget(event: GenerateWidgetEvent<RelationshipNodeModel>): JSX.Element {
		return <RelationshipNodeWidget engine={this.engine} node={event.model} />;
	}
}
