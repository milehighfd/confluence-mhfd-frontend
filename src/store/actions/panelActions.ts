import * as types from '../types/panelTypes';
import { MAINTENANCE_BODY, DEFAULT_BODY, PROJECT_TABS } from '../../constants/constants';
import { ProjectTypes } from '../../Classes/MapTypes';

export const getUserProjects = () => {
  return (dispatch : Function, getState : Function) => {
    const state = getState();
    const panelProjects = { ...state.map.projectsByType };
  
    let projects : any = {};
    PROJECT_TABS.forEach((type : any) => {
      const formatedType = type.name.toLowerCase();
      const { newPanelProjects, panelTrigger } : any = getPanelTrigger(formatedType);

      if (panelProjects[formatedType]) {
        panelProjects[formatedType].forEach((project: ProjectTypes) => {
          let panelId = 'workspace';
          if (project[panelTrigger]) {
            panelId = '' + project[panelTrigger];
          } 
          /* Add id field for the DnD library props */
          project.id = project._id;
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

export const saveDraftCard = (projects : any, type : string) => {
  return (dispatch : Function) => {
      dispatch({ type: types.UPDATE_DRAFT_PANEL, data: { id: [type], projects }});
  }
}