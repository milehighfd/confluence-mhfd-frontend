import * as types from 'store/types/ProjectTypes';
import * as datasets from "Config/datasets";
import { SERVER } from "Config/Server.config";
import { loadOneColumn } from 'store/actions/requestActions';
import * as turf from '@turf/turf';
import { depth } from 'routes/map/components/MapFunctionsUtilities';

export const saveSpecial = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveAcquisition = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    });
    datasets.postDataMultipart(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};

export const saveCapital = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    console.log(Object.keys(data));
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {  
          console.log(o, 'O')        
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    });
    datasets.postDataMultipart(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};
export const saveMaintenance = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        if (key === 'frequency' && data[key] === 'None') {
          data[key] = 0;
        }
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};
export const saveOverheadCost = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    console.log('FORMDATA', data)
    datasets.postDataMultipart(SERVER.PROJECT_COST_OVERHEAD, data, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};
export const saveStudy = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' || key === 'ids' || key === 'streams') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    });
    datasets.postDataMultipart(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_SAVE, status });
    })
  };
};
export const editSpecial = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.EDIT_PROJECT(data.editProject), formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editAcquisition = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.EDIT_PROJECT(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editStudy = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' || key === 'ids' || key === 'streams') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.EDIT_PROJECT(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editMaintenance = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.EDIT_PROJECT(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};
export const editCapital = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom') {
        formData.append(key, data[key]);
      } else if (key === 'files') {
        data[key].forEach((o: any, i: number) => {          
          console.log(o, 'O')                
          if (o.is_cover || o.cover) {
            covername = o.file_name;
          }
          formData.append(key, o.file);
        });
      } else if (key === 'cover') {        
        formData.append(key, covername);
      } else {
        formData.append(key, data[key]);
      }
    })
    datasets.postDataMultipart(SERVER.EDIT_PROJECT(data.editProject), formData, datasets.getToken()).then(res => {
      
      let status ; 
      if(res && res.total_rows && res.total_rows > 0 ){
        status = 1;
      }else{
        status = 0;
      }
      dispatch(loadOneColumn(namespaceId, 0));
      dispatch({ type: types.SET_EDIT, status });
    })
  };
};

export const setSave = (status: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_SAVE, status});
  };
}
export const setIsEdit = (isEdit: boolean) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_IS_EDIT, isEdit});
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

export const getStreamsIntersectedPolygon = (geom: any) => {
  return ( dispatch: Function) => {
    datasets.postData(SERVER.GET_STREAM_INTERSECTED, {geom: geom}, datasets.getToken()).then(res => {
      let streamsIntersectedIds = res;
        dispatch({type: types.SET_STREAMS_IDS_ADD, streamsIntersectedIds});
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
export const changeDrawStateCapital = (isDrawCapital: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.CHANGE_DRAW_STATE_CAPITAL, isDrawCapital});
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
      dispatch({type: types.SET_SERVICEAREA_COUNTY_ADD, currentServiceAreaCounty});
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
        listStreams[k] = [...objArray];
      }
      dispatch({type: types.SET_LIST_STREAMS_ADD, listStreams});
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
      const geom = JSON.parse(zoomGeom.geom);
      const DEPTH = depth(geom?.coordinates);
      let poly;
      if (DEPTH == 4) {
        poly = turf.multiPolygon(geom?.coordinates, { name: 'zoomarea' });
      } else {
        poly = turf.polygon(geom?.coordinates, { name: 'zoomarea' });
      }
      let bboxBounds = turf.bbox(poly);
      dispatch({type: types.SET_ZOOM_GEOM, zoomGeom: [[bboxBounds[0], bboxBounds[1]], [bboxBounds[2], bboxBounds[3]]]})
    })
  }
}
export const getZoomGeomProblem = (problemid: any) => {
  
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_PROBLEM_GEOM,{problemid}, datasets.getToken()).then( zoomGeom => {
      const geom = JSON.parse(zoomGeom.geom);
      const DEPTH = depth(geom?.coordinates);
      let poly;
      if (DEPTH == 4) {
        poly = turf.multiPolygon(geom?.coordinates, { name: 'zoomarea' });
      } else {
        poly = turf.polygon(geom?.coordinates, { name: 'zoomarea' });
      }
      let bboxBounds = turf.bbox(poly);
      dispatch({type: types.SET_ZOOM_GEOM, zoomGeom: [[bboxBounds[0], bboxBounds[1]], [bboxBounds[2], bboxBounds[3]]]})
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
      independentStreams = independentStreams.map((indStr:any) => {
        const arrayValues = indStr.stream.stream.MHFD_Code.split('.');
        arrayValues.shift();
        return arrayValues.join('.');
      });
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
      dispatch({type: types.SET_STREAMS_IDS_ADD, streamsIntersectedIds});
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
export const updateSelectedLayersCP = (selectedLayerCP: any) => {
  return (dispatch : Function) => {
      dispatch({ type: types.SELECTED_LAYERSCP, selectedLayerCP });
  }
}
export const setHighlightedComponent = (highlightedComponent: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_HIGHLIGHTED, highlightedComponent});
  }
}

export const setHighlightedStream = (highlightedStream: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_HIGHLIGHTED_STREAM, highlightedStream});
  }
}
export const setHighlightedStreams = (highlightedStreams: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_HIGHLIGHTED_STREAMS, highlightedStreams});
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
export const setBoardProjectsCreate = (boardProjectsCreate: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_BOARD_PROJECTS_CREATE, boardProjectsCreate});
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
    const componentsParsed = independentComponents.map((component: any) => {      
      return {
        cost: component.cost,
        index: component.independent_action_id,
        name: component.action_name,
        status: component.action_status,
      }
    })
    console.log(componentsParsed,'component')
    dispatch({type: types.SET_IND_COMPONENTS, componentsParsed})
  }
}

export const setNextPageOfCards = (nextPageOfCards: number) => {
  return (dispatch: Function) => {
    console.log(nextPageOfCards)
    dispatch({type: types.NEXT_PAGE, nextPageOfCards})
  }
}

export const resetNextPageOfCards = () => {
  return (dispatch: Function) => {
    dispatch({type: types.RESET_NEXT_PAGE})
  }
}

export const setInfiniteScrollItems = (infiniteScrollItems: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.INFINITE_SCROLL_ITEM, infiniteScrollItems})
  }
}

export const resetInfiniteScrollItems  = () => {
  return (dispatch: Function) => {
    dispatch({type: types.RESET_INFINITE_SCROLL_ITEM})
  }
}

export const setInfiniteScrollHasMoreItems = (infiniteScrollHasMoreItems: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS, infiniteScrollHasMoreItems})
  }
}

export const resetInfiniteScrollHasMoreItems = () => {
  return (dispatch: Function) => {
    dispatch({type: types.RESET_INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS})
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

export const setDeleteAttachmentsIds = (deleteAttachmentsIds: Array<any>) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_DELETE_ATTACHMENTS_IDS, deleteAttachmentsIds});
  }
}
