import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentGroup,
  setSearchWord
} from '../store/actions/portfolioActions';

export const usePortflioState = () => useSelector(
  (state: { portfolio: any }) => state.portfolio
);

export const usePortfolioDispatch = () => {
  const dispatch = useDispatch();
  return {
    setSearchWord: (searchWord: string) => {
      dispatch(setSearchWord(searchWord));
    },
    setCurrentGroup: (currentGroup: string) => {
      dispatch(setCurrentGroup(currentGroup));
    }
  };
};
