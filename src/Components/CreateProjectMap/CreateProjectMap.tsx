import React, { useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../utils/MapService';
import { RightOutlined } from '@ant-design/icons';
import { MainPopup, ComponentPopupCreate } from './../Map/MapPopups';
import { numberWithCommas } from '../../utils/utils';
import * as turf from '@turf/turf';
import { getData, getToken, postData } from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import DetailedModal from '../Shared/Modals/DetailedModal';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import eventService from './eventService';
import {
  MAP_DROPDOWN_ITEMS,
  MAPBOX_TOKEN, HERE_TOKEN,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENTS_TRIGGER,
  PROJECTS_MAP_STYLES,
  COMPONENT_LAYERS,
  ROUTINE_MAINTENANCE,
  MHFD_BOUNDARY_FILTERS,
  SELECT_ALL_FILTERS,
  MENU_OPTIONS,
  MAP_RESIZABLE_TRANSITION, FLOODPLAINS_NON_FEMA_FILTERS, ROUTINE_NATURAL_AREAS, ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA, CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT, PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, NRCS_SOILS, DWR_DAM_SAFETY, STREAM_MANAGEMENT_CORRIDORS, BCZ_PREBLE_MEADOW_JUMPING, BCZ_UTE_LADIES_TRESSES_ORCHID, RESEARCH_MONITORING, CLIMB_TO_SAFETY, SEMSWA_SERVICE_AREA, ADMIN, STAFF
} from "../../constants/constants";
import { MapHOCProps, ProjectTypes, MapLayersType, MapProps, ComponentType, ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import store from '../../store';
import { Dropdown, Button, Collapse, Card, Tabs, Row, Col, Checkbox, Popover } from 'antd';
import { tileStyles, COMPONENT_LAYERS_STYLE } from '../../constants/mapStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMapState, useMapDispatch } from '../../hook/mapHook';
import { useProjectState, useProjectDispatch } from '../../hook/projectHook';
import { useProfileState, useProfileDispatch } from '../../hook/profileHook';
import MapFilterView from '../Shared/MapFilter/MapFilterView';
import { Input, AutoComplete } from 'antd';
import { containsNumber } from "@turf/turf";
import { getFeaturesIntersected, getHull } from './utilsService';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { AnyCnameRecord, AnyAaaaRecord } from "dns";
let map: any;
let coordX = -1;
let coordY = -1;
let isPopup = true;
let previousClick = false;
let componentsList: any[] = [];
let marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
// const MapboxDraw = require('@mapbox/mapbox-gl-draw');
type LayersType = string | ObjectLayerType;
const { Option } = AutoComplete;
const CreateProjectMap = (type: any) => {
  let html = document.getElementById('map3');
  let draw: any;
  let popup = new mapboxgl.Popup();
  
  const [isExtendedView, setCompleteView] = useState(false);
  let controller = false;
  const user = store.getState().profile.userInformation;
  const { layers, mapSearch, filterProjects, filterProblems, componentDetailIds, filterComponents, currentPopup, galleryProjects, detailed, loaderDetailedPage, componentsByProblemId, componentCounter, loaderTableCompoents } = useMapState();

  const { mapSearchQuery, setSelectedPopup, getComponentCounter, setSelectedOnMap, existDetailedPageProblem, existDetailedPageProject, getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId } = useMapDispatch();
  const { saveSpecialLocation, saveAcquisitionLocation, getStreamIntersectionSave, getStreamIntersectionPolygon, getStreamsIntersectedPolygon, changeAddLocationState, getListComponentsIntersected, getServiceAreaPoint, 
    getServiceAreaStreams, getStreamsList, setUserPolygon, changeDrawState, getListComponentsByComponentsAndPolygon, getStreamsByComponentsList, setStreamsIds, setStreamIntersected, updateSelectedLayers, getJurisdictionPolygon, getServiceAreaPolygonofStreams, setZoomGeom } = useProjectDispatch();
  const { streamIntersected, isDraw, streamsIntersectedIds, isAddLocation, listComponents, selectedLayers, highlightedComponent, editLocation, componentGeom, zoomGeom, highlightedProblem } = useProjectState();
  const {groupOrganization} = useProfileState();
  const [selectedCheckBox, setSelectedCheckBox] = useState(selectedLayers);
  const [layerFilters, setLayerFilters] = useState(layers);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [localAOI, setLocalAOI] = useState(type.locality);
  const [coordinatesJurisdiction, setCoordinatesJurisdiction] = useState([]);
  const hovereableLayers = [PROBLEMS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS,
    MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, ROUTINE_NATURAL_AREAS,
    ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR,
    LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA,
    CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT,
    PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, COMPONENT_LAYERS.tiles];
  const notComponentOptions: any[] = [MENU_OPTIONS.NCRS_SOILS, MENU_OPTIONS.DWR_DAM_SAFETY, MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
  MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE, MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID, MENU_OPTIONS.RESEARCH_MONITORING, MENU_OPTIONS.CLIMB_TO_SAFETY, MENU_OPTIONS.SEMSWA_SERVICE_AREA,
  MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR, MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA, MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
  MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA, MENU_OPTIONS.WATERSHED, MENU_OPTIONS.SERVICE_AREA, MENU_OPTIONS.MEP_STORM_OUTFALL,
  MENU_OPTIONS.MEP_CHANNEL, MENU_OPTIONS.MEP_DETENTION_BASIN, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.MEP_TEMPORARY_LOCATION, MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS
  ];
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  const empty: any[] = [];
  const [allLayers, setAllLayers] = useState(empty);
  const [counterPopup, setCounterPopup] = useState({ componentes: 0 });  
  const [data, setData] = useState({
    problemid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
    cartoid: ''
  });
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map3');
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if (!map) {
          map = new MapService('map3');
          setLayersSelectedOnInit();
          map.loadImages();
        }
      }
    };
    map = undefined;
    setZoomGeom(undefined);
    waiting();
    eventService.setRef('click',eventClick);
    eventService.setRef('move', eventMove);
    eventService.setRef('addmarker', addMarker);
    eventService.setRef('oncreatedraw', onCreateDraw);
    changeAddLocationState(false);
    // setComponentIntersected([]);
    componentsList = [];
      getData(`${SERVER.URL_BASE}/locality/`, getToken())
        .then(
          (r: any) => {
            if (r.localities.length > 0) {
              setLocalAOI(r.localities[0].name);
            }
          },
          (e) => {
            console.log('e', e);
          }
        )
  }, []);
  useEffect(()=>{
    if(editLocation && editLocation[0]){
      setTimeout(()=>{
        map.isStyleLoaded(() => {AddMarkerEdit({lat: editLocation[0][1], lng: editLocation[0][0] + 0.0005});})
      },1300);
    }
  },[editLocation]);
  useEffect(()=>{
    if(zoomGeom && zoomGeom.geom) {
      let cg = zoomGeom.geom?JSON.parse(zoomGeom.geom):undefined;
      if(cg.type === 'MultiLineString') {
        let poly = turf.multiLineString(cg.coordinates);
        let bboxBounds = turf.bbox(poly);
        if(map.map){
          map.map.fitBounds(bboxBounds,{ padding:80});
        }
      } else if(cg.type === 'Point') {
        let poly = turf.point(cg.coordinates);
        let bboxBounds = turf.bbox(poly);
        if(map.map){
          map.map.fitBounds(bboxBounds,{ padding:80});
        }
      } else if ( cg.type === 'MultiPolygon'){
        let poly = turf.multiPolygon(cg.coordinates);
        let bboxBounds = turf.bbox(poly);
        if(map.map){
          map.map.fitBounds(bboxBounds,{ padding:80});
        }
      } else {
        console.log("DIFF", cg);
      }
        
    }
  },[zoomGeom])
  useEffect(()=>{
    if (map) {
      if (highlightedComponent.table) {
          showHighlighted(highlightedComponent.table, highlightedComponent.cartodb_id);
      } else {
          hideHighlighted();
      }
    }
  },[highlightedComponent]);
  useEffect(()=>{
    if (map) {
      if (highlightedProblem.problemid) {
          showHighlightedProblem(highlightedProblem.problemid);
          console.log("UPDATE");
          updateSelectedLayers([...selectedLayers,PROBLEMS_TRIGGER]);;
      } else {
          hideHighlighted();
      }
    }
  },[highlightedProblem]);
  const [opacityLayer, setOpacityLayer] = useState(false);
  const polyMask = (mask: any, bounds: any) => {
    if (mask !== undefined && bounds.length > 0) {
        var bboxPoly = turf.bboxPolygon(bounds);
        return turf.difference(bboxPoly, mask);
    }
  }
//   useEffect(() => {
//     let mask
//     setTimeout(() => {
//       map.isStyleLoaded(()=>{
//         if (coordinatesJurisdiction.length > 0) {
//           mask = turf.multiPolygon(coordinatesJurisdiction);
//           let miboundsmap = map.map.getBounds();
//           // let boundingBox1 = miboundsmap.map._sw.lng + ',' + miboundsmap.map._sw.lat + ',' + miboundsmap.map._ne.lng + ',' + miboundsmap.map._ne.lat;
//           let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
  
//           var arrayBounds = misbounds.split(',');
//           setOpacityLayer(true);
//           if (!map.map.getLayer('mask')) {
//               map.map.addSource('mask', {
//                   "type": "geojson",
//                   "data": polyMask(mask, arrayBounds)
//               });
  
//               map.map.addLayer({
//                   "id": "mask",
//                   "source": "mask",
//                   "type": "fill",
//                   "paint": {
//                       "fill-color": "black",
//                       'fill-opacity': 0.8
//                   }
//               });
//               map.map.addLayer({
//                 "id": "mask-border",
//                 "source": "mask",
//                 "type": "line",
//                 "paint": {
//                   'line-color': '#28c499',
//                   'line-width': 1,
//                 }
//               });
//           } else {
//               map.map.setLayoutProperty('mask', 'visibility', 'visible');
//               map.map.removeLayer('mask');
//               map.map.removeSource('mask');
//               map.map.addSource('mask', {
//                   "type": "geojson",
//                   "data": polyMask(mask, arrayBounds)
//               });

//               map.map.addLayer({
//                   "id": "mask",
//                   "source": "mask",
//                   "type": "fill",
//                   "paint": {
//                       "fill-color": "black",
//                       'fill-opacity': 0.8
//                   }
//               });
//               map.map.addLayer({
//                 "id": "mask-border",
//                 "source": "mask",
//                 "type": "line",
//                 "paint": {
//                   'line-color': '#28c499',
//                   'line-width': 1,
//                 }
//               });
//           }
//           } else {
//               if (opacityLayer) {
//                   if  (map.map.loaded()) {
//                       if (map.map.getLayer('mask')) {
//                           map.map.setLayoutProperty('mask', 'visibility', 'visible');
//                           map.map.removeLayer('mask');
//                           map.map.removeSource('mask');
//                       }
//                       if (map.map.getLayer('mask-border')) {
//                         map.map.setLayoutProperty('mask-border', 'visibility', 'visible');
//                         map.map.removeLayer('mask-border');
//                         map.map.removeSource('mask-border');
//                     }
//                   }
//               }
  
//           }
//       });  
//     }, 1500);
    
    
// }, [coordinatesJurisdiction]);
  const setBounds = (value:any) => {
    const zoomareaSelected = groupOrganization.filter((x: any) => value.includes(x.aoi)).map((element: any) => {
      return {
        aoi: element.aoi,
        filter: element.filter,
        coordinates: element.coordinates
      }
    });
    if(zoomareaSelected[0]){
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      // mask = turf.multiPolygon(coordinatesJurisdiction);
      let poly = turf.multiPolygon(zoomareaSelected[0].coordinates, {name: 'zoomarea'});
      // let coord = turf.centroid(poly);
      // if(coord.geometry && coord.geometry.coordinates) {
      //   let value = coord.geometry.coordinates;
      //     map.map.flyTo({ center: value, zoom: 10 });
      // }
      let bboxBounds = turf.bbox(poly);
      if(map.map){
        map.map.fitBounds(bboxBounds,{ padding:10, maxZoom: 13});
      }
    }
  }
  const wait = (cb:any) => {
    
    if (!map.map) {
      setTimeout(wait, 50);
    } else {
        cb();
    }
  };
  useEffect(()=>{
    if(type.projectid != -1 && type.projectid) {
      getData(`${SERVER.URL_BASE}/board/bbox/${type.projectid}`)
      .then(
        (r: any) => { 
          if(r.bbox){
            let BBoxPolygon = JSON.parse(r.bbox);
            let bboxBounds = turf.bbox(BBoxPolygon);
            if(map.map){
              setTimeout(()=>{
                map.isStyleLoaded(() => map.map.fitBounds(bboxBounds,{ padding:90 }));
              }, 3000);              
            }
          }
        },
        (e:any) => {
          console.error('Error getting bbox projectid', e);
        }
      )
    }
  },[type.projectid]);
  useEffect(()=>{
    setTimeout(()=>{
      let value = localAOI;
      if(type.locality) {
        value = type.locality;
      } 
      if(groupOrganization.length > 0) {
        wait(()=>setBounds(value));
      }
    },500);
  },[groupOrganization, type.locality, localAOI]);
  useEffect(()=>{
    if(listComponents && listComponents.result && listComponents.result.length > 0) {
      if(type.type === 'CAPITAL') {
        getStreamsByComponentsList(listComponents.result);
      }
      
      componentsList = listComponents.result;
    } else {
      setStreamIntersected({geom:null});
      setStreamsIds([]);
    }
  },[listComponents]);
  
  useEffect(() => {
    if (data.problemid || data.cartoid) {
      setVisible(true);
    }
  }, [data]);
  useEffect(()=>{
    if(isAddLocation){
      let eventToClick = eventService.getRef('click');
      // map.map.off('click', eventToClick);
      isPopup = false;
      let eventToMove = eventService.getRef('move');
      map.map.on('mousemove',eventToMove);
      
      let eventToAddMarker = eventService.getRef('addmarker');
      map.map.on('click',eventToAddMarker);
    } else {
      
      let eventToMove = eventService.getRef('move');
      map.map.off('mousemove', eventToMove);
      let eventToAddMarker = eventService.getRef('addmarker');
      map.map.off('click',eventToAddMarker);
      isPopup = true;
      // map.map.on('click', eventToClick);
      map.removePopUpOffset();
      marker.remove();
      marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
    }
    
  },[isAddLocation]); 
  useEffect(() => {
    if(isDraw) {
      if (type.type != 'ACQUISITION' && type.type != 'SPECIAL') {
        // let eventToClick = eventService.getRef('click');
        // map.map.off('click', eventToClick);
        isPopup = false;
        map.addDrawControllerTopLeft();
        let drawEvent = eventService.getRef('oncreatedraw');
        map.deleteDraw(drawEvent);
        setTimeout(()=>{
          map.createDraw(drawEvent);
          setTimeout(()=>{
            let elements = document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon');
            let element: HTMLElement = elements[0] as HTMLElement;
            if(element) {
              element.click();
            }
          },500);
        },200);
      }
    } else {
      isPopup = true;
      map.removeDrawController();
      // let eventToClick = eventService.getRef('click');
      // map.map.on('click', eventToClick);
    }
  }, [isDraw]);
  useEffect(() => {
    let geom: any = undefined;
    if (streamIntersected && streamIntersected.geom) {
      if(type.type == 'CAPITAL' || type.type == 'MAINTENANCE') {
        getServiceAreaPolygonofStreams(streamIntersected.geom);
      }
      geom = JSON.parse(streamIntersected.geom);
      let cg = componentGeom?JSON.parse(componentGeom.geom):undefined;
      if(type.problemId && geom.coordinates.length > 0) {
        let poly = turf.multiLineString(geom.coordinates);
        let bboxBounds = turf.bbox(poly);
        if(map.map){
          map.map.fitBounds(bboxBounds,{ padding:80});
        }
      } else if( type.problemId && cg){
        let poly = turf.multiLineString(cg.coordinates);
        // let point = turf.point(cg.coordinates);
        let bboxBounds = turf.bbox(poly);
        // let bboxBoundsP = turf.bbox(point);
        if(map.map){
          map.map.fitBounds(bboxBounds,{ padding:80});
        }
      }
      if(geom) {
        map.isStyleLoaded(() => {
          map.removeLayer('streamIntersected');
          map.removeSource('streamIntersected');
          if (!map.map.getSource('streamIntersected')) {
            map.map.addSource('streamIntersected', {
              'type': 'geojson',
              'data': { type: 'Feature', geometry: geom, properties: [] }
            });
          }
          if (!map.getLayer('streamIntersected')) {
            map.map.addLayer({
              'id': 'streamIntersected',
              'type': 'line',
              'source': 'streamIntersected',
              'layout': {},
              'paint': {
                'line-color': '#eae320',
                'line-width': 3.5,
              }
            });
          }
  
        });
      }
    
    } else {
      if (map && map.map.isStyleLoaded() ) {
        map.removeLayer('streamIntersected');
        map.removeSource('streamIntersected');
      }
    }

    

  }, [streamIntersected]);
  useEffect(()=>{
    if(streamsIntersectedIds.length > 0) {
      let streamsCodes:any = streamsIntersectedIds.map((str:any) => str.mhfd_code);
      map.isStyleLoaded( () => {
        let filter = ['in',['get','unique_mhfd_code'],['literal',[...streamsCodes]]];
        // ['in', ['get', 'cartodb_id'], ['literal', [...filters[key]]]]
        
        map.removeLayer('streams-intersects');
        if (!map.getLayer('streams-intersects')) {
          map.map.addLayer({
            'id': 'streams-intersects',
            'type': 'line',
            'source': 'mhfd_stream_reaches',
            'source-layer': 'pluto15v1',
            'layout': {},
            'paint': {
              'line-color': '#eae320',
              'line-width': 3.5,
            },
            'filter':filter
          });
          
        }
      });
        
    } else {
      map.removeLayer('streams-intersects');
    }
    
    

  },[streamsIntersectedIds]);
  useEffect(() => {
    if (map) {
      map.create();
      setLayerFilters(layers);
      map.map.on('style.load', () => {
        applyMapLayers();
        let eventToClick = eventService.getRef('click');
        map.map.on('click',eventToClick);
        // map.map.on('movestart', () => {
        //   if (map.map.getLayer('mask')) {
        //       map.map.setLayoutProperty('mask', 'visibility', 'visible');
        //       map.map.removeLayer('mask');
        //       map.map.removeSource('mask');
        //   }
        // })
      });
      
    }
  }, [map])

  useEffect(() => {
    if (map ) {
      // deleteUpdateLayers(selectedLayers);
      map.isStyleLoaded(applyMapLayers);
    }
    eventService.setRef('oncreatedraw', onCreateDraw);
    eventService.setRef('addmarker', addMarker);
  }, [selectedLayers]);

  const setLayersSelectedOnInit = () => {
    let ppArray:any = [];
    if(!type.isEdit) { 
      if(type.type!="STUDY") {
        ppArray = [PROJECTS_MAP_STYLES];
      } else { 
        ppArray = [PROBLEMS_TRIGGER];
      }
    }
    let thisSL = [ ...ppArray, MHFD_BOUNDARY_FILTERS];
    if (type.type == 'CAPITAL' || type.type == 'ACQUISITION') {
      thisSL = [ ...ppArray, MHFD_BOUNDARY_FILTERS, COMPONENT_LAYERS];
    } else if( type.type == 'STUDY') {
      thisSL = [ MHFD_BOUNDARY_FILTERS  ];
    } else if (type.type == 'MAINTENANCE') {
      thisSL = [...ppArray, MHFD_BOUNDARY_FILTERS, ROUTINE_MAINTENANCE]
    } 
    updateSelectedLayers(thisSL);
  }
  const removeProjectLayer = () => {
    let filterLayers = selectedLayers.filter( (Layer:any) => {
      if(Layer.name) {
        return !(Layer.name == 'projects')
      } else {
        return true;
      }
    });
    const deleteLayers = selectedLayers.filter((layer: any) => !filterLayers.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    updateSelectedLayers(filterLayers);
  }
  const onCreateDraw = (event: any) => {
    removeProjectLayer();
    const userPolygon = event.features[0];
    if (type.type === 'CAPITAL') {
      // getStreamIntersectionSave(userPolygon.geometry);
      // getListComponentsIntersected(userPolygon.geometry);
      getListComponentsByComponentsAndPolygon(componentsList, userPolygon.geometry);
    } else if (type.type === 'MAINTENANCE') {
      getStreamIntersectionPolygon(userPolygon.geometry);
    } else if (type.type === 'STUDY') {
      type.setGeom(userPolygon.geometry);
      getStreamsIntersectedPolygon(userPolygon.geometry); // just set the ids 
      getStreamsList(userPolygon.geometry); // get the list with data 
      getServiceAreaStreams(userPolygon.geometry); 
    }
    
    getJurisdictionPolygon(userPolygon.geometry);
    setUserPolygon(userPolygon.geometry);
    setTimeout(()=>{
      let elements = document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash');
      let element: HTMLElement = elements[0] as HTMLElement;
      if(element) {
        element.click();
      }
      changeDrawState(false);
    },2500);
    // const polygonBoundingBox = turf.bbox(userPolygon);
    // const southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
    // const northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];
    // const northEastPointPixel = map.map.project(northEast);
    // const southWestPointPixel = map.map.project(southWest);
    // let totalFeatures: Array<any> = [];
    // for(let key of COMPONENT_LAYERS.tiles) {
    //     if(map.getLayer(key+'_0')) {
    //       const featuresComponents = map.map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], {layers: [key+'_0']}); 
    //       totalFeatures = [...totalFeatures, ...featuresComponents];
    //     } 
    // }
    // let featuresIntersected = getFeaturesIntersected(totalFeatures, userPolygon);
    // let hull: any = getHull(featuresIntersected);
    // map.removeLayer('hull');
    // map.removeSource('hull'); 
    // if(!map.map.getSource('hull')) {
    //   map.map.addSource('hull', {
    //     'type': 'geojson',
    //     'data': hull
    //   });
    // }
    // if(!map.getLayer('hull')){
    //   map.map.addLayer({
    //     'id': 'hull',
    //     'type': 'fill',
    //     'source': 'hull',
    //     'layout': {},
    //     'paint': {
    //     'fill-color': '#088',
    //     'fill-opacity': 0.8
    //     }
    //   });
    // }


  }
  const applyMapLayers = async () => {
    await SELECT_ALL_FILTERS.forEach((layer) => {
      if (typeof layer === 'object') {
        if (layer.tiles) {
          layer.tiles.forEach((subKey: string) => {
            const tiles = layerFilters[layer.name] as any;
            if (tiles) {
              addLayersSource(subKey, tiles[subKey]);
            }
          });
        }
      } else {
        addLayersSource(layer, layerFilters[layer]);
      }
    });
    const deleteLayers = SELECT_ALL_FILTERS.filter((layer: any) => !selectedLayers.includes(layer as string));
    await deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    await selectedLayers.forEach((layer: LayersType) => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          showLayers(subKey);
        });
      } else {
        showLayers(layer);
      }
    });
    applyFilters('problems', filterProblems);
    let filterProjectsNew = filterProjects;
    if (type.type === 'SPECIAL') {
      filterProjectsNew.projecttype = "Special";
    } else if (type.type === 'STUDY') {
      filterProjectsNew.projecttype = "Study";
    } else {
      filterProjectsNew.projecttype = "Maintenance,Capital";
    }
    applyFilters('mhfd_projects', filterProjectsNew);
    if (type.type === "CAPITAL") {
      // applyComponentFilter();
    }
    
  }
  const applyMhfdFilter = () => {
    const styles = { ...tileStyles as any };
    styles['mhfd_projects'].forEach((style: LayerStylesType, index: number) => {
      console.log("HEY", map.map.getFilter('mhfd_projects_' + index));
    });
  }
  const applyComponentFilter = () => {
    const styles = { ...COMPONENT_LAYERS_STYLE as any };
    Object.keys(styles).forEach(element => {
      for (let i = 0; i < styles[element].length; ++i) {
        if (map.map.getLayer(element + "_" + i)) {
          map.map.setFilter(element + '_' + i, ['!has', 'projectid']);
        }
      }
    });
  }
  const showLayers = (key: string) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(key + '_' + index)) {
        map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        if (COMPONENT_LAYERS.tiles.includes(key) && filterComponents) {
          showSelectedComponents(filterComponents.component_type.split(','));
        }
      }
    });
  };

  const showSelectedComponents = (components: string[]): void => {
    if (!components.length || components[0] === '') {
      return;
    }
    const styles = { ...tileStyles as any };
    for (const key of COMPONENT_LAYERS.tiles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!components.includes(key)) {
          // map.setFilter(key + '_' + index, ['in', 'cartodb_id', -1]);
        }
      });
    }
  }

  const applyFilters = (key: string, toFilter: any) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (!map.getLayer(key + '_' + index)) {
        return;
      }
      const allFilters: any[] = ['all'];
      for (const filterField in toFilter) {
        const filters = toFilter[filterField];
        if (filterField === 'component_type') {
          showSelectedComponents(filters.split(','));
        }
        if (filterField === 'keyword') {
          if (filters[key]) {
            allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...filters[key]]]]);
          }
        }
        if (filters && filters.length) {
          const options: any[] = ['any'];
          if (filterField === 'keyword') {
            continue;
          }
          if (filterField === 'component_type') {
            continue;
          }
          if (filterField === 'year_of_study') {
            for (const years of filters.split(',')) {
              const lowerArray: any[] = ['>=', ['get', filterField], +years];
              const upperArray: any[] = ['<=', ['get', filterField], +years + 9];
              options.push(['all', lowerArray, upperArray]);

            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'components') {
            allFilters.push(['in', ['get', 'problemid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemtypeProjects') {
            allFilters.push(['in', ['get', 'projectid'], ['literal', [...filters]]]);
            continue;
          }
          if (filterField === 'problemname' || filterField === 'projectname') {
            continue;
          }
          if (filterField === 'estimatedcost') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            for (const range of toFilter['finalcost']) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', 'finalcost']], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', 'finalcost']], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
            allFilters.push(options);
            continue;
          }
          if (filterField === 'finalcost') {
            continue;
          }
          if (filterField === 'startyear') {
            const lowerArray: any[] = ['>=', ['get', filterField], +filters];
            const upperArray: any[] = ['<=', ['get', 'completedyear'], +toFilter['completedyear']];
            if (+toFilter['completedyear'] !== 9999) {
              allFilters.push(['all', lowerArray, upperArray]);
            } else {
              if (+filters) {
                allFilters.push(lowerArray);
              }
            }
            continue;
          }
          if (filterField === 'servicearea') {
            allFilters.push(['==', ['get', filterField], filters]);
            continue;
          }
          if (filterField === 'completedyear') {
            continue;
          }
          if (typeof filters === 'object') {
            for (const range of filters) {
              const [lower, upper] = range.split(',');
              const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
              const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
              const allFilter = ['all', lowerArray, upperArray];
              options.push(allFilter);
            }
          } else {
            for (const filter of filters.split(',')) {
              if (isNaN(+filter)) {
                options.push(['==', ['get', filterField], filter]);
              } else {
                const equalFilter: any[] = ['==', ['to-number', ['get', filterField]], +filter];
                options.push(equalFilter);
              }
            }
          }
          allFilters.push(options);
        }
      }
      if (componentDetailIds && componentDetailIds[key]) {
        allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...componentDetailIds[key]]]]);
      }

      if (map.getLayer(key + '_' + index)) {
        //console.log(key + '_' + index, allFilters);
        map.setFilter(key + '_' + index, allFilters);
      }
    });
  };
  const deleteUpdateLayers = (selectedItems: Array<LayersType>) => {
    const deleteLayers = SELECT_ALL_FILTERS.filter((layer: any) => !selectedItems.includes(layer as string));
    setTimeout(()=>{
      map.isStyleLoaded(() => {
        deleteLayers.forEach((layer: LayersType) => {
          removeTilesHandler(layer);
        });
      })
    },300);
    
  }
  const selectCheckboxes = (selectedItems: Array<LayersType>) => {
    const deleteLayers = selectedLayers.filter((layer: any) => !selectedItems.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    updateSelectedLayers(selectedItems);
  }
  const hideLayers = (key: string) => {
    if (map) {
      const styles = { ...tileStyles as any };
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.map.getLayer(key + '_' + index)) {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
        }
      });
    }
  };
  const removeTilesHandler = (selectedLayer: LayersType) => {
    if (typeof selectedLayer === 'object') {
      selectedLayer.tiles.forEach((subKey: string) => {
        hideLayers(subKey);
      });
    } else {
      hideLayers(selectedLayer);
    }
  }
  const addLayersSource = (key: string, tiles: Array<string>) => {
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      map.map.addSource(key, {
        type: 'vector',
        tiles: tiles
      });
      addTilesLayers(key);
    }
  }

  const addTilesLayers = (key: string) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      map.map.addLayer({
        id: key + '_' + index,
        source: key,
        ...style
      });
      if (!key.includes('streams')) {
        map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
      }

      if (!hovereableLayers.includes(key)) {
        return;
      }
      if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
        if(key != 'problems') {
          map.map.addLayer({
            id: key + '_highlight_' + index,
            source: key,
            type: 'line',
            'source-layer': 'pluto15v1',
            layout: {
              visibility: 'visible'
            },
            paint: {
              'line-color': '#fff',
              'line-width': 7,
            },
            filter: ['in', 'cartodb_id']
          });  
        } else {
          map.map.addLayer({
            id: key + '_highlight_' + index,
            source: key,
            type: 'line',
            'source-layer': 'pluto15v1',
            layout: {
              visibility: 'visible'
            },
            paint: {
              'line-color': '#fff',
              'line-width': 7,
            },
            filter: ['in','problemid']
          });
        }
      }
      if (style.type === 'circle' || style.type === 'symbol') {
        map.map.addLayer({
          id: key + '_highlight_' + index,
          type: 'circle',
          'source-layer': 'pluto15v1',
          source: key,
          layout: {
            visibility: 'visible'
          },
          paint: {
            'circle-color': '#FFF',
            'circle-radius': 7,
            'circle-opacity': 1
          },
          filter: ['in', 'cartodb_id']
        });
      }

    });
    addMapListeners(key);
  }
  const addMapListeners = async (key: string) => {
    const styles = { ...tileStyles as any };
    const availableLayers: any[] = [];
    if (styles[key]) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.map.getLayer(key + '_' + index)) {
          return;
        }
        availableLayers.push(key + '_' + index);
        /* map.on('click', key + '_' + index, (e: any) => {
              let html: any = null;
              if (map.getLayoutProperty(key + '_' + index, 'visibility') === 'none') {
                  return;
              }
              let itemValue;


              const description = e.features[0].properties.description ? e.features[0].properties.description : '-';
              if (html) {
                  popup.remove();
                  popup = new mapboxgl.Popup();
                  popup.setLngLat(e.lngLat)
                      .setHTML(html)
                      .addTo(map);
                  document.getElementById('pop-up')?.addEventListener('click', test.bind(itemValue, itemValue));
              }
          });
          */
        map.map.on('mousemove', key + '_' + index, (e: any) => {
          if (hovereableLayers.includes(key)) {
            showHighlighted(key, e.features[0].properties.cartodb_id);
          }
          if (key.includes('projects') || key === 'problems') {
            map.map.getCanvas().style.cursor = 'pointer';
            setSelectedOnMap(e.features[0].properties.cartodb_id, key);
          } else {
            setSelectedOnMap(-1, '');
          }
        });
        map.map.on('mouseleave', key + '_' + index, (e: any) => {
          if (hovereableLayers.includes(key)) {
            hideOneHighlighted(key);
          }
          map.map.getCanvas().style.cursor = '';
          setSelectedOnMap(-1, '');
        });
      });
      setAllLayers(allLayers => [...allLayers, ...availableLayers]);

      map.map.on('mouseenter', key, () => {
        map.map.getCanvas().style.cursor = 'pointer';
      });
      map.map.on('mouseleave', key, () => {
        map.map.getCanvas().style.cursor = '';
      })
    }
  }
  const test = (item: any) => {
    setVisible(true);
    setData(item);
    if (item.problemid) {
      existDetailedPageProblem(item.problemid);
    } else {
      const url = 'projectid' + (item.projectid || item.id) + '&type=' + item.type;
      existDetailedPageProject(url);
    }
  }
  const showHighlightedProblem = (problemid: string) => {
    const styles = { ...tileStyles as any }
    // console.log("SHOW HL", key, cartodb_id);
    styles['problems'].forEach((style: LayerStylesType, index: number) => {
      // console.log("ENTERDS ", index, map.getLayer('problems' + '_' + index), map.getLayer('problems' + '_highlight_' + index, 'visibility'));
      if (map.getLayer('problems' + '_' + index)) {
        // ['get','unique_mhfd_code'],['literal',[...streamsCodes]]]
        map.setFilter('problems' + '_highlight_' + index, ['in','problemid', parseInt(problemid)])
        
      }
    });
  }
  const showHighlighted = (key: string, cartodb_id: string) => {
    const styles = { ...tileStyles as any }
    // console.log("SHOW HL", key, cartodb_id);
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id])
      }
    });
  };
  const hideOneHighlighted = (key: string) => {
    const styles = { ...tileStyles as any }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
      }
    });
  };
  const hideHighlighted = () => {
    const styles = { ...tileStyles as any };
    for (const key in styles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.getLayer(key + '_highlight_' + index)) {
          map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
        }
      });
    }
  };
  const showPopup = (index: any, size: number, id: any, event: any) => {
    hideHighlighted();
    showHighlighted(id.layer, id.id);
    for (let i = 0; i < size; i++) {
      const div = document.getElementById('popup-' + i);
      if (div != null) {
        div.classList.remove('map-pop-03');
        // div.classList.add('map-pop-00');
      }
    }
    const div = document.getElementById('popup-' + index);
    if (div != null) {
      // div.classList.remove('map-pop-00');
      div.classList.add('map-pop-03');

    }
    return;
  }
  const seeDetails = (details: any, event: any) => {
    if (details.problemid) {
      setData({
        id: '',
        objectid: '',
        cartoid: '',
        type: '',
        value: '',
        problemid: details.problemid
      });
    } else {
      setData({
        id: details.id !== '-' ? details.id : undefined,
        objectid: details.objectid,
        cartoid: details.valueid,
        type: details.type,
        value: details.valueid,
        problemid: ''
      });
    }

  }
  const addPopupMarker = (point: any, html: any) => {
    popup.remove();

    map.addPopUpOffset(point, html);

      let menuElement = document.getElementById('menu-marker');
      if (menuElement != null) {
        menuElement.addEventListener('click',() => { 
          map.removePopUpOffset();
          marker.remove();
          marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
          changeAddLocationState(false);
        } );
      }
      let closeElement = document.getElementById('closepopupmarker');
      if (closeElement != null) {
        closeElement.addEventListener('click',() => { 
          map.removePopUpOffset();
        } );
      }
      

  }
  const AddMarkerEdit = (e: any) => {
    
    const html = loadPopupMarker();
    if (html) {
      popup.remove();
      marker.setLngLat([e.lng, e.lat]).addTo(map.map);
      let point = {lng:e.lng, lat: e.lat};
      marker.getElement().addEventListener('click', () => {
        addPopupMarker(point,html);
      });
      let sendLine = { geom: { type: 'MultiLineString', coordinates: [ [[e.lng-0.0005, e.lat], [e.lng+0.0005, e.lat]] ]} };
      if (type.type === 'SPECIAL') {
        saveSpecialLocation(sendLine);
      } else if (type.type === 'ACQUISITION') {
        saveAcquisitionLocation(sendLine);
      }
      isPopup = true;
    }
  }
  const addMarker = (e: any) => {
    removeProjectLayer();
    const html = loadPopupMarker();
    e.originalEvent.stopPropagation();
    if (html) {
      map.removePopUpOffset();
      popup.remove();
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
      let point = e.lngLat;
      marker.getElement().addEventListener('click', () => {
        addPopupMarker(point,html);
      });
      let sendLine = { geom: { type: 'MultiLineString', coordinates: [ [[e.lngLat.lng-0.0005, e.lngLat.lat], [e.lngLat.lng+0.0005, e.lngLat.lat]] ]} };
      if (type.type === 'SPECIAL') {
        saveSpecialLocation(sendLine);
      } else if (type.type === 'ACQUISITION') {
        saveAcquisitionLocation(sendLine);
      }
      getServiceAreaPoint(sendLine);
      let eventToMove = eventService.getRef('move');
      map.map.off('mousemove', eventToMove);
      let eventToAddMarker = eventService.getRef('addmarker');
      map.map.off('click',eventToAddMarker);
      // marker.setPopup(html);
      // let eventToClick = eventService.getRef('click');
      // map.map.on('click', eventToClick);
      isPopup = true;
    }
  }
  const eventMove = (e:any) => {
    marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
  }
  const eventClick = (e: any) => {
    
    if(!isPopup){
      return;
    }
    hideHighlighted();
    const popups: any = [];
    const mobile: any = [];
    const menuOptions: any = [];
    const ids: any = [];
    const mobileIds: any = [];
    const bbox = [e.point.x, e.point.y,
    e.point.x, e.point.y];
    setMobilePopups([]);
    setActiveMobilePopups([]);
    setSelectedPopup(-1);
    let features = map.map.queryRenderedFeatures(bbox, { layers: allLayers });
    if (features.length === 0) {
      return;
    }
    const search = (id: number, source: string) => {
      let index = 0;
      for (const feature of features) {
        if (feature.properties.cartodb_id === id && source === feature.source) {
          return index;
        }
        index++;
      }
      return -1;
    }
    if ((e.point.x === coordX || e.point.y === coordY)) {
      return;
    }
    coordX = e.point.x;
    coordY = e.point.y;
    if (features.length != 0) {
      previousClick = true;
    }
    features = features.filter((element: any, index: number) => {
      return search(element.properties.cartodb_id, element.source) === index;
    });
    features.sort((a: any, b: any) => {
      //first sort the projects then problems, then alphabetical
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
      //an special and tricky case
      if (feature.layer.id.includes('_line') && feature.layer.type === 'symbol') {
        continue;
      }
      let html: any = null;
      let itemValue;
      if (feature.source === 'projects_polygon_' || feature.source === 'mhfd_projects') {
        getComponentCounter(feature.properties.projectid || 0, 'projectid', setCounterPopup);
        const filtered = galleryProjects.filter((item: any) =>
          item.cartodb_id === feature.properties.cartodb_id
        );
        const item = {
          type: 'project',
          title: MENU_OPTIONS.PROJECT,
          name: feature.properties.projectname ? feature.properties.projectname : feature.properties.requestedname ? feature.properties.requestedname : '-',
          organization: feature.properties.sponsor ? feature.properties.sponsor : 'No sponsor',
          value: feature.properties.finalcost ? feature.properties.finalcost : feature.properties.estimatedcost ? feature.properties.estimatedcost : '0',
          projecctype: feature.properties.projectsubtype ? feature.properties.projectsubtype : feature.properties.projecttype ? feature.properties.projecttype : '-',
          status: feature.properties.status ? feature.properties.status : '-',
          objectid: feature.properties.objectid,
          valueid: feature.properties.cartodb_id,
          id: feature.properties.projectid,
          popupId: 'popup',
          image: filtered.length && filtered[0].attachments ? filtered[0].attachments : (
            feature.properties.projecttype === 'Capital' ? '/projectImages/capital.jpg' :
              feature.properties.projecttype === 'Study' ? '/projectImages/study.jpg' :
                feature.properties.projecttype === 'Maintenance' ?
                  (feature.properties.projectsubtype === 'Vegetation Mangement' ? '/projectImages/vegetation_management.jpg' :
                    feature.properties.projectsubtype === 'Sediment Removal' ? '/projectImages/sediment_removal.jpg' :
                      feature.properties.projectsubtype === 'Restoration' ? '/projectImages/restoration.jpg' :
                        feature.properties.projectsubtype === 'Minor Repairs' ? '/projectImages/minor_repairs.jpg' :
                          '/projectImages/debris_management.png') : '/Icons/eje.png')
        };
        mobile.push({
          type: 'project',
          name: item.name,
          value: item.value,
          projecttype: item.projecctype,
          image: item.image,
          //for detail popup
          id: item.id,
          objectid: item.objectid,
          valueid: item.valueid
        });
        itemValue = { ...item };
        // itemValue.value = item.valueid;
        menuOptions.push(MENU_OPTIONS.PROJECT);
        popups.push(itemValue);
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === MENU_OPTIONS.PROBLEMS) {
        getComponentCounter(feature.properties.problemid || 0, 'problemid', setCounterPopup);
        const item = {
          type: MENU_OPTIONS.PROBLEMS,
          title: feature.properties.problemtype ? (feature.properties.problemtype + ' Problem') : '-',
          name: feature.properties.problemname ? feature.properties.problemname : '-',
          organization: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
          value: feature.properties.solutioncost ? feature.properties.solutioncost : '0',
          status: feature.properties.solutionstatus ? (feature.properties.solutionstatus + '%') : '-',
          priority: feature.properties.problempriority ? feature.properties.problempriority + ' Priority' : '-',
          problemid: feature.properties.problemid,
          popupId: 'popup',
          image: `gallery/${feature.properties.problemtype}.jpg`,
        };
        itemValue = { ...item };
        mobile.push({
          type: MENU_OPTIONS.PROBLEMS,
          title: item.title,
          value: item.value,
          name: item.name,
          image: item.image,
          //for detail popup
          problemid: item.problemid
        });
        menuOptions.push('Problem');
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
          servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
        }
        menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          proj_name: item.feature,
          mep_status: item.mepstatus
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
          servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
        }
        menuOptions.push(MENU_OPTIONS.MEP_TEMPORARY_LOCATION);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          proj_name: item.feature,
          mep_status: item.mepstatus
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === 'mep_projects_detention_basins') {
        const item = {
          layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
          feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
          projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
          mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
          mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
          notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
          servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
        }
        menuOptions.push(MENU_OPTIONS.MEP_DETENTION_BASIN);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          proj_name: item.feature,
          mep_status: item.mepstatus
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === 'mep_projects_channels') {
        const item = {
          layer: MENU_OPTIONS.MEP_CHANNEL,
          feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
          projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
          mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
          mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
          notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
          servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
        }
        menuOptions.push(MENU_OPTIONS.MEP_CHANNEL);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          proj_name: item.feature,
          mep_status: item.mepstatus
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === 'mep_projects_storm_outfalls') {
        const item = {
          layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
          feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
          projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
          mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
          mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
          notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
          servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
        }
        menuOptions.push(MENU_OPTIONS.MEP_STORM_OUTFALL);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          proj_name: item.feature,
          mep_status: item.mepstatus
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === 'watershed_service_areas') {
        const item = {
          layer: MENU_OPTIONS.SERVICE_AREA,
          feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
          watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
          constructionmanagers: feature.properties.constructionmanagers ? feature.properties.constructionmanagers : '-',
        }
        mobile.push({
          layer: item.layer,
          watershedmanager: item.watershedmanager,
          constructionmanagers: item.constructionmanagers
        })
        menuOptions.push(MENU_OPTIONS.SERVICE_AREA);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === 'catchments' || feature.source === 'basin') {
        const item = {
          layer: MENU_OPTIONS.WATERSHED,
          feature: feature.properties.str_name ? feature.properties.str_name : 'No name'
        }
        menuOptions.push(MENU_OPTIONS.WATERSHED);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
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
          project_subtype: feature.properties.project_subtype ? feature.properties.project_subtype : '-'
        }
        menuOptions.push(MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR);
        popups.push(item);
        mobile.push({
          layer: MENU_OPTIONS.ROUTINE_MAINTENANCE,
          project_subtype: item.project_subtype,
          frequency: item.debris_frequency
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      // new layers
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
          more_information: feature.properties.more_information
        }
        mobile.push({
          layer: item.layer,
          dam_name: item.dam_name,
          hazard_class: item.hazard_class
        })
        menuOptions.push(MENU_OPTIONS.DWR_DAM_SAFETY);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === STREAM_MANAGEMENT_CORRIDORS) {
        const item = {
          layer: MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
          scale: 'District',//feature.properties.scale,
          date_created: '01/07/2019' //feature.properties.date_created,
        }
        menuOptions.push(MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS);
        popups.push(item);
        mobile.push({
          layer: item.layer,
          scale: item.scale,
          date_created: item.date_created
        });
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === BCZ_PREBLE_MEADOW_JUMPING) {
        const item = {
          layer: MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE,
          expirationdate: feature.properties.expirationdate,
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
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === BCZ_UTE_LADIES_TRESSES_ORCHID) {
        const item = {
          layer: MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID,
          bcz_specname: feature.properties.species_name,
          bcz_expdate: feature.properties.bcz_expdate,
          expirationdate: feature.properties.expirationdate,
          website: 'https://www.fws.gov/mountain-prairie/es/uteLadiestress.php',
          letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0031_ULTO_Denver_Block_Clearance_extension_accessible_signed.pdf',
          map: 'https://www.fws.gov/mountain-prairie/es/species/plants/uteladiestress/BlockClearanceMap2008.pdf'
        }
        mobile.push({
          layer: MENU_OPTIONS.BLOCK_CLEARANCE_ZONE,
          bcz_specname: item.bcz_specname,
          bcz_expdate: item.bcz_expdate
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
        }
        mobile.push({
          layer: item.layer,
          sitename: item.sitename,
          sitetype: item.sitetype
        })
        mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        menuOptions.push(MENU_OPTIONS.RESEARCH_MONITORING);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === CLIMB_TO_SAFETY) {
        const item = {
          layer: MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
        }
        mobile.push(item);
        menuOptions.push(MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }
      if (feature.source === SEMSWA_SERVICE_AREA) {
        const item = {
          layer: MENU_OPTIONS.SEMSWA_SERVICE_AREA,
        }
        menuOptions.push(MENU_OPTIONS.SEMSWA_SERVICE_AREA);
        popups.push(item);
        ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
      }

      for (const component of COMPONENT_LAYERS.tiles) {
        if (feature.source === component) {
          let isAdded = componentsList.find( (i:any) => i.cartodb_id === feature.properties.cartodb_id); 
          let status = 'Add';
          if(isAdded) {
            status = 'Remove';
          } 
          const item = {
            layer: MENU_OPTIONS.COMPONENTS,
            type: feature.properties.type ? feature.properties.type : '-',
            subtype: feature.properties.subtype ? feature.properties.subtype : '-',
            status: feature.properties.status ? feature.properties.status : '-',
            estimatedcost: feature.properties.original_cost ? feature.properties.original_cost : '-',
            studyname: feature.properties.mdp_osp_study_name ? feature.properties.mdp_osp_study_name : '-',
            jurisdiction: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
            original_cost: feature.properties.original_cost ? feature.properties.original_cost : '-',
            table: feature.source ? feature.source : '-',
            cartodb_id: feature.properties.cartodb_id? feature.properties.cartodb_id: '-',
            problem: 'Dataset in development',
            added: status
          };
          const name = feature.source.split('_').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ');
          menuOptions.push(name);
          mobile.push({
            layer: item.layer,
            type: item.type,
            subtype: item.subtype
          })
          mobileIds.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
      }
    }
    if (popups.length) {
      const html = loadMenuPopupWithData(menuOptions, popups);
      setMobilePopups(mobile);
      setActiveMobilePopups(mobileIds);
      setSelectedPopup(0);
      if (html) {

        popup.remove();
        popup = new mapboxgl.Popup();
        popup.setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map.map);
        for (const index in popups) {

          let arrayElements = document.getElementsByClassName('menu-' + index);
          let menuElement = document.getElementById('menu-' + index);
          if (menuElement != null) {
            menuElement.addEventListener('click', (showPopup.bind(index, index, popups.length, ids[index])));
          }
          let buttonElement = document.getElementById('buttonPopup-' + index);
          if (buttonElement != null) {
            buttonElement.addEventListener('click', seeDetails.bind(popups[index], popups[index]));
          }
          let componentElement = document.getElementById('component-'+index);
          if(componentElement) {
            componentElement.addEventListener('click', addRemoveComponent.bind(popups[index],popups[index]));
          }

        }
      }
    }
  }
  const addRemoveComponent = (item: any, event: any)=> {
    let newComponents:any = [];
    if(item.added === 'Add') {
      newComponents = [...componentsList, {
        cartodb_id: item.cartodb_id?item.cartodb_id:'',
        jurisdiction: item.jurisdiction?item.jurisdiction:'',
        original_cost: item.original_cost?item.original_cost:'',
        problemid: null,
        status: item.status?item.status:'',
        table: item.table?item.table:'',
        type: item.type?item.type:''
      }];
    } else {
      newComponents = componentsList.filter( (comp: any) => ( ! (comp.cartodb_id == item.cartodb_id && comp.table == item.table)));
    }
    getListComponentsByComponentsAndPolygon(newComponents, null);
    removePopup();
  }
  useEffect(() => {
    if (allLayers.length < 100) {
      return;
    }
    eventService.setRef('click',eventClick);
    let eventToClick = eventService.getRef('click');
    map.map.on('click',eventToClick);
    return ()=> {
      map.map.off(eventToClick);
    }
  }, [allLayers]);
  const loadMenuPopupWithData = (menuOptions: any[], popups: any[]) => ReactDOMServer.renderToStaticMarkup(

    <>
      {menuOptions.length === 1 ? <> {(menuOptions[0] !== 'Project' && menuOptions[0] !== 'Problem') ? loadComponentPopup(0, popups[0], !notComponentOptions.includes(menuOptions[0])) :
        menuOptions[0] === 'Project' ? loadMainPopup(0, popups[0], test, true) : loadMainPopup(0, popups[0], test)}
      </> :
        <div className="map-pop-02">
          <div className="headmap">LAYERS</div>
          <div className="layer-popup">
            {
              menuOptions.map((menu: any, index: number) => {
                return (
                  <div>
                    <Button id={'menu-' + index} key={'menu-' + index} className={"btn-transparent " + "menu-" + index}><img src="/Icons/icon-75.svg" alt="" /><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
                    {(menu !== 'Project' && menu !== 'Problem') ? loadComponentPopup(index, popups[index], !notComponentOptions.includes(menuOptions[index])) :
                      menu === 'Project' ? loadMainPopup(index, popups[index], test, true) : loadMainPopup(index, popups[index], test)}
                  </div>
                )
              })
            }
          </div>
        </div>}
    </>
  );
  const loadPopupMarker = () => ReactDOMServer.renderToStaticMarkup(
    <>
        <div className="map-pop-02">
          
          <div className="headmap">PROPOSED PROJECT <div id="closepopupmarker" style={{'float': 'right', 'paddingRight': '4px', 'height':'16px', 'cursor':'pointer' }}>&#x2716;</div></div>
          <div className="layer-popup" style={{padding: '21px 13px 0px 10px'}}>
            
            <div>
              {/* <Button id='menu-marker' key='menu-0' className={"btn-transparent " + "menu-0"}><span className="text-popup-00"> Remove Marker</span> </Button> */}
              <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display: 'flex' }}>
                <Button style={{ color: '#28C499', width: '100%' }} id='menu-marker' className="btn-borde">Remove Marker</Button>
              </div>
            </div>
          </div>
        </div>
    </>
    // <div id="popup-0" class="map-pop-01"><div class="ant-card ant-card-bordered ant-card-hoverable"><div class="ant-card-body"><div class="headmap">Components</div><div class="bodymap"><h4><i>Land Acquisition</i> </h4><p><i>Subtype: </i> Easement/ROW Acquisition</p><p><i>Estimated Cost: </i> $540,282</p><p><i>Status: </i> Proposed</p><p><i>Study Name: </i> Second Creek DIA DFA 0053 OSP Ph B</p><p><i>Jurisdiction: </i> Adams County</p><p><i>Problem: </i> Dataset in development</p></div></div></div></div>
  );
 
  const loadMainPopup = (id: number, item: any, test: Function, sw?: boolean) => (
    <>
      <MainPopup id={id} item={item} test={test} sw={sw || !(user.designation === ADMIN || user.designation === STAFF)} ep={false}></MainPopup>
    </>
  );

  const loadComponentPopup = (index: number, item: any, isComponent: boolean) => (
    <>
      <ComponentPopupCreate id={index} item={item} isComponent={isComponent && (user.designation === ADMIN || user.designation === STAFF)}></ComponentPopupCreate>
    </>
  );

  // const popUpContent = (trigger: string, item: any) => ReactDOMServer.renderToStaticMarkup(
  //   <>
  //     {trigger !== COMPONENTS_TRIGGER ?
  //       <MainPopup
  //         trigger={trigger}
  //         item={item} /> :
  //       <ComponentPopup
  //         item={item} />}
  //   </>
  // );

  //geocoder 
  const renderOption = (item: any) => {
    return (
      <Option key={item.center[0] + ',' + item.center[1] + '?' + item.text + ' ' + item.place_name}>
        <div className="global-search-item">
          <h6>{item.text}</h6>
          <p>{item.place_name}</p>
        </div>
      </Option>
    );
  }
  const [keyword, setKeyword] = useState('');
  const [options, setOptions] = useState<Array<any>>([]);

  const handleSearch = (value: string) => {
    setKeyword(value)
    mapSearchQuery(value);
  };

  const onSelect = (value: any) => {
    console.log('onSelect:::', value);
    const keyword = value.split('?');
    const coord = keyword[0].split(',');
    console.log('my coord is ', coord);
    map.map.flyTo({ center: coord, zoom: 14.5 });
    const placeName = keyword[1];
    setKeyword(placeName);
  };
  //end geocoder
  const removePopup = () => {
    popup.remove();
  }
  return <>
    <div className="map">
      <div id="map3" style={{ height: '100%', width: '100%' }}></div>
      {visible && <DetailedModal
        detailed={detailed}
        getDetailedPageProblem={getDetailedPageProblem}
        getDetailedPageProject={getDetailedPageProject}
        loaderDetailedPage={loaderDetailedPage}
        getComponentsByProblemId={getComponentsByProblemId}
        type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
        data={data}
        visible={visible}
        setVisible={setVisible}
        componentsOfProblems={componentsByProblemId}
        loaderTableCompoents={loaderTableCompoents}
        componentCounter={componentCounter}
        getComponentCounter={getComponentCounter}
      />}
      <div className="m-head">
        <Dropdown overlayClassName="dropdown-map-layers"
          visible={visibleDropdown}
          onVisibleChange={(flag: boolean) => {
            // selectCheckboxes(selectedCheckBox);
            setVisibleDropdown(flag);

          }}
          overlay={MapFilterView({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView })}
          trigger={['click']}>
          <Button>
            <span className="btn-02"></span>
          </Button>
        </Dropdown>
        <AutoComplete
          dropdownMatchSelectWidth={true}
          style={{ width: 200 }}
          dataSource={mapSearch.map(renderOption)}
          onSelect={onSelect}
          onSearch={handleSearch}
          value={keyword}
        >
          <Input.Search size="large" placeholder="Stream or Location" />
        </AutoComplete>
      </div>
    </div>
  </>
};

export default CreateProjectMap;