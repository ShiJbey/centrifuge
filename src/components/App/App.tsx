import React, { Component } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import AppNavbar from '../AppNavbar';
import styles from './App.module.scss';
import PatternEditor from '../../pages/PatternEditor';
import Help from '../../pages/Help';
import {
    CLOSE_DIR,
    DIR_CHANGE,
    OPEN_DIR,
    OPEN_PATTERN_FILE,
    SAVE_PATTERN,
} from '../../utility/electronChannels';
import ElectronAPI, {
    OpenDirectoryResponse,
    OpenFileResponse,
    SaveFileRequest,
    SaveFileResponse,
} from '../../utility/electronApi';
import { Dispatch } from 'redux';
import { DirectoryTree } from 'directory-tree';
import {
    updateDirectoryTree,
    clearDirectoryTree,
} from '../../redux/fileTreeSclice';
import {
    addEditor,
    updateEditor,
    selectEditor,
    UpdateEditorChanges,
} from '../../redux/editorSlice';
import { RootState } from '../../redux/store';
import {
    addPattern,
    clearPatterns,
    PatternInfo,
    updatePattern,
} from '../../redux/patternSlice';
import { compilePattern } from '../../PatternCompiler';
import SavedPatternData from 'src/utility/models/savedPatternData';

declare const electron: ElectronAPI;

type AppProps = PropsFromRedux;

export class App extends Component<AppProps> {
    componentDidMount() {
        this.registerElectronListeners();
    }

    componentWillUnmount() {
        this.unregisterElectronListeners();
    }

    processPatterns(directoryTree: DirectoryTree) {
        const queue: DirectoryTree[] = [];
        queue.push(directoryTree);
        while (queue.length) {
            const node = queue.shift();

            if (!node) break;

            if (node.children) {
                for (const child of node.children) {
                    queue.push(child);
                }
            } else {
                electron
                    .readDiagramFile(node.path)
                    .then((data) => {
                        this.props.updatePattern({
                            filepath: node.path,
                            pattern: compilePattern(data.diagram, data.name),
                        });
                    })
                    .catch((error) => console.error(error));
            }
        }
    }

    registerElectronListeners() {
        electron.receive(OPEN_DIR, (_, res: OpenDirectoryResponse) => {
            if (res.status === 'ok' && res.payload) {
                this.props.updateFileTree(res.payload);
                this.props.clearPatterns();
                this.processPatterns(res.payload);
            } else {
                console.error(res.payload);
            }
        });

        electron.receive(CLOSE_DIR, () => {
            this.props.clearFileTree();
        });

        electron.receive(DIR_CHANGE, async (_, change: DirectoryTree) => {
            this.props.updateFileTree(change);
            this.props.clearPatterns();
            this.processPatterns(change);
        });

        electron.receive(
            OPEN_PATTERN_FILE,
            (_, res: OpenFileResponse<SavedPatternData>) => {
                if (res.status === 'ok') {
                    if (res.payload) {
                        this.props.addEditor({
                            patternName: res.payload.data.name,
                            filepath: res.payload.path,
                            model: res.payload.data.diagram,
                        });
                        this.props.updatePattern({
                            filepath: res.payload.path,
                            pattern: compilePattern(
                                res.payload.data.diagram,
                                res.payload.data.name
                            ),
                        });
                    }
                } else {
                    console.error(res.payload);
                }
            }
        );

        electron.receive(
            SAVE_PATTERN,
            async (event: Electron.IpcRendererEvent, req: SaveFileRequest) => {
                if (!this.props.activeEditor) {
                    return;
                }

                for (const editor of this.props.editors) {
                    if (editor.id === this.props.activeEditor) {
                        let savePath = req.path ?? editor.filepath;
                        if (!savePath) {
                            const { path } = await electron.saveAs();
                            if (!path) {
                                return;
                            } else {
                                savePath = path;
                            }
                        }

                        const response: SaveFileResponse =
                            await electron.invoke(
                                SAVE_PATTERN,
                                savePath,
                                JSON.stringify({
                                    name: editor.patternName,
                                    diagram: editor.model,
                                })
                            );

                        if (response.status === 'ok') {
                            this.props.updateEditor(editor.id, {
                                ...editor,
                                dirty: false,
                                filepath: savePath,
                            });
                            this.props.selectEditor(editor.id);
                        }
                    }
                }
            }
        );
    }

    unregisterElectronListeners() {
        electron.removeAllListeners(OPEN_DIR);
        electron.removeAllListeners(CLOSE_DIR);
        electron.removeAllListeners(DIR_CHANGE);
        electron.removeAllListeners(OPEN_PATTERN_FILE);
        electron.removeAllListeners(SAVE_PATTERN);
    }

    /** Save the pattern in the given editor ID to Localfile */
    savePatternFile() {
        throw new Error('Not Implemented');
    }

    /** Open the file dialog to open a pattern file */
    openPatternFile() {
        throw new Error('Not Implemented');
    }

    /** Open the file dialog to open a workspace directory */
    openWorkspaceDirectory() {
        throw new Error('Not Implemented');
    }

    render() {
        return (
            <HashRouter>
                <div className={styles.App}>
                    <AppNavbar />
                    <div className={styles.Main}>
                        <Switch>
                            <Route
                                exact
                                path="/editor"
                                render={() => <PatternEditor />}
                            />
                            <Route exact path="/help" component={Help} />
                            <Route exact path="/">
                                <Redirect to="/editor" />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    editors: state.editors.editors,
    activeEditor: state.editors.activeEditor,
    patterns: state.patternCache.patterns,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectEditor: (id: string) => dispatch(selectEditor(id)),
    updateEditor: (id: string, changes: UpdateEditorChanges) =>
        dispatch(updateEditor({ id, changes })),
    updateFileTree: (tree: DirectoryTree) =>
        dispatch(updateDirectoryTree(tree)),
    clearFileTree: () => dispatch(clearDirectoryTree()),
    addEditor: (options: UpdateEditorChanges) => dispatch(addEditor(options)),
    addPattern: (info: PatternInfo) => dispatch(addPattern(info)),
    updatePattern: (info: PatternInfo) => dispatch(updatePattern(info)),
    clearPatterns: () => dispatch(clearPatterns()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
