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
  NRCS_SOILS,
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
  MAPTYPES
} from "../../../constants/constants";
import * as datasets from "../../../Config/datasets";
import {
  getDateMep,
  getTitleOfProblemsPart,
  epochTransform,
  parseDateZ,
  getTitleOfStreamImprovements,
  getTitleOfLandUse
} from './MapFunctionsUtilities';
import { numberWithCommas } from '../../../utils/utils';
import { SERVER } from "../../../Config/Server.config";

const factorKMToMiles = 0.621371;
const factorKMtoFeet =  3280.8;
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
  setDistanceValueMi: any
) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['measure-points']
    });
    if ((e.point.x === coordX || e.point.y === coordY)) {
      return;
    }
    coordX = e.point.x;
    coordY = e.point.y;
    if (geojsonMeasures.features.length > 1) geojsonMeasures.features.pop();
    setIsDrawingMeasure(true);
    if (features.length > 0 && linestringMeasure.geometry.coordinates.length > 2) {
      const id = features[0].properties.id;
      geojsonMeasures.features = geojsonMeasures.features.filter(
        (point :any) => point.properties.id !== id
      );
      finishMeasure();
    } else {
      const point:any = {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [e.lngLat.lng, e.lngLat.lat]
        },
        'properties': {
        'id': String(new Date().getTime())
        }
      };
      geojsonMeasures.features.push(point);
    }
     
    if (geojsonMeasures.features.length > 1) {
      linestringMeasure.geometry.coordinates = geojsonMeasures.features.map(
        (point: any) => point.geometry.coordinates
      );
      geojsonMeasures.features.push(linestringMeasure);
      const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
      const distance = turf.length(newLS);
      setDistanceValue((distance * factorKMtoFeet).toLocaleString(undefined, {maximumFractionDigits: 2}));
      setDistanceValueMi((distance * factorKMToMiles).toLocaleString(undefined, {maximumFractionDigits: 2}));
      if(linestringMeasure.geometry.coordinates.length > 3) {
        var polygon = turf.lineToPolygon(JSON.parse(JSON.stringify(newLS)));
        const area = turf.area(polygon);
        setAreaValue((area * factorm2toacre).toLocaleString(undefined, {maximumFractionDigits: 2}));
      } 
    } else if(geojsonMeasures.features.length == 1){
      setAreaValue('0');
      setDistanceValue('0');
      setDistanceValueMi('0');
    }
     
    if(map.getSource('geojsonMeasure')) {
      map.getSource('geojsonMeasure').setData(geojsonMeasures);
    }
}
export const addPopupAndListeners = (
  maptype: any,
  menuOptions: any,
  popups: any,
  userInformation: any,
  test: any,
  setMobilePopups: any,
  setActiveMobilePopups: any,
  setSelectedPopup: any,
  mobile: any,
  mobileIds: any,
  popup: any,
  map: any,
  showPopup: any,
  seeDetails: any,
  createProject: any,
  measureCenterAndDelete: any,
  e:any,
  ids: any,
  addRemoveComponent?: any,
  openEdit?: any,
  isEditPopup? :any,
  getComponentsFromProjProb?: any
) => {
  const html = loadMenuPopupWithData(menuOptions, popups, userInformation, test, isEditPopup, undefined, maptype === MAPTYPES.CREATEPROJECTMAP);
  setMobilePopups(mobile);
  setActiveMobilePopups(mobileIds);
  setSelectedPopup(0);
  if (html) {
      popup.setLngLat(e.lngLat)
          .setDOMContent(html)
          .addTo(map);
      for (const index in popups) {
          document.getElementById('menu-' + index)?.addEventListener('click', showPopup.bind(index, index, popups.length, ids[index]));
          document.getElementById('buttonPopup-' + index)?.addEventListener('click', seeDetails.bind(popups[index], popups[index]));
          document.getElementById('buttonCreate-' + index)?.addEventListener('click', createProject.bind(popups[index], popups[index]));
          document.getElementById('buttonzoom-'+index)?.addEventListener('click', measureCenterAndDelete.bind(popups[index], 'center',popups[index]));
          document.getElementById('buttondelete-'+index)?.addEventListener('click', measureCenterAndDelete.bind(popups[index], 'delete',popups[index]));
          document.getElementById('problemdetail'+ index)?.addEventListener('click', seeDetails.bind(popups[index], popups[index])) ;
          document.getElementById('component-' + index)?.addEventListener('click', addRemoveComponent.bind(popups[index], popups[index]));
          document.getElementById('buttonEdit-' + index)?.addEventListener('click', openEdit?.bind(popups[index], popups[index]));
          document.getElementById('buttonComponents-' + index)?.addEventListener('click', getComponentsFromProjProb.bind(popups[index], popups[index]));
      }
  }
}
export const addPopupServiceCountyMunicipality = (
  menuOptions: any,
  popups: any,
  userInformation: any,
  titleObject: any,
  setMobilePopups: any,
  setSelectedPopup: any,
  mobile: any,
  searchPopup: any,
  map: any,
  showPopup: any,
  seeDetails: any,
  createProject: any,
  ids: any,
  coord: any, 
  searchMarker: any,
  setKeyword: any, 
  setMarkerGeocoder: any
) => {
  const html = loadMenuPopupWithData(menuOptions, popups, titleObject, userInformation);
  setMobilePopups(mobile);
  setSelectedPopup(0);
  if (html) {
    searchPopup.remove();
    searchPopup = new mapboxgl.Popup({closeButton: true,});
    searchPopup.setLngLat(coord)
        .setDOMContent(html)
        .addTo(map);
    for (const index in popups) {
        document.getElementById('menu-' + index)?.addEventListener('click', showPopup.bind(index, index, popups.length, ids[index]));
        document.getElementById('buttonPopup-' + index)?.addEventListener('click', seeDetails.bind(popups[index], popups[index]));
        document.getElementById('buttonCreate-' + index)?.addEventListener('click', createProject.bind(popups[index], popups[index]));
        document.getElementById('problemdetail'+ index)?.addEventListener('click', seeDetails.bind(popups[index], popups[index])) ;
    }
    let closebuttons = Array.from(document.getElementsByClassName('mapboxgl-popup-close-button'));
    closebuttons.forEach((element:any) => {
        element.addEventListener('click', () => {
          searchMarker.remove();
          setKeyword('');
          setMarkerGeocoder(undefined);
        })
    });

    searchMarker.setPopup(searchPopup);
    searchMarker.addTo(map);
    searchMarker.togglePopup();
    setMarkerGeocoder(searchMarker);
  }
}
export const addPopupsOnClick = async (
  map: any,
  bbox: any, 
  allLayers: any,
  coordX: any,
  coordY: any,
  e: any,
  galleryProjects: any,
  mobile: any,
  menuOptions: any,
  popups: any,
  mobileIds: any,
  ids: any,
  userInformation: any,
  isEditPopup: boolean,
  getComponentsByProjid: any,
  setCounterPopup: any,
  getTotalAmount: any,
  componentsList: any,
  mapType?: any
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
  }
  if (mapType !== MAPTYPES.WORKREQUEST) {
    const popupsClassess = document.getElementsByClassName('mapboxgl-popup');
    if ( popupsClassess.length ) {
      //erase all popups in DOM
        for(let i = 0 ; i < popupsClassess.length ; ++i) {
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
      return a.source.split('_').join(' ').localeCompare(b.source.split('_').join(' '));
  });
  for (const feature of features) {
      if (feature.layer.id.includes('_line') && feature.layer.type === 'symbol') {
          continue;
      }
      let itemValue;
      if (
        feature.source === 'projects_polygon_' ||
        feature.source === MHFD_PROJECTS ||
        feature.source === PROJECTS_DRAFT
      ) {
        if(feature.source === PROJECTS_DRAFT) {
          isEditPopup =true;
        }
        if (mapType !== MAPTYPES.WORKREQUEST) {
          getComponentsByProjid(feature.properties.projectid, setCounterPopup);
        }
          
          const filtered = galleryProjects.filter((item: any) =>
              item.cartodb_id === feature.properties.cartodb_id
          );
          const item = {
              type: 'project',
              title:
                feature.source === PROJECTS_DRAFT
                  ? feature.properties.projecttype + ' ' + MENU_OPTIONS.PROJECT
                  : MENU_OPTIONS.PROJECT,
              name: feature.properties.projectname
                ? feature.properties.projectname
                : feature.properties.requestedname
                ? feature.properties.requestedname
                : '-',
              organization: feature.properties.sponsor ? feature.properties.sponsor : 'No sponsor',
              value:
                feature.source === PROJECTS_DRAFT
                  ? feature.properties.projecttype.toLowerCase() === 'capital'
                    ? feature.properties.estimatedcost
                    : getTotalAmount(feature.properties.cartodb_id)
                  : feature.properties.estimatedcost
                  ? feature.properties.estimatedcost
                  : feature.properties.component_cost
                  ? feature.properties.component_cost
                  : '-1',
              projecctype:
                feature.source === PROJECTS_DRAFT
                  ? feature.properties.projecttype
                  : feature.properties.projectsubtype
                  ? feature.properties.projectsubtype
                  : feature.properties.projecttype
                  ? feature.properties.projecttype
                  : '-',
              status: feature.properties.status ? feature.properties.status : '-',
              objectid: feature.properties.objectid,
              component_count: feature.properties.component_count,
              valueid: feature.properties.cartodb_id,
              id: feature.properties.projectid,
              streamname: feature.properties.streamname,
              isEditPopup: feature.source === PROJECTS_DRAFT,
              popupId: 'popup',
              image: filtered.length  && filtered[0].attachments ? filtered[0].attachments : (
                feature.properties.projecttype === 'Capital' ? '/projectImages/capital.png' :
                  feature.properties.projecttype === 'Study' ? '/projectImages/study.png' :
                    feature.properties.projecttype === 'Maintenance' ?
                      (feature.properties.projectsubtype === 'Vegetation Management' ? '/projectImages/vegetation-management.png' :
                        feature.properties.projectsubtype === 'Sediment Removal' ? '/projectImages/sediment-removal.png' :
                          feature.properties.projectsubtype === 'Restoration' ? '/projectImages/restoration.png' :
                            feature.properties.projectsubtype === 'Minor Repairs' ? '/projectImages/minor-repairs.png' :
                              '/projectImages/debris_management.png') : '/Icons/eje.png')
          };
          mobile.push({
              type: 'project',
              name: item.name,
              value: item.value,
              projecttype: item.projecctype,
              image: item.image,
              id: item.id,
              objectid: item.objectid,
              valueid: item.valueid,
              streamname: item.streamname
          });
          itemValue = { ...item };
          menuOptions.push(MENU_OPTIONS.PROJECT);
          popups.push(itemValue);
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === MENU_OPTIONS.PROBLEMS_BOUNDARY) {
        const item = {
            type: MENU_OPTIONS.PROBLEMS,
            streamname: feature.properties.streamname,
            title: feature.properties.problem_type ? (feature.properties.problem_type + ' Problem') : '-',
            problem_type: feature.properties.problem_type ? feature.properties.problem_type: '-',
            name: feature.properties.problem_name ? feature.properties.problem_name : '-',
            organization: feature.properties.local_government ? feature.properties.local_government : '-',
            value: feature.properties.estimated_cost ? feature.properties.estimated_cost : feature.properties.component_cost ? feature.properties.component_cost : '-1',
            status: feature.properties.component_status ? (feature.properties.component_status + '%') : '-',
            priority: feature.properties.problem_severity ? feature.properties.problem_severity + ' Priority' : '-',
            problemid: feature.properties.problem_id,
            component_count: feature.properties.component_count ?? 0,
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
            streamname: item.streamname
        });
        menuOptions.push('Problem: ' + item.problem_type);
        popups.push(itemValue);
        mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
        ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'mep_projects_temp_locations') {
          const item = {
              layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
              feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
              projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
              mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
              mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
              notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
              servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
          }
          menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              proj_name: item.feature,
              mep_status: item.mepstatus
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'mep_projects_temp_locations') {
          const item = {
              layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
              feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
              projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
              mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
              mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
              notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
              servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
          }
          menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              proj_name: item.feature,
              mep_status: item.mepstatus
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'mep_detentionbasins') {
          const item = {
              layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
              feature: feature.properties.projectname ? feature.properties.projectname : '-',
              projectno: feature.properties.projectno ? feature.properties.projectno : '-',
              mep_eligibilitystatus: feature.properties.mep_eligibilitystatus? feature.properties.mep_eligibilitystatus:'-',
              mep_summarynotes: feature.properties.mep_summarynotes? feature.properties.mep_summarynotes: '-',
              pondname: feature.properties.pondname? feature.properties.pondname: '-',
              mhfd_servicearea: feature.properties.mhfd_servicearea? feature.properties.mhfd_servicearea: '-',
              mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)
          }
          menuOptions.push(MENU_OPTIONS.MEP_DETENTION_BASIN);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              proj_name: item.feature,
              mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'mep_channels') {
          const item = {
              layer: MENU_OPTIONS.MEP_CHANNEL,
              feature: feature.properties.projectname ? feature.properties.projectname : '-',
              projectno: feature.properties.projectno ? feature.properties.projectno : '-',
              mep_eligibilitystatus: feature.properties.mep_eligibilitystatus? feature.properties.mep_eligibilitystatus:'-',
              mep_summarynotes: feature.properties.mep_summarynotes? feature.properties.mep_summarynotes: '-',
              pondname: feature.properties.pondname? feature.properties.pondname: '-',
              mhfd_servicearea: feature.properties.mhfd_servicearea? feature.properties.mhfd_servicearea: '-',
              mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)

          }
          menuOptions.push(MENU_OPTIONS.MEP_CHANNEL);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              proj_name: item.feature,
              mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'mep_outfalls') {
          const item = {
              layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
              feature: feature.properties.projectname ? feature.properties.projectname : '-',
              projectno: feature.properties.projectno ? feature.properties.projectno : '-',
              mep_eligibilitystatus: feature.properties.mep_eligibilitystatus? feature.properties.mep_eligibilitystatus:'-',
              mep_summarynotes: feature.properties.mep_summarynotes? feature.properties.mep_summarynotes: '-',
              pondname: feature.properties.pondname? feature.properties.pondname: '-',
              mhfd_servicearea: feature.properties.mhfd_servicearea? feature.properties.mhfd_servicearea: '-',
              mepstatusdate: getDateMep(feature.properties.mep_eligibilitystatus, feature.properties)
          }
          menuOptions.push(MENU_OPTIONS.MEP_STORM_OUTFALL);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              proj_name: item.feature,
              mep_status: item.mep_eligibilitystatus
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source.includes('flood_hazard')||feature.source.includes('stream_function')||feature.source.includes('future_development')) {
        const item = {
          layer: getTitleOfProblemsPart(feature),
          feature: getTitleOfProblemsPart(feature),
          problem_part_category: feature.properties.problem_part_category ? feature.properties.problem_part_category : '-',
          problem_part_subcategory: feature.properties.problem_part_subcategory ? feature.properties.problem_part_subcategory : '-',
          problem_part_name: feature.properties.problem_part_name ? feature.properties.problem_part_name : '-',
          source_complete_year: feature.properties.source_complete_year ? feature.properties.source_complete_year : '0',
          stream_name: feature.properties.stream_name ? feature.properties.stream_name : '-',
          local_government: feature.properties.local_government ? feature.properties.local_government : '-'

        };
        mobile.push({
          layer: item.layer
        });
        menuOptions.push(getTitleOfProblemsPart(feature));
        popups.push(item);
        ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'watershed_service_areas') {
          const item = {
              layer: MENU_OPTIONS.SERVICE_AREA,
              feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
              watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
              constructionmanagers: feature.properties.constructionmanagers ? feature.properties.constructionmanagers : '-',
              email: 'contact@mhfd.org'
          }
          mobile.push({
              layer: item.layer,
              watershedmanager: item.watershedmanager,
              constructionmanagers: item.constructionmanagers,
              email: item.email
          })
          menuOptions.push(MENU_OPTIONS.SERVICE_AREA);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'counties') { 
        const item = {
            layer: MENU_OPTIONS.COUNTIES,
            feature: feature.properties.county ? feature.properties.county : '-',
            constructionmanagers: feature.properties.construction_manager ? feature.properties.construction_manager : '-',
        }
        mobile.push({
            layer: item.layer,
            feature: item.feature,
            constructionmanagers: item.constructionmanagers
        })
        menuOptions.push(MENU_OPTIONS.COUNTIES);
        popups.push(item);
        ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
    }
    if (feature.source === MUNICIPALITIES_FILTERS) {  
      const item = {
          layer: MENU_OPTIONS.MUNICIPALITIES,
          city: feature.properties.city ? feature.properties.city : '-',
      }
      mobile.push({
          layer: item.layer,
          city: item.city,
      })
      menuOptions.push(MENU_OPTIONS.MUNICIPALITIES);
      popups.push(item);
      ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
    }
    if (feature.source.includes('milehighfd')) {  
      const item = {
          layer: 'LAND USE LAND COVER',
          typeLand: feature.properties.gridcode ? getTitleOfLandUse(feature) : '-',
      }
      mobile.push({
          layer: item.layer,
          typeLand: item.typeLand,
      })
      menuOptions.push(getTitleOfLandUse(feature));
      popups.push(item);
      ids.push({layer: feature.layer.id.replace(/_\d+$/, '')});
    }
    
      if (feature.source.includes('catchments') || feature.source.includes('basin')) {
          const item = {
              layer: MENU_OPTIONS.WATERSHED,
              str_name: feature.properties.str_name ? feature.properties.str_name : 'No name',
              mhfd_code: feature.properties.mhfd_code ? feature.properties.mhfd_code : '-',
              catch_acre: feature.properties.catch_acre ? feature.properties.catch_acre : '-',
            }
          menuOptions.push(MENU_OPTIONS.WATERSHED);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === 'fema_flood_hazard_zones') {
        const item = {
            layer: MENU_OPTIONS.FEMA_FLOOD_HAZARD,
            dfirm_id: feature.properties.dfirm_id ? feature.properties.dfirm_id : '-',
            fld_zone: feature.properties.fld_zone ? feature.properties.fld_zone : '-',
            zone_subty: feature.properties.zone_subty ? feature.properties.zone_subty : '-',
            sfha_tf: feature.properties.sfha_tf ? feature.properties.sfha_tf : '-',
          }
          menuOptions.push(MENU_OPTIONS.FEMA_FLOOD_HAZARD);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
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
          }
          menuOptions.push(MENU_OPTIONS.FLOODPLAINS_NON_FEMA);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === ROUTINE_NATURAL_AREAS) {
          const item = {
              layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA,
              feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
              contract: feature.properties.contract ? feature.properties.contract : '-',
              contractor: feature.properties.contractor ? feature.properties.contractor : '-',
              local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
              acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
              project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
              frequency: 'NA'
          }
          menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA);
          popups.push(item);
          mobile.push({
              layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
              project_subtype: item.project_subtype,
              frequency: item.frequency
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === ROUTINE_WEED_CONTROL) {
          const item = {
              layer: MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
              feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
              contract: feature.properties.contract ? feature.properties.contract : '-',
              contractor: feature.properties.contractor ? feature.properties.contractor : '-',
              local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
              mow_frequency: feature.properties.mow_frequency ? feature.properties.mow_frequency : '-',
              acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
              project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-',
          }
          menuOptions.push(MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL);
          popups.push(item);
          mobile.push({
              layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
              project_subtype: item.project_subtype,
              frequency: item.mow_frequency
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === ROUTINE_DEBRIS_AREA) {
          const item = {
              layer: MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA,
              feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
              contract: feature.properties.contract ? feature.properties.contract : '-',
              contractor: feature.properties.contractor ? feature.properties.contractor : '-',
              local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
              debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
              acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-',
              project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-'
          }
          menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA);
          popups.push(item);
          mobile.push({
              layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
              project_subtype: item.project_subtype,
              frequency: item.debris_frequency
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
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
              project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-'
          }
          menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR);
          popups.push(item);
          mobile.push({
              layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
              project_subtype: item.project_subtype,
              frequency: item.debris_frequency
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === NRCS_SOILS) {
          const item = {
              layer: MENU_OPTIONS.NCRS_SOILS,
              hydgrpdcd: feature.properties.hydgrpdcd,
              muname: feature.properties.muname,
              aws0150wta: feature.properties.aws0150wta,
              drclassdcd: feature.properties.drclassdcd,
              nrcsweb: 'NA'
          }
          menuOptions.push(MENU_OPTIONS.NCRS_SOILS);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              hydgrpdcd: item.hydgrpdcd,
              muname: item.muname
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === DWR_DAM_SAFETY) {
          const item = {
              layer: MENU_OPTIONS.DWR_DAM_SAFETY,
              dam_name: feature.properties.dam_name,
              hazard_class: feature.properties.hazard_class,
              year_completed: feature.properties.year_completed,
              dam_height: feature.properties.dam_height,
              more_information: feature.properties.more_information
          }
          mobile.push({
              layer: item.layer,
              dam_name: item.dam_name,
              hazard_class: item.hazard_class
          })
          menuOptions.push(MENU_OPTIONS.DWR_DAM_SAFETY);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === STREAM_MANAGEMENT_CORRIDORS) {
          const item = {
              layer: feature.properties.smc_type,
              scale: feature.properties.scale,
              date_created: '01/07/2019'
          }
          menuOptions.push(feature.properties.smc_type);
          popups.push(item);
          mobile.push({
              layer: item.layer,
              scale: item.scale,
              date_created: item.date_created
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === BLOCK_CLEARANCE_ZONES_LAYERS && feature.properties.species_name === 'Prebles meadow jumping mouse') {
          const item = {
              layer: MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE,
              expirationdate: epochTransform(feature.properties.expiration_date),
              bcz_specname: feature.properties.species_name,
              bcz_expdate: feature.properties.bcz_expdate,
              website: 'https://www.fws.gov/mountain-prairie/es/preblesMeadowJumpingMouse.php',
              letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0030_PMJM_Denver_Block_Clearance_extension_accessible_signed.pdf',
              map: `https://www.fws.gov/mountain-prairie/es/species/mammals/preble/9-2016_USFWS_Preble's_map_Denver_Metro_Area.pdf`
          }
          menuOptions.push(MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE);
          popups.push(item);
          mobile.push({
              layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
              bcz_specname: item.bcz_specname,
              bcz_expdate: item.bcz_expdate
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === BLOCK_CLEARANCE_ZONES_LAYERS && feature.properties.species_name !== 'Prebles meadow jumping mouse') {
          const item = {
              layer: MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID,
              bcz_specname: feature.properties.species_name,
              bcz_expdate: feature.properties.bcz_expdate,
              expirationdate: parseDateZ(feature.properties.expiration_date),
              website: 'https://www.fws.gov/mountain-prairie/es/uteLadiestress.php',
              letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0031_ULTO_Denver_Block_Clearance_extension_accessible_signed.pdf',
              map: 'https://www.fws.gov/mountain-prairie/es/species/plants/uteladiestress/BlockClearanceMap2008.pdf'
          }
          mobile.push({
              layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
              bcz_specname: item.bcz_specname,
              bcz_expdate: item.bcz_expdate
          });
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          menuOptions.push(MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === RESEARCH_MONITORING) {
          const item = {
              layer: MENU_OPTIONS.RESEARCH_MONITORING,
              sitename: feature.properties.sitename,
              sitetype: feature.properties.sitetype,
              bmptype: feature.properties.bmptype,
          }
          mobile.push({
              layer: item.layer,
              sitename: item.sitename,
              sitetype: item.sitetype
          })
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          menuOptions.push(MENU_OPTIONS.RESEARCH_MONITORING);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === CLIMB_TO_SAFETY) {
          const item = {
              layer: MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
          }
          mobile.push(item);
          menuOptions.push(MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === SEMSWA_SERVICE_AREA) {
          const item = {
              layer: MENU_OPTIONS.SEMSWA_SERVICE_AREA,
          }
          menuOptions.push(MENU_OPTIONS.SEMSWA_SERVICE_AREA);
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if(feature.source === 'streams') {
          const item = {
              type: 'streams-reaches',
              layer: 'Streams',
              title: feature.properties.str_name ? feature.properties.str_name : 'Unnamed Stream',
              streamname: feature.properties.str_name,
              mhfd_code: feature.properties.mhfd_code,
              catch_sum: feature.properties.catch_sum,
              str_ft: feature.properties.str_ft,
              slope: feature.properties.slope 
          };
          menuOptions.push('Stream');
          mobile.push({...item});
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      if (feature.source === ACTIVE_LOMS) {
          let extraProperties = {};
          if (userInformation.designation === ADMIN || userInformation.designation === STAFF ) {
            extraProperties = { notes: feature.properties.notes || '-'}
          }
          let dateType = new Date(feature.properties.status_date);
          dateType.setDate(dateType.getDate() + 1);
          let effectiveDateType = new Date(feature.properties.effective_date);
          effectiveDateType.setDate(effectiveDateType.getDate() + 1);
          const item = {
            layer: 'Active LOMCs',
            lomc_case: feature.properties.lomc_case || '-',
            lomc_type: feature.properties.lomc_type || '-',
            lomc_identifier: feature.properties.lomc_identifier || '-',
            status_date: feature.properties.status_date ? `${dateType.getMonth() + 1}/${dateType.getDate()}/${dateType.getFullYear()}` : '-',
            status: feature.properties.status || '-',
            effective_date: feature.properties.effective_date ? `${effectiveDateType.getMonth() + 1}/${effectiveDateType.getDate()}/${effectiveDateType.getFullYear()}` : '-',
            ...extraProperties
          }
          menuOptions.push('Active LOMCs');
          mobile.push({...item});
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          
      }
      if (feature.source === EFFECTIVE_REACHES) {
        let extraProperties = {};
        if (userInformation.designation === ADMIN || userInformation.designation === STAFF ) {
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
            ...extraProperties
        };
        menuOptions.push('Effective Reaches');
          mobile.push({...item});
          mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          popups.push(item);
          ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
      }
      for (const component of COMPONENT_LAYERS.tiles) {
          if (feature.source === component)  {
            let isAdded = false;
            if (mapType === MAPTYPES.WORKREQUEST) {
               isAdded = componentsList.find((i: any) => i.cartodb_id === feature.properties.cartodb_id);
            }
            
              const problemid = feature.properties.problemid 
                  ? feature.properties.problemid
                  :
                    (
                      feature.properties.problem_id ?
                        feature.properties.problem_id :''
                    );
              let problemname = '';
              if(problemid) {
                if (feature.source === STREAM_IMPROVEMENT_MEASURE){
                  let aw = await datasets.getData(SERVER.PROBLEMNNAMECOMP+problemid, datasets.getToken());
                  problemname = aw.problem_name;
                } else {
                  let aw = await datasets.getData(SERVER.PROBLEMNAME+"/"+problemid, datasets.getToken());
                  problemname = aw[0]?.problemname;
                }
              }

              let volume 
              if(feature.source === 'detention_facilities'){
                  volume = {volume:feature.properties.detention_volume? feature.properties.detention_volume : '-'}
              }
              let item;
              let status = 'Add';
              if (isAdded) {
                status = 'Remove';
              }
              if(feature.source === STREAM_IMPROVEMENT_MEASURE ) {
                item = {
                  layer: MENU_OPTIONS.COMPONENTS,
                  type: getTitleOfStreamImprovements(feature.properties),
                  subtype: feature.properties.complexity_subtype ? feature.properties.complexity_subtype : '-',
                  estimatedcost: feature.properties.estimated_cost_base ? feature.properties.estimated_cost_base : '-',
                  studyname: feature.properties.source_name ? feature.properties.source_name : '-',
                  studyyear: feature.properties.source_complete_year ? feature.properties.source_complete_year: '-',
                  streamname: feature.properties.stream_name ? feature.properties.stream_name : '-',
                  local_gov: feature.properties.local_government ? feature.properties.local_government: '-',
                  objectid: feature.properties.objectid?feature.properties.objectid:'-',
                  table: feature.source ? feature.source : '-',
                  problem: problemname,
                  ...volume
                }
              } else {
                  item= {
                    layer: MENU_OPTIONS.COMPONENTS,
                    type: feature.properties.type ? feature.properties.type : '-',
                    subtype: feature.properties.subtype ? feature.properties.subtype : '-',
                    status: feature.properties.status ? feature.properties.status : '-',
                    estimatedcost: feature.properties.original_cost ? feature.properties.original_cost : '-',
                    studyname: feature.properties.mdp_osp_study_name ? feature.properties.mdp_osp_study_name : '-',
                    studyyear: feature.properties.year_of_study ? feature.properties.year_of_study: '-',
                    jurisdiction: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
                    original_cost: feature.properties.original_cost ? feature.properties.original_cost : '-',
                    table: feature.source ? feature.source : '-',
                    cartodb_id: feature.properties.cartodb_id? feature.properties.cartodb_id: '-',
                    problem: problemname,
                    problemid: problemid,
                    objectid: feature.properties.objectid?feature.properties.objectid:'-',
                    streamname: feature.properties.drainageway,
                    ...volume,
                  };
                  if (mapType === MAPTYPES.WORKREQUEST || mapType === MAPTYPES.CREATEPROJECTMAP) {
                    item = {
                      ...item,
                      added: status
                    };
                  }
              }                        
              const name = feature.source.split('_').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ');
              menuOptions.push(name);
              mobile.push({
                  layer: item.layer,
                  type: item.type,
                  subtype: item.subtype,
                  streamname: item.streamname,
                  studyyear: item.studyyear
              })
              mobileIds.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
              popups.push(item);
              ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
          }
      }
  }
}