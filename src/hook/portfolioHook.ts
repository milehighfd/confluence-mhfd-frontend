import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentGroup,
  setSearchWord,
  setFavorites
} from 'store/actions/portfolioActions';

export const usePortflioState = () => useSelector(
  (state: { portfolio: any }) => state.portfolio
);

export const usePortfolioDispatch = () => {
  const dispatch = useDispatch();

  const _setSearchWord = useCallback((searchWord: string) => {
    dispatch(setSearchWord(searchWord));
  }, [dispatch]);
  const _setCurrentGroup = useCallback((currentGroup: string) => {
    dispatch(setCurrentGroup(currentGroup));
  }, [dispatch]);
  const _setFavorites = useCallback((favorites: Array<any>) => {
    dispatch(setFavorites(favorites));
  }, [dispatch]);

  return {
    setSearchWord: _setSearchWord,
    setCurrentGroup: _setCurrentGroup,
    setFavorites: _setFavorites
  };
};
