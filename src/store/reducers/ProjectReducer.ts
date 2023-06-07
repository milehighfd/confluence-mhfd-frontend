import * as types from '../types/ProjectTypes';
import { MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS, XSTREAMS } from '../../constants/constants';

function shallowEqual(object1: any, object2:any ) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
function ObjInsideArray(object1: any, array:any) {
  if(!array) {
    return false;
  }
  for(let j = 0 ; j < array.length ; ++j) {
    if(shallowEqual(object1, array[j])) {
      return true;
    }
  }
  return false;
}
const initState = {
  editLocation: [],
  specialLocation: [],
  acquisitionLocation: [],
  userPolygon: [],
  streamIntersected: [],
  isDraw: false,
  isDrawCapital: false,
  streamsIntersectedIds: [],
  isAddLocation: false,
  status: 2,
  listComponents: [],
  currentServiceAreaCounty: {},
  listStreams: [],
  componentsFromMap: [],
  independentComponents:[],
  selectedLayers: [MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS, XSTREAMS],
  selectedLayersWR: [],
  selectedLayersCP: [],
  highlightedComponent: {
    type:'',
    value: ''
  },
  highlightedComponents: [],
  highlightedProblem: {
    problemid: undefined, 
    checker: undefined
  },
  highlightedStream: {
    streamId: undefined, 
    checked: undefined
  },
  highlightedStreams: {
    ids: undefined,
    checked: undefined
  },
  problemid: undefined,
  boardProjects: { ids:['-8888'] },
  boardProjectsCreate: { ids:['-8888'] },
  zoomProject: undefined,
  jurisdiction: undefined,
  componentGeom: undefined,
  zoomGeom: undefined,
  nextPageOfCards: 1,
  infiniteScrollItems: Array.from({ length: 20 }),
  infiniteScrollHasMoreItems: true,
  isEdit: false,
  deleteAttachmentsIds: [],
}

const projectReducer = (state = initState, action: any) => {
  if(action.type ==="SET_REDIRECT"){
    console.log( "---", action.status);
  }
  switch(action.type) {
    case types.SET_PROJECT_LOCATION: {
      return {
        ...state, 
        specialLocation: action.specialLocation
      }
    }
    case types.SET_ACQUISITION_LOCATION: {
      return {
        ...state, 
        acquisitionLocation: action.acquisitionLocation
      }
    }
    case types.SET_STREAM_INTERSECTED: {
      return {
        ...state, 
        streamIntersected: action.streamIntersected
      }
    }
    case types.CHANGE_DRAW_STATE: {
      return {
        ...state, 
        isDraw: action.isDraw
      }
    }
    case types.CHANGE_DRAW_STATE_CAPITAL: {
      return {
        ...state, 
        isDrawCapital: action.isDrawCapital
      }
    }
    case types.SET_SAVE:{
      return {
        ...state,
        status: action.status
      }
    }
    case types.SET_EDIT:{
      return {
        ...state,
        status: action.status
      }
    }
    case types.SET_IS_EDIT:{
      return {
        ...state,
        isEdit: action.isEdit
      }
    }
    case types.ADD_LOCATION: {
      return {
        ...state, 
        isAddLocation: action.isAddLocation
      }
    }
    case types.SET_LIST_COMPONENTS: {
      return {
        ...state, 
        listComponents: action.listComponents
      }
    } 
    case types.SET_SERVICEAREA_COUNTY: {
      return {
        ...state, 
        currentServiceAreaCounty: action.currentServiceAreaCounty
      }
    }
    case types.SET_SERVICEAREA_COUNTY_ADD: {
      let newLocation: any = {};
      ['jurisdiction', 'County', 'Service Area'].forEach((key: string) => {
        let set = new Set();
        if (state.currentServiceAreaCounty) {
          let obj: any = state.currentServiceAreaCounty;
          obj[key] && obj[key].forEach((loc: string) => {
            set.add(loc);
          })
        }
        if (action.currentServiceAreaCounty) {
          let obj: any = action.currentServiceAreaCounty;
          obj[key] && obj[key].forEach((loc: string) => {
            set.add(loc);
          })
        }
        newLocation[key] = Array.from(set);
      })

      return {
        ...state, 
        currentServiceAreaCounty: newLocation
      }
    }
    case types.SET_LIST_STREAMS_ADD: {
      let listStreams: any = state.listStreams;
      if(Array.isArray(state.listStreams)){
        return {
          ...state, 
          listStreams: action.listStreams
        }
      } else {
        let newStreams:any = {};
        Object.keys(listStreams).forEach((key:any) => {
          newStreams[key] = newStreams[key]? [...newStreams[key],...listStreams[key]] :[...listStreams[key]] 
        });
        Object.keys(action.listStreams).forEach((key:any) => {
          
          for(let i = 0 ; i < action.listStreams[key].length; ++i) {
            let newStreamObj = action.listStreams[key][i];
            if(!ObjInsideArray(newStreamObj, newStreams[key])){
              newStreams[key] = newStreams[key]? [...newStreams[key],newStreamObj] :[newStreamObj] 
            }
          }
          
        })
        
        return {
          ...state, 
          listStreams: newStreams
        }
      }
    }
    case types.SET_LIST_STREAMS: {
      return {
        ...state, 
        listStreams: action.listStreams 
      }
    }
    case types.SET_STREAMS_IDS_ADD: {
      let array: any[] = [...state.streamsIntersectedIds];
      action.streamsIntersectedIds.forEach((streamIntersected: any) => {
        if (!array.map((r:any) => r.mhfd_code).includes(streamIntersected.mhfd_code)) {
          array.push(streamIntersected);
        }
      })
      return { 
        ...state, 
        streamsIntersectedIds: array
      }
    }
    case types.SET_STREAMS_IDS: {
      return { 
        ...state, 
        streamsIntersectedIds: action.streamsIntersectedIds
      }
    }    
    case types.SET_USER_POLYGON: {
      return {
        ...state, 
        userPolygon: action.userPolygon
      }
    }
    case types.SET_COMPONENTS_MAP: {
      return {
        ...state, 
        componentsFromMap: action.componentsFromMap
      }
    }
    case types.SELECTED_LAYERS: {
      return {
          ...state,
          selectedLayers: action.selectedLayer
      }
    }
    case types.SELECTED_LAYERSWR: {
      return {
          ...state,
          selectedLayersWR: action.selectedLayerWR
      }
    }
    case types.SELECTED_LAYERSCP: {
      return {
          ...state,
          selectedLayersCP: action.selectedLayerCP
      }
    }
    case types.SET_ZOOM_GEOM: {
      return {
        ...state, 
        zoomGeom: action.zoomGeom
      }
    }
    case types.SET_HIGHLIGHTED: {
      return {
        ...state,
        highlightedComponent: action.highlightedComponent
      }
    }
    case types.SET_HIGHLIGHTED_COMPONENTS: {
      return {
        ...state,
        highlightedComponents: action.highlightedComponents
      }
    }
    case types.SET_HIGHLIGHTED_STREAM: {
      return {
        ...state,
        highlightedStream: {streamId: action.highlightedStream, checker: Math.random()}
      }
    }
    case types.SET_HIGHLIGHTED_STREAMS: {
      return {
        ...state,
        highlightedStreams: {ids: action.highlightedStreams, checker: Math.random()}
      }
    }
    case types.SET_HIGHLIGHTED_PROB: {
      return {
        ...state,
        highlightedProblem: {problemid: action.highlightedProblem, checker: Math.random()}
      }
    }
    case types.SET_PROBLEMID: {
      return {
        ...state,
        problemid: action.problemid
      }
    }
    case types.SET_BOARD_PROJECTS: {
      return {
        ...state, 
        boardProjects: action.boardProjects
      }
    }
    case types.SET_BOARD_PROJECTS_CREATE: {
      return {
        ...state, 
        boardProjectsCreate: action.boardProjectsCreate
      }
    }
    case types.SET_ZOOM_PROJECT: {
      return {
        ...state, 
        zoomProject: {...action.zoomProject, random: Math.random()}
      }
    }
    case types.SET_EDIT_LOCATION: {
      return {
        ...state,
        editLocation: action.editLocation
      }
    }
    case types.SET_IND_COMPONENTS: {
      return {
        ...state, 
        independentComponents: action.independentComponents
      }
    }
    case types.SET_JURISDICTION_SPONSOR: {
      return {
        ...state, 
        jurisdiction: action.jurisdiction
      }
    }
    case types.SET_COMPONENT_GEOM: {
      return {
        ...state,
        componentGeom: action.componentGeom
      }
    }
    case types.NEXT_PAGE: {
      return {
        ...state,
        nextPageOfCards: action.nextPageOfCards
      }
    }
    case types.RESET_NEXT_PAGE: {
      return {
        ...state,
        nextPageOfCards: initState.nextPageOfCards
      }
    }
    case types.INFINITE_SCROLL_ITEM: {
      return {
        ...state,
        infiniteScrollItems: action.infiniteScrollItems
      }
    }
    case types.RESET_INFINITE_SCROLL_ITEM: {
      return {
        ...state,
        infiniteScrollItems: initState.infiniteScrollItems
      }
    }
    case types.INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS: {
      return {
        ...state,
        infiniteScrollHasMoreItems: action.infiniteScrollHasMoreItems
      }
    }
    case types.RESET_INFINITE_SCROLL_ITEM_HAS_MORE_ITEMS: {
      return {
        ...state,
        infiniteScrollHasMoreItems: initState.infiniteScrollHasMoreItems
      }
    }
    case types.SET_DELETE_ATTACHMENTS_IDS: {
      return {
        ...state,
        deleteAttachmentsIds: action.deleteAttachmentsIds
      }
    }
    default: 
      return state;
  }
}

export default projectReducer;
