import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { OptionProjects, OptionComponents } from 'Classes/MapTypes';

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
      // servicearea = filterComponent.servicearea;
    }
  }
  const formattedOptions = {
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
    bounds: coordinates,
    consultant: options.consultant,
    contractor: options.contractor,
    servicearea: servicearea,
    serviceareaComp: filterComponent.servicearea,
    sortby: options.column,
    sorttype: options.order
  }
  if (applyFilter) {
    formattedOptions['bounds'] = coordinates;
  }
  return formattedOptions;
}
