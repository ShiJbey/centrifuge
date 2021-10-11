import * as React from 'react';
import { LogicalNodeModel, LOGICAL_NODE_TYPE } from './LogicalNodeModel';
import { LogicalNodeWidget } from './LogicalNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
    GenerateModelEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class LogicalNodeFactory extends AbstractReactFactory<
    LogicalNodeModel,
    DiagramEngine
> {
    constructor() {
        super(LOGICAL_NODE_TYPE);
    }

    public generateModel(event: GenerateModelEvent): LogicalNodeModel {
        return new LogicalNodeModel(event.initialConfig);
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<LogicalNodeModel>
    ): JSX.Element {
        return <LogicalNodeWidget engine={this.engine} node={event.model} />;
    }
}
