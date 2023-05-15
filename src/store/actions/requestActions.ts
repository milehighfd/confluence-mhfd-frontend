import * as types from '../types/requestTypes';

export const setShowModalProject = (payload: boolean) => ({
  type: types.REQUEST_SHOW_MODAL_PROJECT,
  payload
});

export const setCompleteProjectData = (payload: any) => ({
  type: types.REQUEST_COMPLETE_PROJECT_DATA,
  payload
});

export const setLocality = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY,
  payload
});

export const setYear = (payload: any) => ({
  type: types.REQUEST_SET_YEAR,
  payload
});

export const setTabKey = (payload: any) => ({
  type: types.REQUEST_SET_TAB_KEY,
  payload
});

export const setYearList = (payload: any) => ({
  type: types.REQUEST_SET_YEAR_LIST,
  payload
});

export const setShowCreateProject = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_CREATE_PROJECT,
  payload
});

export const setProblemId = (payload: any) => ({
  type: types.REQUEST_SET_PROBLEM_ID,
  payload
});

export const setShowAnalytics = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_ANALYTICS,
  payload
});

export const setSumByCounty = (payload: any) => ({
  type: types.REQUEST_SET_SUM_BY_COUNTY,
  payload
});

export const setSumTotal = (payload: any) => ({
  type: types.REQUEST_SET_SUM_TOTAL,
  payload
});

export const setTotalCountyBudget = (payload: any) => ({
  type: types.REQUEST_SET_TOTAL_COUNTY_BUDGET,
  payload
});

export const setNamespaceId = (payload: any) => ({
  type: types.REQUEST_SET_NAMESPACE_ID,
  payload
});

export const setShowBoardStatus = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_BOARD_STATUS,
  payload
});

export const setBoardStatus = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_STATUS,
  payload
});

export const setBoardSubstatus = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_SUBSTATUS,
  payload
});

export const setBoardComment = (payload: any) => ({
  type: types.REQUEST_SET_BOARD_COMMENT,
  payload
});

export const setAlertStatus = (payload: any) => ({
  type: types.REQUEST_SET_ALERT_STATUS,
  payload
});

export const setShowAlert = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_ALERT,
  payload
});
