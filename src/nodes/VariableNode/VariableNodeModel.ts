import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { TypedPortModel } from 'src/ports/TypedPort';

export const VARIABLE_NODE_TYPE = 'variable-node';

export interface VariableNodeModelOptions {
    type: typeof VARIABLE_NODE_TYPE;
    required?: boolean;
    hidden?: boolean;
}

export interface VariableNodeModelGenerics {
    OPTIONS: VariableNodeModelOptions;
}

export class VariableNodeModel extends NodeModel<
    VariableNodeModelGenerics & NodeModelGenerics
> {
    public inPort: TypedPortModel;

    constructor(options: { hidden?: boolean; required?: boolean }) {
        super({
            type: VARIABLE_NODE_TYPE,
            ...options,
        });
        this.options.hidden = options.hidden;
        this.options.required = options.required;

        this.inPort = this.addPort(
            new TypedPortModel({
                name: 'input',
                dataType: 'ref',
                in: true,
                maxLinks: 1,
            })
        ) as TypedPortModel;
    }

    getInputNode(): NodeModel {
        const [node] = Object.values(this.ports['input'].links)
            .filter((link) => !!link.getSourcePort())
            .map((link) => link.getSourcePort().getNode());
        return node;
    }

    public serialize() {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.required = event.data.required;
        this.options.hidden = event.data.hidden;
    }
}
