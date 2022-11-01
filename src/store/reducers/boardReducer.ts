import * as types from '../types/boardTypes';

const initState = {
  isOpenModal: false
};

const boardReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.SET_OPEN_MODAL:
      return {
        ...state,
        isOpenModal: action.isOpenModal
      }
    default: 
        return state;
  }
}

export default boardReducer;