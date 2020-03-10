import * as types from '../types';

export const replaceAppUser = (appUser : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.REPLACE_USER, appUser });
    }
}