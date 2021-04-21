import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Tab, Nav, Col, Row, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import ToastData from './toast-data';
import CodeModal from './components/CodeModal';
import EditorTab, { EditorTabProps } from './components/EditorTab';
import EditorTabTitle from './components/EditorTabTitle';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: hsl(0, 0%, 12.549019607843137%);
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px 1fr;
`;

interface EditorTabData {
  title: string;
  filepath?: string;
  active: boolean;
  dirty: boolean;
  elem: JSX.Element;
}

interface AppState {
  alerts: ToastData[];
  showCode: boolean;
  diagramCode: string;
  currentTab: number;
  tabs: EditorTabData[];
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    alerts: [],
    showCode: false,
    diagramCode: '',
    currentTab: -1,
    tabs: [],
  });

  useEffect(() => {
    console.log(state);
  });

  /** Add an alert to the stack */
  const addAlert = (data: ToastData) => {
    const modifiedAlerts = state.alerts;
    modifiedAlerts.push(data);
    setState({
      ...state,
      alerts: modifiedAlerts,
    });
  };

  /** Show the given code in the code modal */
  const showCode = (code: string) => {
    setState({
      ...state,
      showCode: true,
      diagramCode: code,
    });
  };

  /** Hide the code modal */
  const hideCode = () => {
    setState({
      ...state,
      showCode: false,
    });
  };

  const setActiveTab = (index: number) => {
    const modifiedTabs = [...state.tabs];

    if (state.currentTab >= 0 && state.currentTab < state.tabs.length) {
      modifiedTabs[state.currentTab].active = false;
    }

    modifiedTabs[index].active = true;

    setState({
      ...state,
      tabs: modifiedTabs,
      currentTab: index,
    });
  };

  /** Create a new tab and set it as active */
  const createNewTab = () => {
    const modifiedTabs = [...state.tabs];

    for (const tab of modifiedTabs) {
      tab.active = false;
    }

    modifiedTabs.push({
      title: 'New Diagram',
      dirty: false,
      active: true,
      elem: <EditorTab />,
    });

    setState({
      ...state,
      tabs: modifiedTabs,
      currentTab: modifiedTabs.length - 1,
    });
  };

  const closeTab = (index: number) => {
    const modifiedTabs = [...state.tabs].filter(
      (tab, tabIndex) => tabIndex !== index
    );

    if (state.currentTab === index && modifiedTabs.length > 0) {
      modifiedTabs[0].active = true;
      setState({
        ...state,
        tabs: modifiedTabs,
        currentTab: 0,
      });
    } else {
      setState({
        ...state,
        tabs: modifiedTabs,
        currentTab:
          state.currentTab >= index ? state.currentTab - 1 : state.currentTab,
      });
    }
  };

  return (
    <AppContainer>
      <CodeModal
        code={state.diagramCode}
        show={state.showCode}
        onHide={hideCode}
      />
      <Nav
        className="scroll-nav"
        activeKey={state.currentTab}
        onSelect={(selectedKey: string) => setActiveTab(parseInt(selectedKey))}
      >
        {state.tabs.map((tab, index) => {
          return (
            <Nav.Item
              key={`NavItem${index}`}
              style={{
                background: `${tab.active ? '#ffffff' : 'hsl(0, 0%, 100%, 0.5)'}`,
                borderRadius: '6px 6px 0px 0px',
                marginLeft: '4px',
              }}
            >
              <Nav.Link eventKey={index.toString()}>
                <EditorTabTitle
                  title={tab.title}
                  onClose={(event) => {
                    event.stopPropagation();
                    closeTab(index);
                  }}
                />
              </Nav.Link>
            </Nav.Item>
          );
        })}
        <div className="px-1">
          <Button
            variant="outline-light"
            onClick={createNewTab}
            style={{ width: '5rem' }}
          >
            <span>
              {'New '}
              <FaPlus />
            </span>
          </Button>
        </div>
      </Nav>
      <div style={{ display: 'relative', height: '100%', width: '100%', background: 'hsl(0, 0%, 100%)' }}>
        <Tab.Container
          transition={false}
          id="editor-tab-container"
          defaultActiveKey="-1"
          activeKey={state.currentTab}
        >
          <Tab.Content as='div' style={{height: '100%', width: '100%'}} >
            {state.tabs.map((tab, index) => {
              return (
                <Tab.Pane
                  as='div'
                  style={{height: '100%', width: '100%'}}
                  key={`TabItem${index}`}
                  eventKey={index.toString()}
                >
                  {tab.elem}
                </Tab.Pane>
              );
            })}
            <Tab.Pane as='div' eventKey="-1">
              <div>
                <h1 style={{ color: 'black' }}>No Open Diagrams</h1>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </AppContainer>
  );
};

(() => {
  ReactDOM.render(<App />, document.getElementById('application'));
})();
