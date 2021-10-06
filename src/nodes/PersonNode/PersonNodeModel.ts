import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import {
    BaseModelOptions,
    DeserializeEvent,
} from '@projectstorm/react-canvas-core';
import { EntityNodeModelOptions } from '../SyntaxNode';
import { PortDataType, TypedPortModel } from 'src/ports/TypedPort';

export const PERSON_NODE_TYPE = 'person-node';

export interface PersonNodeModelOptions
    extends BaseModelOptions,
        EntityNodeModelOptions {
    type: typeof PERSON_NODE_TYPE;
}

export interface PersonNodeModelGenerics {
    OPTIONS: PersonNodeModelOptions;
}

export class PersonNodeModel extends NodeModel<
    PersonNodeModelGenerics & NodeModelGenerics
> {
    private static instanceCount = 0;
    protected attributePorts: TypedPortModel[] = [];
    public outPort: TypedPortModel;

    constructor(options?: { entityName: '' }) {
        super({
            type: PERSON_NODE_TYPE,
            entityType: 'person',
            entityName:
                options?.entityName ??
                `person_${PersonNodeModel.instanceCount}`,
        });

        PersonNodeModel.instanceCount++;

        this.outPort = new TypedPortModel({
            name: 'ref',
            in: false,
            dataType: 'ref',
        });

        this.addPort(this.outPort);
        this.addAttributePort('id', 'Person ID', 'string');
        this.addAttributePort('age', 'Age', 'number');
        this.addAttributePort('gender', 'Gender', 'string', 'many');
        this.addAttributePort('tags', 'Tags', 'string', 'many');
        this.addAttributePort('alive', 'Alive', 'boolean');
        this.addAttributePort('death_year', 'Death Year', 'number');
        this.addAttributePort('attracted_to', 'Attracted To', 'string', 'many');
        this.addAttributePort('grieving', 'Grieving', 'boolean');
        this.addAttributePort(
            'college_graduate',
            'College Graduate',
            'boolean'
        );
        this.addAttributePort('retired', 'Retired', 'boolean');
        this.addAttributePort('occupation', 'Occupation ID', 'string');
        this.addAttributePort('pregnant', 'Pregnant', 'boolean');
    }

    private addAttributePort(
        name: string,
        label: string,
        dataType: PortDataType,
        cardinality: 'one' | 'many' = 'one'
    ): void {
        const port = new TypedPortModel({
            name,
            label,
            dataType: dataType,
            maxLinks: cardinality === 'one' ? 1 : undefined,
        });
        this.addPort(port);
        this.attributePorts.push(port);
    }

    public getAttributePorts(): TypedPortModel[] {
        return this.attributePorts;
    }

    public serialize() {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}
