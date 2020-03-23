import * as types from '../types/mapTypes';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";

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

export const saveNewCapitalForm = (data : Object, components: Array<Object>, total: any, files: Array<any>) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const newProject = {
            ...data,
            finalCost: total ? total.total : 0, 
            jurisdiction: county,
            additionalCost: total ? total.additional?.cost : 0, 
            additionalCostDescription: total ? total.additional?.description : 0, 
            overheadCost: total ? total.overhead?.cost : 0, 
            overheadCostDescription: total ? total.overhead?.description : 0,
            components
        };

        const result = datasets.postData(SERVER.CREATE_PROJECT, newProject, datasets.getToken()).then(res => {
            if (res?._id) {
                if(files) {
                    for(let da of files) {
                        console.log(da);
                        const data2 = {
                            file: da.originFileObj,
                            projectid: res._id
                        };
                        datasets.postDataMultipart(SERVER.UPLOAD_FILE, data2, datasets.getToken()).then(res1 => {
                            console.log(res1);
                        })
                    }
                }
                dispatch(setRouteRedirect(true));
            }
        });

        // const newProjectData = state.map.newProject;
        // dispatch({ type: types.CREATE_NEW_PROJECT, problems})
    }
}

export const saveNewProjectWithCoords = (data : Object) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;
        const coordinates = state.map.newProject.coordinates;

        const newProject = {
            ...data,
            jurisdiction: county,
            coordinates
        };

        const result = datasets.postData(SERVER.CREATE_PROJECT, newProject, datasets.getToken()).then(res => {
            if (res?._id) {
                dispatch(setRouteRedirect(true));
            }
        });
    }
}

export const saveNewStudyForm = (data: Object) => {
    return (dispatch : Function, getState : Function) => {
        const result = datasets.postData(SERVER.CREATE_PROJECT, data, datasets.getToken()).then(res => {
            if (res?._id) {
                dispatch(setRouteRedirect(true));
            }
        });
    }
}

export const saveNewMaintenanceForm = (data: Object, files: Array<any>) => {
    return (dispatch : Function, getState : Function) => {
        const result = datasets.postData(SERVER.CREATE_PROJECT, data, datasets.getToken()).then(res => {
            if (res?._id) {
                dispatch(setRouteRedirect(true));
            }
        });
    }
}

export const setRouteRedirect = (status : boolean) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SET_REDIRECT, status });
    }
}