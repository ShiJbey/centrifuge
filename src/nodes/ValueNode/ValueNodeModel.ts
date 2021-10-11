import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { PortDataType, TypedPortModel } from 'src/ports/TypedPort';

export const VALUE_NODE_TYPE = 'value-node';

export interface ValueNodeConfig {
    value: number | string | boolean;
}

export interface ValueNodeModelOptions extends ValueNodeConfig {
    type: typeof VALUE_NODE_TYPE;
}

export interface ValueNodeModelGenerics {
    OPTIONS: ValueNodeModelOptions;
}

export class ValueNodeModel extends NodeModel<
    ValueNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;

    constructor(options: { value: number | string | boolean }) {
        super({
            type: VALUE_NODE_TYPE,
            value: options.value,
        });

        let outputDatatype: PortDataType = 'primitive';
        switch (typeof this.options.value) {
            case 'number':
                outputDatatype = 'number';
                break;
            case 'string':
                outputDatatype = 'string';
                break;
            case 'boolean':
                outputDatatype = 'boolean';
                break;
            default:
                break;
        }

        this.outPort = this.addPort(
            new TypedPortModel({
                dataType: outputDatatype,
                name: 'out',
                in: false,
            })
        ) as TypedPortModel;
    }

    isBool(): boolean {
        return typeof this.options.value === 'boolean';
    }

    isNumber(): boolean {
        return typeof this.options.value === 'number';
    }

    isString(): boolean {
        return typeof this.options.value === 'string';
    }

    getValue(): number | string | boolean {
        return this.options.value;
    }

    setValue(value: number | string | boolean): void {
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

    public serialize() {
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
