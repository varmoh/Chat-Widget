import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import './index.scss';
import { store } from './store';
// import worker from './mocks/browser';

// const prepare = async () => {
//   return worker.start({
//     serviceWorker: {
//       url: 'mockServiceWorker.js'
//     }
//   });}

// prepare().then(() => {
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('byk-va'),
);
// });
