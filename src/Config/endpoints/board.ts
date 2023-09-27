const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'board';

const ENDPOINT_FILTERS = 'filters';
const ENDPOINT_BOARD_FOR_POSITIONS = 'board-for-positions2';
const ENDPOINT_GET_OR_CREATE = 'get-or-create';
const ENDPOINT_GET_STATUS = 'get-status';
const ENDPOINT_BBOX = 'bbox';

export const GET_FILTER = `${BASE_URL}/${RESOURCE}/${ENDPOINT_FILTERS}`;
export const BOARD_FOR_POSITIONS = `${BASE_URL}/${RESOURCE}/${ENDPOINT_BOARD_FOR_POSITIONS}`;
export const GET_OR_CREATE = `${BASE_URL}/${RESOURCE}/${ENDPOINT_GET_OR_CREATE}`;
export const GET_STATUS = `${BASE_URL}/${RESOURCE}/${ENDPOINT_GET_STATUS}`;
export const BASE_BOARD_RESOURCE_URL = `${BASE_URL}/${RESOURCE}`;
export const BBOX_PROJECT_ID = (id: number) => `${BASE_URL}/${RESOURCE}/${ENDPOINT_BBOX}/${id}`;
