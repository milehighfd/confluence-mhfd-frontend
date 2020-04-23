import * as types from '../types/ProfileTypes';
import { User } from '../../Classes/TypeList';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

export const getUserInormation = (appUser : User) => {
  return (dispatch : Function) => {
      dispatch({ type: types.GET_USER_INFORMATION, appUser });
  }
}

export const getUserProjects = (options: { requestName?: string, status?: string}) => {
  return (dispatch : Function) => {
    let body = {
      ...options
    }
    datasets.postData(SERVER.USER_PROJECT, body, datasets.getToken()).then( projects => {
      dispatch({ type: types.GET_USER_PROJECTS, projects });
    });
  }
}