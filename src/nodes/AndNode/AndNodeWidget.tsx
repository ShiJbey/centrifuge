import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AndNodeModel } from './AndNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	SELECTION_BORDER_COLOR,
	MODIFIER_NODE_COLOR,
} from '../../utility/constants';

const Node = styled.div<{ selected: boolean }>`
	box-sizing: content-box;
	background-color: ${MODIFIER_NODE_COLOR};
	border-radius: 5px;
	font-family: sans-serif;
	width: 12rem;
	font-size: 1rem;
	${(p) => (p.selected ? `border: solid 2px ${SELECTION_BORDER_COLOR}` : '')}
`;

const Header = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	background: hsla(0, 0%, 0%, 0.5);
	padding: 0.1rem;
	color: white;
`;

const Ports = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
`;

const PortContainer = styled.div`
	background-color: #00000039;
	color: white;
`;

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
			<Node selected={this.props.node.isSelected()}>
				<Header>AND</Header>
				<Ports>
					<div>
						<PortContainer>
							<DefaultPortLabel
								engine={this.props.engine}
								port={this.props.node.inPort}
								key={this.props.node.inPort.getID()}
							/>
						</PortContainer>
					</div>
					<div>
						<PortContainer>
							<DefaultPortLabel
								engine={this.props.engine}
								port={this.props.node.outPort}
								key={this.props.node.outPort.getID()}
							/>
						</PortContainer>
					</div>
				</Ports>
			</Node>
		);
	}
}
