import * as types from '../types/panelTypes';
import { MAINTENANCE_BODY, DEFAULT_BODY, PROJECT_TABS } from '../../constants/constants';
import { ProjectTypes, PanelProjectTypes, ProjectTabTypes, PanelTriggerTypes } from '../../Classes/MapTypes';

export const getUserProjects = () => {
  return (dispatch : Function, getState : Function) => {
    const state = getState();
    const panelProjects = { ...state.map.projectsByType };
    const projects : PanelProjectTypes = {};

    PROJECT_TABS.forEach((type : ProjectTabTypes) => {
      const formatedType = type.name.toLowerCase();
      const { newPanelProjects, panelTrigger } : PanelTriggerTypes = getPanelTrigger(formatedType);

      if (panelProjects[formatedType]) {
        panelProjects[formatedType].forEach((project: ProjectTypes) => {
          let panelId = 'workspace';
          if (project[panelTrigger]) {
            panelId = '' + project[panelTrigger];
          } 
          newPanelProjects[panelId] = [...newPanelProjects[panelId], project];
        });

        projects[formatedType] = {
          ...projects[formatedType],
          ...newPanelProjects
        }
      }
    });

    dispatch({ type: types.SAVE_DRAFT_PANEL, projects });
  }
}

const getPanelTrigger = (formatedType : string) => {
  /* Default at Capital Settings */
  let newPanelProjects = { ...DEFAULT_BODY };
  let panelTrigger = 'requestFundingYear';
  
  if (formatedType === 'maintenance') {
    newPanelProjects = MAINTENANCE_BODY;
    panelTrigger = 'projectSubtype';
  } else if (formatedType === 'study') {
    panelTrigger = 'requestedStartyear';
  }

  return { newPanelProjects, panelTrigger };
}

export const saveDraftCard = (projects : PanelProjectTypes, type : string) => {
  return (dispatch : Function) => {
      dispatch({ type: types.UPDATE_DRAFT_PANEL, data: { id: [type], projects }});
  }
}