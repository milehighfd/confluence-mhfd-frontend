import * as types from '../types/ProjectTypes';
import { User } from '../../Classes/User';

const initState = {
  specialLocation: [],
  acquisitionLocation: []
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
      default: 
        return state;
    }
}

export default projectReducer;