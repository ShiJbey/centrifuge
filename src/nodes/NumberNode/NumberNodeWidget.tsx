import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NumberNodeModel } from './NumberNodeModel';
import {
    Node,
    NodeValueInput,
    Ports,
    PrimitiveOutputPortContainer,
    PRIMITIVE_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface NumberNodeWidgetProps {
    node: NumberNodeModel;
    engine: DiagramEngine;
}

export interface NumberNodeWidgetState {
    hasError: boolean;
}

export class NumberNodeWidget extends React.Component<
    NumberNodeWidgetProps,
    NumberNodeWidgetState
> {
    constructor(props: NumberNodeWidgetProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(event.target.value);
        const hasError = isNaN(val);
        this.setState({
            ...this.state,
            hasError: hasError,
        });
        this.props.node.getOptions().value = val;
    };

    public render(): React.ReactNode {
        const missingOutput = this.props.node.missingChild();

        return (
            <Node
                background={PRIMITIVE_NODE_COLOR}
                selected={this.props.node.isSelected()}
                hasError={this.state.hasError}
                hasWarning={missingOutput}
                style={{ padding: '3px 0 3px 3px', width: '8rem' }}
            >
                <Ports>
                    <div style={{ paddingRight: '3px', overflow: 'hidden' }}>
                        <NodeValueInput
                            type="text"
                            value={`${this.props.node.getOptions().value}`}
                            onClick={(event) => {
                                event.currentTarget.contentEditable = 'true';
                            }}
                            onChange={(event) => this.onValueChange(event)}
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
