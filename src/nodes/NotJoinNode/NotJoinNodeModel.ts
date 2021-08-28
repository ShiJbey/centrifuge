import {
	NodeModel,
	DefaultPortModel,
	PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';

export const NOT_JOIN_NODE_TYPE = 'not-join-node';

export interface NotJoinNodeModelOptions {
	type: typeof NOT_JOIN_NODE_TYPE;
	label: string;
}

export interface NotJoinNodeModelGenerics {
	OPTIONS: NotJoinNodeModelOptions;
}

export class NotJoinNodeModel extends NodeModel<
	NotJoinNodeModelGenerics & NodeModelGenerics
> {
	public outPort: DefaultPortModel;
	public variablesPort: DefaultPortModel;
	public clausesPort: DefaultPortModel;

	constructor(
		options: NotJoinNodeModelOptions = {
			type: NOT_JOIN_NODE_TYPE,
			label: 'Not-Join',
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'out',
			label: options.label,
			alignment: PortModelAlignment.RIGHT,
			maximumLinks: 1,
		});

		this.variablesPort = new DefaultPortModel({
			in: true,
			name: 'variables',
			label: 'Variables (Entity)',
			alignment: PortModelAlignment.LEFT,
		});

		this.clausesPort = new DefaultPortModel({
			in: true,
			name: 'clauses',
			label: 'clauses (Clause+)',
			alignment: PortModelAlignment.LEFT,
		});

		this.addPort(this.outPort);
		this.addPort(this.variablesPort);
		this.addPort(this.clausesPort);
	}


	serialize(): SerializedNodeModel & NotJoinNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
	}
}
