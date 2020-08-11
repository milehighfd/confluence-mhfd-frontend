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
  PROJECTS_LINE,
  STUDIES,
  FEMA_FLOOD_HAZARD
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
    "layout": {
      "icon-image": ["step", ["zoom"], "Frame13a", 22, "Frame13a"],
      "icon-rotation-alignment": "viewport",
      "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.01,
          13,
          0.03,
          20,
          0.2,
          22,
          0.5
      ],
      "text-field": ["step", ["zoom"], "", 22, ""]
  },
  "paint": {
      "icon-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          0.25,
          13.5,
          1,
          22,
          1
      ]
  }}],
  [PIPE_APPURTENANCES]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(182, 71%, 43%)",
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          0.5,
          11,
          1.5,
          13,
          2,
          22,
          7
      ]
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {}, 
    "paint": {
      "circle-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(303, 88%, 42%)",
          22,
          "hsl(104, 6%, 98%)"
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          0,
          11,
          1,
          13,
          2,
          16,
          6,
          22,
          10
      ],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(0, 21%, 26%, 0)",
          9,
          "hsla(0, 21%, 26%, 0)",
          12,
          "hsl(0, 21%, 26%)"
      ],
      "circle-stroke-width": 2
    }
  }],
  [SPECIAL_ITEM_POINT]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(98, 80%, 53%)",
      "circle-stroke-width": 2,
      "circle-stroke-color": "hsl(295, 88%, 40%)",
      "circle-opacity": ["step", ["zoom"], 0, 12, 0.41, 22, 1],
      "circle-stroke-opacity": ["step", ["zoom"], 0, 12, 0.37, 22, 1],
      "circle-radius": 3
    }
  }],
  [SPECIAL_ITEM_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(137, 82%, 55%)",
      "line-width": 6,
      "line-gap-width": 3,
      "line-blur": 8
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(51, 82%, 22%)",
      "line-width": 3,
      "line-dasharray": [6, 1]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(51, 82%, 51%)",
      "line-width": 3,
      "line-dasharray": [6, 1]
    }
  }],
  [SPECIAL_ITEM_AREA]: [
    {
      type: 'fill',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsl(98, 50%, 51%)",
        "fill-opacity": ["step", ["zoom"], 0, 12, 0.44, 22, 1]
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
    }
  ],
  [CHANNEL_IMPROVEMENTS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
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
    "paint": {
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
    "paint": {
      "fill-color": "hsl(120, 76%, 22%)",
      "fill-opacity": ["step", ["zoom"], 0, 12, 0.43, 22, 0]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-width': 4,
      'line-color': '#34b356',
      'line-opacity': 1,
      'line-dasharray': [4, 4, 1]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-dasharray": [1, 1],
      "line-color": "hsl(32, 78%, 16%)",
      "line-width": 4,
      "line-translate": [1, 1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
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
      "line-dasharray": [1, 1],
      "line-color": "hsl(32, 87%, 61%)",
      "line-width": 2,
      "line-opacity": ["step", ["zoom"], 0, 12, 1, 22, 1]
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
      "fill-color": "hsl(283, 68%, 46%)",
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
      "fill-color": "hsla(278, 92%, 52%, 0.56)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.5,
          0,
          14,
          0.5,
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
        "fill-color": "hsla(288, 54%, 18%, 0.44)",
        "fill-outline-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            "hsla(190, 86%, 71%, 0)",
            22,
            "hsl(190, 86%, 71%)"
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
  [ROUTINE_DEBRIS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          6,
          16,
          18,
          22,
          18
      ],
      "line-color": "hsl(308, 92%, 55%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          14,
          0.2,
          22,
          0.23
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(308, 92%, 55%)",
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          4,
          13.57,
          4,
          16,
          24,
          22,
          60
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14.5,
          0,
          15,
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
      "line-color": "hsla(308, 26%, 77%, 0.82)",
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          4,
          13.57,
          4,
          16,
          24,
          22,
          60
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14.5,
          0,
          15,
          1,
          22,
          1
      ],
      "line-dasharray": [2, 1, 0.5],
      "line-width": 6,
      "line-translate": [-1, -1]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsla(308, 93%, 11%, 0.82)",
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          4,
          13.57,
          4,
          16,
          24,
          22,
          60
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14.5,
          0,
          15,
          1,
          22,
          1
      ],
      "line-dasharray": [2, 1, 0.5],
      "line-width": 6
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
            10.13,
            0.21,
            13,
            0.62,
            14.22,
            1,
            22,
            1
        ]
      }
    },{
      type: 'circle',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {"circle-color": "hsla(60, 100%, 50%, 0.48)"}
    }, {
      "type": "line",
      "source-layer": "pluto15v1",
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
      type: 'symbol',
      'source-layer': 'pluto15v1',
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
          "text-halo-blur": 35,
          "text-opacity": ["step", ["zoom"], 0, 14, 1, 22, 1]
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
    }
  ]
}

export const tileStyles = {
  [FLOODPLAINS_FEMA_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(0, 97%, 13%)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          0,
          22,
          0
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 95%, 20%)",
      "line-width": 6,
      "line-blur": 5,
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          1,
          22,
          0
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 63%, 97%)",
      "line-dasharray": [1, 1],
      "line-width": 1.5
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
          "step",
          ["zoom"],
          ["to-string", ["get", "fld_zone"]],
          0,
          ["to-string", ["get", "fld_zone"]],
          22,
          ["to-string", ["get", "fld_zone"]]
      ]
    },
    "paint": {
        "text-color": "hsl(0, 4%, 98%)",
        "text-opacity": ["step", ["zoom"], 0, 14, 1, 22, 1]
    }
  }],
  [FLOODPLAINS_NON_FEMA_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(226, 61%, 23%)",
      "fill-outline-color": "hsl(235, 87%, 54%)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          12,
          1,
          14,
          0.37,
          16,
          0,
          22,
          0
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": 6,
      "line-opacity": [
          "interpolate",
          ["exponential", 1],
          ["zoom"],
          0,
          0,
          14,
          0.33,
          22,
          1
      ],
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(234, 61%, 19%)",
          14,
          "hsl(234, 63%, 18%)",
          22,
          "hsl(227, 65%, 23%)"
      ],
      "line-translate": [-2, -2]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": 2,
      "line-opacity": [
          "interpolate",
          ["exponential", 1],
          ["zoom"],
          0,
          0,
          14,
          0.33,
          22,
          1
      ],
      "line-translate": [-2, -2],
      "line-dasharray": [1, 1],
      "line-color": "hsl(0, 0%, 100%)"
    }
  }],
  [FEMA_FLOOD_HAZARD]: [ {
    type: 'fill',
    'source-layer': 'pluto15v1',
    "paint": {
      "fill-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          [
              "match",
              ["get", "fld_zone"],
              ["AE", "A", "AO", "AH"],
              "hsl(0, 90%, 21%)",
              "hsla(0, 0%, 100%, 0)"
          ],
          13,
          [
              "match",
              ["get", "fld_zone"],
              ["AE", "A", "AO", "AH"],
              "hsl(0, 90%, 23%)",
              "hsla(0, 0%, 100%, 0)"
          ],
          22,
          [
              "match",
              ["get", "fld_zone"],
              ["AE", "A", "AO", "AH"],
              "hsla(0, 90%, 23%, 0.69)",
              "hsla(0, 0%, 100%, 0)"
          ]
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          0.76,
          15,
          0,
          22,
          0
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "paint": {
      "line-color": [
          "match",
          ["get", "fld_zone"],
          ["A", "AE", "AO", "AH"],
          "hsl(0, 94%, 25%)",
          "hsla(0, 94%, 25%, 0)"
      ],
      "line-width": 3,
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          14,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "paint": {
      "line-color": [
          "match",
          ["get", "fld_zone"],
          ["AE", "A", "AO", "AH"],
          "hsl(0, 0%, 100%)",
          "hsla(0, 0%, 100%, 0)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          14,
          0.5,
          22,
          3
      ],
      "line-dasharray": [3, 3],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          11,
          1,
          22,
          1
      ]
    }
  }], 
  [WATERSHED_FILTERS]: [
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-blur": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          4,
          22,
          2
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          5,
          10,
          5,
          22,
          6
      ],
      "line-dasharray": [
          "step",
          ["zoom"],
          ["literal", [1, 1]],
          22,
          ["literal", [0, 0]]
      ],
      "line-opacity": 0.88,
      "line-color": "hsl(126, 5%, 98%)"
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
          "concat",
          ["to-string", ["get", "servicearea"]],
          "Service Area"
      ],
      "text-variable-anchor": ["bottom-right"],
      "text-padding": 22,
      "text-size": 24,
      "text-offset": [0, 0],
      "symbol-spacing": 100
    },
    "paint": {
        "text-color": "hsla(105, 68%, 34%, 0.7)",
        "text-halo-color": "hsl(218, 8%, 94%)",
        "text-halo-width": 0.5,
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            10,
            0.19,
            22,
            0.08
        ]
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
          "concat",
          ["to-string", ["get", "servicearea"]],
          "Service Area"
      ],
      "text-variable-anchor": ["bottom-right"],
      "text-padding": 55,
      "text-size": 18,
      "text-justify": "auto",
      "text-offset": [2, 2],
      "text-radial-offset": 2,
      "symbol-placement": "line-center"
  },
    "paint": {
        "text-color": "hsl(234, 0%, 100%)",
        "text-halo-width": 4,
        "text-halo-color": "hsla(0, 2%, 100%, 0)",
        "text-translate": [22, 0]
    }
  }
  ], 
  [STREAMS_FILTERS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(0, 0%, 0%, 0.12)",
          10.5,
          "hsla(210, 69%, 51%, 0.34)",
          11,
          "hsla(210, 71%, 35%, 0.67)",
          12,
          "hsl(210, 71%, 37%)",
          12.58,
          "hsl(210, 69%, 62%)",
          22,
          "hsl(210, 69%, 77%)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["get", "catch_sum"],
          130.080010015,
          0.5,
          640,
          1,
          6400,
          4,
          1131411.35931,
          12
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(0, 0%, 0%, 0.12)",
          10.5,
          "hsla(210, 69%, 51%, 0.34)",
          11,
          "hsla(210, 71%, 35%, 0.67)",
          12,
          "hsl(210, 71%, 37%)",
          12.58,
          "hsl(210, 69%, 62%)",
          22,
          "hsl(210, 69%, 77%)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["get", "catch_sum"],
          130.080010015,
          0.5,
          640,
          1,
          6400,
          4,
          1131411.35931,
          12
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(0, 0%, 0%, 0.12)",
          10.5,
          "hsla(210, 69%, 51%, 0.34)",
          11,
          "hsla(210, 71%, 35%, 0.67)",
          12,
          "hsl(210, 71%, 37%)",
          12.58,
          "hsl(210, 69%, 62%)",
          22,
          "hsl(210, 69%, 77%)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["get", "catch_sum"],
          130.080010015,
          0.5,
          640,
          1,
          6400,
          4,
          1131411.35931,
          12
      ]
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-size": 12,
      "text-variable-anchor": ["center"],
      "text-max-angle": 0,
      "symbol-spacing": 550,
      "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"],
      "symbol-placement": "line-center",
      "text-justify": "auto",
      "text-padding": 1,
      "text-rotation-alignment": "map",
      "text-field": [
          "coalesce",
          ["get", "name_en"],
          ["get", "name"],
          ["get", "str_name"]
      ],
      "text-max-width": 111
    },
    "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-translate": [10, 0],
        "text-translate-anchor": "viewport"
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-size": 12,
      "text-variable-anchor": ["center"],
      "text-max-angle": 0,
      "symbol-spacing": 550,
      "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"],
      "symbol-placement": "line-center",
      "text-justify": "auto",
      "text-padding": 1,
      "text-rotation-alignment": "map",
      "text-field": ["to-string", ["get", "str_name"]],
      "text-max-width": 111
    },
    "paint": {
        "text-color": "hsl(0, 0%, 100%)",
        "text-translate": [10, 0],
        "text-translate-anchor": "viewport"
    }
  }], 
  [SERVICE_AREA_FILTERS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {"line-color": "hsl(0, 13%, 100%)"}
  }],
  [SERVICE_AREA_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": ["to-string", ["get", "servicearea"]],
      "text-justify": "auto",
      "text-offset": [0, 0]
    },
    "paint": {"text-color": "hsl(180, 65%, 88%)"}
  }],
  [MUNICIPALITIES_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          [
              "interpolate",
              ["linear"],
              ["get", "cartodb_id"],
              0,
              "hsl(0, 97%, 52%)",
              6,
              "hsl(179, 93%, 50%)",
              9,
              "#406370",
              19,
              "#8a9cd5",
              29,
              "#9d613a",
              39,
              "#febc66",
              49,
              "#aa492e",
              59,
              "#406370"
          ],
          10.5,
          [
              "interpolate",
              ["linear"],
              ["get", "cartodb_id"],
              0,
              "hsl(0, 97%, 52%)",
              6,
              "hsl(179, 93%, 50%)",
              9,
              "#406370",
              19,
              "#8a9cd5",
              29,
              "#9d613a",
              39,
              "#febc66",
              49,
              "#aa492e",
              59,
              "#406370"
          ],
          22,
          [
              "interpolate",
              ["linear"],
              ["get", "cartodb_id"],
              0,
              "hsl(0, 97%, 52%)",
              6,
              "hsl(179, 93%, 50%)",
              9,
              "#406370",
              19,
              "#8a9cd5",
              29,
              "#9d613a",
              39,
              "#febc66",
              49,
              "#aa492e",
              59,
              "#406370"
          ]
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          10,
          0.48,
          12,
          0,
          22,
          0
      ],
      "fill-outline-color": "hsl(0, 4%, 96%)"
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 4%, 100%)",
      "line-width": 4,
      "line-translate": [1, 1]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 4%, 98%)",
      "line-dasharray": [4, 1, 1, 1, 4],
      "line-translate": [-1, -1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          13.5,
          1,
          22,
          1
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13.5,
          3,
          22,
          16
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 8%, 14%)",
      "line-dasharray": [4, 1, 1, 1, 4],
      "line-translate": [0, 0],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13,
          0,
          13.5,
          1,
          22,
          1
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13.5,
          3,
          22,
          16
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 4%, 100%)",
      "line-translate": [0, 0],
      "line-dasharray": [4, 2],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13.5,
          1,
          14,
          0
      ]
    }
  }], 
  [MUNICIPALITIES_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": ["to-string", ["get", "city"]],
      "symbol-placement": "line",
      "symbol-spacing": 500,
      "text-justify": "auto",
      "text-offset": [0, 1]
    },
    "paint": {"text-color": "hsl(0, 4%, 94%)"}
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
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 0%, 100%)", 
      "line-width": 4
    }
  },
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 3%, 39%)",
      "line-dasharray": [5, 5],
      "line-width": 2
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
  [STUDIES]: [ {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "match",
          ["get", "sstatus"],
          ["Funding"],
          "hsla(129, 1%, 63%, 0.47)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-outline-color": [
          "match",
          ["get", "sstatus"],
          ["Funding"],
          "hsl(112, 3%, 97%)",
          "hsla(112, 3%, 52%, 0)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          0.37,
          22,
          0
      ]
    }
  },  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "match",
          ["get", "sstatus"],
          ["Funding"],
          "hsl(0, 3%, 54%)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          1,
          15.475,
          5,
          17,
          10,
          22,
          12
      ]
    }
  },  {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "match",
          ["get", "sstatus"],
          ["In Progress"],
          "hsla(131, 56%, 68%, 0.2)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-outline-color": [
          "match",
          ["get", "sstatus"],
          ["In Progress"],
          "hsl(124, 94%, 48%)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          13,
          0.56,
          22,
          0
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "match",
          ["get", "sstatus"],
          ["In Progress"],
          "#80db90",
          "hsla(0, 0%, 0%, 0)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          1,
          15.475,
          5,
          17,
          10,
          22,
          12
      ]
    }
  },{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "match",
          ["get", "sstatus"],
          ["Design"],
          "hsla(73, 66%, 66%, 0.24)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-outline-color": [
          "match",
          ["get", "sstatus"],
          ["Design"],
          "hsl(61, 94%, 56%)",
          "hsla(61, 94%, 56%, 0)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          1,
          12.5,
          0.38,
          22,
          0
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "match",
          ["get", "sstatus"],
          ["Design"],
          "#c9e26f",
          "hsla(0, 0%, 0%, 0)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          1,
          15.475,
          5,
          17,
          10,
          22,
          12
      ]
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