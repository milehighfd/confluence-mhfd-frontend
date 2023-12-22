import * as types from 'store/types/ProjectTypes';
import * as datasets from "Config/datasets";
import { SERVER } from "Config/Server.config";
import { loadColumns, loadFilters, loadOneColumn } from 'store/actions/requestActions';
import * as turf from '@turf/turf';
import { depth } from 'routes/map/components/MapFunctionsUtilities';
import { MAP_TAB, PMTOOLS } from 'constants/constants';


const getAndDispatchAbortableCtrl = (dispatch: Function, key: string): AbortController => {
  const controller = new AbortController();
  dispatch({
    type: types.ABORTABLE_REQUEST,
    payload: {
      abortableController: controller,
      abortableKey: key,
    },
  });
  return controller;
};

const isAbortError = (error: any) => {
  return error instanceof DOMException && error.message === 'The user aborted a request.';
};

export const handleAbortError = (error: any) => {
  if (!isAbortError(error)) {
    console.log(`Error`, error);
  }
};

const callArcGisProcess = (data: any, project_id: any, typeprocess: string) => {
  try {
    let geomData;
    if (data.type === 'capital' || data.type === 'maintenance') {
      geomData = data.geom;
    } else if (data.type === 'acquisition' || data.type === 'special' || data.type === 'study') {
      geomData = JSON.stringify(data.geom);
    }
    const bodyArcGis = {
      project_id: project_id,
      geom: geomData, 
      type: data.type,
      ids: data.ids
    };

    console.log('Body arcgis', bodyArcGis);
    let URL_to_SEND = typeprocess === 'create' ? SERVER.CREATE_PROJECT_GENERAL_ARCGIS : SERVER.EDIT_PROJECT_ARCGIS;
    datasets.postData(URL_to_SEND, bodyArcGis, datasets.getToken()).then(res => {
      console.log('Arcgis status: ', res);
    });
  } catch (error) {
    console.error('Error at arcgis creation', error);
  }
}
export const saveCapital = (data: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' && (data.type === 'capital' || data.type === 'maintenance')) {
        formData.append(key, data[key]);
      }else if (key === 'geom' && (data.type === 'acquisition' || data.type === 'special')) {
        formData.append(key, JSON.stringify(data[key]));
      }
      else if (key === 'geom' && data.type === 'study') {
        formData.append(key, JSON.stringify(data[key]));
      }else if (key === 'ids' || key === 'streams'){
        formData.append(key, JSON.stringify(data[key]));
      }else if( key === 'userChangedOverhead' ) {
        formData.append(key, JSON.stringify(data[key]));
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
    datasets.postDataMultipartWithoutCatch(SERVER.CREATE_PROJECT_GENERAL, formData, datasets.getToken()).then(res => {
      let status ; 
      if(res && res.project_data){
        status = 1;
        dispatch(setCreatedProject(res));
      }else{
        status = 0;
      }
      if(data.fromTab !== MAP_TAB){
        dispatch(loadColumns());
        dispatch(loadFilters())
      }
      dispatch({ type: types.SET_SAVE, status });
      callArcGisProcess(data, res.project_data.project_id, 'create');
    }).catch((err) => {
      dispatch({ type: types.SET_SAVE, status: -1 });
    })
  };
};
export const editCapital = (data: any, originLocation?: any) => {
  return ( dispatch: Function, getState: Function) => {
    const { request: { namespaceId } } = getState();
    const formData = new FormData();
    let covername = '';
    Object.keys(data).forEach((key: string) => {
      if (key === 'geom' && (data.type === 'capital' || data.type === 'maintenance')) {
        formData.append(key, data[key]);
      }else if (key === 'geom' && (data.type === 'acquisition' || data.type === 'special')) {
        formData.append(key, JSON.stringify(data[key]));
      }
      else if (key === 'geom' && data.type === 'study') {
        formData.append(key, JSON.stringify(data[key]));
      }else if (key === 'ids' || key === 'streams'){
        formData.append(key, JSON.stringify(data[key]));
      }else if( key === 'userChangedOverhead' ) {
        formData.append(key, JSON.stringify(data[key]));
      }else if (key === 'files') {
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
      if(res && res.project_update){
        status = 1;
        dispatch(setCreatedProject(res.project_update));
      }else{
        status = 0;
      }
      if (originLocation !== PMTOOLS) {
        dispatch(loadColumns());
        dispatch(loadFilters())
      }
      dispatch({ type: types.SET_EDIT, status });
      callArcGisProcess(data, data.editProject, 'edit');
    })
  };
};

export const setSave = (status: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_SAVE, status});
  };
}
export const setCreatedProject = (createdProject: any) => {
  return ( dispatch: Function ) => {
    dispatch({type: types.SET_CREATED_PROJECT, createdProject});
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
      // console.trace('streamsIntersectedIds', streamsIntersectedIds);
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

export const getStreamsList = (geom: any, projecttype: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.GET_LIST_STREAMS, {geom:geom, projecttype}, datasets.getToken()).then(dataStreams => {
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

export const setIsGeomDrawn = (isGeomDrawn: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.IS_GEOM_DRAWN, isGeomDrawn});
  }
}

export const getListComponentsByComponentsAndPolygon = (components: any, geom: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getListComponentsByComponentsAndPolygon');
    datasets.postData(SERVER.GET_COMPONENTS_WITH_GEOM, {components, geom}, datasets.getToken(), controller.signal).then(listComponents => {
      console.trace('Setting listcomponents', listComponents);
      dispatch({type: types.SET_LIST_COMPONENTS, listComponents});
    }).catch(err => {
      if (!isAbortError) {
        console.log('getListComponentsByComponentsAndPolygon', err);
      }
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
        if(geom?.type == 'Point'){
          poly = turf.point(geom?.coordinates, { name: 'zoomarea' });
        }else{
          poly = turf.polygon(geom?.coordinates, { name: 'zoomarea' });
        }
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
export const setZoomGeomCreateMap = (geomCreateMap: any) => {
    return (dispatch: Function) => {
      dispatch({type: types.SET_GEOM_CREATE, geomCreateMap});
    }
}
export const setZoomGeom = (zoomGeom: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_ZOOM_GEOM, zoomGeom})
  }
}

export const getAllComponentsByProblemId = (problemId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROBLEMID+'?problemid='+problemId, datasets.getToken()).then(componentsFromMap => {
      dispatch({type: types.SET_COMPONENTS_MAP, componentsFromMap: componentsFromMap.result});
    });
  }
}
export const getStreamsByProjectId = (projectId: any, typeProjectId: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_STREAMS_BY_PROJECT(projectId), datasets.getToken()).then( listStreams => {
      let independentStreams: any = [];
      for(let str in listStreams) {
        independentStreams = [...independentStreams, ...listStreams[str]];
      }
      const completeMhfdList:any = [];
      independentStreams = independentStreams.map((indStr:any) => {
        const arrayValues = indStr.stream.stream.MHFD_Code.split('.');
        arrayValues.shift();
        completeMhfdList.push({mhfd_code_complete: indStr.stream.stream.MHFD_Code, mhfd_code_split: arrayValues.join('.'), str_name: indStr.stream.stream.stream_name});
        return arrayValues.join('.');
      });
      const setMHFD:any = new Set();
      for(let i = 0; i < independentStreams.length; ++i) {
        setMHFD.add(independentStreams[i])
      }
      // console.log('completeMhfdList', completeMhfdList);
      dispatch({type: types.SET_LIST_STREAMS, listStreams});
      let setArray = [...setMHFD];
      let streamsIntersectedIds: any = [];
      for(let i of setArray){
        streamsIntersectedIds.push({
          cartodb_id: undefined,
          mhfd_code:i,
          mhfd_code_full: completeMhfdList.find((mhfd: any) => mhfd.mhfd_code_split === i)?.mhfd_code_complete,
          str_name: completeMhfdList.find((mhfd:any) => mhfd.mhfd_code_split === i)?.str_name,
        })
      };
      if (typeProjectId == 1 || typeProjectId === 18) { // VALUES of STUDY
        dispatch({type: types.SET_STREAMS_IDS_ADD, streamsIntersectedIds});
      }
      
    })
  }
}
export const getComponentsByProjectId = (projectId: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getcomponentsbyprojectid');
    datasets.getData(SERVER.GET_COMPONENTS_BY_PROJECT(projectId), datasets.getToken(), controller.signal).then( res => {
      dispatch(getListComponentsByComponentsAndPolygon(res, null));
    }).catch(err => {
      if (!isAbortError) {
        console.log('getcomponentsbyprojectid', err);
      }
    });
  }
}
export const getIndependentComponentsByProjectId = (projectId: any) => {
  return (dispatch: Function) => {
    const controller = getAndDispatchAbortableCtrl(dispatch, 'getindependentcomponentsbyprojectid');
    datasets.getData(SERVER.GET_INDEPENDENTCOMPONENTS_BY_PROJECT(projectId), datasets.getToken(), controller.signal).then( res => {
      dispatch(setIndComponents(res));
    }).catch(err => {
      if (!isAbortError) {
        console.log('getindependentcomponentsbyprojectid', err);
      }
    });
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
    dispatch({type: types.SET_IND_COMPONENTS, componentsParsed})
  }
}

export const setNextPageOfCards = (nextPageOfCards: number) => {
  return (dispatch: Function) => {
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

export const archiveProject = (projectid: any) => {
  return (dispatch: Function) => {
    datasets.putData(SERVER.ARCHIVE_PROJECT(projectid), {}, datasets.getToken()).then(res => {
      console.log('res', res);
      dispatch(loadColumns());
      dispatch(loadFilters());
    });
  }
}

export const setDisableFieldsForLg = (disableFieldsForLG: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_DISABLE_FIELDS_FOR_LG, disableFieldsForLG});
  }
}

export const setGlobalSearch = (globalSearch: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_GLOBAL_SEARCH, globalSearch});
  }
}

export const setGlobalProjectId = (globalProjectId: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_GLOBAL_PROJECT_ID, globalProjectId});
  }
}

export const setGlobalStatusId = (globalStatusId: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_GLOBAL_STATUS_ID, globalStatusId});
  }
}

export const setGlobalLocality = (globalLocality: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_GLOBAL_LOCALITY, globalLocality});
  }
}

export const sendProjectToBoardYear = (project_id: number, year: number, extraYears: Array<number>, sponsor: string, project_type: string, extraYearsAmounts: Array<number>, subType: string) => {
  return (dispatch: Function) => {
    let subTypeIndex = 0;
    switch (subType) {
      case 'Routine Trash and Debris':
        subTypeIndex = 1;
        break;
      case 'Vegetation Management':
        subTypeIndex = 2;
        break;
      case 'Sediment Removal':
        subTypeIndex = 3;
        break;
      case 'Minor Repair':
        subTypeIndex = 4;
        break;
      case 'Restoration':
        subTypeIndex = 5;
        break;
      default:
        subTypeIndex = 0;
        break;
    }
    datasets.postData(SERVER.UPDATE_APPROVED_BOARD, {project_id, year, extraYears, sponsor, project_type, extraYearsAmounts, subTypeIndex}, datasets.getToken()).then(res => {
      console.log('res', res);
      dispatch(loadColumns());
      dispatch(loadFilters());
    });
  }
}

export const setGlobalSearchValue = (globalSearchValue: string) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_GLOBAL_SEARCH_VALUE, globalSearchValue});
  }
}

export const setProjectDiscussion = (project_id: number, topic_place: string) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.DISCUSSION,{project_id, topic_place}, datasets.getToken()).then(res => {
      dispatch({type: types.SET_DISCUSSIONS, discussion: res?.threads ?? []});
    });
  }
}

export const addDiscussionMessage = (project_id: number, topic_place: string, message: string) => {
  return (dispatch: Function) => {
    datasets.putData(SERVER.DISCUSSION,{project_id, topic_place, message}, datasets.getToken()).then(res => {
      console.log('res', res)
      dispatch(setProjectDiscussion(project_id, topic_place));
    });
  }
}

export const deleteDiscussionMessage = (project_id: number, topic_place: string, message_id: number) => {
  return (dispatch: Function) => {
    datasets.deleteDataWithBody(SERVER.DISCUSSION,{ message_id}, datasets.getToken()).then(res => {
      dispatch(setProjectDiscussion(project_id, topic_place));
    });
  }
}

export const resetDiscussion = () => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_DISCUSSIONS, discussion: []});
  }
}

export const editDiscussionMessage = (message_id: number, message: string, project_id: number, topic_place: string) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.EDIT_DISCUSSION,{ message_id, message}, datasets.getToken()).then(res => {
      dispatch(setProjectDiscussion(project_id, topic_place));
    });
  }
}

export const setCompleteCosts = (completeCosts: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.COMPLETE_COSTS, completeCosts});
  }
}