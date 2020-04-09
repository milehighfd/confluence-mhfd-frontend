import * as types from '../types';
import { User } from '../../Classes/User';



const appUser = (state = new User(), action : any) => {
    switch(action.type) {
        case types.REPLACE_USER: 
            return {...action.appUser}
        default: 
            return state;
    }
}

export default appUser;