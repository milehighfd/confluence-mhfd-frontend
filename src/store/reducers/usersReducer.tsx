import * as types from '../types/usersTypes';


const initStateUsersActivated = {
    usersActivated: [
    ],
    usersPending: [
    ],
    userActivity: [
        {
            name: 'Johanna Maiani',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Kyle Mann',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Rosalie Russell',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Johanna Maiani',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Nora Osborne',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Lillie Munoz',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
        {
            name: 'Jeanette Cruz',
            date: new Date(),
            city: 'Westerminster',
            change: 'User Login'
        },
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
        case types.USER_ACTIVITY:
            return {
                ...state,
                userActivity: action.userActivity
            }
        default: 
            return state;
    }
}
export default users;