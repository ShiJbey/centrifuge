import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { TypedPortModel } from 'src/ports/TypedPort';

export const COUNT_NODE_TYPE = 'count-node';

export interface CountNodeModelOptions {
    type: typeof COUNT_NODE_TYPE;
}

export interface CountNodeModelGenerics {
    OPTIONS: CountNodeModelOptions;
}

export class CountNodeModel extends NodeModel<
    CountNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public inPort: TypedPortModel;

    constructor() {
        super({
            type: COUNT_NODE_TYPE,
        });

        this.inPort = new TypedPortModel({
            in: true,
            name: 'in',
            dataType: 'any',
            maxLinks: 1,
        });
        this.addPort(this.inPort);

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            dataType: 'number',
        });
        this.addPort(this.outPort);
    }

    public serialize(): SerializedNodeModel & CountNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
