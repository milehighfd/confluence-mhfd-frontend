import { getStreamIntersection } from './../actions/ProjectActions';
import * as types from '../types/ProjectTypes';
import { User } from '../../Classes/User';

const initState = {
  specialLocation: [],
  acquisitionLocation: [],
  userPolygon: [],
  streamIntersected: []
}

const projectReducer = (state = initState, action: any) => {
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
      default: 
        return state;
    }
}

export default projectReducer;