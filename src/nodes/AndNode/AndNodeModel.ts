import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { LogicalNodeModelOptions } from '../SyntaxNode';
import { TypedPortModel } from 'src/ports/TypedPort';

export const AND_NODE_TYPE = 'AND-node';

export interface AndNodeModelOptions extends LogicalNodeModelOptions {
    type: typeof AND_NODE_TYPE;
}

export interface AndNodeModelGenerics {
    OPTIONS: AndNodeModelOptions;
}

export class AndNodeModel extends NodeModel<
    AndNodeModelGenerics & NodeModelGenerics
> {
    public outPort: TypedPortModel;
    public inPort: TypedPortModel;

    constructor(
        options: AndNodeModelOptions = {
            type: AND_NODE_TYPE,
            op: 'and',
        }
    ) {
        super({
            ...options,
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
            .map((link) => link.getSourcePort().getNode());
    }

    missingInput(): boolean {
        return this.getInputNodes().length > 0;
    }

    hasOutput(): boolean {
        const [outputNode] = Object.values(this.outPort.getLinks())
            .filter((link) => !!link.getTargetPort())
            .map((link) => link.getTargetPort().getNode());

        return !!outputNode;
    }

    public serialize() {
        return {
            ...super.serialize(),
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
