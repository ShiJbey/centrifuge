import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { TypedPortModel } from 'src/ports/TypedPort';

export const LOGICAL_NODE_TYPE = 'logical-node';

export interface LogicalNodeModelOptions {
    type: typeof LOGICAL_NODE_TYPE;
    op: 'and' | 'or' | 'not';
}

export interface LogicalNodeModelGenerics {
    OPTIONS: LogicalNodeModelOptions;
}

export class LogicalNodeModel extends NodeModel<
    LogicalNodeModelGenerics & NodeModelGenerics
> {
    public inPort: TypedPortModel;
    public outPort: TypedPortModel;

    constructor(options: { op: 'and' | 'or' | 'not' }) {
        super({
            type: LOGICAL_NODE_TYPE,
            op: options.op,
        });

        this.outPort = this.addPort(
            new TypedPortModel({
                in: false,
                name: 'out',
                maxLinks: 1,
                dataType: 'clause',
            })
        ) as TypedPortModel;

        this.inPort = this.addPort(
            new TypedPortModel({
                in: true,
                name: 'in',
                dataType: 'clause',
            })
        ) as TypedPortModel;
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
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.op = event.data.op;
    }
}
