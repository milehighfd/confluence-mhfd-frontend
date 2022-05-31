import * as types from '../types/ProfileTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { User } from '../../Classes/TypeList';
import { message } from 'antd';
import store from '..';
//import { dispatch } from 'd3';

export const getUserInformation = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.ME, datasets.getToken()).then(user => {
      if (user?._id) {
        console.log('my user ', user);
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

export const getGroupOrganization = () => {

  return (dispatch: Function) => {
    datasets.getData(SERVER.GROUP_ORGANIZATION, datasets.getToken()).then(data => {
      dispatch({ type: types.GET_GROUP_ORGANIZATION, data });
    })
  }
}

export const resetProfile = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_PROFILE });
  }
}