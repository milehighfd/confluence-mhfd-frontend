import * as types from '../types/filterTypes';

const initState = {
  filters: {},
  dropdowns: {},
  userFiltered: {}
}

const filterReducer = (state = initState, action : any) => {
    switch(action.type) {
      // TODO: eliminar
      case types.SET_FILTERS:
        return {
          ...state,
          filters: action.data
        }
      // TODO: eliminar
      case types.SET_DROPDOWN_FILTERS: 
        return {
          ...state,
          dropdowns: {
            ...state.dropdowns,
            ...action.dropdownFilters
          }
        }
        // TODO: eliminar
      case types.SET_CREATOR_FILTER: 
        return {
          ...state,
          dropdowns: {
            ...state.dropdowns,
            creator: action.data
          }
        }
        // TODO: eliminar
      case types.SET_USERS_DATA: 
        return {
          ...state,
          userFiltered: {
            ...action.data
          }
        }
      default: 
          return state;
    }
}

export default filterReducer;