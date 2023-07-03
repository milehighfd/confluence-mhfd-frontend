import React from 'react';
import * as mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server';
import { ClusterPie } from './ClusterPie';
const colors = ['#FF0806', '#BE0807', '#8D0000', '#00ff00'];

export const addGeojsonSource = (map: any, geojson: any, isProblemActive: boolean, allFilters?: any) => {
  if (!isProblemActive) return;
  let mag1 = ['==', ['get', 'problem_type'], 'Watershed Change'];
  let mag2 = ['==', ['get', 'problem_type'], 'Stream Condition'];
  let mag3 = ['==', ['get', 'problem_type'], 'Flood Hazard'];
  if (allFilters) {
    mag1 = [...allFilters, mag1];
    mag2 = [...allFilters, mag2];
    mag3 = [...allFilters, mag3];
  }
  if (map.getSource('clusterproblem')) {
    removeGeojsonCluster(map);
  }
  setTimeout(() => {
    if (!map.getSource('clusterproblem')) {
      map!.addSource('clusterproblem', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterRadius: 80,
        clusterProperties: {
          'mag1': ['+', ['case', mag1, 1, 0]],
          'mag2': ['+', ['case', mag2, 1, 0]],
          'mag3': ['+', ['case', mag3, 1, 0]]
        }
      });
    }
    if (!map.getLayer('clusterproblem')) {
      map!.addLayer({
        id: 'clusterproblem',
        'type': 'circle',
        'source': 'clusterproblem',
        'filter': ['!=', 'cluster', true],
        'paint': {
          'circle-color': [
            'case',
            mag1,
            colors[0],
            mag2,
            colors[1],
            mag3,
            colors[2],
            colors[3]
          ],
          'circle-opacity': [
            "interpolate",
            ["linear"],
            ["zoom"],
            10.9, 0.01,
            11.0, 0,
          ],
          'circle-radius': 12
        },
        'maxzoom': 11.0
      });
    }
    if (!map.getLayer('clusterproblem_label')) {
      map!.addLayer({
        'id': 'clusterproblem_label',
        'type': 'symbol',
        'source': 'clusterproblem',
        'filter': ['!=', 'cluster', true],
        'layout': {
          'text-field': [
            'format',
            ['get', 'problem_type']
          ],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 10
        },
        'paint': {
          'text-color': 'black',
          'text-opacity': 0.01
        },
        'maxzoom': 11.0
      });
    }

    const markers: any = {};
    let markersOnScreen: any = {};

    function updateMarkers() {
      const newMarkers: any = {};
      const features = map!.querySourceFeatures('clusterproblem');
      // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
      // and add it to the map if it's not there already
      // console.log('FEAtures', features);
      for (const feature of features) {
        const coords = (feature.geometry as any).coordinates;
        const props = feature.properties;
        if (!props!.cluster) continue;
        const id = props!.cluster_id;

        let marker = markers[id];
        if (!marker) {
          const el = createDonutChart(props);
          marker = markers[id] = new mapboxgl.Marker({
            element: el as HTMLElement
          }).setLngLat(coords);
        }
        newMarkers[id] = marker;
        // check if any problem type is on it
        if (!markersOnScreen[id] && (props.mag1 + props.mag2 + props.mag3 > 0)) marker.addTo(map!);
      }
      // for every marker we've added previously, remove those that are no longer visible
      for (const id in markersOnScreen) {
        if (!newMarkers[id]) markersOnScreen[id].remove();
      }
      markersOnScreen = newMarkers;
    }

    // after the GeoJSON data is loaded, update markers on the screen on every frame
    map!.on('render', () => {
      if (!map.getSource('clusterproblem')) {
        for (const id in markersOnScreen) {
          markersOnScreen[id].remove();
        }
        return;
      }
      if (!map!.isSourceLoaded('clusterproblem')) {
        for (const id in markersOnScreen) {
          markersOnScreen[id].remove();
        }
        return;
      }
      updateMarkers();
    });
  }, 200);
}


const createDonutChart = (props: any) => {
  const offsets = [];
  const counts = [
    props.mag1,
    props.mag2,
    props.mag3
  ];
  let total = 0;
  for (const count of counts) {
    offsets.push(total);
    total += count;
  }
  let html = ReactDOMServer.renderToStaticMarkup(
    <ClusterPie counts={counts} offsets={offsets} total={total} />
  );
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.firstChild;
}

export const removeGeojsonCluster = (map: any) => {
  if (map!.getSource('clusterproblem')) {
    if (map.getLayer('clusterproblem')) {
      map.removeLayer('clusterproblem');
    }
    if (map.getLayer('clusterproblem_label')) {
      map.removeLayer('clusterproblem_label');
    }
    map.removeSource('clusterproblem');
  }
}