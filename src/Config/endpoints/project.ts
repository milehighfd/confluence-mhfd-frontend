const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'projects';

const ENDPOINT_SHORT_PROJECT_NOTE = 'short_note';

export const UPDATE_SHORT_NOTE_BY_PROJECT_ID = (id: number) => `${BASE_URL}/${RESOURCE}/${id}/${ENDPOINT_SHORT_PROJECT_NOTE}`;
