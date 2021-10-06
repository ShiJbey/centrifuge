import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AndNodeModel } from './AndNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface AndNodeWidgetProps {
    node: AndNodeModel;
    engine: DiagramEngine;
}

export interface AndNodeWidgetState {
    selected?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
}

export class AndNodeWidget extends React.Component<
    AndNodeWidgetProps,
    AndNodeWidgetState
> {
    constructor(props: AndNodeWidgetProps) {
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
                <Header>AND</Header>
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
