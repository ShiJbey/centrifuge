import {
	NodeModel,
	DefaultPortModel,
	PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import _ from 'lodash';
import { SerializedNodeModel } from '../../utility/serialization';

export const OR_JOIN_NODE_TYPE = 'or-join-node';

export interface OrJoinNodeModelOptions {
	type: typeof OR_JOIN_NODE_TYPE;
	label: string;
	portsInOrder: string[];
	portsOutOrder: string[];
}

export interface OrJoinNodeModelGenerics {
	OPTIONS: OrJoinNodeModelOptions;
}

export class OrJoinNodeModel extends NodeModel<
	OrJoinNodeModelGenerics & NodeModelGenerics
> {
	protected inputPorts: DefaultPortModel[] = [];
	protected outPorts: DefaultPortModel[] = [];

	constructor(
		options: OrJoinNodeModelOptions = {
			type: OR_JOIN_NODE_TYPE,
			label: 'Or-Join',
			portsInOrder: [],
			portsOutOrder: [],
		}
	) {
		super({
			...options,
		});
	}

	getInPorts(): DefaultPortModel[] {
		return this.inputPorts;
	}

	getOutPorts(): DefaultPortModel[] {
		return this.outPorts;
	}

	addPortSet(): void {
		const count = this.inputPorts.length;
		this.addInPort(`Input_${count}`);
		this.addOutPort(`Output_${count}`);
	}

	removePortSet(): void {
		this.removeInPort();
		this.removeOutPort();
	}

	private removeInPort(): void {
		const port = this.inputPorts.pop();
		if (port) {
			try {
				super.removePort(port);
			} catch (error) {
				// ignore (there is probably a more gracefull way to delete ports)
			}
		}
	}

	private removeOutPort(): void {
		const port = this.outPorts.pop();
		if (port) {
			try {
				super.removePort(port);
			} catch (error) {
				// ignore (there is probably a more gracefull way to delete ports)
			}
		}
	}

	private addInPort(label: string): void {
		const p = new DefaultPortModel({
			in: true,
			name: label,
			label: label,
			alignment: PortModelAlignment.LEFT,
		});

		this.inputPorts.push(p);
		this.addPort(p);
	}

	private addOutPort(label: string): void {
		const p = new DefaultPortModel({
			in: false,
			name: label,
			label: label,
			alignment: PortModelAlignment.RIGHT,
		});

		this.outPorts.push(p);
		this.addPort(p);
	}

	serialize(): SerializedNodeModel & OrJoinNodeModelOptions {
		return {
			...super.serialize(),
			...this.options,
			portsInOrder: _.map(this.inputPorts, (port) => {
				return port.getID();
			}),
			portsOutOrder: _.map(this.outPorts, (port) => {
				return port.getID();
			}),
		};
	}

	deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.inputPorts = _.map(event.data.portsInOrder, (id) => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
		this.outPorts = _.map(event.data.portsOutOrder, (id) => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
	}
}
