import React, { useEffect } from 'react';
import { MAPBOX_TOKEN } from '../../constants/constants';
import * as mapboxgl from 'mapbox-gl';

let map: any = null;
const MapTest = () => {
  useEffect(() => {
    (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/milehighfd/ckxhudjgf1er514o9wbyvi6nw',
      center: [	-104.988853, 39.739433],
      zoom: 4.2,
    });
    map.on('style.load', () => {
      map.addSource('airports', {
        'type': 'vector',
        'url': 'mapbox://mapbox.04w69w5j'
        });
        map.addSource('national-park', {
          'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': [
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
            [-121.32366918295283, 30.439844258344806],
            [-121.78855611526983, 55.340528126791966],
            [-100.02804133739309, 45.488104117080084],
            [-119.93614426702828,30.379273442062114]
            ]
          ]
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-121.415061, 40.506229]
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [ -122.52512713078161, 40.120392486334985]
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-121.505184, 40.488084]
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-121.354465, 40.488737]
          }
          }
          ]
          }
          });

        map.addLayer({
          'id': 'park-boundary',
          'type': 'fill',
          'source': 'national-park',
          'paint': {
          'fill-color': '#888888',
          'fill-opacity': 1
          },
          'filter': ['==', '$type', 'Polygon']
          });
        map.addLayer({
        'id': 'airport',
        'source': 'airports',
        'source-layer': 'ne_10m_airports',
        'type': 'circle',
        'paint': {
        'circle-color': '#4264fb',
        'circle-radius': 20,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
        }
        });
         
        map.addLayer({
        'id': 'park-volcanoes',
        'type': 'circle',
        'source': 'national-park',
          'paint': {
            'circle-color': '#B42222',
            'circle-radius': 12,
            'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
          },
        'filter': ['==', '$type', 'Point']
        }
        );
    });
    setTimeout(() => {
      console.log('IS MOVING LAYER');
      console.log('maplayer', map.getStyle().layers);
      map.moveLayer('park-volcanoes', 'park-boundary');
      map.moveLayer('airport', 'park-boundary');
      map.moveLayer('park-boundary');
      console.log('maplayerafter move', map.getStyle().layers);

    }, 10000);
    
  },[]);

  return (
    <>
      <span> HELLO WORLDD</span>
      <div id="map">
      </div>
    </>
  )
};

export default MapTest;
