import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const RelationshipTypes = ['Acquaintance', 'Enmity', 'Friendship'];

export const RELATIONSHIP_NODE_TYPE = 'relationship-node';

export interface RelationshipNodeModelOptions {
	type: typeof RELATIONSHIP_NODE_TYPE;
	label: string;
	relationshipType?: string;
}

export interface RelationshipNodeModelGenerics {
	OPTIONS: RelationshipNodeModelOptions;
}

export class RelationshipNodeModel extends NodeModel<
	RelationshipNodeModelGenerics & NodeModelGenerics
> {
	protected attributePorts: DefaultPortModel[] = [];
	public outPort: DefaultPortModel;

	constructor(
		options: RelationshipNodeModelOptions = {
			type: RELATIONSHIP_NODE_TYPE,
			label: 'Relationship (R)',
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'id',
			label: options.label,
			alignment: PortModelAlignment.LEFT,
		});
		this.addPort(this.outPort);

		this.addAttributePort('owner', 'Owner (P)');
		this.addAttributePort('subject', 'Subject (P)');
		this.addAttributePort('preceeded_by', 'Preceeded By (R)');
		this.addAttributePort('suceeded_by', 'Succeeded By (R)');
		this.addAttributePort('where_they_met', 'Where They Met (Pl)');
		this.addAttributePort('when_they_met', 'When they met (Str)');
		this.addAttributePort('where_they_last_met', 'Where Last Met (Pl)');
		this.addAttributePort('when_they_last_met', 'When Last Met (Str)');
		this.addAttributePort('total_interactions', 'Total Interactions (Num)');
		this.addAttributePort('compatibility', 'Compatibility (Num)');
		this.addAttributePort('spark', 'Spark (Num)');
		this.addAttributePort('charge', 'Charge (Num)');
	}

	private addAttributePort(name: string, label: string): DefaultPortModel {
		const port = new DefaultPortModel({
			in: false,
			name,
			label,
			alignment: PortModelAlignment.RIGHT,
		});
		this.addPort(port);
		this.attributePorts.push(port);
		return port;
	}

	public getAttributePorts(): DefaultPortModel[] {
		return this.attributePorts;
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
