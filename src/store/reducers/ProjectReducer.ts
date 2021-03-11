import * as types from '../types/ProjectTypes';
import { User } from '../../Classes/User';

const initState = {
  specialLocation: []
}

const projectReducer = (state = initState, action: any) => {
    switch(action.type) {
      case types.SET_LOCATION: {
        return {
          ...state, 
          specialLocation: action.specialLocation
        }
      }
      default: 
        return state;
    }
}

export default projectReducer;