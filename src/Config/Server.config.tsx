const URL = process.env.REACT_APP_API_URI;
export const SERVER = (function () {
    const URL_BASE = {
        BASE: URL
    }
    const USER = 'users';
    const AUTH = 'auth';
    const LOGIN = 'login';
    const PROJECT = 'projects';
    const CREATEPROJECTDEBRIS = 'createMaintenanceDebris';
    const CREATEPROJECTCAPITAL = 'createCapital';
    const CREATEPROJECTACQUISITION = 'createAcquisition';
    return {
        URL_BASE: URL_BASE.BASE,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
        CREATEPROJECTDEBRIS: `${URL_BASE.BASE}/${PROJECT}/${CREATEPROJECTDEBRIS}`,
        CREATEPROJECTCAPITAL: `${URL_BASE.BASE}/${PROJECT}/${CREATEPROJECTCAPITAL}`,
        CREATEPROJECTACQUISITION: `${URL_BASE.BASE}/${PROJECT}/${CREATEPROJECTACQUISITION}`,
    }
})();