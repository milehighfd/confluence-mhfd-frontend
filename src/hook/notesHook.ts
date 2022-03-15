import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { FilterNamesTypes } from '../Classes/MapTypes';
import { removeFilter } from '../store/actions/filterActions';
import { createGroup, createNote, deleteGroup, deleteNote, editGroup, editNote, getAvailableColors, getGroups, getNotes, setOpen } from '../store/actions/notesActions';

interface notesState {
  notes: [],
  groups: [],
  open: boolean,
  availableColors: []
}

 
 
 let createSelectorHack: any = createSelector;
 
 const selectNotes: ParametricSelector<RootState, undefined, notesState> =
   createSelectorHack(
       (state: any) => state.notes.notes,
       (state: any) => state.notes.groups,
       (state: any) => state.notes.open,
       (state: any) => state.notes.availableColors,
       //state => state.map.paramFilters,
       (notes: [], groups: [], open: boolean, availableColors: []) => ({
         notes,
         groups,
         open,
         availableColors
      })
     );
 
 export const useNotesState = () => {
   return useSelector((state: RootState) => selectNotes(state, undefined));
 };
 


export const useNoteDispatch = () => {
   const dispatch = useDispatch();
   return {
      removeFilter: (filter: FilterNamesTypes) => {
         dispatch(removeFilter(filter));
      },
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
        console.log(note);
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
      }
   }
};