import * as types from '../types/requestTypes';

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
    default:
      return state;
  }
};

export default requestReducer;
