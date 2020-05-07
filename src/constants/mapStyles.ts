import {
  FLOODPLAINS_FEMA_FILTERS,
  FLOODPLAINS_NON_FEMA_FILTERS,
  WATERSHED_FILTERS,
  STREAMS_FILTERS,
  SERVICE_AREA_FILTERS,
  MUNICIPALITIES_FILTERS,
  COUNTIES_FILTERS,
  MHFD_BOUNDARY_FILTERS,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENTS_TRIGGER,
  MEP_PROJECTS,
  ROUTINE_MAINTENANCE
} from "./constants";

export const localComponents = {
  type: 'circle',
  layout: {},
  paint: {
      'circle-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#9e9d24',
          '#ef5350'
      ],
      'circle-stroke-color': '#f44336',
      'circle-stroke-width': 1,
      'circle-stroke-opacity': 0.75,
      'circle-opacity': 1
  }
};

export const selectedComponents = {
  type: 'circle',
  layout: {},
  paint: {
      'circle-color': '#9e9d24',
      'circle-stroke-color': '#f44336',
      'circle-stroke-width': 1,
      'circle-stroke-opacity': 0.75,
      'circle-opacity': 1
  }
};

export const polygonFill = {
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': '#088',
      'fill-opacity': 0.3,
  }
};

export const polygonStroke = {
  type: 'line',
  layout: {},
  paint: {
      'line-color': '#00bfa5',
      'line-width': 2.5,
  }
};

export const tileStroke = {
  type: 'line',
  'source-layer': 'layer0',
  layout: {},
  paint: {
      'line-color': '#00bfa5',
      'line-width': 1
  }
};

export const tileStyles = {
  [FLOODPLAINS_FEMA_FILTERS]: {
    type: 'line',
    'source-layer': 'layer0',
    layout: {},
    paint: {
        'line-color': '#00bfa5',
        'line-width': 1
    }
  },
  [FLOODPLAINS_NON_FEMA_FILTERS]: {}, 
  [WATERSHED_FILTERS]: {}, 
  [STREAMS_FILTERS]: {}, 
  [SERVICE_AREA_FILTERS]: {}, 
  [MUNICIPALITIES_FILTERS]: {}, 
  [COUNTIES_FILTERS]: {},
  [MHFD_BOUNDARY_FILTERS]: {}, 
  [PROBLEMS_TRIGGER]: {}, 
  [PROJECTS_TRIGGER]: {}, 
  [COMPONENTS_TRIGGER]: {},
  [MEP_PROJECTS]: {}, 
  [ROUTINE_MAINTENANCE]: {}
} 