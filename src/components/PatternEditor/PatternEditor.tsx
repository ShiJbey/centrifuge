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
import FileExplorer from '../FileExplorer';
import EditorWidget from '../EditorWidget/EditorWidget';
import styles from './PatternEditor.module.scss';
import { SerializedDiagram } from '../../utility/serialization';

declare const electron: ElectronAPI;

export interface PatternEditorProps {
  editors: EditorState[];
  activeEditor: number;
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

    let savePath = req.path ?? this.props.editors[this.props.activeEditor].filepath;
    if (!savePath) {
      const {path} = await electron.saveAs();
      if (!path) {
        return;
      } else {
        savePath = path;
      }
    }

    const data = this.props.editors[this.props.activeEditor].app.getActiveDiagram().serialize();
    if (data) {
      const response = electron.invoke(SAVE_PATTERN, savePath, data);
    }
  }

  setActiveTab(eventKey: number) {
    this.props.selectEditor(eventKey);
  }

  /** Create a new tab and set it as active */
  createNewTab(model?: any) {
    this.props.addEditor('New Pattern', null, model);
  }

  closeTab(eventKey: number) {
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
              className={styles.EditorTabNav}
              activeKey={this.props.activeEditor}
              onSelect={(tabID) => this.setActiveTab(parseInt(tabID))}
            >
              {this.props.editors.map((editor, index) => {
                return (
                  <Nav.Item
                    key={index}
                    className={classnames(styles.EditorTab, {
                      [styles.ActiveTab]: editor.active,
                    })}
                  >
                    <Nav.Link eventKey={index}>
                      <EditorTab
                        isDirty={editor.dirty}
                        title={editor.title}
                        onClose={(event) => {
                          event.stopPropagation();
                          this.closeTab(index);
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
                  {this.props.editors.map((editor, index) => {
                    return (
                      <Tab.Pane
                        as="div"
                        style={{ height: '100%', width: '100%' }}
                        key={index}
                        eventKey={index}
                      >
                        <EditorWidget
                          editor={editor}
                          onUpdate={(data: any) => {
                            this.props.updateEditor({
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
  selectEditor: (index: number) => dispatch(selectEditor(index)),
  addEditor: (title: string, path?: string, model?: SerializedDiagram) =>
    dispatch(addEditor(title, path, model)),
  deleteEditor: (index: number) => dispatch(deleteEditor(index)),
  updateEditor: (newState?: EditorState) => dispatch(updateEditor(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatternEditor);
