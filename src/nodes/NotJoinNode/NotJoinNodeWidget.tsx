import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NotJoinNodeModel } from './NotJoinNodeModel';
import {
    Node,
    Header,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface NotJoinNodeWidgetProps {
    node: NotJoinNodeModel;
    engine: DiagramEngine;
}

export class NotJoinNodeWidget extends React.Component<NotJoinNodeWidgetProps> {
    constructor(props: NotJoinNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>
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
