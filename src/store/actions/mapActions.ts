import * as types from '../types/mapTypes';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import * as constants from '../../constants/constants';
import { TotalType } from '../../Classes/MapTypes';

export const getReverseGeocode = (lat : any, lng : any, accessToken : string) => {
    /* Intentionally Commented By The Other API Proposal and Backup*/
    return (dispatch : Function) => {
        const url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lng + "%2C" + lat + "&apiKey=" + accessToken;
        // const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?types=place&access_token=" + accessToken;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const feature = data.items[0];
                dispatch({ type: types.SET_REVERSE_GEOCODE, county: feature.address.county });
            })
            // .then(data => dispatch({ type: types.SET_REVERSE_GEOCODE, county: data.features[0].text }))
            .catch(err =>  dispatch({ type: types.GEOCODE_REQUEST_ERROR, err }));
    }
}

export const savePolygonCoordinates = (polygon : Array<[]>) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_POLYGON_COORDS, polygon });
    }
}

export const saveMarkerCoordinates = (marker : Array<[]>) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_MARKER_COORDS, marker });
    }
}

export const saveNewCapitalForm = (data : Object, components: Array<Object>, total: TotalType, files: Array<[]>) => {
    return (dispatch : Function) => {
        if(components.length) {
            const newProject = {
                ...data,
                finalCost: total ? total.total : 0, 
                additionalCost: total ? total.additional?.additionalCost : 0, 
                additionalCostDescription: total ? total.additional?.additionalCostDescription : '', 
                overheadCost: total ? total.overhead?.overheadCost : 0, 
                overheadCostDescription: total ? total.overhead?.overheadCostDescription : '',
                components: JSON.stringify(components)
            };

            dispatch(createNewProjectForm(newProject, files));
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_COMPONENTS_ERROR });
        }
    }
}

export const saveNewStudyForm = (data: Object) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        if(coordinates.length) {
            const result = datasets.postData(SERVER.CREATE_PROJECT, data, datasets.getToken()).then(res => {
                if (res?._id) {
                    dispatch(setRouteRedirect(true));
                }
            });
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_POLYGON_ERROR });
        }

    }
}

export const createNewProjectForm = (data: any, files: Array<any>) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        if(coordinates.length) {
            const dataForm : any = new FormData;
            for (const key in data) {
                dataForm.append(key, '' + data[key]); 
            }
            dataForm.append('jurisdiction', county);
            dataForm.append('coordinates', JSON.stringify(coordinates));
            if(files) {
                for (const file of files) {
                    dataForm.append('file', file.originFileObj);
                }
            }

            const result = datasets.postDataMultipart(SERVER.CREATE_PROJECT, dataForm, datasets.getToken()).then(res => {
                if (res?._id) {
                    dispatch(setRouteRedirect(true));
                }
            });
        } else {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: constants.NO_POLYGON_ERROR });
        }
    }
}

export const clearErrorMessage = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.SET_ERROR_MESSAGE, error: '' });
    }
}

export const setRouteRedirect = (status : boolean) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SET_REDIRECT, status });
    }
}

export const clearCoordinates = () => {
    return (dispatch : Function) => {
        dispatch({ type: types.CLEAR_COORDINATES });
    }
}

export const getProjectWithFilters = (filters : any) => {
    return (dispatch : Function) => {
        const data = filters?filters:{};
        datasets.postData(SERVER.FILTER_PROJECT, data, datasets.getToken()).then(projects => {
            if(data.hasOwnProperty('requestName')) delete data['requestName'];
            dispatch({ type: types.FILTER_PROJECT, data: { projects, filters: data }});
        });
    } 
}

export const removeFilter = (item: any) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        let newFilters = {...state.map.filters};

        if(Array.isArray(newFilters[item.key])) {
            const array = [...newFilters[item.key]];
            const arrayIndex = array.indexOf(item.type);
            if(arrayIndex > -1) array.splice(arrayIndex, 1);

            if(array.length) {
                newFilters = {...newFilters, [item.key]: array};
            } else {
                delete newFilters[item.key];
            }
        } else {
            delete newFilters[item.key];
        }
        dispatch(getProjectWithFilters(newFilters));
    }
}

export const getMapTables = (trigger : string) => {
    return (dispatch: Function, getState: Function) => {
        const state = getState();
        const layers = { ...state.map.layers };
        
        if(!layers[trigger]) {
            const data = { table: trigger };
            datasets.postData(SERVER.MAP_TABLES, data, datasets.getToken()).then(tiles => {
                dispatch({ type: types.GET_MAP_LAYERS, data: { trigger, tiles } });
            });
        }
    }
}