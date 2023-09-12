import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import { MapService as MapServiceCreate } from '../../utils/MapService';
import { InfoCircleOutlined } from '@ant-design/icons';
import * as turf from '@turf/turf';
import { getData, getToken } from '../../Config/datasets';
import * as datasets from '../../Config/datasets';
import { SERVER } from '../../Config/Server.config';
import { addGeojsonSource, removeGeojsonCluster } from './../../routes/map/components/MapFunctionsCluster';
import { addPopupAndListeners, addPopupsOnClick, measureFunction } from '../../routes/map/components/MapFunctionsPopup';
import { depth, applyMeasuresLayer } from '../../routes/map/components/MapFunctionsUtilities';
import EventService from '../../services/EventService';
import MapService from 'Components/Map/MapService';
import {
  PROBLEMS_TRIGGER,
  COMPONENT_LAYERS,
  ROUTINE_MAINTENANCE,
  MHFD_BOUNDARY_FILTERS,
  SELECT_ALL_FILTERS,
  ROUTINE_NATURAL_AREAS,
  STREAMS_FILTERS,
  ROUTINE_WEED_CONTROL,
  ROUTINE_DEBRIS_AREA,
  ROUTINE_DEBRIS_LINEAR,
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
  MHFD_STREAMS_FILTERS,
  PIPE_APPURTENANCES,
  GRADE_CONTROL_STRUCTURE,
  STREAM_IMPROVEMENT_MEASURE,
  FLOOD_HAZARD_POLYGON,
  FLOOD_HAZARD_LINE,
  FLOOD_HAZARD_POINT,
  STREAM_FUNCTION_POLYGON,
  STREAM_FUNCTION_POINT,
  STREAM_FUNCTION_LINE,
  FUTURE_DEVELOPMENT_POLYGON,
  FUTURE_DEVELOPMENT_LINE,
  FUTURE_DEVELOPMENT_POINT,
  NEARMAP_TOKEN,
  STREAMS_POINT,
  PROJECTS_DRAFT,
  MENU_OPTIONS,
  MAPTYPES,
  MAINTENANCE_TRAILS,
  REMOVAL_AREA,
  REMOVAL_LINE,
} from '../../constants/constants';
import { ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import { Button, Popover, Modal, Input, AutoComplete, Col, Row } from 'antd';
import { tileStyles, NEARMAP_STYLE } from '../../constants/mapStyles';
import { useMapState, useMapDispatch } from '../../hook/mapHook';
import { useProjectState, useProjectDispatch } from '../../hook/projectHook';
import { useProfileState } from '../../hook/profileHook';
import LoadingViewOverall from '../Loading-overall/LoadingViewOverall';
import { polyMask } from '../../routes/map/components/MapFunctionsUtilities';
import MapDropdownLayers from 'routes/map/components/MapDropdownLayers';
import SideMenuTools from 'routes/map/components/SideMenuTools';
// import SideBarComment from 'Components/Map/SideBarComment';
// import {   createNoteWithElem,
//   editNoteWithElem,
//   handleColor,
//   openMarkerOfNoteWithoutAdd, } from 'routes/map/components/MapFunctionsNotes';
// import { useNoteDispatch, useNotesState } from 'hook/notesHook';
// import { notesPopup } from 'routes/map/components/MapGetters';
import ModalLayers from 'Components/Project/TypeProjectComponents/ModalLayers';
import { deletefirstnumbersmhfdcode } from 'utils/utils';

const windowWidth: any = window.innerWidth;

let map: any;
let isProblemActive = false;
let isPopup = true;
let coordX = -1;
let coordY = -1;
let isDrawingCurrently = false;
let componentsList: any[] = [];
let marker = new mapboxgl.Marker({ color: '#ffbf00', scale: 0.7 });
let currentDraw = 'polygon';
let firstCallDraw = false;
let flagInit = true;
type GeoJSONMeasures = {
  type: string;
  features: any[];
};
const geojsonMeasures = {
  type: 'FeatureCollection',
  features: [],
};
const geojsonMeasuresSaved: GeoJSONMeasures = {
  type: 'FeatureCollection',
  features: [],
};
const linestringMeasure = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};
type LayersType = string | ObjectLayerType;
let magicAddingVariable = false;
const CreateProjectMap = (type: any) => {
  let html = document.getElementById('map3');
  const factorKMToMiles = 0.621371;
  const factorKMtoFeet = 3280.8;
  const factorm2toacre = 0.00024710538146717;
  let isMeasuring = useRef(false);
  let popup = new mapboxgl.Popup({ closeButton: true });
  const typeRef = useRef(type.type);
  const {
    layers,
    mapSearch,
    filterProjects,
    filterProblems,
    componentDetailIds,
    filterComponents,
    projectsids,
    selectedLayers
  } = useMapState();

  const {
    mapSearchQuery,
    setSelectedPopup,
    setSelectedOnMap,
    existDetailedPageProblem,
    existDetailedPageProject,
    getComponentsByProjid,
    updateSelectedLayers
  } = useMapDispatch();
  const {
    saveSpecialLocation,
    saveAcquisitionLocation,
    getStreamIntersectionPolygon,
    getStreamsIntersectedPolygon,
    changeAddLocationState,
    getServiceAreaPoint,
    getServiceAreaStreams,
    getStreamsList,
    setUserPolygon,
    setIsGeomDrawn,
    changeDrawState,
    changeDrawStateCapital,
    getListComponentsByComponentsAndPolygon,
    setStreamsIds,
    setStreamIntersected,
    updateSelectedLayersCP,
    getJurisdictionPolygon,
    getServiceAreaPolygonofStreams,
    setZoomGeomCreateMap,
    setComponentIntersected,
    setComponentGeom,
    setEditLocation,
    setStreamsList
  } = useProjectDispatch();
  const {
    userPolygon,
    streamIntersected,
    isDraw,
    isDrawCapital,
    streamsIntersectedIds,
    isAddLocation,
    listComponents,
    selectedLayersCP,
    highlightedComponent,
    editLocation,
    componentGeom,
    zoomGeom,
    highlightedProblem,
    listStreams,
    boardProjectsCreate,
    highlightedStream,
    highlightedStreams,
  } = useProjectState();
  const { groupOrganization, userInformation: user } = useProfileState();
  // const { getNotes, createNote, editNote, setOpen, deleteNote } = useNoteDispatch();
  // const { notes, availableColors } = useNotesState();
  const [idsBoardProjects, setIdsBoardProjects] = useState(boardProjectsCreate);
  const [layerFilters, setLayerFilters] = useState(layers);
  const [localAOI, setLocalAOI] = useState(type.locality);
  const [coordinatesJurisdiction, setCoordinatesJurisdiction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIntersectionError, setShowIntersectionError] = useState(false);
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
    REMOVAL_AREA,
    REMOVAL_LINE,
    MAINTENANCE_TRAILS,
    FLOOD_HAZARD_POLYGON,
    FLOOD_HAZARD_LINE,
    FLOOD_HAZARD_POINT,
    STREAM_FUNCTION_POLYGON,
    STREAM_FUNCTION_POINT,
    STREAM_FUNCTION_LINE,
    FUTURE_DEVELOPMENT_POLYGON,
    FUTURE_DEVELOPMENT_LINE,
    FUTURE_DEVELOPMENT_POINT,
    PIPE_APPURTENANCES,
    GRADE_CONTROL_STRUCTURE,
    STREAM_IMPROVEMENT_MEASURE,
    COMPONENT_LAYERS.tiles,
    MHFD_STREAMS_FILTERS,
    STREAMS_FILTERS,
  ];
  const [problemClusterGeojson, setProblemClusterGeojson] = useState(undefined);
  const empty: any[] = [];
  const [allLayers, setAllLayers] = useState(empty);
  const [counterPopup, setCounterPopup] = useState({ componentes: 0 });
  const [componentsHover, setComponentsHover] = useState([]);
  const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
  const [zoomEndCounter, setZoomEndCounter] = useState(0);
  const [dragEndCounter, setDragEndCounter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [flagtoDraw, setFlagtoDraw] = useState(false);
  const [mapService] = useState<MapService>(new MapService());
  const currentBounds = useRef(undefined);
  const [areaValue, setAreaValue] = useState('0');
  const [measuringState, setMeasuringState] = useState(isMeasuring.current);
  const [measuringState2, setMeasuringState2] = useState(isMeasuring.current);
  const [isdrawingmeasure, setIsDrawingMeasure] = useState(false);
  const [distanceValue, setDistanceValue] = useState('0');
  const [distanceValueMi, setDistanceValueMi] = useState('0');
  const groupedProjectIdsType = useRef<any>({});
  // the next const is created to avoid error adding buttons to sidebar
  const [commentVisible ,setCommentVisible] = useState(false);
  // the next const is created to avoid error adding buttons to sidebar
  // const [markersNotes, setMarkerNotes] = useState([]);
  // let momentaryMarker = new mapboxgl.Marker({ color: '#FFFFFF', scale: 0.7 });
  // const docNote = document.createElement('div');
  // docNote.className = 'marker-note';
  // const markerNote = new mapboxgl.Marker(docNote);
  // let isEdit = false;
  // let newNote: any = undefined;
  // let currentNote: any = undefined;
  // let canAdd = { value: false };
  // let commentAvailable = false;

  useEffect(() => {
    magicAddingVariable = isAddLocation;
  }, [isAddLocation]);

  useEffect(() => {
    map = undefined;
    return () => {
      setStreamIntersected([]);
      setZoomGeomCreateMap(currentBounds.current);
      // recien mandar al zoomgeom
    };
  }, []);
  useEffect(() => {
    setLoading(true);
    const waiting = () => {
      html = document.getElementById('map3');
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if (!map) {
          // getNotes();
          map = new MapServiceCreate('map3');
          map.loadImages();
          let _ = 0;
          map.zoomEnd(() => {
            setZoomEndCounter(_++);
          });
          let __ = 1;
          map.dragEnd(() => {
            setDragEndCounter(__++);
          });
          map.isStyleLoaded(() => {
            map.map.setTerrain();
          });
        }
      }
    };
    // map = undefined;
    waiting();
    EventService.setRef('click', eventClick);
    EventService.setRef('move', eventMove);
    EventService.setRef('addmarker', addMarker);
    EventService.setRef('oncreatedraw', onCreateDraw);
    changeAddLocationState(false);
    setLayersSelectedOnInit();
    componentsList = [];
    getData(`${SERVER.URL_BASE}/locality/`, getToken()).then(
      (r: any) => {
        if (r.localities.length > 0) {
          setLocalAOI(r.localities[0].name);
        }
      },
      e => {
        console.log('e', e);
      },
    );
    hideHighlighted();
    showHoverComponents();
    typeRef.current = type.type
    if((type.type === 'STUDY' && type.projectid === -1) 
    || ((type.type !== 'CAPITAL' && type.type !== 'MAINTENANCE') && (type.lastValue === 'capital' || type.lastValue === 'maintenance'))
    || (type.type !== 'STUDY' && type.lastValue === 'study')
     ){
      setStreamIntersected([]);
      setStreamsList([]);
    }
    return () => {
      setStreamsIds([]);
      setComponentIntersected([]);
      setComponentGeom(undefined);
      // updateSelectedLayersCP([]);
      setUserPolygon([]);
      setEditLocation([]);
      marker.remove();
      // setZoomGeom(undefined);
    };
  }, [type.type]);

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
  useEffect(() => {
    if (editLocation && editLocation[0]) {
      setTimeout(() => {
        map.isStyleLoaded(() => {
          AddMarkerEdit({ lat: editLocation[1], lng: editLocation[0] + 0.00003 });
        });
      }, 1300);
    } else {
      marker.remove();
    }
  }, [editLocation]);
  useEffect(() => {
    if (!flagInit) {
      setLoading(false);
    }
  }, [listStreams]);
  useEffect(() => {
    if (zoomGeom && map ) {
      map.map.fitBounds(zoomGeom);
      map.map.once('load', () => {
        map.map.fitBounds(zoomGeom);
      });
    }
  }, [zoomGeom, map]);
  useEffect(() => {
    // commented to avoid only one action to be highlighted instead of all actions in same table 
    // if (map) {
    //   if (highlightedComponent.table && !magicAddingVariable) {
    //     setFlagtoDraw(false);
    //     hideHighlighted();
    //     if (highlightedComponent.table.includes('stream_improvement_measure_copy')) {
    //       showHighlighted(highlightedComponent.table, highlightedComponent.objectid);
    //     } else {
    //       showHighlighted(highlightedComponent.table, highlightedComponent.cartodb_id);
    //     }
    //   } else {
    //     // hideHighlighted();
    //     setFlagtoDraw(true);
    //   }
    // }
  }, [highlightedComponent]);
  useEffect(() => {
    let mask;
    setTimeout(() => {
      map.isStyleLoaded(() => {
        if (coordinatesJurisdiction.length > 0) {
          const DEPTH = depth(coordinatesJurisdiction);
          if (DEPTH == 4) {
            mask = turf.multiPolygon(coordinatesJurisdiction);
          } else {
            mask = turf.polygon(coordinatesJurisdiction);
          }
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
    const equals = (a: any, b: any) => a.length === b.length && a.every((v: any, i: any) => v === b[i]);
    if (boardProjectsCreate.ids && boardProjectsCreate.ids[0] != '-8888') {
      if (!equals(boardProjectsCreate.ids, idsBoardProjects)) {
        setIdsBoardProjects(boardProjectsCreate.ids);
      }
    }
  }, [boardProjectsCreate]);
  useEffect(() => {
    if (map) {
      if (highlightedProblem.problemid && !magicAddingVariable) {
        showHighlightedProblem(highlightedProblem.problemid);
        // updateSelectedLayersCP([...selectedLayersCP, PROBLEMS_TRIGGER]);
      } else {
        hideHighlighted();
        showHoverComponents();
      }
    }
  }, [highlightedProblem]);
  useEffect(() => {
    if (map) {
      if (highlightedStream.streamId && !magicAddingVariable) {
        showHighlightedStream(highlightedStream.streamId);
      } else {
        hideHighlighted();
        showHoverComponents();
      }
    }
  }, [highlightedStream]);
  useEffect(() => {
    if (highlightedStreams.ids) {
      let codes = highlightedStreams.ids.map((hs: any) => {
        let code;
        if(hs.cartodb_id){
          code = hs.mhfd_code;
        } else {
          code = deletefirstnumbersmhfdcode(hs);
        }
        return code;
      });
      if (map) {
        if (codes.length > 0 && !magicAddingVariable) {
          showHighlightedStreams(codes);
        } else {
          hideHighlighted();
          showHoverComponents();
        }
      }
    } else {
      if (map) {
        hideHighlighted();
        showHoverComponents();
      }
    }
  }, [highlightedStreams]);

  const setBounds = (value: any) => {
    const zoomareaSelected = groupOrganization
      .filter((x: any) => x.name.includes(value) || value.includes(x.name))
      .map((element: any) => {
        return {
          aoi: element.name,
          filter: element.filter,
          coordinates: element.coordinates,
        };
      });
    if (zoomareaSelected[0]) {
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates?.coordinates);
      setCoordinatesJurisdiction(zoomareaSelected[0].coordinates?.coordinates);
      const DEPTH = depth(zoomareaSelected[0].coordinates?.coordinates);
      let poly;
      if (DEPTH == 4) {
        poly = turf.multiPolygon(zoomareaSelected[0].coordinates?.coordinates, { name: 'zoomarea' });
      } else {
        poly = turf.polygon(zoomareaSelected[0].coordinates?.coordinates, { name: 'zoomarea' });
      }
    }
  };
  const wait = (cb: any) => {
    if (!map.map) {
      setTimeout(wait, 50);
    } else {
      cb();
    }
  };
  useEffect(() => {
    if (type.projectid != -1 && type.projectid) {
      getData(`${SERVER.URL_BASE}/board/bbox/${type.projectid}`).then(
        (r: any) => {
          if (r?.bbox) {
            let BBoxPolygon = JSON.parse(r.bbox);
            let bboxBounds = turf.bbox(BBoxPolygon);
            if (map.map) {
              setTimeout(() => {
                map.isStyleLoaded(() => map.map.fitBounds(bboxBounds, { padding: 90, maxZoom: 16 }));
              }, 3000);
            }
          }
        },
        (e: any) => {
          console.error('Error getting bbox projectid', e);
        },
      );
    }
  }, [type.projectid]);
  useEffect(() => {
    setTimeout(() => {
      let value = user.zoomarea ? user.zoomarea : localAOI;
      if (type.locality && type.locality !== 'Select a Sponsor') {
        value = type.locality;
      }
      if (groupOrganization.length > 0) {
        wait(() => setBounds(value));
      }
    }, 500);
  }, [groupOrganization, type.locality, localAOI]);
  useEffect(() => {
    if (listComponents && listComponents.result && listComponents.result.length > 0) {
      let componentsHovers: any = {};
      for (let i of listComponents.result) {
        if (i.table.includes('stream_improvement_measure')) {
          componentsHovers[i.table] = componentsHovers[i.table]
            ? [...componentsHovers[i.table], i.objectid]
            : [i.objectid];
        } else {
          componentsHovers[i.table] = componentsHovers[i.table]
            ? [...componentsHovers[i.table], i.cartodb_id]
            : [i.cartodb_id];
        }
      }
      setComponentsHover(componentsHovers);
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      componentsList = listComponents.result;
    } else {
      hideHighlighted();
      showHoverComponents();
      // setStreamIntersected({ geom: null }); // TODO entender porque se borraba la intersection cuando no habia listcompoennts
      // setStreamsIds([]);
      if (!flagInit) {
        setLoading(false);
      }
    }
  }, [listComponents]);

  useEffect(() => {
    // if (flagtoDraw && listComponents && listComponents.result && listComponents.result.length > 0) {
    const containsComponents = selectedLayersCP.some((item:any) => item.name === 'components');
     if(containsComponents){
      hideHighlighted();
      map.isStyleLoaded(() => {
        map.map.once('render', () => {
          showHoverComponents(); 
        });
      });
     }
    // }
  }, [componentsHover, flagtoDraw, selectedLayersCP]);

  useEffect(() => {
    if (isAddLocation) {
      isPopup = false;
      let eventToMove = EventService.getRef('move');
      map.map.on('mousemove', eventToMove);

      let eventToAddMarker = EventService.getRef('addmarker');
      map.map.on('click', eventToAddMarker);
      
    } else {
      let eventToMove = EventService.getRef('move');
      map.map.off('mousemove', eventToMove);
      let eventToAddMarker = EventService.getRef('addmarker');
      map.map.off('click', eventToAddMarker);
      isPopup = true;
      map.removePopUpOffset();
      marker.remove();
      marker = new mapboxgl.Marker({ color: '#ffbf00', scale: 0.7 });
    }
  }, [isAddLocation]);
  const showHoverComponents = () => {
    if (listComponents && listComponents.result && listComponents.result.length > 0 && !magicAddingVariable) {
      Object.keys(componentsHover).forEach((key: any) => {
        showHighlightedArray(key, componentsHover[key]);
      });
    }
  };
  const [isAlreadyDraw, setIsAlreadyDraw] = useState(false);
  const getElementByIdAsync = (id: any) =>
    new Promise(resolve => {
      const getElement = () => {
        const element = document.getElementsByClassName(id);
        if (element) {
          resolve(element);
        } else {
          requestAnimationFrame(getElement);
        }
      };
      getElement();
    });
  const pressButtonDraw = (drawEvent: any) => {
    map.map.once('render', async () => {
      map.createDraw(drawEvent);
      const elements: any = await getElementByIdAsync('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon');
      let element = elements[0] as HTMLElement;
      if (element) {
        element.click();
      }
    });
  };
  useEffect(() => {
    if (isDraw || isDrawCapital) {
      isDrawingCurrently = true;
      currentDraw = isDraw ? 'polygon' : isDrawCapital ? 'capitalpolygon' : 'polygon';
      if (isDrawCapital && type.type === 'CAPITAL') {
        showHoverComponents();
        if (userPolygon.length !== 0 || Object.keys(userPolygon).length !== 0) {
          let bboxBounds = turf.bbox(userPolygon);
          map.isStyleLoaded(() => {
            map.map.fitBounds(bboxBounds, { padding: 80 });
          });
        }
      } else {
        hideHighlighted();
        showHoverComponents();
      }
      if (isAlreadyDraw) {
        map.removeDrawController();
      }
      setIsAlreadyDraw(true);
      if (type.type != 'ACQUISITION' && type.type != 'SPECIAL') {
        isPopup = false;
        map.addDrawControllerTopLeft();
        let drawEvent = EventService.getRef('oncreatedraw');
        map.deleteDraw(drawEvent);
        pressButtonDraw(drawEvent);
      }
    } else {
      isPopup = true;
      isDrawingCurrently = false;
      map.removeDrawController();
      setIsAlreadyDraw(false);
      currentDraw = 'none';
    }
  }, [isDraw, isDrawCapital]);

  const getTurfGeom = (geom: any) => {
    if (geom.type.includes('MultiPolygon')) {
      return turf.multiPolygon(geom.coordinates);
    } else if (geom.type.includes('Polygon')) {
      return turf.polygon(geom.coordinates);
    } else if (geom.type.includes('MultiLineString')) {
      return turf.multiLineString(geom.coordinates);
    } else if (geom.type.includes('LineString')) {
      return turf.lineString(geom.coordinates);
    } else if (geom.type.includes('MultiPoint')) {
      return turf.multiPoint(geom.coordinates);
    } else if (geom.type.includes('Point')) {
      return turf.point(geom.coordinates);
    } else {
    }
  };
  useEffect(() => {
    let geom: any = undefined;
    let thisStreamIntersected = streamIntersected;
    let drawStream = true;
    if (thisStreamIntersected && thisStreamIntersected.geom) {
      geom = JSON.parse(thisStreamIntersected.geom);
      let cg = componentGeom ? JSON.parse(componentGeom.geom) : undefined;
      if (geom.coordinates?.length == 0 && cg) {
        geom = cg;
        thisStreamIntersected.geom = componentGeom.geom;
        drawStream = false;
        setIsGeomDrawn(false);
      } else if (geom.coordinates?.length == 0) {
        setShowIntersectionError(true);
        setLoading(false);
        return;
      }
      if (type.type === 'CAPITAL' || type.type === 'MAINTENANCE') {
        getServiceAreaPolygonofStreams(thisStreamIntersected.geom);
        // setLoading(false);
      }

      if (type.problemId && geom.coordinates.length > 0) {
        let poly = getTurfGeom(geom);
        if (map.map && poly) {
          let bboxBounds = turf.bbox(poly);
          map.isStyleLoaded(() => {
            map.map.fitBounds(bboxBounds, { padding: 80 });
          });
        }
      } else if (type.problemId && cg) {
        let poly = getTurfGeom(cg);
        if (map.map && poly) {
          let bboxBounds = turf.bbox(poly);
          map.isStyleLoaded(() => {
            map.map.fitBounds(bboxBounds, { padding: 80 });
          });
        }
      }
      if (geom && drawStream) {
        setIsGeomDrawn(true);
        map.isStyleLoaded(() => {
          map.removeLayer('streamIntersected');
          map.removeSource('streamIntersected');
          if (!map.map.getSource('streamIntersected')) {
            map.map.addSource('streamIntersected', {
              type: 'geojson',
              data: { type: 'Feature', geometry: geom, properties: [] },
            });
          }
          if (!map.getLayer('streamIntersected')) {
            map.map.addLayer({
              id: 'streamIntersected',
              type: 'line',
              source: 'streamIntersected',
              layout: {},
              paint: {
                'line-color': 'hsl(40, 100%, 50%)',
                'line-width': 6,
              },
            });
            setTimeout(() => {
              map.map.once('idle', () => {
                if (map.map.getLayer('streamIntersected')) {
                  map.map.moveLayer('streamIntersected');
                }
              })
            }, 5500);
            let poly = getTurfGeom(geom);
            if (map.map && poly) {
              let bboxBounds = turf.bbox(poly);
              map.isStyleLoaded(() => {
                map.map.fitBounds(bboxBounds, { padding: 80 });
              });
            }
          }
        });
      }
    } else if (thisStreamIntersected && componentGeom && thisStreamIntersected.geom == null && componentGeom.geom) {
      let cg = componentGeom ? JSON.parse(componentGeom.geom) : undefined;
      let poly = getTurfGeom(cg);
      if (map.map && poly) {
        let bboxBounds = turf.bbox(poly);
        map.isStyleLoaded(() => {
          map.map.fitBounds(bboxBounds, { padding: 80 });
        });
      }
    } else {
      if (map && map.map.isStyleLoaded()) {
        map.removeLayer('streamIntersected');
        map.removeSource('streamIntersected');
      }
    }
  }, [streamIntersected]);
  useEffect(() => {
    if (streamsIntersectedIds.length > 0) {
      let streamsCodes: any = streamsIntersectedIds
        .filter((fstr: any) => fstr.mhfd_code)
        .map((str: any) => str.mhfd_code);
      map.isStyleLoaded(() => {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [...streamsCodes]]];

        map.removeLayer('streams-intersects');
        if (!map.getLayer('streams-intersects')) {
          let timer = map.getSource(MHFD_STREAMS_FILTERS) ? 50 : 2300;
          if (!map.getSource(MHFD_STREAMS_FILTERS)) {
            addLayersSource(MHFD_STREAMS_FILTERS, layerFilters[MHFD_STREAMS_FILTERS]);
          }
          setTimeout(() => {
            map.map.addLayer({
              id: 'streams-intersects',
              type: 'line',
              source: MHFD_STREAMS_FILTERS,
              'source-layer': 'pluto15v1',
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': 'hsl(40, 100%, 50%)',
                'line-width': 7,
              },
              filter: filter,
            });
          }, timer);
        }
        setTimeout(() => {
          map.map.once('idle', () => {
            if (map.map.getLayer('streams-intersects')) {
              map.map.moveLayer('streams-intersects');
            }
          })
        }, 5500);
      });
    } else {
      map.removeLayer('streams-intersects');
    }
  }, [streamsIntersectedIds]);
  useEffect(() => {
    if (map) {
      map.create();
      setLayerFilters(layers);
      map.isStyleLoaded(() => {
        applyNearMapLayer();
      });
      map.map.on('idle', () => {
        map.map.on('moveend', () => {
          currentBounds.current = map.map.getBounds();
        });
      });
    }
  }, [map]);
  const [compareSL, setCompareSL] = useState('');
  const waiting = () => {
    if (map && !map.map.isStyleLoaded()) {
      setTimeout(waiting, 250);
    } else {
      if (JSON.stringify(selectedLayersCP) !== compareSL) {
        if (map) {
          // Commented to avoid loader when hovering problems in capital modal
          // setLoading(true);

          if (selectedLayersCP.length === 0) {
          } else {
            map.isStyleLoaded(() => {
              applyMapLayers();
              map.map.once('idle', () => {
                setLoading(false);
                flagInit = false;
                map.orderLayers();
              });
              applyProblemClusterLayer();
              // topStreams();
            });
            setCompareSL(JSON.stringify(selectedLayersCP));
          }
        }
      }
    }
  };
  useEffect(() => {
    if (map && selectedLayersCP.length > 0) {
      waiting();
    }
    map.orderLayers();
    EventService.setRef('oncreatedraw', onCreateDraw);
    // EventService.setRef('addmarker', addMarker);
  }, [selectedLayersCP]);
  const setIsMeasuring = (value: boolean) => {
    isMeasuring.current = value;
    setMeasuringState2(value);
    setMeasuringState(false);
    geojsonMeasures.features = [];
    linestringMeasure.geometry.coordinates = [];
    setDistanceValue('0');
    setDistanceValueMi('0');
    setAreaValue('0');
    if (map.getSource('geojsonMeasure')) {
      map.getSource('geojsonMeasure').setData(geojsonMeasures);
    }
  };
  const finishMeasure = (type?: string) => {
    const size = type === 'line' ? 1 : 2;
    if (linestringMeasure.geometry.coordinates.length > size && isMeasuring.current) {
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

      geojsonMeasures.features = [];
      linestringMeasure.geometry.coordinates = [];
      map.map.getSource('geojsonMeasure').setData(geojsonMeasures);
      setIsDrawingMeasure(false);
      setIsMeasuring(false);
    }
  };
  const setLayersSelectedOnInit = () => {
    // let ppArray: any = [];
    // let thisSL = [...ppArray, MHFD_BOUNDARY_FILTERS, STREAMS_FILTERS];
    // if (type.type === 'CAPITAL') {
    //   thisSL = [...thisSL, AREA_BASED_MASK, BORDER, PROBLEMS_TRIGGER, COMPONENT_LAYERS];
    // }
    // if (type.type === 'ACQUISITION' || type.type === 'SPECIAL') {
    //   thisSL = [...thisSL, AREA_BASED_MASK, BORDER];
    // }
    // if (type.type === 'STUDY') {
    //   thisSL = [
    //     ...thisSL,
    //     AREA_BASED_MASK,
    //     BORDER,
    //     FLOODPLAINS,
    //     FEMA_FLOOD_HAZARD,
    //     PROBLEMS_TRIGGER,
    //     MHFD_BOUNDARY_FILTERS,
    //     XSTREAMS,
    //     STREAMS_FILTERS,
    //   ];
    // }
    // if (type.type === 'MAINTENANCE') {
    //   thisSL = [...thisSL, AREA_BASED_MASK, BORDER, PROBLEMS_TRIGGER, ROUTINE_MAINTENANCE, MEP_PROJECTS];
    // }
    map.isStyleLoaded(() => {
      // updateSelectedLayersCP(thisSL);
      // updateSelectedLayersCP(selectedLayers);
    });
  };
  const removeProjectLayer = () => {
    let filterLayers = selectedLayersCP.filter((Layer: any) => {
      // if (Layer.name) {
      //   return !(Layer.name == 'projects');
      // } else {
        return true;
      // }
    });
    const deleteLayers = selectedLayersCP.filter((layer: any) => !filterLayers.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        map.removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    updateSelectedLayersCP(filterLayers);
    updateSelectedLayers(filterLayers);
  };
  const onCreateDraw = (event: any) => {
    if (firstCallDraw) {
      return;
    }
    const currentType = typeRef.current;
    firstCallDraw = true;
    // removeProjectLayer();
    setLoading(true);
    const userPolygon = event.features[0];
    if (currentType === 'CAPITAL') {
      if (currentDraw == 'polygon') {
        getListComponentsByComponentsAndPolygon(componentsList, userPolygon.geometry);
      } else {
        hideHighlighted();
        showHoverComponents();
        getStreamIntersectionPolygon(userPolygon.geometry);
      }
      getStreamsList(userPolygon.geometry, currentType);
    } else if (currentType === 'MAINTENANCE') {
      getStreamIntersectionPolygon(userPolygon.geometry);
      getStreamsList(userPolygon.geometry, currentType);
    } else if (currentType === 'STUDY') {
      // type.setGeom(userPolygon.geometry); TODO verify if this is needed
      getStreamsIntersectedPolygon(userPolygon.geometry);
      getStreamsList(userPolygon.geometry, currentType);
      getServiceAreaStreams(userPolygon.geometry);
    }

    getJurisdictionPolygon(userPolygon.geometry);
    setUserPolygon(userPolygon.geometry);
    setTimeout(() => {
      changeDrawState(false);
      changeDrawStateCapital(false);
    }, 2000);
    setTimeout(() => {
      let elements = document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash');
      let element: HTMLElement = elements[0] as HTMLElement;
      if (element) {
        element.click();
      }
      firstCallDraw = false;
    }, 2500);
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
        map.map.moveLayer('landscaping_area');
        map.map.moveLayer('land_acquisition');
        map.map.moveLayer('detention_facilities');
        map.map.moveLayer('storm_drain');
        map.map.moveLayer('channel_improvements_area');
        map.map.moveLayer('channel_improvements_linear');
        map.map.moveLayer('storm_drain');
        map.map.moveLayer('pipe_appurtenances');
        map.map.moveLayer('grade_control_structure');
        map.map.moveLayer('maintenance_trails');
        map.map.moveLayer('stream_improvement_measure_copy');
        map.map.moveLayer('removal_line');
        map.map.moveLayer('removal_area');
        map.map.moveLayer('measuresSaved');
        map.map.moveLayer('measure-lines');
        map.map.moveLayer('streams_0');
        map.map.moveLayer('streams_1');
        map.map.moveLayer('streams_2');
        map.map.moveLayer('streams_3');
        map.map.moveLayer('measuresSaved-border');
        map.map.moveLayer('area_based_mask');
        setTimeout(() => {
          map.map.moveLayer('area_based_maskMASK');
          map.map.moveLayer('borderMASK');
        }, 300);
      }
    }, 1000);
  };
  const applyProblemClusterLayer = () => {
    const controller = new AbortController();
    datasets.getData(SERVER.MAP_PROBLEM_TABLES, datasets.getToken(), controller.signal).then((geoj: any) => {
      if (map && !map.map.getSource('clusterproblem')) {
        addGeojsonSource(map.map, geoj.geom, isProblemActive);
      }
      setProblemClusterGeojson(geoj.geom);
    });
  };

  const getIdByProjectType = () => {
    const capitalProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 5)
      .map((project: any) => project.project_id);
    const maintenanceProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 7)
      .map((project: any) => project.project_id);
    const studyProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 1)
      .map((project: any) => project.project_id);
    const studyProjectsFHAD = projectsids
      .filter((project: any) => project.code_project_type_id === 4)
      .map((project: any) => project.project_id);
    const acquisitionProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 13)
      .map((project: any) => project.project_id);
    const developementImprProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 6)
      .map((project: any) => project.project_id);

    const groupedProjectsByType = {
      5: capitalProjects,
      7: maintenanceProjects,
      1: studyProjects,
      4: studyProjectsFHAD,
      13: acquisitionProjects,
      6: developementImprProjects,
    };
    groupedProjectIdsType.current = groupedProjectsByType;
  };

  useEffect(() => {
    getIdByProjectType();
  }, [projectsids]);

  const applyMapLayers = useCallback(async () => {
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
    const deleteLayers = SELECT_ALL_FILTERS.filter((layer: any) => !selectedLayersCP.includes(layer as string));
    await deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        map.removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    await selectedLayersCP.forEach((layer: LayersType) => {
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
    if (type.type === 'SPECIAL') {
      filterProjectsNew.projecttype = 'Special';
    } else if (type.type === 'STUDY') {
      filterProjectsNew.projecttype = 'Study';
    } else {
      filterProjectsNew.projecttype = 'Maintenance,Capital';
    }
    if (map) {
      for (const component of COMPONENT_LAYERS.tiles) {
        applyFilters(component, filterComponents);
      }
    }
    applyFilters(MHFD_PROJECTS, filterProjectsNew);
    applyMeasuresLayer(map.map, geojsonMeasures, geojsonMeasuresSaved);
    setTimeout(() => {
      map.map.moveLayer('munis-centroids-shea-plusother');
    }, 500);
  }, [selectedLayersCP]);
  const showLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (map.map.getLayer(key + '_' + index)) {
        map.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
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
  const applyFilters = useCallback(
    (key: string, toFilter: any) => {
      const styles = { ...(tileStyles as any) };
      let clusterAdded = false;
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.getLayer(key + '_' + index)) {
          return;
        }
        const allFilters: any[] = ['all'];
        if (key !== MHFD_PROJECTS) {
          for (const filterField in toFilter) {
            const filters = toFilter[filterField];
            if (filterField === 'status' && type.type === 'CAPITAL') {
              if (filters === 'Proposed' || filters === 'TBD') {
                allFilters.push(['==', ['get', filterField], filters]);
              }
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
                // TODO: find why is not used anymore
                // for (const range of filters) {
                //   const [lower, upper] = range?.split(',');
                //   const lowerArray: any[] = ['>=', ['to-number', ['get', filterField]], +lower];
                //   const upperArray: any[] = ['<=', ['to-number', ['get', filterField]], +upper];
                //   const allFilter = ['all', lowerArray, upperArray];
                //   options.push(allFilter);
                // }
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
        } else {
          const currentLayer = map.getLayer(key + '_' + index);
          let projecttypes = currentLayer.metadata.projecttype;
          let combinedProjects: any = [];
          for (let type in groupedProjectIdsType.current) {
            if (projecttypes.includes(+type)) {
              combinedProjects.push(...groupedProjectIdsType.current[type]);
            }
          }
          if (combinedProjects.length === 0) {
            allFilters.push(['in', ['get', 'projectid'], ['literal', [-1]]]);
          } else {
            allFilters.push(['in', ['get', 'projectid'], ['literal', combinedProjects]]);
          }
        }
        if (componentDetailIds && componentDetailIds[key]) {
          allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...componentDetailIds[key]]]]);
        }
        if (key == PROBLEMS_TRIGGER && problemClusterGeojson) {
          if (!map.map.getSource('clusterproblem')) {
            if (!clusterAdded) {
              addGeojsonSource(map.map, problemClusterGeojson, isProblemActive, allFilters);
              clusterAdded = true;
            }
          }
        }
        if (map.getLayer(key + '_' + index)) {
          map.setFilter(key + '_' + index, allFilters);
        }
      });
    },
    [problemClusterGeojson],
  );
  const selectCheckboxes = (selectedItems: Array<LayersType>) => {
    const deleteLayers = selectedLayersCP.filter((layer: any) => !selectedItems.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        map.removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    updateSelectedLayersCP(selectedItems);
    updateSelectedLayers(selectedItems);
    map.orderLayers();
    // topStreams();
  };
  const hideLayers = (key: string) => {
    if (map) {
      const styles = { ...(tileStyles as any) };
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.map.getLayer(key + '_' + index)) {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
        }
      });
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
  const addLayersSource = (key: string, tiles: Array<string>) => {
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      map.map.addSource(key, {
        type: 'vector',
        tiles: tiles,
      });
      addTilesLayers(key);
    }
  };

  const addTilesLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    if (key == 'stream_improvement_measure') {
      key += '_copy';
    }
    if (styles[key] && !key.includes('milehighfd.')) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (key.includes(PROJECTS_DRAFT)) {
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
        if (!key.includes('streams') && !key.includes(STREAMS_POINT)) {
          map.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
        }

        if (!hovereableLayers.includes(key)) {
          return;
        }
        if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
          let filter = ['in', 'cartodb_id'];
          if (key == PROBLEMS_TRIGGER) {
            filter = ['in', 'problemid'];
          } else if (key == MHFD_STREAMS_FILTERS) {
            filter = ['in', 'mhfd_code'];
          }
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
            filter: filter,
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
    } else {
      // console.log('No style for ', key);
    }

    addMapListeners(key);
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
            if (isDrawingCurrently || isMeasuring.current) {
              return;
            }
            // if (commentAvailable) {
            //   return;
            // }
            if (hovereableLayers.includes(key) && currentDraw != 'capitalpolygon' && !magicAddingVariable) {
              setFlagtoDraw(false);
              if (key.includes('stream_improvement_measure_copy')) {
                hideHighlighted();
                showHoverComponents();
                showHighlighted(key, e.features[0].properties.objectid);
              } else {
                hideHighlighted();
                showHoverComponents();
                showHighlighted(key, e.features[0].properties.cartodb_id);
              }
            }
            if (key.includes('projects') || key === PROBLEMS_TRIGGER) {
              map.map.getCanvas().style.cursor = 'pointer';
              setSelectedOnMap(e.features[0].properties.cartodb_id, key);
            } else {
              setSelectedOnMap(-1, '');
            }
          });
          map.map.on('mouseleave', key + '_' + index, (e: any) => {
            // if (commentAvailable) {
            //   return;
            // }
            if (hovereableLayers.includes(key) && currentDraw != 'capitalpolygon') {
              hideOneHighlighted(key);
            }
            map.map.getCanvas().style.cursor = '';
            setSelectedOnMap(-1, '');
            setFlagtoDraw(true);
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
        if (!isDrawingCurrently) {
          map.getCanvas().style.cursor = (!isMeasuring.current) ? 'default' : 'crosshair';
        }
        
      });
    }
  };
  const existDetailedPage = (item: any) => {
    if (item.problemid) {
      existDetailedPageProblem(item.problemid);
    } else {
      const url = 'projectid' + (item.projectid || item.id);
      existDetailedPageProject(url);
    }
  };
  const showHighlightedStream = (mhfd_code: any) => {
    const styles = { ...(tileStyles as any) };
    styles[MHFD_STREAMS_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(MHFD_STREAMS_FILTERS + '_' + index) && !magicAddingVariable) {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [mhfd_code]]];
        map.map.moveLayer(MHFD_STREAMS_FILTERS + '_highlight_' + index);
        map.setFilter(MHFD_STREAMS_FILTERS + '_highlight_' + index, filter);
      }
    });
  };
  const showHighlightedStreams = (mhfd_codes: any) => {
    const styles = { ...(tileStyles as any) };
    styles[MHFD_STREAMS_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(MHFD_STREAMS_FILTERS + '_' + index) && !magicAddingVariable) {
        let filter = ['in', ['get', 'unique_mhfd_code'], ['literal', [...mhfd_codes]]];
        map.map.moveLayer(MHFD_STREAMS_FILTERS + '_highlight_' + index);
        map.setFilter(MHFD_STREAMS_FILTERS + '_highlight_' + index, filter);
      }
    });
  };
  const showHighlightedProblem = (problemid: string) => {
    const styles = { ...(tileStyles as any) };
    styles[PROBLEMS_TRIGGER].forEach((style: LayerStylesType, index: number) => {
      if (map.getLayer(PROBLEMS_TRIGGER + '_' + index) && !magicAddingVariable) {
        map.setFilter(PROBLEMS_TRIGGER + '_highlight_' + index, ['in', 'problemid', parseInt(problemid)]);
      }
    });
  };
  const showHighlighted = (key: string, cartodb_id: string) => {
    const styles = { ...(tileStyles as any) };
    // TODO REMOVE ONCE TABLES OF COMPONENTS ARE THE SAME
    if (key == 'stream_improvement_measure') {
      key += '_copy';
    }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (
        map.getLayer(key + '_' + index) &&
        map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none' &&
        !magicAddingVariable
      ) {
        if (key.includes('stream_improvement_measure_copy')) {
          map.setFilter(key + '_highlight_' + index, ['in', 'objectid', cartodb_id]);
        } else {
          map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id]);
        }
      }
    });
  };
  const showHighlightedArray = (key: string, cartodb_ids: any) => {
    const styles = { ...(tileStyles as any) };
    if (key == 'stream_improvement_measure') {
      key += '_copy';
    }
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (
        map.getLayer(key + '_' + index) &&
        map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none' &&
        !magicAddingVariable
      ) {
        let filter;
        if (key.includes('stream_improvement_measure_copy')) {
          filter = ['in', ['get', 'objectid'], ['literal', [...cartodb_ids]]];
        } else {
          filter = ['in', ['get', 'cartodb_id'], ['literal', [...cartodb_ids]]];
        }
        map.setFilter(key + '_highlight_' + index, filter);
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

  const AddMarkerEdit = (e: any) => {
    popup.remove();
    marker.setLngLat([e.lng, e.lat]).addTo(map.map);
    let sendLine = {
      geom: {
        type: 'MultiLineString',
        coordinates: [
          [
            [e.lng - 0.00003, e.lat],
            [e.lng + 0.00003, e.lat],
          ],
        ],
      },
    };
    if (type.type === 'SPECIAL') {
      saveSpecialLocation(sendLine);
    } else if (type.type === 'ACQUISITION') {
      saveAcquisitionLocation(sendLine);
    }
    isPopup = true;
  };
  const addMarker = (e: any) => {
    // removeProjectLayer();
    e.originalEvent.stopPropagation();
    map.removePopUpOffset();
    popup.remove();
    marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
    let sendLine = {
      geom: {
        type: 'MultiLineString',
        coordinates: [
          [
            [e.lngLat.lng - 0.00003, e.lngLat.lat],
            [e.lngLat.lng + 0.00003, e.lngLat.lat],
          ],
        ],
      },
    };
    if (type.type === 'SPECIAL') {
      saveSpecialLocation(sendLine);
    } else if (type.type === 'ACQUISITION') {
      saveAcquisitionLocation(sendLine);
    }
    getServiceAreaPoint(sendLine);
    let eventToMove = EventService.getRef('move');
    map.map.off('mousemove', eventToMove);
    let eventToAddMarker = EventService.getRef('addmarker');
    map.map.off('click', eventToAddMarker);
    isPopup = true;
  };
  const eventMove = (e: any) => {
    marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.map);
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
  const measureCenterAndDelete = (type: any, item: any) => {
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
  const eventClick = async (e: any) => {
    popup.remove();
    if (!isPopup) {
      return;
    }
    if (isMeasuring.current) {
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
        setDistanceValueMi,
      );
    } else {
      // hideHighlighted();
      const popups: any = [];
      const mobile: any = [];
      const menuOptions: any = [];
      const ids: any = [];
      const mobileIds: any = [];
      const bbox = [e.point.x, e.point.y, e.point.x, e.point.y];
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
        mobile.push(item);
        mobileIds.push({ layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id });
        ids.push({ layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id });
      } else {
        let layersToClick = [...allLayers];
        if (map.map.getLayer('streams-intersects')) {
          layersToClick = [...layersToClick, 'streams-intersects'];
        }
        await addPopupsOnClick(
          map.map,
          bbox,
          layersToClick,
          coordX,
          coordY,
          e,
          mobile,
          menuOptions,
          popups,
          mobileIds,
          ids,
          user,
          getComponentsByProjid,
          setCounterPopup,
          componentsList,
          MAPTYPES.CREATEPROJECTMAP,
        );
      }
      if (popups.length) {
        popup.remove();
        popup = new mapboxgl.Popup({ closeButton: true });
        setSelectedPopup(0);
        addPopupAndListeners(
          MAPTYPES.CREATEPROJECTMAP,
          menuOptions,
          popups,
          user,
          existDetailedPage,
          popup,
          map.map,
          showPopup,
          () => {},
          () => {},
          measureCenterAndDelete,
          e,
          ids,
          addRemoveComponent,
          () => {},
          false,
          getComponentsFromProjProb,
        );
      }
      
    }

    // if (isEdit) {
    //   editNoteWithElem(currentNote, editNote);
    //   isEdit = false;
    //   newNote = undefined;
    //   currentNote = undefined;
    // }
    // if (newNote !== void 0 && isEdit === false) {
    //   createNoteWithElem(newNote, createNote);
    //   markerNote.remove();
    //   popup.remove();
    //   isEdit = false;
    //   newNote = undefined;
    //   currentNote = undefined;
    // }

    // if (markerGeocoder) {
    //   markerGeocoder.remove();
    //   setMarkerGeocoder(undefined);
    // }

    // if (commentAvailable && canAdd.value) {
    //   const html = notesPopup(setNote, handleDeleteNote);
    //   popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     offset: {
    //       top: [0, 10],
    //       bottom: [0, -10],
    //       left: [10, 0],
    //       right: [-10, 0],
    //     },
    //   });
    //   markerNote.setPopup(popup);
    //   popup.setDOMContent(html);
    //   markerNote
    //     .setLngLat([e.lngLat.lng, e.lngLat.lat])
    //     .setPopup(popup)
    //     .addTo(map)
    //     .togglePopup();
    //   canAdd.value = false;
    //   return;
    // }
    // if (commentAvailable) {
    //   return;
    // }
  };
  const getComponentsFromProjProb = (item: any, event: any) => {
    let id = item.type == 'project' ? item.id : item.problemid;
    getData(SERVER.GET_COMPONENTS_BY_PROBLEMID + '?problemid=' + id, getToken()).then(componentsFromMap => {
      if (componentsFromMap.result.length > 0 && componentsList.length > 0) {
        getListComponentsByComponentsAndPolygon([...componentsList, ...componentsFromMap.result], null);
      } else if (componentsList.length == 0 && componentsFromMap.result.length > 0) {
        getListComponentsByComponentsAndPolygon([...componentsFromMap.result], null);
      } else if (componentsList.length > 0 && componentsFromMap.result.length == 0) {
        getListComponentsByComponentsAndPolygon([...componentsList], null);
      }
    });
    removePopup();
  };
  const addRemoveComponent = (item: any, event: any) => {
    let newComponents: any = [];
    if (item.added === 'Add') {
      newComponents = [
        ...componentsList,
        {
          cartodb_id: item.cartodb_id ? item.cartodb_id : '',
          jurisdiction: item.jurisdiction ? item.jurisdiction : '',
          original_cost: item.original_cost ? item.original_cost : '',
          problemid: null,
          status: item.status ? item.status : '',
          source_table_name: item.table ? item.table : '',
          type: item.type ? item.type : '',
          object_id: item.objectid ? item.objectid : '',
        },
      ];
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
          <h6 style={{ whiteSpace: 'normal' }}>{item.text}</h6>
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

  // const setNote = useCallback(
  //   (event: any, note?: any) => {
  //     const getText = event?.target?.value ? event.target.value : event;
  //     const getColorId = handleColor(availableColors);
  //     if (!note) {
  //       const note = {
  //         color_id: getColorId,
  //         note_text: getText,
  //         latitude: popup.getLngLat().lat,
  //         longitude: popup.getLngLat().lng,
  //       };
  //       newNote = note;
  //       return;
  //     } else {
  //       const noteEdit = {
  //         newnotes_id: note.newnotes_id,
  //         color_id: getColorId,
  //         note_text: getText,
  //         latitude: note.latitude,
  //         longitude: note.longitude,
  //       };
  //       currentNote = noteEdit;
  //       isEdit = true;
  //       return;
  //     }
  //   },
  //   [availableColors],
  // );

  // const flyTo = (longitude: number, latitude: number, zoom?: number) => {
  //   map.flyTo({
  //     center: [longitude, latitude],
  //     zoom: zoom ?? 15,
  //   });
  // };

  // const openEditNote = (note: any) => {
  //   flyTo(note.longitude, note.latitude, 16.5);
  //   popup.remove();
  //   openMarkerOfNoteWithoutAdd(
  //     note,
  //     markersNotes,
  //     // eventsOnClickNotes
  //   );
  // };

  // const setSideBarStatus = (status: boolean) => {
  //   setCommentVisible(status);
  //   setOpen(status);
  // };

  // const addToMap = () => {
  //   if (markersNotes.length > 0) {
  //     markersNotes.forEach((marker: any) => {
  //       marker.marker._popup.remove();
  //     });
  //   }
  //   canAdd.value = true;
  // };

  // const handleDeleteNote = (note: any) => {
  //   let noteId = note.newnotes_id;
  //   deleteNote(noteId);
  //   markerNote.remove();
  //   popup.remove();
  // };

  // useEffect(() => {
  //   if (commentVisible && markersNotes.length > 0) {
  //     markersNotes.forEach((marker: any) => {
  //       marker.marker.addTo(map.map);
  //     });
  //   } else if (markersNotes.length > 0) {
  //     markersNotes.forEach((marker: any) => {
  //       marker.marker.remove();
  //     });
  //   }
  // }, [markersNotes, commentVisible]);

  // useEffect(() => {
  //   let totalmarkers: any = [];
  //   if (map) {
  //     markersNotes?.forEach((marker: any) => {
  //       marker.marker.remove();
  //     });
  //     notes?.forEach((note: any) => {
  //       let colorOfMarker = note?.color?.color ? note?.color?.color : '#F6BE0F';
  //       const doc = document.createElement('div');
  //       doc.className = 'marker-note';
  //       doc.style.backgroundColor = colorOfMarker;
  //       const newmarker = new mapboxgl.Marker(doc);
  //       const html = notesPopup(setNote, handleDeleteNote, note);
  //       let newpopup = new mapboxgl.Popup({
  //         closeButton: false,
  //         offset: {
  //           top: [0, 10],
  //           bottom: [0, -10],
  //           left: [10, 0],
  //           right: [-10, 0],
  //         },
  //       });
  //       newpopup.on('close', (e: any) => {
  //         momentaryMarker.remove();
  //       });
  //       newmarker.setPopup(newpopup);
  //       newpopup.setDOMContent(html);
  //       newmarker.setLngLat([note?.longitude, note?.latitude]).setPopup(newpopup);
  //       totalmarkers.push({ marker: newmarker, note: note });
  //     });
  //     setMarkerNotes(totalmarkers);
  //   }
  // }, [notes]);

  // useEffect(() => {
  //   commentAvailable = commentVisible;
  //   setOpen(commentVisible);
  //   if (map) {
  //     setTimeout(() => {
  //       map?.map.resize();
  //     }, 2000);
  //   }
  //   if (!commentVisible) {
  //     markerNote.remove();
  //     popup.remove();
  //   }
  // }, [commentVisible]);

  return (
    <div className="map createmap" id='create-map'>
      {/* {commentVisible && (
      <SideBarComment
          visible={commentVisible}
          setVisible={setSideBarStatus}
          flyTo={flyTo}
          openEditNote={openEditNote}
          addToMap={addToMap}
        />
      )} */}
      <ModalLayers type={type} selectCheckboxes={selectCheckboxes} visible={visible} setVisible={setVisible} />
      {showIntersectionError && (
        <Modal
          className="detailed-version detailed-upload-save"
          centered
          visible={showIntersectionError}
          onCancel={() => setShowIntersectionError(false)}
        >
          <div className="detailed">
            <Row className="detailed-h" gutter={[16, 8]}>
              <Col xs={{ span: 44 }} lg={{ span: 20 }}>
                <h1 style={{ marginTop: '15px' }}>Geometry Error</h1>
              </Col>
              <Col xs={{ span: 4 }} lg={{ span: 4 }} style={{ textAlign: 'end' }}>
                <Button className="btn-transparent" onClick={() => setShowIntersectionError(false)}>
                  <img src="/Icons/icon-62.svg" alt="" height="15px" />
                </Button>
              </Col>
            </Row>
            <Row className="detailed-h" gutter={[16, 8]} style={{ backgroundColor: 'white' }}>
              <Col xs={{ span: 48 }} lg={{ span: 24 }} style={{ color: '#11093c' }}>
                Please draw your project geometry over the nearest blue stream line in order to proceed. You may
                describe the actual location of your project in the 'Project Information' section if a blue stream line
                does not exist in your project area.
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12, offset: 12 }} style={{ color: '#11093c', textAlign: 'end' }}>
                <button
                  className="btn-purple"
                  style={{ width: '95%', height: 'auto', padding: '10px' }}
                  onClick={() => setShowIntersectionError(false)}
                >
                  Review your geometry
                </button>
              </Col>
            </Row>
          </div>
        </Modal>
      )}
      <div className="map">
        {isProblemActive === true ? (
          <div className="legendProblemTypemap">
            <h5>
              Problem Type
              <Popover
                content={
                  <div className="popoveer-00">
                    <p className="dark-text">Problem Types</p>
                    <p>
                      <span className="dark-text">Flood Hazard </span> Problems related to existing flood or fluvial
                      hazard to life and property.
                    </p>
                    <p>
                      <span className="dark-text">Stream Condition </span> Problems related to the physical,
                      environmental, and social function or condition of the stream in an urban context.
                    </p>
                    <p>
                      <span className="dark-text">Watershed Change </span> Problems related to flood waters that may
                      pose safety or functional concerns related to people, property, and the environment due to
                      changing watershed conditions (land use, topography, regional detention, etc).
                    </p>
                  </div>
                }
              >
                <InfoCircleOutlined className="iconinfocircle" />
              </Popover>{' '}
            </h5>
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
              Stream Condition
            </div>
          </div>
        ) : (
          ''
        )}
        <div id="map3"></div>
        <div className="m-head">
          <MapDropdownLayers
            selectCheckboxes={selectCheckboxes}
            selectedLayers={selectedLayersCP}
            removePopup={removePopup}
            // isWR={true}
          />
          <AutoComplete
            dropdownMatchSelectWidth={true}
            className="autocomplete-mhead"
            options={mapSearch.length > 0 ? [...mapSearch.map(renderOption), {}] : mapSearch.map(renderOption)}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={keyword}
            listHeight={windowWidth > 2554 ? (windowWidth > 3799 ? 500 : 300) : 256}
          >
            <Input.Search size="large" placeholder="Stream or Location" className="style-input" />
          </AutoComplete>
        </div>
        <div className='show-filter'>
          <Button className='btn-show-filter' onClick={()=>{setVisible(!visible)}}>Show suggested layers</Button>
        </div>
      </div>
      {loading && <LoadingViewOverall></LoadingViewOverall>}
      <div className="measure-button">
          {!!!measuringState && (
            <Button className='btn-measurestyle' onClick={() => setMeasuringState(true)}>
              <img className="img-icon" alt="" />
            </Button>
          )}
          {!!measuringState && (
            <div className="measurecontainer">
              <div id={'measure-block'} className="measure-block" onClick={() => setMeasuringState(false)}>
                <div className="headmap">
                  <h4>Measure distances and areas</h4>
                  <button className="close-measure-button" onClick={() => setIsMeasuring(false)}></button>
                </div>
                <hr></hr>
                <div className="bodymap" onClick={() => setIsMeasuring(true)}>
                  <b>
                    <img className="img-measure-00" src="/Icons/fi_play-circle.svg" alt="Create new measurement"></img>
                    Create a new measurement
                  </b>
                </div>
              </div>
            </div>
          )}
          {!!measuringState2 && (
            <div className="measurecontainer">
              <div id={'measure-block'} className="measure-block">
                <div className="headmap">
                  <h4>Measure distances and areas</h4>
                  <button className="close-measure-button" onClick={() => setIsMeasuring(false)}></button>
                </div>
                <hr></hr>
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
                <hr ></hr>
                <p className="paragraph">
                  {!isdrawingmeasure && (
                    <span className="button-c nodrawingmeasuere" onClick={() => setIsMeasuring(false)}>
                      <a>
                        <img className="img-measure-05" alt="Cancel"></img>
                        <b>Cancel</b>
                      </a>
                    </span>
                  )}
                  {isdrawingmeasure && (
                    <span className="button-c drawingmeasuere" onClick={() => finishMeasure('line')}>
                      <a>
                        <img className="img-measure-png-01" src="/Icons/icon-line.png" alt="Finish Line"></img>
                        <b>Finish Line</b>
                      </a>
                    </span>
                  )}
                  {isdrawingmeasure && (
                    <span className="button-c drawingmeasuere" onClick={() => finishMeasure('polygon')}>
                      <a>
                        <img className="img-measure-png-02" src="/Icons/icon-polygon.png" alt="Finish Polygon"></img>
                        <b>Finish Polygon</b>
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      <SideMenuTools map={map?.map} setCommentVisible={setCommentVisible} mapService={mapService} isMobile={false} typeMap='CREATE' />
    </div>
  );
};

export default CreateProjectMap;
