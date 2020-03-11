import * as types from '../types';
import { Debris } from '../../Classes/Maintenance/Debris';

const debris = (state = new Debris(), action : any) => {
    switch(action.type) {
        case types.REPLACE_DEBRIS: 
            return {...action.debris}
        default: 
            return state;
    }
}

export default debris;