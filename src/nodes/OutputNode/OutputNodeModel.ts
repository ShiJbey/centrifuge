import {
	NodeModel,
	DefaultPortModel,
	PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const OUTPUT_NODE_TYPE = 'output-node';

export interface OutputNodeModelOptions {
	type: typeof OUTPUT_NODE_TYPE;
	label: string;
	name: string;
	required: boolean;
	hidden: boolean;
}

export interface OutputNodeModelGenerics {
	OPTIONS: OutputNodeModelOptions;
}

export class OutputNodeModel extends NodeModel<
	OutputNodeModelGenerics & NodeModelGenerics
> {
	public inPort: DefaultPortModel;

	constructor(
		options: OutputNodeModelOptions = {
			type: OUTPUT_NODE_TYPE,
			label: 'Output',
			name: 'var',
			required: false,
			hidden: false,
		}
	) {
		super({
			...options,
		});

		this.inPort = new DefaultPortModel({
			in: true,
			name: 'in',
			label: 'In (Any)',
			alignment: PortModelAlignment.LEFT,
		});
		this.addPort(this.inPort);
	}

	public serialize(): SerializedNodeModel & OutputNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.label = event.data.label;
		this.options.name = event.data.name;
		this.options.required = event.data.hidden;
		this.options.hidden = event.data.hidden;
	}
}
