import * as types from '../types/portfolioTypes';
const initState = {
  searchWord: ''
}

const portfolioReducer = (state = initState, action: any) => {
  switch(action.type) {
    case types.SET_SEARCH_WORD: 
      return {
        ...state, 
        searchWord: action.payload
      }
    default: 
      return state
  }
}

export default portfolioReducer;