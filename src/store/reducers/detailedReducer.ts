import * as types from '../types/detailedTypes';
const initState = {
  detailed: {
  },
  spin: false,
  displayModal: false
}

const filterReducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.REPLACE_DETAILED_PAGE:
      return {
        ...state,
        detailed: action.detailed,
        spin: true
      }
    case types.REPLACE_VALUE_SPIN:
      return {
        ...state,
        spin: false
      }
    case types.DISPLAY_MODAL:
      return {
        ...state,
        displayModal: action.spin
      }
    default:
      return state;
  }
}

export default filterReducer;