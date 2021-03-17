import { getStreamIntersection } from './../actions/ProjectActions';
import * as types from '../types/ProjectTypes';

const initState = {
  specialLocation: [],
  acquisitionLocation: [],
  userPolygon: [],
  streamIntersected: [],
  isDraw: false,
  streamsIntersectedIds: [],
  isAddLocation: false,
  status: 2
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
      return { 
        ...state, 
        streamsIntersectedIds: action.streamsIntersectedIds
      }
    }
    case types.SET_SAVE:{
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
      
    
    default: 
      return state;
  }
}

export default projectReducer;