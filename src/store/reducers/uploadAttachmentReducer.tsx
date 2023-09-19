import * as types from '../types/uploadAttachmentTypes';

const initState = {
  attachments: {
    attachments: []
  },
  project_id: -1,
  attachment: []
};

const attachmentReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.GET_FILES: 
      return {
        ...state,
        attachments: action.attachments,
      }
    case types.GET_ATTACHMENT: 
      return {
        ...state,
        attachment: action.attachment,
      }
    case types.REMOVE:
      return {
        ...state,
        attachments: {
          attachments: state.attachments.attachments.filter((_: any, i: number) => {
            return i !== action.index;
          })
        },
      }
    case types.CLEAR:
      return initState;
    case types.SET_PROJECT_ID:
      return {
        ...state,
        project_id: action.project_id,
      }
    case types.DELETE_ATTACHMENT:
      return {
        ...state,
        attachment: {
          ...state.attachment,
          attachment: state.attachment.filter((i: any) => {
            return !action.ids.includes(i.project_attachment_id);
          })
        },
      }
    case types.TOGGLE:
      return {
        ...state,
        attachments: {
          attachments: state.attachments.attachments.map((_: any, i: number) => {
            if (i === action.index) {
              return {
                ..._,
                isCover: !_.isCover
              }
            }
            return _;
          })
        },
      }
    default: 
        return state;
  }
}

export default attachmentReducer;