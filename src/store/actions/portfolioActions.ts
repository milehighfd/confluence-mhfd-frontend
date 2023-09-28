import * as types from 'store/types/portfolioTypes';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';

export const setSearchWord = (searchWord: string) => ({
  type: types.SET_SEARCH_WORD,
  payload: searchWord
});

export const setCurrentGroup = (currentGroup: string) => ({
  type: types.SET_CURRENT_GROUP,
  payload: currentGroup
});

export const setFavorites = (favorites: Array<any>) => ({
  type: types.SET_FAVORITES,
  payload: favorites
});

export const deleteFavorite = (id: number) => {
  return (dispatch: Function) => {
    datasets.deleteDataWithBody(
      SERVER.DELETE_FAVORITE,
      { id },
      datasets.getToken()
    ).then((args) => {
      console.log('here', args);
      dispatch({type: types.PM_DELETE_FAVORITE, payload: id});
    }).catch((error: any) => {
      console.log('Error on delete favorite?', error);
    });
  }
};

export const addFavorite = (id: number) => {
  return (dispatch: Function) => {
    datasets.getData(
      `${SERVER.ADD_FAVORITE}?id=${id}`,
      datasets.getToken()
    ).then((res) => {
      dispatch({type: types.PM_ADD_FAVORITE, payload: res});
    }).catch((error: any) => {
      console.log('Error on delete favorite?', error);
    });
  }
};

export const setCollapsePhase = (value: boolean) => ({
  type: types.SET_COLLAPSE_PHASE,
  payload: value
});

export const getListPMTools = (tabKey: number) => {
  let flag = false;
  return (dispatch: Function) => {
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.PHASE_TYPE}`,
      { tabKey: tabKey },
      datasets.getToken(),
      controller.signal
    )
      .then((rows) => {        
        dispatch({type: types.PHASE_LIST, payload: rows});
        dispatch({type: types.STATUS_COUNTER, payload: rows.length});
        const z = rows.map((x: any, index: number) => {
          return (
            {
              categoryNo: index,
              from: moment(null),
              to: moment(null),
              status: x?.code_status_type?.status_name,
              name: x.phase_name,
              phase: x.phase_name,
              tasks: x.code_rule_action_items.length,
              phase_id: x.code_phase_type_id,
              tasksData: x.code_rule_action_items,
              duration: x.duration,
              duration_type: x.duration_type,
              code_phase_type_id: x.code_phase_type_id,
              code_status_type_id: x.code_status_type?.code_status_type_id,
            })
        })
        dispatch({type: types.SCHEDULE_LIST, payload: z});
        
        // setUpdatePhaseList(!updatePhaseList);
        dispatch({type: types.UPDATE_PHASELIST, payload: !flag});
        const y = rows.map((x: any) => {
          return x.code_status_type;
        })
        dispatch({type: types.STATUS_LIST, payload: y});
      })
      .catch((error: any) => {
        console.log('Error on delete favorite?', error);
      });
    
  }
};

export const setZoomTimeline = (value: number) => ({
  type: types.SET_ZOOMTIMELINE,
  payload: value
});

export const setZoomTimelineAux = (value: number) => ({
  type: types.SET_ZOOMTIMELINE_AUX,
  payload: value
});

export const setIsZoomToday = (value: boolean) => ({
  type: types.SET_IS_ZOOM_TODAY,
  payload: value
});

export const setIsZoomWeekly = (value: boolean) => ({
  type: types.SET_IS_ZOOM_WEEKLY,
  payload: value
});

export const setIsZoomMonthly = (value: boolean) => ({
  type: types.SET_IS_ZOOM_MONTHLY,
  payload: value
});

export const setZoomSelected = (value: string) => ({
  type: types.SET_ZOOMSELECTED,
  payload: value
});

export const setPositionModalGraphic = (left: number, top: number) => ({
  type: types.SET_POSITION_MODAL_GRPHIC,
  payload: {left: left, top: top}
});

export const setDataModal = (data: Object) => ({
  type: types.SET_DATA_MODAL,
  payload: data
});

export const setGraphicOpen = (value: boolean) => ({
  type: types.SET_GRAPHIC_OPEN,
  payload: value
});

export const setOpenModalTollgate = (value: boolean) => ({
  type: types.SET_OPEN_MODAL_TOLLGATE,
  payload: value
});

export const setUpdateGroup = (value: Object) => ({
  type: types.SET_UPDATE_GROUP,
  payload: value
});

export const setIsLoading = (value: boolean) => ({
  type: types.SET_IS_LOADING,
  payload: value
});

export const setOpenGroups = (value: Object) => ({
  type: types.SET_OPEN_GROUPS,
  payload: value
});

export const setDatesData = (value: Object) => ({
  type: types.SET_DATES_DATA,
  payload: value
});

export const setPineyData = (value: Object) => ({
  type: types.SET_PINEY_DATA,
  payload: value
});

export const setIsFromDetailPage = (value: boolean) => ({
  type: types.SET_IS_FROM_DETAIL_PAGE,
  payload: value
});

export const setUpdateActionItem = () => ({
  type: types.SET_UPDATE_ACTION_ITEM,
});

export const getActionsDone = () => {
  return (dispatch: Function) => {
    const controller = new AbortController();
    datasets.getData(
      `${SERVER.PROJECT_ACTION_ITEM}`,
      datasets.getToken(),
      controller.signal
    ).then((res) => {
      const sortedRes:any = {};
    for (const item of res) {
      const projectId = item.project_id;
      if (!sortedRes[projectId]) {
        sortedRes[projectId] = [];
      }
      sortedRes[projectId].push(item);
    }
      dispatch({type: types.GET_ACTIONS_DONE, payload: sortedRes});
    }).catch((error: any) => {
      console.log('Error on action done', error);
    });
  }
};

export const getCreatedActions = () => {
  return (dispatch: Function) => {
    const controller = new AbortController();
    datasets.getData(
      `${SERVER.PROJECT_CHECKLIST}`,
      datasets.getToken(),
      controller.signal
    ).then((res) => {
      const sortedRes: any = {};
      for (const item of res) {
        const projectId = item.project_id;
        if (!sortedRes[projectId]) {
          sortedRes[projectId] = [];
        }
        sortedRes[projectId].push(item);
      }
      dispatch({ type: types.GET_CREATED_ACTIONS, payload: sortedRes });
    }).catch((error: any) => {
      console.log('Error on action done', error);
    });
  }
}