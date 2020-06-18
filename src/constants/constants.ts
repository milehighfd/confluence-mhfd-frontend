import moment from "moment";

export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 12;
export const EMPTY_SCREEN = 0;

export const MAP_RESIZABLE_TRANSITION = 0.7;

/* Map Constants */

export const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlsZWhpZ2hmZCIsImEiOiJjazRqZjg1YWQwZTN2M2RudmhuNXZtdWFyIn0.oU_jVFAr808WPbcVOFnzbg';
export const HERE_TOKEN = 'aRgPPlNDstxfi9lnBVXAkAN5fUu5jC1D3fuZoDeyUFw';

export const MAP_DROPDOWN_ITEMS = [
    {
        type: 'Light Road',
        style: 'mapbox://styles/milehighfd/ck4k0tjln58h41cl4ixb8jsez'
    }, {
      type: 'Optional style',
      style: 'mapbox://styles/milehighfd/ckarchcyg0vjl1ipcm4kap2k0'
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
export const COMPONENTS_TRIGGER = 'components';

// Map Layer Filters
export const FLOODPLAINS_FEMA_FILTERS = 'national_flood_hazard_layer';
export const FLOODPLAINS_NON_FEMA_FILTERS = 'udfcd_fhad_floodplains';
export const WATERSHED_FILTERS = 'catchments'; //'basins';
export const STREAMS_FILTERS = 'streams';

export const SERVICE_AREA_FILTERS = 'watershed_service_areas';
export const MUNICIPALITIES_FILTERS = 'municipalities';
export const COUNTIES_FILTERS = 'counties';
export const MHFD_BOUNDARY_FILTERS = 'district_boundary';

/* Component Layers */
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

export const COMPONENT_LAYERS = {
  name: 'components',
  tiles: [
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
    LANDSCAPING_AREA
  ]
};

/* Mep Projects */
export const MEP_PROJECTS_TEMP_LOCATIONS = 'mep_projects_temp_locations';
export const MEP_PROJECTS_DETENTION_BASINS = 'mep_projects_detention_basins';
export const MEP_PROJECTS_CHANNELS = 'mep_projects_channels';
export const MEP_PROJECTS_STORM_OUTFALLS = 'mep_projects_storm_outfalls';

export const MEP_PROJECTS = {
  name: 'mep_projects',
  tiles: [
    MEP_PROJECTS_TEMP_LOCATIONS,
    MEP_PROJECTS_DETENTION_BASINS,
    MEP_PROJECTS_CHANNELS,
    MEP_PROJECTS_STORM_OUTFALLS
  ]
};

/* Routine Maintenance */
export const ROUTINE_NATURAL_AREAS = 'routine_natural_areas';
export const ROUTINE_WEED_CONTROL = 'routine_weed_control';
export const ROUTINE_DEBRIS_AREA = 'routine_debris_area';
export const ROUTINE_DEBRIS_LINEAR = 'routine_debris_linear';

export const ROUTINE_MAINTENANCE = {
  name: 'routine_maintenance',
  tiles: [
    ROUTINE_NATURAL_AREAS,
    ROUTINE_WEED_CONTROL,
    ROUTINE_DEBRIS_AREA,
    ROUTINE_DEBRIS_LINEAR
  ]
};

// Project Styles Filters
export const PROJECTS_POLYGONS = 'projects_polygon_';
export const PROJECTS_LINE = 'projects_line_1';

export const PROJECTS_MAP_STYLES = {
  name: 'projects',
  tiles: [
    PROJECTS_POLYGONS,
    PROJECTS_LINE
  ]
}

export const SELECT_ALL_FILTERS = [FLOODPLAINS_FEMA_FILTERS,
                                  FLOODPLAINS_NON_FEMA_FILTERS,
                                  WATERSHED_FILTERS,
                                  STREAMS_FILTERS,
                                  SERVICE_AREA_FILTERS,
                                  MUNICIPALITIES_FILTERS,
                                  COUNTIES_FILTERS,
                                  MHFD_BOUNDARY_FILTERS,
                                  PROBLEMS_TRIGGER,
                                  PROJECTS_MAP_STYLES,
                                  COMPONENT_LAYERS,
                                  MEP_PROJECTS,
                                  ROUTINE_MAINTENANCE];

/* End of Map Constants */

export const PROJECT_TYPES = ['capital', 'study', 'maintenance', 'propertyAcquisition', 'special'];

export const PROJECT_TYPES_AND_NAME = [
  {
    name: 'Capital', id: 'capital'
  },
  {
    name: 'Maintenance', id: 'maintenance'
  },
  {
    name: 'Study', id: 'study'
  },
  {
    name: 'Acquisition', id: 'propertyAcquisition'
  },
  {
    name: 'Special', id: 'special'
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
    'Mile High Flood Control District Boundary'
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
  },{
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
    },{
      name: 'Aurora',
      coordinates: [[-104.886488846982, 39.5509217911521],
      [-104.886488846982, 39.8268662875965],
      [-104.489182795277, 39.8268662875965],
      [-104.489182795277, 39.5509217911521],
      [-104.886488846982, 39.5509217911521]]
    },{
      name: 'Boulder',
      coordinates: [[-105.301461118472, 39.9569231136854],
      [-105.301461118472, 40.0944096535499],
      [-105.178109005283, 40.0944096535499],
      [-105.178109005283, 39.9569231136854],
      [-105.301461118472, 39.9569231136854]]
    },{
      name: 'Bow Mar',
      coordinates: [[-105.059694934036, 39.613949083876],
      [-105.059694934036, 39.6387778095266],
      [-105.0441405703, 39.6387778095266],
      [-105.0441405703, 39.613949083876],
      [-105.059694934036, 39.613949083876]]
    },{
      name: 'Brighton',
      coordinates: [[-104.865256007921, 39.8996380763332],
      [-104.865256007921, 40.0005467727396],
      [-104.716630749622, 40.0005467727396],
      [-104.716630749622, 39.8996380763332],
      [-104.865256007921, 39.8996380763332]]
    },{
      name: 'Castle Pines',
      coordinates: [[-104.92364458764, 39.4348394212746],
      [-104.92364458764, 39.4927571124134],
      [-104.830211143711, 39.4927571124134],
      [-104.830211143711, 39.4348394212746],
      [-104.92364458764, 39.4348394212746]]
    },{
      name: 'Centennial',
      coordinates: [[-104.988412492661, 39.565954873001],
      [-104.988412492661, 39.6384321826415],
      [-104.726195318378, 39.6384321826415],
      [-104.726195318378, 39.565954873001],
      [-104.988412492661, 39.565954873001]]
    },{
      name: 'Cherry Hills Village',
      coordinates: [[-104.978587238829, 39.6240620042323],
      [-104.978587238829, 39.6531285845754],
      [-104.913237442832, 39.6531285845754],
      [-104.913237442832, 39.6240620042323],
      [-104.978587238829, 39.6240620042323]]
    },{
      name: 'Columbine Valley',
      coordinates: [[-105.047281168869, 39.5879064663976],
      [-105.047281168869, 39.6111992050042],
      [-105.024537716092, 39.6111992050042],
      [-105.024537716092, 39.5879064663976],
      [-105.047281168869, 39.5879064663976]]
    },{
      name: 'Commerce City',
      coordinates: [[-104.968782885965, 39.7837822646136],
      [-104.968782885965, 39.9288433692551],
      [-104.659208473827, 39.9288433692551],
      [-104.659208473827, 39.7837822646136],
      [-104.968782885965, 39.7837822646136]]
    },{
      name: 'Edgewater',
      coordinates: [[-105.07439381016, 39.7432863242064],
      [-105.07439381016, 39.7584859638459],
      [-105.053220919965, 39.7584859638459],
      [-105.053220919965, 39.7432863242064],
      [-105.07439381016, 39.7432863242064]]
    },{
      name: 'Englewood',
      coordinates: [[-105.034950840989, 39.6168354218458],
      [-105.034950840989, 39.6786896956911],
      [-104.959449407346, 39.6786896956911],
      [-104.959449407346, 39.6168354218458],
      [-105.034950840989, 39.6168354218458]]
    },{
      name: 'Erie',
      coordinates: [[-105.104746172491, 40.0002623487425],
      [-105.104746172491, 40.0878402979372],
      [-105.046253305953, 40.0878402979372],
      [-105.046253305953, 40.0002623487425],
      [-105.104746172491, 40.0002623487425]]
    },{
      name: 'Federal Heights',
      coordinates: [[-105.02522236781, 39.8490126965949],
      [-105.02522236781, 39.8851356880138],
      [-104.996618911359, 39.8851356880138],
      [-104.996618911359, 39.8490126965949],
      [-105.02522236781, 39.8490126965949]]
    },{
      name: 'Foxfield',
      coordinates: [[-104.801956301723, 39.5804292172628],
      [-104.801956301723, 39.5950956130278],
      [-104.77317531446, 39.5950956130278],
      [-104.77317531446, 39.5804292172628],
      [-104.801956301723, 39.5804292172628]]
    },{
      name: 'Glendale',
      coordinates: [[-104.940707916489, 39.6947663027973],
      [-104.940707916489, 39.7111013362915],
      [-104.926992355885, 39.7111013362915],
      [-104.926992355885, 39.6947663027973],
      [-104.940707916489, 39.6947663027973]]
    },{
      name: 'Golden',
      coordinates: [[-105.240536308956, 39.6993325456654],
      [-105.240536308956, 39.7871768628526],
      [-105.161985691711, 39.7871768628526],
      [-105.161985691711, 39.6993325456654],
      [-105.240536308956, 39.6993325456654]]
    },{
      name: 'Greenwood Village',
      coordinates: [[-104.980678685106, 39.5877680026219],
      [-104.980678685106, 39.645903926112],
      [-104.847685339501, 39.645903926112],
      [-104.847685339501, 39.5877680026219],
      [-104.980678685106, 39.5877680026219]]
    },{
      name: 'Lafayette',
      coordinates: [[-105.157252292266, 39.9577260727672],
      [-105.157252292266, 40.0483054676251],
      [-105.052824868102, 40.0483054676251],
      [-105.052824868102, 39.9577260727672],
      [-105.157252292266, 39.9577260727672]]
    },{
      name: 'Lakeside',
      coordinates: [[-105.062680686205, 39.7765808127865],
      [-105.062680686205, 39.7838621668228],
      [-105.053252619496, 39.7838621668228],
      [-105.053252619496, 39.7765808127865],
      [-105.062680686205, 39.7765808127865]]
    },{
      name: 'Lakewood',
      coordinates: [[-105.199852953331, 39.618447797343],
      [-105.199852953331, 39.7620019220305],
      [-105.053214571986, 39.7620019220305],
      [-105.053214571986, 39.618447797343],
      [-105.199852953331, 39.618447797343]]
    },{
      name: 'Littleton',
      coordinates: [[-105.11101815177, 39.5361793491896],
      [-105.11101815177, 39.6294107247063],
      [-104.973245126373, 39.6294107247063],
      [-104.973245126373, 39.5361793491896],
      [-105.11101815177, 39.5361793491896]]
    },{
      name: 'Lochbuie',
      coordinates: [[-104.753741964527, 39.9959159768774],
      [-104.753741964527, 40.00059337504],
      [-104.706548866349, 40.00059337504],
      [-104.706548866349, 39.9959159768774],
      [-104.753741964527, 39.9959159768774]]
    },{
      name: 'Lone Tree',
      coordinates: [[-104.90917806003, 39.506845812359],
      [-104.90917806003, 39.5661058998429],
      [-104.829927601279, 39.5661058998429],
      [-104.829927601279, 39.506845812359],
      [-104.90917806003, 39.506845812359]]
    },{
      name: 'Lousiville',
      coordinates: [[-105.18927136441, 39.9396245998053],
      [-105.18927136441, 39.9982178943887],
      [-105.10735075226, 39.9982178943887],
      [-105.10735075226, 39.9396245998053],
      [-105.18927136441, 39.9396245998053]]
    },{
      name: 'Morrison',
      coordinates: [[-105.222340680457, 39.6174082517306],
      [-105.222340680457, 39.6603271563178],
      [-105.162393274622, 39.6603271563178],
      [-105.162393274622, 39.6174082517306],
      [-105.222340680457, 39.6174082517306]]
    },{
      name: 'Mountain View',
      coordinates: [[-105.060338568957, 39.7729504370876],
      [-105.060338568957, 39.7766039228686],
      [-105.053251967852, 39.7766039228686],
      [-105.053251967852, 39.7729504370876],
      [-105.060338568957, 39.7729504370876]]
    },{
      name: 'Northglenn',
      coordinates: [[-105.015527929424, 39.86810648522],
      [-105.015527929424, 40.0005112579187],
      [-104.942654207074, 40.0005112579187],
      [-104.942654207074, 39.86810648522],
      [-105.015527929424, 39.86810648522]]
    },{
      name: 'Parker',
      coordinates: [[-104.830125981532, 39.4530848094876],
      [-104.830125981532, 39.5659311134897],
      [-104.70849052181, 39.5659311134897],
      [-104.70849052181, 39.4530848094876],
      [-104.830125981532, 39.4530848094876]]
    },{
      name: 'Sheridan',
      coordinates: [[-105.034742453218, 39.6313773328853],
      [-105.034742453218, 39.6605124349886],
      [-105.000242536569, 39.6605124349886],
      [-105.000242536569, 39.6313773328853],
      [-105.034742453218, 39.6313773328853]]
    },{
      name: 'Superior',
      coordinates: [[-105.212935362517, 39.9084680150706],
      [-105.212935362517, 39.9623543211878],
      [-105.137572118452, 39.9623543211878],
      [-105.137572118452, 39.9084680150706],
      [-105.212935362517, 39.9084680150706]]
    },{
      name: 'Thornton',
      coordinates: [[-105.015541107083, 39.8313721315443],
      [-105.015541107083, 40.0004378244007],
      [-104.878042773999, 40.0004378244007],
      [-104.878042773999, 39.8313721315443],
      [-105.015541107083, 39.8313721315443]]
    },{
      name: 'Westminster',
      coordinates: [[-105.165398564064, 39.8181119988509],
      [-105.165398564064, 39.9685368331313],
      [-104.987696346752, 39.9685368331313],
      [-104.987696346752, 39.8181119988509],
      [-105.165398564064, 39.8181119988509]]
    },{
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
    },{
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
    },{
      name: 'Arapahoe County',
      coordinates: [[-105.054125150206, 39.5641128054573],
      [-105.054125150206, 39.7402153518857],
      [-104.48954653954, 39.7402153518857],
      [-104.48954653954, 39.5641128054573],
      [-105.054125150206, 39.5641128054573]]
    },{
      name: 'Boulder County',
      coordinates: [[-105.323668314928, 39.9137161003913],
      [-105.323668314928, 40.1315769665082],
      [-105.052824885246, 40.1315769665082],
      [-105.052824885246, 39.9137161003913],
      [-105.323668314928, 39.9137161003913]]
    },{
      name: 'Douglas County',
      coordinates: [[-105.126231048003, 39.4057878658578],
      [-105.126231048003, 39.5661908007473],
      [-104.660962449493, 39.5661908007473],
      [-104.660962449493, 39.4057878658578],
      [-105.126231048003, 39.4057878658578]]
    },{
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
  "Arvada",
  "Aurora",
  "Boulder, City",
  "Bow Mar",
  "Brighton",
  "Broomfield, City and County",
  "Castle Pines",
  "Centennial",
  "Cherry Hills Village",
  "Columbine Valley",
  "Commerce City",
  "Denver, City and County",
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
  "SEMSWA",
  "Sheridan",
  "Superior",
  "Thornton",
  "Unincorporated Adams County",
  "Unincorporated Arapahoe County",
  "Unincorporated Boulder County",
  "Unincorporated Douglas County",
  "Unincorporated Jefferson County",
  "Westminster",
  "Wheat Ridge"
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
  { title: 'MHFD Staff', style: '80px', value: 'staff', options: CITIES},
  { title: 'Consultant / Contractor', style: '115px', value: 'consultant', options: CONSULTANT_CONTRACTOR},
  { title: 'Local Government', style: '117px', value: 'government_staff', options: ORGANIZATION},
  { title: 'Other', style: '80px', value: 'other', options: []}
]

export const SERVICE_AREA = [
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

export const PROJECT_STUDY_MASTER= {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: '',
  goal: ''
}
export const PROJECT_STUDY_FHAD= {
  projectType: 'study',
  projectSubtype: '',
  requestName: '',
  sponsor: '',
  coSponsor: '',
  requestedStartyear: ''
}

export const PROJECT_MAINTENANCE_DEBRIS= {
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

export const PROJECT_MAINTENANCE_VEGETATION= {
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

export const PROJECT_MAINTENANCE_SEDIMENT= {
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

export const PROJECT_MAINTENANCE_MINOR_REPAIR= {
  projectType: "maintenance",
  projectSubtype: '',
  requestName: '',
  description: '',
  mhfdDollarRequest: 0,
  publicAccess: false,
  maintenanceEligility: '',
  tasks: ['']
}

export const PROJECT_MAINTENANCE_RESTORATION= {
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
    value: 'admin', name: 'MHFD Admin'
  }, {
    value: 'staff', name: 'MHFD Staff'
  }, {
    value: 'government_admin', name: 'Local Government Admin'
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
  '/profile-view', '/map', '/new-project-types', '/work-request', '/work-plan', '/user', '/upload-attachment'
];
export const ROUTERS = {
  PROFILE_VIEW:'profile-view',
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
  PROFILE_VIEW:'Confluence   |   User Profile',
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
export const  COLUMNS_USER_ACTIVITY = [
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
    render: (activityType: string) => activityType === 'user_login' ? 'User Login': ''
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
/* Unselected Items on Maps Errors */
export const NO_COMPONENTS_ERROR = 'Must select at least one map component.';
export const NO_POLYGON_ERROR = 'Must draw a polygon on the map to continue.';
export const NO_MARKER_ERROR = 'Must put the marker on the map to continue.';
/* End of Unselected Items on Maps Errors */

/* Filter Constants */
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
  /* Project Filters */
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

  /* End of Project Filters */
};

export const DROPDOWN_PROJECT_FILTERS = [
  PROBLEM_TYPE, SERVICE_AREA_VALUE, JURIDICTION, COUNTY, LG_MANAGER,
  REQUESTED_START_YEAR, STREAM_NAME, MHFD_DOLLAR_REQUESTED
];

export const SORTED_LIST = ['dateCreated', 'requestName', 'projectType', 'estimatedCost'];

/* End of Filter Constants */





/* Draft Panel Constants */

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

/* End of Draft Panel Constants */






/*  // Mapbox Custom Styles
    mapbox://styles/mapbox/streets-v11
    mapbox://styles/mapbox/outdoors-v11
    mapbox://styles/mapbox/light-v10
    mapbox://styles/mapbox/dark-v10
    mapbox://styles/mapbox/satellite-v9
    mapbox://styles/mapbox/satellite-streets-v11
    mapbox://styles/mapbox/navigation-preview-day-v4
    mapbox://styles/mapbox/navigation-preview-night-v4
    mapbox://styles/mapbox/navigation-guidance-day-v4
    mapbox://styles/mapbox/navigation-guidance-night-v4
*/
