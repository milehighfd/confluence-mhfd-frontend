import { useDispatch, useSelector } from 'react-redux';

export const useDetailedState = () => useSelector(
  (rootState: { detailed: any }) => rootState.detailed
);

export const useDetailedDispatch = () => {
  const dispatch = useDispatch();
  return {
  };
};
