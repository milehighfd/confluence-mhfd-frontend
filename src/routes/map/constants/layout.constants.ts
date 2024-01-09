import { PROBLEMS_TRIGGER, MHFD_PROJECTS } from "../../../constants/constants";
export const COMPLETE_SCREEN = 24;
export const MEDIUM_SCREEN = 15;
export const EMPTY_SCREEN = 0;

export const MEDIUM_SCREEN_LEFT = 15;
export const MEDIUM_SCREEN_RIGHT = 9;

export const PROJECTS_MAP_STYLES = {
  name: 'projects',
  tiles: [
    MHFD_PROJECTS
  ]
};

export const PROJECTS_POLYGONS = 'projects_polygon_';
export const PROJECTS_DRAFT = 'mhfd_projects' + process.env.REACT_APP_NODE_ENV ? ('_' + ((process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'prod' ) ? 'prod' :  process.env.REACT_APP_NODE_ENV)) : '_dev';

export const MEP_PROJECTS_TEMP_LOCATIONS = 'mep_projects_temp_locations';
export const MEP_PROJECTS_DETENTION_BASINS = 'mep_detentionbasins_1';
export const MEP_PROJECTS_CHANNELS = 'mep_channels_1'; 
export const MEP_PROJECTS_STORM_OUTFALLS = 'mep_outfalls_1'; 

export const ROUTINE_NATURAL_AREAS = 'routine_natural_area';
export const ROUTINE_WEED_CONTROL = 'routine_weed_control';
export const ROUTINE_DEBRIS_AREA = 'routine_debris_area';
export const ROUTINE_DEBRIS_LINEAR = 'routine_debris_linear';

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
export const STREAMS_FILTERS = 'streams';
export const EFFECTIVE_REACHES = 'effective_reaches';
export const ACTIVE_LOMS = 'active_lomcs';
export const MHFD_STREAMS_FILTERS = 'stream';
export const STREAM_IMPROVEMENT_MEASURE = 'stream_improvement_measure_copy';
export const FLOOD_HAZARD_POLYGON = 'flood_hazard_polygon_';
export const FLOOD_HAZARD_LINE = 'flood_hazard_line_';
export const FLOOD_HAZARD_POINT = 'flood_hazard_point_';
export const STREAM_FUNCTION_POLYGON = 'stream_function_polygon_';
export const STREAM_FUNCTION_POINT ='stream_function_point_';
export const STREAM_FUNCTION_LINE = 'stream_function_line_';
export const FUTURE_DEVELOPMENT_POLYGON ='future_development_polygon_';
export const FUTURE_DEVELOPMENT_LINE ='future_development_line_';

export const hovereableLayers = [
  PROBLEMS_TRIGGER,
  MHFD_PROJECTS,
  PROJECTS_POLYGONS,
  MEP_PROJECTS_TEMP_LOCATIONS,
  MEP_PROJECTS_DETENTION_BASINS,
  MEP_PROJECTS_CHANNELS,
  MEP_PROJECTS_STORM_OUTFALLS,
  ROUTINE_NATURAL_AREAS,
  ROUTINE_WEED_CONTROL,
  ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR,
  LANDSCAPING_AREA,
  LAND_ACQUISITION,
  DETENTION_FACILITIES,
  STORM_DRAIN,
  CHANNEL_IMPROVEMENTS_AREA,
  CHANNEL_IMPROVEMENTS_LINEAR,
  SPECIAL_ITEM_AREA,
  SPECIAL_ITEM_LINEAR,
  SPECIAL_ITEM_POINT,
  MAINTENANCE_TRAILS,
  PIPE_APPURTENANCES,
  GRADE_CONTROL_STRUCTURE,
  REMOVAL_AREA,
  REMOVAL_LINE,
  STREAMS_FILTERS,
  EFFECTIVE_REACHES,
  ACTIVE_LOMS,
  MHFD_STREAMS_FILTERS,
  STREAM_IMPROVEMENT_MEASURE,
  FLOOD_HAZARD_POLYGON,
  FLOOD_HAZARD_LINE,
  FLOOD_HAZARD_POINT,
  STREAM_FUNCTION_POLYGON,
  STREAM_FUNCTION_POINT,
  STREAM_FUNCTION_LINE,
  FUTURE_DEVELOPMENT_POLYGON,
  FUTURE_DEVELOPMENT_LINE,
];
