import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Application from '../Application';
import { NodeModel } from '@projectstorm/react-diagrams';
import {
  CanvasWidget,
  BaseModel,
  BaseModelGenerics,
} from '@projectstorm/react-canvas-core';
import { Button, ButtonGroup } from 'react-bootstrap';
import AppCanvasWidget from './AppCanvasWidget';
import { PersonNodeModel } from '../nodes/PersonNode/PersonNodeModel';
import { RelationshipNodeModel } from '../nodes/RelationshipNode';
import { EventNodeModel } from '../nodes/EventNode';
import { AsymmetricFriendshipNodeModel } from '../nodes/AsymmetricFriendshipNode';
import { LoveTriangleNodeModel } from '../nodes/LoveTriangleNode';
import { BusinessRivalryNodeModel } from '../nodes/BusinessRivalryNode';
import { JealousUncleNodeModel } from '../nodes/JealousUncleNode';
import { LikesNodeModel } from '../nodes/LikesNode';
import { DislikesNodeModel } from '../nodes/DislikesNode';
import { VariableNodeModel } from '../nodes/VariableNode';
import ToastData from '../utility/alertData';
import { BoolNodeModel } from '../nodes/BoolNode';
import { NumberNodeModel } from '../nodes/NumberNode';
import { StringNodeModel } from '../nodes/StringNode';
import { ModifierNodeModel } from '../nodes/ModifierNode';
import NodeTray from './NodeTray';

const WidgetBody = styled.div`
  position: relative;
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

export interface EditorWidgetProps {
  model?: any;
  onUpdate?: (data: any) => void;
  onClose?: () => void;
  onNodeAlert?: (data: ToastData) => void;
  onShowCode?: (code: string) => void;
  onSearch?: (code: string) => void;
  onShowHelp?: () => void;
}

export interface EditorWidgetState {
  selectedNode: BaseModel<BaseModelGenerics>;
}

export class EditorWidget extends React.Component<
  EditorWidgetProps,
  EditorWidgetState
> {

  app: Application;

  constructor(props: EditorWidgetProps) {
    super(props);
    this.app = new Application();
    this.state = {
      selectedNode: null,
    };

    this.app.getDiagramEngine().registerListener({
      repaintCanvas: () => {
        console.log('Canvas repainted');
        // This editor should be marked dirty
        if (this.props.onUpdate) {
          this.props.onUpdate(this.app.getActiveDiagram().serialize())
        }
      }
    });

    this.app.getActiveDiagram().registerListener({
      eventDidFire: () => {
        // This editor shold be marked dirty
        console.log('Model event fired');
        if (this.props.onUpdate) {
          this.props.onUpdate(this.app.getActiveDiagram().serialize())
        }
      }
    });
  }

  componentDidMount(): void {
      if (this.props.model) {
        this.app.getActiveDiagram().deserializeModel(this.props.model, this.app.getDiagramEngine());
      }
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

      const point = this.app
        .getDiagramEngine()
        .getRelativeMousePoint(event);
      node.setPosition(point);

      this.app.getDiagramEngine().getModel().addNode(node);
      this.forceUpdate();
    };

    const onDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    const onSearch = () => {
      if (this.props.onSearch) {
        this.props.onSearch('code');
      }
    };

    const onShowCode = () => {
      if (this.props.onShowCode) {
        this.props.onShowCode('code');
      }
    };

    const onShowHelp = () => {
      if (this.props.onShowHelp) {
        this.props.onShowHelp();
      }
    };

    return (
      <>
        <WidgetBody onContextMenu={() => console.log('open context menu')}>
          {/* <ContextMenu /> */}
          <WidgetContent>
            <NodeTray />
            <WidgetLayer onDrop={onDrop} onDragOver={onDragOver}>
              <AppCanvasWidget>
                <CanvasWidget engine={this.app.getDiagramEngine()} />
              </AppCanvasWidget>
              <ButtonGroup
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  width: 'fit-content',
                }}
              >
                <Button variant="primary" onClick={onSearch}>
                  Search
                </Button>
                <Button variant="primary" onClick={onShowCode}>
                  ShowCode
                </Button>
                <Button variant="primary" onClick={onShowHelp}>
                  Help
                </Button>
              </ButtonGroup>
            </WidgetLayer>
          </WidgetContent>
        </WidgetBody>
      </>
    );
  }
}

export default EditorWidget;
