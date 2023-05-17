import * as types from '../types/financialTypes';

const initState = {
    financialInformation:[]
};

const financialReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.GET_PROJECT_FINANCIAL_BY_ID:
      return {
        ...state,
        financialInformation: action.financialInformation
      }
    default: 
        return state;
  }
}

export default financialReducer;