import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { RuleNodeModel } from './RuleNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    PortGroupLabel,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface RuleNodeWidgetProps {
    node: RuleNodeModel;
    engine: DiagramEngine;
}

export class RuleNodeWidget extends React.Component<RuleNodeWidgetProps> {
    constructor(props: RuleNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>
                    <span style={{ textTransform: 'uppercase' }}>
                        {this.props.node.getOptions().ruleName}
                    </span>
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.outPort}
                    />
                </Header>
                <PortGroupLabel>Attributes</PortGroupLabel>
                <Ports>
                    <PortContainer>
                        {this.props.node
                            .getParameterPorts()
                            .map((port, index) => (
                                <TypedPortLabel
                                    key={`${this.props.node.getID}_param_${index}`}
                                    engine={this.props.engine}
                                    port={port}
                                />
                            ))}
                    </PortContainer>
                </Ports>
            </Node>
        );
    }
}
