import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { TypedPortModel } from 'src/ports/TypedPort';

export const LOGICAL_JOIN_NODE_TYPE = 'logical-join-node';

export interface LogicalJoinNodeModelOptions {
    type: typeof LOGICAL_JOIN_NODE_TYPE;
    op: 'not-join' | 'or-join';
}

export interface LogicalJoinNodeModelGenerics {
    OPTIONS: LogicalJoinNodeModelOptions;
}

export class LogicalJoinNodeModel extends NodeModel<
    LogicalJoinNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public externalVariablesPort: TypedPortModel;
    public internalVariablesPort: TypedPortModel;
    public clausesPort: TypedPortModel;

    constructor(options: { op: 'not-join' | 'or-join' }) {
        super({
            type: LOGICAL_JOIN_NODE_TYPE,
            op: options.op,
        });

        this.outPort = this.addPort(
            new TypedPortModel({
                in: false,
                name: 'out',
                maxLinks: 1,
                dataType: 'clause',
            })
        ) as TypedPortModel;

        this.externalVariablesPort = this.addPort(
            new TypedPortModel({
                name: 'external_variables',
                label: 'External Variables',
                in: true,
                dataType: 'ref',
            })
        ) as TypedPortModel;

        this.internalVariablesPort = this.addPort(
            new TypedPortModel({
                name: 'internal_variables',
                label: 'Internal Variables',
                in: true,
                dataType: 'ref',
            })
        ) as TypedPortModel;

        this.clausesPort = this.addPort(
            new TypedPortModel({
                in: true,
                name: 'clauses',
                label: 'clauses',
                dataType: 'clause',
            })
        ) as TypedPortModel;
    }

    serialize(): SerializedNodeModel & LogicalJoinNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.op = event.data.op;
    }
}
