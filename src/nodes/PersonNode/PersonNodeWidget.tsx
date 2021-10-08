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
import ContentEditableDiv from 'src/components/ContentEditableDiv';

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
                <Header>
                    <ContentEditableDiv
                        value={this.props.node.getOptions().entityName}
                        onActive={() => this.props.node.setSelected(false)}
                        onChange={(text) => this.props.node.setEntityName(text)}
                    />
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.outPort}
                    />
                </Header>
                <PortGroupLabel>Attributes</PortGroupLabel>
                <Ports>
                    <PortContainer>
                        {this.props.node
                            .getAttributePorts()
                            .map((doublePort, index) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                    key={`attr_ports_${this.props.node.getID}_${index}`}
                                >
                                    <TypedPortLabel
                                        engine={this.props.engine}
                                        port={doublePort.inputPort}
                                    />
                                    {doublePort.label}
                                    <TypedPortLabel
                                        engine={this.props.engine}
                                        port={doublePort.outputPort}
                                    />
                                </div>
                            ))}
                    </PortContainer>
                </Ports>
            </Node>
        );
    }
}
