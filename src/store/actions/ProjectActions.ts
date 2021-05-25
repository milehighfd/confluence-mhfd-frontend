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
    // datasets.postDataMultipart('http://localhost:3003/create/special', formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
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
    });
    // datasets.postDataMultipart('http://localhost:3003/create/acquisition', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.CREATE_ACQUISITION, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
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
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/capital', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.CREATE_CAPITAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
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
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/maintenance', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.CREATE_MAINTENANCE, formData, datasets.getToken()).then(res => {
      console.log(res,"RES");
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
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
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' || key === 'ids' || key === 'streams') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {    
    datasets.postDataMultipart(SERVER.CREATE_STUDY, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const editSpecial = (data: any) => {
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
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.EDIT_SPECIAL(data.editProject), formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editAcquisition = (data: any) => {
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
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.EDIT_ACQUISITION(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editStudy = (data: any) => {
  return ( dispatch: Function) => {
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' || key === 'ids' || key === 'streams') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.EDIT_STUDY(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editMaintenance = (data: any) => {
  return ( dispatch: Function) => {
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.EDIT_MAINTENANCE(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};

export const editCapital = (data: any) => {
  return ( dispatch: Function) => {
    const formData = new FormData();
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {
          formData.append(key, o.file);
        })
      } else {
        formData.append(key, data[key]);
      }
    })
    // datasets.postDataMultipart('http://localhost:3003/create/study', formData, datasets.getToken()).then(res => {
    datasets.postDataMultipart(SERVER.EDIT_CAPITAL(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch({ type: types.SET_EDIT, status });
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

export const setStreamsIds = (streamsIntersectedIds: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_STREAMS_IDS, streamsIntersectedIds});
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
export const getServiceAreaPolygonofStreams = (geom:any ) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_SERVICEAREA_COUNTY_GEOM, {geom: JSON.parse(geom)}, datasets.getToken()).then(currentServiceAreaCounty => {

      dispatch({type: types.SET_SERVICEAREA_COUNTY, currentServiceAreaCounty});
    });
  }
}
export const setServiceAreaCounty = (currentServiceAreaCounty: any) => {
  return (dispatch:Function) => {
    dispatch({type: types.SET_SERVICEAREA_COUNTY, currentServiceAreaCounty});
  }
}
export const getJurisdictionPolygon = (geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_JURISDICTION_POLYGON, {geom: geom}, datasets.getToken()).then(res => {

      let jurisdiction = res.jurisdiction;
      dispatch({type: types.SET_JURISDICTION_SPONSOR, jurisdiction});
    });
  }
}
export const setJurisdictionSponsor = (jurisdiction: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_JURISDICTION_SPONSOR, jurisdiction});
  }
}

export const getStreamsList = (geom: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_LIST_STREAMS, {geom:geom}, datasets.getToken()).then(dataStreams => {
      let keysSorted = Object.keys(dataStreams).sort(function(a:any,b:any){return  a.toLowerCase().localeCompare(b.toLowerCase());})
      let listStreams: any = {}; 
      for(let k of keysSorted) {
        let objArray = [...dataStreams[k]];
        objArray.sort(function(a:any, b:any) {
          var textA = a.jurisdiction.toUpperCase();
          var textB = b.jurisdiction.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        console.log(dataStreams[k], objArray);
        listStreams[k] = [...objArray];
      }
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

export const getComponentGeom = (table:any, objectid: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_COMPONENT_GEOM,{table, objectid}, datasets.getToken()).then( componentGeom => {
      console.log("GET COMPOENNT GEOM", componentGeom);
      dispatch({type: types.SET_COMPONENT_GEOM, componentGeom})
    })
  }
}
export const setComponentGeom = (componentGeom: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_COMPONENT_GEOM, componentGeom});
  }
}
export const getZoomGeomComp = (table:any, objectid: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_COMPONENT_GEOM,{table, objectid}, datasets.getToken()).then( zoomGeom => {
      dispatch({type: types.SET_ZOOM_GEOM, zoomGeom})
    })
  }
}
export const getZoomGeomProblem = (problemid: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_PROBLEM_GEOM,{problemid}, datasets.getToken()).then( zoomGeom => {
      dispatch({type: types.SET_ZOOM_GEOM, zoomGeom})
    })
  }
}
export const setZoomGeom = (zoomGeom: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_ZOOM_GEOM, zoomGeom})
  }
}
export const getStreamsByComponentsList = (components: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAMS_BY_COMPONENTS, {components, geom:null}, datasets.getToken()).then( streamIntersected => {
      dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected});
    } )
  }
}

export const getAllComponentsByProblemId = (problemId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROBLEMID+'?problemid='+problemId, datasets.getToken()).then(componentsFromMap => {
      dispatch({type: types.SET_COMPONENTS_MAP, componentsFromMap: componentsFromMap.result});
    });
  }
}

export const getStreamsByProjectId = (projectId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_STREAMS_BY_PROJECT(projectId), datasets.getToken()).then( listStreams => {
      let independentStreams: any = [];
      for(let str in listStreams) {
        independentStreams = [...independentStreams, ...listStreams[str]];
      }
      independentStreams = independentStreams.map((indStr:any) => indStr.mhfd_code);
      const setMHFD:any = new Set();
      for(let i = 0; i < independentStreams.length; ++i) {
        setMHFD.add(independentStreams[i])
      }
      
      dispatch({type: types.SET_LIST_STREAMS, listStreams});
      let setArray = [...setMHFD];
      let streamsIntersectedIds: any = [];
      for(let i of setArray){
        streamsIntersectedIds.push({
          cartodb_id: undefined,
          mhfd_code:i
        })
      };
      dispatch({type: types.SET_STREAMS_IDS, streamsIntersectedIds});
    })
  }
}
export const getComponentsByProjectId = (projectId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROJECT(projectId), datasets.getToken()).then( res => {
      dispatch(getListComponentsByComponentsAndPolygon(res, null));
    })
  }
}
export const getIndependentComponentsByProjectId = (projectId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_INDEPENDENTCOMPONENTS_BY_PROJECT(projectId), datasets.getToken()).then( res => {

      dispatch(setIndComponents(res));
    })
  }
}

export const setStreamIntersected = (streamIntersected: any) => {
 return ( dispatch: Function) => {
  dispatch({type: types.SET_STREAM_INTERSECTED, streamIntersected});
 }
}

export const setComponentsFromMap = (componentsFromMap: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_COMPONENTS_MAP, componentsFromMap});
  }
}
export const updateSelectedLayers = (selectedLayer: any) => {
  return (dispatch : Function) => {
      dispatch({ type: types.SELECTED_LAYERS, selectedLayer });
  }
}
export const updateSelectedLayersWR = (selectedLayerWR: any) => {
  return (dispatch : Function) => {
      dispatch({ type: types.SELECTED_LAYERSWR, selectedLayerWR });
  }
}
export const setHighlightedComponent = (highlightedComponent: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_HIGHLIGHTED, highlightedComponent});
  }
}
export const setHighlightedProblem = (highlightedProblem: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_HIGHLIGHTED_PROB, highlightedProblem});
  }
}
export const setBoardProjects = (boardProjects: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_BOARD_PROJECTS, boardProjects});
  }
}
export const setZoomProject = (zoomProject: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_ZOOM_PROJECT, zoomProject});
  }
}
export const setEditLocation = (editLocation: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_EDIT_LOCATION, editLocation});
  }
}
export const setIndComponents = (independentComponents: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_IND_COMPONENTS, independentComponents})
  }
}
export const getGEOMByProjectId = ( projectid : any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_GEOM_BY_PROJECTID(projectid), datasets.getToken()).then(res => {
      
      if(res.createdCoordinates) {
        dispatch(setStreamIntersected({geom:res.createdCoordinates} ));
      }
    });
  }
}
// export const getBBOXProjects = (projects : any) => {
//   return (dispatch: Function) => {
//     datasets.postData(SERVER.SET_BBOX_PROJECTS, projects, datasets.getToken()).then(res => {

//     })
//   }
// }