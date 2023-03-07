import moment from "moment";

export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 15;
export const EMPTY_SCREEN = 0;

export const MEDIUM_SCREEN_LEFT = 15;
export const MEDIUM_SCREEN_RIGHT = 9;

export const MAP_RESIZABLE_TRANSITION = 0.7;

export const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlsZWhpZ2hmZCIsImEiOiJjazRqZjg1YWQwZTN2M2RudmhuNXZtdWFyIn0.oU_jVFAr808WPbcVOFnzbg';
export const NEARMAP_TOKEN = 'NzA3ZjlkODYtMTNiMC00Y2E3LWE1MzAtYzU3NWUzMmJjMGUw';
export const MAP_DROPDOWN_ITEMS = [
  {
    type: 'Light Road',
    style: 'mapbox://styles/milehighfd/ck4k0tjln58h41cl4ixb8jsez'
  }, {
    // THIS ONE IS THE BASEMAP OFFICIAL
    type: 'Optional style',
    style: `mapbox://styles/milehighfd/ckxhudjgf1er514o9wbyvi6nw`,
  }, {
    type: 'Dark Road',
    style: 'mapbox://styles/milehighfd/ck4jfj4yy5abd1cqw90v1dlft'
  }, {
    type: 'Satellite',
    style: 'mapbox://styles/milehighfd/ck4jfl22r5ada1cqwix8gpjwp'
  }, {
    type: 'Terrain',
    style: 'mapbox://styles/milehighfd/ck4jflu4000ry1cmnh7fdp2oi'
  }
];

export const PROBLEMS_TRIGGER = 'problem_boundary';
export const PROPSPROBLEMTABLES = {
  problems: [
    'solutioncost',  //0
    'solutionstatus',  //1
    'jurisdiction',   //2
    'mhfdmanager',   //3
    'problemdescription',   //4
    'problemid',    //5
    'problemname',    //6
    'problempriority',    //7
    'problemtype',    //8
    'servicearea',    //9
    'shape_area',    //10
    'shape_length',  //11
    'sourcedate',    //12
    'sourcename',    //13
    'source',       //14
    'streamname',   //15
    'component_cost'   //16
  ], 
  problem_boundary: [
    'estimated_cost',  //0
    'component_status',  //1
    'local_government',  //2
    'mhfd_manager',  //3
    'problem_description',  //4
    'problem_id',  //5
    'problem_name',  //6
    'problem_severity',  //7
    'problem_type',  //8
    'service_area',  //9
    'shape_starea',  //10
    'shape_stlength',  //11
    'source_complete_year',  //12
    'source_name',  //13
    'source_type',  //14
    'stream_name',  //15
    'component_cost',  //16
    'estimated_cost'  //17
  ]
}
export const PROJECTS_TRIGGER = 'projects';
export const PROJECTS_MODAL = 'Projects';
export const PROBLEMS_MODAL = 'Problems';
export const COMPONENTS_TRIGGER = 'components';

export const FLOODPLAINS_FEMA_FILTERS = 'floodplains_fema_sfha';
export const FLOODPLAINS_NON_FEMA_FILTERS = 'floodplains_non_fema';
export const ACTIVE_LOMS = 'active_lomcs';
export const EFFECTIVE_REACHES = 'effective_reaches';
export const FEMA_FLOOD_HAZARD = 'fema_flood_hazard_zones';
export const WATERSHED_FILTERS = 'mhfd_catchments_simple_v1';
export const STREAMS_FILTERS = 'streams';
export const MHFD_STREAMS_FILTERS = 'mhfd_stream_reaches';
export const XSTREAMS = 'xstreams';
export const STREAMS_POINT = 'mhfd_flow_points';
export const SERVICE_AREA_FILTERS = 'watershed_service_areas';
export const SERVICE_AREA_POINTS = 'labels_service_area';
export const MUNICIPALITIES_FILTERS = 'municipalities';
export const MUNICIPALITIES_POINTS = 'labels_municipality';
export const COUNTIES_FILTERS = 'counties';
export const COUNTIES_POINTS = 'labels_county';
export const MHFD_BOUNDARY_FILTERS = 'district_boundary';
export const OPACITY_LAYERS = 'opacity_layers';

export const GRADE_CONTROL_STRUCTURE = 'grade_control_structure';
export const PIPE_APPURTENANCES = 'pipe_appurtenances';
export const SPECIAL_ITEM_POINT = 'special_item_point';
export const SPECIAL_ITEM_LINEAR = 'special_item_linear';
export const SPECIAL_ITEM_AREA = 'special_item_area';
export const CHANNEL_IMPROVEMENTS_LINEAR = 'channel_improvements_linear';
export const CHANNEL_IMPROVEMENTS_AREA = 'channel_improvements_area';
export const REMOVAL_LINE = 'removal_line';
export const REMOVAL_AREA = 'removal_area';
export const STORM_DRAIN = 'storm_drain';
export const DETENTION_FACILITIES = 'detention_facilities';
export const MAINTENANCE_TRAILS = 'maintenance_trails';
export const LAND_ACQUISITION = 'land_acquisition';
export const LANDSCAPING_AREA = 'landscaping_area';
export const STREAM_IMPROVEMENT_MEASURE = 'stream_improvement_measure';

export const FLOOD_HAZARD_POLYGON = 'flood_hazard_polygon_';
export const FLOOD_HAZARD_LINE = 'flood_hazard_line_';
export const FLOOD_HAZARD_POINT = 'flood_hazard_point_';
export const STREAM_FUNCTION_POLYGON = 'stream_function_polygon_';
export const STREAM_FUNCTION_POINT ='stream_function_point_';
export const STREAM_FUNCTION_LINE = 'stream_function_line_';
export const FUTURE_DEVELOPMENT_POLYGON ='future_development_polygon_';
export const FUTURE_DEVELOPMENT_LINE ='future_development_line_';

export const TEST_LINE ='test_line';

export const USE_LAND_COVER_LABEL = 'use_land_cover';

export const USE_LAND_COVER = {
  name: USE_LAND_COVER_LABEL,
  source: 'mapbox',
  tiles: [
    'milehighfd.create',
    'milehighfd.adams2',
    'milehighfd.adams3',
    'milehighfd.adams4',
    'milehighfd.adams5',
    'milehighfd.adams6',
    'milehighfd.adams7',
    'milehighfd.adams8',
    'milehighfd.adams9',
    'milehighfd.adams10',
    'milehighfd.Adams11',
    'milehighfd.Adams12',
    'milehighfd.Arapahoe1',
    'milehighfd.Arapahoe2',
    'milehighfd.Arapahoe3',
    'milehighfd.Arapahoe4',
    'milehighfd.Arapahoe5',
    'milehighfd.Arapahoe6',
    'milehighfd.Arapahoe7',
    'milehighfd.Arapahoe8',
    'milehighfd.Arapahoe9',
    'milehighfd.Arapahoe10',
    'milehighfd.Arapahoe11',
    'milehighfd.Boulder1',
    'milehighfd.Boulder2',
    'milehighfd.Boulder3',
    'milehighfd.Boulder4',
    'milehighfd.Boulder5',
    'milehighfd.Boulder6',
    'milehighfd.Boulder7',
    'milehighfd.Broomfield1',
    'milehighfd.Broomfield2',
    'milehighfd.Denver1',
    'milehighfd.Denver2',
    'milehighfd.Denver3',
    'milehighfd.Denver4',
    'milehighfd.Denver5',
    'milehighfd.Denver6',
    'milehighfd.Denver7',
    'milehighfd.Denver8',
    'milehighfd.Denver9',
    'milehighfd.Denver10',
    'milehighfd.Denver11',
    'milehighfd.Douglas1',
    'milehighfd.Douglas2',
    'milehighfd.Douglas3',
    'milehighfd.Douglas4',
    'milehighfd.Douglas5',
    'milehighfd.Douglas6',
    'milehighfd.Douglas7',
    'milehighfd.Douglas8',
    'milehighfd.Jefferson1',
    'milehighfd.Jefferson2',
    'milehighfd.Jefferson3',
    'milehighfd.Jefferson4',
    'milehighfd.Jefferson5',
    'milehighfd.Jefferson6',
    'milehighfd.Jefferson7',
    'milehighfd.Jefferson8',
    'milehighfd.Jefferson9',
    'milehighfd.Jefferson10',
    'milehighfd.Jefferson11',
    'milehighfd.Jefferson12',
    'milehighfd.Jefferson13',
    'milehighfd.Jefferson14',
    'milehighfd.Jefferson15',
    'milehighfd.Jefferson16'

  ]
};

export const USE_LAND_COVER_MAP: any = {
  'milehighfd.create': 'Adams1_LULC',
  'milehighfd.adams2': 'Adams2_LULC',
  'milehighfd.adams3': 'Adams3_LULC',
  'milehighfd.adams4': 'Adams4_LULC',
  'milehighfd.adams5': 'Adams5_LULC',
  'milehighfd.adams6': 'Adams6_LULC',
  'milehighfd.adams7': 'Adams7_LULC',
  'milehighfd.adams8': 'Adams8_LULC',
  'milehighfd.adams9': 'Adams9_LULC',
  'milehighfd.adams10': 'Adams10_LULC',
  'milehighfd.Adams11': 'Adams11_LULC',
  'milehighfd.Adams12': 'Adams12_LULC',
  'milehighfd.Arapahoe1': 'Arapahoe1_LULC',
  'milehighfd.Arapahoe2': 'Arapahoe2_LULC',
  'milehighfd.Arapahoe3': 'Arapahoe3_LULC',
  'milehighfd.Arapahoe4': 'Arapahoe4_LULC',
  'milehighfd.Arapahoe5': 'Arapahoe5_LULC',
  'milehighfd.Arapahoe6': 'Arapahoe6_LULC',
  'milehighfd.Arapahoe7': 'Arapahoe7_LULC',
  'milehighfd.Arapahoe8': 'Arapahoe8_LULC',
  'milehighfd.Arapahoe9': 'Arapahoe9_LULC',
  'milehighfd.Arapahoe10': 'Arapahoe10_LULC',
  'milehighfd.Arapahoe11': 'Arapahoe11_LULC',
  'milehighfd.Boulder1': 'Boulder1_LULC',
  'milehighfd.Boulder2': 'Boulder2_LULC',
  'milehighfd.Boulder3': 'Boulder3_LULC',
  'milehighfd.Boulder4': 'Boulder4_LULC',
  'milehighfd.Boulder5': 'Boulder5_LULC',
  'milehighfd.Boulder6': 'Boulder6_LULC',
  'milehighfd.Boulder7': 'Boulder7_LULC',
  'milehighfd.Broomfield1': 'Broomfield1_LULC',
  'milehighfd.Broomfield2': 'Broomfield2_LULC',
  'milehighfd.Denver1': 'Denver1_LULC',
  'milehighfd.Denver2': 'Denver2_LULC',
  'milehighfd.Denver3': 'Denver3_LULC',
  'milehighfd.Denver4': 'Denver4_LULC',
  'milehighfd.Denver5': 'Denver5_LULC',
  'milehighfd.Denver6': 'Denver6_LULC',
  'milehighfd.Denver7': 'Denver7_LULC',
  'milehighfd.Denver8': 'Denver8_LULC',
  'milehighfd.Denver9': 'Denver9_LULC',
  'milehighfd.Denver10': 'Denver10_LULC',
  'milehighfd.Denver11': 'Denver11_LULC',
  'milehighfd.Douglas1': 'Douglas1_LULC',
  'milehighfd.Douglas2': 'Douglas2_LULC',
  'milehighfd.Douglas3': 'Douglas3_LULC',
  'milehighfd.Douglas4': 'Douglas4_LULC',
  'milehighfd.Douglas5': 'Douglas5_LULC',
  'milehighfd.Douglas6': 'Douglas6_LULC',
  'milehighfd.Douglas7': 'Douglas7_LULC',
  'milehighfd.Douglas8': 'Douglas8_LULC',
  'milehighfd.Jefferson1': 'Jefferson1_LULC',
  'milehighfd.Jefferson2': 'Jefferson2_LULC',
  'milehighfd.Jefferson3': 'Jefferson3_LULC',
  'milehighfd.Jefferson4': 'Jefferson4_LULC',
  'milehighfd.Jefferson5': 'Jefferson5_LULC',
  'milehighfd.Jefferson6': 'Jefferson6_LULC',
  'milehighfd.Jefferson7': 'Jefferson7_LULC',
  'milehighfd.Jefferson8': 'Jefferson8_LULC',
  'milehighfd.Jefferson9': 'Jefferson9_LULC',
  'milehighfd.Jefferson10': 'Jefferson10_LULC',
  'milehighfd.Jefferson11': 'Jefferson11_LULC',
  'milehighfd.Jefferson12': 'Jefferson12_LULC',
  'milehighfd.Jefferson13': 'Jefferson13_LULC',
  'milehighfd.Jefferson14': 'Jefferson14_LULC',
  'milehighfd.Jefferson15': 'Jefferson15_LULC',
  'milehighfd.Jefferson16': 'Jefferson16_LULC'
};

export const FLOOD_HAZARDS = {
  name: 'floodhazards',
  tiles: [
    FLOOD_HAZARD_POLYGON,
    FLOOD_HAZARD_LINE,
    FLOOD_HAZARD_POINT,
    STREAM_FUNCTION_POLYGON,
    STREAM_FUNCTION_POINT,
    STREAM_FUNCTION_LINE,
    FUTURE_DEVELOPMENT_POLYGON,
    FUTURE_DEVELOPMENT_LINE,
  ]
}

export const FLOODPLAINS = {
  name: 'floodplains',
  tiles: [
    FLOODPLAINS_NON_FEMA_FILTERS
  ]
}

export const COMPONENT_LAYERS = {
  name: 'components',
  tiles: [
    LANDSCAPING_AREA,
    LAND_ACQUISITION,
    DETENTION_FACILITIES,
    STORM_DRAIN,
    CHANNEL_IMPROVEMENTS_AREA,
    CHANNEL_IMPROVEMENTS_LINEAR,
    SPECIAL_ITEM_AREA,
    SPECIAL_ITEM_LINEAR,
    SPECIAL_ITEM_POINT,
    PIPE_APPURTENANCES,
    GRADE_CONTROL_STRUCTURE,
    STREAM_IMPROVEMENT_MEASURE,
    REMOVAL_LINE,
    REMOVAL_AREA
  ]
};

export const MUNICIPALITIES = {
  name: 'municipalities',
  tiles: [
    MUNICIPALITIES_FILTERS,
    MUNICIPALITIES_POINTS
  ]
};
export const COUNTIES_LAYERS = {
  name: 'counties',
  tiles: [
    COUNTIES_FILTERS,
    COUNTIES_POINTS
  ]
};
export const SERVICE_AREA_LAYERS = {
  name: 'service_area',
  tiles: [
    SERVICE_AREA_FILTERS,
    SERVICE_AREA_POINTS
  ]
};
export const MEP_PROJECTS_TEMP_LOCATIONS = 'mep_projects_temp_locations';
export const MEP_PROJECTS_DETENTION_BASINS = 'mep_detentionbasins';
export const MEP_PROJECTS_CHANNELS = 'mep_channels';
export const MEP_PROJECTS_STORM_OUTFALLS = 'mep_outfalls';

export const MEP_PROJECTS = {
  name: 'mep_projects',
  tiles: [
    MEP_PROJECTS_STORM_OUTFALLS,
    MEP_PROJECTS_CHANNELS,
    MEP_PROJECTS_DETENTION_BASINS,
  ]
};

export const ROUTINE_NATURAL_AREAS = 'routine_natural_area';
export const ROUTINE_WEED_CONTROL = 'routine_weed_control';
export const ROUTINE_DEBRIS_AREA = 'routine_debris_area';
export const ROUTINE_DEBRIS_LINEAR = 'routine_debris_linear';

export const ROUTINE_MAINTENANCE = {
  name: 'routine_maintenance',
  tiles: [
    ROUTINE_DEBRIS_LINEAR,
    ROUTINE_DEBRIS_AREA,
    ROUTINE_WEED_CONTROL,
    ROUTINE_NATURAL_AREAS
  ]
};

export const PROJECTS_POLYGONS = 'projects_polygon_';
export const MHFD_PROJECTS = 'mhfd_projects'+ (process.env.REACT_APP_NODE_ENV ? ( '_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV) ) : '_dev');
export const PROJECTS_DRAFT = 'mhfd_projects_created' + (process.env.REACT_APP_NODE_ENV ? ( '_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV) ) : '_dev')

// export const MHFD_PROJECTS = 'mhfd_projects' + (process.env.REACT_APP_NODE_ENV ? ( '_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV) ) : '_dev')
// // export const PROJECTS_DRAFT = 'mhfd_projects_created' + (process.env.REACT_APP_NODE_ENV ? ( '_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV) ) : '_dev')
// export const PROJECTS_DRAFT = 'mhfd_projects' + (process.env.REACT_APP_NODE_ENV ? ( '_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV) ) : '_dev')
export const STUDIES = 'studies';

export const PROJECTS_MAP_STYLES = {
  name: 'projects',
  tiles: [
    MHFD_PROJECTS
  ]
}

export const PROJECTS_DRAFT_MAP_STYLES = {
  name: 'projects_draft',
  tiles: [
    PROJECTS_DRAFT
  ]
}
export const NRCS_SOILS = 'usda_nrcs_soils';
export const DWR_DAM_SAFETY = 'dwr_dam_safety';
export const STREAM_MANAGEMENT_CORRIDORS = 'mhfd_smcs';
export const BCZ_PREBLE_MEADOW_JUMPING =
  'bcz_prebles_meadow_jumping_mouse';
export const BCZ_UTE_LADIES_TRESSES_ORCHID =
  'bcz_ute_ladies_tresses_orchid';
export const BLOCK_CLEARANCE_ZONES_LAYERS = 'block_clearance_zones';
export const RESEARCH_MONITORING =
  'stormwater_research_sites';
export const CLIMB_TO_SAFETY = 'climb_to_safety_signs';
export const GUIDELINES = 'guidelines';
export const SEMSWA_SERVICE_AREA =
  'semswa_service_area';
export const BORDER = 'border';
export const AREA_BASED_MASK = 'area_based_mask';
export const SELECT_ALL_FILTERS = [
  MHFD_STREAMS_FILTERS,
  STREAMS_FILTERS,
  FLOOD_HAZARDS,
  MHFD_BOUNDARY_FILTERS,
  NRCS_SOILS,
  WATERSHED_FILTERS,
  SERVICE_AREA_LAYERS,
  SEMSWA_SERVICE_AREA,
  COUNTIES_LAYERS,
  MUNICIPALITIES,
  FEMA_FLOOD_HAZARD,
  ACTIVE_LOMS,
  EFFECTIVE_REACHES,
  FLOODPLAINS,
  STREAM_MANAGEMENT_CORRIDORS,
  DWR_DAM_SAFETY,
  CLIMB_TO_SAFETY,
  RESEARCH_MONITORING,
  ROUTINE_MAINTENANCE,
  MEP_PROJECTS,
  PROJECTS_MAP_STYLES,
  COMPONENT_LAYERS,
  PROBLEMS_TRIGGER,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  MHFD_STREAMS_FILTERS,
  STREAMS_POINT,
  BORDER,
  AREA_BASED_MASK,
  USE_LAND_COVER,
  TEST_LINE
];

export const PROJECT_TYPES = ['capital', 'study', 'maintenance', 'propertyAcquisition', 'special'];

export const DROPDOWN_ORGANIZATION = {
  REGIONAL_AGENCY_PUBLIC: [
    'Mile High Flood Control District'
  ],
  REGIONAL_AGENCY: [
    'SEMSWA Stormwater Service Area Boundary'
  ],
  CITY: [
    'Arvada',
    'Aurora',
    'Boulder',
    'Bow Mar',
    'Brighton',
    'Castle Pines',
    'Centennial',
    'Cherry Hills Village',
    'Columbine Valley',
    'Commerce City',
    'Edgewater',
    'Englewood',
    'Erie',
    'Federal Heights',
    'Foxfield',
    'Glendale',
    'Golden',
    'Greenwood Village',
    'Lafayette',
    'Lakeside',
    'Lakewood',
    'Littleton',
    'Lochbuie',
    'Lone Tree',
    'Lousiville',
    'Morrison',
    'Mountain View',
    'Northglenn',
    'Parker',
    'Sheridan',
    'Superior',
    'Thornton',
    'Westminster',
    'Wheat Ridge'
  ],
  CITY_AND_COUNTY: [
    "Broomfield",
    "Denver"
  ],
  UNINCORPORATED_COUNTY: [
    "Adams County",
    "Arapahoe County",
    "Boulder County",
    "Douglas County",
    "Jefferson County"
  ]
}

export const CITIES = [
  "None",
  "Arvada",
  "Aurora",
  "Boulder",
  "Bow Mar",
  "Brighton",
  "Broomfield",
  "Castle Pines",
  "Centennial",
  "Cherry Hills Village",
  "Columbine Valley",
  "Commerce City",
  "Denver",
  "Edgewater",
  "Englewood",
  "Erie",
  "Federal Heights",
  "Foxfield",
  "Glendale",
  "Golden",
  "Greenwood Village",
  "Lafayette",
  "Lakeside",
  "Lakewood",
  "Littleton",
  "Lochbuie",
  "Lone Tree",
  "Louisville",
  "Morrison",
  "Mountain View",
  "Northglenn",
  "Parker",
  "Sheridan",
  "Superior",
  "Thornton",
  "Westminster",
  "Wheat Ridge"
]


export const YEAR = [
  '2022',
  '2023',
  '2024',
  '2025',
  '2026'
]

export const ORGANIZATION = [
  "Adams County",
  "Arapahoe County",
  "Arvada",
  "Aurora",
  "Boulder",
  "Boulder County",
  "Bow Mar",
  "Brighton",
  "Broomfield",
  "Castle Pines",
  "Centennial",
  "Cherry Hills Village",
  "Columbine Valley",
  "Commerce City",
  "Denver",
  "Douglas County",
  "Edgewater",
  "Englewood",
  "Erie",
  "Federal Heights",
  "Foxfield",
  "Glendale",
  "Golden",
  "Greenwood Village",
  "Jefferson County",
  "Lafayette",
  "Lakeside",
  "Lakewood",
  "Littleton",
  "Lochbuie",
  "Lone Tree",
  "Louisville",
  "Morrison",
  "Mountain View",
  "Northglenn",
  "Parker",
  "SEMSWA",
  "Sheridan",
  "Superior",
  "Thornton",
  "Westminster",
  "Wheat Ridge"
];

export const JURISDICTION = [
  'Arvada',
  'Aurora',
  'Boulder',
  'Bow Mar',
  'Broomfield',
  'Brighton',
  'Castle Pines',
  'Centennial',
  'Cherry Hills Village',
  'Columbine Valley',
  'Commerce City',
  'Denver',
  'Edgewater',
  'Englewood',
  'Erie',
  'Federal Heights',
  'Foxfield',
  'Glendale',
  'Golden',
  'Greenwood Village',
  'Lafayette',
  'Lakeside',
  'Lakewood',
  'Littleton',
  'Lochbuie',
  'Lone Tree',
  'Louisville',
  'Morrison',
  'Mountain View',
  'Northglenn',
  'Parker',
  'SEMSWA',
  'Sheridan',
  'Superior',
  'Thornton',
  'Unincorporated Adams County',
  'Unincorporated Arapahoe County',
  'Unincorporated Boulder County',
  'Unincorporated Douglas County',
  'Unincorporated Jefferson County',
  'Westminster',
  'Wheat Ridge',
];

export const CONSULTANT_CONTRACTOR = [
  "53 Corporation",
  "AECOM",
  "American West Construction",
  "Anderson Consulting Engineers",
  "Applegate Group",
  "ArborForce",
  "Ark Ecological",
  "Arrowhead Landscaping",
  "Atkins",
  "Bohannan-Huston",
  "Bowman Consulting Group",
  "BT Construction",
  "Burns & McDonnell",
  "Calibre Engineering",
  "CDM Smith",
  "CEI",
  "Civil Design Group",
  "Collins Engineers",
  "Concrete Works of CO",
  "CRB Engineering",
  "CTM",
  "CVL Consultants",
  "David Evans and Associates",
  "Dewberry",
  "Drexel, Barrell & Company",
  "ECI",
  "Edge Contracting",
  "EMK Consultants",
  "Enginuity Engineering Solutions",
  "Entitlement and Engineering Solutions",
  "Flow Technologies",
  "Frontier Environmental",
  "Geosyntec Consultants",
  "Golder Associates",
  "Habitat Management",
  "HDR Engineering",
  "Huitt-Zollars",
  "ICON Engineering",
  "J. F. Sato and Associates",
  "Jacobs",
  "Jehn Engineering",
  "Kelley Trucking",
  "Kemp & Hoffman",
  "Kennedy/Jenks Consultants",
  "Kiowa Engineering Corporation",
  "L&M Enterprises",
  "Landmark Engineering",
  "LB Ecological",
  "Left Hand Excavating",
  "Leonard Rice Engineers",
  "Loewen Engineering",
  "Matrix Design Group",
  "Merrick & Company",
  "Muller Engineering Company",
  "Naranjo Civil",
  "Nelson Pipeline",
  "North State Environmental",
  "Olsson Associates",
  "Otak",
  "R2R Engineers",
  "Redline Pipeline",
  "RESPEC",
  "RJH Consultants",
  "S. A. Miro",
  "Stantec Consulting",
  "TerraCare",
  "Territory Unlimited",
  "Tetra Tech",
  "Tezak",
  "TST Inc. of Denver",
  "Valles Construction",
  "Western States",
  "Wilson & Company",
  "Wood",
  "Wright Water Engineers, Inc."
];

export const ROLES = [
  { title: 'MHFD Staff', style: '80px', value: 'staff', options: CITIES },
  { title: 'Consultant / Contractor', style: '115px', value: 'consultant', options: CONSULTANT_CONTRACTOR },
  { title: 'Local Government', style: '117px', value: 'government_staff', options: ORGANIZATION },
  { title: 'Other', style: '80px', value: 'other', options: [] }
]

export const SERVICE_AREA = [
  "None",
  "Boulder Service Area",
  "Cherry Creek Service Area",
  "North Service Area",
  "Northeast Service Area",
  "Sand Creek Service Area",
  "South Platte River Service Area",
  "South Service Area",
  "Southwest Service Area",
  "West Service Area"
];

export const COUNTIES = [
  "None",
  "Adams",
  "Arapahoe",
  "Boulder",
  "Broomfield",
  "Denver",
  "Douglas",
  "Jefferson"
];

export const GOAL = [
  {
    name: "Reduce flood risk to Structures",
    id: "reduceFloodRiskStructures"
  }, {
    name: "Stream bank or bed stabilization",
    id: "streamBankBedStabilization"
  }, {
    name: "Create shared-use paths and recreation",
    id: "createSharedUsePathsRecreation"
  }, {
    name: "Vegetation Enhancements",
    id: "vegetationEnhancements"
  }, {
    name: "Include permanent water quality BMP",
    id: "includePermanentWaterQualityBMP"
  }
];

export const MAINTENANCE_ELIGIBILITY = [
  {
    name: "Capital Project",
    id: "1"
  }, {
    name: "MEP",
    id: "2"
  }, {
    name: "Grandfathered",
    id: "3"
  }, {
    name: "Not Eligible",
    id: "4"
  }, {
    name: "Unknown",
    id: "5"
  }
];

export const PROGRESS_ACQUISITION = [
  {
    name: "Not Initiated",
    id: "1"
  }, {
    name: "Appraisal In Process",
    id: "2"
  }, {
    name: "Appraisal Complete",
    id: "3"
  }, {
    name: "Appraisal accepted by all parties",
    id: "4"
  }, {
    name: "Remaining funding secured",
    id: "5"
  }
];

export const RECURRENCE = [
  {
    name: "One Time",
    id: "oneTime"
  }, {
    name: "Annually",
    id: "annually"
  }, {
    name: "Multiple/yr",
    id: "multiple"
  }
];

export const FRECUENCY = [
  {
    name: "Cycle per year",
    id: "cyclePerYear"
  }
];

export const PROJECT_STUDY_MASTER = {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: '',
  goal: ''
}
export const PROJECT_STUDY_FHAD = {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: ''
}

export const PROJECT_MAINTENANCE_DEBRIS = {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: '',
  tasks: ['']
}

export const PROJECT_MAINTENANCE_VEGETATION = {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: '',
  recurrence: '',
  tasks: ['']
}

export const PROJECT_MAINTENANCE_SEDIMENT = {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  frecuency: '',
  maintenanceEligility: '',
  recurrence: '',
  tasks: ['']
}

export const PROJECT_MAINTENANCE_MINOR_REPAIR = {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  maintenanceEligility: '',
  tasks: ['']
}

export const PROJECT_MAINTENANCE_RESTORATION = {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  maintenanceEligility: '',
  tasks: ['']
}

export const USER = {
  activated: false,
  organization: "",
  firstName: "",
  lastName: "",
  name: "",
  designation: "",
  _id: "",
  email: "",
  city: "",
  county: "",
  serviceArea: "",
  phone: "",
  title: ""
}
export const RADIO_ITEMS = [
  {
    value: 'admin', name: 'MHFD Senior Manager'
  }, {
    value: 'staff', name: 'MHFD Staff'
  }, {
    value: 'government_staff', name: 'Local Government'
  }, {
    value: 'consultant', name: 'Consultant / Contractor'
  }, {
    value: 'other', name: 'Other'
  }
]

export const ROLE = [
  'admin', 'staff', 'government_admin', 'government_staff', 'consultant', 'other'
];
export const ROUTERS_SIDEBAR = [
  '/profile-view', '/map', '/new-project-types', '/work-plan', '/work-request', '/user', '/upload-attachment'
];
export const ROUTERS = {
  PROFILE_VIEW: 'profile-view',
  MAP: 'map',
  NEW_PROJECT_TYPES: 'new-project-types',
  WORK_REQUEST: 'work-request',
  WORK_PLAN: 'work-plan',
  USER: 'user',
  PROJECT_ACQUISITION: 'project-acquisition',
  PROJECT_SPECIAL: 'project-special',
  PROJECT_CAPITAL: 'project-capital',
  PROJECT_MAINTENANCE_DEBRIS: 'debrisManagement',
  PROJECT_MAINTENANCE_VEGETATION: 'vegetationManagement',
  PROJECT_MAINTENANCE_MINOR_REPAIR: 'minorRepairs',
  PROJECT_MAINTENANCE_SEDIMENT: 'sediment',
  PROJECT_MAINTENANCE_RESTORATION: 'restoration',
  PROJECT_STUDY_MASTER: 'masterPlan',
  PROJECT_STUDY_FHAD: 'fhad'
};
export const ROUTER_TITLE = {
  PROFILE_VIEW: 'Confluence   |   User Profile',
  MAP: 'Confluence   |   Map View',
  NEW_PROJECT_TYPES: 'Confluence   |   Create a Project',
  WORK_REQUEST: 'Confluence   |   Work Request',
  WORK_PLAN: 'Confluence   |   Work Plan',
  USER: 'Confluence   |   User Management',
  PROJECT_MAINTENANCE_DEBRIS: 'Confluence   |   Create Project - Maintenance - Debris Management',
  PROJECT_MAINTENANCE_VEGETATION: 'Confluence   |   Create Project - Maintenance - Vegetation Management',
  PROJECT_MAINTENANCE_MINOR_REPAIR: 'Confluence   |   Create Project - Maintenance - Minor Repairs',
  PROJECT_MAINTENANCE_SEDIMENT: 'Confluence   |   Create Project - Maintenance - Sediment',
  PROJECT_MAINTENANCE_RESTORATION: 'Confluence   |   Create Project - Maintenance - Restoration',
  PROJECT_STUDY_FHAD: 'Confluence   |   Create Project Study FHAD',
  PROJECT_STUDY_MASTER: 'Confluence   |   Create Project - Study Master Plan ',
  PROJECT_SPECIAL: 'Confluence   |   Create Project - Special',
  PROJECT_ACQUISITION: 'Confluence   |   Create Project - Acquisition',
  PROJECT_CAPITAL: 'Confluence   |   Create Project - Capital Type'
}
export const TASK = [
  {
    name: "Sediment Removal",
    id: "sedimentRemoval"
  }, {
    name: "Tree Thinning",
    id: "treeThinning"
  }, {
    name: "Bank Stabilization",
    id: "bankStabilization"
  }, {
    name: "Drainage Structure",
    id: "drainageStructure"
  }, {
    name: "Regional Detention",
    id: "regionalDetention"
  }
];
export const PAGE_USER = {
  page: 1,
  limit: 10,
  name: '',
  organization: '',
  serviceArea: '',
  designation: '',
  sort: 'name'
};
export const COLUMNS_UPLOAD= [
  {
    title: "Filename",
    dataIndex: "filename",
    sorter: true,
    className: "user-activity",
    width: "30%"
  },
  {
    title: "Size",
    dataIndex: "size",
    className: "user-text",
    width: "20%"
  },
  {
    title: "Cover",
    dataIndex: "cover",
    width: "20%",
    className: "user-cover",
  },
  {
    title: "Type",
    dataIndex: "type",
    className: "user-type",
    width: "20%"
  },
  {
    title: "",
    dataIndex: "dowload",
    width: "10%"
  },
];
export const COLUMNS_USER_ACTIVITY = [
  {
    title: "Data and Time",
    dataIndex: "registerDate",
    sorter: true,
    className: "user-activity",
    render: (registerDate: string) => moment(new Date('' + registerDate)).format('MM/DD/YYYY hh:mm A'),
    width: "20%"
  },
  {
    title: "User",
    dataIndex: "name",
    className: "user-activity",
    sorter: true,
    width: "25%"
  },
  {
    title: "City",
    dataIndex: "city",
    className: "user-activity",
    sorter: true,
    width: "20%"
  },
  {
    title: "Change",
    dataIndex: "activityType",
    sorter: true,
    width: "20%",
    className: "user-Login",
    render: (activityType: string) => activityType === 'user_login' ? 'User Login' : ''
  },
  {
    title: "",
    dataIndex: "",
    width: "15%"
  },
];

export const LINE = [
  20, 40, 60, 80, 100
]
export const ADMIN = "admin";
export const STAFF = "staff";
export const GOVERNMENT_ADMIN = "government_admin";
export const GOVERNMENT_STAFF = "government_staff";
export const CONSULTANT = "consultant";
export const OTHER = "other";

export const FILTER_PROBLEMS_TRIGGER = 'Problems';
export const FILTER_PROJECTS_TRIGGER = 'Projects';
export const FILTER_COMPONENTS_TRIGGER = 'Components';

export const PROJECT_TYPE = 'projectType';

export const PROBLEM_TYPE = 'problemType';
export const SERVICE_AREA_VALUE = 'serviceArea';
export const JURIDICTION = 'jurisdiction';
export const COUNTY = 'county';
export const LG_MANAGER = 'lgManager';
export const REQUESTED_START_YEAR = 'requestedStartyear';
export const STREAM_NAME = 'streamName';
export const MHFD_DOLLAR_REQUESTED = 'mhfdDollarRequest';
export const CREATOR = 'creator';

export const SORTED_PROBLEMS = [{
  name: 'problemname',
  title: 'Name'
}, {
  name: 'problemtype',
  title: 'Type'
}, {
  name: 'solutioncost',
  title: 'Cost'
}];
export const SORTED_PROJECTS = [{
  name: 'projectname',
  title: 'Name'
}, {
  name: 'projecttype',
  title: 'Type'
}, {
  name: 'estimatedcost',
  title: 'Cost'
}];

export const popUps = {
  floodplains: 'Floodplains are areas that have been identified to be at risk of flooding in the 1% annual chance (or "100-year") storm event according to studies and models approved by CWCB and FEMA. This layer also includes the areas covered by the FEMA NHFL layer.',
  fema_flood_hazard_zones: 'The Federal Emergency Management Agency National Flood Hazard Layer is the official map of federally designated floodplains and floodways. It does not include floodplains desginated only at the state or local level (see Floodplains layer).',
  watershed: 'Watersheds are areas of land that drain to a common stream. This layer shows Major Basins at the District scale (colored fill) and sub-basins when you zoom in (dashed orange lines).',
  service_area: 'Service Areas are the zones that are under the supervision of different Mile High Flood District Watershed Managers.',
  municipalities: 'Jurisdictional boundaries of the municipalities and agencies that partner with MHFD on projects.',
  counties: 'Jurisdictional boundaries of the counties within MHFD.',
  problem: 'Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.',
  component: 'Components are specific elements of a problem (i.e. master planned improvements or stream assessment data points) that are the building blocks require to solve those problems.',
  project: 'Projects are active (i.e. planned and budgeted or funded and underway) and completed efforts to solve an identified Problem or requested by local governments.',
  mep_projects: 'Maintenance Eligibility Program (MEP) Referrals are requests from local governments for MHFD to review, approve, and potentially maintain certain stormwater infrastructure.',
  routine_maintenance: 'Routine Maintenance represents areas where MHFD performs maintenance on a regular schedule, such as trash and debris removal and vegetation maintenance.',
  species: 'These layers show known areas of habitat for federally- and state-protected threatened and endangered species as well as block clearance zones for certain species.',
  research_monitoring: 'Stormwater Quality Research/Monitoring. Research/Monitoring indicates the location of water quality monitoring sites and research projects with MHFD involvement.',
  climb_to_safety: 'This layer shows the location of "Climb to Safety" flood warning signage installations throughout the District.',
  dam_safety: 'This Dam Safety layer was created with data accessed from data.colorado.gov (sourced from DWR) showing the hazard classifications of jurisdictional dams.',
  land_use: `DRCOG´s Regional Land Use Land Cover dataset incorporates 2020 imagery, 2020 planimetric data, and 2020 lidar to create a 3 foot resolution product. The dataset includes 9 classes:  Structures, Impervious surfaces, Water, Grassland/prairie, Shrubland/scrubland, Tree canopy, Irrigated lands/turf, Barren/rock, Cropland.`,
  stream_mang_corridors: 'Stream Management Corridors are estimated zones that should be preserved to reduce the risk of fluvial hazards in addition to traditional mapped floodplains.',
  nrcs_soils: 'This layer displays the USDA Natural Resources Conservation Service (NRCS) Soil Survey within MHFD. Map units delineate the extent of different soils. Data for each map unit contains descriptions of the soil’s components, productivity, unique properties, and suitability interpretations.',
  bcz_prebels_meadow: 'Block Clearance Zone -  Preble’s Meadow Jumping Mouse. These layers show areas that have been block cleared where there is sufficient information to indicate endangered/threatened species are absent from large acreages. In designating a block clearance zone, the requirement that individuals and agencies coordinate with the U.S Fish and Wildlife Service before impacting potential riparian habitats inside the zone is eliminated. ',
  bcz_ute_ladies: 'Block Clearance Zone - Ute Ladies Tresses Orchid. These layers show areas that have been block cleared where there is sufficient information to indicate endangered/threatened species are absent from large acreages. In designating a block clearance zone, the requirement that individuals and agencies coordinate with the U.S Fish and Wildlife Service before impacting potential riparian habitats inside the zone is eliminated. ',
  block_clearence_zones: 'Block Clearance Zone – Preble’s Meadow Jumping Mouse and Ute Ladies Tresses Orchid. Block Clearance Zone - Preble’s Meadow Jumping Mouse. These layers show areas that have been block cleared where there is sufficient information to indicate endangered/threatened species are absent from large acreages. In designating a block clearance zone, the requirement that individuals and agencies coordinate with the U.S Fish and Wildlife Service before impacting potential riparian habitats inside the zone is eliminated. Block Clearance Zone - Ute Ladies Tresses Orchid. These layers show areas that have been block cleared where there is sufficient information to indicate endangered/threatened species are absent from large acreages. In designating a block clearance zone, the requirement that individuals and agencies coordinate with the U.S Fish and Wildlife Service before impacting potential riparian habitats inside the zone is eliminated.',
  semswa_service_area: 'Southeast Metro Stormwater Authority Boundary. SEMSWA covers the entire City of Centennial, the developed areas of unincorporated Arapahoe County, and a small portion of Douglas County. Their boundary is an outgrowth of the partnership (IGA) between the City of Centennial, Arapahoe County, the Arapahoe County Water and Wastewater Authority, East Cherry Creek Valley Water and Sanitation District, and the Inverness Water and Sanitation District.',
  borders: 'A thin border surrounding the selected work request or work plan area.',
  area_based_mask: 'An opacity mask surrounding the selected work request or work plan area.',
  active_lomcs: 'A Letter of Map Change (LOMC) is issued when FEMA is requested to revise its effective flood map to reflect changed flooding conditions. reflects an official change to an effective Flood Insurance Rate Map (FIRM).',
  effective_reaches: 'The Effective Model Reaches catalogue and track the hydraulic model information used to create the effective Flood Insurance Rate Maps (FIRMs) available from the Federal Emergency Management Agency (FEMA).'
}

export const MENU_OPTIONS =
{
  MEP_TEMPORARY_LOCATION: 'MEP Temporary Location',
  MEP_DETENTION_BASIN: 'MEP Detention Basin',
  MEP_CHANNEL: 'MEP Channel',
  MEP_STORM_OUTFALL: 'MEP Storm Outfall',
  PROBLEM_PART: 'Problem Part',
  SERVICE_AREA: 'Service Area',
  CATCHMENTS: 'catchments',
  BASIN: 'basin',
  WATERSHED: 'Watershed',
  VEGETATION_MANAGEMENT_NATURAL_AREA: 'Vegetation Management - Natural Area',
  VEGETATION_MANAGEMENT_WEED_CONTROL: 'Vegetation Management - Weed Control',
  DEBRIS_MANAGEMENT_AREA: 'Debris Management Area',
  ROUTINE_MAINTENANCE: 'ROUTINE MAINTENANCE',
  DEBRIS_MANAGEMENT_LINEAR: 'Debris Management Linear',
  NCRS_SOILS: 'NCRS Soils',
  DWR_DAM_SAFETY: 'DWR Dam Safety',
  STREAM_MANAGEMENT_CORRIDORS: 'Stream Management Corridors',
  BCZ_PREBLES_MEADOW_JUMPING_MOUSE: 'BCZ - Preble’s Meadow Jumping Mouse',
  BLOCK_CLEARANCE_ZONE: 'BLOCK CLEARANCE ZONE',
  BCZ_UTE_LADIES_TRESSES_ORCHID: 'BCZ - Ute Ladies Tresses Orchid',
  RESEARCH_MONITORING: 'Research/Monitoring',
  SEMSWA_SERVICE_AREA: 'SEMSWA Service Area',
  COMPONENTS: 'Components',
  LAND_USE_LAND_COVER: 'Land Use Land Cover',
  CLIMB_TO_SAFETY_SIGNS: 'Climb to Safety Signs',
  CLIMB_TO_SAFETY: 'Climb to Safety',
  PROJECT: 'Project',
  PROJECTS: 'projects',
  PROBLEMS: 'problems',
  PROBLEMS_BOUNDARY: 'problem_boundary',
  MHFD_STREAMS_REACHES: MHFD_STREAMS_FILTERS,
  COUNTIES: 'County',
  MUNICIPALITIES: 'Municipality',
  MEASURES: 'MEASURE',
  FEMA_FLOOD_HAZARD: 'FEMA Flood Hazard',
  FLOODPLAINS_NON_FEMA: 'Floodplains (Non-FEMA)'
}
  ;

export const NEW_PROJECT_TYPES = {
  Capital: "Capital",
  Acquisition: "Acquisition",
  Maintenance: "Maintenance",
  Special: "Special",
  Study: "Study",
  MAINTENANCE_SUBTYPES: {
    Debris_Management: "Routine Trash and Debris",
    Vegetation_Management: "Vegetation Management",
    Sediment_Removal: "Sediment Removal",
    Minor_Repairs: "General Maintenance",
    Restoration: "Maintenance Restoration"
  }
}

export const PROJECT_INFORMATION = {
  COUNTRY_PROJECT: [
    'Aurora County',
    'Arapahoe County',
    'Adams County',
    'Boulder County',
    'Broomfield County',
    'Denver County',
    'Douglas County',
    'Jefferson County'
  ],
  PROGRESS: [
    'Appraisal in process',
    'Appraisal complete',
    'Appraisal accepted by all parties',
    'Remaining funding secured'
  ],
  MAINTENANCE_ELIGIBILITY: [
    'Capital Project',
    'MEP',
    'Grandfathered',
    'Not Eligible',
    'Unknown'
  ]
}

export const STUDY_REASON = [
  'Not Previously Studied',
  'Flood hazard mapping is outdated',
  'Master plan recommendations are outdated',
  'Other'
]
export const STUDY_SUB_REASON = [
  'Changed watershed conditions (land-use, topo, regional, detention, etc.)',
  'Not aligned with current stream management practices',
  'New opportunity available'
]

export const ICON_POPUPS = [
  ['Problem', "/Icons/ic_problems@2x.png"],
  ["Storm Drain", "/Icons/ic_Component_StormDrain@2x.png"],
  ["Special Item Point", "/Icons/ic_Component_SpecialItemPoint@2x.png"],
  ["Special Item Linear", "/Icons/ic_Component_SpecialItemLinear@2x.png"],
  ["Special Item Area", "/Icons/ic_Component_SpecialItemArea@2x.png"],
  ["Removal Line", "/Icons/ic_Component_RemovalLine@2x.png"],
  ["Removal Area", "/Icons/ic_Component_RemovalArea@2x.png"],
  ["Pipe Appurtenances", "/Icons/ic_Component_PipeAppurtenances@2x.png"],
  ["Channel Improvements Linear", "/Icons/ic_Component_ChanneImprovementLinear@2x.png"],
  ["Channel Improvements Area", "/Icons/ic_Component_ChanneImprovementArea@2x.png"],
  ["Maintenance Trails", "/Icons/ic_Component_MaintenanceTrail@2x.png"],
  ["Landscaping Area", "/Icons/ic_Component_LandscapingArea@2x.png"],
  ["Land Acquisition", "/Icons/ic_Component_LandAcquisition@2x.png"],
  ["Grade Control Structure", "/Icons/ic_Component_GradeControlStructure@2x.png"],
  ["Detention Facilities", "/Icons/ic_Component_DetentionFacility@2x.png"],
  ["MEP Project", "/Icons/ic_MEP@2x.png"],
  ["Watershed", "/Icons/ic_watersheds@2x.png"],
  ['Vegetation Management - Natural Area', "/Icons/ic_routine@2x.png"],
  ['Vegetation Management - Weed Control', "/Icons/ic_routine@2x.png"],
  ['Debris Management Area', "/Icons/ic_routine@2x.png"],
  ['ROUTINE MAINTENANCE', "/Icons/ic_routine@2x.png"],
  ['Debris Management Linear', "/Icons/ic_routine@2x.png"],
  ['Floodplains (Non-FEMA)', "/Icons/ic_floodplains@2x.png"],
  ['DWR Dam Safety', "/Icons/ic_DWR@2x.png"],
  ['BCZ - Preble’s Meadow Jumping Mouse', "/Icons/ic_mouse@2x.png"],
  ['BCZ - Ute Ladies Tresses Orchid', "/Icons/ic_BCZ-ute@2x.png"],
  ['Research/Monitoring', "/Icons/ic_research@2x.png"],
  ['Climb to Safety Signs', "/Icons/ic_climb@2x.png"],
  ['Service Area', "/Icons/ic_service@2x.png"],
  ['County', "/Icons/ic_counties@2x.png"],
  ['Municipality', "/Icons/ic_municipalities@2x.png"],
  ['SEMSWA Service Area', "/Icons/ic_SEMSWA@2x.png"],
  ['Stream', "/Icons/Filters/ic_streams.png"],
  ['Stream Management Corridor', "/Icons/ic_SMC_Watershed@2x.png"],
  ['Stream Function Polygon',"/Icons/ic-stream-function-poly.png"],
  ['Flood Hazard Line', '/Icons/ic-flood-hzd-line.png'],
  ['Flood Hazard Point', '/Icons/ic-flood-hzd-point.png'],
  ['Stream Function Point', '/Icons/ic-stream-function-point.png'],
  ['Watershed Change Line', '/Icons/ic-watershed-change-line.png'],
  ['Stream Function Line', '/Icons/ic-stream-function-line.png'],
  ['Flood Hazard Polygon', '/Icons/ic-flood-hzd-poly.png'],
  ['Impervious Surfaces', '/Icons/ic_luluc_impervious_surfaces.png'],
  ['Water', '/Icons/ic_luluc_water.png'],
  ['Tree Canopy', '/Icons/ic_luluc_tree_canopy.png'],
  ['Structures', '/Icons/ic_luluc_structures.png'],
  ['Shrubland/Scrubland', '/Icons/ic_luluc_shrubland.png'],
  ['Irrigated Land/Turf', '/Icons/ic_luluc_irrigated_land.png'],
  ['Grassland', '/Icons/ic_luluc_grasslands.png'],
  ['Cropland', '/Icons/ic_luluc_cropland.png'],
  ['Barren/Rock', '/Icons/ic_luluc_barren_rock.png']
]

export const MAPTYPES = {
  WORKREQUEST: 'WORKREQUEST',
  WORKPLAN: 'WORKPLAN',
  MAINMAP: 'MAINMAP',
  CREATEPROJECTMAP: 'CREATEPROJECTMAP'
} 

export const initFilterProblems = {
  problemname: '',
  solutioncost: [],
  problempriority: '',
  solutionstatus: [],
  county: '',
  jurisdiction: '',
  mhfdmanager: '',
  problemtype: '',
  source: '',
  components: '',
  servicearea: '',
  keyword: {}
}

export const list = [
  {
      "aoi": "Mile High Flood District",
      "filter": null
  },
  {
      "aoi": "Adams",
      "filter": "County"
  },
  {
      "aoi": "Arapahoe County",
      "filter": "County"
  },
  {
      "aoi": "Arvada",
      "filter": ""
  },
  {
      "aoi": "Aurora",
      "filter": ""
  },
  {
      "aoi": "Boulder",
      "filter": ""
  },
  {
      "aoi": "Boulder County",
      "filter": "County"
  },
  {
      "aoi": "Boulder Creek Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Bow Mar",
      "filter": ""
  },
  {
      "aoi": "Brighton",
      "filter": ""
  },
  {
      "aoi": "Broomfield County",
      "filter": "County"
  },
  {
      "aoi": "Castle Pines",
      "filter": ""
  },
  {
      "aoi": "Castle Rock",
      "filter": ""
  },
  {
      "aoi": "Centennial",
      "filter": ""
  },
  {
      "aoi": "Cherry Creek Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Cherry Hills Village",
      "filter": ""
  },
  {
      "aoi": "Columbine Valley",
      "filter": ""
  },
  {
      "aoi": "Commerce City",
      "filter": ""
  },
  {
      "aoi": "Denver",
      "filter": ""
  },
  {
      "aoi": "Denver County",
      "filter": "County"
  },
  {
      "aoi": "Douglas County",
      "filter": "County"
  },
  {
      "aoi": "Edgewater",
      "filter": ""
  },
  {
      "aoi": "Englewood",
      "filter": ""
  },
  {
      "aoi": "Erie",
      "filter": ""
  },
  {
      "aoi": "Federal Heights",
      "filter": ""
  },
  {
      "aoi": "Foxfield",
      "filter": ""
  },
  {
      "aoi": "Glendale",
      "filter": ""
  },
  {
      "aoi": "Golden",
      "filter": ""
  },
  {
      "aoi": "Greenwood Village",
      "filter": ""
  },
  {
      "aoi": "Jefferson County",
      "filter": "County"
  },
  {
      "aoi": "Lafayette",
      "filter": ""
  },
  {
      "aoi": "Lakeside",
      "filter": ""
  },
  {
      "aoi": "Lakewood",
      "filter": ""
  },
  {
      "aoi": "Littleton",
      "filter": ""
  },
  {
      "aoi": "Lochbuie",
      "filter": ""
  },
  {
      "aoi": "Lone Tree",
      "filter": ""
  },
  {
      "aoi": "Lousiville",
      "filter": ""
  },
  {
      "aoi": "Morrison",
      "filter": ""
  },
  {
      "aoi": "Mountain View",
      "filter": ""
  },
  {
      "aoi": "Northeast Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Northglenn",
      "filter": ""
  },
  {
      "aoi": "North Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Parker",
      "filter": ""
  },
  {
      "aoi": "Sand Creek Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "SEMSWA",
      "filter": ""
  },
  {
      "aoi": "Sheridan",
      "filter": ""
  },
  {
      "aoi": "South Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Southwest Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Superior",
      "filter": ""
  },
  {
      "aoi": "Thornton",
      "filter": ""
  },
  {
      "aoi": "Westminster",
      "filter": ""
  },
  {
      "aoi": "West Service Area",
      "filter": "Service Area"
  },
  {
      "aoi": "Wheat Ridge",
      "filter": ""
  }
];

export const templateGeomRandom = [{"geometry":{"paths":[
  [
    [
      -105.01494996072074,
      39.77312083233659
    ],
    [
      -104.95217252678378,
      39.76875639819286
    ],
    [
      -104.9300900123337,
      39.73916794052451
    ],
    [
      -105.01179531579953,
      39.75517638914542
    ],
    [
      -105.02031285708722,
      39.7733632927868
    ]
  ]
],"spatialReference" : {"wkid" : 4326}},"attributes":{"Date":null,"Name":"RANDOM NAME TEST"}}];