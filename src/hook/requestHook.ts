import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowModalProject,
  setCompleteProjectData,
  setLocality,
  setYear,
  setTabKey,
  setYearList,
  setShowCreateProject,
  setProblemId,
  setShowAnalytics,
  setSumByCounty,
  setSumTotal,
  setTotalCountyBudget,
  setNamespaceId,
  setShowBoardStatus,
  setBoardStatus,
  setBoardSubstatus,
  setBoardComment,
  setAlertStatus,
  setShowAlert,
  setShowFilters,
  setJurisdictionFilterList,
  setCsaFilterList,
  setPrioritySelected,
  setJurisdictionSelected,
  setCountiesSelected,
  setServiceAreasSelected,
  setProjectStatusesSelected,
  setCsaSelected,
  setLocalityType,
  setVisibleCreateProject,
  setLeftWidth,
  setLocalities,
  setColumns,
  setReqManager,
  setDiff,
  loadColumns,
  loadOneColumn,
  setBoard,
  setDataAutocomplete,
  setLocalityFilter,
  setIsOnSelected,
  setColumns2Manual,
  moveProjectsManual,
  handleMoveFromColumnToColumn,
  loadFilters,
  updateTargetCost,
} from 'store/actions/requestActions';
import { DragAndDropCards } from 'store/types/requestTypes';

export const useRequestState = () => useSelector((state: { request: any }) => state.request);

export const useRequestDispatch = () => {
  const dispatch = useDispatch();

  const _setShowModalProject = useCallback((showModalProject: boolean) => {
    dispatch(setShowModalProject(showModalProject));
  }, [dispatch]);
  const _setCompleteProjectData = useCallback((completeProjectData: any) => {
    dispatch(setCompleteProjectData(completeProjectData));
  }, [dispatch]);
  const _setLocality = useCallback((completeProjectData: any) => {
    dispatch(setLocality(completeProjectData));
  }, [dispatch]);
  const _setYear = useCallback((year: any) => {
    dispatch(setYear(year));
  }, [dispatch]);
  const _setTabKey = useCallback((tabKey: any) => {
    dispatch(setTabKey(tabKey));
  }, [dispatch]);
  const _setYearList = useCallback((yearList: any) => {
    dispatch(setYearList(yearList));
  }, [dispatch]);
  const _setShowCreateProject = useCallback((showCreateProject: any) => {
    dispatch(setShowCreateProject(showCreateProject));
  }, [dispatch]);
  const _setProblemId = useCallback((problemId: any) => {
    dispatch(setProblemId(problemId));
  }, [dispatch]);
  const _setShowAnalytiics = useCallback((showAnalytics: any) => {
    dispatch(setShowAnalytics(showAnalytics));
  }, [dispatch]);
  const _setSumByCounty = useCallback((sumByCounty: any) => {
    dispatch(setSumByCounty(sumByCounty));
  }, [dispatch]);
  const _setSumTotal = useCallback((sumTotal: any) => {
    dispatch(setSumTotal(sumTotal));
  }, [dispatch]);
  const _setTotalCountyBudget = useCallback((totalCountyBudget: any) => {
    dispatch(setTotalCountyBudget(totalCountyBudget));
  }, [dispatch]);
  const _setNamespaceId = useCallback((namespace: any) => {
    dispatch(setNamespaceId(namespace));
  }, [dispatch]);
  const _setShowBoardStatus = useCallback((showBoardStatus: any) => {
    dispatch(setShowBoardStatus(showBoardStatus));
  }, [dispatch]);
  const _setBoardStatus = useCallback((boardStatus: any) => {
    dispatch(setBoardStatus(boardStatus));
  }, [dispatch]);
  const _setBoardSubstatus = useCallback((boardSubStatus: any) => {
    dispatch(setBoardSubstatus(boardSubStatus));
  }, [dispatch]);
  const _setBoardComment = useCallback((boardComment: any) => {
    dispatch(setBoardComment(boardComment));
  }, [dispatch]);
  const _setAlertStatus = useCallback((alertStatus: any) => {
    dispatch(setAlertStatus(alertStatus));
  }, [dispatch]);
  const _setShowAlert = useCallback((showAlert: any) => {
    dispatch(setShowAlert(showAlert));
  }, [dispatch]);
  const _setShowFilters = useCallback((showFilters: any) => {
    dispatch(setShowFilters(showFilters));
  }, [dispatch]);
  const _setJurisdictionFilterList = useCallback((jurisdictionFilterList: any) => {
    dispatch(setJurisdictionFilterList(jurisdictionFilterList));
  }, [dispatch]);
  const _setCsaFilterList = useCallback((csaFilterList: any) => {
    dispatch(setCsaFilterList(csaFilterList));
  }, [dispatch]);
  const _setPrioritySelected = useCallback((prioritySelected: any) => {
    dispatch(setPrioritySelected(prioritySelected));
  }, [dispatch]);
  const _setJurisdictionSelected = useCallback((jurisdictionSelected: any) => {
    dispatch(setJurisdictionSelected(jurisdictionSelected));
  }, [dispatch]);
  const _setCountiesSelected = useCallback((countiesSelected: any) => {
    dispatch(setCountiesSelected(countiesSelected));
  }, [dispatch]);
  const _setServiceAreasSelected = useCallback((serviceAreasSelected: any) => {
    dispatch(setServiceAreasSelected(serviceAreasSelected));
  }, [dispatch]);
  const _setProjectStatusesSelected = useCallback((projectStatusesSelected: any) => {
    dispatch(setProjectStatusesSelected(projectStatusesSelected));
  }, [dispatch]);
  const _setCsaSelected = useCallback((csaSelected: any) => {
    dispatch(setCsaSelected(csaSelected));
  }, [dispatch]);
  const _setLocalityType = useCallback((localityType: any) => {
    dispatch(setLocalityType(localityType));
  }, [dispatch]);
  const _setVisibleCreateProject = useCallback((visibleCreateProject: any) => {
    dispatch(setVisibleCreateProject(visibleCreateProject));
  }, [dispatch]);
  const _setLeftWidth = useCallback((leftWidth: any) => {
    dispatch(setLeftWidth(leftWidth));
  }, [dispatch]);
  const _setLocalities = useCallback((localities: any) => {
    dispatch(setLocalities(localities));
  }, [dispatch]);
  const _setColumns = useCallback((columns: any) => {
    dispatch(setColumns(columns));
  }, [dispatch]);
  const _setReqManager = useCallback((reqManager: any) => {
    dispatch(setReqManager(reqManager));
  }, [dispatch]);
  const _setDiff = useCallback((diff: any) => {
    dispatch(setDiff(diff));
  }, [dispatch]);
  const _loadColumns = useCallback((board_id: any) => {
    dispatch(loadColumns(board_id));
  }, [dispatch]);
  const _loadOneColumn = useCallback((board_id: any, position: number) => {
    dispatch(loadOneColumn(board_id, position));
  }, [dispatch]);
  const _setBoard = useCallback((board: any) => {
    dispatch(setBoard(board));
  }, [dispatch]);
  const _setLocalityFilter = useCallback((localityFilter: any) => {
    dispatch(setLocalityFilter(localityFilter));
  }, [dispatch]);
  const _setDataAutocomplete = useCallback((dataAutocomplete: any) => {
    dispatch(setDataAutocomplete(dataAutocomplete));
  }, [dispatch]);
  const _setIsOnSelected = useCallback((isOnSelected: any) => {
    dispatch(setIsOnSelected(isOnSelected));
  }, [dispatch]);
  const _setColumns2Manual = useCallback((columns2Manual: any) => {
    dispatch(setColumns2Manual(columns2Manual));
  }, [dispatch]);
  const _moveProjectsManual = useCallback((payload: DragAndDropCards) => {
    dispatch(moveProjectsManual(payload));
  }, [dispatch]);
  const _handleMoveFromColumnToColumn = useCallback((payload: DragAndDropCards) => {
    dispatch(handleMoveFromColumnToColumn(payload));
  }, [dispatch]);
  const _loadFilters = useCallback((board_id: any) => {
    dispatch(loadFilters(board_id));
  }, [dispatch]);
  const _updateTargetCost = useCallback((board_id: any, targetCosts: any) => {
    dispatch(updateTargetCost(board_id, targetCosts));
  }, [dispatch]);

  return {
    setShowModalProject: _setShowModalProject,
    setCompleteProjectData: _setCompleteProjectData,
    setLocality: _setLocality,
    setYear: _setYear,
    setTabKey: _setTabKey,
    setYearList: _setYearList,
    setShowCreateProject: _setShowCreateProject,
    setProblemId: _setProblemId,
    setShowAnalytics: _setShowAnalytiics,
    setSumByCounty: _setSumByCounty,
    setSumTotal: _setSumTotal,
    setTotalCountyBudget: _setTotalCountyBudget,
    setNamespaceId: _setNamespaceId,
    setShowBoardStatus: _setShowBoardStatus,
    setBoardStatus: _setBoardStatus,
    setBoardSubstatus: _setBoardSubstatus,
    setBoardComment: _setBoardComment,
    setAlertStatus: _setAlertStatus,
    setShowAlert: _setShowAlert,
    setShowFilters: _setShowFilters,
    setJurisdictionFilterList: _setJurisdictionFilterList,
    setCsaFilterList: _setCsaFilterList,
    setPrioritySelected: _setPrioritySelected,
    setJurisdictionSelected: _setJurisdictionSelected,
    setCountiesSelected: _setCountiesSelected,
    setServiceAreasSelected: _setServiceAreasSelected,
    setProjectStatusesSelected :_setProjectStatusesSelected,
    setCsaSelected: _setCsaSelected,
    setLocalityType: _setLocalityType,
    setVisibleCreateProject: _setVisibleCreateProject,
    setLeftWidth: _setLeftWidth,
    setLocalities: _setLocalities,
    setColumns: _setColumns,
    setReqManager: _setReqManager,
    setDiff: _setDiff,
    loadColumns: _loadColumns,
    loadOneColumn: _loadOneColumn,
    setBoard: _setBoard,
    setLocalityFilter: _setLocalityFilter,
    setDataAutocomplete: _setDataAutocomplete,
    setIsOnSelected: _setIsOnSelected,
    setColumns2Manual: _setColumns2Manual,
    moveProjectsManual: _moveProjectsManual,
    handleMoveFromColumnToColumn: _handleMoveFromColumnToColumn,
    loadFilters: _loadFilters,
    updateTargetCost: _updateTargetCost
  };
};
