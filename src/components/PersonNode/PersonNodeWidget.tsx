import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { PersonNodeModel } from './PersonNodeModel';

export interface PersonNodeWidgetProps {
  node: PersonNodeModel;
  engine: DiagramEngine;
}

export class PersonNodeWidget extends React.Component<PersonNodeWidgetProps> {
  constructor(props: PersonNodeWidgetProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="custom-node">
        <p>{this.props.node.label}</p>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort('relationship')}
        >
          <div className="circle-port" />
        </PortWidget>
        <div
          className="custom-node-color"
          style={{ backgroundColor: this.props.node.color }}
        />
      </div>
    );
  }
}
