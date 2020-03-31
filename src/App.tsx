import * as React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginContainer from './Components/Login/LoginContainer';
import NavbarContainer from './Components/Shared/Navbar/NavbarContainer';
import ResetPasswordContainer from './Components/ResetPassword/ResetPasswordContainer';
import ConfirmPasswordContainer from './Components/ConfirmPassword/ConfirmPasswordContainer';
import SidebarContainer from './Components/Shared/Sidebar/SidebarContainer';
import SignUpContainer from './Components/SignUp/SignUpContainer';
import UserContainer from './Components/User/UserContainer';
import NewProjectTypesContainer from './Components/NewProjectTypes/NewProjectTypesContainer';
import WorkPlanContainer from './Components/WorkPlan/WorkPlanContainer';
import WorkRequestContainer from './Components/WorkRequest/WorkRequestContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import DetailedContainer from './Components/DetailedProblem/DetailedContainer';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AlertContainer from './Components/Alerts/AlertContainer';

/* In use of Map/Form HOC */
import ProjectCapitalForm from './Components/ProjectForms/ProjectCapitalForm';
import ProjectSpecialForm from './Components/ProjectForms/ProjectSpecialForm';
import ProjectAcquisitionForm from './Components/ProjectForms/ProjectAcquisitionForm';
import MapView from './Components/Map/MapView';
import ProjectMaintenanceForm from './Components/ProjectForms/ProjectMaintenanceForm';
import ProjectStudyForm from './Components/ProjectForms/ProjectStudyForm';
import * as datasets from "./Config/datasets"
import { SERVER } from "./Config/Server.config";
import { User } from './Classes/User';
import store from './store';
function App({ replaceAppUser }: any) {
  const appUser = store.getState().appUser;
  if(datasets.getToken() && appUser.email === '') {
    const result = datasets.getData(SERVER.ME, datasets.getToken()).then(res => {
      if (res?._id) {
        replaceAppUser(res);
      }
    });
  }
  return <Switch>
      <Route path={`/login`} component={LoginContainer} />
      <Route path={`/sign-up`} component={SignUpContainer} />
      <Route path={'/404'} component={Unauthorized} />
      <Route path={`/reset-password`} component={ResetPasswordContainer} />
      <Route path={`/confirm-password`} component={ConfirmPasswordContainer} />
      <Route path={`/alert-view`} component={AlertContainer} />
      <Route exact path="/" render={() => (
          <Redirect to="/login"/>
      )}/>
      {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileContainer} />}
      {appUser.activated && <Route path={`/map`} component={MapView} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff') && appUser.activated && <Route path={`/user`} component={UserContainer} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/project-capital`} component={ProjectCapitalForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/project-acquisition`} component={ProjectAcquisitionForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/project-special`} component={ProjectSpecialForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/project-maintenance`} component={ProjectMaintenanceForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/project-study`} component={ProjectStudyForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') 
        && appUser.activated && <Route path={`/new-project-types`} component={NewProjectTypesContainer} />}
      {(appUser.designation === 'admin' ||
        appUser.designation === 'staff') && appUser.activated && <Route path={`/work-plan`} component={WorkPlanContainer} />}
      {(appUser.designation === 'government_admin' ||
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/work-request`} component={WorkRequestContainer} />}
      {(appUser.designation === 'admin') && appUser.activated && <Route path={`/detailed-view`} component={DetailedContainer} />}
      <Route path={`/`} component={Unauthorized} />
  </Switch>

}



export default App;
