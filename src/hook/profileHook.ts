import { useSelector, useDispatch } from 'react-redux';
import {
   saveUserInformation,
   updateUserInformation,
   getGroupOrganization,
   getGroupOrganizationNoGeom,
   uploadImage,
   spinValue
} from '../store/actions/ProfileActions';
import { User } from '../Classes/TypeList';
import { getTimesLogin, resetTimesLogin, saveBoardProjecttype } from '../store/actions/usersActions';

export const useProfileState = () => useSelector(
   (state: { profile: any }) => state.profile
);

export const useMyUser = () => useSelector(
   (state: { users: any } ) => state.users
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
      resetTimesLogin: () => {
         dispatch(resetTimesLogin());
      },
      getTimesLogin: () => {
         dispatch(getTimesLogin());
      },
      getGroupOrganization: () => {
         dispatch(getGroupOrganization());
      },
      getGroupOrganizationNoGeom: () => {
         dispatch(getGroupOrganizationNoGeom());
      },
      uploadImage: (files: Array<any>) => {
         dispatch(uploadImage(files));
      },
      spinValue: (spin: boolean) => {
         dispatch(spinValue(spin));
      },
      saveBoardProjecttype: (projecttype: string) => {
         dispatch(saveBoardProjecttype(projecttype));
      }
   };
};
