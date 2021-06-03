import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BusinessNodeModel } from './BusinessNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
  BUSINESS_NODE_COLOR,
  SELECTION_BORDER_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ background: string; selected: boolean }>`
  background-color: ${(p) => p.background ?? BUSINESS_NODE_COLOR};
  border-radius: 5px;
  font-family: sans-serif;
  color: white;
  overflow: visible;
  font-size: 11px;
  padding-bottom: 4px;
  width: max-content;
  ${(p) => (p.selected ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
`;

const Title = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  white-space: nowrap;
  justify-items: center;
`;

const TitleName = styled.div`
  flex-grow: 1;
  padding: 5px 5px;
`;

const Ports = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const PortsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(1, 1, 1, 0.6);

  &:first-of-type {
    margin-right: 10px;
  }

  &:only-child {
    margin-right: 0px;
  }
`;

export interface BusinessNodeWidgetProps {
  node: BusinessNodeModel;
  engine: DiagramEngine;
}

export class BusinessNodeWidget extends React.Component<BusinessNodeWidgetProps> {
  constructor(props: BusinessNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const nodeOptions = this.props.node.getOptions();

    return (
      <Node
        selected={this.props.node.isSelected()}
        background={nodeOptions.color}
      >
        <Title>
          <TitleName>{nodeOptions.label}</TitleName>
        </Title>
        <div>
          <label htmlFor={`businessTypes_${this.props.node.getID()}`}></label>
          <select
            defaultValue={nodeOptions.businessType}
            style={{width: '100%'}}
            name={`businessTypes_${this.props.node.getID()}`}
            onChange={(event) => {
              this.props.node.getOptions().businessType = event.target.value;
              this.forceUpdate();
            }}
          >
            <option value="_">Select business type...</option>
            <option value="ApartmentComplex">Apartment Complex</option>
            <option value="Bakery">Bakery</option>
            <option value="Bank">Bank</option>
            <option value="Bar">Bar</option>
            <option value="BarberShop">Barbershop</option>
            <option value="BlacksmithShop">Blacksmith Shop</option>
            <option value="Brewery">Brewery</option>
            <option value="BusDepot">bus Depot</option>
            <option value="ButcherShop">Butcher Shop</option>
            <option value="CandyStore">Candy Store</option>
            <option value="CarpetryCompany">Carpentry Company</option>
            <option value="Cemetery">Cemetery</option>
            <option value="CityHall">City Hall</option>
            <option value="ClothingStore">Clothing Store</option>
            <option value="CoalMine">Coal Mine</option>
            <option value="Dairy">Dairy</option>
            <option value="DayCare">Day Care</option>
            <option value="Deli">Deli</option>
            <option value="DentistOffice">Destist Office</option>
            <option value="DepartmentStore">Department Store</option>
            <option value="Diner">Diner</option>
            <option value="Distillery">Distillery</option>
            <option value="DrugStore">Drug Store</option>
            <option value="Farm">Farm</option>
            <option value="FireStation">Fire Station</option>
            <option value="Foundry">Foundry</option>
            <option value="ConstructionFirm">Construction Firm</option>
            <option value="FurnitureStore">Furniture Store</option>
            <option value="GeneralStore">General Store</option>
            <option value="GroceryStore">Grocery Store</option>
            <option value="HardwareStore">Hardware Store</option>
            <option value="Hospital">Hospital</option>
            <option value="Hotel">Hotel</option>
            <option value="Inn">Inn</option>
            <option value="InsuranceCompany">Insurance Company</option>
            <option value="JeweleryShop">Jewelery Shop</option>
            <option value="LawFirm">LawFirm</option>
            <option value="OptometryClinic">Optometry Clinic</option>
            <option value="PaintingCompany">Painting Company</option>
            <option value="Park">Park</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="PlasticSurgeryClinic">Plastic Surgery Clinic</option>
            <option value="PlumbingCompany">Plumbing Company</option>
            <option value="PoliceStation">Police Station</option>
            <option value="Quary">Quary</option>
            <option value="RealtyFirm">Realty Firm</option>
            <option value="Restaurant">Restaurant</option>
            <option value="School">School</option>
            <option value="ShoemakerShop">ShoemakerShop</option>
            <option value="Supermarket">Supermarket</option>
            <option value="TailorShop">TailorShop</option>
            <option value="TattooParlor">Tatoo Parlor</option>
            <option value="Tavern">Tavern</option>
            <option value="TaxiDepot">Taxi Depot</option>
            <option value="University">University</option>
          </select>
        </div>
        <Ports>
          <PortsContainer>
            {this.props.node.getInPorts().map((port) => (
                <DefaultPortLabel
                  engine={this.props.engine}
                  port={port}
                  key={port.getID()}
                />
            ))}
          </PortsContainer>
          <PortsContainer>
            <DefaultPortLabel
              engine={this.props.engine}
              port={this.props.node.outPort}
              key={this.props.node.outPort.getID()}
            />
          </PortsContainer>
        </Ports>
      </Node>
    );
  }
}
