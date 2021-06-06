import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AndNodeModel } from './AndNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, Ports, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface AndNodeWidgetProps {
	node: AndNodeModel;
	engine: DiagramEngine;
}

export class AndNodeWidget extends React.Component<AndNodeWidgetProps> {
	constructor(props: AndNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		return (
			<Node background={MODIFIER_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>{this.props.node.getOptions().label}</Header>
				<Ports>
					<PortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.inPort}
							key={this.props.node.inPort.getID()}
						/>
					</PortContainer>
					<PortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.outPort}
							key={this.props.node.outPort.getID()}
						/>
					</PortContainer>
				</Ports>
			</Node>
		);
	}
}
