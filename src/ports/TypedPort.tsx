import React from 'react';
import {
    PortModel,
    PortModelOptions,
    PortModelGenerics,
    PortModelAlignment,
    DiagramEngine,
    PortWidget,
    DefaultLinkModel,
} from '@projectstorm/react-diagrams';
import {
    DeserializeEvent,
    AbstractModelFactory,
} from '@projectstorm/react-canvas-core';
import styled from 'styled-components';

const TYPED_PORT_TYPE = 'typed-port';

export type PortDataType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'primitive'
    | 'clause'
    | 'ref'
    | 'any';

export type Cardinality = 'one' | 'many';

export interface TypedPortModelOptions extends PortModelOptions {
    type: typeof TYPED_PORT_TYPE;
    label?: string;
    in?: boolean;
    dataType: PortDataType;
}

export interface TypedPortModelGenerics extends PortModelGenerics {
    OPTIONS: TypedPortModelOptions;
}

/** Base class used for all ports in Centrifuge */
export class TypedPortModel extends PortModel<TypedPortModelGenerics> {
    constructor(options: {
        name: string;
        dataType: PortDataType;
        in?: boolean;
        label?: string;
        maxLinks?: number;
    }) {
        super({
            label: `${options.label ?? ''}${getTypeLabel(
                options.dataType,
                options.maxLinks
            )}`,
            in: options.in,
            alignment: options.in
                ? PortModelAlignment.LEFT
                : PortModelAlignment.RIGHT,
            type: TYPED_PORT_TYPE,
            name: options.name,
            maximumLinks: options.maxLinks,
            dataType: options.dataType,
        });
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.options.in = event.data.in;
        this.options.label = event.data.label;
        this.options.dataType = event.data.dataType;
    }

    serialize() {
        return {
            ...super.serialize(),
            in: this.options.in,
            label: this.options.label,
            dataType: this.options.dataType,
        };
    }

    getDataType(): PortDataType {
        return this.options.dataType;
    }

    canLinkToPort(port: PortModel): boolean {
        console.log(
            `${this.getType()} checking if it will link to ${port.getType()}`
        );
        if (port instanceof TypedPortModel) {
            const areOppositeAlignment =
                this.getOptions().in !== port.getOptions().in;
            const typeMatch =
                this.getDataType() === port.getDataType() ||
                (port.getDataType() === 'primitive' &&
                    ['bool', 'string', 'number'].includes(this.getDataType()));
            console.log(
                `${this.getType()} -> ${port.getType()} [${
                    typeMatch && areOppositeAlignment ? 'accepted' : 'rejected'
                }]`
            );
            return typeMatch && areOppositeAlignment;
        }
        console.error('Attempting to link to non-custom port type');
        return true;
    }

    createLinkModel(): DefaultLinkModel | null {
        if (this.options.in) {
            return null;
        }

        if (this.options.maximumLinks) {
            const numberOfLinks: number = Object.keys(this.links).length;
            if (numberOfLinks < this.options.maximumLinks) {
                return new DefaultLinkModel();
            }

            if (this.options.maximumLinks === 1 && numberOfLinks === 1) {
                return Object.values(this.links)[0] as DefaultLinkModel;
            }

            if (numberOfLinks >= this.options.maximumLinks) {
                return null;
            }
        }
        return new DefaultLinkModel();
    }
}

interface TypedPortLabelProps {
    port: TypedPortModel;
    engine: DiagramEngine;
}

const PortLabel = styled.div`
    display: flex;
    margin-top: 1px;
    align-items: center;
`;

const Label = styled.div`
    padding: 0 5px;
    flex-grow: 1;
`;

const Port = styled.div`
    width: 15px;
    height: 15px;
    background: rgba(255, 255, 255, 0.3);

    &:hover {
        background: rgb(192, 255, 0);
    }
`;

export class TypedPortLabel extends React.Component<TypedPortLabelProps> {
    render() {
        const port = (
            <PortWidget engine={this.props.engine} port={this.props.port}>
                <Port />
            </PortWidget>
        );
        const label = <Label>{this.props.port.getOptions().label}</Label>;

        return (
            <PortLabel>
                {this.props.port.getOptions().in ? port : label}
                {this.props.port.getOptions().in ? label : port}
            </PortLabel>
        );
    }
}

export class TypedPortFactory extends AbstractModelFactory<
    TypedPortModel,
    DiagramEngine
> {
    constructor() {
        super(TYPED_PORT_TYPE);
    }

    generateModel(): TypedPortModel {
        return new TypedPortModel({
            dataType: 'primitive',
            name: 'unkown',
        });
    }
}

export function getTypeLabel(
    portType: PortDataType,
    maxLinks?: number
): string {
    const cardinalitySuffix = maxLinks && maxLinks === 1 ? '' : '+';
    switch (portType) {
        case 'boolean':
            return ` (bool${cardinalitySuffix})`;
        case 'number':
            return ` (num${cardinalitySuffix})`;
        case 'string':
            return ` (str${cardinalitySuffix})`;
        case 'clause':
            return ` (cls${cardinalitySuffix})`;
        case 'ref':
            return ` (ref${cardinalitySuffix})`;
        case 'primitive':
            return ` (str,bool,num${cardinalitySuffix})`;
        case 'any':
            return ` (any${cardinalitySuffix})`;
        default:
            throw new Error(`Received invalid constant type: ${portType}`);
    }
}
