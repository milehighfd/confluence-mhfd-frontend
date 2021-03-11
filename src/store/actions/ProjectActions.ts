import { SET_PROJECT_LOCATION, SET_ACQUISITION_LOCATION } from './../types/ProjectTypes';
import * as types from '../types/ProjectTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { dispatch } from 'd3';


export const saveSpecial = (data: any) => {
  const projectname = data.project;
  datasets.postData(SERVER.CREATE_SPECIAL, data, datasets.getToken()).then(res => {
    if(res.total_rows > 0){
      console.log("save");
    }
  })
}

export const saveAcquisition = (data: any) => {
  const projectname = data.project;
  datasets.postData(SERVER.CREATE_ACQUISITION, data, datasets.getToken()).then(res => {
    if(res.total_rows > 0){
      console.log("save");
    }
  })
}

export const saveCapital = (data: any) => {
  const projectname = data.project;
  datasets.postData(SERVER.CREATE_CAPITAL, data, datasets.getToken()).then(res => {
    if(res.total_rows > 0){
      console.log("save");
    }
  })
}

export const saveMaintenance = (data: any) => {
  const projectname = data.project;
  datasets.postData(SERVER.CREATE_MAINTENANCE, data, datasets.getToken()).then(res => {
    if(res.total_rows > 0){
      console.log("save");
    }
  })
}

export const saveStudy = (data: any) => {
  const projectname = data.project;
  datasets.postData(SERVER.CREATE_STUDY, data, datasets.getToken()).then(res => {
    if(res.total_rows > 0){
      console.log("save");
    }
  })
}

export const saveSpecialLocation = (specialLocation: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_PROJECT_LOCATION, specialLocation});
  }
}
export const saveAcquisitionLocation = (acquisitionLocation: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_ACQUISITION_LOCATION, acquisitionLocation});
  }
}