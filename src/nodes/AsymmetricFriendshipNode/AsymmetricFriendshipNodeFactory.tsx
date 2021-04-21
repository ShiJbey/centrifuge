import * as React from 'react';
import { AsymmetricFriendshipNodeModel } from './AsymmetricFriendshipNodeModel';
import { AsymmetricFriendshipNodeWidget } from './AsymmetricFriendshipNodeWidget';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class AsymmetricFriendshipNodeFactory extends AbstractReactFactory<AsymmetricFriendshipNodeModel, DiagramEngine> {

  constructor() {
    super('asymmetric-friendship-node');
  }

  public generateModel(): AsymmetricFriendshipNodeModel {
    return new AsymmetricFriendshipNodeModel();
  }

  public generateReactWidget(event: GenerateWidgetEvent<AsymmetricFriendshipNodeModel>): JSX.Element {
    return <AsymmetricFriendshipNodeWidget engine={this.engine} node={event.model} />
  }
}
