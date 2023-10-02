import * as types from '../types/financialTypes';

const initState = {
    financialInformation: [],
    clickOpenPopup: false
};

const financialReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.GET_PROJECT_FINANCIAL_BY_ID:
      return {
        ...state,
        financialInformation: action.financialInformation
      }
    case types.SET_CLICK_OPEN_POPUP:
    return {
      ...state,
      clickOpenPopup: action.clickOpenPopup
    }
    default: 
        return state;
  }
}

export default financialReducer;