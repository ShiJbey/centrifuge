import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { ValueNodeModel } from './ValueNodeModel';
import {
    Node,
    NodeValueInput,
    Ports,
    PrimitiveOutputPortContainer,
    PRIMITIVE_NODE_COLOR,
} from '../nodeStyles';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface ValueNodeWidgetProps {
    node: ValueNodeModel;
    engine: DiagramEngine;
}

export class ValueNodeWidget extends React.Component<ValueNodeWidgetProps> {
    public render(): React.ReactNode {
        let inputType: string | undefined = undefined;

        if (this.props.node.isBool()) {
            inputType = 'checkbox';
        } else if (this.props.node.isNumber()) {
            inputType = 'number';
        } else if (this.props.node.isString()) {
            inputType = 'text';
        }

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
                            type={inputType}
                            defaultValue={`${
                                this.props.node.getOptions().value
                            }`}
                            defaultChecked={
                                this.props.node.isBool()
                                    ? !!this.props.node.getOptions().value
                                    : undefined
                            }
                            onDrag={(e) => e.preventDefault()}
                            onFocus={() => {
                                this.props.node.setLocked(true);
                            }}
                            onChange={(event) => {
                                if (this.props.node.isBool()) {
                                    this.props.node.setValue(
                                        event.target.value.toLowerCase() ===
                                            'true'
                                    );
                                } else if (this.props.node.isNumber()) {
                                    this.props.node.setValue(
                                        parseFloat(event.target.value)
                                    );
                                } else {
                                    this.props.node.setValue(
                                        event.target.value
                                    );
                                }
                            }}
                            onBlur={() => {
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
