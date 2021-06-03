// import {AsymmetricFriendshipNodeModelOptions} from './AsymmetricFriendshipNode';
// import { BusinessRivalryNodeModelOptions } from './BusinessRivalryNode';
// import { CaptivatedByNodeModelOptions } from './CaptivatedByNode';
// import { DislikesNodeModelOptions } from './DislikesNode';
// import { ExtramaritalInterestNodeModelOptions } from './ExtramaritalInterestNode';
// import { FamilyRelationshipNodeModelOptions } from './FamilyRelationshipNode';
// import { JealousUncleNodeModelOptions } from './JealousUncleNode';
// import { LikesNodeModelOptions } from './LikesNode';
// import { LoveTriangleNodeModelOptions } from './LoveTriangleNode';
// import { MisanthropeNodeModelOptions } from './Misanthrope';
// import { OnlyChildNodeModelOptions } from './OnlyChildNode';
// import { RivalryNodeModelOptions } from './RivalryNode';
import { RelationshipNodeModelOptions } from './RelationshipNode';
import { EventNodeModelOptions } from './EventNode';
import { PersonNodeModelOptions } from './PersonNode';
import { InequalityNodeModelOptions } from './InequalityNode';
import { NumberNodeModelOptions } from './NumberNode';
import { BoolNodeModelOptions } from './BoolNode';
import { StringNodeModelOptions } from './StringNode';
import { VariableNodeModelOptions } from './VariableNode';

export type CentrifugeNodeTypesModelOptions =
  // AsymmetricFriendshipNodeModelOptions |
  // BusinessRivalryNodeModelOptions |
  // CaptivatedByNodeModelOptions |
  // DislikesNodeModelOptions |
  // ExtramaritalInterestNodeModelOptions |
  // FamilyRelationshipNodeModelOptions |
  // JealousUncleNodeModelOptions |
  // LikesNodeModelOptions |
  // LoveTriangleNodeModelOptions |
  // MisanthropeNodeModelOptions |
  // OnlyChildNodeModelOptions |
  // RivalryNodeModelOptions |
  RelationshipNodeModelOptions |
  EventNodeModelOptions |
  PersonNodeModelOptions |
  InequalityNodeModelOptions |
  NumberNodeModelOptions |
  BoolNodeModelOptions |
  StringNodeModelOptions |
  VariableNodeModelOptions;
