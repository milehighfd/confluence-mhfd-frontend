import * as types from '../types/portfolioTypes';
import * as datasets from '../../Config/datasets';
import { SERVER } from '../../Config/Server.config';

export const setSearchWord = (searchWord: string) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_SEARCH_WORD, payload: searchWord});
  }
};

export const setCurrentGroup = (currentGroup: string) => {
  return (dispatch: Function) => {
    dispatch({type: types.SET_CURRENT_GROUP, payload: currentGroup});
  }
};
