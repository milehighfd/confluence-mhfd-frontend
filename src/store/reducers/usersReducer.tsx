import * as types from '../types/usersTypes';


const initStateUsersActivated = {
    usersActivated: [
    ],
    usersPending: [
    ],
    userActivity: { data: [
        {
            name: 'Johanna Maiani',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        
        ],
        totalPages: 1,
        currentPage: 1
    }
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
        case types.USER_ACTIVITY:
            return {
                ...state,
                userActivity: action.res
            }
        default: 
            return state;
    }
}
export default users;