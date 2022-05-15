import { useDispatch, useSelector } from 'react-redux';
import { User } from '../Classes/TypeList';
import { replaceAppUser } from '../store/actions/appUser';
import { saveUserInformation } from '../store/actions/ProfileActions';

export const useAppUserState = () => useSelector(
  (rootState: { appUser: any }) => rootState.appUser
);

export const useAppUserDispatch = () => {
  const dispatch = useDispatch();
  return {
    replaceAppUser: (appUser : User) => {
      dispatch(replaceAppUser(appUser));
    },
    saveUserInformation: (user: User) => {
      dispatch(saveUserInformation(user));
    }
  }
};
