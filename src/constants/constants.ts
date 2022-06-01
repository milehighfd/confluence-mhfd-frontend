import moment from "moment";

export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 15;
export const EMPTY_SCREEN = 0;

export const MEDIUM_SCREEN_LEFT = 15;
export const MEDIUM_SCREEN_RIGHT = 9;

export const MAP_RESIZABLE_TRANSITION = 0.7;

export const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlsZWhpZ2hmZCIsImEiOiJjazRqZjg1YWQwZTN2M2RudmhuNXZtdWFyIn0.oU_jVFAr808WPbcVOFnzbg';
export const HERE_TOKEN = 'aRgPPlNDstxfi9lnBVXAkAN5fUu5jC1D3fuZoDeyUFw';
export const NEARMAP_TOKEN = 'NzA3ZjlkODYtMTNiMC00Y2E3LWE1MzAtYzU3NWUzMmJjMGUw';
export const MAP_DROPDOWN_ITEMS = [
  {
    type: 'Light Road',
    style: 'mapbox://styles/milehighfd/ck4k0tjln58h41cl4ixb8jsez'
  }, {
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

export const DENVER_LOCATION = {
  center: [-104.9063129121965, 39.768682416183],
  zoom: 10.8
};

export const PROBLEMS_TRIGGER = 'problems';
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
export const PROJECTS_LINE = 'mhfd_projects';
export const PROJECTS_DRAFT = 'mhfd_projects_created';
export const STUDIES = 'studies';

export const PROJECTS_MAP_STYLES = {
  name: 'projects',
  tiles: [
    PROJECTS_LINE
  ]
}
export const STREAMS_POINT_FILTER = {
  name: 'streams',
  tiles: [
    STREAMS_POINT
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
  BCZ_UTE_LADIES_TRESSES_ORCHID,
  BCZ_PREBLE_MEADOW_JUMPING,
  DWR_DAM_SAFETY,
  CLIMB_TO_SAFETY,
  RESEARCH_MONITORING,
  ROUTINE_MAINTENANCE,
  MEP_PROJECTS,
  STUDIES,
  PROJECTS_MAP_STYLES,
  COMPONENT_LAYERS,
  PROBLEMS_TRIGGER,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  MHFD_STREAMS_FILTERS,
  STREAMS_POINT
];

export const PROJECT_TYPES = ['capital', 'study', 'maintenance', 'propertyAcquisition', 'special'];

export const PROJECT_TYPES_AND_NAME = [
  {
    name: 'Capital', id: 'Capital'
  },
  {
    name: 'Maintenance', id: 'Maintenance'
  },
  {
    name: 'Study', id: 'Study'
  }
]

export const NEW_PROJECT_FORM_COST = {
  subtotal: 0,
  additional: {
    additionalCost: 0,
    additionalCostDescription: ''
  },
  overhead: {
    per: 0.2,
    overheadCost: 0,
    overheadCostDescription: ''
  },
  total: 0
}

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

export const ORGANIZATION_COORDINATES = {
  REGIONAL_AGENCY: [{
    name: 'SEMSWA Stormwater Service Area Boundary',
    coordinates: [[-105.054049968814, 39.5582472197231],
    [-105.054049968814, 39.7401201143579],
    [-104.564128221515, 39.7401201143579],
    [-104.564128221515, 39.5582472197231],
    [-105.054049968814, 39.5582472197231]]
  }, {
    name: 'Mile High Flood Control District Boundary',
    coordinates: [[-105.323668314928, 39.4057878658578],
    [-105.323668314928, 40.1315769665082],
    [-104.488957509465, 40.1315769665082],
    [-104.488957509465, 39.4057878658578],
    [-105.323668314928, 39.4057878658578]]
  }],
  CITY: [
    {
      name: 'Arvada',
      coordinates: [[-105.276110857001, 39.78412918974],
      [-105.276110857001, 39.890817870176],
      [-105.040571470056, 39.890817870176],
      [-105.040571470056, 39.78412918974],
      [-105.276110857001, 39.78412918974]]
    }, {
      name: 'Aurora',
      coordinates: [[-104.886488846982, 39.5509217911521],
      [-104.886488846982, 39.8268662875965],
      [-104.489182795277, 39.8268662875965],
      [-104.489182795277, 39.5509217911521],
      [-104.886488846982, 39.5509217911521]]
    }, {
      name: 'Boulder',
      coordinates: [[-105.301461118472, 39.9569231136854],
      [-105.301461118472, 40.0944096535499],
      [-105.178109005283, 40.0944096535499],
      [-105.178109005283, 39.9569231136854],
      [-105.301461118472, 39.9569231136854]]
    }, {
      name: 'Bow Mar',
      coordinates: [[-105.059694934036, 39.613949083876],
      [-105.059694934036, 39.6387778095266],
      [-105.0441405703, 39.6387778095266],
      [-105.0441405703, 39.613949083876],
      [-105.059694934036, 39.613949083876]]
    }, {
      name: 'Brighton',
      coordinates: [[-104.865256007921, 39.8996380763332],
      [-104.865256007921, 40.0005467727396],
      [-104.716630749622, 40.0005467727396],
      [-104.716630749622, 39.8996380763332],
      [-104.865256007921, 39.8996380763332]]
    }, {
      name: 'Castle Pines',
      coordinates: [[-104.92364458764, 39.4348394212746],
      [-104.92364458764, 39.4927571124134],
      [-104.830211143711, 39.4927571124134],
      [-104.830211143711, 39.4348394212746],
      [-104.92364458764, 39.4348394212746]]
    }, {
      name: 'Centennial',
      coordinates: [[-104.988412492661, 39.565954873001],
      [-104.988412492661, 39.6384321826415],
      [-104.726195318378, 39.6384321826415],
      [-104.726195318378, 39.565954873001],
      [-104.988412492661, 39.565954873001]]
    }, {
      name: 'Cherry Hills Village',
      coordinates: [[-104.978587238829, 39.6240620042323],
      [-104.978587238829, 39.6531285845754],
      [-104.913237442832, 39.6531285845754],
      [-104.913237442832, 39.6240620042323],
      [-104.978587238829, 39.6240620042323]]
    }, {
      name: 'Columbine Valley',
      coordinates: [[-105.047281168869, 39.5879064663976],
      [-105.047281168869, 39.6111992050042],
      [-105.024537716092, 39.6111992050042],
      [-105.024537716092, 39.5879064663976],
      [-105.047281168869, 39.5879064663976]]
    }, {
      name: 'Commerce City',
      coordinates: [[-104.968782885965, 39.7837822646136],
      [-104.968782885965, 39.9288433692551],
      [-104.659208473827, 39.9288433692551],
      [-104.659208473827, 39.7837822646136],
      [-104.968782885965, 39.7837822646136]]
    }, {
      name: 'Edgewater',
      coordinates: [[-105.07439381016, 39.7432863242064],
      [-105.07439381016, 39.7584859638459],
      [-105.053220919965, 39.7584859638459],
      [-105.053220919965, 39.7432863242064],
      [-105.07439381016, 39.7432863242064]]
    }, {
      name: 'Englewood',
      coordinates: [[-105.034950840989, 39.6168354218458],
      [-105.034950840989, 39.6786896956911],
      [-104.959449407346, 39.6786896956911],
      [-104.959449407346, 39.6168354218458],
      [-105.034950840989, 39.6168354218458]]
    }, {
      name: 'Erie',
      coordinates: [[-105.104746172491, 40.0002623487425],
      [-105.104746172491, 40.0878402979372],
      [-105.046253305953, 40.0878402979372],
      [-105.046253305953, 40.0002623487425],
      [-105.104746172491, 40.0002623487425]]
    }, {
      name: 'Federal Heights',
      coordinates: [[-105.02522236781, 39.8490126965949],
      [-105.02522236781, 39.8851356880138],
      [-104.996618911359, 39.8851356880138],
      [-104.996618911359, 39.8490126965949],
      [-105.02522236781, 39.8490126965949]]
    }, {
      name: 'Foxfield',
      coordinates: [[-104.801956301723, 39.5804292172628],
      [-104.801956301723, 39.5950956130278],
      [-104.77317531446, 39.5950956130278],
      [-104.77317531446, 39.5804292172628],
      [-104.801956301723, 39.5804292172628]]
    }, {
      name: 'Glendale',
      coordinates: [[-104.940707916489, 39.6947663027973],
      [-104.940707916489, 39.7111013362915],
      [-104.926992355885, 39.7111013362915],
      [-104.926992355885, 39.6947663027973],
      [-104.940707916489, 39.6947663027973]]
    }, {
      name: 'Golden',
      coordinates: [[-105.240536308956, 39.6993325456654],
      [-105.240536308956, 39.7871768628526],
      [-105.161985691711, 39.7871768628526],
      [-105.161985691711, 39.6993325456654],
      [-105.240536308956, 39.6993325456654]]
    }, {
      name: 'Greenwood Village',
      coordinates: [[-104.980678685106, 39.5877680026219],
      [-104.980678685106, 39.645903926112],
      [-104.847685339501, 39.645903926112],
      [-104.847685339501, 39.5877680026219],
      [-104.980678685106, 39.5877680026219]]
    }, {
      name: 'Lafayette',
      coordinates: [[-105.157252292266, 39.9577260727672],
      [-105.157252292266, 40.0483054676251],
      [-105.052824868102, 40.0483054676251],
      [-105.052824868102, 39.9577260727672],
      [-105.157252292266, 39.9577260727672]]
    }, {
      name: 'Lakeside',
      coordinates: [[-105.062680686205, 39.7765808127865],
      [-105.062680686205, 39.7838621668228],
      [-105.053252619496, 39.7838621668228],
      [-105.053252619496, 39.7765808127865],
      [-105.062680686205, 39.7765808127865]]
    }, {
      name: 'Lakewood',
      coordinates: [[-105.199852953331, 39.618447797343],
      [-105.199852953331, 39.7620019220305],
      [-105.053214571986, 39.7620019220305],
      [-105.053214571986, 39.618447797343],
      [-105.199852953331, 39.618447797343]]
    }, {
      name: 'Littleton',
      coordinates: [[-105.11101815177, 39.5361793491896],
      [-105.11101815177, 39.6294107247063],
      [-104.973245126373, 39.6294107247063],
      [-104.973245126373, 39.5361793491896],
      [-105.11101815177, 39.5361793491896]]
    }, {
      name: 'Lochbuie',
      coordinates: [[-104.753741964527, 39.9959159768774],
      [-104.753741964527, 40.00059337504],
      [-104.706548866349, 40.00059337504],
      [-104.706548866349, 39.9959159768774],
      [-104.753741964527, 39.9959159768774]]
    }, {
      name: 'Lone Tree',
      coordinates: [[-104.90917806003, 39.506845812359],
      [-104.90917806003, 39.5661058998429],
      [-104.829927601279, 39.5661058998429],
      [-104.829927601279, 39.506845812359],
      [-104.90917806003, 39.506845812359]]
    }, {
      name: 'Lousiville',
      coordinates: [[-105.18927136441, 39.9396245998053],
      [-105.18927136441, 39.9982178943887],
      [-105.10735075226, 39.9982178943887],
      [-105.10735075226, 39.9396245998053],
      [-105.18927136441, 39.9396245998053]]
    }, {
      name: 'Morrison',
      coordinates: [[-105.222340680457, 39.6174082517306],
      [-105.222340680457, 39.6603271563178],
      [-105.162393274622, 39.6603271563178],
      [-105.162393274622, 39.6174082517306],
      [-105.222340680457, 39.6174082517306]]
    }, {
      name: 'Mountain View',
      coordinates: [[-105.060338568957, 39.7729504370876],
      [-105.060338568957, 39.7766039228686],
      [-105.053251967852, 39.7766039228686],
      [-105.053251967852, 39.7729504370876],
      [-105.060338568957, 39.7729504370876]]
    }, {
      name: 'Northglenn',
      coordinates: [[-105.015527929424, 39.86810648522],
      [-105.015527929424, 40.0005112579187],
      [-104.942654207074, 40.0005112579187],
      [-104.942654207074, 39.86810648522],
      [-105.015527929424, 39.86810648522]]
    }, {
      name: 'Parker',
      coordinates: [[-104.830125981532, 39.4530848094876],
      [-104.830125981532, 39.5659311134897],
      [-104.70849052181, 39.5659311134897],
      [-104.70849052181, 39.4530848094876],
      [-104.830125981532, 39.4530848094876]]
    }, {
      name: 'Sheridan',
      coordinates: [[-105.034742453218, 39.6313773328853],
      [-105.034742453218, 39.6605124349886],
      [-105.000242536569, 39.6605124349886],
      [-105.000242536569, 39.6313773328853],
      [-105.034742453218, 39.6313773328853]]
    }, {
      name: 'Superior',
      coordinates: [[-105.212935362517, 39.9084680150706],
      [-105.212935362517, 39.9623543211878],
      [-105.137572118452, 39.9623543211878],
      [-105.137572118452, 39.9084680150706],
      [-105.212935362517, 39.9084680150706]]
    }, {
      name: 'Thornton',
      coordinates: [[-105.015541107083, 39.8313721315443],
      [-105.015541107083, 40.0004378244007],
      [-104.878042773999, 40.0004378244007],
      [-104.878042773999, 39.8313721315443],
      [-105.015541107083, 39.8313721315443]]
    }, {
      name: 'Westminster',
      coordinates: [[-105.165398564064, 39.8181119988509],
      [-105.165398564064, 39.9685368331313],
      [-104.987696346752, 39.9685368331313],
      [-104.987696346752, 39.8181119988509],
      [-105.165398564064, 39.8181119988509]]
    }, {
      name: 'Wheat Ridge',
      coordinates: [[-105.165406344304, 39.7546858319589],
      [-105.165406344304, 39.7946474814828],
      [-105.053246979305, 39.7946474814828],
      [-105.053246979305, 39.7546858319589],
      [-105.165406344304, 39.7546858319589]]
    }
  ],
  CITY_AND_COUNTY: [
    {
      name: 'Broomfield',
      coordinates: [[-105.165819912325, 39.8892047941869],
      [-105.165819912325, 40.0005075355098],
      [-104.961441063462, 40.0005075355098],
      [-104.961441063462, 39.8892047941869],
      [-105.165819912325, 39.8892047941869]]
    }, {
      name: 'Denver',
      coordinates: [[-105.109977202007, 39.6143178019733],
      [-105.109977202007, 39.9141849356952],
      [-104.599591039391, 39.9141849356952],
      [-104.599591039391, 39.6143178019733],
      [-105.109977202007, 39.6143178019733]]
    }
  ],
  UNINCORPORATED_COUNTY: [
    {
      name: 'Adams County',
      coordinates: [[-105.053291734726, 39.7383653729174],
      [-105.053291734726, 40.0006328754999],
      [-104.488957509465, 40.0006328754999],
      [-104.488957509465, 39.7383653729174],
      [-105.053291734726, 39.7383653729174]]
    }, {
      name: 'Arapahoe County',
      coordinates: [[-105.054125150206, 39.5641128054573],
      [-105.054125150206, 39.7402153518857],
      [-104.48954653954, 39.7402153518857],
      [-104.48954653954, 39.5641128054573],
      [-105.054125150206, 39.5641128054573]]
    }, {
      name: 'Boulder County',
      coordinates: [[-105.323668314928, 39.9137161003913],
      [-105.323668314928, 40.1315769665082],
      [-105.052824885246, 40.1315769665082],
      [-105.052824885246, 39.9137161003913],
      [-105.323668314928, 39.9137161003913]]
    }, {
      name: 'Douglas County',
      coordinates: [[-105.126231048003, 39.4057878658578],
      [-105.126231048003, 39.5661908007473],
      [-104.660962449493, 39.5661908007473],
      [-104.660962449493, 39.4057878658578],
      [-105.126231048003, 39.4057878658578]]
    }, {
      name: 'Jefferson County',
      coordinates: [[-105.278196561208, 39.4781579711811],
      [-105.278196561208, 39.9141859345858],
      [-105.048276916391, 39.9141859345858],
      [-105.048276916391, 39.4781579711811],
      [-105.278196561208, 39.4781579711811]]
    }
  ]
}

export const buttonsNewProject = [
  {
    disabled: false,
    title: 'capital',
    route: 'new-project-form',
    icon1: '/Icons/icon-37.svg',
    icon2: '/Icons/icon-38.svg',
    redirectRoute: '/project-capital'
  }, {
    disabled: false,
    title: 'maintenance',
    route: 'new-project-form',
    icon1: '/Icons/icon-39.svg',
    icon2: '/Icons/icon-40.svg',
    buttonExtra: [
      {
        disabled: false,
        title: 'debris management',
        route: 'new-project-form',
        icon1: '/Icons/icon-47.svg',
        icon2: '/Icons/icon-48.svg',
        redirectRoute: '/project-maintenance/debrisManagement'
      }, {
        disabled: true,
        title: 'vegetation management',
        route: 'new-project-form',
        icon1: '/Icons/icon-49.svg',
        icon2: '/Icons/icon-50.svg',
        redirectRoute: '/project-maintenance/vegetationManagement'
      }, {
        disabled: true,
        title: 'sediment removal',
        route: 'new-project-form',
        icon1: '/Icons/icon-51.svg',
        icon2: '/Icons/icon-52.svg',
        redirectRoute: '/project-maintenance/sedimentRemoval'
      }, {
        disabled: true,
        title: 'minor repairs',
        route: 'new-project-form',
        icon1: '/Icons/icon-53.svg',
        icon2: '/Icons/icon-54.svg',
        redirectRoute: '/project-maintenance/minorRepairs'
      }, {
        disabled: true,
        title: 'restoration',
        route: 'new-project-form',
        icon1: '/Icons/icon-55.svg',
        icon2: '/Icons/icon-56.svg',
        redirectRoute: '/project-maintenance/restoration'
      }
    ]
  }, {
    disabled: false,
    title: 'study',
    route: 'new-project-form',
    icon1: '/Icons/icon-41.svg',
    icon2: '/Icons/icon-42.svg',
    buttonExtra: [
      {
        disabled: false,
        title: 'master plan only',
        route: 'new-project-form',
        icon1: '/Icons/icon-57.svg',
        icon2: '/Icons/icon-68.svg',
        redirectRoute: '/project-study/masterPlan'
      }, {
        disabled: true,
        title: 'fhad only',
        route: 'new-project-form',
        icon1: '/Icons/icon-58.svg',
        icon2: '/Icons/icon-59.svg',
        redirectRoute: '/project-study/fhad'
      }
    ]
  }, {
    disabled: true,
    title: 'acquisition',
    route: 'new-project-form',
    icon1: '/Icons/icon-43.svg',
    icon2: '/Icons/icon-44.svg',
    redirectRoute: '/project-acquisition'
  }, {
    disabled: true,
    title: 'special',
    route: 'new-project-form',
    icon1: '/Icons/icon-45.svg',
    icon2: '/Icons/icon-46.svg',
    redirectRoute: '/project-special'
  }
];

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

export const FOOTER_PROJECT_CAPITAL = [
  {
    dataIndex: 'Component',
    key: 'Component',
    ellipsis: true,
  },
  {
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    ellipsis: true,
  },
  {
    dataIndex: 'Cost',
    key: 'Cost',
    ellipsis: true,
  },

  {
    dataIndex: 'StudyName',
    key: 'StudyName',
    ellipsis: true,
  },
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

export const GOAL_STUDY = [
  {
    name: "Reduce flood risk to Structures",
    id: "reduceFloodRiskStructures"
  }, {
    name: "Stabilization",
    id: "stabilization"
  }, {
    name: "Elminate roadway overtopping",
    id: "eliminateRoadwayOvertopping"
  }, {
    name: "Increased Conveyance",
    id: "increasedConveyance"
  }, {
    name: "Peak flow reduction",
    id: "peakFlowReduction"
  }, {
    name: "Water Quality",
    id: "waterQuality"
  }, {
    name: "Guide Development",
    id: "guideDevelopment"
  }
];

export const REQUEST_FUNDING_YEAR = [
  {
    name: (new Date()).getFullYear(),
    id: (new Date()).getFullYear()
  }, {
    name: (new Date()).getFullYear() + 1,
    id: (new Date()).getFullYear() + 1
  }, {
    name: (new Date()).getFullYear() + 2,
    id: (new Date()).getFullYear() + 2
  }, {
    name: (new Date()).getFullYear() + 3,
    id: (new Date()).getFullYear() + 3
  }
]
export const REQUEST_START_YEAR = [
  {
    name: (new Date()).getFullYear(),
    id: (new Date()).getFullYear()
  }, {
    name: (new Date()).getFullYear() + 1,
    id: (new Date()).getFullYear() + 1
  }, {
    name: (new Date()).getFullYear() + 2,
    id: (new Date()).getFullYear() + 2
  }, {
    name: (new Date()).getFullYear() + 3,
    id: (new Date()).getFullYear() + 3
  }
];
export const MAINTENANCE_ELIGIBILITY = [
  {
    name: "Capital Project",
    id: "capitalProject"
  }, {
    name: "MEP",
    id: "MEP"
  }, {
    name: "Grandfathered",
    id: "grandfathered"
  }, {
    name: "Not Eligible",
    id: "notEligible"
  }, {
    name: "I don't know",
    id: "iDontKnow"
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
}
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

export const STATUS_PROJECT = [
  {
    name: "All",
    id: ""
  },
  {
    name: "Approved",
    id: "approved"
  },
  {
    name: "Construction",
    id: "construction"
  },
  {
    name: "Draft",
    id: "draft"
  },
  {
    name: "Final Design",
    id: "finalDesign"
  },
  {
    name: "Idle",
    id: "idle"
  },
  {
    name: "Initiated",
    id: "initiated"
  },
  {
    name: "Prelim Design",
    id: "prelimDesign"
  },
  {
    name: "Requested",
    id: "requested"
  },
]
export const VALUE_MITIGATION_TYPES_COL_1 = [
  {
    name: "Increased Conveyance - Crossing",
    value: 50
  },
  {
    name: "Increased Conveyance - Stream",
    value: 15
  },
  {
    name: "Increased Conveyance - Pipe",
    value: 35
  },
  {
    name: "Flow Reduction",
    value: 50
  },
  {
    name: "Stabilization - Vertical",
    value: 15
  }
]

export const VALUE_MITIGATION_TYPES_COL_2 = [
  {
    name: "",
    value: 0
  },
  {
    name: "Stabilization - Lateral",
    value: 35
  },
  {
    name: "Acquisition",
    value: 50
  },
  {
    name: "Stream Restoration",
    value: 15
  },
  {
    name: "Stream Management Corridor",
    value: 35
  }
]
export const VALUE_GRAPH = [
  {
    name: "Unincorporated Adams County",
    value: 10
  },
  {
    name: "Unincorporated Arapahoe County",
    value: 50
  },
  {
    name: "Unincorporated Boulder County",
    value: 80
  },
  {
    name: "Unincorporated Douglas County",
    value: 90
  },
  {
    name: "Unincorporated Jefferson County",
    value: 45
  },
  {
    name: "Arvada",
    value: 55
  },
  {
    name: "Aurora",
    value: 58
  },
  {
    name: "Boulder, City",
    value: 51
  },
  {
    name: "Bow Mar",
    value: 52
  },
  {
    name: "Brighton",
    value: 53
  },
  {
    name: "Broomfield, City and County",
    value: 50
  },
  {
    name: "Castle Pines",
    value: 87
  },
  {
    name: "Centennial",
    value: 8
  },
  {
    name: "Cherry Hills Village",
    value: 1
  },
  {
    name: "Columbine Valley",
    value: 44
  },
  {
    name: "Commerce City",
    value: 32
  },
  {
    name: "Denver, City and County",
    value: 100
  },
  {
    name: "Edgewater",
    value: 100
  },
  {
    name: "Englewood",
    value: 100
  },
  {
    name: "Erie",
    value: 100
  },
  {
    name: "Federal Heights",
    value: 50
  },
  {
    name: "Foxfield",
    value: 50
  },
  {
    name: "Glendale",
    value: 50
  },
  {
    name: "Golden",
    value: 50
  },
  {
    name: "Greenwood Village",
    value: 50
  },
  {
    name: "Lafayette",
    value: 50
  },
  {
    name: "Lakeside",
    value: 50
  },
  {
    name: "Lakewood",
    value: 50
  },
  {
    name: "Littleton",
    value: 50
  },
  {
    name: "Lochbuie",
    value: 50
  },
  {
    name: "Lone Tree",
    value: 50
  },
  {
    name: "Louisville",
    value: 50
  },
  {
    name: "Morrison",
    value: 50
  },
  {
    name: "Mountain View",
    value: 50
  },
  {
    name: "Northglenn",
    value: 50
  },
  {
    name: "Parker",
    value: 50
  },
  {
    name: "Sheridan",
    value: 50
  },
  {
    name: "Superior",
    value: 50
  },
  {
    name: "Thornton",
    value: 50
  },
  {
    name: "Westminster",
    value: 50
  },
  {
    name: "Wheat Ridge",
    value: 50
  },
  {
    name: "SEMSWA",
    value: 50
  }
]
export const LINE = [
  20, 40, 60, 80, 100
]
export const ADMIN = "admin";
export const STAFF = "staff";
export const GOVERNMENT_ADMIN = "government_admin";
export const GOVERNMENT_STAFF = "government_staff";
export const CONSULTANT = "consultant";
export const OTHER = "other";

export const NO_COMPONENTS_ERROR = 'Must select at least one map component.';
export const NO_POLYGON_ERROR = 'Must draw a polygon on the map to continue.';
export const NO_MARKER_ERROR = 'Must put the marker on the map to continue.';

export const FILTER_PROBLEMS_TRIGGER = 'Problems';
export const FILTER_PROJECTS_TRIGGER = 'Projects';
export const FILTER_COMPONENTS_TRIGGER = 'Components';

export const PROJECT_TYPE = 'projectType';
export const ESTIMATED_COST = 'estimatedCost';
export const CAPITAL_STATUS = 'capitalStatus';
export const STUDY_STATUS = 'studyStatus';
export const START_YEAR = 'startYear';
export const COMPLETED_YEAR = 'completedYear';
export const CAPITAL_GOAL = 'goal';
export const STUDY_GOAL = 'goal';
export const MHFD_DOLLARS_ALLOCATED = 'mhfdDollarsAllocated';
export const WORK_PLAN_YEAR = 'workPlanYear';

export const PROBLEM_TYPE = 'problemType';
export const SERVICE_AREA_VALUE = 'serviceArea';
export const JURIDICTION = 'jurisdiction';
export const COUNTY = 'county';
export const LG_MANAGER = 'lgManager';
export const REQUESTED_START_YEAR = 'requestedStartyear';
export const STREAM_NAME = 'streamName';
export const MHFD_DOLLAR_REQUESTED = 'mhfdDollarRequest';
export const CREATOR = 'creator';

export const FILTER_TYPES = {
  capital: 'Capital',
  maintenance: 'Maintenance',
  study: 'Study',
  propertyAcquisition: 'Property Acquisition',
  special: 'Special',
  '[20000000,25000000]': '20M-25M',
  '[15000000,20000000]': '15M-20M',
  '[10000000,15000000]': '10M-15M',
  '[5000000,10000000]': '5M-10M',
  '[0,5000000]': '0-5M',
  approved: 'Approved',
  idle: 'Idle',
  initiated: 'Initiated',
  preliminaryDesign: 'Preliminary Design',
  finalDesign: 'Final Design',
  construction: 'Construction',
  monitoring: 'Monitoring',
  hydrology: 'Hydrology',
  floodplain: 'Floodplain',
  alternatives: 'Alternatives',
  conceptual: 'Conceptual',
  '2015': 2015,
  '2016': 2016,
  '2017': 2017,
  '2018': 2018,
  '2019': 2019,
  '2020': 2020,
  '2021': 2021,
  '2022': 2022,
  '2023': 2023,
  '2024': 2024,
  '2025': 2025,
  reduceFloodRiskStructures: 'Reduce Flood Risk to Structures',
  createSharedUsePathsRecreation: 'Shared-Use Paths and Recreation',
  includePermanentWaterQualityBMP: 'Include Permanent Water Quality BMP',
  streamBankBedStabilization: 'Stream Bank or Bed Stabilization',
  vegetationEnhancements: 'Vegetation Enhancements',
  stabilization: 'Stabilization',
  eliminateRoadwayOvertopping: 'Eliminate Roadway Overstopping',
  increasedConveyance: 'Increased Conveyance',
  peakFlowReduction: 'Peak Flow Reduction',
  waterQuality: 'Water Quality',
  guideDevelopment: 'Guide Development',
};

export const DROPDOWN_PROJECT_FILTERS = [
  PROBLEM_TYPE, SERVICE_AREA_VALUE, JURIDICTION, COUNTY, LG_MANAGER,
  REQUESTED_START_YEAR, STREAM_NAME, MHFD_DOLLAR_REQUESTED
];

export const SORTED_LIST = ['dateCreated', 'requestName', 'projectType', 'estimatedCost'];

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

const actualYear = new Date().getFullYear();
const todaysYear = '' + actualYear;
const nextYear = '' + (actualYear + 1);
const twoYears = '' + (actualYear + 2);
const threeYears = '' + (actualYear + 3);
const fourYears = '' + (actualYear + 4);

export const PROJECT_TABS = [
  {
    name: 'Capital',
    drafts: ['workspace', todaysYear, nextYear, twoYears, threeYears, fourYears],
  },
  {
    name: 'Study',
    drafts: ['workspace', todaysYear, nextYear, twoYears, threeYears, fourYears],
  },
  {
    name: 'Maintenance',
    drafts: ['workspace', 'debrisManagement', 'vegetationManagement', 'sediment', 'minorRepairs', 'restoration']
  }
];

export const MAINTENANCE_BODY = {
  workspace: [],
  debrisManagement: [],
  vegetationManagement: [],
  sediment: [],
  minorRepairs: [],
  restoration: []
}

export const DEFAULT_BODY = {
  workspace: [],
  [todaysYear]: [],
  [nextYear]: [],
  [twoYears]: [],
  [threeYears]: [],
  [fourYears]: []
}

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
  CLIMB_TO_SAFETY_SIGNS: 'Climb to Safety Signs',
  CLIMB_TO_SAFETY: 'Climb to Safety',
  PROJECT: 'Project',
  PROJECTS: 'projects',
  PROBLEMS: 'problems',
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
    Debris_Management: "Debris Management",
    Vegetation_Management: "Vegetation Management",
    Sediment_Removal: "Sediment Removal",
    Minor_Repairs: "Minor Repairs",
    Restoration: "Restoration"
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
  'Not previously studied',
  'Flood hazard mapping is outdated',
  'Master plan recommendations are outdated',
  'Other'
]
export const STUDY_SUB_REASON = [
  'Changed watershed conditions (land-use, topo, regional detention, etc.)',
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
]
