import {
  NodeModel,
  DefaultPortModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';


export const BUSINESS_NODE_TYPE = 'business-node';

export interface BusinessNodeModelOptions {
  type: typeof BUSINESS_NODE_TYPE;
  label?: string;
  color?: string;
  businessType?: string;
}

export interface BusinessNodeModelGenerics {
  OPTIONS: BusinessNodeModelOptions;
}

export class BusinessNodeModel extends NodeModel<
  BusinessNodeModelGenerics & NodeModelGenerics
> {

  protected inputPorts: DefaultPortModel[];
  protected specializedPorts: DefaultPortModel[];
  public outPort: DefaultPortModel;
  public demisePort: DefaultPortModel;
  public servicesPort: DefaultPortModel;
  public townPort: DefaultPortModel;
  public foundedPort: DefaultPortModel;
  public ownerPort: DefaultPortModel;
  public employeesPort: DefaultPortModel;
  public formerEmployeesPort: DefaultPortModel;
  public formerOwnersPort: DefaultPortModel;
  public constructionPort: DefaultPortModel;
  public peopleHereNowPort: DefaultPortModel;
  public demolitionPort: DefaultPortModel;
  public outOfBusinessPort: DefaultPortModel;
  public closurePort: DefaultPortModel;
  public closedPort: DefaultPortModel;


  constructor(
    options: BusinessNodeModelOptions = {
      type: BUSINESS_NODE_TYPE,
      label: 'Business',
    }
  ) {
    super({
      ...options,
    });
    this.inputPorts = [];
    this.outPort = new DefaultPortModel({
      in: false,
      name: 'out',
      label: 'Out (B)',
      alignment: PortModelAlignment.RIGHT,
    });
    this.addPort(this.outPort);
    this.servicesPort = this.addInputPort('services', 'Services (Str+)');
    this.townPort = this.addInputPort('town', "Town (Str)");
    this.foundedPort = this.addInputPort('founded', 'founded (Num)');
    this.ownerPort = this.addInputPort('owner', 'Owner (P)');
    this.townPort = this.addInputPort('town', 'Town (Str)');
    this.employeesPort = this.addInputPort('employees', 'Employees (P+)');
    this.formerEmployeesPort = this.addInputPort('former_employees', 'Former Employees (P+)');
    this.formerOwnersPort = this.addInputPort('former_owners', 'Former Owners (P+)');
    this.constructionPort = this.addInputPort('construction', 'Construction (E)');
    this.peopleHereNowPort = this.addInputPort('people_here_now', 'People Here Now (P+)');
    this.demolitionPort = this.addInputPort('demolition', 'Demolition (E)');
    this.outOfBusinessPort = this.addInputPort('out_of_business', 'Out of Business (Bool)');
    this.closurePort = this.addInputPort('closure', 'Closure (E)');
    this.closedPort = this.addInputPort('closed', 'Closing Year (Num)');
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

  public getInPorts(): DefaultPortModel[] {
    return this.inputPorts;
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
