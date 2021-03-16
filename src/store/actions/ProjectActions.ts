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

export const getStreamIntersection = (geom: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAM_INTERSECTION, {geom: geom}, datasets.getToken()).then(res => {
      let streamIntersected = res;
        dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected});
    });
  }
}

// get clipped streams
export const getStreamIntersectionPolygon = (geom: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAM_POLYGON, {geom: geom}, datasets.getToken()).then(res => {
      let streamIntersected = res;
        dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected});
    });
  }
}

// get the streams ids intersected 
export const getStreamsIntersectedPolygon = (geom: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAM_INTERSECTED, {geom: geom}, datasets.getToken()).then(res => {
      let streamsIntersectedIds = res;
        dispatch({type: types.SET_STREAMS_IDS, streamsIntersectedIds});
    });
  }
}

export const changeDrawState = (isDraw: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.CHANGE_DRAW_STATE, isDraw});
  }
} 