import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentGroup,
  setSearchWord,
  setFavorites,
  deleteFavorite,
  addFavorite,
  setCollapsePhase,
  getListPMTools,
  setZoomTimeline,
  setIsZoomToday,
  setIsZoomWeekly,
  setIsZoomMonthly,
  setZoomSelected,
  setPositionModalGraphic,
  setDataModal,
  setGraphicOpen,
  setOpenModalTollgate,
  setUpdateGroup,
  setIsLoading,
  setOpenGroups
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
  const _setZoomTimeline = useCallback((value: number) => {
    dispatch(setZoomTimeline(value));
  }, [dispatch]);
  const _setIsZoomToday = useCallback((value: boolean) => {
    dispatch(setIsZoomToday(value));
  }, [dispatch]);
  const _setIsZoomWeekly = useCallback((value: boolean) => {
    dispatch(setIsZoomWeekly(value));
  }, [dispatch]);
  const _setIsZoomMonthly = useCallback((value: boolean) => {
    dispatch(setIsZoomMonthly(value));
  }, [dispatch]);
  const _setZoomSelected = useCallback((value: string) => {
    dispatch(setZoomSelected(value));
  }, [dispatch]);
  const _setPositionModalGraphic = useCallback((left: number, top: number) => {
    dispatch(setPositionModalGraphic(left, top));
  }, [dispatch]);
  const _setDataModal = useCallback((data: Object) => {
    dispatch(setDataModal(data));
  }, [dispatch]);
  const _setGraphicOpen = useCallback((value: boolean) => {
    dispatch(setGraphicOpen(value));
  }, [dispatch]);
  const _setOpenModalTollgate = useCallback((value: boolean) => {
    dispatch(setOpenModalTollgate(value));
  }, [dispatch]);
  const _setUpdateGroup = useCallback((value: Object) => {
    dispatch(setUpdateGroup(value));
  }, [dispatch]);
  const _setIsLoading = useCallback((value: boolean) => {
    dispatch(setIsLoading(value));
  }, [dispatch]);
  const _setOpenGroups = useCallback((value: Array<any>) => {
    dispatch(setOpenGroups(value));
  }, [dispatch]);
  return {
    setSearchWord: _setSearchWord,
    setCurrentGroup: _setCurrentGroup,
    setFavorites: _setFavorites,
    deleteFavorite: _deleteFavorite,
    addFavorite: _addFavorite,
    setCollapsePhase: _setCollapsePhase,
    getListPMTools: _getListPMTools,
    setZoomTimeline: _setZoomTimeline,
    setIsZoomToday: _setIsZoomToday,
    setIsZoomWeekly: _setIsZoomWeekly,
    setIsZoomMonthly: _setIsZoomMonthly,
    setZoomSelected: _setZoomSelected,
    setPositionModalGraphic: _setPositionModalGraphic,
    setDataModal:_setDataModal,
    setGraphicOpen: _setGraphicOpen,
    setOpenModalTollgate: _setOpenModalTollgate,
    setUpdateGroup: _setUpdateGroup,
    setIsLoading: _setIsLoading,
    setOpenGroups: _setOpenGroups,
  };
};
