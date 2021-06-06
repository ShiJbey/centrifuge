import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const BOOL_NODE_TYPE = 'BOOL-node';

export interface BoolNodeModelOptions {
	type: typeof BOOL_NODE_TYPE;
	label: string;
	value: boolean;
}

export interface BoolNodeModelGenerics {
	OPTIONS: BoolNodeModelOptions;
}

export class BoolNodeModel extends NodeModel<BoolNodeModelGenerics & NodeModelGenerics> {
	public outPort: DefaultPortModel;

	constructor(
		options: BoolNodeModelOptions = {
			type: BOOL_NODE_TYPE,
			label: 'Bool',
			value: false,
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: '(Bool)',
			alignment: PortModelAlignment.RIGHT,
		});

		this.addPort(this.outPort);
	}

	public serialize(): SerializedNodeModel & BoolNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.label = event.data.label;
		this.options.value = event.data.value;
	}
}
