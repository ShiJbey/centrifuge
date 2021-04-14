import createEngine, { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { PersonNodeFactory } from './components/PersonNode/PersonNodeFactory';


class Application {
  protected activeModel: DiagramModel;
  protected diagramEngine: DiagramEngine;

  constructor() {
    this.diagramEngine = createEngine();
    this.diagramEngine.getNodeFactories().registerFactory(new PersonNodeFactory());
    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }

  public addPersonNode(): void {
    throw new Error('addPersonNode not Implemented');
  }

  public addRelationshipNode(): void {
    throw new Error('addRelationshipNode not Implemented');
  }

  public addEventNode(): void {
    throw new Error('addEventNode not Implemented');
  }

  public getActiveDiagram(): DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): DiagramEngine {
    return this.diagramEngine;
  }
}

export default Application;
