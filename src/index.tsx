import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ReactGA  from 'react-ga';

import {ConnectedRouter} from 'connected-react-router';

import './index.scss';
import './Scss/button.scss';
import './Scss/scroll.scss';
import './Scss/loader.scss';
import './Scss/login.scss';
import './Scss/user.scss';
import './Scss/map.scss';
import './Scss/responsive.scss';
import './Scss/profile.scss';
import * as serviceWorker from './serviceWorker';
import {history} from "./store/configureStore";
import store from './store';
import 'antd/dist/antd.css';

import App from './AppContainer';

if (!localStorage.getItem('mfx-token')) {
  localStorage.setItem('mfx-token', 'GUEST');
}

export const initGA = () => {
  ReactGA.initialize('UA-176723071-1');
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
