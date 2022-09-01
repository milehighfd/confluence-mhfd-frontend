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
    },
    timesLogged: -1,
    projecttype: '-'
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
        case types.TIMES_LOGIN: {
            return {
                ...state,
                timesLogged: action.times
            }
        }
        case types.RESET_TIMES_LOGIN: {
            return {
                ...state,
                timesLogged: -1
            }
        }
        case types.CHANGE_BOARD_PROJECT_TYPE: {
            return {
                ...state,
                projecttype: action.projecttype
            }
        }
        default: 
            return state;
    }
}
export default users;