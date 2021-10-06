import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { TypedPortModel } from 'src/ports/TypedPort';

export const NOT_JOIN_NODE_TYPE = 'not-join-node';

export interface NotJoinNodeModelOptions {
    type: typeof NOT_JOIN_NODE_TYPE;
}

export interface NotJoinNodeModelGenerics {
    OPTIONS: NotJoinNodeModelOptions;
}

export class NotJoinNodeModel extends NodeModel<
    NotJoinNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public externalVariablesPort: TypedPortModel;
    public internalVariablesPort: TypedPortModel;
    public clausesPort: TypedPortModel;

    constructor() {
        super({
            type: NOT_JOIN_NODE_TYPE,
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            maxLinks: 1,
            dataType: 'clause',
        });

        this.externalVariablesPort = new TypedPortModel({
            name: 'external_variables',
            label: 'External Variables',
            in: true,
            dataType: 'ref',
        });

        this.internalVariablesPort = new TypedPortModel({
            name: 'internal_variables',
            label: 'Internal Variables',
            in: true,
            dataType: 'ref',
        });

        this.clausesPort = new TypedPortModel({
            in: true,
            name: 'clauses',
            label: 'clauses',
            dataType: 'clause',
        });

        this.addPort(this.outPort);
        this.addPort(this.internalVariablesPort);
        this.addPort(this.externalVariablesPort);
        this.addPort(this.clausesPort);
    }

    serialize(): SerializedNodeModel & NotJoinNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
