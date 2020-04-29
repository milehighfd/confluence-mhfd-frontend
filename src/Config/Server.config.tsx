const URL = process.env.REACT_APP_API_URI;
const CAPTCHA = process.env.REACT_APP_CAPTCHA;
export const SERVER = (function () {
    const URL_BASE = {
        BASE: URL
    }
    const USER = 'users';
    const AUTH = 'auth';
    const LOGIN = 'login';
    const PROJECT = 'projects';
    const ATTACHMENT = 'attachments';
    const CREATE_PROJECT = 'create';
    const CREATE_PROJECT_DEBRIS = 'createMaintenanceDebris';
    const CREATE_PROJECT_CAPITAL = 'createCapital';
    const CREATE_PROJECT_ACQUISITION = 'createAcquisition';
    const CREATE_PROJECT_SPECIAL = 'createSpecial';
    const CREATE_PROJECT_STUDY_MASTER = 'createStudyMasterPlan';
    const CREATE_PROJECT_STUDY_FHAD = 'createStudyFHAD';
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
    return {
        URL_BASE: URL_BASE.BASE,
        CAPTCHA: CAPTCHA,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
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
        USER_ACTIVITY: `${URL_BASE.BASE}/${USER}/${USER_ACTIVITY}`,
    }
})();