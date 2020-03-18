const URL = process.env.REACT_APP_API_URI;
export const SERVER = (function () {
    const URL_BASE = {
        BASE: URL
    }
    const USER = 'users';
    const AUTH = 'auth';
    const LOGIN = 'login';
    const PROJECT = 'projects';
    const CREATE_PROJECT_DEBRIS = 'createMaintenanceDebris';
    const CREATE_PROJECT_CAPITAL = 'createCapital';
    const CREATE_PROJECT_ACQUISITION = 'createAcquisition';
    const CREATE_PROJECT_SPECIAL = 'createSpecial';
    const CREATE_PROJECT_STUDY_MASTER = 'createStudyMasterPlan';
    const CREATE_PROJECT_STUDY_FHAD = 'createStudyFHAD';
    return {
        URL_BASE: URL_BASE.BASE,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
        CREATE_PROJECT_DEBRIS: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_DEBRIS}`,
        CREATE_PROJECT_CAPITAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_CAPITAL}`,
        CREATE_PROJECT_ACQUISITION: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_ACQUISITION}`,
        CREATE_PROJECT_SPECIAL: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_SPECIAL}`,
        CREATE_PROJECT_STUDY_MASTER: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_MASTER}`,
        CREATE_PROJECT_STUDY_FHAD: `${URL_BASE.BASE}/${PROJECT}/${CREATE_PROJECT_STUDY_FHAD}`,
    }
})();