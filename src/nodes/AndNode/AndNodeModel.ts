import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const AND_NODE_TYPE = 'AND-node';

export interface AndNodeModelOptions {
	type: typeof AND_NODE_TYPE;
	label: string;
}

export interface AndNodeModelGenerics {
	OPTIONS: AndNodeModelOptions;
}

export class AndNodeModel extends NodeModel<AndNodeModelGenerics & NodeModelGenerics> {
	public outPort: DefaultPortModel;
	public inPort: DefaultPortModel;

	constructor(
		options: AndNodeModelOptions = {
			type: AND_NODE_TYPE,
			label: 'AND',
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: 'out',
			alignment: PortModelAlignment.RIGHT,
		});

		this.inPort = new DefaultPortModel({
			in: true,
			name: 'in',
			label: 'in',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.addPort(this.outPort);
		this.addPort(this.inPort);
	}

	public serialize(): SerializedNodeModel & AndNodeModelOptions {
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
