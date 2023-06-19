const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'board';

const ENDPOINT_FILTERS = 'filters';
const ENDPOINT_BOARD_FOR_POSITIONS = 'board-for-positions2';

export const GET_FILTER = (id: number) => `${BASE_URL}/${RESOURCE}/${id}/${ENDPOINT_FILTERS}`;
export const BOARD_FOR_POSITIONS = `${BASE_URL}/${RESOURCE}/${ENDPOINT_BOARD_FOR_POSITIONS}`;
