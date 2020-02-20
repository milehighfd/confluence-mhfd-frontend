import * as types from '../types/sample';

export const sample = (state={a:1}, action: any) => {
  switch (action.type) {
    case types.LOAD:
      return {a: 4};
    default:
      return state;
  }
};
