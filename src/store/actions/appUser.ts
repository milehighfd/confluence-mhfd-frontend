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

export const addNotifications = (notifications : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.ADD_NOTIFICATION, notifications });
    }
}

export const deleteNotification = (id : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.DELETE_NOTIFICATION, id });
    }
}