import * as types from '../types/colorListTypes';
import { SERVER } from "../../Config/Server.config";
import { getData, postData, deleteData, getToken, putData } from "../../Config/datasets";


export const getColorsList = () => {
  return (dispatch: Function) => {
    getData(SERVER.GET_NOTES_LIST, getToken()).then(
      (d: any) => {
        console.log("NOTES", d);
        dispatch({type: types.UPDATE_COLOR_LIST, colorsList: d});
      }
    )     
  } 
}

export const createColorList = () => {
        const colorsList: any = {
          label: 'Map Note', 
          color: "#F6BE0F",
          opacity: 1
        };
  return (dispatch: Function) => { 
    postData(SERVER.CREATE_NOTES_LIST, colorsList, getToken()).then(
      (r: any) => {
        if(r){
          dispatch(getColorsList());
        }
      }
    ).catch((e:any) => {
      console.log("ERROr in create ", e);
    })
  }
}

export const updateColorList = (colorList: any) => {
  return (dispatch: Function) => {
    putData(SERVER.EDIT_NOTE_LIST(colorList._id),colorList, getToken()).then(
      (r:any)=>{
        if(r) {
          //maybe this endpoint should return the new complete list instead of the new but meanwhile i am going to call colorslist
          dispatch(getColorsList());
        }
      }
    )
  }
}
export const deleteColorList = (id: any) => {
  return (dispatch: Function) => {
    deleteData(SERVER.DELETE_NOTE_LIST(id), getToken()).then(
      (d: any) => {
        dispatch(getColorsList());
      }
    ).catch((e:any) => {
      console.log("Error in delete", e);
    })
  }
}