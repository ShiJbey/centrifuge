import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Application from '../Application';
import TrayWidget from './TrayWidget';
import TrayWidgetItem from './TrayWidgetItem';
import _ from 'lodash';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import AppCanvasWidget from './AppCanvasWidget';

interface BodyWidgetProps {
  app: Application;
}

const WidgetBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const WidgetHeader = styled.div`
  display: flex;
  background: rgb(30, 30, 30);
  flex-grow: 0;
  flex-shrink: 0;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  align-items: center;
`;

const WidgetContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const WidgetLayer = styled.div`
  position: relative;
  flex-grow: 1;
`;

class BodyWidget extends React.Component<BodyWidgetProps> {
  render(): ReactNode {
    const onDrop = (event: React.DragEvent) => {
      const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
      const nodesCount = _.keys(
        this.props.app.getDiagramEngine().getModel().getNodes()
      ).length;

      let node: DefaultNodeModel = null;
      if (data.type === 'in') {
        node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(192,255,0)');
        node.addInPort('In');
      } else {
        node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'rgb(0,192,255)');
        node.addOutPort('Out');
      }
      const point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
      node.setPosition(point);
      this.props.app.getDiagramEngine().getModel().addNode(node);
      this.forceUpdate();
    };

    const onDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    return (
      <WidgetBody>
        <WidgetHeader>
          <div className="title">Talk of the Town Inspector</div>
        </WidgetHeader>
        <WidgetContent>
          <TrayWidget>
            <TrayWidgetItem
              model={{ type: 'in' }}
              name="In Node"
              color="rgb(192,255,0)"
            />
            <TrayWidgetItem
              model={{ type: 'out' }}
              name="Out Node"
              color="rgb(225,192,255)"
            />
          </TrayWidget>
          <WidgetLayer onDrop={onDrop} onDragOver={onDragOver}>
            <AppCanvasWidget>
              <CanvasWidget engine={this.props.app.getDiagramEngine()} />
            </AppCanvasWidget>
          </WidgetLayer>
        </WidgetContent>
      </WidgetBody>
    );
  }
}

export default BodyWidget;
