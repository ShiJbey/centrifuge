import * as React from 'react';
import { SocialConnNodeModel, SOCIAL_CONN_NODE_TYPE } from './SocialConnNodeModel';
import { SocialConnNodeWidget } from './SocialConnNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class SocialConnNodeFactory extends AbstractReactFactory<SocialConnNodeModel, DiagramEngine> {

  constructor() {
    super(SOCIAL_CONN_NODE_TYPE);
  }

  public generateModel(): SocialConnNodeModel {
    return new SocialConnNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<SocialConnNodeModel>): JSX.Element {
    return <SocialConnNodeWidget engine={this.engine} node={event.model} />
  }
}
