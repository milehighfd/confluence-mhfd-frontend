import * as types from '../types/ProfileTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { User } from '../../Classes/TypeList';
import { message } from 'antd';

export const getUserInformation = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.ME, datasets.getToken()).then(user => {
      if (user?._id) {
        dispatch({ type: types.GET_USER_INFORMATION, user });
      }
    });
  }
}

export const saveUserInformation = (user: User) => {
  return (dispatch: Function) => {
    dispatch({ type: types.GET_USER_INFORMATION, user });
  }
}

export const getUserProjects = (options: { requestName?: string, status?: string }) => {
  return (dispatch: Function) => {
    let body = {
      ...options
    }
    datasets.postData(SERVER.USER_PROJECT, body, datasets.getToken()).then(projects => {
      dispatch({ type: types.GET_USER_PROJECTS, projects });
    });
  }
}

export const getCountProjects = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.COUNT_PROJECTS_BY_CREATOR, datasets.getToken()).then(countProjects => {
      dispatch({ type: types.COUNT_PROJECTS, countProjects })
    })
  }
}
export const spinValue = (spin: boolean) => {
  return (dispatch: Function) => {
      dispatch({ type: types.SPIN, spin })
  }
}

export const uploadImage = (files: Array<any>) => {
  return (dispatch: Function) => {
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.USER_UPLOAD_PHOTO, dataForm, datasets.getToken()).then(user => {
      if (user?._id) {
        dispatch({ type: types.GET_USER_INFORMATION, user });
      }
    })
  }
}

export const updateUserInformation = (user: User) => {
  return (dispatch: Function) => {
    datasets.putData(SERVER.UPDATE_USER_INFORMATION, user, datasets.getToken()).then(user => {
      if (user?._id) {
        message.success('your data was successfully updated!');
        dispatch(getUserInformation());
      }
    })
  }
}