import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
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
            .getLinks()
            .map((link) => {
                link.registerListener({
                    sourcePortChanged: () => {
                        this.handleUpdate(
                            this.state.diagramManager
                                .getActiveDiagram()
                                .serialize()
                        );
                    },
                    targetPortChanged: () => {
                        this.handleUpdate(
                            this.state.diagramManager
                                .getActiveDiagram()
                                .serialize()
                        );
                    },
                });
            });

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
            .generateModel({ initialConfig: data.config });

        const point = this.state.diagramManager
            .getDiagramEngine()
            .getRelativeMousePoint(event);

        model.setPosition(point);

        model.registerListener({
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

    clearSelection() {
        this.state.diagramManager
            .getActiveDiagram()
            .getSelectedEntities()
            .map((model) => model.setSelected(false));
    }

    onDragOver(event: React.DragEvent): void {
        event.preventDefault();
    }

    render(): ReactNode {
        return (
            <WidgetBody>
                <input
                    type="text"
                    readOnly={!this.state.patternNameEditable}
                    defaultValue={this.props.editor.patternName}
                    onChange={(event) => {
                        if (this.props.onChange) {
                            this.props.onChange({
                                patternName: event.target.value,
                            });
                        }
                    }}
                    onBlur={() => {
                        this.setState({
                            ...this.state,
                            patternNameEditable: false,
                        });
                    }}
                    onDoubleClick={() => {
                        this.clearSelection();
                        this.setState({
                            ...this.state,
                            patternNameEditable: true,
                        });
                    }}
                    className={styles.PatternNameContainer}
                />

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
