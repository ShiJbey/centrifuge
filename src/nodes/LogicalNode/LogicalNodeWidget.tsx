import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { LogicalNodeModel } from './LogicalNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface LogicalNodeWidgetProps {
    node: LogicalNodeModel;
    engine: DiagramEngine;
}

export interface LogicalNodeWidgetState {
    selected?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
}

export class LogicalNodeWidget extends React.Component<
    LogicalNodeWidgetProps,
    LogicalNodeWidgetState
> {
    constructor(props: LogicalNodeWidgetProps) {
        super(props);
        this.state = {
            selected: this.props.node.isSelected(),
            hasError:
                this.props.node.hasOutput() && this.props.node.missingInput(),
        };
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.state.selected}
                hasError={this.state.hasError}
            >
                <Header>
                    <span style={{ textTransform: 'uppercase' }}>
                        {this.props.node.getOptions().op}
                    </span>
                </Header>
                <Ports>
                    <PortContainer>
                        <TypedPortLabel
                            engine={this.props.engine}
                            port={this.props.node.inPort}
                            key={this.props.node.inPort.getID()}
                        />
                    </PortContainer>
                    <PortContainer>
                        <TypedPortLabel
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
