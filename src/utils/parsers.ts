import { ADMIN_STAFF, CIVIL_CONTRACTOR, DEVELOPER, ESTIMATED_COST, LANDSCAPE_CONTRACTOR, MHFD_LEAD, MHFD_SUPPORT, PARTNER_MAP, SPONSOR_ID, STAFF_ROL_MAP } from '../constants/databaseConstants';

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
  return projectStreams?.reduce((accumulator: string, st: any) => {
    const stream = st?.stream?.stream_name || '';
    let value = accumulator;
    if (stream) {
      if (value) {
        value += ',';
      }
      value += stream;
    } 
    return value;
  }, '');
};

export const getTotalEstimatedCost = (projectCosts: any) => {
  return projectCosts?.reduce((accumulator: number, pl: any) => {
    let sum = accumulator;
    if (pl.code_cost_type_id === ESTIMATED_COST) {
      sum += pl.cost;
    }
    return sum;
  }, 0);
};

export const getVendors = (projectPartners: any) => {
  const validIds = [DEVELOPER, CIVIL_CONTRACTOR, LANDSCAPE_CONTRACTOR];
  return projectPartners.filter((pp: any) => validIds.includes(pp.code_partner_type_id))
    .map((pp: any) => {
    return {
      type: PARTNER_MAP[pp.code_partner_type_id] || '',
      name: pp?.business_associate?.business_name || '',
      key: pp?.project_partner_id || -1
    }
  });
};;


export const getTeam = (projectStaffs: any) => {
  const validIds = [MHFD_LEAD, MHFD_SUPPORT, ADMIN_STAFF];
  return projectStaffs.filter((ps: any) => validIds.includes(ps.code_project_staff_role_type_id) && ps.is_active)
    .map((ps: any) => {
      return {
        fullName: ps?.mhfd_staff?.full_name || 'N/A',
        roleType: STAFF_ROL_MAP[ps.code_project_staff_role_type_id],
        key: ps?.project_staff_id,
        organization: ps?.mhfd_staff?.user?.organization || 'N/A',
      }
    });
};
