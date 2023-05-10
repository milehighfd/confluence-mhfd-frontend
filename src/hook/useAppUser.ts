import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'Classes/TypeList';
import { replaceAppUser, resetAppUser } from 'store/actions/appUser';
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

  return {
    resetAppUser: _resetAppUser,
    resetProfile: _resetProfile,
    replaceAppUser: (appUser : User) => {
      dispatch(replaceAppUser(appUser));
    },
    saveUserInformation: (user: User) => {
      dispatch(saveUserInformation(user));
    },
    getUserInformation: () => {
      dispatch(getUserInformation());
    }
  }
};
