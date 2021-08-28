import { RelationshipNodeModelOptions } from './RelationshipNode';
import { EventNodeModelOptions } from './EventNode';
import { PersonNodeModelOptions } from './PersonNode';
import { InequalityNodeModelOptions } from './InequalityNode';
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
import { OutputNodeModelOptions } from './OutputNode';
import { CountNodeModelOptions } from './CountNode';

export type CentrifugeNodeTypesModelOptions =
	// Entities
	| RelationshipNodeModelOptions
	| EventNodeModelOptions
	| PersonNodeModelOptions
	| BusinessNodeModelOptions
	| OccupationNodeModelOptions
	// Modifiers
	| InequalityNodeModelOptions
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
	| OutputNodeModelOptions;
