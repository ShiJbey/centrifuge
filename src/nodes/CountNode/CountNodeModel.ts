import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const COUNT_NODE_TYPE = 'count-node';

export interface CountNodeModelOptions {
	type: typeof COUNT_NODE_TYPE;
	label: string;
}

export interface CountNodeModelGenerics {
	OPTIONS: CountNodeModelOptions;
}

export class CountNodeModel extends NodeModel<CountNodeModelGenerics & NodeModelGenerics> {
	public outPort: DefaultPortModel;
	public inPort: DefaultPortModel;

	constructor(
		options: CountNodeModelOptions = {
			type: COUNT_NODE_TYPE,
			label: 'Count',
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

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: 'out (Num)',
			alignment: PortModelAlignment.RIGHT,
		});
		this.addPort(this.outPort);
	}

	public serialize(): SerializedNodeModel & CountNodeModelOptions {
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
