import * as types from '../types';



const appUser = (state = {name: 'juan perez', email: 'galleta', role: 'user'}, action : any) => {
    switch(action.type) {
        case types.REPLACE_USER: 
            return {...action.appUser}
        default: 
            return state;
    }
}

export default appUser;