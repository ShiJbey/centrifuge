import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const NOT_NODE_TYPE = 'not-node';

export interface NotNodeModelOptions {
	label: string;
}

export interface NotNodeModelGenerics {
	OPTIONS: NotNodeModelOptions;
}

export class NotNodeModel extends NodeModel<NotNodeModelGenerics & NodeModelGenerics> {
	public outPort: DefaultPortModel;
	public valuePort: DefaultPortModel;

	constructor(
		options: NotNodeModelOptions = {
			label: 'Not',
		}
	) {
		super({
			...options,
			type: NOT_NODE_TYPE,
		});

		this.valuePort = new DefaultPortModel({
			in: true,
			name: 'in',
			label: '',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: '',
			alignment: PortModelAlignment.RIGHT,
		});

		this.addPort(this.valuePort);
		this.addPort(this.outPort);
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
