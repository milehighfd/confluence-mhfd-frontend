import * as types from '../types/ProfileTypes';
import { User } from '../../Classes/TypeList';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

export const getUserInormation = (appUser: User) => {
  return (dispatch: Function) => {
    dispatch({ type: types.GET_USER_INFORMATION, appUser });
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

export const uploadImage = (files: Array<any>) => {
  return (dispatch: Function) => {
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.USER_UPLOAD_PHOTO, dataForm, datasets.getToken()).then(res => {
      getUserPhoto();
      // dispatch({ type: types.UPLOAD_PHOTO, res })
    })
  }
}

export const getUserPhoto = () => {
  console.log('dsadsad sda sad asd sadsads ad');
  
  return (dispatch: Function) => {
    console.log('llego aqui no mames');
    
    datasets.getData(SERVER.ME, datasets.getToken()).then(user => {
      const userImage = user.photo;
      console.log('userImage: ', user);
      dispatch({ type: types.GET_PHOTO, userImage })
    })
  }
}