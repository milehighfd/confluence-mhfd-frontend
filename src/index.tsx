import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import {history} from "./store/configureStore";
import store from './store';
import 'antd/dist/antd.css';

import LoginView from './Components/Login/LoginView';
import NavbarView from './Components/Navbar/NavbarView';
import ResetPasswordView from './Components/ResetPassword/ResetPasswordView';
import ConfirmPasswordView from './Components/ConfirmPassword/ConfirmPasswordView';
import SidebarView from './Components/Sidebar/SidebarView';
import SignUpView from './Components/SignUp/SignUpView';
import App from './App';
import UserView from './Components/User/UserView';
import MapView from './Components/Map/MapView';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={`/login`} component={LoginView}/>
        <Route path={`/map`} component={MapView}/>
        <Route path={`/navbar`} component={NavbarView}/>
        <Route path={`/reset-password`} component={ResetPasswordView}/>
        <Route path={`/confirm-password`} component={ConfirmPasswordView}/>
        <Route path={`/sidebar`} component={SidebarView}/>
        <Route path={`/sign-up`} component={SignUpView}/>
        <Route path={`/user`} component={UserView}/>
        <Route path={`/`} component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
