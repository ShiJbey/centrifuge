import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { LogicalJoinNodeModel } from './LogicalJoinNodeModel';
import {
    Node,
    Header,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface LogicalJoinNodeWidgetProps {
    node: LogicalJoinNodeModel;
    engine: DiagramEngine;
}

export class LogicalJoinNodeWidget extends React.Component<LogicalJoinNodeWidgetProps> {
    constructor(props: LogicalJoinNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>
                    <div
                        style={{
                            marginLeft: '6px',
                            marginRight: '6px',
                            textTransform: 'uppercase',
                        }}
                    >
                        {this.props.node.getOptions().op}
                    </div>
                    <PortContainer>
                        <TypedPortLabel
                            engine={this.props.engine}
                            port={this.props.node.outPort}
                            key={this.props.node.outPort.getID()}
                        />
                    </PortContainer>
                </Header>

                <PortContainer>
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.externalVariablesPort}
                        key={this.props.node.externalVariablesPort.getID()}
                    />
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.internalVariablesPort}
                        key={this.props.node.internalVariablesPort.getID()}
                    />
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.clausesPort}
                        key={this.props.node.clausesPort.getID()}
                    />
                </PortContainer>
            </Node>
        );
    }
}
