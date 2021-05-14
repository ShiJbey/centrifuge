import React, { Component } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import AppNavbar from '../AppNavbar';
import styles from './App.module.scss';
import MetricsDashboard from '../MetricsDashboard';
import PatternEditor from '../PatternEditor';
import Help from '../Help';
import { OPEN_DIR, OPEN_PATTERN_FILE, OPEN_TOWN_FILE } from '../../utility/electronChannels';
import ElectronAPI, { OpenDirectoryResponse, OpenFileResponse } from '../../utility/electronApi';
import { DatabaseAction } from '../../redux/database/databaseTypes';
import { Dispatch } from 'redux';
import { loadData, clearData } from '../../redux/database/databaseActions';
import TownToolbar from '../TownToolbar';

declare const electron: ElectronAPI;

interface AppProps {
  loadTown: typeof loadData;
  clearTown: typeof clearData;
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
      console.log(res);
    });

    electron.receive(OPEN_PATTERN_FILE, (_, res: OpenFileResponse) => {
      console.log(res);
    });

    electron.receive(OPEN_TOWN_FILE, (_, res: OpenFileResponse) => {
      console.log(res);
    });
  }

  unregisterElectronListeners() {
    electron.removeAllListeners(OPEN_DIR);
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

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<DatabaseAction>) => ({
  loadTown: (data: { [attr: string]: any }) => dispatch(loadData(data)),
  clearTown: () => dispatch(clearData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
