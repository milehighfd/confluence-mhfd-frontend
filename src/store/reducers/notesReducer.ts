import * as types from '../types/notesTypes';

const initState = {
  notes: []
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
    default: 
        return state;
  }
}

export default notesReducer;