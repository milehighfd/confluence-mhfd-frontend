import * as types from '../types/userTypes';

const initState = {
    users: [
        {
            profile: {
                name: 'Ronnie',
                lastName: 'Gauger',
                email: 'ronniegau@gmail.com',
                organization: '1st menu item'
            },
            designation: 'MHFD Staff',
            areas: {
                city: '1st menu item',
                country: '2nd menu item',
                serviceArea: '3rd menu item'
            },
            approved: true
        },
        {
            profile: {
                name: 'Annette',
                lastName: 'Griffeth',
                email: 'anegri@gmail.com',
                organization: '2nd menu item'
            },
            designation: 'MHFD Admin',
            areas: {
                city: '1st menu item',
                country: '2nd menu item',
                serviceArea: '3rd menu item'
            },
            approved: false
        },
        {
            profile: {
                name: 'Melvin',
                lastName: 'Wentz',
                email: 'melwentz@gmail.com',
                organization: '3rd menu item'
            },
            designation: 'Other',
            areas: {
                city: '1st menu item',
                country: '2nd menu item',
                serviceArea: '3rd menu item'
            },
            approved: true
        },
    ]
}

const userReducer = (state = initState, action : any) => {
    switch(action.type) {
        case types.SAVE_USERS: 
            return {
                ...state,
                users: action.users
            }
        case types.DELETE_USER:
            return {
                ...state,
                users: action.users
            }
        default: 
            return state;
    }
}

export default userReducer;