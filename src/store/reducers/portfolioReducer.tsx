import { DEFAULT_GROUP } from '../../routes/portfolio-view/components/ListUtils';
import * as types from '../types/portfolioTypes';
const initState = {
  searchWord: '',
  currentGroup: DEFAULT_GROUP,
  favorites: [],
  collapsePhase: false,
  scheduleList: [],
  phaseList: [],
  statusCounter: 0,
  statusList: [],
  zoomTimeline: 0,
  isZoomToday: true,
  isZoomWeekly: false,
  isZoomMonthly: false,
  zoomSelected: 'Today'
}

const portfolioReducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.SET_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.payload,
      };
    case types.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };
    case types.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case types.PM_DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((_: any) => _.project_id !== action.payload),
      };
    case types.PM_ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case types.SET_COLLAPSE_PHASE:
      return {
        ...state,
        collapsePhase: action.payload,
      };
    case types.SCHEDULE_LIST:
      return {
        ...state,
        scheduleList: action.payload,
      };

    case types.PHASE_LIST:
      return {
        ...state,
        phaseList: action.payload,
      };
    case types.STATUS_COUNTER:
      return {
        ...state,
        statusCounter: action.payload,
      };
    case types.UPDATE_PHASELIST:
      return {
        ...state,
        updatePhaseList: action.payload,
      };
    case types.STATUS_LIST:
      return {
        ...state,
        statusList: action.payload,
      };
    case types.SET_ZOOMTIMELINE:
      return {
        ...state,
        zoomTimeline: action.payload,
      };
    case types.SET_IS_ZOOM_TODAY:
      return {
        ...state,
        isZoomToday: action.payload,
      };
    case types.SET_IS_ZOOM_WEEKLY:
      return {
        ...state,
        isZoomWeekly: action.payload,
      };
    case types.SET_IS_ZOOM_MONTHLY:
      return {
        ...state,
        isZoomMonthly: action.payload,
      };
    case types.SET_ZOOMSELECTED:
      return {
        ...state,
        zoomSelected: action.payload,
      };
    default:
      return state;
  }
}

export default portfolioReducer;
