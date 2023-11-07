import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'Classes/TypeList';
import {
   saveUserInformation,
   updateUserInformation,
   getGroupOrganization,
   getGroupOrganizationNoGeom,
   uploadImage,
   spinValue,
   // From App user state
   replaceAppUser,
   resetAppUser,
   addNotifications,
   deleteNotification,
   resetProfile,
   getUserInformation,
   deleteAllNotifications
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
  const _replaceAppUser = useCallback((appUser : User) => {
    dispatch(replaceAppUser(appUser));
  }, [dispatch]);
  const _resetAppUser = useCallback(() => {
    dispatch(resetAppUser());
  }, [dispatch]);
  const _resetProfile = useCallback(() => {
    dispatch(resetProfile());
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
      },
      replaceAppUser: _replaceAppUser,
      resetAppUser: _resetAppUser,
      addNotifications: (notification: any) => {
        dispatch(addNotifications(notification));
      },
      deleteNotification: (id: any) => {
        dispatch(deleteNotification(id));
      },
      deleteAllNotifications: () => {
        dispatch(deleteAllNotifications());
      },
      resetProfile: _resetProfile,
      getUserInformation: () => {
        dispatch(getUserInformation());
      },
   };
};
