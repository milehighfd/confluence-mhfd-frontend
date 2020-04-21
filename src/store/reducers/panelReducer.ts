import * as types from '../types/panelTypes';

const initState = {
  projects: {}
};

const panelReducer = (state = initState, action : any) => {
  switch(action.type) {
    case types.SAVE_DRAFT_PANEL: 
      return {
        ...state,
        projects: {
          ...state.projects,
          ...action.projects
        }
      }
    case types.UPDATE_DRAFT_PANEL: 
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.data.id]: action.data.projects
        }
      }
    default: 
        return state;
  }
}

export default panelReducer;