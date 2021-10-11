import * as React from 'react';
import { ValueNodeModel, VALUE_NODE_TYPE } from './ValueNodeModel';
import { ValueNodeWidget } from './ValueNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
    GenerateModelEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ValueNodeFactory extends AbstractReactFactory<
    ValueNodeModel,
    DiagramEngine
> {
    constructor() {
        super(VALUE_NODE_TYPE);
    }

    public generateModel(event: GenerateModelEvent): ValueNodeModel {
        return new ValueNodeModel(event.initialConfig);
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<ValueNodeModel>
    ): JSX.Element {
        return <ValueNodeWidget engine={this.engine} node={event.model} />;
    }
}
