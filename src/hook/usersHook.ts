import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUserActivity,
  getUserActivity,
  saveUserActivated,
  saveUserPending
} from '../store/actions/usersActions';

export const useUsersState = () => useSelector(
  (state: { users: any }) => state.users
);

export const useUsersDispatch = () => {
  const dispatch = useDispatch();
  return {
    saveUserActivated: (users: any) => {
      dispatch(saveUserActivated(users));
    },
    saveUserPending: (users: any) => {
      dispatch(saveUserPending(users));
    },
    getUserActivity: (url: string) => {
      dispatch(getUserActivity(url));
    },
    getAllUserActivity: () => {
      dispatch(getAllUserActivity());
    }
  };
};
