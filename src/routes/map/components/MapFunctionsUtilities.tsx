import * as turf from '@turf/turf';

/**
  Creates an interval that waits until the `map` is loaded.
  the interval is referenced with `intervalId` and the resolution is done by `promise`
  @param map mapboxgl.Map
  @returns [intervalId, promise]
 */
export const waitingInterval = (map: any): any[] => {
  let intervalId;
  const promise = new Promise<boolean>(resolve => {
    intervalId = setInterval(() => {
      if (map && map.isStyleLoaded()) {
        resolve(true);
      }
    }, 250);
  });
  return [intervalId, promise];
};

export const flytoBoundsCoor = (
  getCurrent: any,
  userInformation: any,
  globalMapId: any,
  coorBounds: any,
  map: any,
  groupOrganization: any,
  setCoordinatesJurisdiction: any,
) => {
  if (userInformation.isSelect !== 'isinit') {
    let historicBounds = getCurrent();
    if (historicBounds && historicBounds.bbox && userInformation.isSelect != 'isSelect') {
      globalMapId = historicBounds.id;
      map.fitBounds([
        [historicBounds.bbox[0], historicBounds.bbox[1]],
        [historicBounds.bbox[2], historicBounds.bbox[3]],
      ]);
    } else if (coorBounds[0] && coorBounds[1]) {
      map.fitBounds(coorBounds);
    }
    if (userInformation.isSelect != 'isSelect') {
      // map.setZoom(9)
      setTimeout(() => {
        const zoomareaSelected = groupOrganization
          .filter((x: any) => x.name === userInformation.zoomarea)
          .map((element: any) => {
            return {
              aoi: element.name,
              filter: element?.filter,
              coordinates: element?.coordinates?.coordinates,
            };
          });
        if (zoomareaSelected[0]) {
          setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
        }
      }, 5000);
    }
  }
};

export const depth = (arr: any) => arr.reduce((count: any, v: any) => (!Array.isArray(v) ? count : 1 + depth(v)), 1);
export const getTitleOfStreamImprovements = (properties: any) => {
  let title = '';
  if (properties.component_part_category) {
    title = properties.component_part_category;
  }
  if (properties.component_part_subcategory) {
    title += (properties.component_part_category ? ' - ' : '') + properties.component_part_subcategory;
  }
  return title;
};

export const getTitleOfProblemsPart = (feature: any) => {
  let title = '';
  if (feature.source.includes('hazard_polygon')) {
    title = 'Flood Hazard Polygon';
  }
  if (feature.source.includes('hazard_line')) {
    title = 'Flood Hazard Line';
  }
  if (feature.source.includes('hazard_point')) {
    title = 'Flood Hazard Point';
  }
  if (feature.source.includes('function_line')) {
    title = 'Stream Condition Line';
  }
  if (feature.source.includes('function_polygon')) {
    title = 'Stream Condition Polygon';
  }
  if (feature.source.includes('function_point')) {
    title = 'Stream Condition Point';
  }
  if (feature.source.includes('development_polygon')) {
    title = 'Watershed Change Polygon';
  }
  if (feature.source.includes('development_line')) {
    title = 'Watershed Change Line';
  }
  if (feature.source.includes('development_point')) {
    title = 'Watershed Change Point';
  }
  return title;
};
export const getTitleOfLandUse = (feature: any) => {
  let title = '';
  if (feature.properties.gridcode === 1) {
    title = 'Structures';
  }
  if (feature.properties.gridcode === 2) {
    title = 'Impervious Surfaces';
  }
  if (feature.properties.gridcode === 3) {
    title = 'Water';
  }
  if (feature.properties.gridcode === 4) {
    title = 'Grassland';
  }
  if (feature.properties.gridcode === 5) {
    title = 'Tree Canopy';
  }
  if (feature.properties.gridcode === 6) {
    title = 'Irrigated Land/Turf';
  }
  if (feature.properties.gridcode === 7) {
    title = 'Barren/Rock';
  }
  if (feature.properties.gridcode === 8) {
    title = 'Cropland';
  }
  if (feature.properties.gridcode === 9) {
    title = 'Shrubland/Scrubland';
  }

  return title;
};

export const getTitle = (text: string) => {
  const textTitle = text.split('|');
  const parsed = textTitle[1]?.split(',');
  if (parsed.length === 1) {
    return { title: parsed[0], subtitle: '' };
  }
  parsed.pop();
  let zip = parsed.pop() || 'Colorado XXX';
  zip = zip.trim();
  zip = zip.split(' ')[1];
  const city = parsed.pop()?.trim() || 'City';
  let titleArray = parsed.pop()?.split(',') || ['Place'];
  let title = titleArray[0];
  if (titleArray.length === 2) {
    title = titleArray[1];
  }
  return {
    title: title,
    subtitle: city + ' , CO ' + zip,
  };
};

export const getDateMep = (mep_eligibilitystatus: any, props: any) => {
  if (!mep_eligibilitystatus) return undefined;
  let finalDate = new Date(0);
  if (mep_eligibilitystatus == 'Design Approval') {
    finalDate = new Date(props.mep_date_designapproval);
  } else if (mep_eligibilitystatus == 'Construction Approval') {
    finalDate = new Date(props.mep_date_constructionapproval);
  } else if (mep_eligibilitystatus == 'Final Acceptance') {
    finalDate = new Date(props.mep_date_finalacceptance);
  } else if (mep_eligibilitystatus == 'Ineligible') {
    finalDate = new Date(props.mep_date_ineligible);
  }
  let stringDate =
    (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
    '/' +
    (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
    '/' +
    finalDate.getFullYear();
  if (stringDate.includes('NaN')) {
    return '-';
  } else {
    return stringDate;
  }
};

export const parseDateZ = (dateParser: any) => {
  let finalDate = new Date(dateParser);
  let stringDate =
    (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
    '/' +
    (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
    '/' +
    finalDate.getFullYear();
  if (stringDate.includes('NaN')) {
    return '-';
  } else {
    return stringDate;
  }
};
export const epochTransform = (dateParser: any) => {
  let finalDate = new Date(0);
  finalDate.setUTCMilliseconds(dateParser);
  let stringDate =
    (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
    '/' +
    (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
    '/' +
    finalDate.getFullYear();
  if (stringDate.includes('NaN')) {
    return '-';
  } else {
    return stringDate;
  }
};

export const polyMask = (mask: any, bounds: any) => {
  if (mask !== undefined && bounds.length > 0) {
    var bboxPoly = turf.bboxPolygon(bounds);
    return turf.difference(bboxPoly, mask);
  }
};
export const applyMeasuresLayer = (map: any, geojsonMeasures: any, geojsonMeasuresSaved: any) => {
  if (!map.getSource('geojsonMeasure')) {
    map.addSource('geojsonMeasure', {
      type: 'geojson',
      data: geojsonMeasures,
    });
    map.addLayer({
      id: 'measure-points',
      type: 'circle',
      source: 'geojsonMeasure',
      paint: {
        'circle-radius': 5,
        'circle-color': '#FDB32B',
      },
      filter: ['in', '$type', 'Point'],
    });
    map.addLayer({
      id: 'measure-lines',
      type: 'line',
      source: 'geojsonMeasure',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#DBA32A',
        'line-width': 2.5,
      },
      filter: ['in', '$type', 'LineString'],
    });
  }
  if (!map.getSource('geojsonMeasuresSaved')) {
    map.addSource('geojsonMeasuresSaved', {
      type: 'geojson',
      data: geojsonMeasuresSaved,
    });
    map.addLayer({
      id: 'measuresSaved',
      type: 'fill',
      source: 'geojsonMeasuresSaved',
      paint: {
        'fill-color': '#E7832A',
        'fill-outline-color': '#E7832A',
        'fill-opacity': 0.3,
      },
      filter: ['in', 'type', 'polygon'],
    });
    map.addLayer({
      id: 'measuresSaved-border',
      type: 'line',
      source: 'geojsonMeasuresSaved',
      paint: {
        'line-color': '#E7832A',
        'line-width': 4,
      },
    });
    map.addLayer({
      id: 'measuresSaved-border-invisible',
      type: 'line',
      source: 'geojsonMeasuresSaved',
      paint: {
        'line-color': '#E70000',
        'line-width': 17,
        'line-opacity': 0,
      },
      filter: ['in', 'type', 'line'],
    });
  }
};
