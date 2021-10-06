import { RelationshipNodeModelOptions } from './RelationshipNode';
import { EventNodeModelOptions } from './EventNode';
import { PersonNodeModelOptions } from './PersonNode';
import { RangePredicateNodeModelOptions } from './RangePredicateNode';
import { NumberNodeModelOptions } from './NumberNode';
import { BoolNodeModelOptions } from './BoolNode';
import { StringNodeModelOptions } from './StringNode';
import { AndNodeModelOptions } from './AndNode';
import { BusinessNodeModelOptions } from './BusinessNode';
import { OccupationNodeModelOptions } from './OccupationNode';
import { OrNodeModelOptions } from './OrNode';
import { NotNodeModelOptions } from './NotNode';
import { OrJoinNodeModelOptions } from './OrJoinNode';
import { NotJoinNodeModelOptions } from './NotJoinNode';
import { SocialConnNodeModelOptions } from './SocialConnNode';
import { VariableNodeModelOptions } from './VariableNode';
import { CountNodeModelOptions } from './CountNode';

export type CentrifugeEntityNodeTypeOptions =
    | RelationshipNodeModelOptions
    | EventNodeModelOptions
    | PersonNodeModelOptions
    | BusinessNodeModelOptions
    | OccupationNodeModelOptions;

export type CentrifugeNodeTypesModelOptions =
    // Entities
    | RelationshipNodeModelOptions
    | EventNodeModelOptions
    | PersonNodeModelOptions
    | BusinessNodeModelOptions
    | OccupationNodeModelOptions
    // Modifiers
    | RangePredicateNodeModelOptions
    | AndNodeModelOptions
    | OrNodeModelOptions
    | NotNodeModelOptions
    | OrJoinNodeModelOptions
    | NotJoinNodeModelOptions
    | SocialConnNodeModelOptions
    | CountNodeModelOptions
    // Primitives
    | StringNodeModelOptions
    | BoolNodeModelOptions
    | NumberNodeModelOptions
    | VariableNodeModelOptions;
