import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserInformation, updateUserInformation } from '../store/actions/ProfileActions';
import { User } from '../Classes/TypeList';
import { getTimesLogin } from '../store/actions/usersActions';

interface selectProfileState {
   timesLogged: number,
   groupOrganization: any
 }
 
 
 let createSelectorHack: any = createSelector;
 
 const selectProfileStates: ParametricSelector<RootState, undefined, selectProfileState> =
   createSelectorHack(
       (state: any) => state.users.timesLogged,
       (state: any) => state.profile.groupOrganization,
       //state => state.map.paramFilters,
       (timesLogged: number, groupOrganization: any) => ({
         timesLogged, groupOrganization   
      })
     );
 
 export const useProfileState = () => {
   return useSelector((state: RootState) => selectProfileStates(state, undefined));
 }
 


export const useProfileDispatch = () => {
   const dispatch = useDispatch();
   return {
      saveUserInformation: (user: User) => {
         dispatch(saveUserInformation(user));
      },
      updateUserInformation: (user: User) => {
         dispatch(updateUserInformation(user));
      },
      getTimesLogin: () => {
         dispatch(getTimesLogin());
      }
   }
}