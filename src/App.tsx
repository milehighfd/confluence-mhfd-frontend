import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom'
import { useClearCache } from 'react-clear-cache';

import {initGA} from './index';

import * as datasets from "./Config/datasets"
import { SERVER } from "./Config/Server.config";

import { SELECT_ALL_FILTERS } from './constants/constants';
import { resetProfile } from './store/actions/ProfileActions';
import { resetAppUser } from './store/actions/appUser';
import { resetMap } from './store/actions/mapActions';

import LoadingView from './Components/Loading/LoadingView';
import MapView from './Components/Map/MapView';
const LoginContainer = lazy(()=> import('./Components/Login/LoginContainer'));
const SignUpContainer = lazy(()=> import('./Components/SignUp/SignUpContainer'));
const Unauthorized = lazy(()=> import('./Components/Unauthorized/Unauthorized'));
const ResetPasswordContainer = lazy(()=> import('./Components/ResetPassword/ResetPasswordContainer'));
const ConfirmPasswordContainer = lazy(()=> import('./Components/ConfirmPassword/ConfirmPasswordContainer'));
const DetailedPageContainer = lazy(()=> import('./Components/DetailedPage/DetailedPageContainer'));
const ProfileContainer = lazy(()=> import('./Components/Profile/ProfileContainer'));
const WorkPlan = lazy(()=> import('./Components/Work/Plan/WorkPlan'));
const WorkRequest = lazy(()=> import('./Components/Work/Request/WorkRequest'));
const UserContainer = lazy(()=> import('./Components/User/UserContainer'));
const UploadAttachmentContainer = lazy(()=> import('./Components/UploadAttachment/UploadAttachmentContainer'));
const DetailedContainer = lazy(()=> import('./Components/DetailedProblem/DetailedContainer'));


function App({ replaceAppUser, getUserInformation, getCarouselImages, appUser, getMapTables, replaceFilterCoordinates, getGroupOrganization }
          : { replaceAppUser : Function, getUserInformation: Function, getCarouselImages: Function, appUser: any,
             getMapTables: Function, getParamsFilter: Function, setFilterProblemOptions: Function, setFilterProjectOptions: Function, setFilterComponentOptions: Function,
             filterProblemOptions: any, filterProjectOptions: any, filterComponentOptions: any, replaceFilterCoordinates: Function, getGroupOrganization: Function }) {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const [ loading, setLoading ] = useState(true);
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
    if(datasets.getToken() && appUser.email === '') {
      datasets.getData(SERVER.ME, datasets.getToken()).then( async res => {
          if (res?._id) {
            if(res.polygon) {
              let bottomLongitude = res.polygon[0][0];
              let bottomLatitude = res.polygon[0][1];
              let topLongitude = res.polygon[0][0];
              let topLatitude = res.polygon[0][1];
              for (let index = 0; index < res.polygon.length; index++) {
                  const element = res.polygon[index];
                  if(bottomLongitude > element[0]) {
                      bottomLongitude = element[0];
                  }
                  if(topLongitude < element[0]) {
                      topLongitude = element[0];
                  }
                  if(bottomLatitude > element[1]) {
                      bottomLatitude = element[1];
                  }
                  if(topLatitude < element[1]) {
                      topLatitude = element[1];
                  }
              }
              bottomLongitude -= 0.125;
              topLongitude += 0.125;
              const bounds = '' + bottomLongitude + ',' + bottomLatitude + ',' + topLongitude + ',' + topLatitude;
              replaceFilterCoordinates(bounds);
            }
            replaceAppUser(res);
            getUserInformation();
          }
          setLoading(false);
      });
    }
  }, []);
  const history = useHistory()


  useEffect(() => {
      return history.listen((location) => {
        ReactGA.pageview(location.pathname);
      })
  },[history]);

  useEffect(() => {
    if (!isLatestVersion) {
      if (confirm("There is a new version available, update?") == true) {
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
      {(appUser.designation === 'admin') && (appUser.status === 'approved') && <Route path={`/detailed-view`} component={DetailedContainer} />}
      {(loading && <Route path={`/`} component={LoadingView} />)}
      {/* <Route path={`/`} component={Unauthorized} /> */}
    </Suspense>
  </Switch>}
  </>
}

export default App;
