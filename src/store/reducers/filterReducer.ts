import * as types from '../types/userTypes';

const initState = {
    filters: [{
        name: 'filter',
        type: 'csm'
    }]
}

const filterReducer = (state = initState, action : any) => {
    switch(action.type) {
        default: 
            return state;
    }
}

export default filterReducer;