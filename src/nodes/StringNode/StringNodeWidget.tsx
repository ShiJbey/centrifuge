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

export class StringNodeWidget extends React.Component<StringNodeWidgetProps> {
    constructor(props: StringNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
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
                            value={`${this.props.node.getOptions().value}`}
                            onClick={(event) => {
                                event.currentTarget.contentEditable = 'true';
                            }}
                            onChange={(event) =>
                                this.props.node.setValue(event.target.value)
                            }
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
