import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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
import ElectronAPI, { SaveFileRequest } from '../../utility/electronApi';
import { EditorState } from '../../redux/editors/editorReducer';
import { EditorActionTypes } from '../../redux/editors/editorTypes';
import { Nav, Tab, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import classnames from 'classnames';
import CodeModal from '../CodeModal/CodeModal';
import EditorTab from '../EditorTab';
import EditorWidget from '../EditorWidget/EditorWidget';
import styles from './PatternEditor.module.scss';

declare const electron: ElectronAPI;

export interface PatternEditorProps {
  editors: { [key: string]: EditorState };
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
    // if (Object.keys(this.props.editors).length === 0) {
    //   // If this application was started from double-clicking
    //   // an associated filetype then we need to load it.
    //   // Otherwise or on error, open a blank editor tab.
    //   const response = electron.sendSync(GET_INIT_DATA);
    //   if (!response) {
    //     this.createNewTab();
    //   }
    // }
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
      console.log('No active editors');
      return;
    }

    let savePath = req.path ?? this.props.editors[this.props.activeEditor].filepath;
    if (!savePath) {
      const {path} = await electron.saveAs();
      if (!path) {
        console.log("Save canceled");
        return;
      } else {
        savePath = path;
      }
    }

    const data = this.props.editors[this.props.activeEditor].model;
    if (data) {
      electron.writeFile(savePath, JSON.stringify(data));
    } else {
      console.error('No model to save');
    }
  }

  setActiveTab(id: string) {
    this.props.selectEditor(id);
  }

  /** Create a new tab and set it as active */
  createNewTab(model?: any) {
    let id = uuidv4();

    while (Object.keys(this.props.editors).includes(id)) {
      console.warn('Conflicting UUIDs');
      id = uuidv4();
    }

    this.props.addEditor(id, 'New Pattern', null, model);
  }

  closeTab(id: string) {
    this.props.deleteEditor(id);
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
            {/* <FileExplorer /> */}
          </div>
          <div className={styles.PatternEditor}>
            <Nav
              className={styles.EditorTabNav}
              activeKey={this.props.activeEditor}
              onSelect={(tabID: string) => this.setActiveTab(tabID)}
            >
              {Object.keys(this.props.editors).map((editorID) => {
                const editor = this.props.editors[editorID];
                return (
                  <Nav.Item
                    key={editor.id}
                    className={classnames(styles.EditorTab, {
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
                  {Object.keys(this.props.editors).map((editorID) => {
                    const editor = this.props.editors[editorID];
                    return (
                      <Tab.Pane
                        as="div"
                        style={{ height: '100%', width: '100%' }}
                        key={editorID}
                        eventKey={editorID}
                      >
                        <EditorWidget
                          onUpdate={(data: any) => {
                            console.log('Editor updated');
                            this.props.updateEditor({
                              ...editor,
                              model: data,
                              dirty: true,
                            });
                          }}
                          onShowCode={() => {
                            this.state = { ...this.state, showCode: true };
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
  addEditor: (id: string, title: string, path?: string, model?: any) =>
    dispatch(addEditor(id, title, path, model)),
  deleteEditor: (id: string) => dispatch(deleteEditor(id)),
  updateEditor: (newState?: EditorState) => dispatch(updateEditor(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
