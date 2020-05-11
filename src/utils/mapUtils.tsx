import * as mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';
import { MapStyleTypes } from '../Classes/MapTypes';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export const addMapGeocoder = (map : any, geocoderRef : RefObject<HTMLDivElement>) => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: 'Search...',
    marker: false
  });

  if (geocoderRef.current) {
    geocoderRef.current.appendChild(geocoder.onAdd(map));
  }
}

export const addMapLayers = (map : any, id : string, style : MapStyleTypes) => {
  const source = id;
  if (style.type === 'line') {
      id += '_stroke';
  }

  map.addLayer({
      id,
      source,
      ...style
  });
}    