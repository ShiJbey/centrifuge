import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { RelationshipNodeModel, RelationshipTypes } from './RelationshipNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	Header,
	PortContainer,
	PortGroupLabel,
	RELATIONSHIP_NODE_COLOR,
} from '../nodeStyles';

export interface RelationshipNodeWidgetProps {
	node: RelationshipNodeModel;
	engine: DiagramEngine;
}

export class RelationshipNodeWidget extends React.Component<RelationshipNodeWidgetProps> {
	constructor(props: RelationshipNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const nodeOptions = this.props.node.getOptions();
		return (
			<Node background={RELATIONSHIP_NODE_COLOR} selected={this.props.node.isSelected()}>
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
						defaultValue={nodeOptions.relationshipType}
						style={{ width: '100%' }}
						name={`occupationTypes_${this.props.node.getID()}`}
						onChange={(event) => {
							this.props.node.getOptions().relationshipType = event.target.value;
							this.forceUpdate();
						}}
					>
						<option value="_">Select relationship type...</option>
						{RelationshipTypes.map((typeName) => (
							<option
								key={`relationshipType_${this.props.node.getID()}_${typeName}`}
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
