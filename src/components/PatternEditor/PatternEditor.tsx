import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectEditor,
  addEditor,
  deleteEditor,
  updateEditor,
} from '../../redux/editors/editorActions';
import { SAVE_PATTERN } from '../../utility/electronChannels';
import ElectronAPI, {
  SaveFileRequest,
  SaveFileResponse,
} from '../../utility/electronApi';
import { EditorState } from '../../redux/editors/editorReducer';
import { EditorActionTypes } from '../../redux/editors/editorTypes';
import { Nav, Tab, Button, ButtonGroup } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CodeModal from '../CodeModal/CodeModal';
import EditorTab from '../EditorTab';
import FileExplorer from '../FileExplorer';
import EditorWidget from '../EditorWidget/EditorWidget';
import styles from './PatternEditor.module.scss';
import { SerializedDiagram } from '../../utility/serialization';
import classNames from 'classnames';
import { compilePattern } from '../../utility/patternCompiler/patternCompiler';
import NodeTray from '../NodeTray';
import EditorPanel from '../EditorPanel/EditorPanel';

declare const electron: ElectronAPI;

export interface PatternEditorProps {
  editors: EditorState[];
  activeEditor: string;
  selectEditor: typeof selectEditor;
  addEditor: typeof addEditor;
  deleteEditor: typeof deleteEditor;
  updateEditor: typeof updateEditor;
}

export interface PatternEditorState {
  showCode: boolean;
}

export class PatternEditor extends Component<
  PatternEditorProps,
  PatternEditorState
> {
  constructor(props: PatternEditorProps) {
    super(props);
    this.state = {
      showCode: false,
    };
  }

  componentDidMount() {
    this.registerElectronListeners();
  }

  componentWillUnmount() {
    this.unregisterElectronListeners();
  }

  registerElectronListeners() {
    electron.receive(SAVE_PATTERN, this.handleSaveFile.bind(this));
  }

  unregisterElectronListeners() {
    electron.removeAllListeners(SAVE_PATTERN);
  }

  async handleSaveFile(event: Electron.IpcRendererEvent, req: SaveFileRequest) {
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

        const data = editor.app.getActiveDiagram().serialize();
        const response: SaveFileResponse = await electron.invoke(
          SAVE_PATTERN,
          savePath,
          JSON.stringify(data)
        );
        if (response.status === 'ok') {
          const newID = electron.createSHA1(savePath);
          this.props.updateEditor(editor.id, {
            ...editor,
            dirty: false,
            filepath: savePath,
            id: newID,
            title: electron.getFileBasename(savePath),
            code: compilePattern(data),
          });
          this.props.selectEditor(newID);
        }
      }
    }
  }

  setActiveTab(eventKey: string) {
    this.props.selectEditor(eventKey);
  }

  /** Create a new tab and set it as active */
  createNewTab() {
    this.props.addEditor();
  }

  closeTab(eventKey: string) {
    this.props.deleteEditor(eventKey);
  }

  showCode() {
    this.setState({ ...this.state, showCode: true });
  }

  queryDb() {
    const [activeEditor] = this.props.editors.filter(editor => editor.id === this.props.activeEditor);
    console.log(compilePattern(activeEditor.app.getActiveDiagram().serialize()));
  }

  render() {
    return (
      <>
        <CodeModal
          show={this.state.showCode}
          onHide={() => {
            this.setState({ ...this.state, showCode: false });
          }}
        />

        <div className={styles.Container}>
          <EditorPanel>
            <FileExplorer />
          </EditorPanel>


          <div className={styles.PatternEditorContainer}>

            <div className={styles.Toolbar}>
              <div className={styles.ButtonToolbar}>
                <Button
                  variant="light"
                  onClick={() => this.createNewTab()}
                  className={classNames('mx-1')}
                >
                  <span>
                    {'New '}
                    <FaPlus />
                  </span>
                </Button>
                <Button variant="light" className={classNames('mx-1')} onClick={() => this.queryDb()}>
                  Search
                </Button>
                <Button
                  variant="light"
                  className={classNames('mx-1')}
                  onClick={this.showCode.bind(this)}
                >
                  ShowCode
                </Button>
              </div>
              <Nav
                as="div"
                style={{ flexWrap: 'nowrap' }}
                className={classNames(styles.EditorTabNav)}
                activeKey={this.props.activeEditor}
                defaultActiveKey={this.props.activeEditor}
                onSelect={(tabID) => this.setActiveTab(tabID)}
              >
                {this.props.editors.map((editor) => {
                  return (
                    <Nav.Item
                      key={editor.id}
                      as="div"
                      className={classNames(styles.EditorTab, {
                        [styles.ActiveTab]: editor.active,
                      })}
                    >
                      <Nav.Link eventKey={editor.id}>
                        <EditorTab
                          isDirty={editor.dirty}
                          title={editor.title}
                          onClose={(event) => {
                            event.stopPropagation();
                            this.closeTab(editor.id);
                          }}
                        />
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </div>

            <div className={styles.PatternEditor}>
              <EditorPanel>
                <Tab.Container
                  transition={false}
                  activeKey={this.props.activeEditor}
                >
                  <Tab.Content
                    as="div"
                    style={{ height: '100%', width: '100%' }}
                  >
                    {this.props.editors.map((editor) => {
                      return (
                        <Tab.Pane
                          as="div"
                          style={{ height: '100%', width: '100%' }}
                          key={editor.id}
                          eventKey={editor.id}
                        >
                          <EditorWidget
                            editor={editor}
                            onUpdate={(data: any) => {
                              this.props.updateEditor(editor.id, {
                                ...editor,
                                model: data,
                                dirty: true,
                              });
                            }}
                          />
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Tab.Container>
              </EditorPanel>

              <EditorPanel>
                <NodeTray />
              </EditorPanel>
            </div>

            <EditorPanel>
            <div className={styles.PanelTitle}>
                  Results
                  <hr></hr>
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
                  (x) => (
                    <div key={x}>Result #{x}</div>
                  )
                )}
            </EditorPanel>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  editors: state.editor.editors,
  activeEditor: state.editor.activeEditor,
});

const mapDispatchToProps = (dispatch: Dispatch<EditorActionTypes>) => ({
  selectEditor: (id: string) => dispatch(selectEditor(id)),
  addEditor: (options?: {
    title?: string;
    path?: string;
    model?: SerializedDiagram;
  }) => dispatch(addEditor(options)),
  deleteEditor: (id: string) => dispatch(deleteEditor(id)),
  updateEditor: (id: string, newState?: EditorState) =>
    dispatch(updateEditor(id, newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
