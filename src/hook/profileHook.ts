import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'Classes/TypeList';
import {
   saveUserInformation,
   updateUserInformation,
   getGroupOrganization,
   getGroupOrganizationNoGeom,
   uploadImage,
   spinValue
} from 'store/actions/ProfileActions';
import {
   getTimesLogin,
   resetTimesLogin,
   saveBoardProjecttype
} from 'store/actions/usersActions';

export const useProfileState = () => useSelector(
   (state: { profile: any }) => state.profile
);

export const useMyUser = () => useSelector(
   (state: { users: any } ) => state.users
);

export const useProfileDispatch = () => {
   const dispatch = useDispatch();

   const _getGroupOrganization = useCallback(() => {
      dispatch(getGroupOrganization());
   }, [dispatch]);
   const _saveUserInformation = useCallback((user: User) => {
      dispatch(saveUserInformation(user));
   }, [dispatch]);

   return {
      getGroupOrganization: _getGroupOrganization,
      saveUserInformation: _saveUserInformation,
      updateUserInformation: (user: User) => {
         dispatch(updateUserInformation(user));
      },
      resetTimesLogin: () => {
         dispatch(resetTimesLogin());
      },
      getTimesLogin: () => {
         dispatch(getTimesLogin());
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
