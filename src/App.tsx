import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as datasets from 'Config/datasets';
import LoadingView from 'Components/Loading/LoadingView';
import useLogin from 'hook/custom/useLogin';
import { useAppUserState } from 'hook/useAppUser';
import useInitializeApp from 'hook/custom/useInitializeApp';
import ConfirmPasswordLayout from 'routes/confirm-password';
import PortfolioView from 'routes/portfolio-view';
import UserManagement from 'routes/user-management';
import MyProfile from 'routes/my-profile';
import ListView from 'routes/list-view';
import DetailPage from 'routes/detail-page';
import PreSignUpLayout from 'routes/sign-up/components/PreSignUpLayout';
const LoginRoute = lazy(() => import('./routes/login'));
const SignUpRoute = lazy(() => import('./routes/sign-up'));
const ResetPasswordRoute = lazy(() => import('./routes/reset-password'));
const MapRoute = lazy(() => import('./routes/map'));
const Unauthorized = lazy(() => import('./Components/Unauthorized/Unauthorized'));
const maptest = lazy(() => import('./routes/maptest'));
const DetailedModal = lazy(() => import('./routes/detail-page/components/DetailModal'));
declare const BUILD_DATE: string;

const App = () => {
  console.log(`ENVIRONMENT: ${process.env.REACT_APP_NODE_ENV}`);
  //console.log('Aug 21 13:14 version');
  console.log(`${BUILD_DATE} version`);

  const appUser = useAppUserState();
  const { loading } = useLogin();

  useInitializeApp();

  return (
    <Switch>
      <Suspense fallback={<div>...</div>}>
        <Route path={`/login`} component={LoginRoute} />
        <Route path={`/signup/:id`} component={SignUpRoute} />
        <Route path={`/reset-password`} component={ResetPasswordRoute} />
        <Route path={`/confirm-password`} component={ConfirmPasswordLayout} />
        <Route path={'/404'} component={Unauthorized} />
        <Route path={`/detailed-modal`} component={DetailedModal} />
        <Route path={`/maptest`} component={maptest} />
        <Route path={`/user-settings`} component={UserManagement} />
        <Route path={`/my-profile-edit-search`} component={MyProfile} />
        <Route path={`/list-view`} component={ListView} />
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff' || appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/pm-tools`} component={PortfolioView} />}
        <Route path={`/detail-page`} component={DetailPage} />
        <Route path={`/pre-signup`} component={PreSignUpLayout} />
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        <Route path={`/map`} component={MapRoute} />
        {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={MyProfile} />}
        {(appUser.designation === 'admin' ||
          appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/user`} component={UserManagement} />}
        {(loading && <Route path={`/`} component={LoadingView} />)}
      </Suspense>
    </Switch>
  );
};

export default App;
