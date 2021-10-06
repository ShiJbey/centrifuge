import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { OrNodeModel } from './OrNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface OrNodeWidgetProps {
    node: OrNodeModel;
    engine: DiagramEngine;
}

export class OrNodeWidget extends React.Component<OrNodeWidgetProps> {
    constructor(props: OrNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>OR</Header>
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
