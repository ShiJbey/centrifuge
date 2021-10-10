import { RangePredicateNodeModelOptions } from './RangePredicateNode';
import { LogicalJoinNodeModelOptions } from './LogicalJoinNode';
import { SocialConnNodeModelOptions } from './SocialConnNode';
import { VariableNodeModelOptions } from './VariableNode';
import { CountNodeModelOptions } from './CountNode';
import { LogicalNodeModelOptions } from './LogicalNode';
import { ValueNodeModelOptions } from './ValueNode';
import { EntityNodeModelOptions } from './EntityNode';

export type CentrifugeNodeTypesModelOptions =
    // Entities
    | EntityNodeModelOptions
    // Modifiers
    | RangePredicateNodeModelOptions
    | LogicalNodeModelOptions
    | LogicalJoinNodeModelOptions
    | SocialConnNodeModelOptions
    | CountNodeModelOptions
    // Primitives
    | ValueNodeModelOptions
    | VariableNodeModelOptions;
