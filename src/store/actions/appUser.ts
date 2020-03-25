import * as types from '../types';
import { User } from '../../Classes/User';

export const replaceAppUser = (appUser : User) => {
    return (dispatch : Function) => {
        dispatch({ type: types.REPLACE_USER, appUser });
    }
}