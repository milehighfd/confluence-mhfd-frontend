import * as types from '../types/notesTypes';

const initState = {
  notes: [],
  open: false
};

const notesReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.CREATE_NOTE: 
      return {
        ...state,
        notes: [...state.notes, action.note]
      }
    case types.DELETE_NOTE: 
      return {
        ...state,
        notes: state.notes.filter(note => {
          return note['_id'] !== action.id
        })
      }
    case types.LIST_NOTES: 
      return {
        ...state,
        notes: action.notes
      }
    case types.EDIT_NOTES:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note['_id'] === action.note['_id']) {
            return action.note;
          }
          return note;
        })
      }
    case types.SIDEBAR_STATUS: 
      return {
        ...state,
        open: action.open
      }
    default: 
        return state;
  }
}

export default notesReducer;