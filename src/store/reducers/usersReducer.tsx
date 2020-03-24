import * as types from '../types/usersTypes';


const initStateUsersActivated = {
    usersActivated: [
    ],
    usersPending: [
    ]
}

const users = (state = initStateUsersActivated, action : any) => {
    switch(action.type) {
        case types.SAVE_USER_ACTIVATED: 
            return {
                ...state,
                usersActivated: action.users
            }
        case types.SAVE_USER_PENDING:
            return {
                ...state,
                usersPending: action.users
            }
        case types.DELETE_USER_ACTIVATED: 
            return {
                ...state,
                usersActivated: action.users
            }
        case types.DELETE_USER_PENDING:
            return {
                ...state,
                usersPending: action.users
            }
        case types.ADD_USER_ACTIVATED: 
            return {
                ...state,
                usersActivated: action.users
            }
        case types.ADD_USER_PENDING:
            return {
                ...state,
                usersPending: action.users
            }
        default: 
            return state;
    }
}
export default users;