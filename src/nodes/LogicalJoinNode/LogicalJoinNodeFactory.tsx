import * as React from 'react';
import {
    LogicalJoinNodeModel,
    LOGICAL_JOIN_NODE_TYPE,
} from './LogicalJoinNodeModel';
import { LogicalJoinNodeWidget } from './LogicalJoinNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
    GenerateModelEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class LogicalJoinNodeFactory extends AbstractReactFactory<
    LogicalJoinNodeModel,
    DiagramEngine
> {
    constructor() {
        super(LOGICAL_JOIN_NODE_TYPE);
    }

    public generateModel(event: GenerateModelEvent): LogicalJoinNodeModel {
        return new LogicalJoinNodeModel(event.initialConfig);
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<LogicalJoinNodeModel>
    ): JSX.Element {
        return (
            <LogicalJoinNodeWidget engine={this.engine} node={event.model} />
        );
    }
}
