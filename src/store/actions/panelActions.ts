import * as types from '../types/panelTypes';

export const saveDraftCard = (projects : any) => {
  return (dispatch : Function) => {
      dispatch({ type: types.SAVE_DRAFT_PANEL, projects });
  }
}