import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BoolNodeModel } from './BoolNodeModel';
import styled from 'styled-components';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Ports, PRIMITIVE_NODE_COLOR } from '../nodeStyles';

const Select = styled.select`
	color: black;
	border-radius: 5px;
	font-weight: bold;
	background: #ccc;
	overflow: hidden;
	display: flex;
	justify-content: left;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const PortContainer = styled.div`
	color: white;
	border: solid 2px black;
	border-radius: 10px 0px 0px 10px;
	background-color: #525252;
`;

export interface BoolNodeWidgetProps {
	node: BoolNodeModel;
	engine: DiagramEngine;
}

export interface BoolNodeWidgetState {
	value: boolean;
}

export class BoolNodeWidget extends React.Component<BoolNodeWidgetProps, BoolNodeWidgetState> {
	constructor(props: BoolNodeWidgetProps) {
		super(props);
		this.state = {
			value: this.props.node.getOptions().value,
		};
	}

	public render(): React.ReactNode {
		const onValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
			const val = event.target.value === 'true' ? true : false;
			this.setState({
				...this.state,
				value: val,
			});
			this.props.node.getOptions().value = val;
		};

		return (
			<Node
				background={PRIMITIVE_NODE_COLOR}
				selected={this.props.node.isSelected()}
				style={{ padding: '3px 0 3px 3px', width: '11rem' }}
			>
				<Ports>
					<div style={{ paddingRight: '3px', overflow: 'hidden' }}>
						<Select
							name={`bool_select_${this.props.node.getID()}`}
							onChange={onValueChange}
							defaultValue={String(this.props.node.getOptions().value)}
						>
							<option value="true">True</option>
							<option value="false">False</option>
						</Select>
					</div>
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
