import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { getToken } from 'Config/datasets';
import LoadingView from 'Components/Loading/LoadingView';
import useLogin from 'hook/custom/useLogin';
import useInitializeApp from 'hook/custom/useInitializeApp';
import ConfirmPasswordLayout from 'routes/confirm-password';
import PortfolioView from 'routes/portfolio-view';
import UserManagement from 'routes/user-management';
import MyProfile from 'routes/my-profile';
import PreSignUpLayout from 'routes/sign-up/components/PreSignUpLayout';
import { useProfileState } from 'hook/profileHook';
const LoginRoute = lazy(() => import('./routes/login'));
const SignUpRoute = lazy(() => import('./routes/sign-up'));
const ResetPasswordRoute = lazy(() => import('./routes/reset-password'));
const MapRoute = lazy(() => import('./routes/map'));
const Unauthorized = lazy(() => import('./Components/Unauthorized/Unauthorized'));
const DetailedModal = lazy(() => import('./routes/detail-page/components/DetailModal'));
declare const BUILD_DATE: string;

const App = () => {
  console.log(`ENVIRONMENT: ${process.env.REACT_APP_NODE_ENV}`);
  //console.log('Aug 21 13:14 version');
  console.log(`${BUILD_DATE} version`);

  const { userInformation} = useProfileState();
  const { loading } = useLogin();

  useInitializeApp();

  return (
    <Switch>
      <Suspense fallback={<div>...</div>}>
        <Route path={`/login`} component={LoginRoute} />
        <Route path={`/signup/:id`} component={SignUpRoute} />
        <Route path={`/reset-password`} component={ResetPasswordRoute} />
        <Route path={`/confirm-password`} component={ConfirmPasswordLayout} />
        <Route path={`/pre-signup`} component={PreSignUpLayout} />
        <Route path={'/404'} component={Unauthorized} />
        <Route path={`/detailed-modal`} component={DetailedModal} />
        <Route path={`/user-settings`} component={UserManagement} />
        <Route path={`/my-profile-edit-search`} component={MyProfile} />
        {(userInformation.designation === 'admin' ||
          userInformation.designation === 'staff' || userInformation.designation === 'government_staff') && (userInformation.status === 'approved') && <Route path={`/pm-tools`} component={PortfolioView} />}
        <Route path={`/pre-signup`} component={PreSignUpLayout} />
        <Route exact path="/" render={() => (
          <Redirect to="/login" />
        )} />
        <Route path={`/map`} component={MapRoute} />
        {getToken() && userInformation.email && <Route path={`/profile-view`} component={MyProfile} />}
        {(userInformation.designation === 'admin' ||
          userInformation.designation === 'staff') && (userInformation.status === 'approved') && <Route path={`/user`} component={UserManagement} />}
        {(loading && <Route path={`/`} component={LoadingView} />)}
      </Suspense>
    </Switch>
  );
};

export default App;
