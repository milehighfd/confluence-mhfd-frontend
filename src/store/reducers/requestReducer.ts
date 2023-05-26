import { MEDIUM_SCREEN_RIGHT } from 'constants/constants';
import * as types from '../types/requestTypes';
import { defaultColumns } from 'routes/work-request/constants';

const initialState = {
  showModalProject: false,
  completeProjectData: null,
  locality: '',
  yearList: [2023, 2022, 2021, 2020, 2019],
  year: 2023,
  tabKeys: ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D'],
  tabKey: null,
  showCreateProject: false,
  problemId: null,
  showAnalytics: false,
  sumByCounty: [],
  sumTotal: {},
  totalCountyBudget: 0,
  namespaceId: '',
  showBoardStatus: false,
  boardStatus: null,
  boardSubstatus: null,
  boardComment: null,
  alertStatus: {},
  showAlert: false,
  showFilters: false,
  jurisdictionFilterList: [],
  csaFilterList: [],
  prioritySelected: ['1', '2', '3', 'Over 3', 'Work Plan'],
  jurisdictionSelected: [],
  csaSelected: [],
  localityType: '',
  visibleCreateProject: false,
  leftWidth: MEDIUM_SCREEN_RIGHT - 1,
  localities: [],
  columns: defaultColumns,
  reqManager: [null, null, null, null, null],
  diff: [null, null, null, null, null],
  columns2: defaultColumns,
  board: {},
  projectIds: [],
  loadingColumns: false,
  localityFilter: '',
  dataAutocomplete: [],
  setIsOnSelected: false,
};

const requestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.REQUEST_SHOW_MODAL_PROJECT:
      return {
        ...state,
        showModalProject: action.payload
      };
    case types.REQUEST_COMPLETE_PROJECT_DATA:
      return {
        ...state,
        completeProjectData: action.payload
      };
    case types.REQUEST_SET_LOCALITY:
      return {
        ...state,
        locality: action.payload
      };
    case types.REQUEST_SET_YEAR:
      return {
        ...state,
        year: action.payload
      };
    case types.REQUEST_SET_TAB_KEY:
      return {
        ...state,
        tabKey: action.payload
      };
    case types.REQUEST_SET_YEAR_LIST:
      return {
        ...state,
        yearList: action.payload
      };
    case types.REQUEST_SET_SHOW_CREATE_PROJECT:
      return {
        ...state,
        showCreateProject: action.payload
      };
    case types.REQUEST_SET_PROBLEM_ID:
      return {
        ...state,
        problemId: action.payload
      };
    case types.REQUEST_SET_SHOW_ANALYTICS:
      return {
        ...state,
        showAnalytics: action.payload
      };
    case types.REQUEST_SET_SUM_BY_COUNTY:
      return {
        ...state,
        sumByCounty: action.payload
      };
    case types.REQUEST_SET_SUM_TOTAL:
      return {
        ...state,
        sumTotal: action.payload
      };
    case types.REQUEST_SET_TOTAL_COUNTY_BUDGET:
      return {
        ...state,
        totalCountyBudget: action.payload
      };
    case types.REQUEST_SET_NAMESPACE_ID:
      return {
        ...state,
        namespaceId: action.payload
      };
    case types.REQUEST_SET_SHOW_BOARD_STATUS:
      return {
        ...state,
        showBoardStatus: action.payload
      };
    case types.REQUEST_SET_BOARD_STATUS:
      return {
        ...state,
        boardStatus: action.payload
      };
    case types.REQUEST_SET_BOARD_SUBSTATUS:
      return {
        ...state,
        boardSubstatus: action.payload
      };
    case types.REQUEST_SET_BOARD_COMMENT:
      return {
        ...state,
        boardComment: action.payload
      };
    case types.REQUEST_SET_ALERT_STATUS:
      return {
        ...state,
        alertStatus: action.payload
      };
    case types.REQUEST_SET_SHOW_ALERT:
      return {
        ...state,
        showAlert: action.payload
      };
    case types.REQUEST_SET_SHOW_FILTERS:
      return {
        ...state,
        showFilters: action.payload
      };
    case types.REQUEST_SET_JURISDICTION_FILTER_LIST:
      return {
        ...state,
        jurisdictionFilterList: action.payload
      };
    case types.REQUEST_SET_CSA_FILTER_LIST:
      return {
        ...state,
        csaFilterList: action.payload
      };
    case types.REQUEST_SET_PRIORITY_SELECTED:
      return {
        ...state,
        prioritySelected: action.payload
      };
    case types.REQUEST_SET_JURISDICTION_SELECTED:
      return {
        ...state,
        jurisdictionSelected: action.payload
      };
    case types.REQUEST_SET_CSA_SELECTED:
      return {
        ...state,
        csaSelected: action.payload
      };
    case types.REQUEST_SET_SET_PRIORITY_SELECTED:
      return {
        ...state,
        prioritySelected: action.payload
      };
    case types.REQUEST_SET_LOCALITY_TYPE:
      return {
        ...state,
        localityType: action.payload
      };
    case types.REQUEST_SET_VISIBLE_CREATE_PROJECT:
      return {
        ...state,
        visibleCreateProject: action.payload
      };
    case types.REQUEST_SET_LEFT_WIDTH:
      return {
        ...state,
        leftWidth: action.payload
      };
    case types.REQUEST_SET_LOCALITIES:
      return {
        ...state,
        localities: action.payload
      };
    case types.REQUEST_SET_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    case types.REQUEST_SET_REQ_MANAGER:
      return {
        ...state,
        reqManager: action.payload
      };
    case types.REQUEST_SET_DIFF:
      return {
        ...state,
        diff: action.payload
      };
    case types.REQUEST_START_LOADING_COLUMNS_2:
      return {
        ...state,
        loadingColumns: true,
        projectIds: []
      };
    case types.REQUEST_SET_COLUMNS_2:
      return {
        ...state,
        columns2: [
          ...state.columns2.map((column, index) => {
            if (action.payload.position === index) {
              return {
                ...column,
                title: action.payload.title,
                projects: action.payload.projects,
                sumByGroupMap: action.payload.sumByGroupMap,
                groupTotal: action.payload.groupTotal
              }
            }
            return column;
          })
        ],
        projectIds: Array.from(
          new Set(
            [
              state.projectIds,
              ...action.payload.projects.map((project: any) => project.project_id)
            ]
          ).values()
        )
      };
    case types.REQUEST_SET_BOARD:
      return {
        ...state,
        board: action.payload
      };
    case types.REQUEST_STOP_LOADING_COLUMNS_2:
      return {
        ...state,
        loadingColumns: false
      };
    case types.REQUEST_SET_LOCALITY_FILTER:
      return {
        ...state,
        localityFilter: action.payload
      };
    case types.REQUEST_SET_DATA_AUTOCOMPLETE:
      return {
        ...state,
        dataAutocomplete: action.payload
      };
    case types.REQUEST_SET_IS_ON_SELECTED:
      return {
        ...state,
        setIsOnSelected: action.payload
      };
    case types.REQUEST_SET_COLUMNS_2_MANUAL:
      return {
        ...state,
        columns2: action.payload
      };
    default:
      return state;
  }
};

export default requestReducer;
