import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OutputNodeModel } from './OutputNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	Header,
	Ports,
	PortContainer,
	OUTPUT_NODE_COLOR,
	NodeValueInput,
} from '../nodeStyles';

export interface OutputNodeWidgetProps {
	node: OutputNodeModel;
	engine: DiagramEngine;
}

export interface OutputNodeWidgetState {
	name: string;
}

export class OutputNodeWidget extends React.Component<
	OutputNodeWidgetProps,
	OutputNodeWidgetState
> {
	constructor(props: OutputNodeWidgetProps) {
		super(props);
		this.state = {
			name: this.props.node.getOptions().name,
		};
	}

	public render(): React.ReactNode {
		const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({
				...this.state,
				name: event.target.value,
			});
			this.props.node.getOptions().name = event.target.value;
		};

		return (
			<Node background={OUTPUT_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>Output</Header>
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
					<div style={{ textAlign: 'right', paddingRight: '0.3rem' }}>
						<div>
							Required: <input type="checkbox" />
						</div>
						<div>
							Hidden: <input type="checkbox" />
						</div>
					</div>
				</Ports>
			</Node>
		);
	}
}
