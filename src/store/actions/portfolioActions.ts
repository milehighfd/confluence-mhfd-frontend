import * as types from 'store/types/portfolioTypes';

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
