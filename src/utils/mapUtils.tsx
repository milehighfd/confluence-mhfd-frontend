import * as mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';
import { MapStyleTypes } from '../Classes/MapTypes';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export const getMapBoundingBoxTrimmed = (map: mapboxgl.Map) => {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return [
    sw.lng, sw.lat, ne.lng, ne.lat
  ].map(r => r.toFixed(4)).join(',');
}

export const addMapGeocoder = (map : any, geocoderRef : RefObject<HTMLDivElement>) => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: 'Search...',
    bbox: [-109.4424900706, 36.6070426751, -101.6263840793, 41.2535776532],
    marker: {
      color: 'orange'
      }
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