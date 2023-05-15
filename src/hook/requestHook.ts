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
} from 'store/actions/requestActions';

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
  };
};
