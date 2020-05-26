import * as types from '../types/uploadAttachmentTypes';

const initState = {
  attachments: []
};

const attachmentReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.GET_FILES: 
      return {
        ...state,
        attachments: action.attachments
      }
    default: 
        return state;
  }
}

export default attachmentReducer;