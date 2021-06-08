import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const SOCIAL_CONN_NODE_TYPE = 'social-conn-node';

export interface SocialConnNodeModelOptions {
	type: typeof SOCIAL_CONN_NODE_TYPE;
	label: string;
	relationshipType: string;
}

export interface SocialConnNodeModelGenerics {
	OPTIONS: SocialConnNodeModelOptions;
}

export class SocialConnNodeModel extends NodeModel<
	SocialConnNodeModelGenerics & NodeModelGenerics
> {
	public valueAPort: DefaultPortModel;
	public valueBPort: DefaultPortModel;
	public outPort: DefaultPortModel;

	constructor(
		options: SocialConnNodeModelOptions = {
			type: SOCIAL_CONN_NODE_TYPE,
			label: 'Social Connection',
			relationshipType: 'friend',
		}
	) {
		super({
			...options,
			type: SOCIAL_CONN_NODE_TYPE,
		});

		this.valueAPort = new DefaultPortModel({
			in: true,
			name: 'subject',
			label: 'Subject (P)',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.valueBPort = new DefaultPortModel({
			in: true,
			name: 'other',
			label: 'Other (P)',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: options.label,
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.addPort(this.valueAPort);
		this.addPort(this.valueBPort);
		this.addPort(this.outPort);
	}

	public serialize(): SerializedNodeModel & SocialConnNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.relationshipType = event.data.relationshipType;
	}
}
