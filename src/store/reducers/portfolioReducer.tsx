import { DEFAULT_GROUP } from '../../routes/portfolio-view/components/ListUtils';
import * as types from '../types/portfolioTypes';
const initState = {
  searchWord: '',
  currentGroup: DEFAULT_GROUP,
  favorites: [],
  collapsePhase: false,
}

const portfolioReducer = (state = initState, action: any) => {
  switch(action.type) {
    case types.SET_SEARCH_WORD: 
      return {
        ...state, 
        searchWord: action.payload
      }
    case types.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload
      }
    case types.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    case types.PM_DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((_: any) => _.project_id !== action.payload)
      };
    case types.PM_ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case types.SET_COLLAPSE_PHASE:
      return {
        ...state,
        collapsePhase: action.payload
      };
    default: 
      return state
  }
}

export default portfolioReducer;
