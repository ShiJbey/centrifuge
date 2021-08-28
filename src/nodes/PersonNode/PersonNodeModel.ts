import {
	NodeModel,
	DefaultPortModel,
	PortModelAlignment,
	NodeModelGenerics,
} from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const PERSON_NODE_TYPE = 'person-node';

export interface PersonNodeModelOptions extends BaseModelOptions {
	type: typeof PERSON_NODE_TYPE;
	label: string;
}

export interface PersonNodeModelGenerics {
	OPTIONS: PersonNodeModelOptions;
}

export class PersonNodeModel extends NodeModel<PersonNodeModelGenerics & NodeModelGenerics> {
	protected attributePorts: DefaultPortModel[] = [];
	public outPort: DefaultPortModel;

	constructor(options: PersonNodeModelOptions = { type: PERSON_NODE_TYPE, label: 'Person (P)' }) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'entity_id',
			label: options.label,
			alignment: PortModelAlignment.RIGHT,
		});
		this.addPort(this.outPort);

		this.addAttributePort('id', 'ID (str)');
		this.addAttributePort('age', 'Age (Num)');
		this.addAttributePort('gender', 'Gender (Str+)');
		this.addAttributePort('tags', 'Tags (Str+)');
		this.addAttributePort('alive', 'Alive (Bool)');
		this.addAttributePort('death_year', 'Death Year (Num)');
		this.addAttributePort('attracted_to', 'Attracted To (Str+)');
		this.addAttributePort('grieving', 'Grieving (Bool)');
		this.addAttributePort('college_graduate', 'College Graduate (Bool)');
		this.addAttributePort('retired', 'Retired (Bool)');
		this.addAttributePort('occupation', 'Occupation (Occ)');
		this.addAttributePort('pregnant', 'Pregnant (Bool)');
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

	public serialize(): SerializedNodeModel & PersonNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
	}
}
