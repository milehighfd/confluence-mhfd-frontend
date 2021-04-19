import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { FilterNamesTypes } from '../Classes/MapTypes';
import { removeFilter } from '../store/actions/filterActions';
import { createNote, deleteNote, editNote, getNotes, setOpen } from '../store/actions/notesActions';

interface notesState {
  notes: [],
  open: boolean
}

 
 
 let createSelectorHack: any = createSelector;
 
 const selectNotes: ParametricSelector<RootState, undefined, notesState> =
   createSelectorHack(
       (state: any) => state.notes.notes,
       (state: any) => state.notes.open,
       //state => state.map.paramFilters,
       (notes: [], open: boolean) => ({
         notes,
         open
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
      getNotes: () => {
        dispatch(getNotes());
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
      setOpen: (open: boolean) => {
        dispatch(setOpen(open));
      }
   }
};