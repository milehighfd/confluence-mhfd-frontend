import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as datasets from "./Config/datasets"

import LoadingView from './Components/Loading/LoadingView';
import useLogin from './hook/custom/useLogin';
import { useAppUserState } from './hook/useAppUser';
import useInitializeApp from './hook/custom/useInitializeApp';
const MapLayout = lazy(() => import('./Components/Map/MapLayout'));
const LoginRoute = lazy(() => import('./routes/login'));
const SignUpRoute = lazy(() => import('./routes/sign-up'));
const ResetPasswordRoute = lazy(() => import('./routes/reset-password'));
const Unauthorized = lazy(() => import('./Components/Unauthorized/Unauthorized'));
const ConfirmPasswordView = lazy(() => import('./Components/ConfirmPassword/ConfirmPasswordView'));
const DetailedPageView = lazy(() => import('./Components/DetailedPage/DetailedPageView'));
const ProfileView = lazy(() => import('./Components/Profile/ProfileView'));
const WorkPlan = lazy(() => import('./Components/Work/Plan/WorkPlan'));
const WorkRequest = lazy(() => import('./Components/Work/Request/WorkRequest'));
const UserView = lazy(() => import('./Components/User/UserView'));
const UploadAttachmentView = lazy(() => import('./Components/UploadAttachment/UploadAttachmentView'));

const App = () => {
  const appUser = useAppUserState();
  const { loading } = useLogin();

  useInitializeApp();

  return <>{
    <Switch>
      <Suspense fallback={<div>...</div>}>
        <Route path={`/login`} component={LoginRoute} />
        <Route path={`/sign-up`} component={SignUpRoute} />
        <Route path={'/404'} component={Unauthorized} />
        <Route path={`/reset-password`} component={ResetPasswordRoute} />
        <Route path={`/confirm-password`} component={ConfirmPasswordView} />
        <Route path={`/detailed-page`} component={DetailedPageView} />
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileView} />}
        {datasets.getToken() && appUser.email && <Route path={`/map`} component={MapLayout} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-plan'} component={WorkPlan} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-request'} component={WorkRequest} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/user`} component={UserView} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/upload-attachment`} component={UploadAttachmentView} />}
        {(loading && <Route path={`/`} component={LoadingView} />)}
      </Suspense>
    </Switch>}
  </>
}

export default App;
