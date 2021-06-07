import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OutputNodeModel } from './OutputNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, PortContainer, OUTPUT_NODE_COLOR, NodeValueInput } from '../nodeStyles';

export interface OutputNodeWidgetProps {
	node: OutputNodeModel;
	engine: DiagramEngine;
}

export interface OutputNodeWidgetState {
	name: string;
	hidden: boolean;
	required: boolean;
}

export class OutputNodeWidget extends React.Component<
	OutputNodeWidgetProps,
	OutputNodeWidgetState
> {
	constructor(props: OutputNodeWidgetProps) {
		super(props);
		this.state = {
			name: this.props.node.getOptions().name,
			hidden: this.props.node.getOptions().hidden,
			required: this.props.node.getOptions().required,
		};
	}

	onRequiredChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			...this.state,
			required: event.target.checked,
		});
		this.props.node.getOptions().required = event.target.checked;
	}

	onHiddenChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			...this.state,
			hidden: event.target.checked,
		});
		this.props.node.getOptions().hidden = event.target.checked;
	}

	public render(): React.ReactNode {
		// const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// 	this.setState({
		// 		...this.state,
		// 		name: event.target.value,
		// 	});
		// 	this.props.node.getOptions().name = event.target.value;
		// };

		return (
			<Node background={OUTPUT_NODE_COLOR} selected={this.props.node.isSelected()}>
				<Header>Output</Header>
				{/* <div style={{ width: '100%', display: 'flex' }}>
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
				</div> */}
				<PortContainer>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.inPort}
						key={this.props.node.inPort.getID()}
					/>
				</PortContainer>
				<div style={{ textAlign: 'right', paddingRight: '0.3rem' }}>
					<div>
						Required:{' '}
						<input
							type="checkbox"
							checked={this.state.required}
							onChange={this.onRequiredChange.bind(this)}
						/>
					</div>
					<div>
						Hidden:{' '}
						<input
							type="checkbox"
							checked={this.state.hidden}
							onChange={this.onHiddenChange.bind(this)}
						/>
					</div>
				</div>
			</Node>
		);
	}
}
