import * as React from 'react';
import { RuleNodeModel, RULE_NODE_TYPE } from './RuleNodeModel';
import { RuleNodeWidget } from './RuleNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
    GenerateModelEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class RuleNodeFactory extends AbstractReactFactory<
    RuleNodeModel,
    DiagramEngine
> {
    constructor() {
        super(RULE_NODE_TYPE);
    }

    public generateModel(event: GenerateModelEvent): RuleNodeModel {
        return new RuleNodeModel(event.initialConfig);
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<RuleNodeModel>
    ): JSX.Element {
        return <RuleNodeWidget engine={this.engine} node={event.model} />;
    }
}
