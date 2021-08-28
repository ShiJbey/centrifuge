import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { NotJoinNodeModel } from './NotJoinNodeModel';
import { Node, Header, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface NotJoinNodeWidgetProps {
	node: NotJoinNodeModel;
	engine: DiagramEngine;
}

export class NotJoinNodeWidget extends React.Component<NotJoinNodeWidgetProps> {
	constructor(props: NotJoinNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		return (
			<Node background={MODIFIER_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>
					<PortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.outPort}
							key={this.props.node.outPort.getID()}
						/>
					</PortContainer>
				</Header>

				<PortContainer>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.variablesPort}
						key={this.props.node.variablesPort.getID()}
					/>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.clausesPort}
						key={this.props.node.clausesPort.getID()}
					/>
				</PortContainer>
			</Node>
		);
	}
}
