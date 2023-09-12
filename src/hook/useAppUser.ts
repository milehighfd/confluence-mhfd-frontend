import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'Classes/TypeList';
import { addNotifications, deleteNotification, replaceAppUser, resetAppUser } from 'store/actions/appUser';
import { getUserInformation, resetProfile, saveUserInformation } from 'store/actions/ProfileActions';

export const useAppUserState = () => useSelector(
  (rootState: { appUser: any }) => rootState.appUser
);

export const useAppUserDispatch = () => {
  const dispatch = useDispatch();

  const _resetAppUser = useCallback(() => {
    dispatch(resetAppUser());
  }, [dispatch]);
  const _resetProfile = useCallback(() => {
    dispatch(resetProfile());
  }, [dispatch]);
  const _replaceAppUser = useCallback((appUser : User) => {
    dispatch(replaceAppUser(appUser));
  }, [dispatch]);

  return {
    resetAppUser: _resetAppUser,
    replaceAppUser: _replaceAppUser,
    
    addNotifications: (notification: any) => {
      dispatch(addNotifications(notification));
    },
    deleteNotification: (id: any) => {
      dispatch(deleteNotification(id));
    },

    resetProfile: _resetProfile,
    getUserInformation: () => {
      dispatch(getUserInformation());
    },
    saveUserInformation: (user: User) => {
      dispatch(saveUserInformation(user));
    },
    
  }
};
