import * as types from '../types';

export const replaceAppUser = (appUser : {name: string, email: string, designation: string}) => {
    return (dispatch : Function) => {
        dispatch({ type: types.REPLACE_USER, appUser });
    }
}