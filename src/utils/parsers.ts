import { SPONSOR_ID } from '../constants/databaseConstants';

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
    const stream = st.stream.stream_name || '';
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
