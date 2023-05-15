import * as types from '../types';
import { User } from '../../Classes/User';



const appUser = (state = new User(), action : any) => {
    switch(action.type) {
        case types.REPLACE_USER: 
            return {...state,...action.appUser}
        case types.RESET_APP_USER: 
            return {...new User()}
        case types.ADD_NOTIFICATION:
            return {...state, notifications: action.notifications}
        case types.DELETE_NOTIFICATION:
            console.log(action.id)
            console.log(state.notifications.filter((_: any) => _.notification_id !== action.id))
            return {...state, 
                notifications: state.notifications?.filter((_: any) => _.notification_id !== action.id)}
        default: 
            return state;
    }
}

export default appUser;