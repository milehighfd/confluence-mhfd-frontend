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
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9,
          0,
          11,
          0,
          13,
          1,
          16,
          6,
          22,
          10
      ],
      "circle-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          "hsl(100, 88%, 42%)",
          22,
          "hsl(183, 88%, 42%)"
      ],
      "circle-stroke-width": 1,
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          1,
          22,
          1
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          1,
          22,
          1
      ]
    }
  }],
  [SPECIAL_ITEM_POINT]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(98, 80%, 53%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          12,
          1,
          14,
          2,
          22,
          2
      ],
      "circle-stroke-color": "hsl(295, 88%, 40%)",
      "circle-opacity": ["step", ["zoom"], 0, 12, 0.41, 13, 1, 22, 1],
      "circle-radius": 3,
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          0,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(98, 80%, 53%)",
      "circle-stroke-width": 2,
      "circle-stroke-color": "hsl(295, 88%, 40%)",
      "circle-opacity": ["step", ["zoom"], 0, 12, 0.41, 13, 1, 22, 1],
      "circle-stroke-opacity": ["step", ["zoom"], 0, 12, 0.37, 22, 1],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          3,
          12,
          2,
          22,
          3
      ]
    }
  }],
  [SPECIAL_ITEM_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          2,
          22,
          6
      ],
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          12.07,
          3,
          22,
          3
      ],
      "line-blur": 8,
      "line-color": "hsl(137, 82%, 55%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
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
      "line-color": "hsl(51, 82%, 22%)",
      "line-width": 3,
      "line-dasharray": [6, 1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
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
      "line-color": "hsl(87, 82%, 51%)",
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          12,
          1,
          22,
          3
      ],
      "line-dasharray": [6, 2],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
          1,
          22,
          1
      ]
    }
  }],
  [SPECIAL_ITEM_AREA]: [
    {
      type: 'fill',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsl(98, 50%, 51%)",
        "fill-opacity": ["step", ["zoom"], 0, 12, 0.25, 22, 1]
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
          16
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          1,
          22,
          6
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0,
          13,
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
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0,
          13,
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
          22,
          4
      ],
      "line-color": "#93ecf0"
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
    "paint": {
      "line-dasharray": [1, 1],
      "line-color": "hsl(128, 78%, 16%)",
      "line-width": 4,
      "line-translate": [1, 1],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          12.5,
          0.41,
          13,
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
      "line-color": "hsl(120, 49%, 50%)",
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
      "line-width": [
          "step",
          ["zoom"],
          0,
          12,
          1,
          13,
          1.5,
          14,
          4,
          22,
          12
      ],
      "line-opacity": ["step", ["zoom"], 0, 12, 0, 13, 1, 22, 1],
      "line-translate": [0.5, 0.5],
      "line-color": "hsl(0, 0%, 0%)"
    }
  },{
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
      "line-width": [
          "step",
          ["zoom"],
          0,
          12,
          0,
          13,
          1.5,
          14,
          4,
          22,
          12
      ],
      "line-opacity": ["step", ["zoom"], 0, 12, 0, 13, 1, 22, 1]
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
      "circle-stroke-width": ["step", ["zoom"], 0, 13, 1, 22, 12],
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
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
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
          12,
          0,
          13,
          1,
          22,
          1
      ]
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-radius": ["step", ["zoom"], 0, 13, 3, 14, 4, 22, 12],
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
          0.5,
          22,
          6
      ],
      "circle-stroke-color": "hsl(0, 3%, 91%)",
      "circle-translate": [-1, -1],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
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
          12,
          0,
          13,
          1,
          22,
          1
      ]
    }
  },{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-radius": ["step", ["zoom"], 0, 13, 3, 14, 4, 22, 12],
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
          0.5,
          22,
          6
      ],
      "circle-stroke-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(176, 3%, 20%)",
          22,
          "hsl(176, 4%, 20%)"
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          0,
          13,
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
          12,
          0,
          13,
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
      "fill-color": "#85bb65",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          0,
          15,
          0.2,
          22,
          0.57
      ],
      "fill-pattern": "dollar"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(99, 88%, 10%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          0,
          15,
          0.2,
          22,
          1
      ],
      "line-width": 2
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "#85bb65",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          0,
          15,
          0.2,
          22,
          1
      ],
      "line-dasharray": [2, 4]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(20, 91%, 72%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          13,
          0,
          15,
          1,
          22,
          1
      ],
      "line-dasharray": [2, 4],
      "line-translate": [-1, -1],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          1,
          22,
          3
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
    "layout": {"line-join": "round", "line-round-limit": 0.5},
    "paint": {
        "line-color": "hsl(298, 87%, 84%)",
        "line-blur": 12,
        "line-width": 12
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round", "line-round-limit": 0.5},
    "paint": {"line-color": "hsl(123, 87%, 40%)", "line-width": 2}
  },,{
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
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          2,
          22,
          10
      ],
      "circle-stroke-color": "hsla(0, 6%, 56%, 0.41)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0,
          14.25,
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
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          22,
          5
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(33, 87%, 57%)",
      "circle-stroke-width": 2,
      "circle-stroke-color": "hsla(0, 6%, 56%, 0.41)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0,
          14.25,
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
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          22,
          5
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
          9,
          0,
          14.25,
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
      "circle-color": "hsl(33, 97%, 91%)",
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0,
          14.25,
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
      ],
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          22,
          5
      ]
    }
  }],
  [MEP_PROJECTS_DETENTION_BASINS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "#f7c78d",
      "fill-outline-color": "#f6c113",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0.49,
          14.25,
          0.5,
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
          9,
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
      "line-color": "hsl(44, 84%, 75%)",
      "line-width": 3,
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
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
      "line-color": "hsl(44, 56%, 13%)",
      "line-width": 3,
      "line-dasharray": [4, 4],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0,
          14.25,
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
          6,
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
          9,
          0,
          12,
          0.2,
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
      "line-color": "hsl(0, 6%, 16%)",
      "line-width": 5,
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          6,
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
          9,
          0,
          12,
          0.2,
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
      "line-color": "#f7c78d",
      "line-width": 3,
      "line-gap-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          6,
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
          9,
          0,
          12,
          0.2,
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
          0.5,
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
          4
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
      "fill-color": "hsla(192, 84%, 71%, 0.55)",
      "fill-outline-color": "hsla(0, 0%, 0%, 0)"
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": ["to-string", ["get", "fld_zone"]],
      "symbol-placement": "line"
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
      "fill-color": "hsla(213, 94%, 43%, 0.6)"
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
              "#17285e",
              "hsla(0, 0%, 100%, 0)"
          ],
          13,
          [
              "match",
              ["get", "fld_zone"],
              ["AE", "A", "AO", "AH"],
              "#17285e",
              "hsla(0, 0%, 100%, 0)"
          ],
          22,
          [
              "match",
              ["get", "fld_zone"],
              ["AE", "A", "AO", "AH"],
              "#17285e",
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
          "#17285e",
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
          ["get", "zone_subty"],
          ["FLOODWAY"],
          "#17285e",
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
      ],
      "line-dasharray": [2, 2]
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    "paint": {
      "fill-opacity": 0.57,
      "fill-color": [
          "match",
          ["get", "fld_zone"],
          ["AREA WITH REDUCED FLOOD RISK DUE TO LEVEE", "AE"],
          "hsl(192, 79%, 57%)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-outline-color": "hsla(0, 0%, 0%, 0.48)"
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    "paint": {
      "fill-opacity": 0.5,
      "fill-color": [
          "match",
          ["get", "zone_subty"],
          ["0.2 PCT ANNUAL CHANCE FLOOD HAZARD"],
          "hsl(40, 90%, 56%)",
          "hsla(0, 0%, 0%, 0)"
      ]
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    "paint": {
      "fill-opacity": 0.53,
      "fill-color": [
          "match",
          ["get", "fld_zone"],
          ["AREA WITH REDUCED FLOOD RISK DUE TO LEVEE", "AE"],
          "hsl(176, 79%, 57%)",
          "hsla(0, 0%, 0%, 0)"
      ],
      "fill-pattern": [
          "match",
          ["get", "zone_subty"],
          ["FLOODWAY"],
          "Untitled",
          ""
      ],
      "fill-antialias": false
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "icon-image": [
          "match",
          ["get", "zone_subty"],
          ["FLOODWAY"],
          ["to-string", ["get", "zone_subty"]],
          ["to-string", ["get", "zone_subty"]]
      ],
      "text-field": [
          "match",
          ["get", "zone_subty"],
          ["FLOODWAY"],
          ["to-string", ["get", "zone_subty"]],
          ["to-string", ["get", "fld_zone"]]
      ],
      "symbol-placement": "line",
      "text-justify": "auto",
      "text-rotation-alignment": "viewport",
      "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"]
    },
    "paint": {
        "text-color": "hsl(189, 78%, 12%)",
        "text-halo-color": "hsla(0, 3%, 97%, 0.72)",
        "text-halo-width": 1
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "icon-image": [
          "match",
          ["get", "zone_subty"],
          ["FLOODWAY"],
          ["to-string", ["get", "zone_subty"]],
          ["to-string", ["get", "zone_subty"]]
      ],
      "text-field": [
          "concat",
          ["to-string", ["get", "fld_zone"]],
          ["get", "zone_subty"]
      ],
      "symbol-placement": "line",
      "text-justify": "auto",
      "text-rotation-alignment": "viewport",
      "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"]
    },
    "paint": {
        "text-color": "hsl(189, 78%, 12%)",
        "text-halo-color": "hsla(0, 3%, 97%, 0.72)",
        "text-halo-width": 1
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {"symbol-placement": "line"},
    "paint": {"text-color": "hsl(286, 81%, 86%)"}
  }], 
  [WATERSHED_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "case",
          ["match", ["get", "Reach_Code"], ["3001"], true, false],
          "hsl(0, 84%, 41%)",
          ["match", ["get", "Reach_Code"], ["3002"], true, false],
          "hsl(0, 90%, 47%)",
          ["match", ["get", "Reach_Code"], ["3034"], true, false],
          "hsl(226, 66%, 54%)",
          ["match", ["get", "Reach_Code"], ["3041"], true, false],
          "hsl(116, 61%, 65%)",
          ["match", ["get", "Reach_Code"], ["3200"], true, false],
          "hsl(62, 51%, 56%)",
          ["match", ["get", "Reach_Code"], ["3300"], true, false],
          "hsl(209, 44%, 71%)",
          ["match", ["get", "Reach_Code"], ["3400"], true, false],
          "hsl(303, 84%, 60%)",
          ["match", ["get", "Reach_Code"], ["3500"], true, false],
          "hsl(96, 54%, 34%)",
          ["match", ["get", "Reach_Code"], ["3600"], true, false],
          "hsl(0, 43%, 72%)",
          ["match", ["get", "Reach_Code"], ["3650"], true, false],
          "hsl(0, 75%, 73%)",
          ["match", ["get", "Reach_Code"], ["3700"], true, false],
          "hsl(39, 82%, 42%)",
          ["match", ["get", "Reach_Code"], ["3800"], true, false],
          "hsl(231, 81%, 31%)",
          ["match", ["get", "Reach_Code"], ["3900"], true, false],
          "hsl(175, 69%, 56%)",
          ["match", ["get", "Reach_Code"], ["4000"], true, false],
          "hsl(136, 79%, 56%)",
          ["match", ["get", "Reach_Code"], ["4100"], true, false],
          "hsl(86, 78%, 72%)",
          ["match", ["get", "Reach_Code"], ["4200"], true, false],
          "hsl(25, 93%, 64%)",
          ["match", ["get", "Reach_Code"], ["4300"], true, false],
          "hsl(323, 52%, 68%)",
          ["match", ["get", "Reach_Code"], ["4400"], true, false],
          "hsl(0, 44%, 83%)",
          ["match", ["get", "Reach_Code"], ["4600"], true, false],
          "hsl(104, 91%, 29%)",
          ["match", ["get", "Reach_Code"], ["4700"], true, false],
          "hsl(86, 91%, 69%)",
          ["match", ["get", "Reach_Code"], ["4800"], true, false],
          "hsl(80, 85%, 80%)",
          ["match", ["get", "Reach_Code"], ["4900"], true, false],
          "hsl(75, 93%, 34%)",
          ["match", ["get", "Reach_Code"], ["5000"], true, false],
          "hsl(243, 40%, 43%)",
          ["match", ["get", "Reach_Code"], ["5100"], true, false],
          "hsl(0, 45%, 40%)",
          ["match", ["get", "Reach_Code"], ["5200"], true, false],
          "hsl(0, 95%, 79%)",
          ["match", ["get", "Reach_Code"], ["5300"], true, false],
          "hsl(0, 91%, 31%)",
          ["match", ["get", "Reach_Code"], ["5400"], true, false],
          "hsl(0, 34%, 58%)",
          ["match", ["get", "Reach_Code"], ["5500"], true, false],
          "hsl(0, 87%, 93%)",
          ["match", ["get", "Reach_Code"], ["5600"], true, false],
          "hsl(0, 91%, 56%)",
          ["match", ["get", "Reach_Code"], ["5700"], true, false],
          "hsl(0, 52%, 51%)",
          ["match", ["get", "Reach_Code"], ["5800"], true, false],
          "hsl(328, 71%, 44%)",
          ["match", ["get", "Reach_Code"], ["5900"], true, false],
          "hsl(310, 75%, 38%)",
          ["match", ["get", "Reach_Code"], ["6000"], true, false],
          "hsl(288, 88%, 79%)",
          ["match", ["get", "Reach_Code"], ["6100"], true, false],
          "hsl(291, 55%, 42%)",
          ["match", ["get", "Reach_Code"], ["6200"], true, false],
          "hsl(269, 87%, 75%)",
          ["match", ["get", "Reach_Code"], ["6300"], true, false],
          "hsl(254, 47%, 38%)",
          ["match", ["get", "Reach_Code"], ["6400"], true, false],
          "hsl(208, 68%, 31%)",
          ["match", ["get", "Reach_Code"], ["6500"], true, false],
          "hsl(216, 24%, 77%)",
          ["match", ["get", "Reach_Code"], ["6600"], true, false],
          "hsl(200, 68%, 54%)",
          ["match", ["get", "Reach_Code"], ["6700"], true, false],
          "hsl(184, 92%, 85%)",
          ["match", ["get", "Reach_Code"], ["6800"], true, false],
          "hsl(165, 83%, 50%)",
          ["match", ["get", "Reach_Code"], ["6900"], true, false],
          "hsl(160, 84%, 37%)",
          ["match", ["get", "Reach_Code"], ["7000"], true, false],
          "hsl(135, 88%, 80%)",
          ["match", ["get", "Reach_Code"], ["7100"], true, false],
          "hsl(88, 83%, 75%)",
          ["match", ["get", "Reach_Code"], ["7200"], true, false],
          "hsl(72, 93%, 89%)",
          ["match", ["get", "Reach_Code"], ["7300"], true, false],
          "hsl(48, 81%, 40%)",
          ["match", ["get", "Reach_Code"], ["7950"], true, false],
          "hsl(23, 76%, 47%)",
          ["match", ["get", "Reach_Code"], ["7980"], true, false],
          "hsl(0, 25%, 31%)",
          ["match", ["get", "Reach_Code"], ["8000"], true, false],
          "hsl(0, 94%, 33%)",
          ["match", ["get", "Reach_Code"], ["8014"], true, false],
          "hsl(0, 63%, 60%)",
          ["match", ["get", "Reach_Code"], ["8015"], true, false],
          "hsl(0, 93%, 84%)",
          ["match", ["get", "Reach_Code"], ["8041"], true, false],
          "hsl(0, 46%, 70%)",
          ["match", ["get", "Reach_Code"], ["8050"], true, false],
          "hsl(337, 81%, 38%)",
          ["match", ["get", "Reach_Code"], ["8051"], true, false],
          "hsl(314, 63%, 38%)",
          ["match", ["get", "Reach_Code"], ["8061"], true, false],
          "hsl(317, 42%, 83%)",
          ["match", ["get", "Reach_Code"], ["8094"], true, false],
          "hsl(283, 92%, 38%)",
          ["match", ["get", "Reach_Code"], ["8100"], true, false],
          "hsl(243, 82%, 45%)",
          ["match", ["get", "Reach_Code"], ["8160"], true, false],
          "hsl(235, 93%, 87%)",
          ["match", ["get", "Reach_Code"], ["8162"], true, false],
          "hsl(234, 39%, 54%)",
          ["match", ["get", "Reach_Code"], ["8250"], true, false],
          "hsl(210, 93%, 55%)",
          ["match", ["get", "Reach_Code"], ["8251"], true, false],
          "hsl(171, 86%, 73%)",
          ["match", ["get", "Reach_Code"], ["8260"], true, false],
          "hsl(168, 86%, 56%)",
          ["match", ["get", "Reach_Code"], ["8261"], true, false],
          "hsl(141, 93%, 53%)",
          ["match", ["get", "Reach_Code"], ["8270"], true, false],
          "hsl(85, 91%, 80%)",
          ["match", ["get", "Reach_Code"], ["8271"], true, false],
          "hsl(40, 76%, 65%)",
          ["match", ["get", "Reach_Code"], ["8350"], true, false],
          "hsl(29, 93%, 30%)",
          ["match", ["get", "Reach_Code"], ["8450"], true, false],
          "hsl(267, 93%, 63%)",
          ["match", ["get", "Reach_Code"], ["8470"], true, false],
          "hsl(207, 91%, 67%)",
          ["match", ["get", "Reach_Code"], ["8620"], true, false],
          "hsl(140, 78%, 74%)",
          ["match", ["get", "Reach_Code"], ["8910"], true, false],
          "hsl(85, 93%, 80%)",
          ["match", ["get", "Reach_Code"], ["8920"], true, false],
          "hsl(32, 89%, 47%)",
          ["match", ["get", "Reach_Code"], ["8930"], true, false],
          "hsl(324, 85%, 59%)",
          ["match", ["get", "Reach_Code"], ["8940"], true, false],
          "hsl(257, 80%, 55%)",
          ["match", ["get", "Reach_Code"], ["8950"], true, false],
          "hsl(168, 75%, 41%)",
          ["match", ["get", "Reach_Code"], ["8960"], true, false],
          "hsl(100, 91%, 75%)",
          ["match", ["get", "Reach_Code"], ["8970"], true, false],
          "hsl(61, 93%, 60%)",
          ["match", ["get", "Reach_Code"], ["8980"], true, false],
          "hsl(31, 95%, 49%)",
          ["match", ["get", "Reach_Code"], ["8980"], true, false],
          "hsl(33, 91%, 91%)",
          ["match", ["get", "Reach_Code"], ["9210"], true, false],
          "hsl(0, 80%, 53%)",
          ["match", ["get", "Reach_Code"], ["9220"], true, false],
          "hsl(0, 79%, 83%)",
          ["match", ["get", "Reach_Code"], ["9230"], true, false],
          "hsl(285, 87%, 42%)",
          ["match", ["get", "Reach_Code"], ["9240"], true, false],
          "hsl(156, 82%, 58%)",
          ["match", ["get", "Reach_Code"], ["9330"], true, false],
          "hsl(47, 83%, 48%)",
          ["match", ["get", "Reach_Code"], ["9340"], true, false],
          "hsl(254, 89%, 54%)",
          ["match", ["get", "Reach_Code"], ["9420"], true, false],
          "hsl(203, 93%, 79%)",
          ["match", ["get", "Reach_Code"], ["9930"], true, false],
          "hsl(122, 84%, 63%)",
          ["match", ["get", "Reach_Code"], ["9940"], true, false],
          "hsl(104, 93%, 76%)",
          ["match", ["get", "Reach_Code"], ["9970"], true, false],
          "hsl(90, 42%, 32%)",
          ["match", ["get", "Reach_Code"], ["9980"], true, false],
          "hsl(0, 20%, 79%)",
          "hsl(153, 77%, 37%)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.24,
          14,
          0.33,
          16,
          0,
          22,
          0
      ],
      "fill-outline-color": "hsla(0, 89%, 55%, 0.17)"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0,
          12.5,
          0.93,
          22,
          1
      ],
      "line-offset": 1,
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          1,
          22,
          4
      ],
      "line-color": "hsl(0, 0%, 0%)"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(24, 72%, 49%, 0)",
          13,
          "hsla(24, 66%, 21%, 0.54)",
          22,
          "hsl(24, 68%, 22%)"
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0.19,
          22,
          1
      ],
      "line-offset": 1,
      "line-width": 4
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(24, 72%, 49%, 0)",
          13,
          "hsla(24, 44%, 83%, 0.32)",
          22,
          "hsl(24, 30%, 85%)"
      ],
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0.1,
          22,
          1
      ],
      "line-offset": 1,
      "line-width": 4
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(24, 72%, 49%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0.1,
          22,
          1
      ],
      "line-dasharray": [2, 2],
      "line-offset": 1
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(24, 72%, 49%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          0.4,
          14,
          0.43,
          15,
          1,
          22,
          1
      ],
      "line-dasharray": [2, 2],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          14.28,
          2,
          22,
          3
      ]
    }
  }], 
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
    "paint": {
      "line-width": 2,
      "line-color": "hsl(0, 3%, 97%)",
      "line-dasharray": [2, 2]
    }
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
    "paint": {"fill-color": "hsl(0, 0%, 0%)"}
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-dasharray": [1],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          10,
          0.5,
          14,
          1,
          22,
          6
      ],
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(0, 3%, 75%)",
          10,
          "hsl(0, 3%, 75%)",
          13,
          "hsl(0, 0%, 100%)",
          22,
          "hsl(0, 0%, 100%)"
      ]
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
          12.5,
          "hsl(0, 0%, 75%)",
          15,
          "hsl(0, 0%, 0%)",
          17,
          "hsl(0, 0%, 0%)",
          22,
          "hsl(0, 0%, 0%)"
      ],
      "line-dasharray": [1, 1],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.5,
          9.89,
          1,
          22,
          6
      ]
    }
  }], 
  [MUNICIPALITIES_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": ["to-string", ["get", "city"]],
      "symbol-placement": "line",
      "text-justify": "auto",
      "text-offset": [1, 1],
      "text-pitch-alignment": "viewport"
    },
    "paint": {
        "text-color": "hsl(227, 100%, 100%)",
        "text-halo-color": "hsla(196, 0%, 31%, 0.57)",
        "text-halo-width": 3,
        "text-halo-blur": 1
    }
  }],
  [COUNTIES_FILTERS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "hsl(0, 3%, 96%)",
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          0.5,
          22,
          5
      ],
      "line-dasharray": [5, 2, 3, 2, 5]
    }
  }],
  [COUNTIES_POINTS]: [],
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