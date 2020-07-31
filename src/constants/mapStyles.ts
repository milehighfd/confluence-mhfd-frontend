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
  [GRADE_CONTROL_STRUCTURE]: [
  //   {
  //   type: 'symbol',
  //   'source-layer': 'pluto15v1',
  //   layout: {
  //     'icon-image': 'waterfall',
  //     'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
  //   },
  // },{
  //   type: 'line',
  //   'source-layer': 'pluto15v1',
  //   layout: {},
  //   paint: {
  //       'line-color': 'red',
  //       'line-width': 12,
  //       'line-opacity': 0
  //   }
  // }
  {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: { },
    paint: {
      "circle-color": [
        "step",
        ["zoom"],
        "hsla(17, 86%, 49%, 0)",
        13,
        "hsla(17, 86%, 49%, 0.51)",
        22,
        "hsl(136, 86%, 49%)"
      ],
      "circle-stroke-color": [
          "step",
          ["zoom"],
          "hsla(0, 4%, 88%, 0.01)",
          13,
          "hsl(0, 4%, 88%)",
          22,
          "hsl(0, 4%, 88%)"
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          2,
          22,
          10
      ],
      "circle-stroke-width": ["step", ["zoom"], 0, 13, 4, 22, 10],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0.23,
          14,
          1,
          22,
          1
      ]
    },
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      "circle-radius": ["step", ["zoom"], 0, 13, 5, 22, 5],
      "circle-stroke-color": [
          "step",
          ["zoom"],
          "hsla(0, 0%, 0%, 0.05)",
          13,
          "hsl(0, 0%, 0%)",
          22,
          "#000000"
      ],
      "circle-color": "hsl(0, 0%, 0%)"
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      "circle-radius": ["step", ["zoom"], 0, 13, 5, 22, 4],
      "circle-color": "hsl(145, 97%, 59%)",
      "circle-stroke-width": ["step", ["zoom"], 0, 13, 4, 22, 6],
      "circle-stroke-color": "hsla(102, 43%, 27%, 0.55)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          0.69,
          22,
          1
      ]
    }
  }],
  [PIPE_APPURTENANCES]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'outfall',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [SPECIAL_ITEM_POINT]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    layout: {
      'icon-image': 'star',
      'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.35, 15, 0.7]
    },
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
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
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
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
    },{
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'line-color': 'red',
          'line-width': 12,
          'line-opacity': 0
      }
    }
  ],
  [CHANNEL_IMPROVEMENTS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      "line-color": [
        "step",
        ["zoom"],
        "hsla(127, 89%, 45%, 0)",
        12,
        "hsla(127, 89%, 45%, 0.52)",
        22,
        "hsl(127, 89%, 45%)"
      ],
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10,
          4,
          22,
          4
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      "line-color": [
        "step",
        ["zoom"],
        "hsla(0, 0%, 0%, 0)",
        13,
        "hsl(183, 76%, 76%)",
        22,
        "hsl(0, 0%, 0%)"
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
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
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
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
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
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
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [STORM_DRAIN]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(163, 76%, 45%, 0)",
          13,
          "hsl(163, 76%, 37%)",
          22,
          "hsl(163, 73%, 51%)"
      ],
      "line-width": ["step", ["zoom"], 0, 13, 1.5, 14, 3, 22, 6],
      "line-opacity": ["step", ["zoom"], 0, 13, 0, 22, 1]
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-radius": ["step", ["zoom"], 0, 13, 1.5, 14, 2.5],
      "circle-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(0, 96%, 65%)",
          14,
          "hsl(176, 83%, 51%)"
      ],
      "circle-stroke-width": ["step", ["zoom"], 0, 13, 1.5, 22, 6],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(176, 83%, 77%, 0)",
          13,
          "hsl(176, 83%, 77%)",
          22,
          "hsl(176, 83%, 77%)"
      ]
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-radius": ["step", ["zoom"], 0, 13, 1.5, 14, 2.5],
      "circle-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(0, 96%, 65%)",
          14,
          "hsl(176, 83%, 51%)"
      ],
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          1,
          22,
          4
      ],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(176, 3%, 20%)",
          22,
          "hsl(176, 4%, 20%)"
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [DETENTION_FACILITIES]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "step",
          ["zoom"],
          "hsla(181, 66%, 51%, 0)",
          12,
          "hsl(181, 66%, 51%)",
          22,
          "hsl(181, 66%, 51%)"
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(180, 76%, 84%, 0)",
          12,
          "hsla(180, 76%, 84%, 0.87)",
          22,
          "hsl(180, 76%, 84%)"
      ],
      "line-width": 4
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(180, 76%, 36%, 0.02)",
          12,
          "hsl(180, 76%, 35%)",
          22,
          "hsl(180, 76%, 36%)"
      ],
      "line-translate": [1, 1],
      "line-width": 2
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [MAINTENANCE_TRAILS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(137, 82%, 55%)",
      "line-gap-width": 3,
      "line-blur": 8,
      "line-width": 6
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(51, 82%, 22%)",
      "line-dasharray": [6, 1],
      "line-width": 3,
      "line-translate": [1, 1]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(51, 82%, 51%)",
      "line-dasharray": [6, 1],
      "line-width": 3
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [LAND_ACQUISITION]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(283, 76%, 27%)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0.51,
          22,
          0.51
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(99, 88%, 69%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0.43,
          22,
          1
      ]
    }
  }],
  [LANDSCAPING_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "#76efd5",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0.42,
          15,
          0.39,
          22,
          0
      ],
      "fill-outline-color": "hsl(58, 94%, 51%)"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(298, 87%, 84%)"
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }]
}

const MEP_PROJECTS_STYLES = {
  [MEP_PROJECTS_TEMP_LOCATIONS]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "#f19b32",
      "circle-stroke-width": 10,
      "circle-stroke-color": "hsla(0, 6%, 56%, 0.41)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(33, 87%, 57%)",
      "circle-stroke-width": 2,
      "circle-stroke-color": "hsla(0, 6%, 56%, 0.41)",
      "circle-radius": 12,
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(33, 83%, 22%)",
      "circle-translate": [1, 1],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(33, 3%, 96%)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          13.75,
          1,
          22,
          1
      ]
    }
  }],
  [MEP_PROJECTS_DETENTION_BASINS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(0, 8%, 97%)",
      "fill-outline-color": "hsl(46, 93%, 52%)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14.25,
          1,
          16,
          0.28,
          22,
          0
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 3%, 25%)",
      "line-width": 3,
      "line-translate": [2, 2],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(44, 84%, 36%)",
      "line-width": 3,
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          22,
          1
      ]
    }
  }],
  [MEP_PROJECTS_CHANNELS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 6%, 16%)",
      "line-width": 5,
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          66,
          14.25,
          5,
          22,
          66
      ],
      "line-translate": [1.5, 1.5],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0,
          14.25,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 6%, 52%)",
      "line-width": 5,
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          66,
          14.25,
          5,
          22,
          66
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0,
          14.25,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "#f19b32",
      "line-width": 3,
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          66,
          14.25,
          5,
          22,
          66
      ],
      "line-dasharray": [1, 1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0,
          14.25,
          1,
          22,
          1
      ]
  }
  }],
  [MEP_PROJECTS_STORM_OUTFALLS]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(5, 43%, 16%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          22,
          4
      ],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(23, 76%, 64%, 0.13)",
          22,
          "hsla(23, 48%, 16%, 0.37)"
      ],
      "circle-translate": [3, 3],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          22,
          5
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10.5,
          0,
          11,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10.5,
          0,
          11,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(42, 93%, 54%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.3,
          4,
          22,
          12
      ],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(23, 76%, 64%, 0)",
          12,
          "hsla(23, 89%, 47%, 0.15)",
          18,
          "hsla(23, 89%, 47%, 0.28)",
          22,
          "hsla(23, 89%, 47%, 0.59)"
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          22,
          2
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10.5,
          0,
          11,
          1,
          22,
          1
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10.5,
          0,
          11,
          1,
          22,
          1
      ]
    }
  }]
}

const ROUTINE_MAINTENANCE_STYLES = {
  [ROUTINE_NATURAL_AREAS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(38, 68%, 46%)",
      "fill-outline-color": "#c58b26",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          19,
          0,
          22,
          0
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-gap-width": 4,
      "line-width": 8,
      "line-blur": 8,
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(38, 68%, 46%, 0)",
          13,
          "hsla(38, 68%, 46%, 0)",
          22,
          "hsl(38, 68%, 46%)"
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [ROUTINE_WEED_CONTROL]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-outline-color": "hsl(32, 94%, 38%)",
      "fill-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(22, 92%, 52%, 0.56)",
          22,
          "hsla(22, 92%, 52%, 0.56)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          14,
          1,
          22,
          0
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(38, 68%, 19%)",
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          2,
          22,
          16
      ],
      "line-dasharray": [1, 1],
      "line-translate": [1, 1],
      "line-opacity": ["step", ["zoom"], 0, 14, 1, 22, 1]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(38, 68%, 46%, 0)",
          14,
          "hsl(38, 68%, 46%)",
          22,
          "hsl(38, 68%, 46%)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          2,
          22,
          16
      ],
      "line-dasharray": [1, 1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          14,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [ROUTINE_DEBRIS_AREA]: [
    {
      type: 'fill',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsl(33, 54%, 43%)",
        "fill-outline-color": "hsl(190, 86%, 71%)"
      }
    },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }],
  [ROUTINE_DEBRIS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": 5,
      "line-color": "hsl(45, 92%, 55%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": 5,
      "line-color": "hsl(45, 92%, 28%)",
      "line-dasharray": [3, 3],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
    }
  }]
}

export const PROJECTS_STYLES = {
  [PROJECTS_POLYGONS]: [  
    {
      type: 'fill',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "#ffff00",
        "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            10,
            0,
            12,
            1,
            22,
            0.1
        ],
        "fill-outline-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            "hsla(60, 100%, 50%, 0)",
            9.5,
            "hsla(60, 100%, 50%, 0)",
            22,
            "#ffff00"
        ]
      }
    },{
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'line-color': 'red',
          'line-width': 12,
          'line-opacity': 0
      }
    }

],
  [PROJECTS_LINE]: [
    {
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "line-color": "#ffdd00",
        "line-width": 6,
        "line-blur": 6,
        "line-gap-width": 6,
        "line-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            0,
            0,
            11,
            0,
            13,
            0.22,
            14.22,
            1,
            22,
            1
        ]
      }
    },{
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "line-color": "hsl(303, 100%, 50%)",
        "line-blur": 1,
        "line-gap-width": 6,
        "line-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            0,
            0,
            11,
            0,
            13,
            0.22,
            14.22,
            1,
            22,
            1
        ]
      }
    }, {
      "type": "symbol",
      "source-layer": "pluto15v1",
      "layout": {
        "text-field": ["to-string", ["get", "projectname"]],
        "text-justify": "auto",
        "text-anchor": "top-left",
        "text-radial-offset": 1,
        "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"]
      },
      "paint": {
          "text-color": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              0,
              "hsla(0, 0%, 100%, 0)",
              12.66,
              "hsla(0, 0%, 100%, 0)",
              13,
              "hsla(0, 0%, 100%, 0.74)",
              22,
              "hsl(0, 0%, 100%)"
          ],
          "text-halo-color": [
              "step",
              ["zoom"],
              "hsla(0, 0%, 0%, 0)",
              13,
              "hsla(0, 0%, 0%, 0.25)",
              15,
              "hsl(0, 0%, 0%)",
              22,
              "hsla(0, 0%, 0%, 0.61)"
          ],
          "text-halo-width": 0.25,
          "text-halo-blur": 35
      }
    },{
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      paint: {
          'line-color': 'red',
          'line-width': 12,
          'line-opacity': 0
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
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(0, 86%, 56%, 0)",
          11,
          "hsla(0, 86%, 56%, 0.15)",
          11.5,
          "hsla(0, 86%, 56%, 0.51)",
          13,
          "hsla(0, 86%, 56%, 0.29)",
          22,
          "hsla(0, 86%, 56%, 0.29)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          12,
          10,
          22,
          13,
          3,
          15,
          4,
          22,
          22
      ],
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          1,
          22,
          0
      ]
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "step",
          ["zoom"],
          "hsla(0, 94%, 67%, 0)",
          11,
          "hsla(0, 94%, 67%, 0.09)",
          22,
          "hsla(0, 94%, 67%, 0.09)"
      ]
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          "hsla(0, 94%, 51%, 0.02)",
          17,
          "hsla(0, 94%, 51%, 0)",
          17.74,
          "hsla(0, 94%, 51%, 0)",
          22,
          "hsla(0, 94%, 51%, 0.02)"
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
        'line-color': 'red',
        'line-width': 12,
        'line-opacity': 0
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