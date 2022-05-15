import React, { useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom'
import { useClearCache } from 'react-clear-cache';

import * as datasets from "./Config/datasets"

import { SELECT_ALL_FILTERS } from './constants/constants';
import { resetProfile } from './store/actions/ProfileActions';
import { resetAppUser } from './store/actions/appUser';
import { resetMap } from './store/actions/mapActions';

import LoadingView from './Components/Loading/LoadingView';
import MapView from './Components/Map/MapView';
import useLogin from './hook/custom/useLogin';
const LoginContainer = lazy(()=> import('./Components/Login/LoginContainer'));
const SignUpContainer = lazy(()=> import('./Components/SignUp/SignUpContainer'));
const Unauthorized = lazy(()=> import('./Components/Unauthorized/Unauthorized'));
const ResetPasswordContainer = lazy(()=> import('./Components/ResetPassword/ResetPasswordView'));
const ConfirmPasswordContainer = lazy(()=> import('./Components/ConfirmPassword/ConfirmPasswordView'));
const DetailedPageContainer = lazy(()=> import('./Components/DetailedPage/DetailedPageContainer'));
const ProfileContainer = lazy(()=> import('./Components/Profile/ProfileContainer'));
const WorkPlan = lazy(()=> import('./Components/Work/Plan/WorkPlan'));
const WorkRequest = lazy(()=> import('./Components/Work/Request/WorkRequest'));
const UserContainer = lazy(()=> import('./Components/User/UserContainer'));
const UploadAttachmentContainer = lazy(()=> import('./Components/UploadAttachment/UploadAttachmentContainer'));

const initGA = () => {
  ReactGA.initialize('UA-176723071-1');
};

function App({
  getCarouselImages,
  appUser,
  getMapTables,
  getGroupOrganization,
}: {
  getCarouselImages: Function,
  appUser: any,
  getMapTables: Function,
  getGroupOrganization: Function,
}) {
  const history = useHistory();
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const { loading } = useLogin();
  useEffect(() => {
    resetAppUser();
    resetProfile();
    resetMap();
  }, []);
  useEffect(() => {
    getCarouselImages();
  }, [getCarouselImages]);
  useEffect(() => { initGA(); }, []);
  
  useEffect(() => {
    getGroupOrganization();
    SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          getMapTables(subKey, layer.name);
        });
      } else {
          getMapTables(layer);
      }
    })
  }, []);

  useEffect(() => {
      return history.listen((location) => {
        ReactGA.pageview(location.pathname);
      })
  },[history]);

  useEffect(() => {
    if (!isLatestVersion) {
      if (window.confirm("There is a new version available, update?") == true) {
        emptyCacheStorage();
      }
    }
  }, [isLatestVersion])

  return <>{
    <Switch>
    <Suspense fallback={<div>...</div>}>
      <Route path={`/login`} component={LoginContainer} />
      <Route path={`/sign-up`} component={SignUpContainer} />
      <Route path={'/404'} component={Unauthorized} />
      <Route path={`/reset-password`} component={ResetPasswordContainer} />
      <Route path={`/confirm-password`} component={ConfirmPasswordContainer} />
      <Route path={`/detailed-page`} component={DetailedPageContainer} />
      <Route exact path="/" render={() => (
          <Redirect to="/login"/>
      )}/>
      {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileContainer} />}
      {datasets.getToken() && appUser.email && <Route path={`/map/:projectId?`} component={MapView} />}
      {(appUser.designation === 'government_staff' || appUser.designation === 'admin' ||
        appUser.designation === 'staff') && <Route path={'/work-plan'} component={WorkPlan}  />}
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
