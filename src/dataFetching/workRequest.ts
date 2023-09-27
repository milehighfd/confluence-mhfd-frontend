import { BoardDataRequest, boardType } from 'Components/Work/Request/RequestTypes';
import * as datasets from 'Config/datasets';
import { GET_OR_CREATE, GET_STATUS } from 'Config/endpoints/board';
import { SERVER } from 'Config/Server.config';

export const getLocalitiesByBoardType = (type: boardType) => {
  return datasets.getData(`${SERVER.URL_BASE}/locality/${type}?nogeom=true`, datasets.getToken());
};

export const getBoardData = (data: BoardDataRequest) => {
  return datasets.postData(
    GET_OR_CREATE,
    data,
    datasets.getToken()
  );
};

export const getBoardStatus = (data: any) => {
  return datasets.postData(
    GET_STATUS,
    data,
    datasets.getToken()
  );
};
