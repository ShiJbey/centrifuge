import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { PrimitiveNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const BOOL_NODE_TYPE = 'BOOL-node';

export interface BoolNodeModelOptions extends PrimitiveNodeModelOptions {
    type: typeof BOOL_NODE_TYPE;
}

export interface BoolNodeModelGenerics {
    OPTIONS: BoolNodeModelOptions;
}

export class BoolNodeModel extends NodeModel<
    BoolNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;

    constructor(
        options: BoolNodeModelOptions = {
            type: BOOL_NODE_TYPE,
            value: false,
        }
    ) {
        super({
            ...options,
        });

        this.outPort = new TypedPortModel({
            dataType: 'boolean',
            in: false,
            name: 'out',
        });

        this.addPort(this.outPort);
    }

    getChild(): NodeModel | undefined {
        const [outLink] = Object.values(this.outPort.getLinks());
        if (outLink && outLink.getTargetPort())
            return outLink.getTargetPort().getNode();
        return undefined;
    }

    missingChild(): boolean {
        return !this.getChild();
    }

    public serialize(): SerializedNodeModel & BoolNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.value = event.data.value;
    }
}
