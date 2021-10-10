import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import {
    selectEditor,
    addEditor,
    removeEditor,
    updateEditor,
    UpdateEditorChanges,
} from '../../redux/editorSlice';
import { Button, Tab, Tabs } from 'react-bootstrap';
import EditorWidget from '../../components/EditorWidget/EditorWidget';
import styles from './PatternEditor.module.scss';
import EditorTabBar from './components/EditorTabBar';
import Toolbar from './components/Toolbar';
import EditorPanel from '../../components/EditorPanel';
import NodeTray from '../../components/NodeTray';
import QueryOutput from './components/QueryOutput';
import Notifications from '../../components/Notifications/Notifications';
import { Dispatch } from '@reduxjs/toolkit';
import FileExplorer from '../../components/FileExplorer';

type PatternEditorProps = PropsFromRedux;

interface PatternEditorState {
    showNodeTray: boolean;
}

export class PatternEditor extends Component<
    PatternEditorProps,
    PatternEditorState
> {
    constructor(props: PatternEditorProps) {
        super(props);
        this.state = {
            showNodeTray: false,
        };
    }

    setActiveTab(eventKey: string) {
        this.props.selectEditor(eventKey);
    }

    createNewTab() {
        this.props.addEditor({
            patternName: 'New Pattern',
        });
    }

    closeTab(eventKey: string) {
        this.props.deleteEditor(eventKey);
    }

    saveActivePattern() {
        throw new Error('Not Implemented');
    }

    componentDidMount() {
        if (this.props.editors.length == 0) {
            this.props.addEditor({
                patternName: 'New Pattern',
            });
        }
    }

    render() {
        return (
            <>
                <div className={styles.Container}>
                    <Toolbar
                        saveBtnActive={true}
                        onNewBtnClick={() => this.createNewTab()}
                        onSaveBtnClick={() => this.saveActivePattern()}
                    />
                    <EditorTabBar
                        tabs={this.props.editors.map((editor) => {
                            return {
                                editorId: editor.id,
                                title: editor.patternName,
                                isActive: editor.id === this.props.activeEditor,
                                isDirty: editor.dirty,
                            };
                        })}
                        onTabClose={(editorID) => this.closeTab(editorID)}
                        onTabSelect={(editorID) => this.setActiveTab(editorID)}
                    />

                    <div className={styles.PatternEditorContainer}>
                        <div className={styles.PatternEditor}>
                            <Tab.Container
                                transition={false}
                                activeKey={this.props.activeEditor}
                            >
                                <Tab.Content
                                    as="div"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    {this.props.editors.map((editor) => {
                                        return (
                                            <Tab.Pane
                                                as="div"
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                key={editor.id}
                                                eventKey={editor.id}
                                            >
                                                <EditorWidget
                                                    editor={editor}
                                                    onChange={(changes) => {
                                                        this.props.updateEditor(
                                                            editor.id,
                                                            {
                                                                ...editor,
                                                                dirty: true,
                                                                model: changes.model,
                                                                patternName:
                                                                    changes.patternName,
                                                            }
                                                        );
                                                    }}
                                                />
                                            </Tab.Pane>
                                        );
                                    })}
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                        <div className={styles.OutputAndWorkspacePanel}>
                            <EditorPanel>
                                <Tabs
                                    defaultActiveKey="home"
                                    transition={false}
                                >
                                    <Tab
                                        eventKey="home"
                                        title="Workspace"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <FileExplorer />
                                    </Tab>
                                    <Tab
                                        eventKey="profile"
                                        title="Output"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <QueryOutput />
                                    </Tab>
                                </Tabs>
                            </EditorPanel>
                        </div>

                        {this.props.activeEditor && (
                            <Button
                                className={styles.AddNodeBtn}
                                onClick={() => {
                                    this.setState({
                                        ...this.state,
                                        showNodeTray: true,
                                    });
                                }}
                            >
                                Add Node
                            </Button>
                        )}

                        {this.state.showNodeTray && (
                            <div
                                className={styles.NodeTray}
                                onMouseLeave={() =>
                                    this.setState({
                                        ...this.state,
                                        showNodeTray: false,
                                    })
                                }
                            >
                                <EditorPanel>
                                    <NodeTray></NodeTray>
                                </EditorPanel>
                            </div>
                        )}
                    </div>
                </div>
                <Notifications />
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    editors: state.editors.editors,
    activeEditor: state.editors.activeEditor,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectEditor: (id: string) => dispatch(selectEditor(id)),
    addEditor: (options: { patternName: string; filepath?: string }) =>
        dispatch(addEditor(options)),
    deleteEditor: (id: string) => dispatch(removeEditor(id)),
    updateEditor: (id: string, changes: UpdateEditorChanges) =>
        dispatch(updateEditor({ id, changes })),
});

const connector = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PatternEditor);
