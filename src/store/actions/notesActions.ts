import * as types from '../types/notesTypes';
import * as datasets from '../../Config/datasets';
import { SERVER } from '../../Config/Server.config';

export const getNotes = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.LIST_NOTES, datasets.getToken()).then(notes => {
      dispatch({type: types.LIST_NOTES, notes});
    });
  };
};

export const createNote = (note: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.CREATE_NOTE, note, datasets.getToken()).then(note => {
      dispatch({type: types.CREATE_NOTE, note});
    });
  };
};

export const deleteNote = (id: any) => {
  return (dispatch: Function) => {
    datasets.deleteData(SERVER.DELETE_NOTE(id), datasets.getToken()).then(note => {
      dispatch({type: types.DELETE_NOTE, id});
    });
  };
};

export const editNote = (note: any) => {
  return (dispatch: Function) => {
    datasets.putData(SERVER.EDIT_NOTE(note['_id']), note, datasets.getToken()).then(note => {
      dispatch({type: types.EDIT_NOTES, note});
    });
  };
}

export const setOpen = (open: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SIDEBAR_STATUS, open});
  };
}