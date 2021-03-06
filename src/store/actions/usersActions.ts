import * as types from '../types/usersTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { dispatch } from 'd3';
// import { SERVER } from "../../Config/Server.config";
// import * as datasets from "../../Config/datasets";

export const saveUserActivated = (users: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SAVE_USER_ACTIVATED, users });
  }
}

export const deleteUserActivated = (index: number) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const users = [...state.users.usersActivated];
    users.splice(index, 1);
    dispatch({ type: types.DELETE_USER_ACTIVATED, users });
  }
}

export const saveUserPending = (users: any) => {
  return (dispatch: Function) => {
    dispatch({ type: types.SAVE_USER_PENDING, users });
  }
}
export const deleteUserPending = (index: number) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const users = [...state.users.usersPending];
    users.splice(index, 1);
    dispatch({ type: types.DELETE_USER_PENDING, users });
  }
}

export const addUserActivated = (user: any) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const users = [...state.users.usersActivated];
    users.push(user);
    dispatch({ type: types.DELETE_USER_ACTIVATED, users });
  }
}

export const addUserPending = (user: any) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const users = [...state.users.usersPending];
    users.push(user);
    dispatch({ type: types.DELETE_USER_PENDING, users });
  }
}

export const getUserActivity = ( url: string) => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.USER_ACTIVITY + url, datasets.getToken()).then(res => {
      if(res?.data) {
        dispatch({ type: types.USER_ACTIVITY, res });
      }
    });
  }
}

export const getAllUserActivity = () => {
  return (dispatch: Function) => {
    datasets.getDataOctet(SERVER.USER_ACTIVITY_CSV, datasets.getToken()).then(res => {
      const value = "" + res;
      let csvData = new Blob([value], {type: 'text/csv;charset=utf-8;'});
      let csvURL = window.URL.createObjectURL(csvData);
      let tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'activity.csv');
      tempLink.click();
      dispatch({ type: 'download', res });
    });
  }
}

export const getTimesLogin = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.TIMES_LOGIN, datasets.getToken()).then(times => {
      dispatch({ type: types.TIMES_LOGIN, times: times.times});
    });
  }
}