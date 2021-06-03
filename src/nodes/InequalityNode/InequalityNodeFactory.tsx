import * as React from 'react';
import { INEQUALITY_NODE_TYPE, InequalityNodeModel } from './InequalityNodeModel';
import { InequalityNodeWidget } from './InequalityNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class InequalityNodeFactory extends AbstractReactFactory<InequalityNodeModel, DiagramEngine> {

  constructor() {
    super(INEQUALITY_NODE_TYPE);
  }

  public generateModel(): InequalityNodeModel {
    return new InequalityNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<InequalityNodeModel>): JSX.Element {
    return <InequalityNodeWidget engine={this.engine} node={event.model} />
  }
}
