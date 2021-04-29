import * as types from '../types/uploadAttachmentTypes';

const initState = {
  attachments: [],
  loading: false.valueOf,
  _id: "",
  value: "",
  filename: "",
  mimetype: "",
  user_id: "",
  register_date: "",
  filesize: 0,
  project_id: "",
  createdAt: "",
  updatedAt: "",
  attachment: {}
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
    case types.GET_ATTACHMENT: 
      return {
        ...state,
        attachment: action.attachment,
        loading: false
      }
    default: 
        return state;
  }
}

export default attachmentReducer;