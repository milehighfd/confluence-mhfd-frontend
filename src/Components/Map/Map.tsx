import React, { useEffect, useRef } from 'react'
import * as mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbmk4ODgiLCJhIjoiY2swenFnd2o0MHN4djNibnhwOGpicHVhcyJ9.gGs9uPzUhpgH3F127w3ggQ';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

let map : any = null;

const Map = ({ leftWidth, selectedMapStyle, children } : any) => {
    let mapRef = useRef<any>();

    useEffect(() => {
        (mapboxgl as any).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            style: selectedMapStyle, //hosted style id
            center: [-105.02, 39.805], // starting position
            zoom: 11 // starting zoom
        });

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'bottom-right');

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
        }, [selectedMapStyle]);

        const geo = document.getElementById('geocoder')!;
        geo.appendChild(geocoder.onAdd(map));
    }, []);

    useEffect(() => {
        map.setStyle(selectedMapStyle);
    }, [selectedMapStyle])

    useEffect(() => {
        map.resize();
    }, [leftWidth])

    return (
        <>
        <div id="map" ref={mapRef} style={{width: '100%', height: '100%'}}>
            {children}
        </div>
        </>
    )
}

export default Map;
