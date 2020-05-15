import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as datasets from "./Config/datasets"
import { SERVER } from "./Config/Server.config";
import store from './store';

import LoginContainer from './Components/Login/LoginContainer';
import ResetPasswordContainer from './Components/ResetPassword/ResetPasswordContainer';
import ConfirmPasswordContainer from './Components/ConfirmPassword/ConfirmPasswordContainer';
import SignUpContainer from './Components/SignUp/SignUpContainer';
import UserContainer from './Components/User/UserContainer';
import NewProjectTypesContainer from './Components/NewProjectTypes/NewProjectTypesContainer';
import WorkPlanContainer from './Components/WorkPlan/WorkPlanContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import DetailedContainer from './Components/DetailedProblem/DetailedContainer';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import AlertContainer from './Components/Alerts/AlertContainer';
import LoadingView from './Components/Loading/LoadingView';

/* In use of Map/Form HOC */
import ProjectCapitalForm from './Components/ProjectForms/ProjectCapitalForm';
import ProjectSpecialForm from './Components/ProjectForms/ProjectSpecialForm';
import ProjectAcquisitionForm from './Components/ProjectForms/ProjectAcquisitionForm';
import MapView from './Components/Map/MapView';
import ProjectMaintenanceForm from './Components/ProjectForms/ProjectMaintenanceForm';
import ProjectStudyForm from './Components/ProjectForms/ProjectStudyForm';
import WorkRequestView from './Components/WorkRequest/WorkRequestView';

function App({ replaceAppUser } : { replaceAppUser : Function }) {
  const [ loading, setLoading ] = useState(false);
  const appUser = store.getState().appUser;
  useEffect(() => {
    if(datasets.getToken() && appUser.email === '') {
      setLoading(true);
      datasets.getData(SERVER.ME, datasets.getToken()).then(res => {
          if (res?._id) {
            replaceAppUser(res);
          }
          setLoading(false);
      });
    }
  }, []);
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
      {appUser.activated && <Route path={`/map/:projectId?`} component={MapView} />}
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
        appUser.designation === 'government_staff') && appUser.activated && <Route path={`/work-request`} component={WorkRequestView} />}
      {(appUser.designation === 'admin') && appUser.activated && <Route path={`/detailed-view`} component={DetailedContainer} />}
      {(loading && <Route path={`/`} component={LoadingView} />)}
      <Route path={`/`} component={Unauthorized} />
  </Switch>

}



export default App;
