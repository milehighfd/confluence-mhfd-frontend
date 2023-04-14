import * as datasets from "./../../../Config/datasets";
import { SERVER } from "./../../../Config/Server.config";
import { OptionProjects, OptionComponents } from "Classes/MapTypes";

export const getListProjects =  async (groupname: string, currentTabId: number, sortValue: any, withFavorites: boolean, userId: any,
    filtervalue: number, filterby: string, options: any
  ) => {
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
  let specialFilter = '';
  if (filterby && filtervalue && filtervalue !== -1) {
    specialFilter = `&filterby=${filterby}&filtervalue=${filtervalue}`;
  }
  //let projects = await datasets.postData(SERVER.GET_LIST_PMTOOLS(groupname) + filterTab + sortValues + favoritesValue + specialFilter, options ,datasets.getToken());
  let projects: any[] = [];
  return projects;
}
export const getGroupList = async (groupname: string) => {
  let listgroup = await datasets.getData(SERVER.GET_LIST_GROUPS(groupname), datasets.getToken());
  return listgroup;
}
export const DEFAULT_GROUP = 'status';

export const optionsProjects = (options: OptionProjects, filterComponent: OptionComponents, coordinates: string, applyFilter: any) => {
  
  let servicearea = '';
  if (options.servicearea) {
      servicearea = options.servicearea;
  } else {
      if (filterComponent.servicearea) {
          servicearea = filterComponent.servicearea;
      }
  }
  return applyFilter ? {
      name: options.keyword,
      projecttype: options.projecttype,
      status: options.status,
      startyear: options.startyear,
      completedyear: options.completedyear,
      mhfddollarsallocated: options.mhfddollarsallocated,
      lgmanager: options.lgmanager,
      streamname: options.streamname,
      creator: options.creator,
      totalcost: options.totalcost,
      workplanyear: options.workplanyear,
      problemtype: options.problemtype,
      mhfdmanager: options.mhfdmanager,
      jurisdiction: options.jurisdiction,
      county: options.county,
      estimatedcostComp: filterComponent.estimatedcost,
      componenttype: filterComponent.component_type,
      componentstatus: filterComponent.status,
      watershed: options.mhfdmanager,
      jurisdictionComp: filterComponent.jurisdiction,
      countyComp: filterComponent.county,
      yearofstudy: filterComponent.yearofstudy,
      sortby: options.column,
      sorttype: options.order,
      bounds: coordinates,
      consultant: options.consultant,
      contractor: options.contractor,
      servicearea: servicearea 
  } : {
      name: options.keyword,
      projecttype: options.projecttype,
      status: options.status,
      startyear: options.startyear,
      completedyear: options.completedyear,
      mhfddollarsallocated: options.mhfddollarsallocated,
      lgmanager: options.lgmanager,
      streamname: options.streamname,
      creator: options.creator,
      totalcost: options.totalcost,
      workplanyear: options.workplanyear,
      problemtype: options.problemtype,
      mhfdmanager: options.mhfdmanager,
      jurisdiction: options.jurisdiction,
      county: options.county,
      estimatedcostComp: filterComponent.estimatedcost,
      componenttype: filterComponent.component_type,
      componentstatus: filterComponent.status,
      watershed: options.mhfdmanager,
      jurisdictionComp: filterComponent.jurisdiction,
      countyComp: filterComponent.county,
      yearofstudy: filterComponent.yearofstudy,
      consultant: options.consultant,
      contractor: options.contractor,
      servicearea: servicearea, 
      sortby: options.column,
      sorttype: options.order
  }
}