import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

const createAdoptionPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'adoptee',
    label: 'Adoptee (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'adoptive_parents',
    label: 'Adoptive Parents (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createBirthPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'biological_mother',
    label: 'Biologicla Mother (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'mother',
    label: 'Mother (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'biological_father',
    label: 'Biological Father (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'father',
    label: 'Father (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'baby',
    label: 'Baby (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'doctor',
    label: 'Doctor (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'hospital',
    label: 'Hopsital (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'nurses',
    label: 'Nurses (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createBusinessConstructionPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subject',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'architect',
    label: 'Architect (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'business',
    label: 'Business (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'construction_firm',
    label: 'Construction Firm (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'builders',
    label: 'Builders (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createBusinessClosurePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'business',
    label: 'Business (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'reason',
    label: 'Reason (E)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createDeathPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subject',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'widow',
    label: 'Widow (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'cause',
    label: 'cause',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'mortician',
    label: 'Mortician (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'cemetery',
    label: 'Cemetery (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'next_of_kin',
    label: 'Next of Kin (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'cemetery plot',
    label: 'Cemetery Plot (Num)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createDemolitionPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'building',
    label: 'Building (Pl)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'reason',
    label: 'Reason (E)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'demolition_company',
    label: 'Demolition Company (B)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createDeparturePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subject',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createDivorcePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subjects',
    label: 'Subjects (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'lawyer',
    label: 'Lawyer (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'marriage',
    label: 'Marriage (E)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'law_firm',
    label: 'Law Firm (B)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createHiringPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subject',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'company',
    label: 'Company (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'occupation',
    label: 'Occupation (Occ)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'old_occupation',
    label: 'Previous Occupation (Occ)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'promotion',
    label: 'Promotion (Bool)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createHomePurchasePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subjects',
    label: 'Subjects (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'home',
    label: 'Home (Pl)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'realtor',
    label: 'Realtor (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'realty_firm',
    label: 'Realty Firm (B)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createHouseConstructionPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subjects',
    label: 'Subjects (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'architect',
    label: 'Architect (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'house',
    label: 'House (Pl)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'construction_firm',
    label: 'Construction Firm (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'builders',
    label: 'Builders (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createLayOffPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'person',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'business',
    label: 'business (B)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'reason',
    label: 'Reason (E)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'occupation',
    label: 'Occupation (Occ)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createMarriagePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subjects',
    label: 'Subjects (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'names_at_time_of_marriage',
    label: 'Names before marriage (Str+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'name_changes',
    label: 'Name Changes (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'terminus',
    label: 'Terminus (E)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'money',
    label: 'Money (Num)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'children_produced',
    label: 'Children Produced (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createMovePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subjects',
    label: 'Subjects (P+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'old_home',
    label: 'Old Home (Pl)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'new_home',
    label: 'New Home (Pl)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'reason',
    label: 'Reason (E)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createNameChangePorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'subject',
    label: 'Subject (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'old_last_name',
    label: 'Old Surname (Str)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'new_last_name',
    label: 'New Surname (Str)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'old_name',
    label: 'Old Name (str)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'lawyer',
    label: 'Lawyer (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'new_name',
    label: 'New Name (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'reason',
    label: 'Reason (E)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'law_firm',
    label: 'Law Firm (B)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createRetirementPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'retiree',
    label: 'Retiree (P)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'occupation',
    label: 'Occupation (Occ)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'company',
    label: 'Company (B)',
    alignment: PortModelAlignment.LEFT,
  }),
];

export const EVENT_NODE_TYPE = 'event-node';

export interface EventNodeModelOptions {
  type: typeof EVENT_NODE_TYPE;
  label?: string;
  color?: string;
  eventType?: string;
}

export interface EventNodeModelGenerics {
  OPTIONS: EventNodeModelOptions;
}

export class EventNodeModel extends NodeModel<
  EventNodeModelGenerics & NodeModelGenerics
> {
  protected inputPorts: DefaultPortModel[];
  protected outputPorts: DefaultPortModel[];

  public timestampPort: DefaultPortModel;
  public outPort: DefaultPortModel;

  constructor(
    options: EventNodeModelOptions = {
      type: EVENT_NODE_TYPE,
      label: 'Event',
    }
  ) {
    super({
      ...options,
    });

    this.inputPorts = [];
    this.outputPorts = [];

    this.timestampPort = new DefaultPortModel({
      in: true,
      name: 'timestamp',
      label: 'Timestamp (Iso)',
      alignment: PortModelAlignment.LEFT,
    });

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out (E)',
      alignment: PortModelAlignment.RIGHT,
    });

    this.addPort(this.timestampPort);
    this.addPort(this.outPort);
  }

  public changePorts(eventType: string): any {
    this.clearInPorts();
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
      this.inputPorts.push(port);
    }
  }

  private clearInPorts(): void {
    for (const port of this.inputPorts) {
      super.removePort(port);
    }
    this.inputPorts = [];
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

  public getInPorts(): DefaultPortModel[] {
    return this.inputPorts;
  }
}
