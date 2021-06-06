import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OrNodeModel } from './OrNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, Ports, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface OrNodeWidgetProps {
	node: OrNodeModel;
	engine: DiagramEngine;
}

export class OrNodeWidget extends React.Component<OrNodeWidgetProps> {
	constructor(props: OrNodeWidgetProps) {
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
