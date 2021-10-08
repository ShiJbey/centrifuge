import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { PrimitiveNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const STRING_NODE_TYPE = 'string-node';

export interface StringNodeModelOptions extends PrimitiveNodeModelOptions {
    type: typeof STRING_NODE_TYPE;
}

export interface StringNodeModelGenerics {
    OPTIONS: StringNodeModelOptions;
}

export class StringNodeModel extends NodeModel<
    StringNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;

    constructor(options: { value?: string }) {
        super({
            type: STRING_NODE_TYPE,
            value: 'new string',
            ...options,
        });

        this.outPort = new TypedPortModel({
            dataType: 'string',
            name: 'out',
            in: false,
        });

        this.addPort(this.outPort);
    }

    setValue(value: string): void {
        this.options.value = value;
        this.fireEvent({}, 'changed');
    }

    getChild(): NodeModel | undefined {
        const [outLink] = Object.values(this.ports['out'].getLinks());
        if (outLink && outLink.getTargetPort())
            return outLink.getTargetPort().getNode();
        return undefined;
    }

    missingChild(): boolean {
        return !this.getChild();
    }

    public serialize(): SerializedNodeModel & StringNodeModelOptions {
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
