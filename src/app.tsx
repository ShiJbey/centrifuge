import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';
import BodyWidget from './components/BodyWidget';

(function render() {
  ReactDOM.render(
    <BodyWidget app={new Application()} />,
    document.getElementById('application')
  );
})();
