import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
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
    in: true,
    name: 'building_constructions',
    label: 'Building Constructions (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'house_constructions',
    label: 'House Constructions (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createDoctorPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'baby_deliveries',
    label: 'Baby Deliveries (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createLawyerPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'filed_divorces',
    label: 'Filed Divorces (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
  new DefaultPortModel({
    in: true,
    name: 'filed_name_changes',
    label: 'Filed Name Changes (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createMorticianPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'body_internments',
    label: 'Body Internments (E+)',
    alignment: PortModelAlignment.LEFT,
  }),
];

const createRealtorPorts = () => [
  new DefaultPortModel({
    in: true,
    name: 'home_sales',
    label: 'Home Sales (E+)',
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

export const OCCUPATION_NODE_TYPE = 'occupation-node';

export interface OccupationNodeModelOptions {
  type: typeof OCCUPATION_NODE_TYPE;
  label?: string;
  color?: string;
  occupationType?: string;
}

export interface OccupationNodeModelGenerics {
  OPTIONS: OccupationNodeModelOptions;
}

export class OccupationNodeModel extends NodeModel<
  OccupationNodeModelGenerics & NodeModelGenerics
> {
  protected inputPorts: DefaultPortModel[];
  protected specializedPorts: DefaultPortModel[];
  public outPort: DefaultPortModel;

  constructor(
    options: OccupationNodeModelOptions = {
      type: OCCUPATION_NODE_TYPE,
      label: 'Occupation',
    }
  ) {
    super({
      ...options,
    });

    this.inputPorts = [];
    this.specializedPorts = [];

    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out (Occ)',
      alignment: PortModelAlignment.RIGHT,
    });
    this.addPort(this.outPort);

    this.addInputPort('person', 'Person (P)');
    this.addInputPort('company', 'Company (C)');
    this.addInputPort('shift', 'Shift (Str)');
    this.addInputPort('start_date', 'Start Date (Str)');
    this.addInputPort('hiring', 'Hiring (E)');
    this.addInputPort('end_date', 'End Date (Str)');
    this.addInputPort('terminus', 'Terminus (E)');
    this.addInputPort('preceded_by', 'Preceeded By (P)');
    this.addInputPort('succeeded_by', 'Succeeded By (P)');
    this.addInputPort('supplemental', 'Supplemental (Bool)');
    this.addInputPort('hired_as_favor', 'Hired as Favor (Bool)');
    this.addInputPort('vocation', 'Vocation (Str)');
    this.addInputPort('level', 'Level (Num)');
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
      this.inputPorts.push(port);
      this.specializedPorts.push(port);
    }
  }

  private clearSpecializedPorts(): void {
    for (const port of this.specializedPorts) {
      super.removePort(port);
      this.inputPorts.splice(this.inputPorts.indexOf(port), 1);
    }
    this.specializedPorts = [];
  }

  private addInputPort(name: string, label: string): DefaultPortModel {
    const port = new DefaultPortModel({
      in: true,
      name,
      label,
      alignment: PortModelAlignment.LEFT,
    });
    this.addPort(port);
    this.inputPorts.push(port);
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

  public getInPorts(): DefaultPortModel[] {
    return this.inputPorts;
  }
}
