import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserInformation, updateUserInformation } from '../store/actions/ProfileActions';
import { User } from '../Classes/TypeList';
import { getTimesLogin } from '../store/actions/usersActions';
import { FilterNamesTypes } from '../Classes/MapTypes';
import { removeFilter } from '../store/actions/filterActions';

interface selectFilterState {
  filters: any
}

 
 
 let createSelectorHack: any = createSelector;
 
 const selectFilters: ParametricSelector<RootState, undefined, selectFilterState> =
   createSelectorHack(
       (state: any) => state.filter.filters,
       //state => state.map.paramFilters,
       (filters: any) => ({
         filters   
      })
     );
 
 export const useFilterState = () => {
   return useSelector((state: RootState) => selectFilters(state, undefined));
 }
 


export const useFilterDispatch = () => {
   const dispatch = useDispatch();
   return {
      removeFilter: (filter: FilterNamesTypes) => {
         dispatch(removeFilter(filter));
      }
   }
}