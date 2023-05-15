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
  };
};
