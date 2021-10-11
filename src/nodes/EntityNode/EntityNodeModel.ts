import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { PortDataType, TypedPortModel } from 'src/ports/TypedPort';

export const ENTITY_NODE_TYPE = 'entity-node';

export type DoubleSidedPort = {
    inputPort: TypedPortModel;
    label: string;
    outputPort: TypedPortModel;
};

export interface EntityNodeConfig {
    color: string;
    entityName?: string;
    entityType: string;
    attributes: AttributeConfig[];
}

export interface AttributeConfig {
    name: string;
    label: string;
    datatype: PortDataType;
    cardinality?: 'one' | 'many';
}

export interface EntityNodeModelOptions extends EntityNodeConfig {
    type: typeof ENTITY_NODE_TYPE;
}

export interface EntityNodeModelGenerics {
    OPTIONS: EntityNodeModelOptions;
}

export class EntityNodeModel extends NodeModel<
    EntityNodeModelGenerics & NodeModelGenerics
> {
    private static instanceCount = 0;
    protected attributePorts: DoubleSidedPort[] = [];
    public outPort: TypedPortModel;

    constructor(options: EntityNodeConfig) {
        super({
            type: ENTITY_NODE_TYPE,
            color: options.color,
            entityType: options.entityType,
            entityName:
                options?.entityName ??
                `${options.entityType}_${EntityNodeModel.instanceCount}`,
            attributes: options.attributes,
        });

        EntityNodeModel.instanceCount++;

        this.outPort = this.addPort(
            new TypedPortModel({
                name: 'ref',
                in: false,
                dataType: 'ref',
            })
        ) as TypedPortModel;

        for (const attr of options.attributes) {
            this.addAttributePort(
                attr.name,
                attr.label,
                attr.datatype,
                attr.cardinality
            );
        }
    }

    private addAttributePort(
        name: string,
        label: string,
        dataType: PortDataType,
        cardinality: 'one' | 'many' = 'one'
    ): void {
        const inputPort = this.addPort(
            new TypedPortModel({
                in: true,
                name: `${name}_0`,
                dataType: dataType,
                maxLinks: cardinality === 'one' ? 1 : undefined,
            })
        ) as TypedPortModel;

        const outputPort = this.addPort(
            new TypedPortModel({
                in: false,
                name: `${name}_1`,
                dataType: dataType,
                maxLinks: cardinality === 'one' ? 1 : undefined,
            })
        ) as TypedPortModel;

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
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.entityName = event.data.entityName;
    }
}
