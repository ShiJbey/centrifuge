import * as React from 'react';
import {
    RANGE_PREDICATE_NODE_TYPE,
    RangePredicateNodeModel,
} from './RangePredicateNodeModel';
import { RangePredicateNodeWidget } from './RangePredicateNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class RangePredicateNodeFactory extends AbstractReactFactory<
    RangePredicateNodeModel,
    DiagramEngine
> {
    constructor() {
        super(RANGE_PREDICATE_NODE_TYPE);
    }

    public generateModel(): RangePredicateNodeModel {
        return new RangePredicateNodeModel();
    }

    public generateReactWidget(
        event: GenerateWidgetEvent<RangePredicateNodeModel>
    ) {
        return (
            <RangePredicateNodeWidget engine={this.engine} node={event.model} />
        );
    }
}
