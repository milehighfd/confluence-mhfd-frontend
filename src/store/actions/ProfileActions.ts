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
    // let body = {
    //   ...options
    // }
    // datasets.postData(SERVER.USER_PROJECT, body, datasets.getToken()).then(projects => {
    //   dispatch({ type: types.GET_USER_PROJECTS, projects });
    // });
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
const options = (options: { keyword: string, column: string, order: string }, coordinates: string) => {
  // return ((options.keyword ? ('name=' + options.keyword + '&') : '') + 'sortby=' + options.column + '&sorttype=' + options.order + '&bounds=' + coordinates);
  return {
    name: options.keyword,
    sortby: options.column,
    sorttype: options.order,
    bounds: coordinates,
    isproblem: true
  }
}
const optionsProject = (options: { keyword: string, column: string, order: string, projecttype?: String }, coordinates: string, projecttype?: String ) => {
  return projecttype? {
      name: options.keyword,
      sortby: options.column,
      sorttype: options.order,
      bounds: coordinates,
      projecttype
    }:{
      name: options.keyword,
      sortby: options.column,
      sorttype: options.order,
      bounds: coordinates
    } 
}
const getUserCoordinates = () => {
  const user = store.getState().profile.userInformation;
  
  let bottomLongitude = user.polygon[0][0];
  let bottomLatitude = user.polygon[0][1];
  let topLongitude = user.polygon[0][0];
  let topLatitude = user.polygon[0][1];
  for (let index = 0; index < user.polygon.length; index++) {
    const element = user.polygon[index];
    if (bottomLongitude > element[0]) {
      bottomLongitude = element[0];
    }
    if (topLongitude < element[0]) {
      topLongitude = element[0];
    }
    if (bottomLatitude > element[1]) {
      bottomLatitude = element[1];
    }
    if (topLatitude < element[1]) {
      topLatitude = element[1];
    }
  }
  return bottomLongitude + ',' + bottomLatitude + ',' + topLongitude + ',' + topLatitude;
}
export const getUserProblem = (option: { keyword: string, column: string, order: string }) => {
  return async (dispatch: Function) => {
    dispatch({ type: types.SET_VALUE_LOADER_PROBLEM, spin: true });
    const coordinates = await getUserCoordinates();
    datasets.postData(SERVER.GALLERY_PROJECTS, options(option, coordinates), datasets.getToken()).then(problems => {
      if (problems?.length >= 0) {
        dispatch({ type: types.GET_USER_PROBLEMS, problems });
      }
      dispatch({ type: types.SET_VALUE_LOADER_PROBLEM, spin: false });
    });
  }
}
export const getUserProject = (option: { keyword: string, column: string, order: string }, projecttype?: string ) => {
  return async (dispatch: Function) => {
    dispatch({ type: types.SET_VALUE_LOADER_PROJECT, spin: true });
    const coordinates = await getUserCoordinates();
    datasets.postData(SERVER.GALLERY_PROJECTS, optionsProject(option, coordinates, projecttype), datasets.getToken()).then(projects => {
      if (projects?.length >= 0) {
        dispatch({ type: types.GET_USER_PROJECTS, projects });
      }
      dispatch({ type: types.SET_VALUE_LOADER_PROJECT, spin: false });
    });
  }
}
export const getAllUserProjects = () => {
  return async (dispatch: Function) => {
    dispatch({ type: types.SET_VALUE_LOADER_ALL, spin: true });
    const coordinates = await getUserCoordinates();
    datasets.postData(SERVER.GALLERY_PROJECTS, { bounds: coordinates}, datasets.getToken()).then(projects => {
      if (projects?.length >= 0) {
        dispatch({ type: types.GET_ALL_USER_PROJECTS, projects });
      }
      dispatch({ type: types.SET_VALUE_LOADER_ALL, spin: false });
    });
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
      dispatch({type: types.GET_GROUP_ORGANIZATION, data});
    })
  }
}

export const resetProfile = () => {
  return (dispatch: Function) => {
    dispatch({ type: types.RESET_PROFILE });
  }
}