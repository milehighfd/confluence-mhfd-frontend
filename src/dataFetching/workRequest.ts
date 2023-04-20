import { BoardDataRequest, boardType } from 'Components/Work/Request/RequestTypes';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

export const getLocalitiesByBoardType = (type: boardType) => {
  return datasets.getData(`${SERVER.URL_BASE}/locality/${type}`, datasets.getToken());
};

export const getBoardData = (data: BoardDataRequest) => {
  return datasets.postData(`${SERVER.URL_BASE}/board/`, data);
};

export const getBoardData2 = async (data: BoardDataRequest) => {
  let totalProjects: Array<any> = [];
  let newBoardData: any = {};
  for (let index = 0; index < 6; index++) {
    data.position = `position${index}`;
    const parsed = await datasets.postData(`${SERVER.URL_BASE}/board/board-for-positions`, data);
    totalProjects.push(parsed);
  }
  if (totalProjects.length > 0) {
    newBoardData = {
      board: totalProjects[0].board,
      projects: totalProjects.map((element: any) => element.projects).flat(),
    };
  } else {
    newBoardData = {
      board: data,
      projects: [],
    };
  }
  newBoardData.projects = newBoardData.projects.filter(
    (value: any, index: any, self: any) => index === self.findIndex((t: any) => t.project_id === value.project_id),
  );
  return newBoardData;
};
