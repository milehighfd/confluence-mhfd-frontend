import * as types from '../types';
import { User } from '../../Classes/TypeList';

export const replaceAppUser = (appUser : User) => {
    return (dispatch : Function) => {
        dispatch({ type: types.REPLACE_USER, appUser });
    }
}

export const resetAppUser = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.RESET_APP_USER, });
    }
}