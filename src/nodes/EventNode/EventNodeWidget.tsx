import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { EventNodeModel } from './EventNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, PortContainer, EVENT_NODE_COLOR, PortGroupLabel } from '../nodeStyles';

export interface EventNodeWidgetProps {
	node: EventNodeModel;
	engine: DiagramEngine;
}

export class EventNodeWidget extends React.Component<EventNodeWidgetProps> {
	constructor(props: EventNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const nodeOptions = this.props.node.getOptions();

		return (
			<Node background={EVENT_NODE_COLOR} selected={this.props.node.isSelected()}>
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
					<label htmlFor={`eventTypes_${this.props.node.getID()}`}></label>
					<select
						defaultValue={nodeOptions.eventType}
						style={{ width: '100%' }}
						name={`eventTypes_${this.props.node.getID()}`}
						onChange={(event) => {
							this.props.node.getOptions().eventType = event.target.value;
							this.props.node.changePorts(event.target.value);
							this.forceUpdate();
						}}
					>
						<option value="_">Select event type...</option>
						<option value="Adoption">Adoption</option>
						<option value="Birth">Birth</option>
						<option value="BusinessConstruction">Business Contruction</option>
						<option value="BusinessClosure">BusinessClosure</option>
						<option value="Death">Death</option>
						<option value="Demolition">Demolition</option>
						<option value="Departure">Departure</option>
						<option value="Divorce">Divorce</option>
						<option value="Hiring">Hiring</option>
						<option value="HomePurchase">Home Purchase</option>
						<option value="HouseConstruction">House Construction</option>
						<option value="LayOff">LayOff</option>
						<option value="Marriage">Marriage</option>
						<option value="Move">Move</option>
						<option value="NameChange">NameChange</option>
						<option value="Retirement">Retirement</option>
					</select>
				</div>
				<PortContainer>
				<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.eventIdPort}
						key={this.props.node.eventIdPort.getID()}
					/>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.timestampPort}
						key={this.props.node.timestampPort.getID()}
					/>
					{this.props.node.getAttributePorts().map((port) => (
						<DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />
					))}
				</PortContainer>
			</Node>
		);
	}
}
