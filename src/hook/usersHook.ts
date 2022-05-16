import { useSelector } from 'react-redux';

export const useUsersState = () => useSelector(
   (state: { users: any }) => state.users
);
