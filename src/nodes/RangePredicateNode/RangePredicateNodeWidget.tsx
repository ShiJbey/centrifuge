import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { RangePredicateNodeModel } from './RangePredicateNodeModel';
import {
    Node,
    Header,
    PortContainer,
    MODIFIER_NODE_COLOR,
} from '../nodeStyles';
import { InequalityOp } from '.';
import { TypedPortLabel } from 'src/ports/TypedPort';

export interface RangePredicateNodeWidgetProps {
    node: RangePredicateNodeModel;
    engine: DiagramEngine;
}

export class RangePredicateNodeWidget extends React.Component<RangePredicateNodeWidgetProps> {
    constructor(props: RangePredicateNodeWidgetProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <Node
                background={MODIFIER_NODE_COLOR}
                selected={this.props.node.isSelected()}
                hasError={this.props.node.missingChild()}
            >
                <Header>
                    <div style={{ marginLeft: '6px', marginRight: '6px' }}>
                        Range Pred.
                    </div>
                    <PortContainer>
                        <TypedPortLabel
                            engine={this.props.engine}
                            port={this.props.node.outPort}
                            key={this.props.node.outPort.getID()}
                        />
                    </PortContainer>
                </Header>
                <PortContainer>
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.valueAPort}
                        key={this.props.node.valueAPort.getID()}
                    />
                    <div>
                        <select
                            onChange={(event) =>
                                this.props.node.setOp(
                                    event.target.value as InequalityOp
                                )
                            }
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}
                            defaultValue={this.props.node.getOptions().op}
                        >
                            <option value="=">=</option>
                            <option value="!=">!=</option>
                            <option value=">">&#62;</option>
                            <option value="<">&#60;</option>
                            <option value=">=">&ge;</option>
                            <option value="<=">&le;</option>
                        </select>
                    </div>
                    <TypedPortLabel
                        engine={this.props.engine}
                        port={this.props.node.valueBPort}
                        key={this.props.node.valueBPort.getID()}
                    />
                </PortContainer>
            </Node>
        );
    }
}
