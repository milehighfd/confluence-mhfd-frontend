import * as types from '../types/requestTypes';

const initialState = {
  showModalProject: false,
  completeProjectData: null,
  locality: '',
  yearList: [2023, 2022, 2021, 2020, 2019],
  year: 2023,
  tabKeys: ['Capital', 'Study', 'Maintenance', 'Acquisition', 'R&D'],
  tabKey: null,
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
    default:
      return state;
  }
};

export default requestReducer;
