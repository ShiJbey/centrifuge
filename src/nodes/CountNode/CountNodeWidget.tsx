import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CountNodeModel } from './CountNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface CountNodeWidgetProps {
    node: CountNodeModel;
    engine: DiagramEngine;
}

export class CountNodeWidget extends React.Component<CountNodeWidgetProps> {
    constructor(props: CountNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>COUNT</Header>
                <Ports>
                    <div>
                        <PortContainer>
                            <TypedPortLabel
                                engine={this.props.engine}
                                port={this.props.node.inPort}
                                key={this.props.node.inPort.getID()}
                            />
                        </PortContainer>
                    </div>
                    <div>
                        <PortContainer>
                            <TypedPortLabel
                                engine={this.props.engine}
                                port={this.props.node.outPort}
                                key={this.props.node.outPort.getID()}
                            />
                        </PortContainer>
                    </div>
                </Ports>
            </Node>
        );
    }
}
