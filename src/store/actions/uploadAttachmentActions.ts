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

export const uploadFile = (files: Array<any>, url: string) => {
  return (dispatch: Function) => {
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.UPLOAD_FILE, dataForm, datasets.getToken()).then(result => {
      if (result?.message === 'ok') {
        dispatch(getAllAttachment(url));
      }
    });
  }
}