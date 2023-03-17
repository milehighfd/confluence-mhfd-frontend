import * as types from '../types/colorListTypes';
import { SERVER } from "../../Config/Server.config";
import { getData, postData, deleteData, getToken, putData } from "../../Config/datasets";
import moment, { now } from 'moment';

export const getColorsList = () => {
  return (dispatch: Function) => {
    getData(SERVER.GET_NOTES_LIST, getToken()).then(
      (d: any) => {
        dispatch({type: types.UPDATE_COLOR_LIST, colorsList: d});
      }
    )     
  } 
}

export const createColorList = () => {
        const colorsList: any = {
          label: moment().format('MMMM Do, YYYY [at] h:mm:ss a'), 
          color: "#FFE121",
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
    putData(SERVER.EDIT_NOTE_LIST(colorList.color_id),colorList, getToken()).then(
      (r:any)=>{
        if(r) {
          if (r.error) {
            dispatch({ type: types.SET_UPDATED_VALUE, updated: false});
            alert('The proposed label already exists in your map. Please label your note with the original label or create a new label.' );
            
          } else {
            dispatch({ type: types.SET_UPDATED_VALUE, updated: true});
            dispatch(getColorsList());
          }
          
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
export const setIdsFilter = (idsToFilter: any) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_IDS_FILTER, idsToFilter});
  }
}