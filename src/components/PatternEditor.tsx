import React, { useState, useEffect } from "react";
import { Nav, Tab, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import classnames from "classnames";
import { RootState } from "../redux/store";
import ElectronAPI from "../utility/electronApi";
import {
  selectEditor,
  addEditor,
  deleteEditor,
  updateEditor,
} from "../redux/editors/editorActions";
import CodeModal from "./CodeModal";
import EditorTab from "./EditorTab";
import EditorWidget from "./EditorWidget";
import { processDiagram } from "../utility/datascriptCoverter";

import styles from "./PatternEditor.module.scss";

declare const electron: ElectronAPI;

export interface EditorState {
  /** Unique ID for this editor instance */
  id: string;
  /** Is this editor currently active in the GUI */
  active: boolean;
  /** Title displayed in the editor's tab */
  title: string;
  /** Has this diagram been edited since its last save */
  dirty: boolean;
  /** Serialized react-diagram model */
  model?: { [key: string]: any };
  /** Datascript query representation of the current model */
  code?: string;
  /** The path that this diagram is saved at (undefined if not saved) */
  filepath?: string;
}

export interface PatternEditorState {
  /** ID of the currently active editor */
  currentEditor?: string;
  /** Open the modal showing the code version of the current diagram */
  showCode: boolean;
  /** Open editor tabs */
  editors: any[];
}

const PatternEditor: React.FC = () => {
  const editors = useSelector((state: RootState) => state.editors.editors);
  const dispatch = useDispatch();

  const [state, setState] = useState<PatternEditorState>({
    showCode: false,
    editors: [],
  });

  const currentEditor = useSelector(
    (state: RootState) => state.editors.currentEditor
  );

  const registerElectronApi = () => {
    electron.receive("diagram_data", (data: any) => {
      console.log(data);
    });

    electron.receive("save_diagram", (path: string) => {
      if (currentEditor) {
        electron.send("save_diagram", path);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(editors).length === 0) {
      // If this application was started from double-clicking
      // an associated filetype then we need to load it.
      // Otherwise or on error, open a blank editor tab.
      const response: string = electron.sendSync("get_init_file");
      try {
        if (response) {
          createNewTab(JSON.parse(response));
        } else {
          createNewTab();
        }
      } catch (error) {
        console.error(error);
        createNewTab();
      }
    }

    registerElectronApi();
  }, []);

  /** Show the given code in the code modal */
  const showCode = () => {
    console.log(editors[currentEditor]);
    dispatch(
      updateEditor({
        ...editors[currentEditor],
        code: processDiagram(editors[currentEditor].model as any)[1],
      })
    );
    setState({
      ...state,
      showCode: true,
    });
  };

  /** Hide the code modal */
  const hideCode = () => {
    setState({
      ...state,
      showCode: false,
    });
  };

  const setActiveTab = (id: string) => {
    dispatch(selectEditor(id));
  };

  /** Create a new tab and set it as active */
  const createNewTab = (model?: any) => {
    dispatch(addEditor("New Diagram"));
  };

  const closeTab = (id: string) => {
    dispatch(deleteEditor(id));
  };

  return (
    <>
    <CodeModal show={state.showCode} onHide={hideCode} />
    <div className={styles.Container}>
      
      <div className={styles.FileExplorer}>
        <div className={styles.DirectoryName}>
          Directory
        </div>
        <div className={styles.FileListContainer}>
          <ul>
            <li>
              diagram_1.ctr
            </li>
            <li>
              diagram_2.ctr
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.PatternEditor}>
        <Nav
          className={styles.EditorTabNav}
          activeKey={state.currentEditor}
          onSelect={(tabID: string) => setActiveTab(tabID)}
        >
          {Object.keys(editors).map((editorID) => {
            const editor = editors[editorID];
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
                      closeTab(editor.id);
                    }}
                  />
                </Nav.Link>
              </Nav.Item>
            );
          })}
          <div>
            <Button
              variant="outline-light"
              onClick={() => createNewTab()}
              style={{ width: "5rem", margin: "0 6px" }}
            >
              <span>
                {"New "}
                <FaPlus />
              </span>
            </Button>
          </div>
        </Nav>
        
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Tab.Container
            transition={false}
            id="editor-tab-container"
            activeKey={currentEditor}
          >
            <Tab.Content as="div" style={{ height: "100%", width: "100%" }}>
              {Object.keys(editors).map((editorID) => {
                const editor = editors[editorID];
                return (
                  <Tab.Pane
                    as="div"
                    style={{ height: "100%", width: "100%" }}
                    key={editorID}
                    eventKey={editorID}
                  >
                    <EditorWidget
                      onUpdate={(data: any) => {
                        console.log("Editor updated");
                        // dispatch(
                        //   updateEditor({
                        //     ...editor,
                        //     model: data,
                        //     dirty: true,
                        //   })
                        // );
                      }}
                      onShowCode={() => showCode()}
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
};

export default PatternEditor;
