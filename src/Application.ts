import createEngine, {
	DiagramEngine,
	DiagramModel,
} from '@projectstorm/react-diagrams';
import { PersonNodeFactory } from './nodes/PersonNode/';
import { EventNodeFactory } from './nodes/EventNode';
import { AsymmetricFriendshipNodeFactory } from './nodes/AsymmetricFriendshipNode';
import { BusinessRivalryNodeFactory } from './nodes/BusinessRivalryNode';
import { CaptivatedByNodeFactory } from './nodes/CaptivatedByNode';
import { DislikesNodeFactory } from './nodes/DislikesNode';
import { ExtramaritalInterestNodeFactory } from './nodes/ExtramaritalInterestNode';
import { RivalryNodeFactory } from './nodes/RivalryNode';
import { FamilyRelationshipNodeFactory } from './nodes/FamilyRelationshipNode';
import { JealousUncleNodeFactory } from './nodes/JealousUncleNode';
import { LikesNodeFactory } from './nodes/LikesNode';
import { LoveTriangleNodeFactory } from './nodes/LoveTriangleNode';
import { MisanthropeNodeFactory } from './nodes/Misanthrope';
import { OnlyChildNodeFactory } from './nodes/OnlyChildNode';
import { RelationshipNodeFactory } from './nodes/RelationshipNode';
import { VariableNodeFactory } from './nodes/VariableNode';
import { NumberNodeFactory } from './nodes/NumberNode';
import { StringNodeFactory } from './nodes/StringNode';
import { BoolNodeFactory } from './nodes/BoolNode';
import { InequalityNodeFactory } from './nodes/InequalityNode';
import { BusinessNodeFactory } from './nodes/BusinessNode';
import { OccupationNodeFactory } from './nodes/OccupationNode';
import { SocialConnNodeFactory } from './nodes/SocialConnNode';
import { NotNodeFactory } from './nodes/NotNode';
import { NotJoinNodeFactory } from './nodes/NotJoinNode';
import { OrNodeFactory } from './nodes/OrNode';
import { OrJoinNodeFactory } from './nodes/OrJoinNode';
import { CountNodeFactory } from './nodes/CountNode';
import { AndNodeFactory } from './nodes/AndNode';

class Application {
	protected activeModel: DiagramModel;
	protected diagramEngine: DiagramEngine;

	constructor() {
		this.diagramEngine = createEngine();
		this.activeModel = new DiagramModel();
		this.initModel();
	}

	private initModel(): void {
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new AsymmetricFriendshipNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new BusinessRivalryNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new CaptivatedByNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new DislikesNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new EventNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new ExtramaritalInterestNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new FamilyRelationshipNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new JealousUncleNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new LikesNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new LoveTriangleNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new MisanthropeNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new OnlyChildNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new PersonNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new RelationshipNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new RivalryNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new VariableNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new NumberNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new StringNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new BoolNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new InequalityNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new BusinessNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new OccupationNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new SocialConnNodeFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new NotNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new NotJoinNodeFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new OrNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new OrJoinNodeFactory());
		this.diagramEngine
			.getNodeFactories()
			.registerFactory(new CountNodeFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new AndNodeFactory());
		this.diagramEngine.setModel(this.activeModel);
	}

	public getActiveDiagram(): DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): DiagramEngine {
		return this.diagramEngine;
	}
}

export default Application;
