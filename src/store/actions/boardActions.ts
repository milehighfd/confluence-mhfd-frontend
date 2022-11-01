import * as types from '../types/boardTypes';
import { SERVER } from "../../Config/Server.config";
import { getData, postData, deleteData, getToken, putData } from "../../Config/datasets";

export const setIsOpenModal = (isOpenModal: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_OPEN_MODAL, isOpenModal });
  }     
};
