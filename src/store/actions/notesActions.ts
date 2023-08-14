import * as types from '../types/notesTypes';
import * as datasets from '../../Config/datasets';
import { SERVER } from '../../Config/Server.config';

export const getAvailableColors = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_AVAILABLE_COLORS, datasets.getToken()).then(availableColors => {
      dispatch({type: types.GET_AVAILABLE_COLORS, availableColors});
    });
  }
}
export const getNotes = (color_id?:any) => {
  return (dispatch: Function, getState: Function) => {
    let idsToParse = color_id;
    const idsToFilter = getState().colorList.idsToFilter;
    if(idsToFilter != '') {
      idsToParse = idsToFilter;
    }
    datasets.getData(SERVER.LIST_NOTES+(idsToParse?`?color_id=${idsToParse}`:''), datasets.getToken()).then(notes => {
      dispatch({type: types.LIST_NOTES, notes});
      dispatch(getAvailableColors());
    });
  };
};

export const setIsnewNote = (isnewnote: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_IS_NEW_NOTE, payload: isnewnote});
  }
}

export const createNote = (note: any, openNotification: any) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.CREATE_NOTE, note, datasets.getToken()).then(note => {
      dispatch({type: types.CREATE_NOTE, note});
      dispatch(getNotes());
      openNotification('Success! Your note was created.', "success");
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
    datasets.putData(SERVER.EDIT_NOTE(note['newnotes_id']), note, datasets.getToken()).then(newNote => {
      newNote.color = note.color
      dispatch({type: types.EDIT_NOTES, note: newNote});
      dispatch(getNotes());
    }).catch((error: any) => {
      console.log('Error on edit note?', error);
    });
  };
}

export const setOpen = (open: boolean) => {
  return (dispatch: Function) => {
    dispatch({type: types.SIDEBAR_STATUS, open});
  };
}

export const createGroup = (name: string) => {
  return (dispatch: Function) => {
    datasets.postData(SERVER.CREATE_GROUP, {group_notes_name: name}, datasets.getToken()).then(group => {
      dispatch({type: types.CREATE_GROUP, group});
      dispatch(getGroups());
    });
  };
}

export const editGroup = (toEditGroup: any) => {
  return (dispatch: Function) => {
    console.log(toEditGroup)
    datasets.putData(SERVER.EDIT_GROUP(toEditGroup['groupnotes_id']), toEditGroup, datasets.getToken()).then(group => {
      dispatch({type: types.EDIT_GROUP, group});
      dispatch(getGroups());
    });
  };
}

export const getGroups = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_GROUPS, datasets.getToken()).then(groups => {
      dispatch({type: types.GET_GROUPS, groups});
    });
  };
}

export const deleteGroup = (id: any) => {
  return (dispatch: Function) => {
    datasets.deleteData(SERVER.DELETE_GROUP(id), datasets.getToken()).then(group => {
      dispatch({type: types.DELETE_GROUP, id});
    });
  }  
}