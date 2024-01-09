import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { loadMenuPopupWithData } from './MapGetters';
import {
  MENU_OPTIONS,
  MHFD_PROJECTS,
  PROJECTS_DRAFT,
  MUNICIPALITIES_FILTERS,
  ROUTINE_NATURAL_AREAS,
  ROUTINE_WEED_CONTROL,
  ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR,
  MEP_PROJECTS_DETENTION_BASINS,
  MEP_PROJECTS_CHANNELS,
  MEP_PROJECTS_STORM_OUTFALLS,
  NRCS_SOILS,
  ALERT_STATION,
  DWR_DAM_SAFETY,
  STREAM_MANAGEMENT_CORRIDORS,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  SEMSWA_SERVICE_AREA,
  ACTIVE_LOMS,
  ADMIN,
  STAFF,
  EFFECTIVE_REACHES,
  COMPONENT_LAYERS,
  STREAM_IMPROVEMENT_MEASURE,
  MAPTYPES,
  ROUTINE_MAINTENANCES,
} from '../../../constants/constants';
import * as datasets from '../../../Config/datasets';
import {
  getDateMep,
  getTitleOfProblemsPart,
  epochTransform,
  parseDateZ,
  getTitleOfStreamImprovements,
  getTitleOfLandUse,
} from './MapFunctionsUtilities';
import { getAlertNameAndIcon, numberWithCommas } from '../../../utils/utils';
import { SERVER } from '../../../Config/Server.config';
import { SPONSOR_ID } from '../../../constants/databaseConstants';
import { getCurrentProjectStatus, getJurisdictions } from '../../../utils/parsers';

const factorKMToMiles = 0.621371;
const factorKMtoFeet = 3280.8;
const factorm2toacre = 0.00024710538146717;

export const measureFunction = (
  e: any,
  map: any,
  coordX: any,
  coordY: any,
  geojsonMeasures: any,
  setIsDrawingMeasure: any,
  linestringMeasure: any,
  finishMeasure: any,
  setDistanceValue: any,
  setAreaValue: any,
  setDistanceValueMi: any,
) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['measure-points'],
  });
  if (e.point.x === coordX || e.point.y === coordY) {
    return;
  }
  coordX = e.point.x;
  coordY = e.point.y;
  if (geojsonMeasures.features.length > 1) geojsonMeasures.features.pop();
  setIsDrawingMeasure(true);
  if (features.length > 0 && linestringMeasure.geometry.coordinates.length > 2) {
    const id = features[0].properties.id;
    geojsonMeasures.features = geojsonMeasures.features.filter((point: any) => point.properties.id !== id);
    finishMeasure();
  } else {
    const point: any = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [e.lngLat.lng, e.lngLat.lat],
      },
      properties: {
        id: String(new Date().getTime()),
      },
    };
    geojsonMeasures.features.push(point);
  }

  if (geojsonMeasures.features.length > 1) {
    linestringMeasure.geometry.coordinates = geojsonMeasures.features.map((point: any) => point.geometry.coordinates);
    geojsonMeasures.features.push(linestringMeasure);
    const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
    const distance = turf.length(newLS);
    setDistanceValue((distance * factorKMtoFeet).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    setDistanceValueMi((distance * factorKMToMiles).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    if (linestringMeasure.geometry.coordinates.length > 3) {
      var polygon = turf.lineToPolygon(JSON.parse(JSON.stringify(newLS)));
      const area = turf.area(polygon);
      setAreaValue((area * factorm2toacre).toLocaleString(undefined, { maximumFractionDigits: 2 }));
    }
  } else if (geojsonMeasures.features.length == 1) {
    setAreaValue('0');
    setDistanceValue('0');
    setDistanceValueMi('0');
  }

  if (map.getSource('geojsonMeasure')) {
    map.getSource('geojsonMeasure').setData(geojsonMeasures);
  }
};
/*
  addPopupAndListeners(
    MAPTYPES.CREATEPROJECTMAP,  maptype: any,
    menuOptions,  menuOptions: any,
    popups,  popups: any,
    user,  userInformation: any,
    test,  getDetailPage: any,
    popup,  popup: any,
    map.map,  map: any,
    showPopup,  showPopup: any,
    seeDetails,  seeDetails: any,
    () => {},  createProject: any,
    () => {},  measureCenterAndDelete: any,
    e,
    ids,
    addRemoveComponent,
    () => {},  openEdit?: any,
    false,  isEditPopup?: any,
    getComponentsFromProjProb,  getComponentsFromProjProb?: any,
  );
*/
export const addPopupAndListeners = (
  maptype: any,
  menuOptions: any,
  popups: any,
  userInformation: any,
  getDetailPage: any,
  popup: any,
  map: any,
  showPopup: any,
  seeDetails: any,
  createProject: any,
  measureCenterAndDelete: any,
  e: any,
  ids: any,
  addRemoveComponent?: any,
  openEdit?: any,
  isEditPopup?: any,
  getComponentsFromProjProb?: any,
) => {
  const eventFunctions = {
    showPopup,
    seeDetails,
    createProject,
    measureCenterAndDelete,
    addRemoveComponent,
    openEdit,
    getComponentsFromProjProb,
    getDetailPage,
  };
  const html = loadMenuPopupWithData(
    menuOptions,
    popups,
    userInformation,
    eventFunctions,
    isEditPopup,
    undefined,
    maptype,
    ids,
  );
  if (html) {
    popup
      .setLngLat(e.lngLat)
      .setDOMContent(html)
      .addTo(map);
  }
};
const formatterIntegers = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
export const addPopupServiceCountyMunicipality = (
  menuOptions: any,
  popups: any,
  userInformation: any,
  searchPopup: any,
  map: any,
  showPopup: any,
  seeDetails: any,
  createProject: any,
  ids: any,
  coord: any,
  searchMarker: any,
  setKeyword: any,
  setMarkerGeocoder: any,
) => {
  const eventFunctions = {
    showPopup,
    seeDetails,
    createProject,
  };
  const html = loadMenuPopupWithData(
    menuOptions,
    popups,
    userInformation,
    eventFunctions,
    undefined,
    undefined,
    undefined,
    ids,
  );
  if (html) {
    if (searchPopup.isOpen()) {
      searchPopup.remove();
    }
    searchPopup = new mapboxgl.Popup({ closeButton: true });
    searchPopup
      .setLngLat(coord)
      .setDOMContent(html)
      .addTo(map);
    searchMarker.setPopup(searchPopup);
    searchMarker.addTo(map);
    searchMarker.togglePopup();
    searchPopup.once('close', () => {
      searchMarker.remove();
      setKeyword('');
      setMarkerGeocoder(undefined);
    });
    setMarkerGeocoder(searchMarker);
  }
};
export const addPopupsOnClick = async (
  map: any,
  bbox: any,
  allLayers: any,
  coordX: any,
  coordY: any,
  e: any,
  mobile: any,
  menuOptions: any,
  popups: any,
  mobileIds: any,
  ids: any,
  userInformation: any,
  getComponentsByProjid: any,
  setCounterPopup: any,
  componentsList: any,
  mapType?: any,
) => {
  let features = map.queryRenderedFeatures(bbox, { layers: allLayers });
  coordX = e.point.x;
  coordY = e.point.y;
  const search = (id: number, source: string) => {
    // Gets only the first feature of the layers
    // one feature may be in multiple layers
    let index = 0;
    for (const feature of features) {
      if (feature.properties.cartodb_id === id && source === feature.source) {
        return index;
      }
      index++;
    }
    return -1;
  };
  if (mapType !== MAPTYPES.WORKREQUEST) {
    const popupsClassess = document.getElementsByClassName('mapboxgl-popup');
    if (popupsClassess.length) {
      for (let i = 0; i < popupsClassess.length; ++i) {
        popupsClassess[i].remove();
      }
    }
  }

  features = features.filter((element: any, index: number) => {
    return search(element.properties.cartodb_id, element.source) === index;
  });
  features.sort((a: any, b: any) => {
    if (a.source.includes('project')) {
      return -1;
    }
    if (b.source.includes('project')) {
      return 1;
    }
    if (a.source.includes('problem')) {
      return -1;
    }
    if (b.source.includes('problem')) {
      return 1;
    }
    return a.source
      .split('_')
      .join(' ')
      .localeCompare(b.source.split('_').join(' '));
  });
  for (const feature of features) {
    if (feature.layer.id.includes('_line') && feature.layer.type === 'symbol') {
      continue;
    }
    let itemValue;
    if (
      feature.source === 'projects_polygon_' ||
      feature.source === MHFD_PROJECTS ||
      feature.source.includes(PROJECTS_DRAFT)
    ) {
      const projectidfeature = feature.properties.projectid;
      if (mapType !== MAPTYPES.WORKREQUEST) {
        getComponentsByProjid(feature.properties.projectid, setCounterPopup);
      }
      //TO DO: create endpoint to get data for project draft from db if necessary
      let item;
      const dataFromDB = await datasets.getData(SERVER.V2_DETAILED_PAGE(projectidfeature), datasets.getToken());
      const sponsors = dataFromDB?.project_partners
        .filter((pp: any) => {
          return pp.code_partner_type_id === SPONSOR_ID;
        })
        ?.map((sps: any) => sps.business_associate?.business_name);
      const estimatedcost = dataFromDB?.estimatedCost?.length ? dataFromDB?.estimatedCost[0] : '-';
      const componentcost = dataFromDB?.componentcost?.length ? dataFromDB?.componentcost[0] : '-';

      if (feature.source === PROJECTS_DRAFT + 'draft') {
        item = {
          type: 'projectDraft',
          title: dataFromDB?.code_project_type?.project_type_name
            ? dataFromDB?.code_project_type?.project_type_name
            : MENU_OPTIONS.PROJECT,
          name: dataFromDB.project_name ? dataFromDB.project_name : '-',
          organization: sponsors.join(','),
          value: estimatedcost ? estimatedcost : componentcost ? componentcost : 0,
          projecctype: dataFromDB?.code_project_type?.project_type_name,
          status_displayed: feature.layer.metadata.project_status,
          status: getCurrentProjectStatus(dataFromDB)?.code_phase_type?.code_status_type?.status_name,
          objectid: dataFromDB?.codeStateCounty?.objectid,
          // TODO component_count
          component_count: parseInt(
            dataFromDB?.GRADE_CONTROL_STRUCTURE +
            dataFromDB?.PIPE_APPURTENANCES +
            dataFromDB?.SPECIAL_ITEM_POINT +
            dataFromDB?.SPECIAL_ITEM_LINEAR +
            dataFromDB?.SPECIAL_ITEM_AREA +
            dataFromDB?.CHANNEL_IMPROVEMENTS_LINEAR +
            dataFromDB?.CHANNEL_IMPROVEMENTS_AREA +
            dataFromDB?.REMOVAL_LINE +
            dataFromDB?.REMOVAL_AREA +
            dataFromDB?.STORM_DRAIN +
            dataFromDB?.DETENTION_FACILITIES +
            dataFromDB?.MAINTENANCE_TRAILS +
            dataFromDB?.LAND_ACQUISITION +
            dataFromDB?.LANDSCAPING_AREA,
          ),
          valueid: feature.properties.cartodb_id,
          project_id: dataFromDB.project_id,
          streamname: feature.properties.streamname, // TODO streamname
          isEditPopup: feature.source === PROJECTS_DRAFT + 'draft',
          popupId: 'popupWR',
          mapType: mapType ? mapType : 'MAINMAP',
        };
      } else {
        item = {
          type: 'project',
          title: dataFromDB?.code_project_type?.project_type_name
            ? dataFromDB?.code_project_type?.project_type_name
            : MENU_OPTIONS.PROJECT,
          name: dataFromDB.project_name ? dataFromDB.project_name : '-',
          organization: sponsors.join(','),
          jurisdiction: getJurisdictions(dataFromDB.project_local_governments),
          value: estimatedcost ? estimatedcost : componentcost ? componentcost : 0,
          projecctype: dataFromDB?.code_project_type?.project_type_name,
          code_project_type: dataFromDB?.code_project_type?.code_project_type_id,
          status: getCurrentProjectStatus(dataFromDB)?.code_phase_type?.code_status_type?.status_name,
          objectid: dataFromDB?.codeStateCounty?.objectid,
          // TODO component_count
          component_count: parseInt(
            dataFromDB?.GRADE_CONTROL_STRUCTURE +
            dataFromDB?.PIPE_APPURTENANCES +
            dataFromDB?.SPECIAL_ITEM_POINT +
            dataFromDB?.SPECIAL_ITEM_LINEAR +
            dataFromDB?.SPECIAL_ITEM_AREA +
            dataFromDB?.CHANNEL_IMPROVEMENTS_LINEAR +
            dataFromDB?.CHANNEL_IMPROVEMENTS_AREA +
            dataFromDB?.REMOVAL_LINE +
            dataFromDB?.REMOVAL_AREA +
            dataFromDB?.STORM_DRAIN +
            dataFromDB?.DETENTION_FACILITIES +
            dataFromDB?.MAINTENANCE_TRAILS +
            dataFromDB?.LAND_ACQUISITION +
            dataFromDB?.LANDSCAPING_AREA,
          ),
          valueid: feature.properties.cartodb_id,
          project_id: dataFromDB.project_id,
          streamname: feature.properties.streamname, // TODO streamname
          isEditPopup: feature.source === PROJECTS_DRAFT,
          popupId: 'popup',
        };
      }
      mobile.push({
        type: 'project',
        name: item.name,
        value: item.value,
        projecttype: item.projecctype,
        id: item.project_id,
        objectid: item.objectid,
        valueid: item.valueid,
        streamname: item.streamname,
      });
      itemValue = { ...item };
      menuOptions.push(MENU_OPTIONS.PROJECT);
      popups.push(itemValue);
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === MENU_OPTIONS.PROBLEMS_BOUNDARY) {
      const count = await datasets.getData(SERVER.GET_COUNT_FOR_PROBLEM(feature.properties.problem_id));
      const item = {
        type: MENU_OPTIONS.PROBLEMS,
        streamname: feature.properties.streamname,
        title: feature.properties.problem_type ? feature.properties.problem_type + ' Problem' : '-',
        problem_type: feature.properties.problem_type ? feature.properties.problem_type : '-',
        name: feature.properties.problem_name ? feature.properties.problem_name : '-',
        organization: feature.properties.local_government ? feature.properties.local_government : '-',
        value: feature.properties.estimated_cost
          ? feature.properties.estimated_cost
          : feature.properties.component_cost
            ? feature.properties.component_cost
            : '-1',
        status: feature.properties.component_status ? feature.properties.component_status + '%' : '-',
        priority: feature.properties.problem_severity ? feature.properties.problem_severity + ' Priority' : '-',
        problemid: feature.properties.problem_id,
        component_count: count.data ?? 0,
        popupId: 'popup',
        image: `gallery/${feature.properties.problem_type}.png`,
      };
      itemValue = { ...item };
      mobile.push({
        type: MENU_OPTIONS.PROBLEMS,
        title: item.title,
        value: item.value,
        name: item.name,
        image: item.image,
        problemid: item.problemid,
        streamname: item.streamname,
      });
      menuOptions.push('Problem: ' + item.problem_type);
      popups.push(itemValue);
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'mep_projects_temp_locations') {
      const item = {
        layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-',
      };
      menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        proj_name: item.feature,
        mep_status: item.mepstatus,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'mep_projects_temp_locations') {
      const item = {
        layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-',
      };
      menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        proj_name: item.feature,
        mep_status: item.mepstatus,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === MEP_PROJECTS_DETENTION_BASINS) {
      const item = {
        layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
        feature: feature.properties.mhfd_projectname ? feature.properties.mhfd_projectname : '-',
        pondname: feature.properties.mhfd_detentionname ? feature.properties.mhfd_detentionname : '-',
        onbaseId: feature.properties.onbaseid ? feature.properties.onbaseid : '-',
        mhfd_projectstatus: feature.properties.mhfd_projectstatus ? feature.properties.mhfd_projectstatus : '-',
        designApprovalDate: feature.properties.mhfd_designapprovaldate ? feature.properties.mhfd_designapprovaldate : '-',
        constructionApprovalDate: feature.properties.mhfd_constructionapprovaldate ? feature.properties.mhfd_constructionapprovaldate : '-', 
        finalacceptancedate: feature.properties.mhfd_finalacceptancedate ? feature.properties.mhfd_finalacceptancedate : '-',
        mhfd_ineligibledate: feature.properties.mhfd_ineligibledate ? feature.properties.mhfd_ineligibledate : '-',
        // projectno: feature.properties.projectno ? feature.properties.projectno : '-',
        // mep_eligibilitystatus: feature.properties.mep_eligibilitystatus
        //   ? feature.properties.mep_eligibilitystatus
        //   : '-',
        // mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
        mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
        mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties),
      };
      menuOptions.push(MENU_OPTIONS.MEP_DETENTION_BASIN);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        proj_name: item.feature,
        // mep_status: item.mep_eligibilitystatus,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === MEP_PROJECTS_CHANNELS) {
      const item = {

        // Onbase Project Number: {onbaseid}
        // MEP Status: {mhfd_projectstatus}
        // Design Approval Date: {mhfd_designapprovaldate}
        // Construction Approval Date: {mhfd_constructionapprovaldate}
        // Final Acceptance Date: {mhfd_finalacceptancedate}
        // Ineligible Date: {mhfd_ineligibledate}
        // Service Area: {mhfd_servicearea}

        layer: MENU_OPTIONS.MEP_CHANNEL,
        feature: feature.properties.mhfd_projectname ? feature.properties.mhfd_projectname : '-',
        onbaseId: feature.properties.onbaseid ? feature.properties.onbaseid : '-',
        mhfd_projectstatus: feature.properties.mhfd_projectstatus ? feature.properties.mhfd_projectstatus : '-',
        designApprovalDate: feature.properties.mhfd_designapprovaldate ? feature.properties.mhfd_designapprovaldate : '-',
        constructionApprovalDate: feature.properties.mhfd_constructionapprovaldate ? feature.properties.mhfd_constructionapprovaldate : '-', 
        finalacceptancedate: feature.properties.mhfd_finalacceptancedate ? feature.properties.mhfd_finalacceptancedate : '-',
        mhfd_ineligibledate: feature.properties.mhfd_ineligibledate ? feature.properties.mhfd_ineligibledate : '-',

        // projectno: feature.properties.projectno ? feature.properties.projectno : '-',
        // mep_eligibilitystatus: feature.properties.mep_eligibilitystatus
        //   ? feature.properties.mep_eligibilitystatus
        //   : '-',
        // mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
        // pondname: feature.properties.pondname ? feature.properties.pondname : '-',
        mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
        mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties),
      };
      menuOptions.push(MENU_OPTIONS.MEP_CHANNEL);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        proj_name: item.feature,
        // mep_status: item.mep_eligibilitystatus,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === MEP_PROJECTS_STORM_OUTFALLS) {
      const item = {
        layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
        feature: feature.properties.mhfd_projectname ? feature.properties.mhfd_projectname : '-',
        onbaseId: feature.properties.onbaseid ? feature.properties.onbaseid : '-',
        mhfd_projectstatus: feature.properties.mhfd_projectstatus ? feature.properties.mhfd_projectstatus : '-',
        designApprovalDate: feature.properties.mhfd_designapprovaldate ? feature.properties.mhfd_designapprovaldate : '-',
        constructionApprovalDate: feature.properties.mhfd_constructionapprovaldate ? feature.properties.mhfd_constructionapprovaldate : '-', 
        finalacceptancedate: feature.properties.mhfd_finalacceptancedate ? feature.properties.mhfd_finalacceptancedate : '-',
        mhfd_ineligibledate: feature.properties.mhfd_ineligibledate ? feature.properties.mhfd_ineligibledate : '-',

        // projectno: feature.properties.projectno ? feature.properties.projectno : '-',
        // mep_eligibilitystatus: feature.properties.mep_eligibilitystatus
        //   ? feature.properties.mep_eligibilitystatus
        //   : '-',
        // mep_summarynotes: feature.properties.mep_summarynotes ? feature.properties.mep_summarynotes : '-',
        // pondname: feature.properties.pondname ? feature.properties.pondname : '-',
        mhfd_servicearea: feature.properties.mhfd_servicearea ? feature.properties.mhfd_servicearea : '-',
        mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties),
      };
      menuOptions.push(MENU_OPTIONS.MEP_STORM_OUTFALL);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        proj_name: item.feature,
        // mep_status: item.mep_eligibilitystatus,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (
      (feature.source.includes('flood_hazard') && !feature.source.includes('fema_')) ||
      feature.source.includes('stream_function') ||
      feature.source.includes('future_development')
    ) {
      const item = {
        layer: getTitleOfProblemsPart(feature),
        feature: getTitleOfProblemsPart(feature),
        problem_part_category: feature.properties.problem_part_category
          ? feature.properties.problem_part_category
          : '-',
        problem_part_subcategory: feature.properties.problem_part_subcategory
          ? feature.properties.problem_part_subcategory
          : '-',
        problem_part_name: feature.properties.problem_part_name ? feature.properties.problem_part_name : '-',
        source_complete_year: feature.properties.source_complete_year ? feature.properties.source_complete_year : '0',
        stream_name: feature.properties.stream_name ? feature.properties.stream_name : '-',
        local_government: feature.properties.local_government ? feature.properties.local_government : '-',
      };
      mobile.push({
        layer: item.layer,
      });
      menuOptions.push(getTitleOfProblemsPart(feature));
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'watershed_service_areas') {
      const item = {
        layer: MENU_OPTIONS.SERVICE_AREA,
        feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
        watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
        constructionmanagers: feature.properties.constructionmanagers ? feature.properties.constructionmanagers : '-',
        email: 'contact@mhfd.org',
      };
      mobile.push({
        layer: item.layer,
        watershedmanager: item.watershedmanager,
        constructionmanagers: item.constructionmanagers,
        email: item.email,
      });
      menuOptions.push(MENU_OPTIONS.SERVICE_AREA);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'counties') {
      const item = {
        layer: MENU_OPTIONS.COUNTIES,
        feature: feature.properties.county ? feature.properties.county : '-',
        constructionmanagers: feature.properties.construction_manager ? feature.properties.construction_manager : '-',
      };
      mobile.push({
        layer: item.layer,
        feature: item.feature,
        constructionmanagers: item.constructionmanagers,
      });
      menuOptions.push(MENU_OPTIONS.COUNTIES);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === MUNICIPALITIES_FILTERS) {
      const item = {
        layer: MENU_OPTIONS.MUNICIPALITIES,
        city: feature.properties.city ? feature.properties.city : '-',
      };
      mobile.push({
        layer: item.layer,
        city: item.city,
      });
      menuOptions.push(MENU_OPTIONS.MUNICIPALITIES);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source.includes('milehighfd')) {
      const item = {
        layer: 'LAND USE LAND COVER',
        typeLand: feature.properties.gridcode ? getTitleOfLandUse(feature) : '-',
      };
      mobile.push({
        layer: item.layer,
        typeLand: item.typeLand,
      });
      menuOptions.push(getTitleOfLandUse(feature));
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, '') });
    }

    if (feature.source.includes('catchments') || feature.source.includes('basin')) {
      const item = {
        layer: MENU_OPTIONS.WATERSHED,
        str_name: feature.properties.str_name ? feature.properties.str_name : 'No name',
        mhfd_code: feature.properties.mhfd_code ? feature.properties.mhfd_code : '-',
        catch_acre: feature.properties.catch_acre ? formatterIntegers.format(feature.properties.catch_acre) : '-',
      };
      menuOptions.push(MENU_OPTIONS.WATERSHED);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'fema_flood_hazard_zones') {
      const item = {
        layer: MENU_OPTIONS.FEMA_FLOOD_HAZARD,
        dfirm_id: feature.properties.dfirm_id ? feature.properties.dfirm_id : '-',
        fld_zone: feature.properties.fld_zone ? feature.properties.fld_zone : '-',
        zone_subty: feature.properties.zone_subty ? feature.properties.zone_subty : '-',
        sfha_tf: feature.properties.sfha_tf ? feature.properties.sfha_tf : '-',
      };
      menuOptions.push(MENU_OPTIONS.FEMA_FLOOD_HAZARD);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'floodplains_non_fema') {
      const item = {
        layer: MENU_OPTIONS.FLOODPLAINS_NON_FEMA,
        study_name: feature.properties.study_name ? feature.properties.study_name : '-',
        floodplain_source: feature.properties.floodplain_source ? feature.properties.floodplain_source : '-',
        floodplain_type: feature.properties.floodplain_type ? feature.properties.floodplain_type : '-',
        county: feature.properties.county ? feature.properties.county : '-',
        service_area: feature.properties.service_area ? feature.properties.service_area : '-',
        notes_floodplains: feature.properties.notes ? feature.properties.notes : '-',
      };
      menuOptions.push(MENU_OPTIONS.FLOODPLAINS_NON_FEMA);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ROUTINE_MAINTENANCES) {
      const item = {
        layer: feature.properties.routine_type,
        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
        work_item_description: feature.properties.work_item_description ? feature.properties.work_item_description : '-',
        contract: feature.properties.contract ? feature.properties.contract : '-',
        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
        local_government: feature.properties.local_government ? feature.properties.local_government : '-',
        frequency: 'NA',
        acreage: feature.properties.routine_maintenance_area_ac
          ? numberWithCommas(Math.round(feature.properties.routine_maintenance_area_ac * 100) / 100)
          : '-',
        schedule: 'NA',
        source: feature.source ? feature.source : '-',
        // project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
      };
      menuOptions.push(feature.properties.routine_type);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
        // project_subtype: item.project_subtype,
        frequency: item.frequency,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ROUTINE_NATURAL_AREAS) {
      const item = {
        layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA,
        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
        contract: feature.properties.contract ? feature.properties.contract : '-',
        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
        acreage: feature.properties.acreage
          ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100)
          : '-',
        project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
        frequency: 'NA',
      };
      menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
        project_subtype: item.project_subtype,
        frequency: item.frequency,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ROUTINE_WEED_CONTROL) {
      const item = {
        layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
        contract: feature.properties.contract ? feature.properties.contract : '-',
        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
        mow_frequency: feature.properties.mow_frequency ? feature.properties.mow_frequency : '-',
        acreage: feature.properties.acreage
          ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100)
          : '-',
        project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
      };
      menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
        project_subtype: item.project_subtype,
        frequency: item.mow_frequency,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ROUTINE_DEBRIS_AREA) {
      const item = {
        layer: MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA,
        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
        contract: feature.properties.contract ? feature.properties.contract : '-',
        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
        debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
        acreage: feature.properties.acreage
          ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100)
          : '-',
        project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
      };
      menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
        project_subtype: item.project_subtype,
        frequency: item.debris_frequency,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ROUTINE_DEBRIS_LINEAR) {
      const item = {
        layer: MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR,
        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
        contract: feature.properties.contract ? feature.properties.contract : '-',
        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
        debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
        length: feature.properties.length ? Math.round(feature.properties.length) : '-',
        project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
      };
      menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
        project_subtype: item.project_subtype,
        frequency: item.debris_frequency,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === NRCS_SOILS) {
      const item = {
        layer: MENU_OPTIONS.NCRS_SOILS,
        hydgrpdcd: feature.properties.hydgrpdcd,
        muname: feature.properties.muname,
        aws0150wta: feature.properties.aws0150wta,
        drclassdcd: feature.properties.drclassdcd,
        nrcsweb: 'NA',
      };
      menuOptions.push(MENU_OPTIONS.NCRS_SOILS);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        hydgrpdcd: item.hydgrpdcd,
        muname: item.muname,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === ALERT_STATION) {
      const {newMenuLabel} = getAlertNameAndIcon(MENU_OPTIONS.ALERT_STATION, { station_type: feature.properties.station_type});
      const item = {
        layer: MENU_OPTIONS.ALERT_STATION,
        station_name: feature.properties.station_name ? feature.properties.station_name : '-',
        station_type: feature.properties.station_type ? feature.properties.station_type : '-',
        station_id: feature.properties.station_id ? feature.properties.station_id : '-',
        shefid: feature.properties.shefid ? feature.properties.shefid : '-',
        install_year: feature.properties.install_year ? feature.properties.install_year : '-',
        station_status: feature.properties.station_status ? feature.properties.station_status : '-',
        websiteAlert: 'http://alert5.udfcd.org/LDAD/gmapV3.html',
        title: newMenuLabel
      };
      menuOptions.push(MENU_OPTIONS.ALERT_STATION);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        station_name: item.station_name,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === DWR_DAM_SAFETY) {
      const item = {
        layer: MENU_OPTIONS.DWR_DAM_SAFETY,
        dam_name: feature.properties.dam_name,
        hazard_class: feature.properties.hazard_class,
        year_completed: feature.properties.year_completed,
        dam_height: feature.properties.dam_height,
        more_information: feature.properties.more_information,
      };
      mobile.push({
        layer: item.layer,
        dam_name: item.dam_name,
        hazard_class: item.hazard_class,
      });
      menuOptions.push(MENU_OPTIONS.DWR_DAM_SAFETY);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === STREAM_MANAGEMENT_CORRIDORS) {
      const item = {
        layer: feature.properties.smc_type,
        scale: feature.properties.scale,
        date_created: '01/07/2019',
      };
      menuOptions.push(feature.properties.smc_type);
      popups.push(item);
      mobile.push({
        layer: item.layer,
        scale: item.scale,
        date_created: item.date_created,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (
      feature.source === BLOCK_CLEARANCE_ZONES_LAYERS &&
      feature.properties.species_name === 'Prebles meadow jumping mouse'
    ) {
      const item = {
        layer: `Block Clearance Zones Species: ${feature.properties.species_name}`,
        description: feature.properties.description ? feature.properties.description : '-',
        effective_dates: '2/3/2023 - 2/3/2028',
        bcz_specname: feature.properties.species_name,
        bcz_expdate: feature.properties.bcz_expdate,
        letter: feature.properties.letter ? feature.properties.letter : '-',
        website: feature.properties.website ? feature.properties.website : '-',
      };
      menuOptions.push(MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE);
      popups.push(item);
      mobile.push({
        layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
        bcz_specname: item.bcz_specname,
        bcz_expdate: item.bcz_expdate,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (
      feature.source === BLOCK_CLEARANCE_ZONES_LAYERS &&
      feature.properties.species_name !== 'Prebles meadow jumping mouse'
    ) {
      const item = {
        layer: `Block Clearance Zones Species: ${feature.properties.species_name}`,
        description: feature.properties.description ? feature.properties.description : '-',
        effective_dates: '2/3/2023 - 2/3/2028',
        bcz_specname: feature.properties.species_name,
        bcz_expdate: feature.properties.bcz_expdate,
        letter: feature.properties.letter ? feature.properties.letter : '-',
        website: feature.properties.website ? feature.properties.website : '-',
      };
      mobile.push({
        layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
        bcz_specname: item.bcz_specname,
        bcz_expdate: item.bcz_expdate,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      menuOptions.push(MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === RESEARCH_MONITORING) {
      const item = {
        layer: MENU_OPTIONS.RESEARCH_MONITORING,
        sitename: feature.properties.sitename,
        sitetype: feature.properties.sitetype,
        bmptype: feature.properties.bmptype,
      };
      mobile.push({
        layer: item.layer,
        sitename: item.sitename,
        sitetype: item.sitetype,
      });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      menuOptions.push(MENU_OPTIONS.RESEARCH_MONITORING);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === CLIMB_TO_SAFETY) {
      const item = {
        layer: MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
      };
      mobile.push(item);
      menuOptions.push(MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === SEMSWA_SERVICE_AREA) {
      const item = {
        layer: MENU_OPTIONS.SEMSWA_SERVICE_AREA,
      };
      menuOptions.push(MENU_OPTIONS.SEMSWA_SERVICE_AREA);
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === 'streams') {
      const objectidstream = feature.properties.mhfd_code;
      const dataFromDBforStreams = await datasets.getData(SERVER.STREAM_BY_ID(objectidstream), datasets.getToken());
      if (dataFromDBforStreams.length > 0) {
        const item = {
          type: 'streams-reaches',
          layer: 'Streams',
          title: dataFromDBforStreams[0] ? dataFromDBforStreams[0].stream_name : 'Unnamed Stream',
          streamname: dataFromDBforStreams[0].stream_name,
          mhfd_code: dataFromDBforStreams[0].mhfd_code_stream,
          catch_sum: dataFromDBforStreams[0].sum_catchment_area_ac,
          str_ft: dataFromDBforStreams[0].sum_stream_length_ft,
          slope: dataFromDBforStreams[0].slope_ft
        };
        menuOptions.push('Stream');
        mobile.push({ ...item });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
    }
    if (feature.source === ACTIVE_LOMS) {
      let extraProperties = {};
      if (userInformation.designation === ADMIN || userInformation.designation === STAFF) {
        extraProperties = { notes: feature.properties.notes || '-' };
      }
      let dateType = new Date(feature.properties.status_date);
      dateType.setDate(dateType.getDate() + 1);
      let effectiveDateType = new Date(feature.properties.effective_date);
      effectiveDateType.setDate(effectiveDateType.getDate() + 1);
      const item = {
        layer: 'LOMCs',
        lomc_case: feature.properties.lomc_case || '-',
        lomc_type: feature.properties.lomc_type || '-',
        lomc_identifier: feature.properties.lomc_identifier || '-',
        status_date: feature.properties.status_date
          ? `${dateType.getMonth() + 1}/${dateType.getDate()}/${dateType.getFullYear()}`
          : '-',
        status: feature.properties.status || '-',
        effective_date: feature.properties.effective_date
          ? `${effectiveDateType.getMonth() + 1}/${effectiveDateType.getDate()}/${effectiveDateType.getFullYear()}`
          : '-',
        ...extraProperties,
      };
      menuOptions.push('LOMCs');
      mobile.push({ ...item });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    if (feature.source === EFFECTIVE_REACHES) {
      let extraProperties = {};
      if (userInformation.designation === ADMIN || userInformation.designation === STAFF) {
        extraProperties = {
          modellocation_mip: feature.properties.modellocation_mip || '-',
          modellocation_local: feature.properties.modellocation_local || '-',
          notes: feature.properties.notes || '-',
          hydra_modeltype: feature.properties.hydra_modeltype || '-',
          hydra_modeldate: feature.properties.hydra_modeldate || '-',
          hydra_modelname: feature.properties.hydra_modelname || '-',
          hydro_modeltype: feature.properties.hydro_modeltype || '-',
          hydro_modeldate: feature.properties.hydro_modeldate || '-',
          hydro_modelname: feature.properties.hydro_modelname || '-',
          original_source_data: feature.properties.original_source_data || '-',
          legacycode: feature.properties.legacycode || '-',
        };
      }
      const item = {
        layer: 'Effective Reaches',
        uniqueid: feature.properties.uniqueid || '-',
        streamname_mhfd: feature.properties.streamname_mhfd || '-',
        streamname_fema: feature.properties.streamname_fema || '-',
        studyname: feature.properties.studyname || '-',
        studydate: feature.properties.studydate || '-',
        ...extraProperties,
      };
      menuOptions.push('Effective Reaches');
      mobile.push({ ...item });
      mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      popups.push(item);
      ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
    }
    for (const component of COMPONENT_LAYERS.tiles) {
      if (feature.source === component) {
        let isAdded = false;
        if (mapType === MAPTYPES.WORKREQUEST || mapType === MAPTYPES.CREATEPROJECTMAP) {
          isAdded = componentsList.find((i: any) => i.cartodb_id === feature.properties.cartodb_id);
        }

        const problemid = feature.properties.problemid
          ? feature.properties.problemid
          : feature.properties.problem_id
            ? feature.properties.problem_id
            : '';
        let problemname = '';
        if (problemid) {
          if (feature.source === STREAM_IMPROVEMENT_MEASURE) {
            let aw = await datasets.getData(SERVER.PROBLEMNNAMECOMP + problemid, datasets.getToken());
            problemname = aw.problem_name;
          } else {
            let aw = await datasets.getData(SERVER.PROBLEMNAME + '/' + problemid, datasets.getToken());
            problemname = aw[0]?.problemname;
          }
        }

        let volume;
        if (feature.source === 'detention_facilities') {
          volume = { volume: feature.properties.detention_volume ? feature.properties.detention_volume : '-' };
        }
        let item;
        let status = 'Add';
        if (isAdded) {
          status = 'Remove';
        }
        if (feature.source === STREAM_IMPROVEMENT_MEASURE) {
          item = {
            layer: MENU_OPTIONS.COMPONENTS,
            type: getTitleOfStreamImprovements(feature.properties),
            subtype: feature.properties.complexity_subtype ? feature.properties.complexity_subtype : '-',
            estimatedcost: feature.properties.estimated_cost_base ? feature.properties.estimated_cost_base : '-',
            studyname: feature.properties.source_name ? feature.properties.source_name : '-',
            studyyear: feature.properties.source_complete_year ? feature.properties.source_complete_year : '-',
            streamname: feature.properties.stream_name ? feature.properties.stream_name : '-',
            local_gov: feature.properties.local_government ? feature.properties.local_government : '-',
            objectid: feature.properties.objectid ? feature.properties.objectid : '-',
            table: feature.source ? feature.source : '-',
            problem: problemname,
            problemid: problemid,
            status: feature.properties.status ? feature.properties.status : '-',
            ...volume,
          };
        } else {
          item = {
            layer: MENU_OPTIONS.COMPONENTS,
            type: feature.properties.type ? feature.properties.type : '-',
            subtype: feature.properties.subtype ? feature.properties.subtype : '-',
            status: feature.properties.status ? feature.properties.status : '-',
            estimatedcost: feature.properties.original_cost ? feature.properties.original_cost : '-',
            studyname: feature.properties.mdp_osp_study_name ? feature.properties.mdp_osp_study_name : '-',
            studyyear: feature.properties.year_of_study ? feature.properties.year_of_study : '-',
            jurisdiction: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
            original_cost: feature.properties.original_cost ? feature.properties.original_cost : '-',
            table: feature.source ? feature.source : '-',
            cartodb_id: feature.properties.cartodb_id ? feature.properties.cartodb_id : '-',
            problem: problemname,
            problemid: problemid,
            objectid: feature.properties.objectid ? feature.properties.objectid : '-',
            streamname: feature.properties.drainageway,
            ...volume,
          };
        }
        if (mapType === MAPTYPES.WORKREQUEST || mapType === MAPTYPES.CREATEPROJECTMAP) {
          item = {
            ...item,
            added: status,
          };
        }
        const name = feature.source
          .split('_')
          .map((word: string) => word[0].toUpperCase() + word.slice(1))
          .join(' ');
        menuOptions.push(name);
        mobile.push({
          layer: item.layer,
          type: item.type,
          subtype: item.subtype,
          streamname: item.streamname,
          studyyear: item.studyyear,
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
    }
  }
};
