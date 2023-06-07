const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'board';

const ENDPOINT_FILTERS = 'filters';

export const GET_FILTER = (id: number) => `${BASE_URL}/${RESOURCE}/${id}/${ENDPOINT_FILTERS}`;

