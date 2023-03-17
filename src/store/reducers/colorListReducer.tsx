import * as types from '../types/colorListTypes';
const initState = {
  colorsList: [],
  idsToFilter: '',
  updated: false
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
    case types.SET_UPDATED_VALUE:
      return {
        ...state, 
        updated: action.updated
      }
    default: 
      return state
  }
}

export default colorListReducer;