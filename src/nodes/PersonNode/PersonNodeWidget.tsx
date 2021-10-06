import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { PersonNodeModel } from './PersonNodeModel';
import {
    Node,
    Header,
    Ports,
    PortContainer,
    PERSON_NODE_COLOR,
    PortGroupLabel,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface PersonNodeWidgetProps {
    node: PersonNodeModel;
    engine: DiagramEngine;
}

export class PersonNodeWidget extends React.Component<PersonNodeWidgetProps> {
    constructor(props: PersonNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={PERSON_NODE_COLOR}
                selected={this.props.node.isSelected()}
            >
                <Header>Person</Header>
                <PortGroupLabel>Reference</PortGroupLabel>
                <Ports>
                    <PortContainer>
                        <TypedPortLabel
                            engine={this.props.engine}
                            port={this.props.node.outPort}
                        />
                    </PortContainer>
                </Ports>
                <PortGroupLabel>Attributes</PortGroupLabel>
                <Ports>
                    <PortContainer>
                        {this.props.node.getAttributePorts().map((port) => (
                            <TypedPortLabel
                                engine={this.props.engine}
                                port={port}
                                key={port.getID()}
                            />
                        ))}
                    </PortContainer>
                </Ports>
            </Node>
        );
    }
}
