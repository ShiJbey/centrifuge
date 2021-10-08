import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import {
    BaseModelOptions,
    DeserializeEvent,
} from '@projectstorm/react-canvas-core';
import { EntityNodeModelOptions } from '../SyntaxNode';
import { PortDataType, TypedPortModel } from 'src/ports/TypedPort';

export const PERSON_NODE_TYPE = 'person-node';

export type DoubleSidedPort = {
    inputPort: TypedPortModel;
    label: string;
    outputPort: TypedPortModel;
};

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
    protected attributePorts: DoubleSidedPort[] = [];
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
        const inputPort = new TypedPortModel({
            in: true,
            name: `${name}_0`,
            dataType: dataType,
            maxLinks: cardinality === 'one' ? 1 : undefined,
        });
        this.addPort(inputPort);

        const outputPort = new TypedPortModel({
            in: false,
            name: `${name}_1`,
            dataType: dataType,
            maxLinks: cardinality === 'one' ? 1 : undefined,
        });
        this.addPort(outputPort);

        this.attributePorts.push({
            inputPort,
            label,
            outputPort,
        });
    }

    public setEntityName(name: string): void {
        this.options.entityName = name;
    }

    public getAttributePorts(): DoubleSidedPort[] {
        return this.attributePorts;
    }

    public serialize() {
        return {
            ...super.serialize(),
            ...this.options,
            // attributePorts: this.attributePorts.map((row) => {
            //     return {
            //         inputPortID: row.inputPort.getID(),
            //         label: row.label,
            //         outputPortID: row.outputPort.getID(),
            //     };
            // }),
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.entityName = event.data.entityName;
        // this.attributePorts = event.data.attributePorts.map((row) => {
        //     return {
        //         inputPort: this.getPort(row.inputPortID) as TypedPortModel,
        //         label: row.label,
        //         outputPort: this.getPort(row.outputPortID) as TypedPortModel,
        //     };
        // });
    }
}
