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
  public outPort: DefaultPortModel;
  public ownerPort: DefaultPortModel;
  public targetPort: DefaultPortModel;
  public chargePort: DefaultPortModel;
  public sparkPort: DefaultPortModel;

  constructor(
    options: RelationshipNodeModelOptions = {
      type: RELATIONSHIP_NODE_TYPE,
      label: 'Relationship'
    }
  ) {
    super({
      ...options,
    });

    this.ownerPort = new DefaultPortModel({
      in: true,
      name: 'owner',
      label: 'owner',
      alignment: PortModelAlignment.LEFT,
    });

    this.targetPort = new DefaultPortModel({
      in: true,
      name: 'target',
      label: 'target',
      alignment: PortModelAlignment.LEFT,
    });

    this.chargePort = new DefaultPortModel({
      in: true,
      name: 'charge',
      label: 'charge',
      alignment: PortModelAlignment.LEFT,
    });

    this.sparkPort = new DefaultPortModel({
      in: true,
      name: 'spark',
      label: 'spark',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out',
      alignment: PortModelAlignment.LEFT,
    });

    this.addPort(this.outPort);
    this.addPort(this.ownerPort);
    this.addPort(this.targetPort);
    this.addPort(this.chargePort);
    this.addPort(this.sparkPort);
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
