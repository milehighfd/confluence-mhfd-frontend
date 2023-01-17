import * as datasets from "./../../../Config/datasets";
import { SERVER } from "./../../../Config/Server.config";

export const getListProjects =  async (groupname: string, currentTabId: number) => {
  let filterTab = '';
  if (currentTabId) {
    filterTab = `&code_project_type_id=${currentTabId}`
  }
  let projects = await datasets.getData(SERVER.GET_LIST_PMTOOLS(groupname) + filterTab, datasets.getToken());
  return projects;
}
export const getGroupList = async (groupname: string) => {
  let listgroup = await datasets.getData(SERVER.GET_LIST_GROUPS(groupname), datasets.getToken());
  return listgroup;
}
export const DEFAULT_GROUP = 'status';
