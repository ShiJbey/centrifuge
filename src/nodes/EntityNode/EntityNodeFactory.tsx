import * as React from 'react';
import { EntityNodeModel, ENTITY_NODE_TYPE } from './EntityNodeModel';
import { EntityNodeWidget } from './EntityNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
    GenerateModelEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class EntityNodeFactory extends AbstractReactFactory<
    EntityNodeModel,
    DiagramEngine
> {
    constructor() {
        super(ENTITY_NODE_TYPE);
    }

    public generateModel(event: GenerateModelEvent): EntityNodeModel {
        return new EntityNodeModel(event.initialConfig);
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<EntityNodeModel>
    ): JSX.Element {
        return <EntityNodeWidget engine={this.engine} node={event.model} />;
    }
}
