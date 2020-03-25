const URL = process.env.REACT_APP_API_URI;
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
    const LIST = 'list';
    const CHANGE_USER_STATE = 'change-user-state';
    const EDIT_USER = 'edit-user';
    const FILTER_PROJECT = 'filters';
    return {
        URL_BASE: URL_BASE.BASE,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
        ME: `${URL_BASE.BASE}/${USER}/${ME}`,
        GRAPHQL:`${URL_BASE.BASE}/${GRAPHQL}`, 
        UPLOAD_FILE: `${URL_BASE.BASE}/${ATTACHMENT}/${UPLOAD_FILE}`,
        PROJECT: `${URL_BASE.BASE}/${PROJECT}`,
        FILTER_PROJECT: `${URL_BASE.BASE}/${PROJECT}/${FILTER_PROJECT}`,
        CREATE_PROJECT: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT}`,
        CREATE_PROJECT_DEBRIS: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_DEBRIS}`,
        CREATE_PROJECT_CAPITAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_CAPITAL}`,
        CREATE_PROJECT_ACQUISITION: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_ACQUISITION}`,
        CREATE_PROJECT_SPECIAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_SPECIAL}`,
        CREATE_PROJECT_STUDY_MASTER: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_MASTER}`,
        CREATE_PROJECT_STUDY_FHAD: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_FHAD}`,
        LIST_USERS: `${URL_BASE.BASE}/${ADMIN}/${LIST}`,
        CHANGE_USER_STATE: `${URL_BASE.BASE}/${ADMIN}/${CHANGE_USER_STATE}`,
        EDIT_USER: `${URL_BASE.BASE}/${ADMIN}/${EDIT_USER}`,
    }
})();