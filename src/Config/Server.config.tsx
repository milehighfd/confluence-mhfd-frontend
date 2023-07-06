const URL = process.env.REACT_APP_API_URI;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CAPTCHA = process.env.REACT_APP_CAPTCHA;
const BASE_URL_IMAGES = process.env.REACT_APP_IMAGES_URL;
export const SERVER = (function () {
    const URL_BASE = {
        BASE: URL,
        IMAGES: BASE_URL_IMAGES
    }
    const USER = 'users';
    const AUTH = 'auth';
    const LOGIN = 'login';
    const GUEST = 'guest';
    const BBOX = 'bbox'
    const PROJECT = 'projects';
    const PROBLEMS = 'problems';
    const ATTACHMENT = 'attachments';
    const CREATE_PROJECT = 'create';
    const FILTERS = 'filters';
    const PROJECT_FILTERS = 'project-filter';
    const CREATE_PROJECT_DEBRIS = 'createMaintenanceDebris';
    const CREATE_PROJECT_CAPITAL = 'createCapital';
    const CREATE_PROJECT_ACQUISITION = 'createAcquisition';
    const CREATE_PROJECT_SPECIAL = 'createSpecial';
    const CREATE_PROJECT_STUDY_MASTER = 'createStudyMasterPlan';
    const CREATE_PROJECT_STUDY_FHAD = 'createStudyFHAD';
    const GALLERY_PROBLEMS = 'gallery?isproblem=true';
    const GALLERY_PROJECTS = 'gallery?';
    const GALLERY_PROJECTS_V2 = 'projects';
    const GALLERY = 'gallery';
    const GENERATE_SIGNUP_URL = 'generate-signup-url';
    const ZOOMAREA = 'zoomarea'
    const COMPONENT_COUNTER = 'component-counter';
    const GRAPHQL = 'graphql';
    const UPLOAD_FILE = 'upload-file';
    const ME = 'me';
    const NOTIFICATIONS = 'notifications';
    const ADMIN = 'admin';
    const MAP = 'map';
    const CHANGE_USER_STATE = 'change-user-state';
    const EDIT_USER = 'edit-user';
    const FILTER_PROJECT = 'filters';
    const SIGN_UP = 'signup';
    const RECOVERY_PASSWORD = 'recovery-password';
    const RESET_PASSWORD = 'reset-password';
    const LIST_USERS_ACTIVATED = 'list?';
    const LIST_USERS_TOTAL = 'listTotal';
    const LIST_USERS_PENDING = 'list?pending=false&';
    const CREATORS = 'creators';
    const FILTER_BY_FIELD = 'filter-by-field';
    const FILTER_BY_USER_CREATOR = 'filters-by-creator';
    const UPLOAD_PHOTO = 'upload-photo';
    const USER_ACTIVITY = 'user-activity';
    const COUNT_PROJECTS_BY_CREATOR = 'counter-projects-by-creator';
    const COUNT = 'count';
    const USER_ACTIVITY_CSV = 'user-activity/csv';
    const GET_ALL = 'get-all?';
    const UPDATE = 'update';
    const DRIVE = 'drive';
    const GET_IMAGE_DRIVE = 'get-images-drive';
    const GET_FILES = 'get-files';
    const REMOVE = 'remove'
    const TOGGLE = 'toggle'
    const TOGGLE_PUT = 'toggleput'
    const PROBLEM_BY_ID = 'problem-by-id';
    const PROJECT_BY_ID = 'project-by-id';
    const PROJECT_COST = 'projectCost';
    const DETAILED_PAGE_PROJECT = 'project-by-ids';
    const GROUP_COLUMNS = 'group-by';
    const PARAM_FILTERS = 'params-filters';
    const COMPONENTS_BY_ENTITYID = 'components-by-entityid';
    const TEAMS_BY_ENTITYID = 'teams-by-entityid';
    const SEARCH = 'search';
    const GET_AOI_CENTER = 'get-aoi-from-center';
    const V2 = 'v2';
    const BY_COMPONENTS = 'by-components';
    const V2_DETAILED_PAGE = 'projects';
    const DETAILED_PAGE = 'detailed-page';
    const DELETE_USER = 'delete-user';
    const PARAM_FILTER_PROJECTS = 'card-filters';
    const DELETE_ENTRY = 'delete-entry';
    const MODIFY_USER_STATUS = 'modify-user-status';
    const PARAM_FILTER_PROBLEMS = 'params-filter-problems';
    const PARAM_FILTER_COMPONENTS_DB = 'params-filter-components-db';
    const PARAM_FILTER_COMPONENTS_DB_NOBOUNDS = 'params-filter-components-db-nobounds';
    const COUNTER_PROJECTS = 'projects-counter';
    const COUNTER_PROBLEMS = 'problems-counter';
    const COUNTER_COMPONENTS = 'components-counter';
    const GET_ZOOMAREA_FILTER = 'get-zoom-filter';
    const BBOX_COMPONENTS = 'bbox-components';
    const PROBLEMNAME = 'problemname';
    const PROBLEMNAMECOMP = 'get-name?problem_id=';
    const FAVORITES = 'favorites';
    const ADD_FAVORITE = 'create';
    const FAVORITE_CARDS = 'favorite-list';
    const TIMES_LOGIN = 'count-login';
    const CREATE = 'create';
    const ACQUISITION = 'acquisition';
    const CAPITAL = 'capital';
    const MAINTENANCE = 'maintenance';
    const SPECIAL = 'special';
    const STUDY = 'study';
    const GET_SIGNUP_EMAIL = 'get-signup-email';
    const GET_RESET_AND_CONFIRM = 'generate-reset-confirm';
    const GET_STREAMS_BY_PROJ_ID = 'get-streams-by-projectid';
    const GET_COMPONENTS_BY_PROJ_ID = 'get-components-by-projectid';
    const GET_INDEPENDENTCOMPONENTS_BY_PROJ_ID = 'get-independent-components-by-projectid';
    const GET_STREAM_INTERSECTED = 'get-all-streams';
    const GET_STREAM_INTERSECTION = 'get-stream-convexhull';
    const GET_STREAM_POLYGON = 'get-stream'
    const GET_LIST_COMPONENTS = 'showcomponents';
    const GET_LIST_COMPONENTS_SORTED = 'showcomponents';
    const ADD_COMPONENTS_POLYGON = 'showcomponents';
    const GET_SERVICEAREA_COUNTY_POINT = 'get-countyservicearea-for-point';
    const GET_SERVICEAREA_COUNTY_STREAMS = 'get-countyservicearea-for-polygon';
    const GET_SERVICEAREA_COUNTY_GEOM = 'get-countyservicearea-for-geom';
    const GET_JURISDICTION_POLYGON = 'get-jurisdiction-for-polygon';
    const GET_LIST_STREAMS = 'streams-data';
    const GET_COMPONENTS_WITH_GEOM = 'get-components-by-components-and-geom';
    const GET_COMPONENT_GEOM = 'component-geom';
    const GET_PROBLEM_GEOM = 'problem-geom';
    const GET_COUNT_FOR_PROBLEM = 'count-for-problem';
    const GET_COMPONENTS_BY_PROBLEMID = 'components-by-problemid';
    const GET_STREAMS_BY_COMPONENTS = 'get-stream-by-components-and-geom';
    const GET_COSTS_BY_ID = 'get-costs-by-id'
    const NEW_NOTES = 'newnotes';
    const GROUP_TYPE = 'group';
    const COLOR = 'color';
    const NOTE_TYPE = 'note';
    const PROJECTS_BBOX = 'projects-bbox';
    const COST = 'cost';
    const SPONSOR_LIST = 'sponsor-list';
    const BY_PROJECT = 'by-project';
    const GET_AVAILABLE_COLORS = 'get-available-colors';
    const ORGANIZATIONS = 'organizations';
    const CONSULTANTS = 'consultants';
    const CONFIGURATIONS = 'configuration';
    const ALL_ORGANIZATION = 'get-list?servicearea=1&county=1&jurisdiction=1';
    const PMTOOLS = 'pm-tools';
    const STREAMS = 'streams';
    const BUSINESS = 'business';
    const STATUS = 'status';
    const FINANCIAL = 'financial';
    const BOARD = 'board';
    const BOARD_PROJECT = 'board-project';
    const CREATE_PROJECT_GENERAL = 'createproject';
    const EDIT_PROJECT = 'editproject';
    return {
        URL_BASE: URL_BASE.BASE,
        BASE_URL_IMAGES: URL_BASE.IMAGES,
        SHARE_MAP_PROJECT: `${BASE_URL}/${DETAILED_PAGE}`,
        CAPTCHA: CAPTCHA,
        COMPONENT_COUNTER: `${URL_BASE.BASE}/${GALLERY}/${COMPONENT_COUNTER}`,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
        GUEST: `${URL_BASE.BASE}/${AUTH}/${GUEST}`,
        ME: `${URL_BASE.BASE}/${USER}/${ME}`,
        NOTIFICATIONS: `${URL_BASE.BASE}/${NOTIFICATIONS}`,
        GRAPHQL:`${URL_BASE.BASE}/${GRAPHQL}`, 
        UPLOAD_FILE: `${URL_BASE.BASE}/${ATTACHMENT}/${UPLOAD_FILE}`,
        PROJECT: `${URL_BASE.BASE}/${PROJECT}`,
        FILTER_PROJECT: `${URL_BASE.BASE}/${PROJECT}/${FILTER_PROJECT}`,
        FILTER_PROJECT_CREATORS: `${URL_BASE.BASE}/${PROJECT}/${CREATORS}`,
        FILTER_BY_FIELD: `${URL_BASE.BASE}/${PROJECT}/${FILTER_BY_FIELD}`,
        CREATE_PROJECT: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT}`,
        CREATE_PROJECT_DEBRIS: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_DEBRIS}`,
        CREATE_PROJECT_CAPITAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_CAPITAL}`,
        CREATE_PROJECT_ACQUISITION: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_ACQUISITION}`,
        CREATE_PROJECT_SPECIAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_SPECIAL}`,
        CREATE_PROJECT_STUDY_MASTER: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_MASTER}`,
        CREATE_PROJECT_STUDY_FHAD: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_FHAD}`,
        GALLERY_PROJECTS: `${URL_BASE.BASE}/${GALLERY_PROJECTS}`,
        GALLERY_PROJECTS_V2: `${URL_BASE.BASE}/${GALLERY_PROJECTS_V2}`,
        GALLERY_PROJECTS_IDS_V2: `${URL_BASE.BASE}/${GALLERY_PROJECTS_V2}/ids`,
        GALLERY_FILTERED_PROJECTS_ID: `${URL_BASE.BASE}/${GALLERY_PROJECTS_V2}/test`,
        GALLERY_PROBLEMS: `${URL_BASE.BASE}/${GALLERY_PROBLEMS}`,
        MAP_TABLES: `${URL_BASE.BASE}/${MAP}`,
        MAP_PROBLEM_TABLES: `${URL_BASE.BASE}/${MAP}/probs`,
        LIST_USERS_TOTAL: `${URL_BASE.BASE}/${ADMIN}/${LIST_USERS_TOTAL}`,
        LIST_USERS_ACTIVATED: `${URL_BASE.BASE}/${ADMIN}/${LIST_USERS_ACTIVATED}`,
        LIST_USERS_PENDING: `${URL_BASE.BASE}/${ADMIN}/${LIST_USERS_PENDING}`,
        CHANGE_USER_STATE: `${URL_BASE.BASE}/${ADMIN}/${CHANGE_USER_STATE}`,
        EDIT_USER: `${URL_BASE.BASE}/${ADMIN}/${EDIT_USER}`,
        SIGN_UP: `${URL_BASE.BASE}/${USER}/${SIGN_UP}`,
        RECOVERY_PASSWORD: `${URL_BASE.BASE}/${USER}/${RECOVERY_PASSWORD}`,
        RESET_PASSWORD: `${URL_BASE.BASE}/${USER}/${RESET_PASSWORD}`,
        USER_PROJECT: `${URL_BASE.BASE}/${PROJECT}/${FILTER_BY_USER_CREATOR}`,
        USER_UPLOAD_PHOTO: `${URL_BASE.BASE}/${USER}/${UPLOAD_PHOTO}`,
        USER_ACTIVITY: `${URL_BASE.BASE}/${ADMIN}/${USER_ACTIVITY}/${GET_ALL}`,
        USER_UPDATE: `${URL_BASE.BASE}/${USER}/${ME}`,
        TIMES_LOGIN: `${URL_BASE.BASE}/${ADMIN}/${USER_ACTIVITY}/${TIMES_LOGIN}`,
        USER_ACTIVITY_CSV: `${URL_BASE.BASE}/${ADMIN}/${USER_ACTIVITY_CSV}`,
        COUNT_PROJECTS_BY_CREATOR: `${URL_BASE.BASE}/${PROJECT}/${COUNT_PROJECTS_BY_CREATOR}`,
        UPDATE_USER_INFORMATION: `${URL_BASE.BASE}/${USER}/${UPDATE}`,
        GET_IMAGE_DRIVE: `${URL_BASE.BASE}/${DRIVE}/${GET_IMAGE_DRIVE}`,
        GET_ALL_ATTACHMENTS: `${URL_BASE.BASE}/${ATTACHMENT}/${GET_FILES}`,
        DELETE_ATTACHMENT: `${URL_BASE.BASE}/${ATTACHMENT}/${REMOVE}`,
        TOGGLE_ATTACHMENT: `${URL_BASE.BASE}/${ATTACHMENT}/${TOGGLE}`,
        TOGGLE_ATTACHMENT_PUT: `${URL_BASE.BASE}/${ATTACHMENT}/${TOGGLE_PUT}`,
        PROBLEM_BY_ID: `${URL_BASE.BASE}/${GALLERY}/${PROBLEM_BY_ID}`,
        PROBLEM_PARTS_BY_ID: `${URL_BASE.BASE}/${GALLERY}/problem_part`,
        PROJECT_BY_ID: `${URL_BASE.BASE}/${GALLERY}/${PROJECT_BY_ID}`,
        DETAILED_PAGE_PROJECT: `${URL_BASE.BASE}/${GALLERY}/${DETAILED_PAGE_PROJECT}`,
        V2_DETAILED_PAGE: (id: number) => `${URL_BASE.BASE}/${V2_DETAILED_PAGE}/${id}`,
        GET_BBOX_BY_PROJECT_ID: (project_id: number) => `${URL_BASE.BASE}/${GALLERY_PROJECTS_V2}/bbox/${project_id}`,
        STREAM_BY_ID: (id: number) => `${URL_BASE.BASE}/${STREAMS}/${id}`,
        PARAM_FILTERS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTERS}`,
        GROUP_COLUMNS: `${URL_BASE.BASE}/${GALLERY}/${GROUP_COLUMNS}`,
        COMPONENTS_BY_ENTITYID: `${URL_BASE.BASE}/${GALLERY}/${COMPONENTS_BY_ENTITYID}`,
        TEAMS_BY_ENTITYID: `${URL_BASE.BASE}/${GALLERY}/${TEAMS_BY_ENTITYID}`,
        GET_FILTER_COMPONENTS_FOR_PROBLEMS: `${URL_BASE.BASE}/${FILTERS}`,
        GET_FILTER_PROBLEMTYPE_FOR_PROJECTS: `${URL_BASE.BASE}/${FILTERS}/${PROJECT_FILTERS}`,
        SEARCH_KEYWORD_PROJECTS: `${URL_BASE.BASE}/${FILTERS}/${SEARCH}/${PROJECT}`,
        SEARCH_KEYWORD_PROBLEMS: `${URL_BASE.BASE}/${FILTERS}/${SEARCH}/${PROBLEMS}`,
        FILTER_BY_COMPONENTS: `${URL_BASE.BASE}/${FILTERS}/${V2}/${BY_COMPONENTS}`,
        MAP_SEARCH: `${URL_BASE.BASE}/${MAP}/${SEARCH}`,
        MAP_CENTER_SEARCH: `${URL_BASE.BASE}/${MAP}/${GET_AOI_CENTER}`,
        GROUP_ORGANIZATION: `${URL_BASE.BASE}/v2/locality/all-localities`,
        GROUP_ORGANIZATION_NO_GEOM: `${URL_BASE.BASE}/v2/locality/all-localities?nogeom=1`,
        ALL_GROUP_ORGANIZATION: `${URL_BASE.BASE}/v2/locality/${ALL_ORGANIZATION}`,
        PHASE_TYPE: `${URL_BASE.BASE}/phasetype`,
        STATUS: `${URL_BASE.BASE}/${STATUS}`,
        STATUSCOMMENT: `${URL_BASE.BASE}/${STATUS}/comment`,
        CREATE_STATUS_GROUP: `${URL_BASE.BASE}/${STATUS}/create-group`,
        PROJECT_ACTION_ITEM:`${URL_BASE.BASE}/actionitem`,
        BUSINESS_ASSOCIATES:`${URL_BASE.BASE}/${BUSINESS}/business-associates`,
        CREATE_CONTACT:`${URL_BASE.BASE}/${BUSINESS}/create-contact`,
        UPDATE_ADDRESS:`${URL_BASE.BASE}/${BUSINESS}/business-address`,
        BBOX_ORGANIZATION: `${URL_BASE.BASE}/${ZOOMAREA}/`,
        DELETE_USER: `${URL_BASE.BASE}/${ADMIN}/${DELETE_USER}`,
        PARAM_FILTER_PROJECTS: `${URL_BASE.BASE}/${PARAM_FILTER_PROJECTS}`,
        DELETE_USER_ENTRY: `${URL_BASE.BASE}/${ADMIN}/${DELETE_ENTRY}`,
        CHANGE_USER_STATUS: `${URL_BASE.BASE}/${ADMIN}/${MODIFY_USER_STATUS}`,
        PARAM_FILTER_PROBLEMS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_PROBLEMS}`,
        PARAM_FILTER_COMPONENTS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_COMPONENTS_DB}`,
        PARAM_FILTER_COMPONENTS_DB_NOBOUNDS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_COMPONENTS_DB_NOBOUNDS}`,
        COUNTER_PROJECTS: `${URL_BASE.BASE}/${GALLERY}/${COUNTER_PROJECTS}`,
        COUNTER_PROBLEMS: `${URL_BASE.BASE}/${GALLERY}/${COUNTER_PROBLEMS}`,
        COUNTER_COMPONENTS: `${URL_BASE.BASE}/${GALLERY}/${COUNTER_COMPONENTS}`,
        GET_ZOOMAREA_FILTER: `${URL_BASE.BASE}/${ZOOMAREA}/${GET_ZOOMAREA_FILTER}`,
        BBOX_COMPONENTS: `${URL_BASE.BASE}/${MAP}/${BBOX_COMPONENTS}`,
        PROBLEMNAME: `${URL_BASE.BASE}/${MAP}/${PROBLEMNAME}`,
        PROBLEMNNAMECOMP: `${URL_BASE.BASE}/${PROBLEMS}/${PROBLEMNAMECOMP}`,
        FAVORITES: `${URL_BASE.BASE}/${FAVORITES}`,
        COUNT_FAVORITES: `${URL_BASE.BASE}/${FAVORITES}/${COUNT}`,
        ADD_FAVORITE: `${URL_BASE.BASE}/${FAVORITES}/${ADD_FAVORITE}`,
        DELETE_FAVORITE: `${URL_BASE.BASE}/${FAVORITES}`,
        FAVORITE_CARDS: `${URL_BASE.BASE}/${FAVORITES}/${FAVORITE_CARDS}`,
        FAVORITE_PROJECTS: `${URL_BASE.BASE}/${FAVORITES}/project-cards`,
        FAVORITE_PROBLEMS: `${URL_BASE.BASE}/${FAVORITES}/problem-cards`,
        CREATE_ACQUISITION:`${URL_BASE.BASE}/${CREATE}/${ACQUISITION}`,
        CREATE_CAPITAL:`${URL_BASE.BASE}/${CREATE}/${CAPITAL}`,
        CREATE_MAINTENANCE:`${URL_BASE.BASE}/${CREATE}/${MAINTENANCE}`,
        CREATE_SPECIAL:`${URL_BASE.BASE}/${CREATE}/${SPECIAL}`,
        CREATE_STUDY:`${URL_BASE.BASE}/${CREATE}/${STUDY}`,
        CREATE_PROJECT_GENERAL: `${URL_BASE.BASE}/${CREATE}/${CREATE_PROJECT_GENERAL}`,
        GET_STUDIES: `${URL_BASE.BASE}/${STUDY}`,
        GET_STREAM_INTERSECTED: `${URL_BASE.BASE}/${CREATE}/${GET_STREAM_INTERSECTED}`,
        GET_STREAM_INTERSECTION: `${URL_BASE.BASE}/${CREATE}/${GET_STREAM_INTERSECTION}`,
        GET_STREAM_POLYGON: `${URL_BASE.BASE}/${CREATE}/${GET_STREAM_POLYGON}`,
        GET_LIST_COMPONENTS: `${URL_BASE.BASE}/${CREATE}/${GET_LIST_COMPONENTS}`,
        GET_LIST_COMPONENTS_SORTED: `${URL_BASE.BASE}/${CREATE}/${GET_LIST_COMPONENTS_SORTED}`,
        ADD_COMPONENTS_POLYGON: `${URL_BASE.BASE}/${CREATE}/${ADD_COMPONENTS_POLYGON}`,
        GET_SERVICEAREA_COUNTY_POINT: `${URL_BASE.BASE}/${CREATE}/${GET_SERVICEAREA_COUNTY_POINT}`,
        GET_SERVICEAREA_COUNTY_STREAMS: `${URL_BASE.BASE}/${CREATE}/${GET_SERVICEAREA_COUNTY_STREAMS}`,
        GET_SERVICEAREA_COUNTY_GEOM: `${URL_BASE.BASE}/${CREATE}/${GET_SERVICEAREA_COUNTY_GEOM}`,
        GET_JURISDICTION_POLYGON: `${URL_BASE.BASE}/${CREATE}/${GET_JURISDICTION_POLYGON}`,
        GET_LIST_STREAMS: `${URL_BASE.BASE}/${CREATE}/${GET_LIST_STREAMS}`,
        GET_COMPONENT_GEOM: `${URL_BASE.BASE}/${CREATE}/${GET_COMPONENT_GEOM}`,
        GET_PROBLEM_GEOM: `${URL_BASE.BASE}/${CREATE}/${GET_PROBLEM_GEOM}`,
        GET_COMPONENTS_WITH_GEOM: `${URL_BASE.BASE}/${CREATE}/${GET_COMPONENTS_WITH_GEOM}`,
        GET_COMPONENTS_BY_PROBLEMID: `${URL_BASE.BASE}/${CREATE}/${GET_COMPONENTS_BY_PROBLEMID}`,
        GET_STREAMS_BY_COMPONENTS: `${URL_BASE.BASE}/${CREATE}/${GET_STREAMS_BY_COMPONENTS}`,
        CREATE_NOTE: `${URL_BASE.BASE}/${NEW_NOTES}/${NOTE_TYPE}`,
        CREATE_GROUP: `${URL_BASE.BASE}/${NEW_NOTES}/${GROUP_TYPE}`,
        GET_NOTES_LIST: `${URL_BASE.BASE}/${NEW_NOTES}/color-list`,
        GET_AVAILABLE_COLORS: `${URL_BASE.BASE}/${NEW_NOTES}/${GET_AVAILABLE_COLORS}`,
        CREATE_NOTES_LIST: `${URL_BASE.BASE}/${NEW_NOTES}/${COLOR}`,
        GET_ORGANIZATIONS: `${URL_BASE.BASE}/${ORGANIZATIONS}`,
        GET_CONSULTANTS: `${URL_BASE.BASE}/${CONSULTANTS}`,
        GENERATE_SIGNUP_URL: `${URL_BASE.BASE}/${USER}/${GENERATE_SIGNUP_URL}`,
        GET_SPONSOR: `${URL_BASE.BASE}/${BUSINESS}/${SPONSOR_LIST}`,
        GET_RESET_AND_CONFIRM: `${URL_BASE.BASE}/${USER}/${GET_RESET_AND_CONFIRM}`,
        GET_SIGNUP_EMAIL: (token: string) => `${URL_BASE.BASE}/${USER}/${GET_SIGNUP_EMAIL}?token=${token}`,
        GET_LIST_PMTOOLS: (groupname: string) => `${URL_BASE.BASE}/${PMTOOLS}/list?group=${groupname}`,
        GET_COUNT_FOR_PROBLEM: (problemid: string) => `${URL_BASE.BASE}/${GALLERY}/${GET_COUNT_FOR_PROBLEM}/${problemid}`,
        GET_LIST_PMTOOLS_PAGE: (groupname: string, group : number) => `${URL_BASE.BASE}/${PMTOOLS}/groupsFilter/${groupname}/${group}`,
        GET_COUNT_PMTOOLS_PAGE: (groupname: string, group : number) => `${URL_BASE.BASE}/${PMTOOLS}/groupsFilter/${COUNT}/${groupname}/${group}`,
        GET_LIST_GROUPS: (groupname: string) => `${URL_BASE.BASE}/${PMTOOLS}/groups/${groupname}`,
        UPDATE_BUDGET: (id: any) => `${URL_BASE.BASE}/${BOARD}/update-budget/${id}`,
        GET_CONFIGURATIONS: (key: string) => {
            return `${URL_BASE.BASE}/${CONFIGURATIONS}/${key}`;
        },
        DELETE_NOTE_LIST: (id: any) => {
          return `${URL_BASE.BASE}/${NEW_NOTES}/${COLOR}/${id}`;
        },
        EDIT_NOTE_LIST: (id: any) => {
          return `${URL_BASE.BASE}/${NEW_NOTES}/${COLOR}/${id}`;
        },
        LIST_NOTES: `${URL_BASE.BASE}/${NEW_NOTES}/${NOTE_TYPE}`,
        GET_GROUPS: `${URL_BASE.BASE}/${NEW_NOTES}/${GROUP_TYPE}`,
        
        DELETE_NOTE: (id: any) => {
            return  `${URL_BASE.BASE}/${NEW_NOTES}/${NOTE_TYPE}/${id}`
        },
        DELETE_GROUP: (id: any) => {
            return `${URL_BASE.BASE}/${NEW_NOTES}/${GROUP_TYPE}/${id}`
        },
        EDIT_NOTE: (id: any) => {
            return  `${URL_BASE.BASE}/${NEW_NOTES}/${NOTE_TYPE}/${id}`
        },
        EDIT_GROUP: (id: any) => {
            return `${URL_BASE.BASE}/${NEW_NOTES}/${GROUP_TYPE}/${id}`
        },
        EDIT_ACQUISITION: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${ACQUISITION}/${projectId}`
        },
        EDIT_CAPITAL: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${CAPITAL}/${projectId}`
        },
        EDIT_MAINTENANCE: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${MAINTENANCE}/${projectId}`
        },
        EDIT_SPECIAL: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${SPECIAL}/${projectId}`
        },
        EDIT_STUDY: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${STUDY}/${projectId}`
        },
        EDIT_PROJECT: (projectId: any)=>{
            return  `${URL_BASE.BASE}/${CREATE}/${EDIT_PROJECT}/${projectId}`
        },
        GET_STREAMS_BY_PROJECT: (projectId: any) => {
            return  `${URL_BASE.BASE}/${CREATE}/${GET_STREAMS_BY_PROJ_ID}/${projectId}`
        },
        GET_COMPONENTS_BY_PROJECT: (projectId: any) => {
          return  `${URL_BASE.BASE}/${CREATE}/${GET_COMPONENTS_BY_PROJ_ID}/${projectId}`
        },
        GET_INDEPENDENTCOMPONENTS_BY_PROJECT: (projectId: any) => {
          return  `${URL_BASE.BASE}/${CREATE}/${GET_INDEPENDENTCOMPONENTS_BY_PROJ_ID}/${projectId}`
        }, 
        GET_GEOM_BY_PROJECTID: (projectId: any) => {
          return `${URL_BASE.BASE}/${BOARD}/coordinates/${projectId}`
        },
        GET_BBOX_PROJECTID: (projectId: any) => {
            return `${URL_BASE.BASE}/${PROJECT}/${BBOX}/${projectId}`
        },
        PROJECT_COST_OVERHEAD: (projectId: any) => {
            return `${URL_BASE.BASE}/${PROJECT}/${PROJECT_COST}/${projectId}`
        },
        GET_FINANCIAL_BY_ID: (projectId: any) => {
            return `${URL_BASE.BASE}/${FINANCIAL}/${GET_COSTS_BY_ID}/${projectId}`
        },
        SAVE_BUSINESS_ADRESS_AND_CONTACT: (id: string | number) =>`${URL_BASE.BASE}/${BUSINESS}/business-address-and-contact/${id}`,
        UPDATE_BUSINESS_ADRESS_AND_CONTACT: (idaddress: string | number, idcontact: string|number) =>`${URL_BASE.BASE}/${BUSINESS}/business-address-and-contact/${idaddress}/${idcontact}`,
        GET_ATTACHMENTS_BY_PROJECT: (projectId: any) => {
            return `${URL_BASE.BASE}/${ATTACHMENT}/${BY_PROJECT}/${projectId}`
        },
        GET_BBOX_PROJECTS: `${URL_BASE.BASE}/${BOARD}/${PROJECTS_BBOX}`,
        BOARD_PROJECT_COST: (board_project_id: string | number) => {
            return `${URL_BASE.BASE}/${BOARD_PROJECT}/${board_project_id}/${COST}?rnd=${Math.random()}`
        },
        BOARD_UPDATE_RANK: (board_project_id: string) => `${URL_BASE.BASE}/${BOARD_PROJECT}/${board_project_id}/update-rank`,
        BOARD_UPDATE_TARGET_COST: (board_id: string) => `${URL_BASE.BASE}/${BOARD_PROJECT}/${board_id}/update-target-cost`
    }
})();
