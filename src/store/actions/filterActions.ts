import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";

import * as types from '../types/filterTypes';
import { FILTER_PROJECTS, GET_PROJECTS_BY_TYPES } from '../types/mapTypes'; 
import { FilterTypes, FilterNamesTypes } from "../../Classes/MapTypes";
import { PROJECT_TYPES } from '../../constants/constants';

export const getProjectWithFilters = (filters : FilterTypes) => {
  return (dispatch : Function) => {
      const data = filters?filters:{};
      // datasets.postData(SERVER.FILTER_PROJECT, data, datasets.getToken()).then(projects => {
      //     if(data.hasOwnProperty('requestName')) delete data['requestName'];
      //     const filteredProjects : any = {};
      //     PROJECT_TYPES.forEach((type : string) => {
      //       filteredProjects[type] = filterProjectsByType(projects, type);
      //     });

      //     dispatch({ type: FILTER_PROJECTS, projects });
      //     dispatch({ type: GET_PROJECTS_BY_TYPES, filteredProjects });
      //     dispatch({ type: types.SET_FILTERS, data });
      // });
  } 
}

const filterProjectsByType = (projects : any, type : string) => {
  if (projects && projects.length) {
    return projects.filter((project : any) => project.projectType === type);
  }
}

export const removeFilter = (item : FilterNamesTypes) => {
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
  return async (dispatch: Function) => {
    const dropdownFilters = {};
    await Promise.all(items.map(async (item : string) => {
     const newValues = await getFilterById(item);
     Object.assign(dropdownFilters, newValues);
    })).then(() => {
      dispatch({ type: types.SET_DROPDOWN_FILTERS, dropdownFilters });
    });

    dispatch(filterProjectCreators());
  }
}

const getFilterById = async (field : string) => {
  return await datasets.getData(SERVER.FILTER_BY_FIELD + '/' + field, datasets.getToken()).then(value => {
    return { [field]: value };
  });
}

export const filterProjectCreators = () => {
  return (dispatch: Function) => {
      datasets.getData(SERVER.FILTER_PROJECT_CREATORS, datasets.getToken()).then(data => {
        dispatch({ type: types.SET_CREATOR_FILTER, data });
      });
  }
}

export const getUserFilters = (id : string, userName: string) => {
  return (dispatch : Function) => {
    dispatch({ type: types.SET_USERS_DATA, data: { [id]: userName }});
  }
}

export const sortProjects = (sortBy : string) => {
  return (dispatch : Function) => {
    const data = sortBy?{ requestName: sortBy }:{};

    datasets.postData(SERVER.FILTER_PROJECT, data, datasets.getToken()).then(data => {
      console.log(data);
    });
  }
}