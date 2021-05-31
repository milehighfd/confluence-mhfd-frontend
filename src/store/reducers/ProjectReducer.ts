import { getStreamIntersection, setComponentsFromMap } from './../actions/ProjectActions';
import * as types from '../types/ProjectTypes';
import { PROJECTS_MAP_STYLES, PROBLEMS_TRIGGER, STREAMS_FILTERS, MHFD_BOUNDARY_FILTERS, XSTREAMS } from '../../constants/constants';

const initState = {
  editLocation: [],
  specialLocation: [],
  acquisitionLocation: [],
  userPolygon: [],
  streamIntersected: [],
  isDraw: false,
  streamsIntersectedIds: [],
  isAddLocation: false,
  status: 2,
  listComponents: [],
  currentServiceAreaCounty: {},
  listStreams: [],
  componentsFromMap: [],
  independentComponents:[],
  selectedLayers: [MHFD_BOUNDARY_FILTERS, XSTREAMS],
  selectedLayersWR: [MHFD_BOUNDARY_FILTERS],
  highlightedComponent: {
    type:'',
    value: ''
  },
  highlightedProblem: {
    problemid: undefined, 
    checker: undefined
  },
  highlightedStream: {
    streamId: undefined, 
    checked: undefined
  },
  problemid: undefined,
  boardProjects: {cartoids:['-8888'], ids:['-8888'] },
  zoomProject: undefined,
  jurisdiction: undefined,
  componentGeom: undefined,
  zoomGeom: undefined
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
    case types.SET_STREAMS_IDS: {
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
    case types.SET_LIST_STREAMS: {
      let listStreams: any = state.listStreams;
      return {
        ...state, 
        listStreams: Array.isArray(state.listStreams) ? action.listStreams : {
          ...listStreams,
          ...action.listStreams
        }
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

    case types.SET_HIGHLIGHTED_STREAM: {
      return {
        ...state,
        highlightedStream: {streamId: action.highlightedStream, checker: Math.random()}
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
    case types.SET_ZOOM_PROJECT: {
      return {
        ...state, 
        zoomProject: action.zoomProject
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
    default: 
      return state;
  }
}

export default projectReducer;