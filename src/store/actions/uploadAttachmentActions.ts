import * as types from '../types/uploadAttachmentTypes';
import { SERVER } from '../../Config/Server.config';
import * as datasets from '../../Config/datasets';
import { message } from 'antd';

export const getAllAttachment = (url: string) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_ALL_ATTACHMENTS + '?' + url, datasets.getToken()).then(attachments => {
      if (attachments?.data) {
        dispatch({ type: types.GET_FILES, attachments });
      } else {
        dispatch(setLoading(false));
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
        console.log(attachments, "ATTAAAA")
        dispatch({ type: types.GET_FILES, attachments });
      } else {
        dispatch(setLoading(false));
      }
    });
  }
}
export const toggleAttachment = (index: number, _id: string) => {
  return (dispatch: Function) => {
    datasets.putData(`${SERVER.TOGGLE_ATTACHMENT}/${_id}`, {}, datasets.getToken()).then(res => {
      dispatch({ type: types.TOGGLE, index });
    })
  }
}

export const deleteAttachment = (index: number, _id: string) => {
  return (dispatch: Function) => {
    datasets.deleteData(`${SERVER.DELETE_ATTACHMENT}/${_id}`, datasets.getToken()).then(res => {
      if (res?.message) {
        dispatch({ type: types.REMOVE, index });
      } else {
        dispatch(setLoading(false));
      }
    })
  }
}

export const getAttachmentByProject = (idProject: any) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_ATTACHMENTS_BY_PROJECT(idProject) , datasets.getToken()).then(attachments => {
      dispatch({ type: types.GET_FILES, attachments });
    });
  }
}

export const uploadFile = (files: Array<any>, url: string) => {
  return (dispatch: Function) => {
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.UPLOAD_FILE, dataForm, datasets.getToken()).then(result => {
      if (result?.message === 'upload files') {
        dispatch(getAllAttachment(url));
      } else {
        dispatch(setLoading(false));
      }
    });
  }
}


export const removeAttachment = (id: string, url: string) => {
  return (dispatch: Function) => {
    datasets.deleteData(SERVER.DELETE_ATTACHMENT + '/' + id, datasets.getToken()).then(res => {
      if (res?.message) {
        message.info('File removed succesfully');
        dispatch(getAllAttachment(url));
      } else {
        dispatch(setLoading(false));
      }
    });
  }
}

export const setLoading = (loading: boolean) => {
  return (dispatch: Function) => {
    dispatch({ type: types.LOADING, loading });
  }
}