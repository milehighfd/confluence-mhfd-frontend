import * as types from '../types/userTypes';

export const saveUserState = (users : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_USERS, users });
    }
}

export const deleteUser = (index : number) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const users = [...state.user.users];
        users.splice(index, 1);
        dispatch({ type: types.DELETE_USER, users });
    }
}
