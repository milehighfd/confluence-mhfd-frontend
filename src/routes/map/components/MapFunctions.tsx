import * as mapboxgl from 'mapbox-gl';

export const addGeojsonSource = (map: any, geojson: any, isProblemActive: boolean, allFilters?: any) => {
  
  let mag1 =  ['==', ['get', 'problem_type'], 'Watershed Change'];
  let mag2 = ['==', ['get', 'problem_type'], 'Stream Function'];
  let mag3 =  ['==', ['get', 'problem_type'], 'Flood Hazard'];
  if (allFilters) {
    mag1 = [...allFilters, mag1];
    mag2 = [...allFilters, mag2];
    mag3 = [...allFilters, mag3];
  }

//   const elements = document.getElementsByClassName('svgclass');
//   for (let i = 0; i < elements.length; i++) {
//     if (elements[i]) {
//       elements[i].remove()
//     }
//  }
  if(map.getSource('clusterproblem')) {
    removeGeojsonCluster(map);
  }
  if ( !isProblemActive ) return;
  setTimeout(() => {
    // if(map.getSource('clusterproblem')) {
    //   removeGeojsonCluster(map);
    // }
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

  const colors = ['#fee0d2', '#fc9272', '#de2d26', '#00ff00'];
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
        11.2, 0.01,
        11.22, 0,
      ],
      'circle-radius': 12
    },
    'maxzoom': 11.2
  });
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
    'maxzoom': 11.2
  });
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
  function createDonutChart(props: any) {
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
    const fontSize =
      total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    const r =
      total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    const r0 = Math.round(r * 0.6);
    const w = r * 2;

    let html = `<div class='svgclass'>
    <svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;

    for (let i = 0; i < counts.length; i++) {
      html += donutSegment(
        offsets[i] / total,
        (offsets[i] + counts[i]) / total,
        r,
        r0,
        colors[i]
      );
    }
    html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="white" />
    <text dominant-baseline="central" transform="translate(${r}, ${r})">
    ${total.toLocaleString()}
    </text>
    </svg>
    </div>`;
    if (total > 0) {

    }
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
  }

  function donutSegment(start: any, end: any, r: any, r0: any, color: any) {
    if (end - start === 1) end -= 0.00001;
    const a0 = 2 * Math.PI * (start - 0.25);
    const a1 = 2 * Math.PI * (end - 0.25);
    const x0 = Math.cos(a0), y0 = Math.sin(a0);
    const x1 = Math.cos(a1), y1 = Math.sin(a1);
    const largeArc = end - start > 0.5 ? 1 : 0;

    // draw an SVG path
    return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r + r * y0
      } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${r + r0 * x1
      } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0
      }" fill="${color}" />`;
  }

  // after the GeoJSON data is loaded, update markers on the screen on every frame
  map!.on('render', () => {
    if(!map.getSource('clusterproblem')){
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

export const removeGeojsonCluster = (map: any) => {
  if(map!.getSource('clusterproblem')) {
    if (map.getLayer('clusterproblem')) {
      map.removeLayer('clusterproblem');
    }
    if (map.getLayer('clusterproblem_label')) {
      map.removeLayer('clusterproblem_label');
    }
    map.removeSource('clusterproblem');
  }
}