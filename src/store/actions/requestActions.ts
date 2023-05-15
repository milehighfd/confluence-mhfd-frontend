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
