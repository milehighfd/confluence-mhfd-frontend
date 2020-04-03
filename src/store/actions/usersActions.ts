import * as types from '../types/usersTypes';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";

export const saveUserActivated = (users : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_USER_ACTIVATED, users });
    }
}

export const deleteUserActivated = (index : number) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const users = [...state.users.usersActivated];
        users.splice(index, 1);
        dispatch({ type: types.DELETE_USER_ACTIVATED, users });
    }
}

export const saveUserPending = (users : any) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_USER_PENDING, users });
    }
}
export const deleteUserPending = (index : number) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const users = [...state.users.usersPending];
        users.splice(index, 1);
        dispatch({ type: types.DELETE_USER_PENDING, users });
    }
}

export const addUserActivated = (user : any) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const users = [...state.users.usersActivated];
        users.push(user);
        dispatch({ type: types.DELETE_USER_ACTIVATED, users });
    }
}

export const addUserPending = (user : any) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const users = [...state.users.usersPending];
        users.push(user);
        dispatch({ type: types.DELETE_USER_PENDING, users });
    }
}

export const filterUsers = (filters : any) => {
    return (dispatch: Function) => {
        const data = filters?filters:{};
        datasets.postData(SERVER.FILTER_USERS, data, datasets.getToken()).then(users => {
            // code
            // console.log(users);
        });
    }
}