import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Application from '../Application';
import TrayWidget from './TrayWidget';
import TrayWidgetItem from './TrayWidgetItem';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import {
  CanvasWidget,
  BaseModel,
  BaseModelGenerics
} from '@projectstorm/react-canvas-core';
import AppCanvasWidget from './AppCanvasWidget';
import PersonNodeInspector from './PersonNodeInspector';
import { PersonNodeModel } from './PersonNode/PersonNodeModel';

interface BodyWidgetProps {
  app: Application;
}

interface BodyWidgetState {
  selectedNode: BaseModel<BaseModelGenerics>;
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

const PERSON_NODE_COLOR = 'rgb(51, 204, 255)';
const RELATIONSHIP_NODE_COLOR = 'rgb(102, 255, 102)';
const EVENT_NODE_COLOR = 'rgb(255, 204, 102)';

function createPersonNode(label?: string): DefaultNodeModel {
  const node = new DefaultNodeModel(label ?? 'New Person', PERSON_NODE_COLOR);
  node.addOutPort('relationship');
  return node;
}

function createRelationshipNode(label?: string): DefaultNodeModel {
  const node = new DefaultNodeModel(
    label ?? 'New Relationship',
    RELATIONSHIP_NODE_COLOR
  );
  node.addInPort('person 1');
  node.addInPort('person 2');
  return node;
}

function createEventNode(label?: string): DefaultNodeModel {
  const node = new DefaultNodeModel(label ?? 'New Event', EVENT_NODE_COLOR);
  node.addInPort('subjects');
  node.addInPort('before');
  node.addInPort('after');
  return node;
}

class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {

  constructor(props: BodyWidgetProps) {
    super(props);
    this.state = {
      selectedNode: null
    };
  }


  render(): ReactNode {
    const onDrop = (event: React.DragEvent) => {
      const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));

      let node: DefaultNodeModel = null;

      if (data.type === 'person') {
        node = createPersonNode();
      } else if (data.type === 'relationship') {
        node = createRelationshipNode();
      } else {
        node = createEventNode();
      }

      node.registerListener({
        selectionChanged: (event) => {
          if (event.isSelected) {
            this.setState({
              selectedNode: event.entity,
            });

          }
        },
      });

      const point = this.props.app
        .getDiagramEngine()
        .getRelativeMousePoint(event);
      node.setPosition(point);

      this.props.app.getDiagramEngine().getModel().addNode(node);
      this.forceUpdate();
    };

    const onDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    const node = new PersonNodeModel();
    node.setPosition(400, 300);
    this.props.app.getDiagramEngine().getModel().addNode(node);

    return (
      <WidgetBody>
        <WidgetHeader>
          <div className="title">Talk of the Town Inspector</div>
        </WidgetHeader>
        <WidgetContent>
          <TrayWidget>
            <TrayWidgetItem
              model={{ type: 'person' }}
              name="Person Node"
              color={PERSON_NODE_COLOR}
            />
            <TrayWidgetItem
              model={{ type: 'relationship' }}
              name="Relationship Node"
              color={RELATIONSHIP_NODE_COLOR}
            />
            <TrayWidgetItem
              model={{ type: 'event' }}
              name="Event Node"
              color={EVENT_NODE_COLOR}
            />
          </TrayWidget>
          <WidgetLayer onDrop={onDrop} onDragOver={onDragOver}>
            <AppCanvasWidget>
              <CanvasWidget engine={this.props.app.getDiagramEngine()} />
            </AppCanvasWidget>
          </WidgetLayer>
          <TrayWidget>
            {/* <PersonNodeInspector nodeData={{label: this.state.selectedNode.getOptions().name}}/> */}
          </TrayWidget>
        </WidgetContent>
      </WidgetBody>
    );
  }
}

export default BodyWidget;
