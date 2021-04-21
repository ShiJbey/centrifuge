import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { AbstractModelFactory, GenerateModelEvent } from '@projectstorm/react-canvas-core';

export class SimplePortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {
	cb: (initialConfig?: any) => PortModel;

	constructor(type: string, cb: (initialConfig?: any) => PortModel) {
		super(type);
		this.cb = cb;
	}

	generateModel(event: GenerateModelEvent): PortModel {
		return this.cb(event.initialConfig);
	}
}
