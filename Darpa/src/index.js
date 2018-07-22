import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/base';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Root />
  , document.getElementById('root')
);
registerServiceWorker();
