import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NumberNodeModel } from './NumberNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import {
	Node,
	NodeValueInput,
	Ports,
	PrimitiveOutputPortContainer,
	PRIMITIVE_NODE_COLOR,
} from '../nodeStyles';

export interface NumberNodeWidgetProps {
	node: NumberNodeModel;
	engine: DiagramEngine;
}

export interface NumberNodeWidgetState {
	value: string;
	hasError: boolean;
}

export class NumberNodeWidget extends React.Component<
	NumberNodeWidgetProps,
	NumberNodeWidgetState
> {
	constructor(props: NumberNodeWidgetProps) {
		super(props);
		this.state = {
			value: this.props.node.getOptions().value.toString(),
			hasError: false,
		};
	}

	public render(): React.ReactNode {
		const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const val = parseFloat(event.target.value);
			const hasError = isNaN(val);
			this.setState({
				...this.state,
				value: event.target.value,
				hasError: hasError,
			});
			this.props.node.getOptions().value = val;
		};

		return (
			<Node
				background={PRIMITIVE_NODE_COLOR}
				selected={this.props.node.isSelected()}
				hasError={this.state.hasError}
				style={{ padding: '3px 0 3px 3px', width: '8rem' }}
			>
				<Ports>
					<div style={{ paddingRight: '3px', overflow: 'hidden' }}>
						<NodeValueInput
							type="text"
							value={this.state.value}
							onClick={(event) => {
								event.currentTarget.contentEditable = 'true';
							}}
							onChange={onValueChange}
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
					<PrimitiveOutputPortContainer>
						<DefaultPortLabel
							engine={this.props.engine}
							port={this.props.node.outPort}
							key={this.props.node.outPort.getID()}
						/>
					</PrimitiveOutputPortContainer>
				</Ports>
			</Node>
		);
	}
}
