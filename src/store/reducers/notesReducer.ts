import * as types from '../types/notesTypes';

const initState = {
  notes: [],
  groups: [],
  open: false,
  availableColors: [],
  isnewnote: false
};

const notesReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.SET_IS_NEW_NOTE:
      return {
        ...state,
        isnewnote: action.payload
      }
    case types.CREATE_NOTE: 
      return {
        ...state,
        notes: [...state.notes, action.note],
        isnewnote: true
      }
    case types.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group]
      }
    case types.DELETE_GROUP:
      return {
        ...state,
        notes: state.notes.filter((note: any) => note.group_id !== action.id),
        groups: state.groups.filter(group => {
          return group['groupnotes_id'] !== action.id;
        })
      }
    case types.GET_GROUPS:
      return {
        ...state,
        groups: action.groups
      }
    case types.EDIT_GROUP:
      return {
        ...state,
        groups: state.groups.map(group => {
          if (group['groupnotes_id'] === action.group['groupnotes_id']) {
            return action.group;
          }
          return group;
        })
      }
    case types.DELETE_NOTE: 
      return {
        ...state,
        notes: state.notes.filter(note => {
          return note['newnotes_id'] !== action.id
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
          if (note['newnotes_id'] === action.note['newnotes_id']) {
            return action.note;
          }
          return note;
        })
      }
    case types.GET_AVAILABLE_COLORS:
      return {
        ...state,
        availableColors: action.availableColors
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