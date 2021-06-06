import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NotNodeModel } from './NotNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, Ports, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface NotNodeWidgetProps {
	node: NotNodeModel;
	engine: DiagramEngine;
}

export interface NotNodeWidgetState {
	name: string;
}

export class NotNodeWidget extends React.Component<NotNodeWidgetProps, NotNodeWidgetState> {
	constructor(props: NotNodeWidgetProps) {
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
							port={this.props.node.valuePort}
							key={this.props.node.valuePort.getID()}
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
