import * as types from '../types/mapTypes';

export const getReverseGeocode = (lat : any, lng : any, accessToken : string) => {
    return (dispatch : Function) => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?access_token=" + accessToken;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const county = data.features.filter((feature : any) => feature.place_type[0] === 'place');
                dispatch({ type: types.SET_REVERSE_GEOCODE, county: county[0].text });
            })
            .catch(err =>  dispatch({ type: types.GEOCODE_REQUEST_ERROR, err }));
    }
}