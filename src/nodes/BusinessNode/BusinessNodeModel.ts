import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { EntityNodeModelOptions } from '../SyntaxNode';
import { PortDataType, TypedPortModel } from 'src/ports/TypedPort';

export const BUSINESS_NODE_TYPE = 'business-node';

export interface BusinessNodeModelOptions extends EntityNodeModelOptions {
    type: typeof BUSINESS_NODE_TYPE;
    businessType?: string;
}

export interface BusinessNodeModelGenerics {
    OPTIONS: BusinessNodeModelOptions;
}

export class BusinessNodeModel extends NodeModel<
    BusinessNodeModelGenerics & NodeModelGenerics
> {
    private static instanceCount = 0;
    protected attributePorts: TypedPortModel[] = [];
    protected specializedPorts: TypedPortModel[] = [];
    public outPort: TypedPortModel;

    constructor(options?: { entityName: string }) {
        super({
            ...options,
            type: BUSINESS_NODE_TYPE,
            entityType: 'business',
            entityName:
                options?.entityName ??
                `person_${BusinessNodeModel.instanceCount}`,
        });

        BusinessNodeModel.instanceCount++;

        this.outPort = new TypedPortModel({
            in: false,
            name: 'ref',
            dataType: 'ref',
        });
        this.addPort(this.outPort);

        this.addAttributePort('services', 'Services', 'string');
        this.addAttributePort('founded', 'founded', 'number');
        this.addAttributePort('owner', 'Owner', 'ref');
        this.addAttributePort('employees', 'Employees', 'ref');
        this.addAttributePort(
            'former_employees',
            'Former Employees',
            'ref',
            'many'
        );
        this.addAttributePort('former_owners', 'Former Owners', 'ref');
        this.addAttributePort('construction', 'Construction', 'ref', 'one');
        this.addAttributePort(
            'people_here_now',
            'People Here Now',
            'ref',
            'one'
        );
        this.addAttributePort('demolition', 'Demolition', 'ref', 'one');
        this.addAttributePort(
            'out_of_business',
            'Out of Business',
            'boolean',
            'one'
        );
        this.addAttributePort('closure', 'Closure', 'ref', 'one');
        this.addAttributePort('closed', 'Closing Year', 'number', 'one');
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

    public serialize(): any {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.businessType = event.data.businessType;
    }
}
