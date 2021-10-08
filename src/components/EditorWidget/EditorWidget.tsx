import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
    CanvasWidget,
    BaseModel,
    BaseModelGenerics,
} from '@projectstorm/react-canvas-core';
import CanvasBackground from '../CanvasBackground';
import { EditorState } from '../../redux/editorSlice';
import styles from './EditorWidget.module.scss';
import PatternDiagramManager from '../../PatternDiagramManager';
import { debounce } from 'lodash';
import { SerializedDiagram } from 'src/utility/serialization';

const WidgetBody = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
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
    onChange?: (changes: {
        patternName?: string;
        model?: SerializedDiagram;
    }) => void;
}

export interface EditorWidgetState {
    patternNameEditable: boolean;
    selectedNode?: BaseModel<BaseModelGenerics>;
    diagramManager: PatternDiagramManager;
}

export class EditorWidget extends React.Component<
    EditorWidgetProps,
    EditorWidgetState
> {
    constructor(props: EditorWidgetProps) {
        super(props);
        this.state = {
            patternNameEditable: false,
            selectedNode: undefined,
            diagramManager: new PatternDiagramManager(),
        };

        if (this.props.editor.model) {
            this.state.diagramManager
                .getActiveDiagram()
                .deserializeModel(
                    this.props.editor.model,
                    this.state.diagramManager.getDiagramEngine()
                );
        }

        this.state.diagramManager
            .getActiveDiagram()
            .getNodes()
            .map((node) => {
                node.registerListener({
                    positionChanged: () => {
                        this.handleUpdate(
                            this.state.diagramManager
                                .getActiveDiagram()
                                .serialize()
                        );
                    },
                    entityRemoved: () => {
                        this.handleUpdate(
                            this.state.diagramManager
                                .getActiveDiagram()
                                .serialize()
                        );
                    },
                    changed: () => {
                        this.handleUpdate(
                            this.state.diagramManager
                                .getActiveDiagram()
                                .serialize()
                        );
                    },
                });
            });

        this.state.diagramManager.getActiveDiagram().registerListener({
            nodesUpdated: () => {
                this.handleUpdate(
                    this.state.diagramManager.getActiveDiagram().serialize()
                );
            },
            linksUpdated: () => {
                this.handleUpdate(
                    this.state.diagramManager.getActiveDiagram().serialize()
                );
            },
        });
    }

    handleUpdate = debounce((model: SerializedDiagram) => {
        if (this.props.onChange) {
            this.props.onChange({ model });
        }
    }, 500);

    onDrop(event: React.DragEvent): void {
        const data = JSON.parse(
            event.dataTransfer.getData('storm-diagram-node')
        );

        const model = this.state.diagramManager
            .getDiagramEngine()
            .getFactoryForNode(data.type)
            .generateModel({ initialConfig: {} });

        const point = this.state.diagramManager
            .getDiagramEngine()
            .getRelativeMousePoint(event);

        model.setPosition(point);

        model.registerListener({
            // eventDidFire: () => {
            //     this.handleUpdate(
            //         this.state.diagramManager.getActiveDiagram().serialize()
            //     );
            // },
            positionChanged: () => {
                this.handleUpdate(
                    this.state.diagramManager.getActiveDiagram().serialize()
                );
            },
            entityRemoved: () => {
                this.handleUpdate(
                    this.state.diagramManager.getActiveDiagram().serialize()
                );
            },
        });

        this.state.diagramManager.getDiagramEngine().getModel().addNode(model);
        this.forceUpdate();
    }

    onDragOver(event: React.DragEvent): void {
        event.preventDefault();
    }

    render(): ReactNode {
        return (
            <WidgetBody>
                <div
                    contentEditable={this.state.patternNameEditable}
                    suppressContentEditableWarning={true}
                    onBlur={(event) => {
                        if (this.props.onChange)
                            this.props.onChange({
                                patternName: event.target.innerText,
                            });

                        this.setState({
                            ...this.state,
                            patternNameEditable: false,
                        });
                    }}
                    onDoubleClick={() =>
                        this.setState({
                            ...this.state,
                            patternNameEditable: true,
                        })
                    }
                    className={styles.PatternNameContainer}
                >
                    {this.props.editor.patternName}
                </div>
                <WidgetContent>
                    <WidgetLayer
                        onDrop={(event) => this.onDrop(event)}
                        onDragOver={(event) => this.onDragOver(event)}
                    >
                        <CanvasBackground>
                            <CanvasWidget
                                engine={this.state.diagramManager.getDiagramEngine()}
                            />
                        </CanvasBackground>
                    </WidgetLayer>
                </WidgetContent>
            </WidgetBody>
        );
    }
}

export default EditorWidget;
