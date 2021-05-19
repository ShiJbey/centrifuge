import React, { Component } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppNavbar from '../AppNavbar';
import styles from './App.module.scss';
import MetricsDashboard from '../MetricsDashboard';
import PatternEditor from '../PatternEditor';
import Help from '../Help';
import {
  CLOSE_DIR,
  DIR_CHANGE,
  OPEN_DIR,
  OPEN_PATTERN_FILE,
  OPEN_TOWN_FILE,
} from '../../utility/electronChannels';
import ElectronAPI, {
  OpenDirectoryResponse,
  OpenFileResponse,
} from '../../utility/electronApi';
import { Dispatch } from 'redux';
import { loadData, clearData } from '../../redux/database/databaseActions';
import TownToolbar from '../TownToolbar';
import { DirectoryTree } from 'directory-tree';
import {
  updateDirectoryTree,
  clearDirectoryTree,
} from '../../redux/fileTree/fileTreeActions';
import { addEditor } from '../../redux/editors/editorActions';
import { SerializedDiagram } from '../../utility/serialization';

declare const electron: ElectronAPI;

interface AppProps {
  loadTown: typeof loadData;
  clearTown: typeof clearData;
  loadPattern: typeof addEditor;
  updateFileTree: typeof updateDirectoryTree;
  clearFileTree: typeof clearDirectoryTree;
}

export class App extends Component<AppProps> {
  componentDidMount() {
    this.registerElectronListeners();
  }

  componentWillUnmount() {
    this.unregisterElectronListeners();
  }

  registerElectronListeners() {
    electron.receive(OPEN_DIR, (_, res: OpenDirectoryResponse) => {
      if (res.status === 'ok' && res.payload) {
        this.props.updateFileTree(res.payload);
      }
    });

    electron.receive(CLOSE_DIR, () => {
      this.props.clearFileTree();
    });

    electron.receive(DIR_CHANGE, (_, change: DirectoryTree) => {
      console.log(change);
      this.props.updateFileTree(change);
    });

    electron.receive(OPEN_PATTERN_FILE, (_, res: OpenFileResponse) => {
      if (res.status === 'ok') {
        this.props.loadPattern({
          title: res.payload.name,
          path: res.payload.path,
          model: res.payload.data,
        });
      }
    });

    electron.receive(OPEN_TOWN_FILE, (_, res: OpenFileResponse) => {
      console.log(res);
    });
  }

  unregisterElectronListeners() {
    electron.removeAllListeners(OPEN_DIR);
    electron.removeAllListeners(CLOSE_DIR);
    electron.removeAllListeners(DIR_CHANGE);
    electron.removeAllListeners(OPEN_PATTERN_FILE);
    electron.removeAllListeners(OPEN_TOWN_FILE);
  }

  render() {
    return (
      <HashRouter>
        <div className={styles.App}>
          <AppNavbar />
          <div className={styles.Main}>
            <div>
              <TownToolbar />
            </div>
            <Switch>
              <Route exact path="/editor" component={PatternEditor} />
              <Route exact path="/metrics" component={MetricsDashboard} />
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTown: (data: { [attr: string]: any }) => dispatch(loadData(data)),
  clearTown: () => dispatch(clearData()),
  loadPattern: (options?: {
    title?: string;
    path?: string;
    model?: SerializedDiagram;
  }) => dispatch(addEditor(options)),
  updateFileTree: (tree: DirectoryTree) => dispatch(updateDirectoryTree(tree)),
  clearFileTree: () => dispatch(clearDirectoryTree()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
