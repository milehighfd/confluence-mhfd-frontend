import * as React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

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
import FiltersProjectContainer from './Components/FiltersProject/FiltersProjectContainer';
import WorkPlanContainer from './Components/WorkPlan/WorkPlanContainer';
import WorkRequestContainer from './Components/WorkRequest/WorkRequestContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import DetailedContainer from './Components/DetailedProblem/DetailedContainer';
import MapToolContainer from './Components/MapTool/MapToolContainer';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import ProjectDebrisContainer from './Components/ProjectDebris/ProjectDebrisContainer';

function App({ appUser }: any) {
  // return <Switch>
  //     <Route path={`/login`} component={LoginContainer} />
  //     <Route path={'/404'} component={Unauthorized} />

  //     {appUser.role === 'admin' && <Route path={`/map`} component={MapContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/navbar`} component={NavbarContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/reset-password`} component={ResetPasswordContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/confirm-password`} component={ConfirmPasswordContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/sidebar`} component={SidebarContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/sign-up`} component={SignUpContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/user`} component={UserContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/new-project-form`} component={NewProjectFormContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/new-project-types`} component={NewProjectTypesContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/filter-projects`} component={FiltersProjectContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/work-plan`} component={WorkPlanContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/work-request`} component={WorkRequestContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/profile-view`} component={ProfileContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/detailed-view`} component={DetailedContainer} />}
  //     {appUser.role === 'admin' && <Route path={`/maptool-view`} component={MapToolContainer} />}
  //     <Redirect from={'*'} to="/404"/>
  //   </Switch>

  return (
    <Switch>
      <Route path={`/login`} component={LoginContainer} />
      <Route path={`/map`} component={MapContainer} />
      <Route path={`/navbar`} component={NavbarContainer} />
      <Route path={`/reset-password`} component={ResetPasswordContainer} />
      <Route path={`/confirm-password`} component={ConfirmPasswordContainer} />
      <Route path={`/sidebar`} component={SidebarContainer} />
      <Route path={`/sign-up`} component={SignUpContainer} />
      <Route path={`/user`} component={UserContainer} />
      <Route path={`/new-project-form`} component={NewProjectFormContainer} />
      <Route path={`/project-debris`} component={ProjectDebrisContainer} />
      <Route path={`/new-project-types`} component={NewProjectTypesContainer} />
      <Route path={`/filter-projects`} component={FiltersProjectContainer} />
      <Route path={`/work-plan`} component={WorkPlanContainer} />
      <Route path={`/work-request`} component={WorkRequestContainer} />
      <Route path={`/profile-view`} component={ProfileContainer} />
      <Route path={`/detailed-view`} component={DetailedContainer} />
      <Route path={`/maptool-view`} component={MapToolContainer} />
      <Route path={`/`} component={Unauthorized} />
    </Switch>
  );
}



export default App;
