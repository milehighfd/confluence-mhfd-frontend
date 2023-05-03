import * as types from '../types/usersTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import UnauthorizedError from 'Errors/UnauthorizedError';
import { push } from 'connected-react-router';

export const resetTimesLogin = () => ({ type: types.RESET_TIMES_LOGIN });

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
    datasets.getData(SERVER.TIMES_LOGIN, datasets.getToken())
      .then(times => {
        dispatch({ type: types.TIMES_LOGIN, times: times.times});
      })
      .catch(err => {
        if (err instanceof UnauthorizedError) {
          dispatch(push('/'));
        }
        console.error('This is the error ' +  err.message);
      });
  }
}

export const saveBoardProjecttype = (projecttype: string) => {
  return (dispatch: Function) => {
    dispatch({ type: types.CHANGE_BOARD_PROJECT_TYPE, projecttype: projecttype });
  }
}
