import { ParametricSelector, createSelector } from 'reselect';
import { RootState } from '../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserInformation, updateUserInformation } from '../store/actions/ProfileActions';
import { User } from '../Classes/TypeList';

export const useProfileDispatch = () => {
   const dispatch = useDispatch();
   return {
      saveUserInformation: (user: User) => {
         dispatch(saveUserInformation(user));
      },
      updateUserInformation: (user: User) => {
         dispatch(updateUserInformation(user));
      }
   }
}