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
    const PROJECT = 'projects';
    const PROBLEMS = 'problems';
    const ATTACHMENT = 'attachments';
    const CREATE_PROJECT = 'create';
    const FILTERS = 'filters';
    // const PROBLEMTYPE = 'projecttype';
    const PROJECT_FILTERS = 'project-filter';
    const CREATE_PROJECT_DEBRIS = 'createMaintenanceDebris';
    const CREATE_PROJECT_CAPITAL = 'createCapital';
    const CREATE_PROJECT_ACQUISITION = 'createAcquisition';
    const CREATE_PROJECT_SPECIAL = 'createSpecial';
    const CREATE_PROJECT_STUDY_MASTER = 'createStudyMasterPlan';
    const CREATE_PROJECT_STUDY_FHAD = 'createStudyFHAD';
    const GALLERY_PROBLEMS = 'gallery?isproblem=true';
    const GALLERY_PROJECTS = 'gallery?';
    const GALLERY = 'gallery';
    const ZOOMAREA = 'zoomarea'
    const COMPONENT_COUNTER = 'component-counter';
    const GRAPHQL = 'graphql';
    const UPLOAD_FILE = 'upload-file';
    const ME = 'me';
    const ADMIN = 'admin';
    const MAP = 'map';
    // const LIST = 'list';
    const CHANGE_USER_STATE = 'change-user-state';
    const EDIT_USER = 'edit-user';
    const FILTER_PROJECT = 'filters';
    const SIGN_UP = 'signup';
    const RECOVERY_PASSWORD = 'recovery-password';
    const RESET_PASSWORD = 'reset-password';
    const LIST_USERS_ACTIVATED = 'list?';
    const LIST_USERS_PENDING = 'list?pending=false&';
    const CREATORS = 'creators';
    const FILTER_BY_FIELD = 'filter-by-field';
    const FILTER_BY_USER_CREATOR = 'filters-by-creator';
    const UPLOAD_PHOTO = 'upload-photo';
    const USER_ACTIVITY = 'user-activity';
    const COUNT_PROJECTS_BY_CREATOR = 'counter-projects-by-creator';
    const USER_ACTIVITY_CSV = 'user-activity/csv';
    const GET_ALL = 'get-all?';
    const UPDATE = 'update';
    const DRIVE = 'drive';
    const GET_IMAGE_DRIVE = 'get-images-drive';
    const GET_POSITION = 'get-position';
    const GET_FILES = 'get-files';
    const REMOVE = 'remove'
    const PROBLEM_BY_ID = 'problem-by-id';
    const PROJECT_BY_ID = 'project-by-id';
    const GROUP_COLUMNS = 'group-by';
    const PARAM_FILTERS = 'params-filters';
    const COMPONENTS_BY_ENTITYID = 'components-by-entityid';
    const SEARCH = 'search';
    const V2 = 'v2';
    const BY_COMPONENTS = 'by-components';
    const DETAILED_PAGE = 'detailed-page';
    const GROUP_ORGANIZATION = 'group-organization';
    const DELETE_USER = 'delete-user';
    const PARAM_FILTER_PROJECTS = 'params-filter-projects';
    const PARAM_FILTER_PROBLEMS = 'params-filter-problems';
    const PARAM_FILTER_COMPONENTS = 'params-filter-components';
    const GET_ZOOMAREA_FILTER = 'get-zoom-filter';
    const BBOX_COMPONENTS = 'bbox-components';
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
        GALLERY_PROBLEMS: `${URL_BASE.BASE}/${GALLERY_PROBLEMS}`,
        MAP_TABLES: `${URL_BASE.BASE}/${MAP}`,
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
        USER_ACTIVITY_CSV: `${URL_BASE.BASE}/${ADMIN}/${USER_ACTIVITY_CSV}`,
        COUNT_PROJECTS_BY_CREATOR: `${URL_BASE.BASE}/${PROJECT}/${COUNT_PROJECTS_BY_CREATOR}`,
        UPDATE_USER_INFORMATION: `${URL_BASE.BASE}/${USER}/${UPDATE}`,
        GET_IMAGE_DRIVE: `${URL_BASE.BASE}/${DRIVE}/${GET_IMAGE_DRIVE}`,
        GET_INITIAL_MAP_VIEW: `${URL_BASE.BASE}/${USER}/${GET_POSITION}`,
        GET_ALL_ATTACHMENTS: `${URL_BASE.BASE}/${ATTACHMENT}/${GET_FILES}`,
        DELETE_ATTACHMENT: `${URL_BASE.BASE}/${ATTACHMENT}/${REMOVE}`,
        PROBLEM_BY_ID: `${URL_BASE.BASE}/${GALLERY}/${PROBLEM_BY_ID}`,
        PROJECT_BY_ID: `${URL_BASE.BASE}/${GALLERY}/${PROJECT_BY_ID}`,
        PARAM_FILTERS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTERS}`,
        GROUP_COLUMNS: `${URL_BASE.BASE}/${GALLERY}/${GROUP_COLUMNS}`,
        COMPONENTS_BY_ENTITYID: `${URL_BASE.BASE}/${GALLERY}/${COMPONENTS_BY_ENTITYID}`,
        GET_FILTER_COMPONENTS_FOR_PROBLEMS: `${URL_BASE.BASE}/${FILTERS}`,
        GET_FILTER_PROBLEMTYPE_FOR_PROJECTS: `${URL_BASE.BASE}/${FILTERS}/${PROJECT_FILTERS}`,
        SEARCH_KEYWORD_PROJECTS: `${URL_BASE.BASE}/${FILTERS}/${SEARCH}/${PROJECT}`,
        SEARCH_KEYWORD_PROBLEMS: `${URL_BASE.BASE}/${FILTERS}/${SEARCH}/${PROBLEMS}`,
        FILTER_BY_COMPONENTS: `${URL_BASE.BASE}/${FILTERS}/${V2}/${BY_COMPONENTS}`,
        MAP_SEARCH: `${URL_BASE.BASE}/${MAP}/${SEARCH}`,
        // GROUP_ORGANIZATION: `${URL_BASE.BASE}/${GALLERY}/${GROUP_ORGANIZATION}`,
        GROUP_ORGANIZATION: `${URL_BASE.BASE}/${ZOOMAREA}/complete`,
        DELETE_USER: `${URL_BASE.BASE}/${ADMIN}/${DELETE_USER}`,
        PARAM_FILTER_PROJECTS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_PROJECTS}`,
        PARAM_FILTER_PROBLEMS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_PROBLEMS}`,
        PARAM_FILTER_COMPONENTS: `${URL_BASE.BASE}/${GALLERY}/${PARAM_FILTER_COMPONENTS}`,
        GET_ZOOMAREA_FILTER: `${URL_BASE.BASE}/${ZOOMAREA}/${GET_ZOOMAREA_FILTER}`,
        BBOX_COMPONENTS: `${URL_BASE.BASE}/${MAP}/${BBOX_COMPONENTS}`
    }
})();