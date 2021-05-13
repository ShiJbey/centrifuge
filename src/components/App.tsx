import React, { Component } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import SideNavbar from './SideNavbar';
import styles from './App.module.scss';
import MetricsDashboard from './MetricsDashboard';
import PatternEditor from './PatternEditor';
import Help from './Help';
import { Navbar, Button } from 'react-bootstrap';
import { OPEN_SIM_FILE } from '../utility/electronChannels';
import ElectronAPI from '../utility/electronApi';
import { DatabaseAction } from '../redux/database/databaseTypes';
import { Dispatch } from 'redux';
import { loadData, clearData } from '../redux/database/databaseActions';

declare const electron: ElectronAPI;

interface AppProps {
  loadTown: typeof loadData;
  clearTown: typeof clearData;
}

export class App extends Component<AppProps> {
  async openSimFile() {
    try {
      const res = await electron.openFile(OPEN_SIM_FILE);
      if (res.status === 'ok') {
        const sim = JSON.parse(res.payload);
        console.log(sim);
        this.props.loadTown(sim);
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.registerElectronListeners();
  }

  componentWillUnmount() {
    this.unregisterElectronListeners();
  }

  registerElectronListeners() {
    console.log('Registering electron handlers');
    // electron.receive(OPEN_SIM_FILE, this.handleSaveFile.bind(this));

    // electron.receive(OPEN_DIAGRAM_FILE, (event: Electron.IpcRendererEvent, data: any) => {
    //   console.log(data);
    // });

    // electron.receive(OPEN_FILE_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });

    // electron.receive(SAVE_DIAGRAM_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });

    // electron.receive(OPEN_DIR_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });
  }

  unregisterElectronListeners() {
    console.log('De-Registering electron handlers');
    electron.removeAllListeners(OPEN_SIM_FILE);
  }

  render() {
    return (
      <HashRouter>
        <div className={styles.App}>
          <SideNavbar />
          <div className={styles.Main}>
            <div>
              <Navbar
                bg="dark"
                variant="dark"
                className="justify-content-between"
              >
                <Navbar.Brand>No town loaded</Navbar.Brand>
                <Button onClick={() => this.openSimFile.bind(this)()}>
                  Load Town
                </Button>
              </Navbar>
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
