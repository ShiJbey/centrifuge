import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const BUSINESS_NODE_TYPE = 'business-node';

export interface BusinessNodeModelOptions {
	type: typeof BUSINESS_NODE_TYPE;
	label: string;
	businessType?: string;
}

export interface BusinessNodeModelGenerics {
	OPTIONS: BusinessNodeModelOptions;
}

export class BusinessNodeModel extends NodeModel<BusinessNodeModelGenerics & NodeModelGenerics> {
	protected attributePorts: DefaultPortModel[] = [];
	protected specializedPorts: DefaultPortModel[] = [];
	public outPort: DefaultPortModel;

	constructor(
		options: BusinessNodeModelOptions = {
			type: BUSINESS_NODE_TYPE,
			label: 'Business (B)',
		}
	) {
		super({
			...options,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'entity_id',
			label: options.label,
			alignment: PortModelAlignment.RIGHT,
		});
		this.addPort(this.outPort);

		this.addAttributePort('services', 'Services (Str+)');
		this.addAttributePort('town', 'Town (Str)');
		this.addAttributePort('founded', 'founded (Num)');
		this.addAttributePort('owner', 'Owner (P)');
		this.addAttributePort('town', 'Town (Str)');
		this.addAttributePort('employees', 'Employees (P+)');
		this.addAttributePort('former_employees', 'Former Employees (P+)');
		this.addAttributePort('former_owners', 'Former Owners (P+)');
		this.addAttributePort('construction', 'Construction (E)');
		this.addAttributePort('people_here_now', 'People Here Now (P+)');
		this.addAttributePort('demolition', 'Demolition (E)');
		this.addAttributePort('out_of_business', 'Out of Business (Bool)');
		this.addAttributePort('closure', 'Closure (E)');
		this.addAttributePort('closed', 'Closing Year (Num)');
	}

	private addAttributePort(name: string, label: string): DefaultPortModel {
		const port = new DefaultPortModel({
			in: false,
			name,
			label,
			alignment: PortModelAlignment.RIGHT,
		});
		this.addPort(port);
		this.attributePorts.push(port);
		return port;
	}

	public getAttributePorts(): DefaultPortModel[] {
		return this.attributePorts;
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
