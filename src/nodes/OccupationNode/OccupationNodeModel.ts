import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export const OccupationTypes = [
	'Apprentice',
	'Architect',
	'Baker',
	'BankTeller',
	'Barber',
	'Barkeeper',
	'Bartender',
	'Blacksmith',
	'Bottler',
	'Brewer',
	'Bricklayer',
	'Builder',
	'BusDriver',
	'Busboy',
	'Butcher',
	'Carpenter',
	'Cashier',
	'Clothier',
	'Concierge',
	'Cook',
	'Cooper',
	'DaycareProvider',
	'Dentist',
	'Dishwasher',
	'Distiller',
	'Doctor',
	'Dressmaker',
	'Druggist',
	'Engineer',
	'Farmer',
	'Farmhand',
	'FireChief',
	'Firefighter',
	'Grocer',
	'Groundskeeper',
	'HotelMaid',
	'Innkeeper',
	'InsuranceAgent',
	'Janitor',
	'Jeweler',
	'Joiner',
	'Laborer',
	'Landlord',
	'Lawyer',
	'Manager',
	'Mayor',
	'Milkman',
	'Miner',
	'Molder',
	'Mortician',
	'Nurse',
	'Occupation',
	'Optometrist',
	'OrderedSet',
	'Owner',
	'Painter',
	'Pharmacist',
	'Plasterer',
	'PlasticSurgeon',
	'Plumber',
	'PoliceChief',
	'PoliceOfficer',
	'Principal',
	'Professor',
	'Proprietor',
	'Puddler',
	'Quarryman',
	'Realtor',
	'Seamstress',
	'Secretary',
	'Shoemaker',
	'Stocker',
	'Stonecutter',
	'Tailor',
	'TattooArtist',
	'TaxiDriver',
	'Teacher',
	'Turner',
	'Waiter',
	'Whitewasher',
	'Woodworker',
];

const createArchitectPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'building_constructions',
		label: 'Building Constructions (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'house_constructions',
		label: 'House Constructions (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createDoctorPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'baby_deliveries',
		label: 'Baby Deliveries (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createLawyerPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'filed_divorces',
		label: 'Filed Divorces (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'filed_name_changes',
		label: 'Filed Name Changes (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createMorticianPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'body_internments',
		label: 'Body Internments (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createRealtorPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'home_sales',
		label: 'Home Sales (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'widow',
		label: 'Widow (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'cause',
		label: 'cause',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'mortician',
		label: 'Mortician (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'cemetery',
		label: 'Cemetery (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'next_of_kin',
		label: 'Next of Kin (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'cemetery plot',
		label: 'Cemetery Plot (Num)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

export const OCCUPATION_NODE_TYPE = 'occupation-node';

export interface OccupationNodeModelOptions {
	type: typeof OCCUPATION_NODE_TYPE;
	label: string;
	occupationType?: string;
}

export interface OccupationNodeModelGenerics {
	OPTIONS: OccupationNodeModelOptions;
}

export class OccupationNodeModel extends NodeModel<
	OccupationNodeModelGenerics & NodeModelGenerics
> {
	protected attributePorts: DefaultPortModel[] = [];
	protected specializedPorts: DefaultPortModel[] = [];
	public outPort: DefaultPortModel;

	constructor(
		options: OccupationNodeModelOptions = {
			type: OCCUPATION_NODE_TYPE,
			label: 'Occupation (Occ)',
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

		this.addAttributePort('id', 'ID (str)');
		this.addAttributePort('person', 'Person (P)');
		this.addAttributePort('company', 'Company (C)');
		this.addAttributePort('shift', 'Shift (Str)');
		this.addAttributePort('start_date', 'Start Date (Str)');
		this.addAttributePort('hiring', 'Hiring (E)');
		this.addAttributePort('end_date', 'End Date (Str)');
		this.addAttributePort('terminus', 'Terminus (E)');
		this.addAttributePort('preceded_by', 'Preceeded By (P)');
		this.addAttributePort('succeeded_by', 'Succeeded By (P)');
		this.addAttributePort('supplemental', 'Supplemental (Bool)');
		this.addAttributePort('hired_as_favor', 'Hired as Favor (Bool)');
		this.addAttributePort('vocation', 'Vocation (Str)');
		this.addAttributePort('level', 'Level (Num)');

		if (options.occupationType) {
			this.changePorts(options.occupationType);
		}
	}

	public changePorts(eventType: string): any {
		this.clearSpecializedPorts();
		switch (eventType) {
			case 'Architect': {
				this.addSpecializedPorts(createArchitectPorts());
				break;
			}
			case 'Doctor': {
				this.addSpecializedPorts(createDoctorPorts());
				break;
			}
			case 'Lawyer': {
				this.addSpecializedPorts(createLawyerPorts());
				break;
			}
			case 'Mortician': {
				this.addSpecializedPorts(createMorticianPorts());
				break;
			}
			case 'Realtor': {
				this.addSpecializedPorts(createRealtorPorts());
				break;
			}
			default:
				break;
		}
	}

	private addSpecializedPorts(ports: DefaultPortModel[]): void {
		for (const port of ports) {
			this.addPort(port);
			this.attributePorts.push(port);
			this.specializedPorts.push(port);
		}
	}

	private clearSpecializedPorts(): void {
		for (const port of this.specializedPorts) {
			super.removePort(port);
			this.attributePorts.splice(this.attributePorts.indexOf(port), 1);
		}
		this.specializedPorts = [];
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

	public serialize(): any {
		return {
			...super.serialize(),
			...this.options,
		};
	}

	public deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
	}

	public getAttributePorts(): DefaultPortModel[] {
		return this.attributePorts;
	}
}
