import * as types from '../types/colorListTypes';
const initState = {
  colorsList: []
}

const colorListReducer = (state = initState, action: any) => {
  switch(action.type) {
    case types.UPDATE_COLOR_LIST: 
      return {
        ...state, 
        colorsList: action.colorsList
      }
    default: 
      return state
  }
}

export default colorListReducer;