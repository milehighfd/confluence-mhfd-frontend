import React, { useState, useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../utils/MapService';
import { RightOutlined } from '@ant-design/icons';
import { MainPopup, ComponentPopup, StreamPopupFull, MeasurePopup } from './../Map/MapPopups';
import { numberWithCommas } from '../../utils/utils';
import * as turf from '@turf/turf';
import DetailedModal from '../Shared/Modals/DetailedModal';
import EventService from '../../services/EventService';
import { getData, getToken, postDataAsyn, postData } from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { loadIconsPopup } from '../../routes/map/components/MapGetters';
import {
  addPopupAndListeners,
  measureFunction,
  addPopupsOnClick
} from '../../routes/map/components/MapFunctionsPopup';

import { addGeojsonSource, removeGeojsonCluster } from './../../routes/map/components/MapFunctionsCluster';
import {
  PROBLEMS_TRIGGER,
  COMPONENT_LAYERS,
  PROJECTS_DRAFT_MAP_STYLES,
  MHFD_BOUNDARY_FILTERS,
  SELECT_ALL_FILTERS,
  MENU_OPTIONS,
  ROUTINE_MAINTENANCE,
  STREAMS_FILTERS,
  ROUTINE_NATURAL_AREAS,
  ROUTINE_WEED_CONTROL,
  ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR,
  FILTER_PROBLEMS_TRIGGER,
  FILTER_PROJECTS_TRIGGER,
  MHFD_PROJECTS,
  PROJECTS_POLYGONS,
  MEP_PROJECTS_TEMP_LOCATIONS,
  MEP_PROJECTS_DETENTION_BASINS,
  MEP_PROJECTS_CHANNELS,
  MEP_PROJECTS_STORM_OUTFALLS,
  LANDSCAPING_AREA,
  LAND_ACQUISITION,
  DETENTION_FACILITIES,
  STORM_DRAIN,
  CHANNEL_IMPROVEMENTS_AREA,
  CHANNEL_IMPROVEMENTS_LINEAR,
  SPECIAL_ITEM_AREA,
  SPECIAL_ITEM_LINEAR,
  SPECIAL_ITEM_POINT,
  PIPE_APPURTENANCES,
  GRADE_CONTROL_STRUCTURE,
  STREAM_IMPROVEMENT_MEASURE,
  NRCS_SOILS,
  DWR_DAM_SAFETY,
  STREAM_MANAGEMENT_CORRIDORS,
  BCZ_PREBLE_MEADOW_JUMPING,
  BCZ_UTE_LADIES_TRESSES_ORCHID,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  SEMSWA_SERVICE_AREA,
  ADMIN,
  STAFF,
  FLOOD_HAZARD_POLYGON,
  FLOOD_HAZARD_LINE,
  FLOOD_HAZARD_POINT,
  STREAM_FUNCTION_POLYGON,
  STREAM_FUNCTION_POINT,
  STREAM_FUNCTION_LINE,
  FUTURE_DEVELOPMENT_POLYGON,
  FUTURE_DEVELOPMENT_LINE,
  NEARMAP_TOKEN,
  MUNICIPALITIES_FILTERS,
  ACTIVE_LOMS,
  EFFECTIVE_REACHES,
  ICON_POPUPS,
  NEW_PROJECT_TYPES,
  SERVICE_AREA_FILTERS,
  STREAMS_POINT,
  PROJECTS_DRAFT,
  MAP_RESIZABLE_TRANSITION,
  BLOCK_CLEARANCE_ZONES_LAYERS,
  PROPSPROBLEMTABLES,
  MAPTYPES
} from "../../constants/constants";
import { ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import store from '../../store';
import { Dropdown, Button } from 'antd';
import { tileStyles, COMPONENT_LAYERS_STYLE, NEARMAP_STYLE } from '../../constants/mapStyles';
import { useMapState, useMapDispatch } from '../../hook/mapHook';
import { useDetailedState } from '../../hook/detailedHook';
import { useProjectState, useProjectDispatch } from '../../hook/projectHook';
import { useProfileState, useProfileDispatch } from '../../hook/profileHook';
import MapFilterView from '../Shared/MapFilter/MapFilterView';
import { Input, AutoComplete } from 'antd';
import { useAttachmentDispatch } from '../../hook/attachmentHook';
import { GlobalMapHook } from '../../utils/globalMapHook';

let mapid = 'map4';
let map: any;
let coordX = -1;
let coordY = -1;
let isProblemActive = true;
let featuresCount = 0;
let isPopup = true;
let componentsList: any[] = [];
let marker = new mapboxgl.Marker({ color: '#ffbf00', scale: 0.7 });
let popup = new mapboxgl.Popup({ closeButton: true });
let globalMapId: any = null;
let mapMoved = true;
let amounts: any = [];
type LayersType = string | ObjectLayerType;
const { Option } = AutoComplete;
let isMeasuring = false;
const geojsonMeasures = {
  type: 'FeatureCollection',
  features: new Array(),
};
const geojsonMeasuresSaved = {
  type: 'FeatureCollection',
  features: new Array(),
};
const linestringMeasure = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: new Array(),
  },
};
const factorKMToMiles = 0.621371;
const factorKMtoFeet = 3280.8;
const factorm2toacre = 0.00024710538146717;
const WorkRequestMap = (type: any) => {
  let html = document.getElementById(mapid);

  const [measuringState, setMeasuringState] = useState(isMeasuring);
  const [measuringState2, setMeasuringState2] = useState(isMeasuring);
  const [isdrawingmeasure, setIsDrawingMeasure] = useState(false);
  const [distanceValue, setDistanceValue] = useState('0');
  const [distanceValueMi, setDistanceValueMi] = useState('0');
  const [areaValue, setAreaValue] = useState('0');
  const [isExtendedView] = useState(false);
  const user = store.getState().profile.userInformation;
  const {
    layers,
    mapSearch,
    filterProjects,
    filterProblems,
    componentDetailIds,
    filterComponents,
    galleryProjects,
    loaderDetailedPage,
    componentsByProblemId,
    componentCounter,
    loaderTableCompoents,
  } = useMapState();
  const { detailed } = useDetailedState();
  const { clear } = useAttachmentDispatch();
  const {
    mapSearchQuery,
    setSelectedPopup,
    getComponentCounter,
    setSelectedOnMap,
    existDetailedPageProblem,
    existDetailedPageProject,
    getMapWithSublayers,
    getMapLayers,
    getComponentsByProjid,
  } = useMapDispatch();
  const {
    changeAddLocationState,
    getListComponentsByComponentsAndPolygon,
    updateSelectedLayersWR,
    setComponentsFromMap,
    getComponentGeom,
    getAllComponentsByProblemId,
    setBoardProjects,
    getZoomGeomProblem,
    getZoomGeomComp,
  } = useProjectDispatch();
  const { selectedLayersWR, highlightedComponent, boardProjects, zoomProject } = useProjectState();
  const { groupOrganization } = useProfileState();
  const { getGroupOrganization } = useProfileDispatch();
  const [idsBoardProjects, setIdsBoardProjects] = useState<any>([]);
  const [layerFilters, setLayerFilters] = useState(layers);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coordinatesJurisdiction, setCoordinatesJurisdiction] = useState([]);
  const [firstRendering, setFirstRendering] = useState(type.isFirstRendering);
  const hovereableLayers = [
    PROBLEMS_TRIGGER,
    MHFD_PROJECTS,
    PROJECTS_POLYGONS,
    MEP_PROJECTS_TEMP_LOCATIONS,
    MEP_PROJECTS_DETENTION_BASINS,
    MEP_PROJECTS_CHANNELS,
    MEP_PROJECTS_STORM_OUTFALLS,
    ROUTINE_NATURAL_AREAS,
    ROUTINE_WEED_CONTROL,
    ROUTINE_DEBRIS_AREA,
    ROUTINE_DEBRIS_LINEAR,
    LANDSCAPING_AREA,
    LAND_ACQUISITION,
    DETENTION_FACILITIES,
    STORM_DRAIN,
    CHANNEL_IMPROVEMENTS_AREA,
    CHANNEL_IMPROVEMENTS_LINEAR,
    SPECIAL_ITEM_AREA,
    SPECIAL_ITEM_LINEAR,
    SPECIAL_ITEM_POINT,
    PIPE_APPURTENANCES,
    GRADE_CONTROL_STRUCTURE,
    FLOOD_HAZARD_POLYGON,
    FLOOD_HAZARD_LINE,
    FLOOD_HAZARD_POINT,
    STREAM_FUNCTION_POLYGON,
    STREAM_FUNCTION_POINT,
    STREAM_FUNCTION_LINE,
    FUTURE_DEVELOPMENT_POLYGON,
    FUTURE_DEVELOPMENT_LINE,
    STREAM_IMPROVEMENT_MEASURE,
    COMPONENT_LAYERS.tiles,
    STREAMS_FILTERS,
  ];
  const notComponentOptions: any[] = [
    MENU_OPTIONS.NCRS_SOILS,
    MENU_OPTIONS.DWR_DAM_SAFETY,
    MENU_OPTIONS.STREAM_MANAGEMENT_CORRIDORS,
    MENU_OPTIONS.BCZ_PREBLES_MEADOW_JUMPING_MOUSE,
    MENU_OPTIONS.BCZ_UTE_LADIES_TRESSES_ORCHID,
    MENU_OPTIONS.RESEARCH_MONITORING,
    MENU_OPTIONS.CLIMB_TO_SAFETY,
    MENU_OPTIONS.SEMSWA_SERVICE_AREA,
    MENU_OPTIONS.DEBRIS_MANAGEMENT_LINEAR,
    MENU_OPTIONS.DEBRIS_MANAGEMENT_AREA,
    MENU_OPTIONS.VEGETATION_MANAGEMENT_WEED_CONTROL,
    MENU_OPTIONS.VEGETATION_MANAGEMENT_NATURAL_AREA,
    MENU_OPTIONS.WATERSHED,
    MENU_OPTIONS.SERVICE_AREA,
    MENU_OPTIONS.MEP_STORM_OUTFALL,
    MENU_OPTIONS.MEP_CHANNEL,
    MENU_OPTIONS.MEP_DETENTION_BASIN,
    MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
    MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
    MENU_OPTIONS.CLIMB_TO_SAFETY_SIGNS,
    MENU_OPTIONS.MEASURES,
  ];
  const [problemClusterGeojson, setProblemClusterGeojson] = useState(undefined);
  const [zoomValue, setZoomValue] = useState(0);
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
  const empty: any[] = [];
  const [allLayers, setAllLayers] = useState(empty);
  const [counterPopup, setCounterPopup] = useState({ componentes: 0 });
  const [zoomEndCounter, setZoomEndCounter] = useState(0);
  const [dragEndCounter, setDragEndCounter] = useState(0);
  const [displayPrevNext, setDisplayPrevNext] = useState(false);
  const [data, setData] = useState({
    problemid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
    cartoid: '',
  });
  const [dataProblem, setDataProblem] = useState({
    problemid: '',
    id: '',
    objectid: '',
    value: '',
    type: '',
    cartoid: '',
  });

  useEffect(() => {
    if (map) {
      const mapResize = () => map.resize();
      for (let i = 0; i <= MAP_RESIZABLE_TRANSITION * 10000; i = i + 25) {
        setTimeout(() => mapResize(), i);
      }
    }
  }, [type.leftWidth]);

  const setIsMeasuring = (value: boolean) => {
    isMeasuring = value;
    setMeasuringState2(value);
    setMeasuringState(false);
    geojsonMeasures.features = new Array();
    linestringMeasure.geometry.coordinates = new Array();
    setDistanceValue('0');
    setDistanceValueMi('0');
    setAreaValue('0');
    if (map.map.getSource('geojsonMeasure')) {
      map.map.getSource('geojsonMeasure').setData(geojsonMeasures);
    }
  };
  const finishMeasure = (type?: string) => {
    const size = type === 'line' ? 1 : 2;
    if (linestringMeasure.geometry.coordinates.length > size && isMeasuring) {
      var line = turf.lineString(linestringMeasure.geometry.coordinates);
      var polygon = type === 'line' ? undefined : turf.lineToPolygon(JSON.parse(JSON.stringify(line)));
      const area = type === 'line' ? undefined : polygon ? turf.area(polygon) : undefined;
      if (type !== 'line' && area) {
        setAreaValue((area * factorm2toacre).toLocaleString(undefined, { maximumFractionDigits: 2 }));
      }
      const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
      const perimeter = turf.length(JSON.parse(JSON.stringify(newLS)));
      if (type === 'line') {
        line.properties = {
          id: geojsonMeasuresSaved.features.length,
          coordinates: line.geometry?.coordinates,
          area: 0,
          perimeterFeet: (perimeter * factorKMtoFeet).toLocaleString(undefined, { maximumFractionDigits: 2 }),
          perimeterMi: (perimeter * factorKMToMiles).toLocaleString(undefined, { maximumFractionDigits: 2 }),
          type: 'line',
        };
        geojsonMeasuresSaved.features.push(line);
        map.map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
      } else if (polygon && area) {
        polygon.properties = {
          id: geojsonMeasuresSaved.features.length,
          coordinates: polygon.geometry?.coordinates,
          area: (area * factorm2toacre).toLocaleString(undefined, { maximumFractionDigits: 2 }),
          perimeterFeet: (perimeter * factorKMtoFeet).toLocaleString(undefined, { maximumFractionDigits: 2 }),
          perimeterMi: (perimeter * factorKMToMiles).toLocaleString(undefined, { maximumFractionDigits: 2 }),
          type: 'polygon',
        };
        geojsonMeasuresSaved.features.push(polygon);
        map.map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
      }

      geojsonMeasures.features = new Array();
      linestringMeasure.geometry.coordinates = new Array();
      map.map.getSource('geojsonMeasure').setData(geojsonMeasures);
      setIsDrawingMeasure(false);
      setIsMeasuring(false);
    }
  };
  const measureCenterAndDelete = (type: any, item: any, event: any) => {
    if (type == 'center') {
      const coords = JSON.parse(item.coordinates);
      if (item.type == 'line') {
        const line = turf.lineString(coords);
        const bbox = turf.bbox(line);
        map.map.fitBounds(bbox, { padding: 80 });
      } else {
        const polygon = turf.polygon(coords);
        const bbox = turf.bbox(polygon);
        map.map.fitBounds(bbox, { padding: 80 });
      }
    } else if (type == 'delete') {
      geojsonMeasuresSaved.features = geojsonMeasuresSaved.features.filter(elem => elem.properties.id != item.id);
      popup.remove();
      map.map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
    }
  };
  useEffect(() => {
    if (layers) {
      setLayerFilters(layers);
    }
  }, [layers]);
  const [compareLayerFilter, setCompareLayerFilter] = useState('');
  useEffect(() => {
    const parsed = compareLayerFilter != '' ? JSON.parse(compareLayerFilter) : '';
    const areEqual = JSON.stringify(layerFilters) != JSON.stringify(parsed);
    if (areEqual) {
      if (map) {
        setCompareLayerFilter(JSON.stringify(layerFilters));
          map.isStyleLoaded(() => {
            applyMapLayers();
            applyProblemClusterLayer();
          });
      }
    }
  }, [layerFilters]);

  const [compareSLWR, setCompareSLWR] = useState('');
  useEffect(() => {
    if(JSON.stringify(selectedLayersWR) != compareSLWR) {
      if (map ) {
        map.isStyleLoaded(() => {
          applyMapLayers();
          applyProblemClusterLayer();
        });
        setCompareSLWR(JSON.stringify(selectedLayersWR));
      }
    }
  }, [selectedLayersWR]);

  const { getNext, getCurrent, getPrevious, getPercentage, addHistoric, hasNext, hasPrevious } = GlobalMapHook();

  useEffect(() => {
    if (zoomProject && (zoomProject.projectid || zoomProject.project_id)) {
      const projectid = zoomProject.project_id ? zoomProject.project_id : zoomProject.projectid;
      getData(`${SERVER.URL_BASE}/board/bbox/${projectid}`).then(
        (r: any) => {
          if (r.bbox) {
            let BBoxPolygon = JSON.parse(r.bbox);
            let bboxBounds = turf.bbox(BBoxPolygon);

            if (map.map) {
              map.map.fitBounds(bboxBounds, { padding: 140 });
            }
          }
        },
        (e: any) => {
          console.log('Error getting bbox projectid', e);
        },
      );
    }
  }, [zoomProject]);
  useEffect(() => {
    if (map && map.map) {
      const bounds = map.getBoundingBox();
      if (markerGeocoder) {
        let lnglat = markerGeocoder.getLngLat();
        let swInside = true;
        let neInside = true;
        if (lnglat.lat < bounds._sw.lat || lnglat.lng < bounds._sw.lng) {
          swInside = false;
        }
        if (lnglat.lat > bounds._ne.lat || lnglat.lng > bounds._ne.lng) {
          neInside = false;
        }
        if (!(swInside && neInside)) {
          markerGeocoder.remove();
          setMarkerGeocoder(undefined);
        }
      }
    }
  }, [zoomEndCounter, dragEndCounter]);
  const loadData = (trigger: any, name?: string) => {
    return new Promise(resolve => {
      const requestData = { table: trigger };
      postData(SERVER.MAP_TABLES, requestData, getToken()).then(tiles => {
        resolve(true);
        if (name) getMapWithSublayers(trigger, tiles, name);
        else getMapLayers(trigger, tiles);
      });
    });
  };
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById(mapid);
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if (!map) {
          map = new MapService(mapid);
          setLayersSelectedOnInit();
          map.loadImages();
          let _ = 0;
          map.zoomEnd(() => {
            setZoomEndCounter(_++);
          });
          let __ = 1;
          map.dragEnd(() => {
            setDragEndCounter(__++);
          });
        }
      }
    };
    map = undefined;
    waiting();
    changeAddLocationState(false);
    componentsList = [];
    const promises: Promise<any>[] = [];
    SELECT_ALL_FILTERS.forEach(layer => {
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          promises.push(loadData(subKey, layer.name));
        });
      } else {
        promises.push(loadData(layer));
      }
    });
    Promise.all(promises).then(() => {
      console.log('loaded');
    });
    return () => {
      setBoardProjects(['-8888']);
      map = undefined;
    };
  }, []);
  useEffect(() => {
    popup.remove();
  }, [type.change]);
  useEffect(() => {
    if (map) {
      if (highlightedComponent.table) {
        showHighlighted(highlightedComponent.table, highlightedComponent.cartodb_id);
      } else {
        hideHighlighted();
      }
    }
  }, [highlightedComponent]);

  useEffect(() => {
    setAllLayers(empty);
    let filterProjectsDraft = { ...filterProjects };
    filterProjectsDraft.projecttype = '';
    filterProjectsDraft.status = '';
    //removeLayers(PROJECTS_DRAFT);
    if (idsBoardProjects.length) {
      wait(() => {
        map.isRendered(() => {
          let requestData = { table: PROJECTS_DRAFT_MAP_STYLES.tiles[0] };
          const promises: Promise<any>[] = [];
          promises.push(postDataAsyn(SERVER.MAP_TABLES, requestData, getToken()));
          Promise.all(promises).then(tiles => {
            updateLayerSource(PROJECTS_DRAFT, tiles[0]);
            showLayers(PROJECTS_DRAFT);
          });
          map.isRendered(() => {
            setTimeout(() => {
              applyFiltersIDs(PROJECTS_DRAFT, filterProjectsDraft);
            }, 700);
          });
        });
      });
    }
  }, [idsBoardProjects]);

  useEffect(() => {
    let mask;
    setTimeout(() => {
      map.isStyleLoaded(() => {
        if (coordinatesJurisdiction.length > 0) {
          mask = turf.multiPolygon(coordinatesJurisdiction);
          let misbounds =
            -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
          var arrayBounds = misbounds.split(',');
          let poly = polyMask(mask, arrayBounds);
          map.isStyleLoaded(() => {
            map.addSourceOpacity(poly);
          });
        }
      });
    }, 1200);
  }, [coordinatesJurisdiction]);
  useEffect(() => {
    popup.remove();
    const equals = (a: any, b: any) => a.length === b.length && a.every((v: any, i: any) => v === b[i]);

    if (firstRendering) {
      setFirstRendering(false);
      return;
    }
    if (boardProjects && !boardProjects.ids) {
      setIdsBoardProjects(boardProjects);
    }
    if (boardProjects && boardProjects.ids) {
      if (!equals(boardProjects.ids, idsBoardProjects)) {
        setIdsBoardProjects(boardProjects.ids);
      }
    }
  }, [boardProjects]);

  const [opacityLayer, setOpacityLayer] = useState(false);
  const polyMask = (mask: any, bounds: any) => {
    if (mask !== undefined && bounds.length > 0) {
      var bboxPoly = turf.bboxPolygon(bounds);
      return turf.difference(bboxPoly, mask);
    }
  };

  const setBounds = (value: any) => {
    if (!value) return;
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.aoi.includes(value))
      .map((element: any) => {
        return {
          aoi: element.aoi,
          filter: element.filter,
          coordinates: element.coordinates,
        };
      });
    if (zoomareaSelected[0]) {
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
      let poly = turf.multiPolygon(zoomareaSelected[0].coordinates, { name: 'zoomarea' });
      let bboxBounds = turf.bbox(poly);
      if (map.map) {
        map.map.fitBounds(bboxBounds, { padding: 20, maxZoom: 14 });
      }
    }
  };
  const wait = (cb: any) => {
    if (!map.map) {
      setTimeout(wait, 150);
    } else {
      cb();
    }
  };
  const groupOrganizationZoom = () => {
    if (groupOrganization.length == 0) {
      getGroupOrganization();
    }
    setTimeout(() => {
      //let value = store.getState().profile.userInformation.zoomarea;
      let value = '';
      if (type.locality.locality) {
        value = type.locality.locality;
      }
      if (groupOrganization.length > 0) {
        wait(() => setBounds(value));
      }
    }, 500);
  };
  useEffect(() => {
    if (type.locality.isOnSelected) {
      centerToLocalityy();
    }
  }, [type.locality]);
  const getGroupOrganizationZoomWithouBounds = () => {
    if (groupOrganization.length == 0) {
      getGroupOrganization();
    }

    const zoomareaSelected = groupOrganization
      .filter((x: any) => type.locality.locality.includes(x.aoi))
      .map((element: any) => {
        return {
          aoi: element.aoi,
          filter: element.filter,
          coordinates: element.coordinates,
        };
      });
    if (zoomareaSelected[0]) {
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
    }
  };
  useEffect(() => {
    let historicBounds = getCurrent();
    if (type.locality.isOnSelected) {
      getGroupOrganizationZoomWithouBounds();
    } else if (historicBounds && historicBounds.bbox) {
      globalMapId = historicBounds.id;
      map.map.fitBounds([
        [historicBounds.bbox[0], historicBounds.bbox[1]],
        [historicBounds.bbox[2], historicBounds.bbox[3]],
      ]);
      getGroupOrganizationZoomWithouBounds();
    } else {
      groupOrganizationZoom();
    }
  }, [groupOrganization, type.locality.locality]);
  useEffect(() => {
    if (data.problemid || data.cartoid) {
      setVisible(true);
    }
  }, [data]);
  const updateZoom = () => {
    const zoom = map.map.getZoom().toFixed(2);
    setZoomValue(zoom);
  };
  useEffect(() => {
    if (map) {
      map.create();
      setLayerFilters(layers);
      map.isStyleLoaded(() => {
        let eventToClick = EventService.getRef('click');
        map.map.on('click', eventToClick);
        map.map.on('load', updateZoom);
        map.map.on('move', updateZoom);
        map.map.on('moveend', () => {
          mapMoved = true;
        });
        map.map.on('render', () => {
          if (map && map.map && !globalMapId && mapMoved) {
            const center = [map.map.getCenter().lng, map.map.getCenter().lat];
            const bbox = [
              map.map.getBounds()._sw.lng,
              map.map.getBounds()._sw.lat,
              map.map.getBounds()._ne.lng,
              map.map.getBounds()._ne.lat,
            ];
            addHistoric({ center, bbox });
          }
          globalMapId = null;
          mapMoved = false;
        });
        setTimeout(() => {
          applyNearMapLayer();
        }, 2000);
      });
    }
  }, [map]);

  const createProject = (details: any, event: any) => {
    clear();
    popup.remove();
    if (details.problemid) {
      setDataProblem({
        id: '',
        objectid: '',
        cartoid: '',
        type: '',
        value: '',
        problemid: details.problemid,
      });
      setTimeout(() => {
        getZoomGeomProblem(details.problemid);
      }, 4500);
    }
    if (details.layer === 'Components') {
      let newComponents = [
        {
          cartodb_id: details.cartodb_id ? details.cartodb_id : '',
          jurisdiction: details.jurisdiction ? details.jurisdiction : '',
          original_cost: details.original_cost ? details.original_cost : '',
          problemid: null,
          status: details.status ? details.status : '',
          table: details.table ? details.table : '',
          type: details.type ? details.type : '',
          objectid: details.type ? details.objectid : '',
        },
      ];
      setComponentsFromMap(newComponents);
      getComponentGeom(details.table, details.objectid);
      type.setProblemId('-1');
      setTimeout(() => {
        getZoomGeomComp(details.table, details.objectid);
      }, 4500);
    } else if (details.type === 'problems') {
      getAllComponentsByProblemId(details.problemid);
      type.setProblemId(details.problemid);
    } else {
      setComponentsFromMap([]);
    }
    setTimeout(() => {
      type.openModal(true);
    }, 35);
  };
  const setLayersSelectedOnInit = () => {
    updateSelectedLayersWR([MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS, COMPONENT_LAYERS, PROBLEMS_TRIGGER]);
  };
  const applyNearMapLayer = () => {
    if (!map.getSource('raster-tiles')) {
      map.map.addSource('raster-tiles', {
        type: 'raster',
        tileSize: 128,
        tiles: [`https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`],
      });
      map.map.addLayer(NEARMAP_STYLE, 'aerialway');
    }
}
const applyProblemClusterLayer = () => {
  datasets.getData(SERVER.MAP_PROBLEM_TABLES).then((geoj:any) => {
    if (!map.map.getSource('clusterproblem')) {
      addGeojsonSource(map.map, geoj.geom, isProblemActive);
    }
    setProblemClusterGeojson(geoj.geom);
  });
}
  const applyMapLayers = async () => {
    await SELECT_ALL_FILTERS.forEach(layer => {
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
    const deleteLayers = SELECT_ALL_FILTERS.filter((layer: any) => !selectedLayersWR.includes(layer as string));
    await deleteLayers.forEach((layer: LayersType) => {
      removeTilesHandler(layer);
    });
    await selectedLayersWR.forEach((layer: LayersType) => {
      if (layer === 'area_based_mask' || layer === 'border') {
        map.addLayerMask(layer);
        return;
      }
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          showLayers(subKey);
        });
      } else {
        showLayers(layer);
      }
    });
    applyFilters(PROBLEMS_TRIGGER, filterProblems);
    let filterProjectsNew = { ...filterProjects };
    let filterProjectsDraft = { ...filterProjects };

    if (type.type === 'SPECIAL') {
      filterProjectsNew.projecttype = 'Special';
    } else if (type.type === 'STUDY') {
      filterProjectsNew.projecttype = 'Study';
    } else {
      filterProjectsNew.projecttype = '';
    }
    applyFilters(MHFD_PROJECTS, filterProjectsNew);

    filterProjectsDraft.projecttype = '';
    filterProjectsDraft.status = 'Draft';

    if (type.type === 'CAPITAL') {
      applyComponentFilter();
    }
    setTimeout(() => {
      map.isStyleLoaded(() => {
        map.map.moveLayer('munis-centroids-shea-plusother');
        //topStreams();
        topEffectiveReaches();
        topProjects();
        topServiceArea();
        topComponents();
        topStreamLabels();
        if (map.getLayer('area_based_maskMASK')) {
          map.map.moveLayer('area_based_maskMASK');
        }
        if (map.getLayer('borderMASK')) {
          map.map.moveLayer('borderMASK');
        }
      });
    }, 500);
    applyMeasuresLayer();
  };
  const applyMeasuresLayer = () => {
    if (!map.map.getSource('geojsonMeasure')) {
      map.map.addSource('geojsonMeasure', {
        type: 'geojson',
        data: geojsonMeasures,
      });
      map.map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojsonMeasure',
        paint: {
          'circle-radius': 5,
          'circle-color': '#FDB32B',
        },
        filter: ['in', '$type', 'Point'],
      });
      map.map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojsonMeasure',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#DBA32A',
          'line-width': 2.5,
        },
        filter: ['in', '$type', 'LineString'],
      });
    }
    if (!map.map.getSource('geojsonMeasuresSaved')) {
      map.map.addSource('geojsonMeasuresSaved', {
        type: 'geojson',
        data: geojsonMeasuresSaved,
      });
      map.map.addLayer({
        id: 'measuresSaved',
        type: 'fill',
        source: 'geojsonMeasuresSaved',
        paint: {
          'fill-color': '#E7832A',
          'fill-outline-color': '#E7832A',
          'fill-opacity': 0.3,
        },
        filter: ['in', 'type', 'polygon'],
      });
      map.map.addLayer({
        id: 'measuresSaved-border',
        type: 'line',
        source: 'geojsonMeasuresSaved',
        paint: {
          'line-color': '#E7832A',
          'line-width': 4,
        },
      });
      map.map.addLayer({
        id: 'measuresSaved-border-invisible',
        type: 'line',
        source: 'geojsonMeasuresSaved',
        paint: {
          'line-color': '#E70000',
          'line-width': 17,
          'line-opacity': 0,
        },
        filter: ['in', 'type', 'line'],
      });
    }
  };
  const topProjects = () => {
    const styles = { ...(tileStyles as any) };
    styles[MHFD_PROJECTS].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(`${MHFD_PROJECTS}_${index}`)) {
        map.map.moveLayer(`${MHFD_PROJECTS}_${index}`);
      }
    });
  };
  const topComponents = () => {
    const styles = { ...(COMPONENT_LAYERS_STYLE as any) };
    for (const component of COMPONENT_LAYERS.tiles) {
      styles[component].forEach((style: LayerStylesType, index: number) => {
        if (map.map.getLayer(`${component}_${index}`)) {
          map.map.moveLayer(`${component}_${index}`);
        }
      });
    }
  };
  const topServiceArea = () => {
    const styles = { ...(tileStyles as any) };
    styles[SERVICE_AREA_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(`${SERVICE_AREA_FILTERS}_${index}`)) {
        map.map.moveLayer(`${SERVICE_AREA_FILTERS}_${index}`);
      }
    });
  };
  const topEffectiveReaches = () => {
    const styles = { ...(tileStyles as any) };
    styles[EFFECTIVE_REACHES].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(`${EFFECTIVE_REACHES}_${index}`)) {
        map.map.moveLayer(`${EFFECTIVE_REACHES}_${index}`);
      }
    });
  };
  const topStreams = () => {
    setTimeout(() => {
      if (
        map.map.getLayer('measuresSaved') &&
        map.map.getLayer('measure-lines') &&
        map.map.getLayer('measuresSaved-border') &&
        map.map.getLayer('streams_0') &&
        map.map.getLayer('streams_1') &&
        map.map.getLayer('streams_2') &&
        map.map.getLayer('streams_3')
      ) {
        map.map.moveLayer('measuresSaved');
        map.map.moveLayer('measure-lines');
        map.map.moveLayer('measuresSaved-border');
        map.map.moveLayer('streams_0');
        map.map.moveLayer('streams_1');
        map.map.moveLayer('streams_2');
        map.map.moveLayer('streams_3');
      } else {
        topStreams();
      }
    }, 1000);
  };
  const topStreamLabels = () => {
    if (map.map.getLayer('streams_4')) {
      map.map.moveLayer('streams_4');
    }
    if (map.map.getLayer('streams_5')) {
      map.map.moveLayer('streams_5');
    }
  };
  const applyComponentFilter = () => {
    const styles = { ...(COMPONENT_LAYERS_STYLE as any) };
    Object.keys(styles).forEach(element => {
      for (let i = 0; i < styles[element].length; ++i) {
        if (map.map.getLayer(element + '_' + i)) {
          map.map.setFilter(element + '_' + i, ['!has', 'projectid']);
        }
      }
    });
  };
  const showLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(key + '_' + index)) {
        if (key === PROJECTS_DRAFT) {
          let allFilters: any = ['in', ['get', 'projectid'], ['literal', []]];
          if (idsBoardProjects && idsBoardProjects.length > 0) {
            let boardids = idsBoardProjects;
            allFilters = ['all', ['in', ['get', 'projectid'], ['literal', [...boardids]]]];
          }
          map.map.setFilter(key + '_' + index, allFilters);
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        } else {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        }

        if (COMPONENT_LAYERS.tiles.includes(key) && filterComponents) {
          showSelectedComponents(filterComponents.component_type.split(','));
        }
        if (key === PROBLEMS_TRIGGER) {
          isProblemActive = true;
        }
      }
    });
    if (key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
      styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
        if (map && map.map.getLayer(STREAMS_POINT + '_' + index)) {
          map.map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'visible');
        }
      });
    }
  };
  const removeLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(key + '_' + index)) {
        map.map.removeLayer(key + '_' + index);
      }
    });
  };
  const showSelectedComponents = (components: string[]): void => {
    if (!components.length || components[0] === '') {
      return;
    }
    const styles = { ...(tileStyles as any) };
    for (const key of COMPONENT_LAYERS.tiles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!components.includes(key)) {
          map.setFilter(key + '_' + index, ['in', 'cartodb_id', []]);
        }
      });
    }
  };
  const searchEquivalentinProblemBoundary = (key: string) => {
    if ( PROPSPROBLEMTABLES.problems.includes(key)) {
      const index = PROPSPROBLEMTABLES.problems.indexOf(key);
      return PROPSPROBLEMTABLES.problem_boundary[index];
    }
    return key;
  }
  const applyFilters = useCallback((key: string, toFilter: any) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.getLayer(key + '_' + index)) {
            return;
        }
        const allFilters: any[] = ['all'];
        for (const filterField in toFilter) {
            let filters = toFilter[filterField];
            if (key === MHFD_PROJECTS && filterField === 'status' && !filters) {
              filters = 'Active,Closeout,Closed';
            }
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
                    allFilters.push(['in', ['get', (key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[5] : PROPSPROBLEMTABLES.problems[5])], ['literal', [...filters]]]);
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
                        const lowerArray: any[] = ['>=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[17] : filterField)]], +lower];
                        const upperArray: any[] = ['<=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[17] : filterField)]], +upper];
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
                // if (filterField === 'servicearea') {
                //   let filterValue = filters;
                //     if(filterValue[filters.length - 1] == ' ') {
                //       filterValue = filters.substring(0,filters.length - 1);
                //     }
                //     allFilters.push(['==', ['get', (key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[9] : filterField)], filterValue]);
                //     continue;
                // }
                // if(filterField === 'county' ){
                //   let filterValue = filters.replace('County','');
                //     if(filterValue[filterValue.length - 1] == ' ') {
                //       filterValue = filterValue.substring(0,filterValue.length - 1);
                //     }
                //     allFilters.push(['==', ['get', filterField], filterValue]);
                //     continue;
                // }
                if (filterField === 'completedyear') {
                    continue;
                }
                if (typeof filters === 'object') {
                    for (const range of filters) {
                        const [lower, upper] = range.split(',');
                        const lowerArray: any[] = ['>=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +lower];
                        const upperArray: any[] = ['<=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +upper];
                        const allFilter = ['all', lowerArray, upperArray];
                        options.push(allFilter);
                    }
                } else {                        
                    for (const filter of filters.split(',')) {
                        if (isNaN(+filter)) {
                            if(filterField == 'projecttype') {
                              if(JSON.stringify(style.filter).includes(filter)) {
                                options.push(['==', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)], filter]);
                              }
                            } else {
                              options.push(['==', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)], filter]);
                            }
                            
                              
                            
                        } else {
                            const equalFilter: any[] = ['==', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +filter];
                            options.push(equalFilter);
                        }
                    }
                }
                
                allFilters.push(options);
            } 
        }
        if(!(toFilter['projecttype'] && toFilter['projecttype']) && style.filter) {
          allFilters.push(style.filter);
        }
        if (componentDetailIds && componentDetailIds[key] && key != MHFD_PROJECTS && key != PROBLEMS_TRIGGER) {
            allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...componentDetailIds[key]]]]);
        }
        if (key == PROBLEMS_TRIGGER && problemClusterGeojson && !map.map.getSource('clusterproblem')) {
          addGeojsonSource(map.map, problemClusterGeojson, isProblemActive, allFilters);
        }
        if (map.getLayer(key + '_' + index)) {
            map.setFilter(key + '_' + index, allFilters);
        }
    });
}, [problemClusterGeojson]);
  const applyFiltersIDs = (key: string, toFilter: any) => {
    const styles = { ...(tileStyles as any) };

    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (!map.getLayer(key + '_' + index)) {
        return;
      }
      const allFilters: any[] = ['all'];
      if (key === PROJECTS_DRAFT) {
        if (idsBoardProjects && idsBoardProjects.length > 0 && idsBoardProjects[0] != '-8888') {
          let boardids = idsBoardProjects;
          allFilters.push(['in', ['get', 'projectid'], ['literal', [...boardids]]]);
        } else {
          allFilters.push(['in', ['get', 'projectid'], ['literal', ['-1111']]]);
        }
      }

      if (map.getLayer(key + '_' + index)) {
        map.setFilter(key + '_' + index, allFilters);
      }
    });
  };
  const selectCheckboxes = (selectedItems: Array<LayersType>) => {
    const deleteLayers = selectedLayersWR.filter((layer: any) => !selectedItems.includes(layer as string));

    deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        map.removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    updateSelectedLayersWR(selectedItems);
  };
  const hideLayers = (key: string) => {
    if (map) {
      const styles = { ...(tileStyles as any) };
      if (styles[key]) {
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if (map.map.getLayer(key + '_' + index)) {
            map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
          }
        });
      }
      if (key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
        styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
          if (map.map.getLayer(STREAMS_POINT + '_' + index)) {
            map.map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'none');
          }
        });
      }
      if (key === PROBLEMS_TRIGGER) {
        isProblemActive = false;
        removeGeojsonCluster(map);
      }
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
  };
  const updateLayerSource = (key: string, tiles: Array<string>) => {
    /* console.log('maaaaa',map.getSource(key), tiles, tiles.hasOwnProperty('error'), key); */
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      map.addVectorSource(key, tiles);
      addTilesLayers(key);
    } else if (map.getSource(key)) {
      /* console.log('map', map.getSource(key)); */
      map.getSource(key).setTiles(tiles);
      addTilesLayers(key);
    }
  };
  const addLayersSource = (key: string, tiles: Array<string>) => {
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      map.addVectorSource(key, tiles);
      addTilesLayers(key);
    }
  };
  const removeLayersSource = (key: string) => {
    if (map.getSource(key)) {
      map.map.removeSource(key);
    }
  };

  const addTilesLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (key.includes(PROJECTS_DRAFT)) {
        if (map.map.getLayer(key + '_' + index)) {
          return;
        }
        map.map.addLayer({
          id: key + '_' + index,
          source: key,
          filter: ['in', ['get', 'projectid'], ['literal', []]],
          ...style,
        });
      } else {
        if (style.source_name) {
          map.map.addLayer({
            id: key + '_' + index,
            source: style.source_name,
            ...style,
          });
        } else {
          map.map.addLayer({
            id: key + '_' + index,
            source: key,
            ...style,
          });
        }
      }
      if (key) {
        map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
      }
      if (!hovereableLayers.includes(key)) {
        return;
      }
      if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
        map.map.addLayer({
          id: key + '_highlight_' + index,
          source: key,
          type: 'line',
          'source-layer': 'pluto15v1',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'line-color': '#fff',
            'line-width': 7,
          },
          filter: ['in', 'cartodb_id'],
        });
      }
      if ((style.type === 'circle' || style.type === 'symbol') && key != 'streams') {
        map.map.addLayer({
          id: key + '_highlight_' + index,
          type: 'circle',
          'source-layer': 'pluto15v1',
          source: key,
          layout: {
            visibility: 'visible',
          },
          paint: {
            'circle-color': '#FFF',
            'circle-radius': 7,
            'circle-opacity': 1,
          },
          filter: ['in', 'cartodb_id'],
        });
      }
    });
    if (map) {
      addMapListeners(key);
    }
  };

  const addMapListeners = async (key: string) => {
    const styles = { ...(tileStyles as any) };
    const availableLayers: any[] = [];
    if (styles[key]) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.map.getLayer(key + '_' + index)) {
          return;
        }
        availableLayers.push(key + '_' + index);
        if (style.type != 'symbol') {
          map.map.on('mousemove', key + '_' + index, (e: any) => {
            if (hovereableLayers.includes(key)) {
              showHighlighted(key, e.features[0].properties.cartodb_id);
            }
            if (key.includes('projects') || key === PROBLEMS_TRIGGER) {
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
        }
      });
      setAllLayers(allLayers => [...allLayers, ...availableLayers]);

      map.map.on('mouseenter', key, () => {
        map.map.getCanvas().style.cursor = 'pointer';
      });
      map.map.on('mouseleave', key, () => {
        map.map.getCanvas().style.cursor = '';
      });
      map.map.on('mousemove', () => {
        map.map.getCanvas().style.cursor = !isMeasuring ? 'default' : 'crosshair';
      });
    }
  };
  const test = (item: any) => {};
  const showHighlighted = (key: string, cartodb_id: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id]);
      }
    });
  };
  const hideOneHighlighted = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id']);
      }
    });
  };
  const hideHighlighted = () => {
    const styles = { ...(tileStyles as any) };
    for (const key in styles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.getLayer(key + '_highlight_' + index)) {
          map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id']);
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
      }
    }
    const div = document.getElementById('popup-' + index);
    if (div != null) {
      div.classList.add('map-pop-03');
    }
    return;
  };
  const seeDetails = (details: any, event: any) => {
    if (details.problemid) {
      setData({
        id: '',
        objectid: '',
        cartoid: '',
        type: '',
        value: '',
        problemid: details.problemid,
      });
    } else {
      setData({
        id: details.id !== '-' ? details.id : undefined,
        objectid: details.objectid,
        cartoid: details.valueid,
        type: details.type,
        value: details.valueid,
        problemid: '',
      });
    }
  };
  useEffect(() => {
    if (type.currentTab == 'Maintenance' || type.currentTab == 'MAINTENANCE') {
      updateSelectedLayersWR([
        MHFD_BOUNDARY_FILTERS,
        ROUTINE_MAINTENANCE,
        STREAMS_FILTERS,
        COMPONENT_LAYERS,
        PROBLEMS_TRIGGER,
      ]);
    } else {
      updateSelectedLayersWR([MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS]);
    }
  }, [type.currentTab]);
  useEffect(() => {
    amounts = type.projectsAmounts;
  }, [type.projectsAmounts]);
  const getTotalAmount = (cartodb_id: any) => {
    if (type.projectsAmounts.length > 0) {
      let newAmounts = [...amounts];
      let value = newAmounts.filter((val: any) => val.cartodb_id === cartodb_id);
      if (value[0]) {
        let res = value[0].totalAmount;
        return res;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };
  useEffect(() => {
    let buttonElement = document.getElementById('popup');
    if (buttonElement != null) {
      if (typeof counterPopup.componentes !== 'undefined') {
        buttonElement.innerHTML = counterPopup.componentes + '';
      } else {
        buttonElement.innerHTML = counterPopup + '';
      }
    }
  }, [counterPopup]);

  const getDateMep = (mep_eligibilitystatus: any, props: any) => {
    if (!mep_eligibilitystatus) return undefined;
    let finalDate = new Date(0);
    if (mep_eligibilitystatus == 'Design Approval') {
      finalDate = new Date(props.mep_date_designapproval);
    } else if (mep_eligibilitystatus == 'Construction Approval') {
      finalDate = new Date(props.mep_date_constructionapproval);
    } else if (mep_eligibilitystatus == 'Final Acceptance') {
      finalDate = new Date(props.mep_date_finalacceptance);
    } else if (mep_eligibilitystatus == 'Ineligible') {
      finalDate = new Date(props.mep_date_ineligible);
    }
    let stringDate =
      (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
      '/' +
      (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
      '/' +
      finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-';
    } else {
      return stringDate;
    }
  };
  const parseDateZ = (dateParser: any) => {
    let finalDate = new Date(dateParser);
    let stringDate =
      (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
      '/' +
      (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
      '/' +
      finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-';
    } else {
      return stringDate;
    }
  };
  const epochTransform = (dateParser: any) => {
    let finalDate = new Date(0);
    finalDate.setUTCMilliseconds(dateParser);
    let stringDate =
      (finalDate.getMonth() > 8 ? finalDate.getMonth() + 1 : '0' + (finalDate.getMonth() + 1)) +
      '/' +
      (finalDate.getDate() > 9 ? finalDate.getDate() + 1 : '0' + (finalDate.getDate() + 1)) +
      '/' +
      finalDate.getFullYear();
    if (stringDate.includes('NaN')) {
      return '-';
    } else {
      return stringDate;
    }
  };
  const eventClick = async (e: any) => {
    if (isMeasuring) {
      measureFunction(
        e,
        map.map,
        coordX,
        coordY,
        geojsonMeasures,
        setIsDrawingMeasure,
        linestringMeasure,
        finishMeasure,
        setDistanceValue,
        setAreaValue,
        setDistanceValueMi
      );
    } else {
      if (!isPopup) {
        return;
      }
      setCounterPopup({ componentes: 0 });
      hideHighlighted();
      const popups: any = [];
      const mobile: any = [];
      let isEditPopup = false;
      const menuOptions: any = [];
      const ids: any = [];
      const mobileIds: any = [];
      const bbox = [e.point.x, e.point.y, e.point.x, e.point.y];
      setMobilePopups([]);
      setActiveMobilePopups([]);
      setSelectedPopup(-1);
      const measureFeature = map.map.queryRenderedFeatures(bbox, {
        layers: ['measuresSaved', 'measuresSaved-border', 'measuresSaved-border-invisible'],
      });
      if (measureFeature.length) {
        let measure = measureFeature[0];
        const item = {
          layer: MENU_OPTIONS.MEASURES,
          coordinates: measure.properties.coordinates,
          area: measure.properties.area,
          perimeterFeet: measure.properties.perimeterFeet,
          perimeterMi: measure.properties.perimeterMi,
          id: measure.properties.id,
          type: measure.properties.type,
        };
        menuOptions.push(MENU_OPTIONS.MEASURES);
        popups.push(item);
        mobile.push({
          layer: item.layer,
        });
        mobileIds.push({ layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id });
        ids.push({ layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id });
      } else {
        await addPopupsOnClick(
          map.map,
          bbox, 
          allLayers,
          coordX,
          coordY,
          e,
          galleryProjects,
          mobile,
          menuOptions,
          popups,
          mobileIds,
          ids,
          user,
          isEditPopup,
          getComponentsByProjid,
          setCounterPopup,
          getTotalAmount,
          componentsList,
          MAPTYPES.WORKREQUEST
        );
      }
      console.log('Popup ups ', isEditPopup, );
      if (popups && popups.length) {
        addPopupAndListeners(
          MAPTYPES.WORKREQUEST,
          menuOptions,
          popups,
          user,
          test,
          setMobilePopups,
          setActiveMobilePopups,
          setSelectedPopup,
          mobile,
          mobileIds,
          popup,
          map.map,
          showPopup,
          seeDetails,
          createProject,
          measureCenterAndDelete,
          e,
          ids,
          addRemoveComponent,
          type.openEdit,
          isEditPopup
        )
      }
    }
  };
  const getTitleOfStreamImprovements = (properties: any) => {
    let title = '';
    if (properties.component_part_category) {
      title = properties.component_part_category;
    }
    if (properties.component_part_subcategory) {
      title += (properties.component_part_category ? ' - ' : '') + properties.component_part_subcategory;
    }
    return title;
  };
  const getTitleOfProblemsPart = (feature: any) => {
    let title = '';
    if (feature.source.includes('hazard_polygon')) {
      title = 'Flood Hazard Polygon';
    }
    if (feature.source.includes('hazard_line')) {
      title = 'Flood Hazard Line';
    }
    if (feature.source.includes('hazard_point')) {
      title = 'Flood Hazard Point';
    }
    if (feature.source.includes('function_line')) {
      title = 'Stream Function Line';
    }
    if (feature.source.includes('function_polygon')) {
      title = 'Stream Function Polygon';
    }
    if (feature.source.includes('function_point')) {
      title = 'Stream Function Point';
    }
    if (feature.source.includes('development_polygon')) {
      title = 'Watershed Change Polygon';
    }
    if (feature.source.includes('development_line')) {
      title = 'Watershed Change Line';
    }

    return title;
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
      newComponents = componentsList.filter(
        (comp: any) => !(comp.cartodb_id == item.cartodb_id && comp.table == item.table),
      );
    }
    getListComponentsByComponentsAndPolygon(newComponents, null);
    removePopup();
  };

  useEffect(() => {
    EventService.setRef('click', eventClick);
    let eventToClick = EventService.getRef('click');
    map.map.on('click', eventToClick);
    return () => {
      if (map) {
        map.map.off('click', eventToClick);
      }
    };
  }, [allLayers]);

  const renderOption = (item: any) => {
    return {
      key: `${item.text}|${item.place_name}`,
      value: `${item.center[0]},${item.center[1]}?${item.text} ${item.place_name}`,
      label: (
        <div className="global-search-item">
          <h6>{item.text}</h6>
          <p>{item.place_name}</p>
        </div>
      ),
    };
  };
  const [keyword, setKeyword] = useState('');

  const handleSearch = (value: string) => {
    setKeyword(value);
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
    const newmarker = new mapboxgl.Marker({ color: '#F4C754', scale: 0.7 });
    newmarker.setLngLat(coord);
    newmarker.addTo(map.map);
    setMarkerGeocoder(newmarker);
    setKeyword('');
  };
  const removePopup = () => {
    popup.remove();
  };
  const centerToLocalityy = () => {
    groupOrganizationZoom();
  };
  return (
    <>
      <div className="map">
      {
            isProblemActive === true ? <div className="legendProblemTypemap">
              <div className="legendprob">
                <div className="iconfloodhazard" />
                Flood Hazard
              </div>
              <div className="legendprob">
                <div className="iconwatershed" />
                Watershed Change
              </div>
              <div className="legendprob">
                <div className="iconstreamfunction" />
                Stream Function
              </div>
            </div> : ''
          }
        <span className="zoomvaluemap">
          <b>Nearmap: May 27, 2022</b>
          <b style={{ paddingLeft: '10px' }}>Zoom Level: {zoomValue}</b>{' '}
        </span>
        <div id={mapid} style={{ height: '100%', width: '100%' }}></div>
        {visible && (
          <DetailedModal
            detailed={detailed}
            type={data?.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
            data={data}
            visible={visible}
            setVisible={setVisible}
          />
        )}
        <div className="m-head">
          <Dropdown
            overlayClassName="dropdown-map-layers"
            visible={visibleDropdown}
            onVisibleChange={(flag: boolean) => {
              setVisibleDropdown(flag);
            }}
            overlay={MapFilterView({
              selectCheckboxes,
              setVisibleDropdown,
              selectedLayers: selectedLayersWR,
              removePopup,
              isWR: true,
            })}
            trigger={['click']}
          >
            <Button>
              <span className="btn-02"></span>
            </Button>
          </Dropdown>
          <AutoComplete
            dropdownMatchSelectWidth={true}
            style={{ width: 200 }}
            options={mapSearch.map(renderOption)}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={keyword}
          >
            <Input.Search allowClear placeholder="Stream or Location" />
          </AutoComplete>
        </div>
        <div className="measure-button">
          {!measuringState && (
            <Button style={{ borderRadius: '4px' }} onClick={() => setMeasuringState(true)}>
              <img className="img-icon" />
            </Button>
          )}
          {measuringState && (
            <div className="measurecontainer">
              <div id={'measure-block'} className="measure-block" onClick={() => setMeasuringState(false)}>
                <div className="headmap">
                  <h4>Measure distances and areas</h4>
                  <button className="close-measure-button" onClick={() => setIsMeasuring(false)}></button>
                </div>
                <hr style={{ opacity: 0.4, width: '96%' }}></hr>
                <div className="bodymap" onClick={() => setIsMeasuring(true)}>
                  <b>
                    <img className="img-measure-00"></img>Create a new measurement
                  </b>
                </div>
              </div>
            </div>
          )}
          {measuringState2 && (
            <div className="measurecontainer">
              <div id={'measure-block'} className="measure-block">
                <div className="headmap">
                  <h4>Measure distances and areas</h4>
                  <button className="close-measure-button" onClick={() => setIsMeasuring(false)}></button>
                </div>
                <hr style={{ opacity: 0.4, width: '96%' }}></hr>
                <div className="bodymapvalues">
                  {distanceValue == '0' && areaValue == '0' ? (
                    <span>Start creating a measurement by adding points to the map</span>
                  ) : (
                    <>
                      <span>
                        Distance:{' '}
                        <b>
                          {distanceValue} Feet ({distanceValueMi} Miles)
                        </b>{' '}
                      </span>
                      <span>
                        Area: <b>{areaValue} Acres</b>{' '}
                      </span>
                    </>
                  )}
                </div>
                <hr style={{ opacity: 0.4, width: '96%' }}></hr>
                <p className="paragraph">
                  {!isdrawingmeasure && (
                    <span className="button-c" style={{ marginLeft: '-1px' }} onClick={() => setIsMeasuring(false)}>
                      <a style={{ color: '#11093C' }}>
                        <img className="img-measure-05"></img> <b>Cancel</b>
                      </a>
                    </span>
                  )}
                  {isdrawingmeasure && (
                    <span className="button-c" style={{ paddingLeft: '20px' }} onClick={() => finishMeasure('line')}>
                      <a style={{ color: '#11093C' }}>
                        <img className="img-measure-png-01" src="/Icons/icon-line.png"></img> <b>Finish Line</b>
                      </a>
                    </span>
                  )}
                  {isdrawingmeasure && (
                    <span className="button-c" style={{ paddingLeft: '22px' }} onClick={() => finishMeasure('polygon')}>
                      <a style={{ color: '#11093C' }}>
                        <img className="img-measure-png-02" src="/Icons/icon-polygon.png"></img> <b>Finish Polygon</b>
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="m-zoom">
          <Button style={{ borderRadius: '4px' }} onClick={() => centerToLocalityy()}>
            <img className="img-icon-05" />
          </Button>
          <Button className="btn-history" onClick={() => setDisplayPrevNext(!displayPrevNext)}>
            <img className="img-icon-04"></img>
          </Button>
          {displayPrevNext && (
            <div className="mapstatebuttons">
              <div
                className="mapstateprevnext"
                style={!hasPrevious() ? { backgroundColor: '#f1f1f1' } : {}}
                onClick={() => {
                  if (hasPrevious()) {
                    const prev = getPrevious();
                    globalMapId = prev.id;
                    map.fitBounds([
                      [prev.bbox[0], prev.bbox[1]],
                      [prev.bbox[2], prev.bbox[3]],
                    ]);
                  }
                }}
              >
                <div className="title">Prev</div>
                <div className="progress left">
                  <div className="progress-value light" style={{ width: `${100.0 - getPercentage()}%` }}></div>
                </div>
              </div>
              <div
                className="mapstateprevnext"
                style={!hasNext() ? { backgroundColor: '#f1f1f1' } : {}}
                onClick={() => {
                  if (hasNext()) {
                    const nxt = getNext();
                    globalMapId = nxt.id;
                    console.log('click next, ', nxt);
                    map.fitBounds([
                      [nxt.bbox[0], nxt.bbox[1]],
                      [nxt.bbox[2], nxt.bbox[3]],
                    ]);
                  }
                }}
              >
                <div className="title">Next</div>
                <div className="progress right">
                  <div className="progress-value light" style={{ width: `${getPercentage()}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkRequestMap;
