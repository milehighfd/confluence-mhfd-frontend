import * as types from '../types/filterTypes';

const initState = {
  filters: []
}

const filterReducer = (state = initState, action : any) => {
    switch(action.type) {
      case types.SET_FILTERS:
        return {
          ...state,
          filters: action.data
        }
      default: 
          return state;
    }
}

export default filterReducer;