import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';


export const RelationshipTypes = [
  'Acquaintance',
  'Enmity',
  'Friendship',
];

export const RELATIONSHIP_NODE_TYPE = 'relationship-node';

export interface RelationshipNodeModelOptions {
  type: typeof RELATIONSHIP_NODE_TYPE
  label?: string;
  color?: string;
  relationshipType?: string;
}

export interface RelationshipNodeModelGenerics {
  OPTIONS: RelationshipNodeModelOptions;
}

export class RelationshipNodeModel extends NodeModel<
  RelationshipNodeModelGenerics & NodeModelGenerics
> {

  protected inputPorts: DefaultPortModel[];
  public outPort: DefaultPortModel;

  constructor(
    options: RelationshipNodeModelOptions = {
      type: RELATIONSHIP_NODE_TYPE,
      label: 'Relationship'
    }
  ) {
    super({
      ...options,
    });

    this.inputPorts = [];

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out (R)',
      alignment: PortModelAlignment.LEFT,
    });
    this.addPort(this.outPort);

    this.addInputPort('owner', 'Owner (P)');
    this.addInputPort('subject', 'Subject (P)');
    this.addInputPort('preceeded_by', 'Preceeded By (R)');
    this.addInputPort('suceeded_by', 'Succeeded By (R)');
    this.addInputPort('where_they_met', 'Where They Met (Pl)');
    this.addInputPort('when_they_met', 'When they met (Str)');
    this.addInputPort('where_they_last_met', 'Where Last Met (Pl)');
    this.addInputPort('when_they_last_met', 'When Last Met (Str)');
    this.addInputPort('total_interactions', 'Total Interactions (Num)');
    this.addInputPort('compatibility', 'Compatibility (Num)');
    this.addInputPort('spark', 'Spark (Num)');
    this.addInputPort('charge', 'Charge (Num)');
  }

  private addInputPort(name: string, label: string): DefaultPortModel {
    const port = new DefaultPortModel({
      in: true,
      name,
      label,
      alignment: PortModelAlignment.LEFT,
    });
    this.addPort(port);
    this.inputPorts.push(port);
    return port;
  }

  public getInPorts(): DefaultPortModel[] {
    return this.inputPorts;
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
