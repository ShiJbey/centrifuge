import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { StringNodeModel } from './StringNodeModel';
import {
    Node,
    NodeValueInput,
    Ports,
    PrimitiveOutputPortContainer,
    PRIMITIVE_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface StringNodeWidgetProps {
    node: StringNodeModel;
    engine: DiagramEngine;
}

export interface StringNodeWidgetState {
    value: string;
}

export class StringNodeWidget extends React.Component<
    StringNodeWidgetProps,
    StringNodeWidgetState
> {
    constructor(props: StringNodeWidgetProps) {
        super(props);
        this.state = {
            value: this.props.node.getOptions().value as string,
        };
    }

    public render(): React.ReactNode {
        const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,
                value: event.target.value,
            });
            this.props.node.getOptions().value = event.target.value;
        };

        return (
            <Node
                background={PRIMITIVE_NODE_COLOR}
                selected={this.props.node.isSelected()}
                style={{ padding: '3px 0 3px 3px', width: '8rem' }}
                hasWarning={this.props.node.missingChild()}
            >
                <Ports>
                    <div style={{ paddingRight: '3px', overflow: 'hidden' }}>
                        <NodeValueInput
                            type="text"
                            value={this.state.value}
                            onClick={(event) => {
                                event.currentTarget.contentEditable = 'true';
                            }}
                            onChange={onValueChange}
                            onDrag={(e) => e.preventDefault()}
                            onFocus={() => {
                                this.props.node.setLocked(true);
                            }}
                            onBlur={(event) => {
                                event.currentTarget.contentEditable = 'false';
                                this.props.node.setLocked(false);
                            }}
                        />
                    </div>
                    <PrimitiveOutputPortContainer>
                        <TypedPortLabel
                            engine={this.props.engine}
                            port={this.props.node.outPort}
                            key={this.props.node.outPort.getID()}
                        />
                    </PrimitiveOutputPortContainer>
                </Ports>
            </Node>
        );
    }
}
