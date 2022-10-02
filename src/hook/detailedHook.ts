import { useSelector } from 'react-redux';

export const useDetailedState = () => useSelector(
  (rootState: { detailed: any }) => rootState.detailed
);
