import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as datasets from "./Config/datasets"
import LoadingView from './Components/Loading/LoadingView';
import useLogin from './hook/custom/useLogin';
import { useAppUserState } from './hook/useAppUser';
import useInitializeApp from './hook/custom/useInitializeApp';
import ConfirmPasswordLayout from './routes/confirm-password';
import PortfolioView from './routes/portfolio-view';
import UserManagement from './routes/user-management';
import MyProfile from './routes/my-profile';
import ListView from './routes/list-view';
import DetailPage from './routes/detail-page';
const LoginRoute = lazy(() => import('./routes/login'));
const SignUpRoute = lazy(() => import('./routes/sign-up'));
const ResetPasswordRoute = lazy(() => import('./routes/reset-password'));
const MapRoute = lazy(() => import('./routes/map'));
const Unauthorized = lazy(() => import('./Components/Unauthorized/Unauthorized'));
const DetailedPageView = lazy(() => import('./Components/DetailedPage/DetailedPageView'));
const ProfileView = lazy(() => import('./routes/profile-view'));
const WorkPlan = lazy(() => import('./Components/Work/Plan/WorkPlan'));
const WorkRequest = lazy(() => import('./Components/Work/Request/WorkRequest'));
const UserView = lazy(() => import('./Components/User/UserView'));
const maptest = lazy(() => import('./routes/maptest'));

const App = () => {
  // console.log(`ENVIRONMENT: ${process.env.REACT_APP_NODE_ENV}`);
  // console.log(`ENVIRONTMENT: ${JSON.stringify(process.env, null, 2)}`);
  console.log('Dec 7   version');
  

  const appUser = useAppUserState();
  const { loading } = useLogin();

  useInitializeApp();

  return (
    <Switch>
      <Suspense fallback={<div>...</div>}>
        <Route path={`/login`} component={LoginRoute} />
        <Route path={`/sign-up`} component={SignUpRoute} />
        <Route path={`/reset-password`} component={ResetPasswordRoute} />
        <Route path={`/confirm-password`} component={ConfirmPasswordLayout} />
        <Route path={'/404'} component={Unauthorized} />
        <Route path={`/detailed-page`} component={DetailedPageView} />
        <Route path={`/maptest`} component={maptest} />
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        <Route path={`/map`} component={MapRoute} />
        <Route path={`/user-settings`} component={UserManagement} />
        <Route path={`/my-profile-edit-search`} component={MyProfile} />
        <Route path={`/list-view`} component={ListView} />
        <Route path={`/detail-page`} component={DetailPage} />
        {(appUser.status === 'approved') && <Route path={`/portfolio-list-view`} component={PortfolioView} />}
        {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileView} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-plan'} component={WorkPlan} />}
        {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
          appUser.designation === 'staff') && <Route path={'/work-request'} component={WorkRequest} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/user`} component={UserView} />}
        {/* {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/upload-attachment`} component={UploadAttachmentRoute} />} */}
        {(loading && <Route path={`/`} component={LoadingView} />)}
      </Suspense>
    </Switch>
  );
};

export default App;
