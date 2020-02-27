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

import App from './App';
import LoginContainer from './Components/Login/LoginContainer';
import MapContainer from './Components/Map/MapContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ResetPasswordContainer from './Components/ResetPassword/ResetPasswordContainer';
import ConfirmPasswordContainer from './Components/ConfirmPassword/ConfirmPasswordContainer';
import SidebarContainer from './Components/Sidebar/SidebarContainer';
import SignUpContainer from './Components/SignUp/SignUpContainer';
import UserContainer from './Components/User/UserContainer';
import NewProjectFormContainer from './Components/NewProjectForm/NewProjectFormContainer';
import NewProjectTypesContainer from './Components/NewProjectTypes/NewProjectTypesContainer';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={`/login`} component={LoginContainer}/>
        <Route path={`/map`} component={MapContainer}/>
        <Route path={`/navbar`} component={NavbarContainer}/>
        <Route path={`/reset-password`} component={ResetPasswordContainer}/>
        <Route path={`/confirm-password`} component={ConfirmPasswordContainer}/>
        <Route path={`/sidebar`} component={SidebarContainer}/>
        <Route path={`/sign-up`} component={SignUpContainer}/>
        <Route path={`/user`} component={UserContainer}/>
        <Route path={`/new-project-form`} component={NewProjectFormContainer}/>
        <Route path={`/new-project-types`} component={NewProjectTypesContainer}/>
        <Route path={`/`} component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
