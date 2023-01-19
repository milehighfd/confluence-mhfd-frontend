import * as datasets from "./../../../Config/datasets";
import { SERVER } from "./../../../Config/Server.config";

export const getListProjects =  async (groupname: string, currentTabId: number, sortValue: any) => {
  console.log('reachh erer');
  let filterTab = '';
  if (currentTabId) {
    filterTab = `&code_project_type_id=${currentTabId}`
  }
  let sortValues = '';
  if(sortValue?.order) {
    sortValues = `&sortby=${sortValue.columnKey}&order=${sortValue.order}`
  }
  console.log('sortValues', sortValues, sortValue.order, sortValue);
  let projects = await datasets.getData(SERVER.GET_LIST_PMTOOLS(groupname) + filterTab + sortValues, datasets.getToken());
  return projects;
}
export const getGroupList = async (groupname: string) => {
  let listgroup = await datasets.getData(SERVER.GET_LIST_GROUPS(groupname), datasets.getToken());
  return listgroup;
}
export const DEFAULT_GROUP = 'status';
