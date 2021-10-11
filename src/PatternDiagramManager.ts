import createEngine, {
    DefaultDiagramState,
    DiagramEngine,
    DiagramModel,
} from '@projectstorm/react-diagrams';
import { VariableNodeFactory } from './nodes/VariableNode';
import { RangePredicateNodeFactory } from './nodes/RangePredicateNode';
import { SocialConnNodeFactory } from './nodes/SocialConnNode';
import { LogicalJoinNodeFactory } from './nodes/LogicalJoinNode';
import { CountNodeFactory } from './nodes/CountNode';
import { TypedPortFactory } from './ports/TypedPort';
import { LogicalNodeFactory } from './nodes/LogicalNode';
import { ValueNodeFactory } from './nodes/ValueNode';
import { EntityNodeFactory } from './nodes/EntityNode';
import { RuleNodeFactory } from './nodes/RuleNode';

class PatternDiagramManager {
    protected activeModel: DiagramModel;
    protected diagramEngine: DiagramEngine;

    constructor() {
        this.diagramEngine = createEngine();
        this.activeModel = new DiagramModel();
        this.initModel();

        const state = this.diagramEngine.getStateMachine().getCurrentState();
        if (state instanceof DefaultDiagramState) {
            state.dragNewLink.config.allowLooseLinks = false;
        }
    }

    private initModel(): void {
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new ValueNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new EntityNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new LogicalJoinNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new LogicalNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new RangePredicateNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new SocialConnNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new CountNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new VariableNodeFactory());
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new RuleNodeFactory());
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new TypedPortFactory());
        this.diagramEngine.setModel(this.activeModel);
    }

    public getActiveDiagram(): DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): DiagramEngine {
        return this.diagramEngine;
    }
}

export default PatternDiagramManager;
