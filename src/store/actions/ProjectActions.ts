import { getTimesLogin } from './usersActions';
import { SET_PROJECT_LOCATION, SET_ACQUISITION_LOCATION, SET_LIST_STREAMS, SET_STREAM_INTERSECTED } from './../types/ProjectTypes';
import * as types from '../types/ProjectTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { dispatch } from 'd3';


export const saveSpecial = (data: any) => {
  return ( dispatch: Function) => {
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.CREATE_SPECIAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res.total_rows > 0){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveAcquisition = (data: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.CREATE_ACQUISITION, data, datasets.getToken()).then(res => {
      let status ; 
      if(res.total_rows > 0){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveCapital = (data: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.CREATE_CAPITAL, data, datasets.getToken()).then(res => {
      console.log(res,"RES");
      let status ; 
      if(res.total_rows > 0){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveMaintenance = (data: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.CREATE_MAINTENANCE, data, datasets.getToken()).then(res => {
      console.log(res,"RES");
      let status ; 
      if(res.total_rows > 0){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveStudy = (data: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.CREATE_STUDY, data, datasets.getToken()).then(res => {
      console.log(res,"RES");
      let status ; 
      if(res.total_rows > 0){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const setSave = (status: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_SAVE, status});
  };
}
export const saveSpecialLocation = (specialLocation: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_PROJECT_LOCATION, specialLocation});
  };
};
export const saveAcquisitionLocation = (acquisitionLocation: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_ACQUISITION_LOCATION, acquisitionLocation});
  };
};

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

export const changeAddLocationState = (isAddLocation: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.ADD_LOCATION, isAddLocation});
  }
}

export const getComponentsIntersected = (geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_LIST_COMPONENTS, {geom:geom}, datasets.getToken()).then(res => {
      let listComponents = res;
      dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
    });  
  }
}

export const setComponentIntersected = (listComponents: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
  }
} 

export const getComponentsSorted = ( components: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_LIST_COMPONENTS_SORTED, components, datasets.getToken()).then(listComponents => {
      dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
    });
  }
}
// this can receive geom or not, if geom add components, else just update components fields 
export const addComponentsByPolygon = (components: any, geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.ADD_COMPONENTS_POLYGON, {components, geom}, datasets.getToken()).then(data => {
      // set components and set streams 
      // dispatch({type: types.SET_LIST_COMPONENTS, listComponents: data.components });
      // dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected: data.geom});
    });
  }
}

export const getServiceAreaPoint = (geom:any ) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_SERVICEAREA_COUNTY_POINT, {geom: geom.geom}, datasets.getToken()).then(currentServiceAreaCounty => {
      dispatch({type: types.SET_SERVICEAREA_COUNTY, currentServiceAreaCounty});
    });
  }
}
export const getServiceAreaStreams = (geom:any ) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_SERVICEAREA_COUNTY_STREAMS, {geom: geom}, datasets.getToken()).then(currentServiceAreaCounty => {
      dispatch({type: types.SET_SERVICEAREA_COUNTY, currentServiceAreaCounty});
    });
  }
}

export const getStreamsList = (geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_LIST_STREAMS, {geom:geom}, datasets.getToken()).then(listStreams => {
      dispatch({type: types.SET_LIST_STREAMS, listStreams});
    })
  }
}

export const setStreamsList = (listStreams: any) => {
  return ( dispatch: Function) => {
    dispatch({type: types.SET_LIST_STREAMS, listStreams});
  }
} 

export const setUserPolygon = (userPolygon: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_USER_POLYGON, userPolygon});
  }
}

export const getListComponentsByComponentsAndPolygon = (components: any, geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_COMPONENTS_WITH_GEOM, {components, geom}, datasets.getToken()).then(listComponents => {
      dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
    });
  }
}

export const getStreamsByComponentsList = (components: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAMS_BY_COMPONENTS, {components, geom:null}, datasets.getToken()).then( streamIntersected => {
      console.log("TOTAL COMPONENTS ", components, streamIntersected);
      dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected});
    } )
  }
}

export const getAllComponentsByProblemId = (problemId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROBLEMID+'?problemid='+problemId, datasets.getToken()).then(listComponents => {
      dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
    });
  }
}