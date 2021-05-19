import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  selectEditor,
  addEditor,
  deleteEditor,
  updateEditor,
} from '../../redux/editors/editorActions';
import {
  SAVE_PATTERN,
} from '../../utility/electronChannels';
import ElectronAPI, { SaveFileRequest, SaveFileResponse } from '../../utility/electronApi';
import { EditorState } from '../../redux/editors/editorReducer';
import { EditorActionTypes } from '../../redux/editors/editorTypes';
import { Nav, Tab, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CodeModal from '../CodeModal/CodeModal';
import EditorTab from '../EditorTab';
import FileExplorer from '../FileExplorer';
import EditorWidget from '../EditorWidget/EditorWidget';
import styles from './PatternEditor.module.scss';
import { SerializedDiagram } from '../../utility/serialization';
import classNames from 'classnames';

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
          const {path} = await electron.saveAs();
          if (!path) {
            return;
          } else {
            savePath = path;
          }
        }

        const data = editor.app.getActiveDiagram().serialize();
        const response: SaveFileResponse = await electron.invoke(SAVE_PATTERN, savePath, JSON.stringify(data));
        if (response.status === 'ok') {
          const newID = electron.createSHA1(savePath);
          this.props.updateEditor(editor.id, {
            ...editor,
            dirty: false,
            filepath: savePath,
            id: newID,
            title: electron.getFileBasename(savePath),
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

  render() {
    return (
      <>
        <CodeModal
          show={this.state.showCode}
          onHide={() => {
            this.state = { ...this.state, showCode: false };
          }}
        />

        <div className={styles.Container}>
          <div>
            <FileExplorer />
          </div>
          <div className={styles.PatternEditor}>
            <Nav
              as="div"
              style={{flexWrap: 'nowrap'}}
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
              <div>
                <Button
                  variant="outline-light"
                  onClick={() => this.createNewTab()}
                  style={{ width: '5rem', margin: '0 6px' }}
                >
                  <span>
                    {'New '}
                    <FaPlus />
                  </span>
                </Button>
              </div>
            </Nav>

            <div
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <Tab.Container
                transition={false}
                id="editor-tab-container"
                activeKey={this.props.activeEditor}
              >
                <Tab.Content as="div" style={{ height: '100%', width: '100%' }}>
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
                            console.log('Updating editor:', editor.title);
                            this.props.updateEditor(
                              editor.id,
                              {
                                ...editor,
                                model: data,
                                dirty: true,
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
  addEditor: (options?: {title?: string, path?: string, model?: SerializedDiagram}) =>
    dispatch(addEditor(options)),
  deleteEditor: (id: string) => dispatch(deleteEditor(id)),
  updateEditor: (id: string, newState?: EditorState) => dispatch(updateEditor(id, newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
