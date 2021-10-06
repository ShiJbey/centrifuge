import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { LogicalNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const OR_NODE_TYPE = 'or-node';

export interface OrNodeModelOptions extends LogicalNodeModelOptions {
    type: typeof OR_NODE_TYPE;
}

export interface OrNodeModelGenerics {
    OPTIONS: OrNodeModelOptions;
}

export class OrNodeModel extends NodeModel<
    OrNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public inPort: TypedPortModel;

    constructor() {
        super({
            type: OR_NODE_TYPE,
            op: 'or',
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            maxLinks: 1,
            dataType: 'clause',
        });

        this.inPort = new TypedPortModel({
            in: true,
            name: 'in',
            dataType: 'clause',
        });

        this.addPort(this.outPort);
        this.addPort(this.inPort);
    }

    getInputNodes(): NodeModel[] {
        return Object.values(this.inPort.getLinks())
            .filter((link) => !!link.getSourcePort())
            .map(
                (link) => link.getSourcePort().getNode() as unknown as NodeModel
            );
    }

    public serialize(): SerializedNodeModel & OrNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
