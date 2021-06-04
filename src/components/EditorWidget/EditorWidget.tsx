import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DiagramModel, DiagramModelGenerics, NodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget, BaseModel, BaseModelGenerics } from '@projectstorm/react-canvas-core';
import debounce from 'lodash/debounce';
import AppCanvasWidget from '../AppCanvasWidget/AppCanvasWidget';
import { PersonNodeModel } from '../../nodes/PersonNode/PersonNodeModel';
import { RelationshipNodeModel } from '../../nodes/RelationshipNode';
import { EventNodeModel } from '../../nodes/EventNode';
import { AsymmetricFriendshipNodeModel } from '../../nodes/AsymmetricFriendshipNode';
import { LoveTriangleNodeModel } from '../../nodes/LoveTriangleNode';
import { BusinessRivalryNodeModel } from '../../nodes/BusinessRivalryNode';
import { JealousUncleNodeModel } from '../../nodes/JealousUncleNode';
import { LikesNodeModel } from '../../nodes/LikesNode';
import { DislikesNodeModel } from '../../nodes/DislikesNode';
import { VariableNodeModel } from '../../nodes/VariableNode';
import { BoolNodeModel } from '../../nodes/BoolNode';
import { NumberNodeModel } from '../../nodes/NumberNode';
import { StringNodeModel } from '../../nodes/StringNode';
import { InequalityNodeModel } from '../../nodes/InequalityNode';
import { EditorState } from '../../redux/editors/editorReducer';
import { BusinessNodeModel } from '../../nodes/BusinessNode';
import { OccupationNodeModel } from '../../nodes/OccupationNode';
import { SocialConnNodeModel } from '../../nodes/SocialConnNode';
import { NotNodeModel } from '../../nodes/NotNode';
import { NotJoinNodeModel } from '../../nodes/NotJoinNode';
import { OrJoinNodeModel } from '../../nodes/OrJoinNode';
import { OrNodeModel } from '../../nodes/OrNode';
import { AndNodeModel } from '../../nodes/AndNode';
import { CountNodeModel } from '../../nodes/CountNode';
import { OutputNodeModel } from '../../nodes/OutputNode';

const WidgetBody = styled.div`
	position: relative;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
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
	editor: EditorState;
	onUpdate?: (data: any) => void;
	// onClose?: () => void;
	// onNodeAlert?: (data: ToastData) => void;
	// onShowCode?: (code: string) => void;
	// onSearch?: (code: string) => void;
	// onShowHelp?: () => void;
}

export interface EditorWidgetState {
	selectedNode: BaseModel<BaseModelGenerics>;
}

export class EditorWidget extends React.Component<EditorWidgetProps, EditorWidgetState> {
	debounceUpdate = debounce(
		(diagram: DiagramModel<DiagramModelGenerics>) => this.props.onUpdate(diagram.serialize()),
		500
	);

	constructor(props: EditorWidgetProps) {
		super(props);
		this.state = {
			selectedNode: null,
		};

		this.props.editor.app.getActiveDiagram();

		this.props.editor.app
			.getActiveDiagram()
			.getNodes()
			.map((node) => {
				node.registerListener({
					eventDidFire: () => {
						this.handleUpdate();
					},
				});
			});

		this.props.editor.app.getActiveDiagram().registerListener({
			eventDidFire: () => {
				this.handleUpdate();
			},
			nodesUpdated: () => {
				this.handleUpdate();
			},
			linksUpdated: () => {
				this.handleUpdate();
			},
			lockChanged: () => {
				this.handleUpdate();
			},
		});
	}

	handleUpdate(): void {
		// This editor should be marked dirty
		if (this.props.onUpdate) {
			this.debounceUpdate(this.props.editor.app.getActiveDiagram());
		}
	}

	onDrop(event: React.DragEvent): void {
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
		} else if (data.type === 'inequality') {
			node = new InequalityNodeModel();
		} else if (data.type === 'business') {
			node = new BusinessNodeModel();
		} else if (data.type === 'occupation') {
			node = new OccupationNodeModel();
		} else if (data.type === 'socialConn') {
			node = new SocialConnNodeModel();
		} else if (data.type === 'not') {
			node = new NotNodeModel();
		} else if (data.type === 'notJoin') {
			node = new NotJoinNodeModel();
		} else if (data.type === 'orJoin') {
			node = new OrJoinNodeModel();
		} else if (data.type === 'or') {
			node = new OrNodeModel();
		} else if (data.type === 'and') {
			node = new AndNodeModel();
		} else if (data.type === 'count') {
			node = new CountNodeModel();
		} else if (data.type === 'output') {
			node = new OutputNodeModel();
		} else {
			return;
		}

		const point = this.props.editor.app.getDiagramEngine().getRelativeMousePoint(event);
		node.setPosition(point);

		node.registerListener({
			eventDidFire: () => {
				this.handleUpdate();
			},
		});

		this.props.editor.app.getDiagramEngine().getModel().addNode(node);
		this.forceUpdate();
	}

	onDragOver(event: React.DragEvent): void {
		event.preventDefault();
	}

	// onSearch(): void {
	//   if (this.props.onSearch) {
	//     this.props.onSearch("code");
	//   }
	// }

	// onShowCode(): void {
	//   if (this.props.onShowCode) {
	//     this.props.onShowCode("code");
	//   }
	// }

	// onShowHelp(): void {
	//   if (this.props.onShowHelp) {
	//     this.props.onShowHelp();
	//   }
	// }

	render(): ReactNode {
		return (
			<WidgetBody onContextMenu={() => console.log('open context menu')}>
				{/* <ContextMenu /> */}
				<WidgetContent>
					<WidgetLayer onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver}>
						<AppCanvasWidget>
							<CanvasWidget engine={this.props.editor.app.getDiagramEngine()} />
						</AppCanvasWidget>
					</WidgetLayer>
				</WidgetContent>
			</WidgetBody>
		);
	}
}

export default EditorWidget;
