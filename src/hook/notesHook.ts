import { useSelector, useDispatch } from 'react-redux';
import {
  createGroup,
  createNote,
  deleteGroup,
  deleteNote,
  editGroup,
  editNote,
  getAvailableColors,
  getGroups,
  getNotes,
  setIsnewNote,
  setOpen
} from '../store/actions/notesActions';

export const useNotesState = () => useSelector(
  (state: { notes: any }) => state.notes
);

export const useNoteDispatch = () => {
   const dispatch = useDispatch();
   return {
      getNotes: (color_id?:any) => {
        dispatch(getNotes(color_id));
      },
      createNote: (note: any) => {
        dispatch(createNote(note));
      },
      deleteNote: (id: any) => {
        dispatch(deleteNote(id));
      },
      editNote: (note: any) => {
        dispatch(editNote(note));
      },
      getGroups: () => {
        dispatch(getGroups());
      },
      createGroup: (group: any) => {
        dispatch(createGroup(group));
      },
      editGroup: (group: any) => {
        dispatch(editGroup(group));
      },
      deleteGroup: (id: any) => {
        dispatch(deleteGroup(id));
      },
      setOpen: (open: boolean) => {
        dispatch(setOpen(open));
      },
      getAvailableColors: () => {
        dispatch(getAvailableColors())
      },
      setIsnewNote: (isnewnote: boolean) => {
        dispatch(setIsnewNote(isnewnote))
      }
   }
};
