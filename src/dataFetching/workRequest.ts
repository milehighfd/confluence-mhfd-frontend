import { BoardDataRequest, boardType } from 'Components/Work/Request/RequestTypes';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

export const getLocalitiesByBoardType = (type: boardType) => {
  return datasets.getData(`${SERVER.URL_BASE}/locality/${type}`, datasets.getToken());
};

export const getBoardData = (data: BoardDataRequest) => {
  return datasets.postData(`${SERVER.URL_BASE}/board/`, data);
};

export const getBoardData2 = (data: BoardDataRequest) => {
  return datasets.postData(`${SERVER.URL_BASE}/board/board-for-positions`, data);
};
