import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const OR_NODE_TYPE = 'or-node';

export interface OrNodeModelOptions {
	type: typeof OR_NODE_TYPE;
	label: string;
}

export interface OrNodeModelGenerics {
	OPTIONS: OrNodeModelOptions;
}

export class OrNodeModel extends NodeModel<OrNodeModelGenerics & NodeModelGenerics> {
	public outPort: DefaultPortModel;
	public inPort: DefaultPortModel;

	constructor(
		options: OrNodeModelOptions = {
			type: OR_NODE_TYPE,
			label: 'OR',
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: '',
			alignment: PortModelAlignment.RIGHT,
		});

		this.inPort = new DefaultPortModel({
			in: true,
			name: 'in',
			label: '',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.addPort(this.outPort);
		this.addPort(this.inPort);
	}

	public serialize(): SerializedNodeModel & OrNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.label = event.data.label;
	}
}
