import './App.module.scss';
import React, { useState, useEffect } from 'react';
import { Tab, Nav, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import AlertData from '../utility/alertData';
import CodeModal from './CodeModal';
import HelpModal from './HelpModal';
import EditorTabTitle from './EditorTabTitle';
import ElectronAPI from '../utility/electronApi';
import { App } from 'electron';
import {
  addEditor,
  deleteEditor,
  updateEditor,
  selectEditor,
} from '../redux/editors/editorActions';
import { RootState } from '../redux/store';
import EditorWidget from './EditorWidget';
import { processDiagram } from '../utility/datascriptCoverter';
import SideNavbar from './SideNavbar';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

declare const electron: ElectronAPI;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: hsl(0, 0%, 12.549019607843137%);
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px 1fr;
`;

export interface EditorState {
  id: string;
  active: boolean;
  title: string;
  dirty: boolean;
  model: { [key: string]: any };
  code?: string;
  filepath?: string;
}

export interface AppState {
  showCode: boolean;
  showHelp: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    showCode: false,
    showHelp: false,
  });

  const currentEditor = useSelector(
    (state: RootState) => state.editors.currentEditor
  );
  const editors = useSelector((state: RootState) => state.editors.editors);
  const dispatch = useDispatch();

  const registerElectronApi = (): void => {
    electron.receive('diagram_data', (data: any) => {
      console.log(data);
    });

    electron.receive('save_diagram', (path: string) => {
      if (currentEditor) {
        electron.send('save_diagram', path);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(editors).length === 0) {
      // If this application was started from double-clicking
      // an associated filetype then we need to load it.
      // Otherwise or on error, open a blank editor tab.
      const response: string = electron.sendSync('get_init_file');
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
    dispatch(updateEditor({
      ...editors[currentEditor],
      code: processDiagram(editors[currentEditor].model as any)[1],
    }))
    setState({
      ...state,
      showCode: true,
      showHelp: false,
    });
  };

  /** Hide the code modal */
  const hideCode = () => {
    setState({
      ...state,
      showCode: false,
      showHelp: false,
    });
  };

  const showHelp = () => {
    setState({
      ...state,
      showHelp: true,
      showCode: false,
    });
  };

  const hideHelp = () => {
    setState({
      ...state,
      showHelp: false,
      showCode: false,
    });
  };

  const setActiveTab = (id: string) => {
    dispatch(selectEditor(id));
  };

  /** Create a new tab and set it as active */
  const createNewTab = (model?: any) => {
    dispatch(addEditor('New Diagram'));
  };

  const closeTab = (id: string) => {
    dispatch(deleteEditor(id));
  };

  return (
    <AppContainer>
      <CodeModal show={state.showCode} onHide={hideCode} />

      <HelpModal show={state.showHelp} onHide={hideHelp} />

      <SideNavbar />

      {/* <Nav
        className="scroll-nav"
        activeKey={currentEditor}
        onSelect={(selectedKey: string) => setActiveTab(selectedKey)}
      >
        {Object.keys(editors).map((editorID) => {
          const editor = editors[editorID];
          return (
            <Nav.Item
              key={editor.id}
              style={{
                background: `${
                  editor.active ? '#ffffff' : 'hsl(0, 0%, 100%, 0.5)'
                }`,
                borderRadius: '6px 6px 0px 0px',
                marginLeft: '4px',
              }}
            >
              <Nav.Link eventKey={editor.id}>
                <EditorTabTitle
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
        <div className="px-1">
          <Button
            variant="outline-light"
            onClick={() => createNewTab()}
            style={{ width: '5rem' }}
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
          display: 'relative',
          height: '100%',
          width: '100%',
          background: 'hsl(0, 0%, 100%)',
        }}
      >
        <Tab.Container
          transition={false}
          id="editor-tab-container"
          activeKey={currentEditor}
        >
          <Tab.Content as="div" style={{ height: '100%', width: '100%' }}>
            {Object.keys(editors).map((editorID) => {
              const editor = editors[editorID];
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
                      // dispatch(
                      //   updateEditor({
                      //     ...editor,
                      //     model: data,
                      //     dirty: true,
                      //   })
                      // );
                    }}
                    onShowCode={() => showCode()}
                    onShowHelp={() => showHelp()}
                  />
                </Tab.Pane>
              );
            })}
            <div>
              <h1 style={{ color: 'black' }}>No Open Diagrams</h1>
            </div>
          </Tab.Content>
        </Tab.Container>
      </div> */}
    </AppContainer>
  );
};

export function renderApp(): void {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('application')
    );
}

export default App;
