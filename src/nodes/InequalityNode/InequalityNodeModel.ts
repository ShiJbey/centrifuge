import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const INEQUALITY_NODE_TYPE = 'inequality-node';

export interface InequalityNodeModelOptions {
	type: typeof INEQUALITY_NODE_TYPE;
	label: string;
	symbol: string;
}

export interface InequalityNodeModelGenerics {
	OPTIONS: InequalityNodeModelOptions;
}

export class InequalityNodeModel extends NodeModel<
	InequalityNodeModelGenerics & NodeModelGenerics
> {
	public valueAPort: DefaultPortModel;
	public valueBPort: DefaultPortModel;
	public outPort: DefaultPortModel;

	constructor(
		options: InequalityNodeModelOptions = {
			type: INEQUALITY_NODE_TYPE,
			label: 'Inequality',
			symbol: '>',
		}
	) {
		super({
			...options,
		});

		this.valueAPort = new DefaultPortModel({
			in: true,
			name: 'valueA',
			label: 'value A',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.valueBPort = new DefaultPortModel({
			in: true,
			name: 'valueB',
			label: 'value B',
			alignment: PortModelAlignment.LEFT,
			maximumLinks: 1,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: options.label,
			alignment: PortModelAlignment.RIGHT,
			maximumLinks: 1,
		});

		this.addPort(this.valueAPort);
		this.addPort(this.valueBPort);
		this.addPort(this.outPort);
	}

	public serialize(): SerializedNodeModel & InequalityNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.symbol = event.data.symbol;
	}
}
