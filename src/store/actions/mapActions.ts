import * as types from '../types/mapTypes';

export const getReverseGeocode = (lat : any, lng : any, accessToken : string) => {
    return (dispatch : Function) => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?types=place&access_token=" + accessToken;
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch({ type: types.SET_REVERSE_GEOCODE, county: data.features[0].text }))
            .catch(err =>  dispatch({ type: types.GEOCODE_REQUEST_ERROR, err }));
    }
}

export const savePolygonCoordinates = (polygon : Array<[]>) => {
    return (dispatch : Function) => {
        dispatch({ type: types.SAVE_POLYGON_COORDS, polygon });
    }
}

export const saveNewProjectForm = (data : Object) => {
    return (dispatch : Function, getState : Function) => {
        const state = getState();
        const newProjectData = state.map.newProject;
        const problems = [...state.map.problems];

        const newProject = {
            problemId: 'NSBPJZSHHX',
            problemName: 'Denver Channel Refactoring',
            problemPriority: 0.7,
            solutionCost: 500120,
            ...newProjectData
        }
        problems.push(newProject);

        dispatch({ type: types.CREATE_NEW_PROJECT, problems})
    }
}