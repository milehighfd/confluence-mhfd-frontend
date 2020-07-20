import {
  FLOODPLAINS_FEMA_FILTERS,
  FLOODPLAINS_NON_FEMA_FILTERS,
  WATERSHED_FILTERS,
  STREAMS_FILTERS,
  SERVICE_AREA_FILTERS,
  SERVICE_AREA_POINTS,
  MUNICIPALITIES_FILTERS,
  MUNICIPALITIES_POINTS,
  COUNTIES_FILTERS,
  COUNTIES_POINTS,
  MHFD_BOUNDARY_FILTERS,
  PROBLEMS_TRIGGER,
  GRADE_CONTROL_STRUCTURE,
  PIPE_APPURTENANCES,
  SPECIAL_ITEM_POINT,
  SPECIAL_ITEM_LINEAR,
  SPECIAL_ITEM_AREA,
  CHANNEL_IMPROVEMENTS_LINEAR,
  CHANNEL_IMPROVEMENTS_AREA,
  REMOVAL_LINE,
  REMOVAL_AREA,
  STORM_DRAIN,
  DETENTION_FACILITIES,
  MAINTENANCE_TRAILS,
  LAND_ACQUISITION,
  LANDSCAPING_AREA,
  MEP_PROJECTS_TEMP_LOCATIONS,
  MEP_PROJECTS_DETENTION_BASINS,
  MEP_PROJECTS_CHANNELS,
  MEP_PROJECTS_STORM_OUTFALLS,
  ROUTINE_NATURAL_AREAS,
  ROUTINE_WEED_CONTROL,
  ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR,
  PROJECTS_POLYGONS,
  PROJECTS_LINE
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

export const COMPONENT_LAYERS_STYLE = {
  [GRADE_CONTROL_STRUCTURE]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'waterfall',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    },
  }],
  [PIPE_APPURTENANCES]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'outfall',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    }
  }],
  [SPECIAL_ITEM_POINT]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'star',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    },
  }],
  [SPECIAL_ITEM_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#ffc700',
        'line-width': 2.5,
        'line-opacity': 1
    }
  }],
  [SPECIAL_ITEM_AREA]: [
    {
      type: 'fill',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'fill-color': '#ffc700',
          'fill-opacity': 0.53,
      }
    },
    {
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'line-color': '#ffc700',
          'line-width': 2.5,
          'line-opacity': 1
      }
    }
  ],
  [CHANNEL_IMPROVEMENTS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#34b356',
        'line-width': 3.5,
        'line-opacity': 1,
        'line-dasharray': [4, 4, 1]
    }
  }],
  [CHANNEL_IMPROVEMENTS_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#34b356',
        'fill-opacity': 0.2
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-width': 4,
      'line-color': '#34b356',
      'line-opacity': 1,
      'line-dasharray': [4, 4, 1]
    }
  }],
  [REMOVAL_LINE]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#c6cecf',
        'line-width': 3,
        'line-opacity': 1
    }
  }],
  [REMOVAL_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#c6cecf',
        'fill-opacity': 0.4
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-width': 4,
      'line-color': '#c6cecf',
      'line-opacity': 1,
      'line-dasharray': [4, 4, 1]
    }
  }],
  [STORM_DRAIN]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#34b356',
        'line-width': 2,
        'line-opacity': 1
    }
  }],
  [DETENTION_FACILITIES]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#1f67f2',
        'fill-opacity': 0.3
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#1f67f2',
        'line-opacity': 1,
        'line-width': 1.5
    }
  }],
  [MAINTENANCE_TRAILS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#956557',
        'fill-opacity': 0.3
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#956557',
        'line-width': 1.5,
        'line-opacity': 1
    }
  }],
  [LAND_ACQUISITION]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#f2d852',
        'fill-opacity': 0.9
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#FFFFFF',
        'line-opacity': 0.5,
        'line-width': 1.5
    }
  }],
  [LANDSCAPING_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#38bb45',
        'fill-opacity': 0.9
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#ffffff',
        'line-opacity': 0.78,
        'line-width': 1
    }
  }]
}

const MEP_PROJECTS_STYLES = {
  [MEP_PROJECTS_TEMP_LOCATIONS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'construction-04',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    }
  }],
  [MEP_PROJECTS_DETENTION_BASINS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#60bde6',
        'fill-opacity': 0.4
    }
  }],
  [MEP_PROJECTS_CHANNELS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#968862',
        'line-width': 1
    }
  }],
  [MEP_PROJECTS_STORM_OUTFALLS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'construction-01',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    }
  }]
}

const ROUTINE_MAINTENANCE_STYLES = {
  [ROUTINE_NATURAL_AREAS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#d9ceba',
        'fill-opacity': 0.51
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#d2b175',
        'line-width': 2,
        'line-opacity': 0
    }
  }],
  [ROUTINE_WEED_CONTROL]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#4cfca4',
        'fill-opacity': 0.7
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-color': '#134e33',
      'line-width': 2,
      'line-opacity': 0
    }
  }],
  [ROUTINE_DEBRIS_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#bebdbf',
        'fill-opacity': 0.9
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-color': '#434243',
      'line-width': 2,
      'line-opacity': 1,
      'line-dasharray': [2, 2, 2]
    }
  }],
  [ROUTINE_DEBRIS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#0a0b0b',
        'line-width': 3,
        'line-dasharray': [2, 2, 2]
    }
  }]
}

export const PROJECTS_STYLES = {
  [PROJECTS_POLYGONS]: [  
    {
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'line-color': [
            'match',
            ['get', 'projecttype'],
            'Maintenance',
            '#29c499',
            'Capital',
            '#ffdd00',
            'Study',
            '#951eba',
            '#fff'
          ],
          'line-width': 2.25,
      }
    }
],
  [PROJECTS_LINE]: [
    {
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
        'line-color': [
          'match',
          ['get', 'projecttype'],
          'Maintenance',
          '#29c499',
          'Capital',
          '#ffdd00',
          'Study',
          '#f2552e',
          '#fff'
        ],
        'line-width': 2.25,
      }
    }
  ]
}

export const tileStyles = {
  [FLOODPLAINS_FEMA_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#f7b532',
        'fill-opacity': 0.7
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#915e10',
        'line-width': 0.5,
        'line-opacity': 0.5
    }
  }],
  [FLOODPLAINS_NON_FEMA_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': [
          'match',
          ['get', 'fld_zone'],
          'A',
          'red',
          'AE',
          'red',
          'AO',
          'red',
          'transparent'
        ],
        'fill-opacity': 0.7
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': [
          'match',
          ['get', 'fld_zone'],
          'A',
          'red',
          'AE',
          'red',
          'AO',
          'red',
          'transparent'
        ],
        'line-width': 0.5,
        'line-opacity': 1
    }
  }], 
  [WATERSHED_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#f2695c',
        'fill-opacity': 0,
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#f55e50',
        'line-width': 0.75,
        'line-opacity': 1
    }
  }], 
  [STREAMS_FILTERS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#66d4ff',
        'line-width': ['interpolate', ['linear'], ['get', 'cfs'], 0.11, 4, 0.451, 3.125, 0.81, 2.25, 1.151, 1.375, 1.51, 0.5],
        'line-opacity': 1
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'text-field': ['get', 'str_name'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto'
    },
    paint: {
      'text-color': '#FFF'
    }
  }], 
  [SERVICE_AREA_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#826dba',
        'fill-opacity': 0
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#fd8b1a',
        'line-width': 1,
        'line-opacity': 1
    }, 
  }],
  [SERVICE_AREA_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'text-field': ['get', 'srvarea'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto'
    },
    paint: {
      'text-color': '#FFF'
    }
  }],
  [MUNICIPALITIES_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#bc73ff',
        'fill-opacity': 0.5
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#41108c',
        'line-width': 1,
        'line-opacity': 0.5
    }
  }], 
  [MUNICIPALITIES_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'text-field': ['get', 'city'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto'
    },
    paint: {
      'text-color': '#FFF'
    }
  }],
  [COUNTIES_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#9265b9',
        'fill-opacity': 0.5
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#7b2491',
        'line-width': 4,
        'line-opacity': 0.5
    }, 
  }],
  [COUNTIES_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'text-field': ['get', 'county'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto'
    },
    paint: {
      'text-color': '#FFF'
    }
  }],
  [MHFD_BOUNDARY_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#826dba',
        'fill-opacity': 0
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#ffffff',
        'line-width': 4,
        'line-opacity': 1,
        'line-dasharray': [4, 4, 4]
    }
  }], 
  [PROBLEMS_TRIGGER]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'fill-color': '#f2552e',
        'fill-opacity': 0,
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': '#f2552e',
        'line-width': 4,
        'line-opacity': 1,
        'line-dasharray': [2,2,2]
    }
  }], 
  ...COMPONENT_LAYERS_STYLE,
  ...MEP_PROJECTS_STYLES,
  ...ROUTINE_MAINTENANCE_STYLES,
  ...PROJECTS_STYLES
}

export const USER_POLYGON_FILL_STYLES = {
  'id': 'fill-maine',
  'type': 'fill',
  'source': 'maine',
  'layout': {},
  'paint': {
      'fill-color': '#28c499',
      'fill-opacity': 0.7
  }
}
export const USER_POLYGON_LINE_STYLES = {
  'id': 'line-maine',
  'type': 'line',
  'source': 'maine',
  'layout': {},
  'paint': {
      'line-color': '#28c499',
      'line-width': 3
  }
}