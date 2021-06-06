import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { VariableNodeModel } from './VariableNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	Header,
	Ports,
	PortContainer,
	NodeValueInput,
	PRIMITIVE_NODE_COLOR,
} from '../nodeStyles';

export interface VariableNodeWidgetProps {
	node: VariableNodeModel;
	engine: DiagramEngine;
}

export interface VariableNodeWidgetState {
	name: string;
}

export class VariableNodeWidget extends React.Component<
	VariableNodeWidgetProps,
	VariableNodeWidgetState
> {
	constructor(props: VariableNodeWidgetProps) {
		super(props);
		this.state = {
			name: this.props.node.getOptions().name,
		};
	}

	public render(): React.ReactNode {
		const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({
				...this.state,
				name: event.target.value.trim(),
			});
			this.props.node.getOptions().name = event.target.value.trim();
		};

		return (
			<Node background={PRIMITIVE_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>Variable</Header>
				<div style={{ width: '100%', display: 'flex' }}>
					<label style={{ paddingLeft: '0.1rem', paddingRight: '0.1rem' }}>Name:</label>
					<NodeValueInput
						type="text"
						value={this.state.name}
						onClick={(event) => {
							event.currentTarget.contentEditable = 'true';
						}}
						onChange={onNameChange}
						onDrag={(e) => e.preventDefault()}
						onFocus={() => {
							this.props.node.setLocked(true);
						}}
						onBlur={(event) => {
							event.currentTarget.contentEditable = 'false';
							this.props.node.setLocked(false);
						}}
					/>
				</div>
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
