import * as datasets from "./../../../Config/datasets";
import { SERVER } from "./../../../Config/Server.config";

export const getListProjects =  async (page: number, pagesize: number) => {
  let projects = await datasets.getData(SERVER.GET_LIST_PMTOOLS(page, pagesize), datasets.getToken());
  return projects;
}
export const getGroupList = async (groupname: string) => {
  let listgroup = await datasets.getData(SERVER.GET_LIST_GROUPS(groupname), datasets.getToken());
  return listgroup;
}
export const DEFAULT_GROUP = 'status';
