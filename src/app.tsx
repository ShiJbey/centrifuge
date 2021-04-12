import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';
import BodyWidget from './components/BodyWidget';

(function render() {
  const app = new Application();
  ReactDOM.render(<BodyWidget app={app} />, document.getElementById('application'));
})();
