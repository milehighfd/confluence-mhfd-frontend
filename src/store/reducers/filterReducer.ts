import * as types from '../types/filterTypes';

const initState = {
  filters: [],
  dropdown: {}
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
          dropdown: {
            ...state.dropdown,
            [action.data.field]: action.data.value
          }
        }
      case types.SET_CREATOR_FILTER: 
        return {
          ...state,
          dropdown: {
            ...state.dropdown,
            creator: action.data
          }
        }
      default: 
          return state;
    }
}

export default filterReducer;