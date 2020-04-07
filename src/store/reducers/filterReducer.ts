import * as types from '../types/filterTypes';

const initState = {
  filters: [],
  dropdowns: {}
}

const filterReducer = (state = initState, action : any) => {
    switch(action.type) {
      case types.SET_FILTERS:
        return {
          ...state,
          filters: action.data
        }
      case types.SET_DROPDOWN_FILTERS: 
        return {
          ...state,
          dropdowns: {
            ...state.dropdowns,
            ...action.dropdownFilters
          }
        }
      case types.SET_CREATOR_FILTER: 
        return {
          ...state,
          dropdowns: {
            ...state.dropdowns,
            creator: action.data
          }
        }
      default: 
          return state;
    }
}

export default filterReducer;