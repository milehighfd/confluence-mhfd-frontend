import * as types from '../types/colorListTypes';
const initState = {
  colorsList: [],
  idsToFilter: ''
}

const colorListReducer = (state = initState, action: any) => {
  switch(action.type) {
    case types.UPDATE_COLOR_LIST: 
      return {
        ...state, 
        colorsList: action.colorsList
      }
    case types.SET_IDS_FILTER:
      return {
        ...state,
        idsToFilter: action.idsToFilter
      }
    default: 
      return state
  }
}

export default colorListReducer;