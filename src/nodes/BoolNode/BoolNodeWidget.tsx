import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BoolNodeModel } from './BoolNodeModel';
import styled from 'styled-components';
import { Node, Ports, PRIMITIVE_NODE_COLOR } from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

const Select = styled.select`
    color: black;
    border-radius: 5px;
    font-weight: bold;
    background: #ccc;
    overflow: hidden;
    display: flex;
    justify-content: left;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const PortContainer = styled.div`
    color: white;
    border: solid 2px black;
    border-radius: 10px 0px 0px 10px;
    background-color: #525252;
`;

export interface BoolNodeWidgetProps {
    node: BoolNodeModel;
    engine: DiagramEngine;
}

export class BoolNodeWidget extends React.Component<BoolNodeWidgetProps> {
    onValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const val = event.target.value === 'true' ? true : false;
        this.props.node.setValue(val);
    };

    render(): React.ReactNode {
        return (
            <Node
                background={PRIMITIVE_NODE_COLOR}
                selected={this.props.node.isSelected()}
                hasWarning={this.props.node.missingChild()}
                style={{ padding: '3px 0 3px 3px', width: '8rem' }}
            >
                <Ports>
                    <div style={{ paddingRight: '3px', overflow: 'hidden' }}>
                        <Select
                            name={`bool_select_${this.props.node.getID()}`}
                            onChange={(event) => this.onValueChange(event)}
                            defaultValue={String(
                                this.props.node.getOptions().value
                            )}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </Select>
                    </div>
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
