import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const RELATIONSHIP_NODE_TYPE = 'relationship-node';

export interface RelationshipNodeModelOptions {
  type: typeof RELATIONSHIP_NODE_TYPE
  label?: string;
  color?: string;
}

export interface RelationshipNodeModelGenerics {
  OPTIONS: RelationshipNodeModelOptions;
}

export class RelationshipNodeModel extends NodeModel<
  RelationshipNodeModelGenerics & NodeModelGenerics
> {
  public person1Port: DefaultPortModel;
  public person2Port: DefaultPortModel;

  constructor(
    options: RelationshipNodeModelOptions = {
      type: RELATIONSHIP_NODE_TYPE,
      label: 'Relationship'
    }
  ) {
    super({
      ...options,
    });

    this.person1Port = new DefaultPortModel({
      in: true,
      name: 'owner',
      label: 'owner',
      alignment: PortModelAlignment.LEFT,
    });

    this.person2Port = new DefaultPortModel({
      in: true,
      name: 'target',
      label: 'target',
      alignment: PortModelAlignment.LEFT,
    });

    this.addPort(this.person1Port);
    this.addPort(this.person2Port);
  }

  public serialize(): any {
    return {
      ...super.serialize(),
      ...this.options,
    };
  }

  public deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
  }
}
