import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { PersonNodeModel } from './PersonNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	Header,
	Ports,
	PortContainer,
	PERSON_NODE_COLOR,
	PortGroupLabel,
} from '../nodeStyles';

export interface PersonNodeWidgetProps {
	node: PersonNodeModel;
	engine: DiagramEngine;
}

export class PersonNodeWidget extends React.Component<PersonNodeWidgetProps> {
	constructor(props: PersonNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		return (
			<Node background={PERSON_NODE_COLOR} selected={this.props.node.isSelected()}>
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
