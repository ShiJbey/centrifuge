import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { PrimitiveNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const NUMBER_NODE_TYPE = 'number-node';

export interface NumberNodeModelOptions extends PrimitiveNodeModelOptions {
    type: typeof NUMBER_NODE_TYPE;
}

export interface NumberNodeModelGenerics {
    OPTIONS: NumberNodeModelOptions;
}

export class NumberNodeModel extends NodeModel<
    NumberNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;

    constructor(options?: { value: number }) {
        super({
            ...options,
            type: NUMBER_NODE_TYPE,
            value: options?.value ?? 0,
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            dataType: 'number',
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

    public serialize(): SerializedNodeModel & NumberNodeModelOptions {
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
