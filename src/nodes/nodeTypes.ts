import { RangePredicateNodeModelOptions } from './RangePredicateNode';
import { LogicalJoinNodeModelOptions } from './LogicalJoinNode';
import { SocialConnNodeModelOptions } from './SocialConnNode';
import { VariableNodeModelOptions } from './VariableNode';
import { CountNodeModelOptions } from './CountNode';
import { LogicalNodeModelOptions } from './LogicalNode';
import { ValueNodeModelOptions } from './ValueNode';
import { EntityNodeModelOptions } from './EntityNode';
import { RuleNodeModelOptions } from './RuleNode';

export type CentrifugeNodeTypesModelOptions =
    | EntityNodeModelOptions
    | RangePredicateNodeModelOptions
    | LogicalNodeModelOptions
    | LogicalJoinNodeModelOptions
    | SocialConnNodeModelOptions
    | CountNodeModelOptions
    | RuleNodeModelOptions
    | ValueNodeModelOptions
    | VariableNodeModelOptions;
