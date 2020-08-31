import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom'

import {initGA} from './index';


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
import UploadAttachmentContainer from './Components/UploadAttachment/UploadAttachmentContainer';
import { SELECT_ALL_FILTERS } from './constants/constants';
import Prueba from './Components/algo/Prueba';
import DetailedPageContainer from './Components/DetailedPage/DetailedPageContainer';

function App({ replaceAppUser, getUserInformation, getCarouselImages, appUser, getMapTables, getParamsFilter, 
          setFilterProblemOptions, setFilterProjectOptions, setFilterComponentOptions, filterProblemOptions,
          filterProjectOptions, filterComponentOptions, replaceFilterCoordinates, getGroupOrganization } 
          : { replaceAppUser : Function, getUserInformation: Function, getCarouselImages: Function, appUser: any,
             getMapTables: Function, getParamsFilter: Function, setFilterProblemOptions: Function, setFilterProjectOptions: Function, setFilterComponentOptions: Function,
             filterProblemOptions: any, filterProjectOptions: any, filterComponentOptions: any, replaceFilterCoordinates: Function, getGroupOrganization: Function }) {
  const [ loading, setLoading ] = useState(true);
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
  return <Switch>
      <Route path={'/prueba'} component={Prueba} />
      <Route path={`/login`} component={LoginContainer} />
      <Route path={`/sign-up`} component={SignUpContainer} />
      <Route path={'/404'} component={Unauthorized} />
      <Route path={`/reset-password`} component={ResetPasswordContainer} />
      <Route path={`/confirm-password`} component={ConfirmPasswordContainer} />
      <Route path={`/alert-view`} component={AlertContainer} />
      {/* <Route path={`/upload-attachment`} component={UploadAttachmentContainer} /> */}
      <Route path={`/detailed-page`} component={DetailedPageContainer} />
      <Route exact path="/" render={() => (
          <Redirect to="/login"/>
      )}/>
      {datasets.getToken() && appUser.email && <Route path={`/profile-view`} component={ProfileContainer} />}
      {datasets.getToken() && appUser.email && <Route path={`/map/:projectId?`} component={MapView} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/user`} component={UserContainer} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/upload-attachment`} component={UploadAttachmentContainer} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/project-capital`} component={ProjectCapitalForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/project-acquisition`} component={ProjectAcquisitionForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/project-special`} component={ProjectSpecialForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/project-maintenance`} component={ProjectMaintenanceForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/project-study`} component={ProjectStudyForm} />}
      {(appUser.designation === 'admin' || 
        appUser.designation === 'staff'|| 
        appUser.designation === 'government_admin' || 
        appUser.designation === 'government_staff') 
        && (appUser.status === 'approved') && <Route path={`/new-project-types`} component={NewProjectTypesContainer} />}
      {(appUser.designation === 'admin' ||
        appUser.designation === 'staff') && (appUser.status === 'approved') && <Route path={`/work-plan`} component={WorkPlanContainer} />}
      {(appUser.designation === 'government_admin' ||
        appUser.designation === 'government_staff') && (appUser.status === 'approved') && <Route path={`/work-request`} component={WorkRequestView} />}
      {(appUser.designation === 'admin') && (appUser.status === 'approved') && <Route path={`/detailed-view`} component={DetailedContainer} />}
      {(loading && <Route path={`/`} component={LoadingView} />)}
      <Route path={`/`} component={Unauthorized} />
  </Switch>

}

export default App;
