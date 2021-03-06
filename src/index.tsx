import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ReactGA  from 'react-ga';

import {ConnectedRouter} from 'connected-react-router';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import {history} from "./store/configureStore";
import store from './store';
import 'antd/dist/antd.css';
import '@mdi/font/scss/materialdesignicons.scss';
import HttpsRedirect from 'react-https-redirect';


import App from './AppContainer';

if (!localStorage.getItem('mfx-token')) {
  localStorage.setItem('mfx-token', 'GUEST');
}

export const initGA = () => {
  ReactGA.initialize('UA-176723071-1');
};

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    </HttpsRedirect>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
