import * as types from 'store/types/portfolioTypes';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

export const setSearchWord = (searchWord: string) => ({
  type: types.SET_SEARCH_WORD,
  payload: searchWord
});

export const setCurrentGroup = (currentGroup: string) => ({
  type: types.SET_CURRENT_GROUP,
  payload: currentGroup
});

export const setFavorites = (favorites: Array<any>) => ({
  type: types.SET_FAVORITES,
  payload: favorites
});

export const deleteFavorite = (id: number) => {
  return (dispatch: Function) => {
    datasets.deleteDataWithBody(
      SERVER.DELETE_FAVORITE,
      { id },
      datasets.getToken()
    ).then((args) => {
      console.log('here', args);
      dispatch({type: types.PM_DELETE_FAVORITE, payload: id});
    }).catch((error: any) => {
      console.log('Error on delete favorite?', error);
    });
  }
};

export const addFavorite = (id: number) => {
  return (dispatch: Function) => {
    datasets.getData(
      `${SERVER.ADD_FAVORITE}?id=${id}`,
      datasets.getToken()
    ).then((res) => {
      dispatch({type: types.PM_ADD_FAVORITE, payload: res});
    }).catch((error: any) => {
      console.log('Error on delete favorite?', error);
    });
  }
};
