import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { VariableNodeModel } from './VariableNodeModel';
import {
    Node,
    Header,
    PortContainer,
    VARIABLE_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface VariableNodeWidgetProps {
    node: VariableNodeModel;
    engine: DiagramEngine;
}

export interface VariableNodeWidgetState {
    hidden?: boolean;
    required?: boolean;
}

export class VariableNodeWidget extends React.Component<
    VariableNodeWidgetProps,
    VariableNodeWidgetState
> {
    constructor(props: VariableNodeWidgetProps) {
        super(props);
        this.state = {
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
        const missingInput = this.props.node.getInputNode() === undefined;

        return (
            <Node
                background={VARIABLE_NODE_COLOR}
                selected={this.props.node.isSelected()}
                hasError={missingInput}
            >
                <Header>Variable</Header>
                <PortContainer>
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.inPort}
                        key={this.props.node.inPort.getID()}
                    />
                </PortContainer>
                {/* <div style={{ textAlign: 'right', paddingRight: '0.3rem' }}>
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
				</div> */}
            </Node>
        );
    }
}
