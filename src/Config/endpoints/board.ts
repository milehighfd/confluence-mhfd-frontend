const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'board';

const ENDPOINT_FILTERS = 'filters';
const ENDPOINT_BOARD_FOR_POSITIONS = 'board-for-positions2';
const ENDPOINT_GET_OR_CREATE = 'get-or-create';
const ENDPOINT_BOARDS = 'boards';

export const GET_FILTER = (id: number) => `${BASE_URL}/${RESOURCE}/${id}/${ENDPOINT_FILTERS}`;
export const BOARD_FOR_POSITIONS = `${BASE_URL}/${RESOURCE}/${ENDPOINT_BOARD_FOR_POSITIONS}`;
export const GET_OR_CREATE = `${BASE_URL}/${RESOURCE}/${ENDPOINT_GET_OR_CREATE}`;
export const UPDATE_BOARD_BY_ID = (id: number) => `${BASE_URL}/${RESOURCE}/${id}`;
export const GET_BOARD_DEPENDENCIES = (id: number) => `${BASE_URL}/${RESOURCE}/${id}/${ENDPOINT_BOARDS}/${'WORK_REQUEST'}`;
