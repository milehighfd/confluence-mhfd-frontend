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
                dispatch({ type: types.SET_REVERSE_GEOCODE, county: feature?feature.address.county:'' });
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

export const saveNewStudyForm = (data: any) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        if(coordinates.length) {
            const dataForm : any = new FormData();
            for (const key in data) {
                dataForm.append(key, '' + data[key]); 
            }
            
            dataForm.append('jurisdiction', county);
            dataForm.append('coordinates', JSON.stringify(coordinates));
            datasets.postDataMultipart(SERVER.CREATE_PROJECT, dataForm, datasets.getToken()).then(res => {
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
            const dataForm : any = new FormData();
            for (const key in data) {
                dataForm.append(key, '' + data[key]); 
            }
            dataForm.append('county', county);
            dataForm.append('coordinates', JSON.stringify(coordinates));
            if(files) {
                for (const file of files) {
                    dataForm.append('file', file.originFileObj);
                }
            }

            datasets.postDataMultipart(SERVER.CREATE_PROJECT, dataForm, datasets.getToken()).then(res => {
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

export const getPolygonStreams = (coordinates : Array<Array<number>>) => {
    return (dispatch : Function) => {
        /* https://postgis.net/docs/ST_GeomFromGeoJSON.html */
        /* in this particular case uncomment the turf call in Map.tsx (line 232) */

        /* https://postgis.net/docs/ST_GeomFromText.html */
        let postGisQuery = "'POLYGON((";
        coordinates.forEach((points : Array<number>) => {
            points.forEach((point : number) => postGisQuery += (point + ','));
        });
        postGisQuery = postGisQuery.slice(0, -1) + "))'";

        // console.log(coordinates);  --> for getting POSTGIS GEOJSON format
        // console.log(postGisQuery); --> for getting the POSTGIS normal format
    }
}