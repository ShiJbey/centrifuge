import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Application from '../Application';
import TrayWidget from './TrayWidget';
import TrayWidgetItem from './TrayWidgetItem';
import { NodeModel } from '@projectstorm/react-diagrams';
import {
  CanvasWidget,
  BaseModel,
  BaseModelGenerics,
} from '@projectstorm/react-canvas-core';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import AppCanvasWidget from './AppCanvasWidget';
// import PersonNodeInspector from './PersonNodeInspector';
import { PersonNodeModel } from '../nodes/PersonNode/PersonNodeModel';
import { RelationshipNodeModel } from '../nodes/RelationshipNode';
import { EventNodeModel } from '../nodes/EventNode';
import {
  ASYMMETRIC_FRIENDSHIP_NODE_COLOR,
  EVENT_NODE_COLOR,
  RELATIONSHIP_NODE_COLOR,
  PERSON_NODE_COLOR,
  LOVE_TRIANGLE_NODE_COLOR,
  BUSINESS_RIVALRY_NODE_COLOR,
  JEALOUS_UNCLE_NODE_COLOR,
  LIKES_NODE_COLOR,
  DISLIKES_NODE_COLOR,
  VARIABLE_NODE_COLOR,
  NUMBER_NODE_COLOR,
  STRING_NODE_COLOR,
  BOOL_NODE_COLOR,
  MODIFIER_NODE_COLOR
} from '../constants';
import { AsymmetricFriendshipNodeModel } from '../nodes/AsymmetricFriendshipNode';
import { LoveTriangleNodeModel } from '../nodes/LoveTriangleNode';
import { BusinessRivalryNodeModel } from '../nodes/BusinessRivalryNode';
import { JealousUncleNodeModel } from '../nodes/JealousUncleNode';
import { LikesNodeModel } from '../nodes/LikesNode';
import { DislikesNodeModel } from '../nodes/DislikesNode';
import { processDiagram } from '../model-to-ds';
import { SerializedDiagram } from '../utils';
import { VariableNodeModel } from '../nodes/VariableNode';
import ToastData from '../toast-data';
import { BoolNodeModel } from '../nodes/BoolNode';
import { NumberNodeModel } from '../nodes/NumberNode';
import { StringNodeModel } from '../nodes/StringNode';
import { ModifierNodeModel } from '../nodes/ModifierNode';


const WidgetBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WidgetContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const WidgetLayer = styled.div`
  position: relative;
  flex-grow: 1;
`;

export interface BodyWidgetProps {
  app: Application;
  onNodeAlert?: (data: ToastData) => void;
  onShowCode?: (code: string) => void;
}

export interface BodyWidgetState {
  selectedNode: BaseModel<BaseModelGenerics>;
  showCodeModal: boolean;
  showInstructionModal: boolean;
  dsCode?: string;
}

export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
  constructor(props: BodyWidgetProps) {
    super(props);
    this.state = {
      selectedNode: null,
      showCodeModal: false,
      showInstructionModal: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.onShowCodeModal = this.onShowCodeModal.bind(this);
    this.onHideCodeModal = this.onHideCodeModal.bind(this);
  }

  onSearch(): void {
    console.log(this.props.app.getDiagramEngine().getModel().serialize());
  }

  onShowCodeModal(): void {
    this.setState({
      ...this.state,
      showCodeModal: true,
      dsCode: processDiagram(
        this.props.app.getDiagramEngine().getModel().serialize() as unknown as SerializedDiagram
      )[1],
    });
  }

  onHideCodeModal(): void {
    this.setState({
      ...this.state,
      showCodeModal: false,
    });
  }

  render(): ReactNode {
    const onDrop = (event: React.DragEvent) => {
      const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));

      let node: NodeModel = null;

      if (data.type === 'person') {
        node = new PersonNodeModel();
      } else if (data.type === 'relationship') {
        node = new RelationshipNodeModel();
      } else if (data.type === 'event') {
        node = new EventNodeModel();
      } else if (data.type === 'asymmetric-friendship') {
        node = new AsymmetricFriendshipNodeModel();
      } else if (data.type === 'love-triangle') {
        node = new LoveTriangleNodeModel();
      } else if (data.type === 'business-rivalry') {
        node = new BusinessRivalryNodeModel();
      } else if (data.type === 'jealous-uncle') {
        node = new JealousUncleNodeModel();
      } else if (data.type === 'likes') {
        node = new LikesNodeModel();
      } else if (data.type === 'dislikes') {
        node = new DislikesNodeModel();
      } else if (data.type === 'variable') {
        node = new VariableNodeModel();
      } else if (data.type === 'string') {
        node = new StringNodeModel();
      } else if (data.type === 'number') {
        node = new NumberNodeModel();
      } else if (data.type === 'boolean') {
        node = new BoolNodeModel();
      } else if (data.type === 'modifier') {
        node = new ModifierNodeModel();
      } else {
        return;
      }

      node.registerListener({
        selectionChanged: (event) => {
          if (this.state.selectedNode) {
            this.state.selectedNode.setLocked(false);
          }

          if (event.isSelected) {
            this.setState({
              selectedNode: event.entity,
            });
          } else {
            this.setState({
              selectedNode: null,
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

    return (
      <>
        <WidgetBody>
          <WidgetContent>
            {/* <TrayWidget>
              <h3 className="text-center">Primitives</h3>
              <TrayWidgetItem
                model={{ type: 'variable' }}
                name="Variable Node"
                color={VARIABLE_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'number' }}
                name="Number Node"
                color={NUMBER_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'string' }}
                name="String Node"
                color={STRING_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'boolean' }}
                name="Boolean Node"
                color={BOOL_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'modifier' }}
                name="Modifier Node"
                color={MODIFIER_NODE_COLOR}
              />
              <h3 className="text-center">Entities</h3>
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
              <h3 className="text-center">Patterns</h3>
              <TrayWidgetItem
                model={{ type: 'asymmetric-friendship' }}
                name="Asymmetric Friendship"
                color={ASYMMETRIC_FRIENDSHIP_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'love-triangle' }}
                name="Love Triangle"
                color={LOVE_TRIANGLE_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'business-rivalry' }}
                name="Business Rivalry"
                color={BUSINESS_RIVALRY_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'jealous-uncle' }}
                name="Jealous Uncle"
                color={JEALOUS_UNCLE_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'likes' }}
                name="Likes Node"
                color={LIKES_NODE_COLOR}
              />
              <TrayWidgetItem
                model={{ type: 'dislikes' }}
                name="Dislikes Node"
                color={DISLIKES_NODE_COLOR}
              />
            </TrayWidget> */}
            <WidgetLayer
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <AppCanvasWidget>
                <CanvasWidget engine={this.props.app.getDiagramEngine()} />
              </AppCanvasWidget>
              <ButtonGroup
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  height: '3rem',
                  width: 'fit-content',
                }}
              >
                <Button variant="primary" onClick={this.onSearch}>
                  Search
                </Button>
                <Button variant="primary" onClick={this.onShowCodeModal}>ShowCode</Button>
              </ButtonGroup>
            </WidgetLayer>
          </WidgetContent>
        </WidgetBody>
      </>
    );
  }
}

export default BodyWidget;
