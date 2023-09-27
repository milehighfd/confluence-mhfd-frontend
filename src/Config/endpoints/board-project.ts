const BASE_URL = process.env.REACT_APP_API_URI;

const RESOURCE = 'board-project';

const ENDPOINT_COST = 'cost';
const ENDPOINT_GET_COST_MAINTENANCE = 'getCostsMaintenance';
const ENDPOINT_UPDATE_RANK = 'update-rank';
const ENDPOINT_UPDATE_TARGET_COST = 'update-target-cost';

export const GET_COSTS_FOR_MAINTENANCE = `${BASE_URL}/${RESOURCE}/${ENDPOINT_GET_COST_MAINTENANCE}`;
export const BOARD_PROJECT_COST = (board_project_id: string | number) => {
    return `${BASE_URL}/${RESOURCE}/${board_project_id}/${ENDPOINT_COST}?rnd=${Math.random()}`
};
export const BOARD_UPDATE_RANK = (board_project_id: string) => `${BASE_URL}/${RESOURCE}/${board_project_id}/${ENDPOINT_UPDATE_RANK}`;
export const BOARD_UPDATE_TARGET_COST = `${BASE_URL}/${RESOURCE}/${ENDPOINT_UPDATE_TARGET_COST}`;
