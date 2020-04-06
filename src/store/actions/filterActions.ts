import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";

import * as types from '../types/filterTypes';
import { FILTER_PROJECTS } from '../types/mapTypes'; 

export const getProjectWithFilters = (filters : any) => {
  return (dispatch : Function) => {
      const data = filters?filters:{};
      datasets.postData(SERVER.FILTER_PROJECT, data, datasets.getToken()).then(projects => {
          if(data.hasOwnProperty('requestName')) delete data['requestName'];
          dispatch({ type: FILTER_PROJECTS, projects });
          dispatch({ type: types.SET_FILTERS, data });
      });
  } 
}

export const removeFilter = (item: any) => {
  return (dispatch : Function, getState : Function) => {
      const state = getState();
      let newFilters = {...state.filter.filters};

      if(Array.isArray(newFilters[item.key])) {
          const array = [...newFilters[item.key]];
          const arrayIndex = array.indexOf(item.type);
          if(arrayIndex > -1) array.splice(arrayIndex, 1);

          if(array.length) {
              newFilters = {...newFilters, [item.key]: array};
          } else {
              delete newFilters[item.key];
          }
      } else {
          delete newFilters[item.key];
      }
      dispatch(getProjectWithFilters(newFilters));
  }
}

export const getDropdownFilters = (items : Array<string>) => {
  return (dispatch: Function) => {
    items.map((item : string) => dispatch(filterByFields(item)));
    dispatch(filterProjectCreators());
  }
}

export const filterProjectCreators = () => {
  return (dispatch: Function) => {
      datasets.getData(SERVER.FILTER_PROJECT_CREATORS, datasets.getToken()).then(data => {
        dispatch({ type: types.SET_CREATOR_FILTER, data });
      });
  }
}

export const filterByFields = (field : string) => {
  return (dispatch: Function) => {
      datasets.getData(SERVER.FILTER_BY_FIELD + '/' + field, datasets.getToken()).then(value => {
        dispatch({ type: types.SET_DROPDOWN_FILTERS, data: { field, value }});
      });
  }
}