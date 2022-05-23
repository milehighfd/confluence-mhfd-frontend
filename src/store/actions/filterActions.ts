import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";

import * as types from '../types/filterTypes';

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