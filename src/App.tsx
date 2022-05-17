import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as datasets from "./Config/datasets"

import LoadingView from './Components/Loading/LoadingView';
import MapView from './Components/Map/MapView';
import useLogin from './hook/custom/useLogin';
import { useAppUserState } from './hook/useAppUser';
import useInitializeApp from './hook/custom/useInitializeApp';
const LoginView = lazy(() => import('./Components/Login/LoginView'));
const SignUpView = lazy(() => import('./Components/SignUp/SignUpView'));
const Unauthorized = lazy(() => import('./Components/Unauthorized/Unauthorized'));
const ResetPasswordView = lazy(() => import('./Components/ResetPassword/ResetPasswordView'));
const ConfirmPasswordView = lazy(() => import('./Components/ConfirmPassword/ConfirmPasswordView'));
const DetailedPageContainer = lazy(() => import('./Components/DetailedPage/DetailedPageContainer'));
const ProfileView = lazy(() => import('./Components/Profile/ProfileView'));
const WorkPlan = lazy(() => import('./Components/Work/Plan/WorkPlan'));
const WorkRequest = lazy(() => import('./Components/Work/Request/WorkRequest'));
const UserContainer = lazy(() => import('./Components/User/UserContainer'));
const UploadAttachmentContainer = lazy(() => import('./Components/UploadAttachment/UploadAttachmentContainer'));

const App = () => {
  const appUser = useAppUserState();
  const { loading } = useLogin();

  useInitializeApp();

  return <>{
    <Switch>
      <Suspense fallback={<div>...</div>}>
        <Route path={`/login`} component={LoginView} />
        <Route path={`/sign-up`} component={SignUpView} />
        <Route path={'/404'} component={Unauthorized} />
        <Route path={`/reset-password`} component={ResetPasswordView} />
        <Route path={`/confirm-password`} component={ConfirmPasswordView} />
        <Route path={`/detailed-page`} component={DetailedPageContainer} />
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileView} />}
        {datasets.getToken() && appUser.email && <Route path={`/map/:projectId?`} component={MapView} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-plan'} component={WorkPlan} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-request'} component={WorkRequest} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/user`} component={UserContainer} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/upload-attachment`} component={UploadAttachmentContainer} />}
        {(loading && <Route path={`/`} component={LoadingView} />)}
      </Suspense>
    </Switch>}
  </>
}

export default App;
