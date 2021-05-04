import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { App } from "electron";
import store from "../redux/store";
import SideNavbar from "./SideNavbar";
import styles from "./App.module.scss";
import MetricsDashboard from "./MetricsDashboard";
import PatternEditor from "./PatternEditor";
import Help from "./Help";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className={styles.App}>
          <SideNavbar />
          <div className={styles.Main}>
            <Switch>
              <Route exact path="/" component={MetricsDashboard} />
              <Route exact path="/editor" component={PatternEditor} />
              <Route exact path="/help" component={Help} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
};

export function renderApp(): void {
  ReactDOM.render(<App />, document.getElementById("app"));
}

export default App;
