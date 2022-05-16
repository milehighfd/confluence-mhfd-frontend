import { useDispatch, useSelector } from 'react-redux';
import { User } from '../Classes/TypeList';
import { replaceAppUser, resetAppUser } from '../store/actions/appUser';
import { resetProfile, saveUserInformation } from '../store/actions/ProfileActions';

export const useAppUserState = () => useSelector(
  (rootState: { appUser: any }) => rootState.appUser
);

export const useAppUserDispatch = () => {
  const dispatch = useDispatch();
  return {
    resetAppUser: () => {
      dispatch(resetAppUser());
    },
    replaceAppUser: (appUser : User) => {
      dispatch(replaceAppUser(appUser));
    },
    saveUserInformation: (user: User) => {
      dispatch(saveUserInformation(user));
    },
    resetProfile: () => {
      dispatch(resetProfile());
    }
  }
};
