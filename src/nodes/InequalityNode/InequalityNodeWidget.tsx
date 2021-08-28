import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { InequalityNodeModel } from './InequalityNodeModel';
import { DefaultPortLabel } from '@projectstorm/react-diagrams-defaults';
import { Node, Header, PortContainer, MODIFIER_NODE_COLOR } from '../nodeStyles';

export interface InequalityNodeWidgetProps {
	node: InequalityNodeModel;
	engine: DiagramEngine;
}

export interface InequalityNodeWidgetState {
	name: string;
}

export class InequalityNodeWidget extends React.Component<
	InequalityNodeWidgetProps,
	InequalityNodeWidgetState
> {
	constructor(props: InequalityNodeWidgetProps) {
		super(props);
	}

	public render(): React.ReactNode {
		const onSignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
			this.setState({
				...this.state,
				name: event.target.value,
			});
			this.props.node.getOptions().symbol = event.target.value;
		};

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
						port={this.props.node.valueAPort}
						key={this.props.node.valueAPort.getID()}
					/>
					<div>
						<select
							onChange={onSignChange}
							style={{ width: '100%', fontWeight: 'bold', fontSize: '1.1rem' }}
							defaultValue={this.props.node.getOptions().symbol}
						>
							<option value="=">=</option>
							<option value="!=">!=</option>
							<option value=">">&#62;</option>
							<option value="<">&#60;</option>
							<option value=">=">&ge;</option>
							<option value="<=">&le;</option>
						</select>
					</div>
					<DefaultPortLabel
						engine={this.props.engine}
						port={this.props.node.valueBPort}
						key={this.props.node.valueBPort.getID()}
					/>
				</PortContainer>
			</Node>
		);
	}
}
