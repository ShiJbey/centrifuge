import * as React from 'react';
import { StringNodeModel, STRING_NODE_TYPE } from './StringNodeModel';
import { StringNodeWidget } from './StringNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class StringNodeFactory extends AbstractReactFactory<
    StringNodeModel,
    DiagramEngine
> {
    constructor() {
        super(STRING_NODE_TYPE);
    }

    public generateModel(): StringNodeModel {
        return new StringNodeModel({});
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<StringNodeModel>
    ): JSX.Element {
        return <StringNodeWidget engine={this.engine} node={event.model} />;
    }
}
