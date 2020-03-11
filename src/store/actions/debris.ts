import * as types from '../types';
import { Debris } from '../../Classes/Maintenance/Debris';

export const replaceDebris = (debris: Debris) => {
    return (dispatch : Function) => {
        dispatch({ type: types.REPLACE_DEBRIS, debris });
    }
}