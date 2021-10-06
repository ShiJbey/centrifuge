import * as React from 'react';
import {
    RANGE_PREDICATE_NODE_TYPE,
    RangePredicateNodeModel,
} from './RangePredicateNodeModel';
import { InequalityNodeWidget } from './RangePredicateNodeWidget';
import {
    AbstractReactFactory,
    GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class InequalityNodeFactory extends AbstractReactFactory<
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
        return <InequalityNodeWidget engine={this.engine} node={event.model} />;
    }
}
