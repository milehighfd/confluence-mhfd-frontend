import { ADMIN_STAFF, CIVIL_CONTRACTOR, CONSULTANT_ID, DEVELOPER, ESTIMATED_COST, LANDSCAPE_CONTRACTOR, MHFD_LEAD, MHFD_SUPPORT, PARTNER_MAP, REQUESTOR_ID, SPONSOR_ID, STAFF_ROL_MAP } from '../constants/databaseConstants';

export const getSponsors = (projectPartners: any) => {
  const sponsors = projectPartners.reduce((accumulator: string, current: any) => {
    const sa = current?.business_associate?.business_name || '';
    let value = accumulator;
    if (sa && current.code_partner_type_id === SPONSOR_ID) {
      if (value) {
        value += ',';
      }
      value += sa;
    }  
    return value;
  }, '');
  return sponsors;
};

export const getJurisdictions = (projectLocalGovernment: any) => {
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
  return jurisdictions;
};

export const getServiceAreas = (serviceAreas: any) => {
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
  return projectCosts[0].cost;
}
  // return projectCosts?.reduce((accumulator: number, pl: any) => {
  //   let sum = accumulator;
  //   if (pl.code_cost_type_id === ESTIMATED_COST) {
  //     sum += pl.cost;
  //   }
  //   return sum;
  // }, 0);
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
  const validIds = [MHFD_LEAD, MHFD_SUPPORT, ADMIN_STAFF];
  console.log('aca', projectStaffs)
  const sortStaffs = projectStaffs.filter((ps: any) => validIds.includes(ps.code_project_staff_role_type_id) && ps.is_active)
    .map((ps: any) => {
      return {
        fullName: ps?.business_associate_contact?.contact_name || 'N/A',
        roleType: STAFF_ROL_MAP[ps.code_project_staff_role_type_id],
        key: ps?.project_staff_id,
        organization: ps?.business_associate_contact?.user?.organization || 'N/A',
        roleId: ps?.code_project_staff_role_type_id
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
