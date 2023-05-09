import { DEFAULT_GROUP } from '../../routes/portfolio-view/components/ListUtils';
import * as types from '../types/portfolioTypes';
const initState = {
  searchWord: '',
  currentGroup: DEFAULT_GROUP
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
    default: 
      return state
  }
}

export default portfolioReducer;