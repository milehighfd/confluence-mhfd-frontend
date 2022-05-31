import { useSelector, useDispatch } from 'react-redux';
import {
   getDropdownFilters,
   getUserFilters,
   sortProjects
} from '../store/actions/filterActions';

export const useFilterState = () => {
   return useSelector((state: { filter: any }) => state.filter);
}

export const useFilterDispatch = () => {
   const dispatch = useDispatch();
   return {
      // TODO: eliminar
      getDropdownFilters: (items : Array<string>) => {
         dispatch(getDropdownFilters(items));
      },
      // TODO: eliminar
      getUserFilters: (id : string, userName: string) => {
         dispatch(getUserFilters(id, userName));
      },
      // TODO: eliminar
      sortProjects: (sortBy : string) => {
         dispatch(sortProjects(sortBy));
      }
   }
}
