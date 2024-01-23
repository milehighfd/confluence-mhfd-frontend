import { ADMIN_STAFF, LG_LEAD, MHFD_LEAD, MHFD_SUPPORT, SPONSOR_ID, STAFF_ROL_MAP } from '../constants/databaseConstants';

export const getSponsors = (projectPartners: any) => {
  projectPartners = projectPartners.reverse();
  const sponsors = projectPartners.reduce((accumulator: string, current: any) => {
    const sa = current?.business_associate?.business_name || '';
    let value = accumulator;
    if (sa && current?.code_project_partner_type?.partner_type  === 'SPONSOR') {
      if (value) {
        value += ',';
      }
      value += sa;
    }  
    return value;
  }, '');
  return sponsors;
};

export const getMainSponsor = (projectPartners: any) => {
  return projectPartners.find((pp: any) => pp?.code_partner_type_id === SPONSOR_ID)?.business_associate?.business_name || '';
};

export const getJurisdictions = (projectLocalGovernment: any) => {
  projectLocalGovernment = projectLocalGovernment.reverse();
  const jurisdictions = projectLocalGovernment.reduce((accumulator: string, current: any) => {
    const sa = current?.CODE_LOCAL_GOVERNMENT?.local_government_name || '';
    let value = accumulator;
    if (sa) {
      if (value) {
        value += ', ';
      }
      value += sa;
    }  
    return value;
  }, '');
  const namesArray = jurisdictions.split(', ');
  namesArray.sort();
  const sortedString = namesArray.join(', ');
  return sortedString;
};

export const getServiceAreas = (serviceAreas: any) => {
  serviceAreas = serviceAreas.reverse();
  return serviceAreas.reduce((accumulator: string, pl: any) => {
    const sa = pl?.CODE_SERVICE_AREA?.service_area_name || '';
    let value = accumulator;
    if (sa) {
      if (value) {
        value += ',';
      }
      value += (sa + ' Service Area');
    } 
    return value;
  }, '');
};

export const getCounties = (projectsCounties: any) => {
  projectsCounties = projectsCounties.reverse();
  return projectsCounties?.reduce((accumulator: string, pl: any) => {
    const county = pl?.CODE_STATE_COUNTY?.county_name || '';
    let value = accumulator;
    if (county) {
      if (value) {
        value += ',';
      }
      value += (county + ' County');
    } 
    return value;
  }, '');
};

export const getStreams = (projectStreams: any) => {
  const streams = projectStreams?.map((st: any) => {
    const stream = st?.stream?.stream_name || '';
    return stream;
  })
  return streams.filter((str1: any, str2: any) => streams.indexOf(str1) === str2);
};

export const getTotalEstimatedCost = (projectCosts: any) => {
  if (projectCosts && projectCosts.length > 0) {
    let estimatedCost = projectCosts.filter((pc: any) => pc.code_cost_type_id === 1);
    return estimatedCost.length > 0 ? estimatedCost[0]?.cost : 0;
  }
  return 0;
};

export const getVendors = (projectPartners: any) => {
  const validIds = "VENDORS";
  return projectPartners.filter((pp: any) => validIds.includes(pp?.code_project_partner_type?.partner_type))
    .map((pp: any) => {
    return {
      type: pp?.code_project_partner_type?.partner_type_name || '',
      name: pp?.business_associate?.business_name || '',
      key: pp?.project_partner_id || -1
    }
  });
};;


export const getTeam = (projectStaffs: any) => {
  const validIds = [MHFD_LEAD, MHFD_SUPPORT, ADMIN_STAFF, LG_LEAD];
  const sortStaffs = projectStaffs.filter((ps: any) => validIds.includes(ps.code_project_staff_role_type_id) && ps.is_active)
    .map((ps: any) => {
      return {
        fullName: ps?.business_associate_contact?.contact_name || 'N/A',
        roleType: STAFF_ROL_MAP[ps.code_project_staff_role_type_id],
        key: ps?.project_staff_id,
        organization: ps?.business_associate_contact?.business_address?.business_associate?.business_name || 'N/A',
        roleId: ps?.code_project_staff_role_type_id,
        user: ps?.user
      }
    });
  return sortStaffs.sort((a: any, b: any) => {
    if (a.roleId === b.roleId) {
      return a.fullName.localeCompare(b.fullName)
    } else {
      return a.roleId - b.roleId
    }
  })
};

export const getCurrentProjectStatus = (project:any) => {
  const current = project?.project_statuses?.find((ps:any) => ps.project_status_id === project.current_project_status_id); 
  return current;
}

  export const getProjectOverheadCost = (costs: any) => {
  const currentOverheadIds = [5,6,7,8,9,10,11,12,13];
  const filteredDataOverhead = costs.filter((element: any) => currentOverheadIds.includes(element.code_cost_type_id));
  //validator for all values
  const validator = currentOverheadIds.map( (element: any)=> {
  const validation = filteredDataOverhead.find((value: any) => value.code_cost_type_id === element);
    if (validation) {
      return validation.cost;
    } else {
      return 0;
    }
  })
  return validator;
};
