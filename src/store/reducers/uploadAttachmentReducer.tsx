import * as types from '../types/uploadAttachmentTypes';

const initState = {
  attachments: [],
  loading: false
};

const attachmentReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.GET_FILES: 
      return {
        ...state,
        attachments: action.attachments,
        loading: false
      }
    case types.LOADING: 
      return {
        ...state,
        loading: action.loading
      }
    default: 
        return state;
  }
}

export default attachmentReducer;