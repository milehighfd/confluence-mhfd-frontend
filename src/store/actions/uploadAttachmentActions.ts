import * as types from '../types/uploadAttachmentTypes';
import { SERVER } from '../../Config/Server.config';
import * as datasets from '../../Config/datasets';

export const getAllAttachment = (url: string) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_ALL_ATTACHMENTS + '?' + url, datasets.getToken()).then(attachments => {
      if (attachments?.data) {
        dispatch({ type: types.GET_FILES, attachments });
      }
    });
  }
}

export const clear = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.CLEAR })
  }
}

export const getAttachment = (idProject: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_ALL_ATTACHMENTS + '?projectid=' + idProject , datasets.getToken()).then(attachments => {
      if (attachments?.data) {
        dispatch({ type: types.GET_FILES, attachments });
      }
    });
  }
}

export const toggleAttachmentCover = (index: number, _id: string, value: boolean) => {
  return (dispatch: Function) => {
    datasets.putData(`${SERVER.TOGGLE_ATTACHMENT_PUT}/${_id}/${value}`, {}, datasets.getToken()).then(res => {
      dispatch({ type: types.TOGGLE, index });
    })
  }
}

export const removeAttachment = (ids: Array<any>) => {
  return (dispatch: Function) => {
    datasets.deleteDataWithBody(SERVER.DELETE_ATTACHMENT , {ids} , datasets.getToken()).then(res => {      
      dispatch({ type: types.DELETE_ATTACHMENT, ids });
    });
  }
}

export const setProjectId = (project_id: number) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SET_PROJECT_ID, project_id });
  }
}