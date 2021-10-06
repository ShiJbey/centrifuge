import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { SerializedNodeModel } from '../../utility/serialization';
import { TypedPortModel } from 'src/ports/TypedPort';

export const SOCIAL_CONN_NODE_TYPE = 'social-conn-node';

export interface SocialConnNodeModelOptions {
    type: typeof SOCIAL_CONN_NODE_TYPE;
    relationshipType: string;
}

export interface SocialConnNodeModelGenerics {
    OPTIONS: SocialConnNodeModelOptions;
}

export class SocialConnNodeModel extends NodeModel<
    SocialConnNodeModelGenerics & NodeModelGenerics
> {
    public subjectPort: TypedPortModel;
    public otherPort: TypedPortModel;
    public outPort: TypedPortModel;

    constructor(options?: { relationshipType: string }) {
        super({
            ...options,
            type: SOCIAL_CONN_NODE_TYPE,
            relationshipType: options?.relationshipType ?? 'friends',
        });

        this.subjectPort = new TypedPortModel({
            in: true,
            name: 'subject',
            label: 'Subject',
            maxLinks: 1,
            dataType: 'ref',
        });

        this.otherPort = new TypedPortModel({
            in: true,
            name: 'other',
            label: 'Other Person',
            maxLinks: 1,
            dataType: 'ref',
        });

        this.outPort = new TypedPortModel({
            in: false,
            name: 'out',
            maxLinks: 1,
            dataType: 'clause',
        });

        this.addPort(this.subjectPort);
        this.addPort(this.otherPort);
        this.addPort(this.outPort);
    }

    public serialize(): SerializedNodeModel & SocialConnNodeModelOptions {
        return {
            ...super.serialize(),
            ...this.options,
        };
    }

    public deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.options.relationshipType = event.data.relationshipType;
    }
}
