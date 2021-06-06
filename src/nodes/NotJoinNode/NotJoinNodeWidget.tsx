import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { NotJoinNodeModel } from './NotJoinNodeModel';
import { Node, Header, Ports, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface NotJoinNodeWidgetProps {
	node: NotJoinNodeModel;
	engine: DiagramEngine;
}

export class NotJoinNodeWidget extends React.Component<NotJoinNodeWidgetProps> {
	constructor(props: NotJoinNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const nodeOptions = this.props.node.getOptions();

		return (
			<Node background={MODIFIER_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>{nodeOptions.label}</Header>
				<div>
					<button
						onClick={() => {
							this.props.node.addPortSet();
							this.forceUpdate();
						}}
					>
						+ Add Variable
					</button>
					<button
						onClick={() => {
							this.props.node.removePortSet();
							this.forceUpdate();
						}}
					>
						- Remove Variable
					</button>
				</div>
				<Ports>
					<PortContainer>
						{this.props.node.getInPorts().map((port) => (
							<DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />
						))}
					</PortContainer>
					<PortContainer>
						{this.props.node.getOutPorts().map((port) => (
							<DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />
						))}
					</PortContainer>
				</Ports>
			</Node>
		);
	}
}
