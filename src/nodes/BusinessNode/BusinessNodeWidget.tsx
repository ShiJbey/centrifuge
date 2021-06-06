import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BusinessNodeModel } from './BusinessNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	Header,
	Ports,
	PortContainer,
	BUSINESS_NODE_COLOR,
	PortGroupLabel,
} from '../nodeStyles';

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
			<Node background={BUSINESS_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>
					<PortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.outPort}
							key={this.props.node.outPort.getID()}
						/>
					</PortContainer>
				</Header>
				<PortGroupLabel>Attributes</PortGroupLabel>
				<div>
					<label htmlFor={`businessTypes_${this.props.node.getID()}`}></label>
					<select
						defaultValue={nodeOptions.businessType}
						style={{ width: '100%' }}
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
					<PortContainer>
						{this.props.node.getAttributePorts().map((port) => (
							<DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />
						))}
					</PortContainer>
				</Ports>
			</Node>
		);
	}
}
