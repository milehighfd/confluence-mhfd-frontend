const URL = process.env.REACT_APP_API_URI;
export const SERVER = (function () {
    const URL_BASE = {
        BASE: URL
    }
    const USER = 'users';
    const AUTH = 'auth';
    const LOGIN = 'login';
    return {
        URL_BASE: URL_BASE.BASE,
        USER: `${URL_BASE.BASE}/${USER}`,
        AUTH: `${URL_BASE.BASE}/${AUTH}`,
        LOGIN: `${URL_BASE.BASE}/${AUTH}/${LOGIN}`,
    }
})();