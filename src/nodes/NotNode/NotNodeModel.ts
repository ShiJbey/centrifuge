import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { LogicalNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const NOT_NODE_TYPE = 'not-node';

export interface NotNodeModelOptions extends LogicalNodeModelOptions {
    type: typeof NOT_NODE_TYPE;
}

export interface NotNodeModelGenerics {
    OPTIONS: NotNodeModelOptions;
}

export class NotNodeModel extends NodeModel<
    NotNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public inPort: TypedPortModel;

    constructor() {
        super({
            type: NOT_NODE_TYPE,
            op: 'not',
        });

        this.inPort = new TypedPortModel({
            in: true,
            name: 'in',
            dataType: 'clause',
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            dataType: 'clause',
            maxLinks: 1,
        });

        this.addPort(this.inPort);
        this.addPort(this.outPort);
    }

    getInputNode(): NodeModel | undefined {
        const [node] = Object.values(this.inPort.getLinks())
            .filter((link) => !!link.getSourcePort())
            .map((link) => link.getSourcePort().getNode());
        return node;
    }

    public serialize(): any {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
