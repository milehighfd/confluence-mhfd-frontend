import { SERVER } from 'Config/Server.config';
import * as types from '../types/requestTypes';
import * as projectTypes from '../types/ProjectTypes';
import * as datasets from 'Config/datasets';
import { buildGeojsonForLabelsProjectsInBoards, splitProjectsIdsByStatuses } from 'Components/Work/Request/RequestViewUtil';

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

export const setShowFilters = (payload: any) => ({
  type: types.REQUEST_SET_SHOW_FILTERS,
  payload
});

export const setJurisdictionFilterList = (payload: any) => ({
  type: types.REQUEST_SET_JURISDICTION_FILTER_LIST,
  payload
});

export const setCsaFilterList = (payload: any) => ({
  type: types.REQUEST_SET_CSA_FILTER_LIST,
  payload
});

export const setPrioritySelected = (payload: any) => ({
  type: types.REQUEST_SET_PRIORITY_SELECTED,
  payload
});

export const setJurisdictionSelected = (payload: any) => ({
  type: types.REQUEST_SET_JURISDICTION_SELECTED,
  payload
});

export const setCsaSelected = (payload: any) => ({
  type: types.REQUEST_SET_CSA_SELECTED,
  payload
});

export const setSetPrioritySelected = (payload: any) => ({
  type: types.REQUEST_SET_SET_PRIORITY_SELECTED,
  payload
});

export const setLocalityType = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY_TYPE,
  payload
});

export const setVisibleCreateProject = (payload: any) => ({
  type: types.REQUEST_SET_VISIBLE_CREATE_PROJECT,
  payload
});

export const setLeftWidth = (payload: any) => ({
  type: types.REQUEST_SET_LEFT_WIDTH,
  payload
});

export const setLocalities = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITIES,
  payload
});

export const setColumns = (payload: any) => ({
  type: types.REQUEST_SET_COLUMNS,
  payload
});

export const setReqManager = (payload: any) => ({
  type: types.REQUEST_SET_REQ_MANAGER,
  payload
});

export const setDiff = (payload: any) => ({
  type: types.REQUEST_SET_DIFF,
  payload
});

export const loadOneColumn = (board_id: any, position: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    datasets.postData(`${SERVER.URL_BASE}/board/board-for-positions2`, { board_id, position }).then((projects) => {
      dispatch({
        type: types.REQUEST_SET_COLUMNS_2,
        payload: {
          position,
          projects
        }
      });
    });
    // TODO: Pachon I noticed you have a postprocessing function here, please check how to use it here
  }
}
export const loadColumns = (board_id: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.REQUEST_START_LOADING_COLUMNS_2
    });
    const promises = [];
    for (let position = 0; position <= 5; position++) {
      const promise = datasets.postData(
        `${SERVER.URL_BASE}/board/board-for-positions2`,
        { board_id, position }
      ).then((projects) => {
        dispatch({
          type: types.REQUEST_SET_COLUMNS_2,
          payload: {
            position,
            projects
          }
        });
        return projects;
      });
      promises.push(promise);
    }
    Promise.all(promises).then((dataArray) => {
      const allProjects = dataArray.flat();
      const groupedIdsByStatusId: any = splitProjectsIdsByStatuses(allProjects);
      const geojson: any = buildGeojsonForLabelsProjectsInBoards(allProjects);
      let ids = Array.from(
        new Set(
          allProjects.map((project: any) => project.project_id)
        )
      );
      dispatch({
        type: projectTypes.SET_BOARD_PROJECTS,
        boardProjects: {
          ids,
          groupedIds: groupedIdsByStatusId,
          geojsonData: geojson
        }
      });
      dispatch({
        type: types.REQUEST_STOP_LOADING_COLUMNS_2
      });

    });
  }
}

export const setBoard = (payload: any) => ({
  type: types.REQUEST_SET_BOARD,
  payload
});

export const setLocalityFilter = (payload: any) => ({
  type: types.REQUEST_SET_LOCALITY_FILTER,
  payload
});

export const setDataAutocomplete = (payload: any) => ({
  type: types.REQUEST_SET_DATA_AUTOCOMPLETE,
  payload
});

export const setIsOnSelected = (payload: any) => ({
  type: types.REQUEST_SET_IS_ON_SELECTED,
  payload
});

export const setColumns2Manual = (payload: any) => ({
  type: types.REQUEST_SET_COLUMNS_2_MANUAL,
  payload
});
