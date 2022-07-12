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
  PROJECTS_DRAFT,
  STUDIES,
  FEMA_FLOOD_HAZARD,
  XSTREAMS,
  OPACITY_LAYERS,
  NRCS_SOILS,
  DWR_DAM_SAFETY,
  STREAM_MANAGEMENT_CORRIDORS,
  BCZ_PREBLE_MEADOW_JUMPING,
  BCZ_UTE_LADIES_TRESSES_ORCHID,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  SEMSWA_SERVICE_AREA,
  MHFD_STREAMS_FILTERS,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  ACTIVE_LOMS,
  EFFECTIVE_REACHES,
  STREAMS_POINT,
  FLOOD_HAZARD_POLYGON,
  FLOOD_HAZARD_LINE,
  FLOOD_HAZARD_POINT,
  STREAM_IMPROVEMENT_MEASURE
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

export const opacityLayer = {
  type: 'fill',
  layout: {},
  paint: {
    'fill-opacity': 0.8
  }
}

export const COMPONENT_LAYERS_STYLE = {
  [GRADE_CONTROL_STRUCTURE]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "icon-image": "Frame21C",
      "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          11,
          0,
          13,
          0.1,
          15,
          0.4,
          17,
          0.5,
          22,
          0.4
      ],
      "symbol-avoid-edges": true,
      "icon-rotation-alignment": "viewport"
    },
    "paint": {
        "icon-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            12,
            0,
            22,
            1
        ]
    }  
  }],
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
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.5,
          0,
          9,
          0.72,
          15,
          1,
          22,
          1
      ],
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
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.5,
          0,
          9,
          0.72,
          15,
          1,
          22,
          1
      ],
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
    "layout": {"line-join": "round"},
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
    "layout": {"line-join": "round"},
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
    "layout": {"line-join": "round"},
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
          8.5,
          0,
          9,
          0.72,
          15,
          1,
          22,
          1
      ],
      "fill-outline-color": "hsl(58, 94%, 51%)"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round", "line-round-limit": 0.5},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(298, 87%, 84%)",
          22,
          "hsl(298, 87%, 84%)"
      ],
      "line-blur": 12,
      "line-width": 12,
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.5,
          0,
          9,
          0.72,
          15,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round", "line-round-limit": 0.5},
    "paint": {
        "line-color": "hsl(123, 87%, 40%)",
        "line-width": 2,
        "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            8.5,
            0,
            9,
            0.72,
            15,
            1,
            22,
            1
        ]
    }
  }],
  [STREAM_IMPROVEMENT_MEASURE]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {
      'line-cap': 'butt',
      'line-join':"miter",
      'line-miter-limit':2
    },
    "paint": {
      'line-width': 1,
      "line-opacity": 1,
      "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Continuous Improvement"],
        "hsl(141, 81%, 45%)",
        "hsla(141, 81%, 45%, 0)"
      ]
    },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": -3,
    'line-width': 1,
    "line-opacity": 1,
    "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Continuous Improvement"],
        "hsl(141, 81%, 45%)",
        "hsla(141, 81%, 45%, 0)"
      ]
  },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": 3,
    'line-width': 1,
    "line-opacity": 1,
    "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Continuous Improvement"],
        "hsl(141, 81%, 45%)",
        "hsla(141, 81%, 45%, 0)"
      ]
  },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": -4,
    'line-width': 2.5,
    "line-opacity": 1,
    "line-dasharray": [2, 2],
    "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Bank Stabilization"],
        [
          "match",
          ["get", "bank_location"],
          ["", "All"],
          "hsl(141, 81%, 45%)",
          "hsla(141, 81%, 45%, 0)"
        ],
        "hsla(141, 81%, 45%, 0)"
      ]
  },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": 4,
    'line-width': 2.5,
    "line-opacity": 1,
    "line-dasharray": [2, 2],
    "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Bank Stabilization"],
        [
          "match",
          ["get", "bank_location"],
          ["", "All"],
          "hsl(141, 81%, 45%)",
          "hsla(141, 81%, 45%, 0)"
        ],
        "hsla(141, 81%, 45%, 0)"
      ]
  },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": -4,
    'line-width': 2.5,
    "line-opacity": 1,
    "line-dasharray": [2, 2],
    "line-color": [
      "match",
      ["get", "component_part_subcategory"],
      ["Bank Stabilization"],
      [
        "match",
        ["get", "bank_location"],
        ["Right"],
        "hsl(141, 81%, 45%)",
        "hsla(141, 81%, 45%, 0)"
      ],
      "hsla(141, 81%, 45%, 0)"
    ]
  },
},{
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  "paint": {
    "line-offset": 4,
    'line-width': 2.5,
    "line-opacity": 1,
    "line-dasharray": [2, 2],
    "line-color": [
        "match",
        ["get", "component_part_subcategory"],
        ["Bank Stabilization"],
        [
          "match",
          ["get", "bank_location"],
          ["Left"],
          "hsl(141, 81%, 45%)",
          "hsla(141, 81%, 45%, 0)"
        ],
        "hsla(141, 81%, 45%, 0)"
      ]
  },
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
      "circle-stroke-color": "#968888",
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
      ],
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    "paint": {
      "circle-color": "hsl(33, 83%, 22%)", 
      "circle-translate": [1, 1],
      "circle-radius": 5,
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
      "fill-color": "hsla(278, 80%, 46%, 0.56)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12,
          0.5,
          13.5,
          0.84,
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
      "line-color": "hsl(38, 68%, 15%)",
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
      "line-translate": [2, 2],
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
        "fill-color": "hsl(288, 54%, 18%)",
        "fill-outline-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            "hsla(190, 86%, 71%, 0)",
            22,
            "hsl(190, 86%, 71%)"
        ],
        "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            11,
            0,
            14.5,
            1,
            18,
            0.1
        ]
      }
    }],
  [ROUTINE_DEBRIS_LINEAR]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
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
          11,
          0,
          14.5,
          1,
          22,
          0.1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
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
          11,
          0,
          14.56,
          1,
          22,
          1
      ]
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
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
            11,
            0,
            14.56,
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
    "layout": {"line-join": "round"},
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
            11,
            0,
            14.56,
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
        "fill-color": [
            "match",
            ["get", "status"],
            ["Initiated"],
            "hsla(52, 100%, 50%, 0.1)",
            "hsla(0, 0%, 0%, 0)"
        ]
      }
    },{
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            10.37,
            8,
            22,
            24
        ],
        "line-color": [
            "match",
            ["get", "status"],
            ["Initiated"],
            "hsl(52, 100%, 50%)",
            "hsla(52, 100%, 50%, 0)"
        ],
        "line-blur": 22
      }
    }
],
  [PROJECTS_LINE]: [
    {
      type: 'symbol',
      'source-layer': 'pluto15v1',
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "layout": {
        "text-field": [
            "match",
            ["get", "status"],
            ["Requested"],
            [
                "concat",
                ["to-string", ["get", "projectname"]],
                "      Requested"
            ],
            ""
        ],
        "text-rotation-alignment": "map",
        "text-offset": [3, 3],
        "text-font": [
            "Open Sans SemiBold Italic",
            "Arial Unicode MS Regular"
        ],
        "symbol-placement": "line"
      },
      "paint": {
          "text-color": "hsl(52, 0%, 100%)",
          "text-halo-color": "hsl(52, 100%, 31%)",
          "text-halo-width": 5
      }
    }, {
      type: 'symbol',
      'source-layer': 'pluto15v1',
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "layout": {
        "text-field": [
            "match",
            ["get", "status"],
            ["Preliminary Design"],
            [
                "concat",
                ["to-string", ["get", "projectname"]],
                "       Preliminary Design"
            ],
            ""
        ],
        "text-rotation-alignment": "map",
        "text-offset": [3, 3],
        "text-font": [
            "Open Sans SemiBold Italic",
            "Arial Unicode MS Regular"
        ],
        "symbol-placement": "line"
      },
      "paint": {
          "text-color": "hsl(52, 0%, 100%)",
          "text-halo-color": "hsl(52, 100%, 31%)",
          "text-halo-width": 5
      }
    },
     {
      type: 'line',
      'source-layer': 'pluto15v1',
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "layout": {
        "line-miter-limit": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9,
            0,
            22,
            2
        ]
      },
      "paint": {
          "line-color": "hsl(52, 100%, 50%)",
          "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              4,
              22,
              6
          ],
          "line-gap-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              9,
              1,
              22,
              6
          ],
          "line-opacity": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              0,
              0,
              12,
              0,
              13,
              0.62,
              14.22,
              1,
              22,
              1
          ]
      }
    }, {
      "type": "line",
      "source-layer": "pluto15v1",
      "layout": {"line-cap": "round", "line-join": "round"},
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "paint": {
          "line-color": "hsl(60, 100%, 50%)",
          "line-width": 10,
          "line-blur": ["interpolate", ["linear"], ["zoom"], 0, 4, 22, 4],
          "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              12,
              1,
              14,
              0
          ]
      }
    }, {
      type: 'line',
      'source-layer': 'pluto15v1',
      "layout": {"line-join": "round"},
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "paint": {
          "line-color": "hsl(65, 100%, 50%)",
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
          ],
          "line-width": 0.5
      }
  }, {
      type: 'line',
      'source-layer': 'pluto15v1',
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"]],
      "paint": {
        "line-color": "hsl(69, 100%, 50%)",
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
        ],
        "line-width": 0.5
      }
    },
    {
      type: 'symbol',
      'source-layer': 'pluto15v1',
      "filter": ["any",["==",['get','projecttype'], "Maintenance"],["==",['get','projecttype'], "Capital"],["==",['get','projecttype'], "Study"]],
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
      'source-layer': 'pluto15v1',
      "filter": ["all",["==", ["get","projecttype"], "Study"],["==", ["get","projectsubtype"], "Master Plan"]],
      "type": "line",
      "layout": {"line-join": "round"},
      "paint": {
          "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              1,
              22,
              3
          ],
          "line-color": [
              "match",
              ["get", "projectsubtype"],
              ["Master Plan"],
              "hsl(41, 86%, 59%)",
              "hsla(0, 0%, 0%, 0)"
          ],
          "line-gap-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              11,
              9,
              22,
              66
          ],
          "line-dasharray": [5, 3]
      }
    }, 
    {
      'source-layer': 'pluto15v1',
      "filter": ["all",["==", ["get","projecttype"], "Study"],["==", ["get","projectsubtype"], "FHAD"]],
      "type": "line",
      "layout": {"line-join": "round"},
      "paint": {
          "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              1,
              22,
              3
          ],
          "line-color": [
              "match",
              ["get", "projectsubtype"],
              ["FHAD"],
              "hsl(160, 73%, 67%)",
              "hsla(0, 0%, 0%, 0)"
          ],
          "line-dasharray": [5, 3],
          "line-gap-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              11,
              11,
              22,
              88
          ]
      }
    },
  ],
  [PROJECTS_DRAFT]: [
    {
      type: 'symbol',
      'source-layer': 'pluto15v1',
      "layout": {
        "text-field": [
            "match",
            ["get", "status"],
            ["Requested"],
            [
                "concat",
                ["to-string", ["get", "projectname"]],
                "      Requested"
            ],
            ""
        ],
        "text-rotation-alignment": "map",
        "text-offset": [3, 3],
        "text-font": [
            "Open Sans SemiBold Italic",
            "Arial Unicode MS Regular"
        ],
        "symbol-placement": "line"
      },
      "paint": {
          "text-color": [
            "match",
            ["get", "status"],
            ["Initiated"],
            "#139660",
            ["Requested"],
            "#9309EA",
            ["Approved"],
            "#497BF3",
            ["Cancelled"],
            "#FF0000",
            ["Complete"],
            "#06242D",
            "hsl(40, 100%, 50%)"
          ],
          "text-halo-color": "#fff",
          "text-halo-width": 5,
          "text-halo-blur": 5
      }
    }, {
      type: 'symbol',
      'source-layer': 'pluto15v1',
      "layout": {
        "text-field": [
            "match",
            ["get", "status"],
            ["Preliminary Design"],
            [
                "concat",
                ["to-string", ["get", "projectname"]],
                "       Preliminary Design"
            ],
            ""
        ],
        "text-rotation-alignment": "map",
        "text-offset": [3, 3],
        "text-font": [
            "Open Sans SemiBold Italic",
            "Arial Unicode MS Regular"
        ],
        "symbol-placement": "line"
      },
      "paint": {
          "text-color": [
            "match",
            ["get", "status"],
            ["Initiated"],
            "#139660",
            ["Requested"],
            "#9309EA",
            ["Approved"],
            "#497BF3",
            ["Cancelled"],
            "#FF0000",
            ["Complete"],
            "#06242D",
            "hsl(40, 100%, 50%)"
          ],
          "text-halo-color": "#fff",
          "text-halo-width": 5,
          "text-halo-blur": 5
      }
    }, {
      type: 'line',
      'source-layer': 'pluto15v1',
      "layout": {
        "line-miter-limit": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9,
            0,
            22,
            2
        ]
      },
      "paint": {
          "line-color": [
            "match",
            ["get", "status"],
            ["Initiated"],
            "#139660",
            ["Requested"],
            "#9309EA",
            ["Approved"],
            "#497BF3",
            ["Cancelled"],
            "#FF0000",
            ["Complete"],
            "#06242D",
            "hsl(40, 100%, 50%)"
          ],
          "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              4,
              22,
              6
          ],
          "line-gap-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              9,
              1,
              22,
              6
          ],
          "line-opacity": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              0,
              0,
              12,
              0,
              13,
              0.62,
              14.22,
              1,
              22,
              1
          ]
      }
    }, {
      "type": "line",
      "source-layer": "pluto15v1",
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": [
          "match",
          ["get", "status"],
          ["Initiated"],
          "#139660",
          ["Requested"],
          "#9309EA",
          ["Approved"],
          "#497BF3",
          ["Cancelled"],
          "#FF0000",
          ["Complete"],
          "#06242D",
          "hsl(40, 100%, 50%)"
        ],
          "line-width": 10,
          "line-blur": ["interpolate", ["linear"], ["zoom"], 0, 4, 22, 4],
          "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              12,
              1,
              14,
              0
          ]
      }
    }, {
      type: 'line',
      'source-layer': 'pluto15v1',
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": [
          "match",
          ["get", "status"],
          ["Initiated"],
          "#139660",
          ["Requested"],
          "#9309EA",
          ["Approved"],
          "#497BF3",
          ["Cancelled"],
          "#FF0000",
          ["Complete"],
          "#06242D",
          "hsl(40, 100%, 50%)"
        ],
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
          ],
          "line-width": 0.5
      }
    }, {
      type: 'line',
      'source-layer': 'pluto15v1',
      "paint": {
        "line-color": [
          "match",
          ["get", "status"],
          ["Initiated"],
          "#139660",
          ["Requested"],
          "#9309EA",
          ["Approved"],
          "#497BF3",
          ["Cancelled"],
          "#FF0000",
          ["Complete"],
          "#06242D",
          "hsl(40, 100%, 50%)"
        ],
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
        ],
        "line-width": 0.5
      }
    }, 
    {
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
            "match",
            ["get", "status"],
            ["Initiated"],
            "#139660",
            ["Requested"],
            "#9309EA",
            ["Approved"],
            "#497BF3",
            ["Cancelled"],
            "#FF0000",
            ["Complete"],
            "#06242D",
            "hsl(40, 100%, 50%)"
          ],
          "text-halo-color": "hsl(0, 0%, 45%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 5,
          "text-opacity": ["step", ["zoom"], 0.7, 14, 1, 22, 1]
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
  [OPACITY_LAYERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    'paint': {
      'fill-opacity': 0.8
    }
  }],
  [ACTIVE_LOMS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'fill-color': [
        "match",
        ["get", "status"],
        ["Completed"],
        "hsla(317, 60%, 77%, 0.4)",
        ["Suspended"],
        "hsla(321, 62%, 46%, 0.5)",
        ["Violation"],
        "hsla(0, 70%, 38%, 0.4)",
        ["Active"],
        "hsla(92, 80%, 40%, 0.2)",
        "hsla(0, 0%, 0%, 0)"
      ]
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-color': [
        "match",
        ["get", "status"],
        ["Completed"],
        "hsl(325, 73%, 84%)",
        ["Suspended"],
        "hsl(297, 69%, 44%)",
        ["Violation"],
        "hsl(338, 85%, 40%)",
        "hsla(325, 87%, 68%, 0)"
      ],
      'line-width': 2.25
    }
  },{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    paint: {
      'line-color': [
        "match",
        ["get", "status"],
        ["Active"],
        "hsl(95, 85%, 38%)",
        "hsla(325, 87%, 68%, 0)"
      ],
      'line-width': 3,
      'line-dasharray':[2.5, 2.5]
    }
  }],
  [STREAMS_POINT]: [
    {
      type: 'circle',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "circle-color": "hsl(181, 14%, 95%)",
        "circle-stroke-color": "#000000",
        "circle-stroke-width": 0,
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          0,
          12,
          1
        ],
        "circle-radius": 1
      }
    },
    {
      type: 'circle',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "circle-color": "#9cebed",
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          0,
          12,
          0.9
        ],
        "circle-stroke-color": "#000000",
        "circle-radius": 3,
        "circle-stroke-width": 0
      }
    },
    {
      type: 'circle',
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "circle-color": "hsla(181, 69%, 77%, 0)",
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          0,
          12,
          0.9
        ],
        "circle-stroke-color": "#9cebed",
        "circle-radius": 2,
        "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          11,
          0,
          12,
          3
        ],
        "circle-stroke-opacity": 0.4
      }
    }
  ],
  [EFFECTIVE_REACHES]: [
  {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {
      'line-cap': 'butt',
      'line-join':"miter",
      'line-miter-limit':2
    },
    paint: {
      'line-color': [
        "match",
        ["get", "studyname"],
        ["unknown"],
        "hsl(138, 38%, 70%)",
        "hsl(316, 50%, 51%)"
      ],
      'line-width':2
    }
  },
  {
  type: 'line',
  'source-layer': 'pluto15v1',
  layout: {
    'line-cap': 'butt',
    'line-join':"miter",
    'line-miter-limit':2
  },
  paint: {
    'line-color': [
      "match",
      ["get", "studyname"],
      ["unknown"],
      "hsl(138, 75%, 41%)",
      "hsl(329, 83%, 32%)"
    ],
    'line-width':2,
    'line-opacity':0.5,
    'line-offset':-2
  }
},{
  type: 'circle',
  'source-layer': 'pluto15v1',
  layout: {},
  "paint": {
    "circle-color": [
      "match",
      ["get", "studyname"],
      ["unknown"],
      "hsl(277, 66%, 62%)",
      "hsl(159, 71%, 39%)"
    ],
    "circle-stroke-color": "#000000",
    "circle-stroke-width": 0,
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11.9,
      0,
      12,
      3,
      16,
      3,
      18,
      8
    ],
    "circle-stroke-opacity": 1,
    "circle-opacity":0.4,
    "circle-blur":0
  }
},
{
  type: 'circle',
  'source-layer': 'pluto15v1',
  layout: {},
  "paint": {
    "circle-color": [
      "match",
      ["get", "studyname"],
      ["unknown"],
      "hsl(138, 49%, 40%)",
      "hsl(304, 47%, 62%)"
    ],
    "circle-stroke-color": "#000000",
    "circle-stroke-width": 0,
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      9,
      0,
      12,
      1.5,
      14,
      2,
      15,
      4
    ],
    "circle-stroke-opacity": 1,
    "circle-blur":0,
    "circle-opacity":1,
    
  }
}
],
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
  },
  {
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
          "fema-floodway",
          ""
      ],
      "fill-antialias": false
    }
  }], 
  [WATERSHED_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "case",
          ["match", ["get", "reach_code"], ["3001"], true, false],
          "hsl(0, 84%, 41%)",
          ["match", ["get", "reach_code"], ["3002"], true, false],
          "hsl(0, 90%, 47%)",
          ["match", ["get", "reach_code"], ["3034"], true, false],
          "hsl(226, 66%, 54%)",
          ["match", ["get", "reach_code"], ["3041"], true, false],
          "hsl(116, 61%, 65%)",
          ["match", ["get", "reach_code"], ["3200"], true, false],
          "hsl(62, 51%, 56%)",
          ["match", ["get", "reach_code"], ["3300"], true, false],
          "hsl(209, 44%, 71%)",
          ["match", ["get", "reach_code"], ["3400"], true, false],
          "hsl(303, 84%, 60%)",
          ["match", ["get", "reach_code"], ["3500"], true, false],
          "hsl(96, 54%, 34%)",
          ["match", ["get", "reach_code"], ["3600"], true, false],
          "hsl(0, 43%, 72%)",
          ["match", ["get", "reach_code"], ["3650"], true, false],
          "hsl(0, 75%, 73%)",
          ["match", ["get", "reach_code"], ["3700"], true, false],
          "hsl(39, 82%, 42%)",
          ["match", ["get", "reach_code"], ["3800"], true, false],
          "hsl(231, 81%, 31%)",
          ["match", ["get", "reach_code"], ["3900"], true, false],
          "hsl(175, 69%, 56%)",
          ["match", ["get", "reach_code"], ["4000"], true, false],
          "hsl(136, 79%, 56%)",
          ["match", ["get", "reach_code"], ["4100"], true, false],
          "hsl(86, 78%, 72%)",
          ["match", ["get", "reach_code"], ["4200"], true, false],
          "hsl(25, 93%, 64%)",
          ["match", ["get", "reach_code"], ["4300"], true, false],
          "hsl(323, 52%, 68%)",
          ["match", ["get", "reach_code"], ["4400"], true, false],
          "hsl(0, 44%, 83%)",
          ["match", ["get", "reach_code"], ["4600"], true, false],
          "hsl(104, 91%, 29%)",
          ["match", ["get", "reach_code"], ["4700"], true, false],
          "hsl(86, 91%, 69%)",
          ["match", ["get", "reach_code"], ["4800"], true, false],
          "hsl(80, 85%, 80%)",
          ["match", ["get", "reach_code"], ["4900"], true, false],
          "hsl(75, 93%, 34%)",
          ["match", ["get", "reach_code"], ["5000"], true, false],
          "hsl(243, 40%, 43%)",
          ["match", ["get", "reach_code"], ["5100"], true, false],
          "hsl(0, 45%, 40%)",
          ["match", ["get", "reach_code"], ["5200"], true, false],
          "hsl(0, 95%, 79%)",
          ["match", ["get", "reach_code"], ["5300"], true, false],
          "hsl(0, 91%, 31%)",
          ["match", ["get", "reach_code"], ["5400"], true, false],
          "hsl(0, 34%, 58%)",
          ["match", ["get", "reach_code"], ["5500"], true, false],
          "hsl(0, 87%, 93%)",
          ["match", ["get", "reach_code"], ["5600"], true, false],
          "hsl(0, 91%, 56%)",
          ["match", ["get", "reach_code"], ["5700"], true, false],
          "hsl(0, 52%, 51%)",
          ["match", ["get", "reach_code"], ["5800"], true, false],
          "hsl(328, 71%, 44%)",
          ["match", ["get", "reach_code"], ["5900"], true, false],
          "hsl(310, 75%, 38%)",
          ["match", ["get", "reach_code"], ["6000"], true, false],
          "hsl(288, 88%, 79%)",
          ["match", ["get", "reach_code"], ["6100"], true, false],
          "hsl(291, 55%, 42%)",
          ["match", ["get", "reach_code"], ["6200"], true, false],
          "hsl(269, 87%, 75%)",
          ["match", ["get", "reach_code"], ["6300"], true, false],
          "hsl(254, 47%, 38%)",
          ["match", ["get", "reach_code"], ["6400"], true, false],
          "hsl(208, 68%, 31%)",
          ["match", ["get", "reach_code"], ["6500"], true, false],
          "hsl(216, 24%, 77%)",
          ["match", ["get", "reach_code"], ["6600"], true, false],
          "hsl(200, 68%, 54%)",
          ["match", ["get", "reach_code"], ["6700"], true, false],
          "hsl(184, 92%, 85%)",
          ["match", ["get", "reach_code"], ["6800"], true, false],
          "hsl(165, 83%, 50%)",
          ["match", ["get", "reach_code"], ["6900"], true, false],
          "hsl(160, 84%, 37%)",
          ["match", ["get", "reach_code"], ["7000"], true, false],
          "hsl(135, 88%, 80%)",
          ["match", ["get", "reach_code"], ["7100"], true, false],
          "hsl(88, 83%, 75%)",
          ["match", ["get", "reach_code"], ["7200"], true, false],
          "hsl(72, 93%, 89%)",
          ["match", ["get", "reach_code"], ["7300"], true, false],
          "hsl(48, 81%, 40%)",
          ["match", ["get", "reach_code"], ["7950"], true, false],
          "hsl(23, 76%, 47%)",
          ["match", ["get", "reach_code"], ["7980"], true, false],
          "hsl(0, 25%, 31%)",
          ["match", ["get", "reach_code"], ["8000"], true, false],
          "hsl(0, 94%, 33%)",
          ["match", ["get", "reach_code"], ["8014"], true, false],
          "hsl(0, 63%, 60%)",
          ["match", ["get", "reach_code"], ["8015"], true, false],
          "hsl(0, 93%, 84%)",
          ["match", ["get", "reach_code"], ["8041"], true, false],
          "hsl(0, 46%, 70%)",
          ["match", ["get", "reach_code"], ["8050"], true, false],
          "hsl(337, 81%, 38%)",
          ["match", ["get", "reach_code"], ["8051"], true, false],
          "hsl(314, 63%, 38%)",
          ["match", ["get", "reach_code"], ["8061"], true, false],
          "hsl(317, 42%, 83%)",
          ["match", ["get", "reach_code"], ["8094"], true, false],
          "hsl(283, 92%, 38%)",
          ["match", ["get", "reach_code"], ["8100"], true, false],
          "hsl(243, 82%, 45%)",
          ["match", ["get", "reach_code"], ["8160"], true, false],
          "hsl(235, 93%, 87%)",
          ["match", ["get", "reach_code"], ["8162"], true, false],
          "hsl(234, 39%, 54%)",
          ["match", ["get", "reach_code"], ["8250"], true, false],
          "hsl(210, 93%, 55%)",
          ["match", ["get", "reach_code"], ["8251"], true, false],
          "hsl(171, 86%, 73%)",
          ["match", ["get", "reach_code"], ["8260"], true, false],
          "hsl(168, 86%, 56%)",
          ["match", ["get", "reach_code"], ["8261"], true, false],
          "hsl(141, 93%, 53%)",
          ["match", ["get", "reach_code"], ["8270"], true, false],
          "hsl(85, 91%, 80%)",
          ["match", ["get", "reach_code"], ["8271"], true, false],
          "hsl(40, 76%, 65%)",
          ["match", ["get", "reach_code"], ["8350"], true, false],
          "hsl(29, 93%, 30%)",
          ["match", ["get", "reach_code"], ["8450"], true, false],
          "hsl(267, 93%, 63%)",
          ["match", ["get", "reach_code"], ["8470"], true, false],
          "hsl(207, 91%, 67%)",
          ["match", ["get", "reach_code"], ["8620"], true, false],
          "hsl(140, 78%, 74%)",
          ["match", ["get", "reach_code"], ["8910"], true, false],
          "hsl(85, 93%, 80%)",
          ["match", ["get", "reach_code"], ["8920"], true, false],
          "hsl(32, 89%, 47%)",
          ["match", ["get", "reach_code"], ["8930"], true, false],
          "hsl(324, 85%, 59%)",
          ["match", ["get", "reach_code"], ["8940"], true, false],
          "hsl(257, 80%, 55%)",
          ["match", ["get", "reach_code"], ["8950"], true, false],
          "hsl(168, 75%, 41%)",
          ["match", ["get", "reach_code"], ["8960"], true, false],
          "hsl(100, 91%, 75%)",
          ["match", ["get", "reach_code"], ["8970"], true, false],
          "hsl(61, 93%, 60%)",
          ["match", ["get", "reach_code"], ["8980"], true, false],
          "hsl(31, 95%, 49%)",
          ["match", ["get", "reach_code"], ["8980"], true, false],
          "hsl(33, 91%, 91%)",
          ["match", ["get", "reach_code"], ["9210"], true, false],
          "hsl(0, 80%, 53%)",
          ["match", ["get", "reach_code"], ["9220"], true, false],
          "hsl(0, 79%, 83%)",
          ["match", ["get", "reach_code"], ["9230"], true, false],
          "hsl(285, 87%, 42%)",
          ["match", ["get", "reach_code"], ["9240"], true, false],
          "hsl(156, 82%, 58%)",
          ["match", ["get", "reach_code"], ["9330"], true, false],
          "hsl(47, 83%, 48%)",
          ["match", ["get", "reach_code"], ["9340"], true, false],
          "hsl(254, 89%, 54%)",
          ["match", ["get", "reach_code"], ["9420"], true, false],
          "hsl(203, 93%, 79%)",
          ["match", ["get", "reach_code"], ["9930"], true, false],
          "hsl(122, 84%, 63%)",
          ["match", ["get", "reach_code"], ["9940"], true, false],
          "hsl(104, 93%, 76%)",
          ["match", ["get", "reach_code"], ["9970"], true, false],
          "hsl(90, 42%, 32%)",
          ["match", ["get", "reach_code"], ["9980"], true, false],
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
    "layout": {"line-join": "round"},
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
          0.25,
          15,
          1,
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
          6
      ],
      "line-color": "hsl(0, 0%, 0%)"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
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
          12.5,
          0,
          13,
          0.25,
          15,
          1,
          22,
          1
      ],
      "line-offset": 1,
      "line-width": 4
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "hsl(24, 72%, 49%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0,
          13,
          0.25,
          15,
          1,
          22,
          1
      ],
      "line-dasharray": [2, 2],
      "line-offset": 1
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "hsl(24, 72%, 49%)",
      "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0,
          13,
          0.25,
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
  [STREAMS_FILTERS]: [
    {
      "source_name":MHFD_STREAMS_FILTERS,
      type: 'line',
      'source-layer': 'pluto15v1',
      layout: {
        "line-miter-limit":2
      },
      "paint": {
        "line-color": "#154784",
        "line-opacity": [
          "step",
          ["zoom"],
          0.9,
          11.49,
          0.8,
          11.59,
          0.3,
          12,
          0
        ],
        "line-width": [
          "interpolate",
          ["linear"],
          ["get", "max_catch_sum"],
          130.08,
          1,
          1000,
          1.5,
          400000,
          10
        ],
        
      }
    },
    {
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
      "line-opacity": 0,
      "line-width": [
          "interpolate",
          ["linear"],
          ["get", "catch_sum"],
          130.080010015,
          5,
          640,
          6,
          6400,
          9,
          1131411.35931,
          16
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
      "line-opacity": 0,
      "line-width": [
          "interpolate",
          ["linear"],
          ["get", "catch_sum"],
          130.080010015,
          4,
          640,
          6,
          6400,
          9,
          1131411.35931,
          16
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
      ],
    
      "line-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        11,
        0,
        11.7,
        1,
        22,
        1
      ]
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "minzoom": 11,
    "layout": {
        "text-field": [
            "case",
            [">", ["get", "catch_sum"], 100000],
            ["to-string", ["get", "str_name"]],
            ["to-string", ""]
        ],
        "symbol-placement": "line",
        "text-letter-spacing": 0.02,
        "text-allow-overlap": true,
        "text-ignore-placement": true
    },
    "paint": {
        "text-color": "hsl(0, 3%, 100%)",
        "text-halo-color": "#474a71",
        "text-halo-width": 1.5,
        "text-opacity": ["step", ["zoom"], 0, 10, 1]
    }
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "minzoom": 11,
    "layout": {
        "text-size": 12,
        "text-field": [
            "case",
            ["<=", ["get", "catch_sum"], 100000],
            ["to-string", ["get", "str_name"]],
            ""
        ],
        "symbol-avoid-edges": true,
        "symbol-placement": "line"
    },
    "paint": {
        "text-color": "hsl(0, 3%, 100%)",
        "text-halo-color": "#474a71",
        "text-halo-width": 1,
        "text-opacity": ["step", ["zoom"], 0, 13, 1]
    }
  }], 
  [MHFD_STREAMS_FILTERS]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": "#0ff500",
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
  }, 
  // {
  //   type: 'line',
  //   'source-layer': 'pluto15v1',
  //   layout: {},
  //   "paint": {
  //     "line-color": [
  //         "interpolate",
  //         ["linear"],
  //         ["zoom"],
  //         0,
  //         "hsla(0, 0%, 0%, 0.12)",
  //         10.5,
  //         "hsla(210, 69%, 51%, 0.34)",
  //         11,
  //         "hsla(210, 71%, 35%, 0.67)",
  //         12,
  //         "hsl(210, 71%, 37%)",
  //         12.58,
  //         "hsl(210, 69%, 62%)",
  //         22,
  //         "hsl(210, 69%, 77%)"
  //     ],
  //     "line-width": [
  //         "interpolate",
  //         ["linear"],
  //         ["get", "catch_sum"],
  //         130.080010015,
  //         0.5,
  //         640,
  //         1,
  //         6400,
  //         4,
  //         1131411.35931,
  //         12
  //     ]
  //   }
  // }, {
  //   type: 'line',
  //   'source-layer': 'pluto15v1',
  //   layout: {},
  //   "paint": {
  //     "line-color": [
  //         "interpolate",
  //         ["linear"],
  //         ["zoom"],
  //         0,
  //         "hsla(0, 0%, 0%, 0.12)",
  //         10.5,
  //         "hsla(210, 69%, 51%, 0.34)",
  //         11,
  //         "hsla(210, 71%, 35%, 0.67)",
  //         12,
  //         "hsl(210, 71%, 37%)",
  //         12.58,
  //         "hsl(210, 69%, 62%)",
  //         22,
  //         "hsl(210, 69%, 77%)"
  //     ],
  //     "line-width": [
  //         "interpolate",
  //         ["linear"],
  //         ["get", "catch_sum"],
  //         130.080010015,
  //         0.5,
  //         640,
  //         1,
  //         6400,
  //         4,
  //         1131411.35931,
  //         12
  //     ]
  //   }
  // }, {
  //   type: 'symbol',
  //   'source-layer': 'pluto15v1',
  //   "layout": {
  //     "text-size": 12,
  //     "text-variable-anchor": ["center"],
  //     "text-max-angle": 0,
  //     "symbol-spacing": 550,
  //     "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"],
  //     "symbol-placement": "line-center",
  //     "text-justify": "auto",
  //     "text-padding": 1,
  //     "text-rotation-alignment": "map",
  //     "text-field": [
  //         "coalesce",
  //         ["get", "name_en"],
  //         ["get", "name"],
  //         ["get", "str_name"]
  //     ],
  //     "text-max-width": 111
  //   },
  //   "paint": {
  //       "text-color": "hsl(0, 0%, 100%)",
  //       "text-translate": [10, 0],
  //       "text-translate-anchor": "viewport"
  //   }
  // }, {
  //   type: 'symbol',
  //   'source-layer': 'pluto15v1',
  //   "layout": {
  //     "text-size": 12,
  //     "text-variable-anchor": ["center"],
  //     "text-max-angle": 0,
  //     "symbol-spacing": 550,
  //     "text-font": ["Open Sans Bold", "Arial Unicode MS Regular"],
  //     "symbol-placement": "line-center",
  //     "text-justify": "auto",
  //     "text-padding": 1,
  //     "text-rotation-alignment": "map",
  //     "text-field": ["to-string", ["get", "str_name"]],
  //     "text-max-width": 111
  //   },
  //   "paint": {
  //       "text-color": "hsl(0, 0%, 100%)",
  //       "text-translate": [10, 0],
  //       "text-translate-anchor": "viewport"
  //   }
  // }
], 
  [XSTREAMS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": ["to-string", ["get", "str_name"]],
      "symbol-placement": "line",
      "text-font": ["Open Sans SemiBold", "Arial Unicode MS Regular"]
    },
    "paint": {
        "text-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            "hsl(227, 63%, 76%)",
            22,
            "hsl(227, 0%, 100%)"
        ]
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
  },
  {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
        "concat",
        [
          "to-string",
          ["get", "servicearea"]
        ],
        " ",
        "Service Area"
      ],
      "text-font":[
        "Open Sans Regular",
        "Arial Unicode MS Regular"
      ],
      "text-size":14,
      "text-line-height":1.2,
      "text-letter-spacing":0.4,
      "text-justify":"auto",
      "text-offset":[0, 2],
      "text-allow-overlap":true,
      "symbol-avoid-edges":false,
      "text-rotation-alignment":"map",
      "symbol-placement":"line",
      "symbol-spacing":200,
      "text-max-angle":20,
      "text-padding":30
    },
    "paint": {
      "text-color":"#fcfcfc",
      "text-opacity":[
        "interpolate",
        ["linear"],
        ["zoom"],
        12.5,
        0.8,
        12.51,
        1,
        13.9,
        1,
        13.91,
        0.8
      ],
      "text-halo-color":"hsla(250, 61%, 24%, 0.35)",
      "text-halo-width":20,
      "text-halo-blur":20
    }
  }, 
  {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
        "concat",
        [
          "to-string",
          ["get", "servicearea"]
        ],
        " ",
        "Service Area"
      ],
      "text-font":[
        "Open Sans Regular",
        "Arial Unicode MS Regular"
      ],
      "text-offset":[0, 1.5],
      "text-size":13,
      "text-letter-spacing":0.35,
      "text-line-height": 1.4,
      "text-justify": "right",
      "symbol-placement":"line",
      "symbol-spacing":250,
      // "text-max-angle":15,
      // "symbol-avoid-edges":true,
      // "text-rotation-alignment":"map",
      "text-padding":40
    },
    "paint": {
      "text-color":"#fcfcfc", //fix this,
      "text-opacity":1,
      "text-halo-color":"hsla(250, 61%, 24%, 0.35)",
      "text-halo-width":20,
      "text-halo-blur":20
    }
  }, 
  {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
        "concat",
        [
          "to-string",
          ["get", "servicearea"]
        ],
        " ",
        "Service Area"
      ],
      "text-font":[
        "Open Sans Regular",
        "Arial Unicode MS Regular"
      ],
      "text-size":22,
      "text-line-height":1.2,
      "text-justify":"center",
      // "text-anchor":"center",
      "text-offset":[0,2],
      // "text-translate":[0, 0],
      "symbol-placement":"point",
      "symbol-spacing":250,
      "text-max-angle":45,
      // "symbol-avoid-edges":true,
      "text-padding":[
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        60,
        11,
        120,
        12,
        180,
        22,
        180
      ],
      "text-letter-spacing":0.4,
      "text-max-width":10
    },
    "paint": {
        "text-halo-color":"hsla(250, 61%, 24%, 0.52)",
        "text-halo-width":24,
        "text-halo-blur":24,
        "text-color": "#fcfcfc",
        "text-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          12,
          1,
          13.5,
          0,
          22,
          0
        ]
    }
  },
  {
    // copy4
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
        "concat",
        [
          "to-string",
          ["get", "servicearea"]
        ],
        " ",
        "Service Area"
      ],
      "text-font":[
        "Open Sans Regular",
        "Arial Unicode MS Regular"
      ],
      "text-size":20,
      "text-line-height":1.2,
      "text-justify":"center",
      // "text-anchor":"center",
      // "text-translate":[0, 0],
      "symbol-placement":"point",
      // "symbol-avoid-edges":true,
      "text-padding":[
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        60,
        11,
        120,
        12,
        180,
        22,
        180
      ],
      "text-letter-spacing":0.4,
      "text-max-width":10
    },
    "paint": {
        "text-halo-color":"hsla(250, 61%, 24%, 0.52)",
        "text-halo-width":120,
        "text-halo-blur":12,
        "text-color": "hsl(163, 2%, 96%)",
        "text-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          12,
          1,
          13,
          0,
          22,
          0
        ]
    }
  },
  {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color":'#ffffff',
      "fill-opacity":0.01
    }
  }
],
  [SERVICE_AREA_POINTS]: [],
  [MUNICIPALITIES_FILTERS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "match",
          ["get", "city"],
          ["Aurora"],
          "hsl(212, 50%, 56%)",
          ["Denver"],
          "#ae3727",
          ["Glendale"],
          "#487920",
          ["Lone Tree"],
          "hsl(0, 93%, 72%)",
          ["Englewood"],
          "hsl(103, 38%, 28%)",
          ["Lakeside"],
          "hsl(312, 85%, 58%)",
          ["Bow Mar"],
          "hsl(253, 88%, 55%)",
          ["Lafayette"],
          "hsl(66, 83%, 62%)",
          ["Golden"],
          "hsl(48, 89%, 56%)",
          ["Federal Heights"],
          "hsl(189, 78%, 58%)",
          ["Erie"],
          "hsl(0, 94%, 53%)",
          ["Columbine Valley"],
          "hsl(288, 79%, 55%)",
          ["Lousiville"],
          "hsl(114, 63%, 66%)",
          ["Sheridan"],
          "hsl(43, 96%, 37%)",
          ["Foxfield"],
          "hsl(0, 13%, 52%)",
          ["Morrison"],
          "hsl(360, 86%, 37%)",
          ["Castle Rock"],
          "hsl(125, 78%, 70%)",
          ["Boulder"],
          "hsl(17, 83%, 41%)",
          ["Commerce City"],
          "hsl(0, 24%, 46%)",
          ["Superior"],
          "hsl(211, 89%, 82%)",
          ["Westminster"],
          "hsl(281, 79%, 46%)",
          ["Wheat Ridge"],
          "hsl(62, 71%, 73%)",
          ["Lochbuie"],
          "hsl(128, 88%, 53%)",
          ["Parker"],
          "hsl(242, 83%, 45%)",
          ["Cherry Hills Village"],
          "#d40c2b",
          ["Centennial"],
          "hsl(188, 67%, 24%)",
          ["Mountain View"],
          "hsl(202, 89%, 81%)",
          ["Arvada"],
          "hsl(168, 81%, 63%)",
          ["Brighton"],
          "hsl(237, 53%, 38%)",
          ["Edgewater"],
          "hsl(183, 83%, 56%)",
          ["Northglenn"],
          "hsl(130, 93%, 40%)",
          ["Castle Pines"],
          "hsl(97, 48%, 24%)",
          ["Greenwood Village"],
          "hsl(39, 84%, 75%)",
          ["Lakewood"],
          "hsl(219, 93%, 31%)",
          ["Thornton"],
          "hsl(0, 91%, 68%)",
          ["Littleton"],
          "hsl(47, 85%, 38%)",
          ["Broomfield"],
          "hsl(36, 84%, 45%)",
          "hsl(0, 0%, 0%)"
      ],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.45,
          12,
          0.45,
          14,
          0,
          22,
          0
      ],
      "fill-outline-color": "hsla(0, 0%, 0%, 0)"
     }
    }, {
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
          14,
          "hsl(0, 0%, 0%)",
          17,
          "hsl(0, 0%, 0%)",
          22,
          "hsl(0, 0%, 0%)"
      ],
      "line-dasharray": [2, 1],
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
  [MUNICIPALITIES_POINTS]: [ {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
          "match",
          ["get", "city"],
          [
              "Broomfield",
              "Littleton",
              "Aurora",
              "Boulder",
              "Denver",
              "Parker",
              "Lakewood",
              "Golden",
              "Brighton"
          ],
          ["to-string", ["get", "city"]],
          ""
      ],
      "text-offset": [1, 1],
      "text-pitch-alignment": "viewport",
      "text-padding": 111,
      "symbol-avoid-edges": true,
      "text-justify": "auto",
      "visibility": "none"
    },
    "paint": {
        "text-color": "hsl(227, 100%, 100%)",
        "text-halo-color": "hsla(196, 0%, 31%, 0.57)",
        "text-halo-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            13.19,
            0,
            22,
            3
        ],
        "text-halo-blur": 1,
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            1,
            13,
            0,
            22,
            0
        ]
    }
},  {
  type: 'symbol',
  'source-layer': 'pluto15v1',
  "layout": {
    "text-field": [
        "step",
        ["zoom"],
        [
            "match",
            ["get", "city"],
            [
                "Broomfield",
                "Littleton",
                "Aurora",
                "Boulder",
                "Denver",
                "Parker",
                "Lakewood",
                "Golden",
                "Brighton"
            ],
            ["to-string", ["get", "city"]],
            ["to-string", ["get", "city"]]
        ],
        13,
        ["to-string", ["get", "city"]],
        22,
        [
            "match",
            ["get", "city"],
            [
                "Broomfield",
                "Littleton",
                "Aurora",
                "Boulder",
                "Denver",
                "Parker",
                "Lakewood",
                "Golden",
                "Brighton"
            ],
            ["to-string", ["get", "city"]],
            ["to-string", ["get", "city"]]
        ]
    ],
    "symbol-placement": "line",
    "text-offset": [2, 2],
    "text-pitch-alignment": "viewport",
    "symbol-spacing": 500,
    "symbol-avoid-edges": true,
    "text-font": ["Open Sans SemiBold", "Arial Unicode MS Regular"],
    "visibility": "none"
  },
  "paint": {
      "text-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsl(227, 100%, 100%)",
          13.5,
          "hsl(227, 95%, 100%)",
          14,
          "hsl(227, 100%, 0%)",
          22,
          "hsl(227, 100%, 0%)"
      ],
      "text-halo-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          "hsla(196, 0%, 31%, 0.57)",
          22,
          "hsla(196, 4%, 97%, 0.57)"
      ],
      "text-halo-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          13.15,
          0,
          22,
          2
      ],
      "text-halo-blur": 1,
      "text-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          12.5,
          0,
          14.08,
          1,
          22,
          1
      ]
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
  },{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color":'#ffffff',
      "fill-opacity":0.01
    }
  }],
  [COUNTIES_POINTS]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": [
          "concat",
          ["to-string", ["get", "county"]],
          " ",
          "County"
      ],
      "text-size": 18,
      "text-padding": 66,
      "visibility": "none"
    },
    "paint": {"text-color": "hsl(0, 4%, 58%)"}
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
    "layout": {
      "line-round-limit": 1,
      "line-cap": "round",
      "line-miter-limit": 0,
      "line-join": "round"
    },
    "paint": {
      "line-color": [
          "step",
          ["zoom"],
          "hsla(0, 100%, 52%, 0.65)",
          7,
          "hsla(0, 100%, 52%,0.72)",
          11,
          "hsla(0, 100%, 52%,0.85)",
          13,
          "hsla(0, 100%, 52%,0.95)",
          22,
          "hsla(0, 100%, 52%, 0.39)"
      ],
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          9, 10,
          16, 22,
        ],
      "line-opacity": 0.76
    }
  }],
  [FLOOD_HAZARD_POLYGON]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": 'hsla(35, 100%, 50%, 1)'
    }
  }, {
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsla(35, 100%, 50%, 1)",
    }
  }],
  [FLOOD_HAZARD_LINE]: [{
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": 'hsla(35, 100%, 50%, 1)'
    }
  }],
  [FLOOD_HAZARD_POINT]: [ {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsla(35, 100%, 50%, 1)",
      "circle-stroke-color": "hsla(35, 100%, 50%, 1)",
      "circle-stroke-width": 1,
      "circle-radius": 3
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
  [NRCS_SOILS]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": [
          "match",
          ["get", "hydgrpdcd"],
          ["A"],
          "hsla(39, 87%, 52%, 0.33)",
          ["A/D"],
          "hsla(341, 78%, 58%, 0.33)",
          ["B"],
          "hsla(162, 81%, 36%, 0.33)",
          ["C"],
          "hsla(215, 50%, 45%, 0.33)",
          ["D"],
          "hsla(290, 40%, 39%, 0.33)",
          ["<Null>"],
          "hsla(96, 3%, 52%, 0.33)",
          "#000000"
      ]
    }
  }],
  [DWR_DAM_SAFETY]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "#c10022",
      "circle-stroke-color": "hsl(244, 0%, 98%)",
      "circle-stroke-width": 1,
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.9,
          0,
          9,
          5,
          22,
          10
      ],
      "circle-stroke-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.9,
          0,
          9,
          1,
          22,
          1
      ]
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "#feda00",
      "circle-stroke-color": "hsl(0, 0%, 100%)",
      "circle-stroke-width": 1,
      "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          9,
          2,
          22,
          5
      ],
      "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8.9,
          0,
          9,
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
          8.9,
          0,
          9,
          1,
          22,
          1
      ]
    }
  }], 
  [STREAM_MANAGEMENT_CORRIDORS]: [
    {
      "type": "fill",
      "source-layer": "pluto15v1",
      "paint": {
          "fill-color": "hsla(0, 0%, 0%, 0)",
          "fill-outline-color": [
              "match",
              ["get", "smc_type"],
              ["Fluvial Hazard Buffer"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "hsl(27, 97%, 56%)",
                  ["Stream Corridor"],
                  "hsl(301, 60%, 56%)",
                  "#000000"
              ],
              "#000000"
          ]
      }
    }, , {
      "type": "fill",
      "source-layer": 'pluto15v1',
      "paint": {
          "fill-color": [
              "match",
              ["get", "smc_type"],
              ["Fluvial Hazard Buffer"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "hsl(77, 88%, 64%)",
                  ["Stream Corridor"],
                  "hsl(288, 80%, 59%)",
                  "#000000"
              ],
              "hsla(0, 0%, 0%, 0)"
          ],
          "fill-opacity": 0.21
      }
    }, {
      "type": "fill",
      "source-layer": "pluto15v1",
      "paint": {
          "fill-color": [
              "match",
              ["get", "smc_type"],
              ["Fluvial Hazard Buffer"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "hsl(77, 88%, 64%)",
                  ["Stream Corridor"],
                  "hsl(288, 80%, 59%)",
                  "#000000"
              ],
              "hsla(0, 0%, 0%, 0)"
          ],
          "fill-pattern": [
              "match",
              ["get", "smc_type"],
              ["Fluvial Hazard Buffer"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "ic-stripered",
                  ["Stream Corridor"],
                  "ic-stripeviolet",
                  "pedestrian-polygon"
              ],
              "pedestrian-polygon"
          ]
      }
    }, {
      "type": "fill",
      'source-layer': 'pluto15v1',
      "paint": {
          "fill-color": [
              "match",
              ["get", "smc_type"],
              ["Stream Management Corridor"],
              "hsl(46, 100%, 61%)",
              ["Avulsion Hazard Zone"],
              "hsla(303, 80%, 82%, 0)",
              ["Active Stream Corridor"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "hsl(46, 88%, 67%)",
                  ["Stream Corridor"],
                  "#7a43db",
                  "#000000"
              ],
              ["Fluvial Hazard Buffer"],
              [
                  "match",
                  ["get", "scale"],
                  ["Watershed"],
                  "hsla(77, 88%, 64%, 0)",
                  ["Stream Corridor"],
                  "hsla(288, 80%, 59%, 0)",
                  "hsla(0, 0%, 0%, 0)"
              ],
              "#000000"
          ],
          "fill-opacity": 0.8
      }
    }
  ],
  [BLOCK_CLEARANCE_ZONES_LAYERS]: [
    {
      type: 'fill',
      filter: ['==', 'species_name', 'Prebles meadow jumping mouse'],
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsla(25, 61%, 38%, 0.32)",
        "fill-pattern": ["step", ["zoom"], "pjm2", 22, "pjm2"],
        "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0.2,
            22,
            0.25
        ],
        "fill-antialias": false,
        "fill-outline-color": "#000000"
      }
    }, {
      type: 'fill',
      filter: ['==', 'species_name', 'Prebles meadow jumping mouse'],
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsla(25, 61%, 38%, 0.32)",
        "fill-outline-color": "hsl(189, 90%, 55%)"
      }
    },
    {
      type: 'line',
      filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "line-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            "hsl(289, 55%, 10%)",
            8.67,
            "hsl(289, 52%, 20%)",
            9,
            "hsl(289, 60%, 15%)",
            9.67,
            "hsl(289, 52%, 20%)",
            22,
            "hsl(289, 52%, 20%)"
        ],
        "line-gap-width": 12,
        "line-blur": 22,
        "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            11,
            22,
            22
        ]
      }
    }, {
      type: 'fill',
      filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsl(180, 75%, 86%)",
        "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8.5,
            1,
            14,
            0.51
        ]
      }
    }, {
      type: 'fill',
      filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
      'source-layer': 'pluto15v1',
      layout: {},
      "paint": {
        "fill-color": "hsl(292, 72%, 88%)",
        "fill-pattern": [
            "step",
            ["zoom"],
            "viewpoint-11",
            22,
            "viewpoint-15"
        ]
    }
    }
  ],
  [BCZ_PREBLE_MEADOW_JUMPING]: [{
    type: 'fill',
    filter: ['==', 'species_name', 'Prebles meadow jumping mouse'],
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsla(25, 61%, 38%, 0.32)",
      "fill-pattern": ["step", ["zoom"], "pjm2", 22, "pjm2"],
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.2,
          22,
          0.25
      ],
      "fill-antialias": false,
      "fill-outline-color": "#000000"
    }
  }, {
    type: 'fill',
    filter: ['==', 'species_name', 'Prebles meadow jumping mouse'],
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsla(25, 61%, 38%, 0.32)",
      "fill-outline-color": "hsl(189, 90%, 55%)"
    }
  }],
  [BCZ_UTE_LADIES_TRESSES_ORCHID]: [{
    type: 'line',
    filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8,
          "hsl(289, 55%, 10%)",
          8.67,
          "hsl(289, 52%, 20%)",
          9,
          "hsl(289, 60%, 15%)",
          9.67,
          "hsl(289, 52%, 20%)",
          22,
          "hsl(289, 52%, 20%)"
      ],
      "line-gap-width": 12,
      "line-blur": 22,
      "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          11,
          22,
          22
      ]
    }
  }, {
    type: 'fill',
    filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(180, 75%, 86%)",
      "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8.5,
          1,
          14,
          0.51
      ]
    }
  }, {
    type: 'fill',
    filter: ['!=', 'species_name', 'Prebles meadow jumping mouse'],
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsl(292, 72%, 88%)",
      "fill-pattern": [
          "step",
          ["zoom"],
          "viewpoint-11",
          22,
          "viewpoint-15"
      ]
  }
  }],
  [RESEARCH_MONITORING]: [{
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(295, 90%, 51%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          10,
          22,
          20
      ],
      "circle-stroke-color": "hsla(91, 83%, 46%, 0.44)"
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(295, 90%, 51%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          7,
          22,
          15
      ],
      "circle-stroke-color": "hsla(91, 83%, 46%, 0.44)"
   }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(295, 90%, 51%)",
      "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          5,
          22,
          10
      ],
      "circle-stroke-color": "hsla(91, 83%, 46%, 0.44)"
    }
  }, {
    type: 'circle',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "circle-color": "hsl(295, 90%, 51%)",
      "circle-stroke-width": 7,
      "circle-stroke-color": "hsla(91, 83%, 46%, 0.44)"
    }
  }],
  [CLIMB_TO_SAFETY]: [{
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0.02,
          22,
          0.2
      ],
      "icon-offset": [-225, -250],
      "text-line-height": 6,
      "text-justify": "auto",
      "text-offset": [-4, -4],
      "icon-optional": true,
      "icon-text-fit-padding": [5, 2, 5, 2],
      "icon-image": "Frame17m2t"
    },
    "paint": {
        "text-color": "hsl(0, 85%, 53%)",
        "icon-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            8.5,
            0.66,
            9,
            1,
            22,
            1
        ]
    }
  }
  // , {
  //   type: 'circle',
  //   'source-layer': 'pluto15v1',
  //   layout: {},
  //   "paint": {
  //     "circle-color": "hsl(60, 100%, 68%)",
  //     "circle-stroke-color": "hsla(116, 60%, 42%, 0.66)",
  //     "circle-stroke-width": 3,
  //     "circle-opacity": [
  //         "interpolate",
  //         ["linear"],
  //         ["zoom"],
  //         8.9,
  //         0.5,
  //         9,
  //         0.54,
  //         22,
  //         1
  //     ],
  //     "circle-stroke-opacity": [
  //         "interpolate",
  //         ["linear"],
  //         ["zoom"],
  //         9.9,
  //         0,
  //         10,
  //         0.54,
  //         22,
  //         1
  //     ]
  //   }
  // }
],
  [SEMSWA_SERVICE_AREA]: [{
    type: 'fill',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {
      "fill-color": "hsla(221, 57%, 42%, 0.2)",
      "fill-outline-color": "#2ee550"
    }
  }, {
    type: 'line',
    'source-layer': 'pluto15v1',
    layout: {},
    "paint": {"line-dasharray": [5, 3]}
  }, {
    type: 'symbol',
    'source-layer': 'pluto15v1',
    "layout": {
      "text-field": "SEMSWA",
      "symbol-avoid-edges": true,
      "text-letter-spacing": 0.44,
      "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12,
          8,
          22,
          16
      ],
      "text-rotate": -45,
      "text-justify": "auto"
    },
    "paint": {
        "text-color": "#2ee550",
        "text-halo-width": 44,
        "text-opacity": 0.66,
        "text-halo-color": "hsla(0, 4%, 20%, 0.88)"
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

export const widthLayersStream = [
  [
    "interpolate",
    ["linear"],
    ["get", "max_catch_sum"],
    130.08,
    1,
    1000,
    1.5,
    400000,
    10
  ],
  [
    "interpolate",
    ["linear"],
    ["get", "catch_sum"],
    130.080010015,
    0.5,
    640,
    2,
    6400,
    4,
    1131411.35931,
    12
  ],
]