import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

const createAdoptionPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'adoptee',
		label: 'Adoptee (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'adoptive_parents',
		label: 'Adoptive Parents (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createBirthPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'biological_mother',
		label: 'Biologicla Mother (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'mother',
		label: 'Mother (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'biological_father',
		label: 'Biological Father (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'father',
		label: 'Father (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'baby',
		label: 'Baby (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'doctor',
		label: 'Doctor (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'hospital',
		label: 'Hopsital (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'nurses',
		label: 'Nurses (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createBusinessConstructionPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subject',
		label: 'Subject (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'architect',
		label: 'Architect (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'business',
		label: 'Business (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'construction_firm',
		label: 'Construction Firm (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'builders',
		label: 'Builders (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createBusinessClosurePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'business',
		label: 'Business (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'reason',
		label: 'Reason (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createDeathPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subject',
		label: 'Subject (P)',
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

const createDemolitionPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'building',
		label: 'Building (Pl)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'reason',
		label: 'Reason (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'demolition_company',
		label: 'Demolition Company (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createDeparturePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subject',
		label: 'Subject (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createDivorcePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subjects',
		label: 'Subjects (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'lawyer',
		label: 'Lawyer (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'marriage',
		label: 'Marriage (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'law_firm',
		label: 'Law Firm (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createHiringPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subject',
		label: 'Subject (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'company',
		label: 'Company (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'occupation',
		label: 'Occupation (Occ)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'old_occupation',
		label: 'Previous Occupation (Occ)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'promotion',
		label: 'Promotion (Bool)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createHomePurchasePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subjects',
		label: 'Subjects (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'home',
		label: 'Home (Pl)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'realtor',
		label: 'Realtor (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'realty_firm',
		label: 'Realty Firm (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createHouseConstructionPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subjects',
		label: 'Subjects (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'architect',
		label: 'Architect (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'house',
		label: 'House (Pl)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'construction_firm',
		label: 'Construction Firm (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'builders',
		label: 'Builders (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createLayOffPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'person',
		label: 'Subject (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'business',
		label: 'business (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'reason',
		label: 'Reason (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'occupation',
		label: 'Occupation (Occ)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createMarriagePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subjects',
		label: 'Subjects (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'names_at_time_of_marriage',
		label: 'Names before marriage (Str+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'name_changes',
		label: 'Name Changes (E+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'terminus',
		label: 'Terminus (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'money',
		label: 'Money (Num)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'children_produced',
		label: 'Children Produced (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createMovePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subjects',
		label: 'Subjects (P+)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'old_home',
		label: 'Old Home (Pl)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'new_home',
		label: 'New Home (Pl)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'reason',
		label: 'Reason (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createNameChangePorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'subject',
		label: 'Subject ID (str)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'old_last_name',
		label: 'Old Surname (Str)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'new_last_name',
		label: 'New Surname (Str)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'old_name',
		label: 'Old Name (str)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'lawyer',
		label: 'Lawyer (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'new_name',
		label: 'New Name (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'reason',
		label: 'Reason (E)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'law_firm',
		label: 'Law Firm (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

const createRetirementPorts = () => [
	new DefaultPortModel({
		in: false,
		name: 'retiree',
		label: 'Retiree (P)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'occupation',
		label: 'Occupation (Occ)',
		alignment: PortModelAlignment.RIGHT,
	}),
	new DefaultPortModel({
		in: false,
		name: 'company',
		label: 'Company (B)',
		alignment: PortModelAlignment.RIGHT,
	}),
];

export const EVENT_NODE_TYPE = 'event-node';

export interface EventNodeModelOptions {
	type: typeof EVENT_NODE_TYPE;
	label: string;
	eventType?: string;
}

export interface EventNodeModelGenerics {
	OPTIONS: EventNodeModelOptions;
}

export class EventNodeModel extends NodeModel<EventNodeModelGenerics & NodeModelGenerics> {
	protected attributePorts: DefaultPortModel[] = [];

	public timestampPort: DefaultPortModel;
	public eventIdPort: DefaultPortModel;
	public outPort: DefaultPortModel;

	constructor(
		options: EventNodeModelOptions = {
			type: EVENT_NODE_TYPE,
			label: 'Event (E)',
		}
	) {
		super({
			...options,
		});

		this.timestampPort = new DefaultPortModel({
			in: false,
			name: 'timestamp',
			label: 'Timestamp (Iso)',
			alignment: PortModelAlignment.RIGHT,
		});

		this.eventIdPort = new DefaultPortModel({
			in: false,
			name: 'id',
			label: 'ID (str)',
			alignment: PortModelAlignment.RIGHT,
		});

		this.outPort = new DefaultPortModel({
			in: false,
			name: 'entity_id',
			label: options.label,
			alignment: PortModelAlignment.RIGHT,
		});

		this.addPort(this.timestampPort);
		this.addPort(this.eventIdPort);
		this.addPort(this.outPort);

		if (options.eventType) {
			this.changePorts(options.eventType);
		}
	}

	public changePorts(eventType: string): any {
		this.clearAttributePorts();
		switch (eventType) {
			case 'Adoption': {
				this.addPorts(createAdoptionPorts());
				break;
			}
			case 'Birth': {
				this.addPorts(createBirthPorts());
				break;
			}
			case 'BusinessConstruction': {
				this.addPorts(createBusinessConstructionPorts());
				break;
			}
			case 'BusinessClosure': {
				this.addPorts(createBusinessClosurePorts());
				break;
			}
			case 'Death': {
				this.addPorts(createDeathPorts());
				break;
			}
			case 'Demolition': {
				this.addPorts(createDemolitionPorts());
				break;
			}
			case 'Departure': {
				this.addPorts(createDeparturePorts());
				break;
			}
			case 'Divorce': {
				this.addPorts(createDivorcePorts());
				break;
			}
			case 'Hiring': {
				this.addPorts(createHiringPorts());
				break;
			}
			case 'HomePurchase': {
				this.addPorts(createHomePurchasePorts());
				break;
			}
			case 'HouseConstruction': {
				this.addPorts(createHouseConstructionPorts());
				break;
			}
			case 'LayOff': {
				this.addPorts(createLayOffPorts());
				break;
			}
			case 'Marriage': {
				this.addPorts(createMarriagePorts());
				break;
			}
			case 'Move': {
				this.addPorts(createMovePorts());
				break;
			}
			case 'NameChange': {
				this.addPorts(createNameChangePorts());
				break;
			}
			case 'Retirement': {
				this.addPorts(createRetirementPorts());
				break;
			}
			default:
				break;
		}
	}

	private addPorts(ports: DefaultPortModel[]): void {
		for (const port of ports) {
			this.addPort(port);
			this.attributePorts.push(port);
		}
	}

	private clearAttributePorts(): void {
		for (const port of this.attributePorts) {
			super.removePort(port);
		}
		this.attributePorts = [];
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
