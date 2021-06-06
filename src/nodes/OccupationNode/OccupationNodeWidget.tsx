import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OccupationNodeModel, OccupationTypes } from './OccupationNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, PortContainer, OCCUPATION_NODE_COLOR, PortGroupLabel } from '../nodeStyles';

export interface OccupationNodeWidgetProps {
	node: OccupationNodeModel;
	engine: DiagramEngine;
}

export class OccupationNodeWidget extends React.Component<OccupationNodeWidgetProps> {
	constructor(props: OccupationNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const nodeOptions = this.props.node.getOptions();

		return (
			<Node background={OCCUPATION_NODE_COLOR} selected={this.props.node.isSelected()}>
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
					<select
						defaultValue={nodeOptions.occupationType}
						style={{ width: '100%' }}
						name={`occupationTypes_${this.props.node.getID()}`}
						onChange={(event) => {
							this.props.node.getOptions().occupationType = event.target.value;
							this.props.node.changePorts(event.target.value);
							this.forceUpdate();
						}}
					>
						<option value="_">Select Occupation type...</option>
						{OccupationTypes.map((typeName) => (
							<option
								key={`occupationTypes_${this.props.node.getID()}_${typeName}`}
								value={typeName}
							>
								{typeName}
							</option>
						))}
					</select>
				</div>
				<PortContainer>
					{this.props.node.getAttributePorts().map((port) => (
						<DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />
					))}
				</PortContainer>
			</Node>
		);
	}
}
