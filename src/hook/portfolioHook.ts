import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentGroup,
  setSearchWord,
  setFavorites,
  deleteFavorite,
  addFavorite,
  setCollapsePhase,
  getListPMTools
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
  const _deleteFavorite = useCallback((id: number) => {
    dispatch(deleteFavorite(id));
  }, [dispatch]);
  const _addFavorite = useCallback((id: number) => {
    dispatch(addFavorite(id));
  }, [dispatch]);
  const _setCollapsePhase = useCallback((value: boolean) => {
    dispatch(setCollapsePhase(value));
  }, [dispatch]);
  const _getListPMTools = useCallback((tabKey: number) => {
    dispatch(getListPMTools(tabKey));
  }, [dispatch]);
  return {
    setSearchWord: _setSearchWord,
    setCurrentGroup: _setCurrentGroup,
    setFavorites: _setFavorites,
    deleteFavorite: _deleteFavorite,
    addFavorite: _addFavorite,
    setCollapsePhase: _setCollapsePhase,
    getListPMTools: _getListPMTools
  };
};
