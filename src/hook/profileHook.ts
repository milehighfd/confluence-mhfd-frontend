import { useSelector, useDispatch } from 'react-redux';
import {
   saveUserInformation,
   updateUserInformation,
   getGroupOrganization,
   uploadImage,
   spinValue,
   getCountProjects
} from '../store/actions/ProfileActions';
import { User } from '../Classes/TypeList';
import { getTimesLogin } from '../store/actions/usersActions';

export const useProfileState = () => useSelector(
   (state: { profile: any }) => state.profile
);

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
      },
      getGroupOrganization: () => {
         dispatch(getGroupOrganization());
      },
      uploadImage: (files: Array<any>) => {
         dispatch(uploadImage(files));
      },
      spinValue: (spin: boolean) => {
         dispatch(spinValue(spin));
      },
      getCountProjects: () => {
         dispatch(getCountProjects());
      }
   };
};
