import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { TypedPortModel } from 'src/ports/TypedPort';

export const RANGE_PREDICATE_NODE_TYPE = 'inequality-node';

export type InequalityOp = '<' | '>' | '<=' | '>=' | '!=' | '=';

export interface RangePredicateNodeModelOptions {
    type: typeof RANGE_PREDICATE_NODE_TYPE;
    op: InequalityOp;
}

export interface RangePredicateNodeModelGenerics {
    OPTIONS: RangePredicateNodeModelOptions;
}

export class RangePredicateNodeModel extends NodeModel<
    RangePredicateNodeModelGenerics & NodeModelGenerics
> {
    public valueAPort: TypedPortModel;
    public valueBPort: TypedPortModel;
    public outPort: TypedPortModel;

    constructor(options?: { op: InequalityOp }) {
        super({
            type: RANGE_PREDICATE_NODE_TYPE,
            op: options?.op ?? '<',
        });

        this.valueAPort = new TypedPortModel({
            name: 'value_a',
            label: 'Value A',
            maxLinks: 1,
            dataType: 'primitive',
            in: true,
        });

        this.valueBPort = new TypedPortModel({
            name: 'value_b',
            label: 'Value B',
            maxLinks: 1,
            dataType: 'primitive',
            in: true,
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            label: '',
            maxLinks: 1,
            dataType: 'clause',
        });

        this.addPort(this.valueAPort);
        this.addPort(this.valueBPort);
        this.addPort(this.outPort);
    }

    setOp(op: InequalityOp): void {
        this.options.op = op;
        this.fireEvent({}, 'changed');
    }

    getPortANode(): NodeModel | undefined {
        const [portALink] = Object.values(this.ports['value_b'].getLinks());
        if (!portALink) return undefined;
        return portALink.getSourcePort().getNode();
    }

    getPortBNode(): NodeModel | undefined {
        const [portBLink] = Object.values(this.ports['value_a'].getLinks());
        if (!portBLink) return undefined;
        return portBLink.getSourcePort().getNode();
    }

    missingChild(): boolean {
        return !this.getPortANode() || !this.getPortBNode();
    }

    public serialize(): SerializedNodeModel & RangePredicateNodeModelOptions {
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
