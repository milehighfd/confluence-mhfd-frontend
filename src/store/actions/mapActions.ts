import * as types from '../types/mapTypes';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { Redirect } from 'react-router-dom';

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

export const saveNewProjectForm = (data : Object, components: Array<Object>, total: any, setRedirect: Function) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const county = state.map.newProject.jurisdiction;

        const newProject = {
            ...data,
            finalCost: total.total, 
            jurisdiction: county,
            additionalCost: total.additional.cost, 
            additionalCostDescription: total.additional.description, 
            overheadCost: total.overhead.cost, 
            overheadCostDescription: total.overhead.description,
            components
        };

        const result = datasets.postData(SERVER.CREATE_PROJECT, newProject, datasets.getToken()).then(res => {
            if (res?._id) {
                setRedirect(true);
            }
        })
        // const newProjectData = state.map.newProject;
        // dispatch({ type: types.CREATE_NEW_PROJECT, problems})
    }
}