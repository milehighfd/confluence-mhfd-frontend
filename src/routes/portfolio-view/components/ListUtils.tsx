import * as datasets from "./../../../Config/datasets";
import { SERVER } from "./../../../Config/Server.config";

export const getListProjects =  async (groupname: string, currentTabId: number, sortValue: any, withFavorites: boolean, userId: any) => {
  let filterTab = '';
  if (currentTabId) {
    filterTab = `&code_project_type_id=${currentTabId}`
  }
  let sortValues = '';
  if(sortValue?.order) {
    sortValues = `&sortby=${sortValue.columnKey}&order=${sortValue.order}`
  }
  let favoritesValue = '';
  if(userId && withFavorites) {
    favoritesValue = `&favorites=${withFavorites}&_id=${userId}`
  }
  let projects = await datasets.getData(SERVER.GET_LIST_PMTOOLS(groupname) + filterTab + sortValues + favoritesValue, datasets.getToken());
  return projects;
}
export const getGroupList = async (groupname: string) => {
  let listgroup = await datasets.getData(SERVER.GET_LIST_GROUPS(groupname), datasets.getToken());
  return listgroup;
}
export const DEFAULT_GROUP = 'status';
