import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import {
  measureFunction,
  addPopupAndListeners,
  addPopupServiceCountyMunicipality,
  addPopupsOnClick,
} from 'routes/map/components/MapFunctionsPopup';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { MapProps, ObjectLayerType, LayerStylesType } from 'Classes/MapTypes';
import {
  SWITCHES_MAP,
  MAP_DROPDOWN_ITEMS,
  MAPBOX_TOKEN,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENT_LAYERS,
  STREAMS_FILTERS,
  FILTER_PROBLEMS_TRIGGER,
  FILTER_PROJECTS_TRIGGER,
  MHFD_PROJECTS,
  NEARMAP_TOKEN,
  MENU_OPTIONS,
  STREAMS_POINT,
  PROPSPROBLEMTABLES,
  MAPTYPES,
  initFilterProblems,
  WINDOW_WIDTH,
  PROJECTS_DRAFT_MAP_STYLES,
  PROJECTS_DRAFT,
  MAP_TAB
} from 'constants/constants';
import {
  tileStyles,
  NEARMAP_STYLE,
} from 'constants/mapStyles';
import { addMapGeocoder, getMapBoundingBoxTrimmed } from 'utils/mapUtils';
import { Input, AutoComplete } from 'antd';
import { useMapState, useMapDispatch } from 'hook/mapHook';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { handleAbortError, setOpacityLayer } from 'store/actions/mapActions';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import MapService from 'Components/Map/MapService';
import { useNoteDispatch, useNotesState } from 'hook/notesHook';
import { useProfileState } from 'hook/profileHook';
import { addGeojsonSource, removeGeojsonCluster } from 'routes/map/components/MapFunctionsCluster';
import {
  flytoBoundsCoor,
  polyMask,
  depth,
  waitingInterval,
  applyMeasuresLayer
} from 'routes/map/components/MapFunctionsUtilities';
import { GlobalMapHook } from 'utils/globalMapHook';
import MobileMenu from 'routes/map/components/MobileMenu';
import SideMenuTools from 'routes/map/components/SideMenuTools';
import { notesPopup } from 'routes/map/components/MapGetters';
import { hovereableLayers } from '../constants/layout.constants';
import {
  createNoteWithElem,
  editNoteWithElem,
  handleColor,
  openMarkerOfNoteWithoutAdd,
} from 'routes/map/components/MapFunctionsNotes';
import useMapResize from 'hook/custom/useMapResize';
import useIsMobile from 'hook/custom/useIsMobile';
import { areObjectsDifferent } from 'utils/comparators';
import MapDropdownLayers from './MapDropdownLayers';
import { useFilterContext } from 'utils/filterContext';
import { getToken, postDataAsyn } from 'Config/datasets';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import SideBarComment from 'Components/Map/SideBarComment';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';
import DetailModal from 'routes/detail-page/components/DetailModal';
import MobilePopup from 'Components/MobilePopup/MobilePopup';

let map: any = null;
let searchMarker = new mapboxgl.Marker({ color: '#F4C754', scale: 0.7 });
let searchPopup = new mapboxgl.Popup({ closeButton: true });
let popup = new mapboxgl.Popup({ closeButton: true });
let isEdit = false;
let newNote: any = undefined;
let currentNote: any = undefined;
type LayersType = string | ObjectLayerType;
let coordX = -1;
let coordY = -1;
const factorKMToMiles = 0.621371;
const factorKMtoFeet = 3280.8;
const factorm2toacre = 0.00024710538146717;
let itMoved = false;
let globalMapId: string | null = null;

const docNote = document.createElement('div');
docNote.className = 'marker-note';
const markerNote = new mapboxgl.Marker(docNote);
let momentaryMarker = new mapboxgl.Marker({ color: '#FFFFFF', scale: 0.7 });
let isMeasuring = false;
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
let canAdd = { value: false };
let isProblemActive = true;

let commentAvailable = false;

const Map = ({ leftWidth, commentVisible, setCommentVisible }: MapProps) => {
  const {
    updateSelectedLayers,
    setFilterCoordinates,
    existDetailedPageProblem,
    setSelectedOnMap,
    mapSearchQuery,
    setBoundMap,
    getParamFilterComponents,
    getParamFilterComponentsDefaultBounds,
    getParamFilterProblems,
    getParamFilterProjects,
    setCoordinatesJurisdiction,
    setSpinMapLoaded,
    setSelectedPopup,
    getProjectsFilteredIds,
    getDetailedPageProject,
    getGalleryProblems,
  } = useMapDispatch();
  const {
    toggleModalFilter,
    tabCards,
    filterTabNumber,
    coordinatesJurisdiction,
    opacityLayer,
    bboxComponents,
    autocomplete,
    currentPopup,
    layers: layerFilters,
    selectedLayers,
    filterProblemOptions,
    filterProjectOptions,
    highlighted,
    filterComponentOptions,
    paramFilters: { components: paramComponents, componentsNoBounds: componentsNobounds },
    filterProblems,
    filterComponents,
    mapSearch,
    applyFilter,
    zoomProblemOrProject: zoom,
    projectsids,
    filterProjects,
    tabActiveNavbar
  } = useMapState();
  const { tabKey } = useRequestState();
  const { setCompleteProjectData, setShowModalProject } = useRequestDispatch();
  const { boardProjects, zoomProject } = useProjectState();
  const { setZoomGeom } = useProjectDispatch();
  const { mhfdmanagers } = useFilterContext();
  let geocoderRef = useRef<HTMLDivElement>(null);
  const divMapRef = useRef<HTMLDivElement>(null);
  const dropdownItems = { default: 1, items: MAP_DROPDOWN_ITEMS };
  const { notes, availableColors } = useNotesState();
  const { getNotes, createNote, editNote, setOpen, deleteNote } = useNoteDispatch();
  const {
    setComponentsFromMap,
    getAllComponentsByProblemId,
    getComponentGeom,
    getZoomGeomProblem,
    getZoomGeomComp
  } = useProjectDispatch();
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  const [visibleCreateProject, setVisibleCreateProject] = useState(false);
  const [problemid, setProblemId] = useState<any>(undefined);
  const [problemClusterGeojson, setProblemClusterGeojson] = useState(undefined);
  const [zoomValue, setZoomValue] = useState(0);
  const [groupedProjectIdsType, setGroupedProjectIdsType] = useState<any>([]);
  const { addHistoric, getCurrent } = GlobalMapHook();
  const [markersNotes, setMarkerNotes] = useState([]);
  const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
  const { userInformation, groupOrganization } = useProfileState();
  const [visible, setVisible] = useState(false);
  const [zoomEndCounter, setZoomEndCounter] = useState(0);
  const [dragEndCounter, setDragEndCounter] = useState(0);
  const [allLayers, setAllLayers] = useState<any[]>([]);
  const [mapService] = useState<MapService>(new MapService());
  const [idsBoardProjects, setIdsBoardProjects] = useState<any>([]);
  const [groupedIdsBoardProjects, setGroupedIdsBoardProjects] = useState<any>([]);
  const coorBounds: any[][] = [];
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
  const [showDefault, setShowDefault] = useState(false);
  const isMobile = useIsMobile();

  const setNote = useCallback(
    (event: any, note?: any) => {
      const getText = event?.target?.value ? event.target.value : event;
      const getColorId = handleColor(availableColors);
      if (!note) {
        const note = {
          color_id: getColorId,
          note_text: getText,
          latitude: popup.getLngLat().lat,
          longitude: popup.getLngLat().lng,
        };
        newNote = note;
        return;
      } else {
        const noteEdit = {
          newnotes_id: note.newnotes_id,
          color_id: getColorId,
          note_text: getText,
          latitude: note.latitude,
          longitude: note.longitude,
        };
        currentNote = noteEdit;
        isEdit = true;
        return;
      }
    },
    [availableColors],
  );

  const handleDeleteNote = (note: any) => {
    let noteId = note.newnotes_id;
    deleteNote(noteId);
    markerNote.remove();
    popup.remove();
  };

  const updateLayerSource = (key: string, tiles: Array<string>) => {
    if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      mapService.addLayersSource(key, tiles, addMapListeners);
      mapService.addTilesLayers(key, addMapListeners);
    } else if (map.getSource(key)) {
      map.getSource(key).setTiles(tiles);
      mapService.addTilesLayers(key, addMapListeners);
    }
  };

  const addGeojsonLayer = (geojsonData: any) => {
    if (map?.map.getLayer('project_board_layer')) {
      map?.map.removeLayer('project_board_layer');
    }
    if (map?.map.getSource('project_board')) {
      map?.map.removeSource('project_board');
    }
    map?.map.addSource('project_board', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: geojsonData,
    });

    map?.map.addLayer({
      id: 'project_board_layer',
      type: 'symbol',
      source: 'project_board',
      layout: {
        'text-field': ['to-string', ['get', 'project_name']],
        'icon-ignore-placement': true,
      },
      paint: {
        'text-color': [
          'match',
          ['get', 'project_status'],
          [4],
          '#139660', //INITIATED  verde
          [2],
          '#9309EA', //REQUESTED violeta
          [3],
          '#497BF3', // APPROVED azul
          [8],
          '#FF0000', // CANCELLED   rojo
          [6],
          '#06242D', //COMPLETED  casi negro
          [5],
          '#416EDA', // ACTIVE   AZUL
          [7],
          '#A4BCF8', //INACTIVE   celeste
          [9],
          '#DAE4FC', //CLOSED  casi blanco
          [10],
          '#ECF1FD', //CLOSED OUT casi blanco
          '#b36304',
        ],
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0,

        'text-opacity': ['step', ['zoom'], 0.9, 14, 1, 22, 1],
      },
    });
  };

  useEffect(() => {
    if (zoomProject && (zoomProject.projectid || zoomProject.project_id)) {
      const projectid = zoomProject.project_id ? zoomProject.project_id : zoomProject.projectid;
      datasets.getData(`${SERVER.URL_BASE}/board/bbox/${projectid}`).then(
        (r: any) => {
          if (r.bbox) {
            let BBoxPolygon = JSON.parse(r.bbox);
            let bboxBounds = turf.bbox(BBoxPolygon);
            if (map) {
              map.fitBounds(bboxBounds, { padding: 140 });
            }
          }
        },
        (e: any) => { },
      );
    }
  }, [zoomProject]);

  useEffect(() => {
    const user = userInformation;
    if (user?.polygon && user?.polygon[0]) {
      let myPolygon: any = [];
      const depthPolygon = depth(userInformation.polygon);
      if (depthPolygon === 4) {
        // MULTIPOLYGON
        for (let index = 0; index < userInformation.polygon.length; index++) {
          const geo = userInformation.polygon[index];
          if (geo[0].hasOwnProperty('length')) {
            for (let index2 = 0; index2 < geo.length; index2++) {
              const geo2 = geo[index2];
              myPolygon.push(...geo2);
            }
          } else {
            myPolygon.push([...geo]);
          }
        }
      } else if (depthPolygon === 2) {
        myPolygon = userInformation.polygon;
      } else {
        // POLYGON
        myPolygon = userInformation.polygon[0];
      }

      let bottomLongitude = myPolygon[0][0];
      let bottomLatitude = myPolygon[0][1];
      let topLongitude = myPolygon[0][0];
      let topLatitude = myPolygon[0][1];
      for (let index = 0; index < myPolygon.length; index++) {
        const element = myPolygon[index];
        if (bottomLongitude > element[0]) {
          bottomLongitude = element[0];
        }
        if (topLongitude < element[0]) {
          topLongitude = element[0];
        }
        if (bottomLatitude > element[1]) {
          bottomLatitude = element[1];
        }
        if (topLatitude < element[1]) {
          topLatitude = element[1];
        }
      }
      bottomLongitude -= 0.015;
      topLongitude += 0.015;
      coorBounds.push([bottomLongitude, bottomLatitude]);
      coorBounds.push([topLongitude, topLatitude]);
    }
  }, [userInformation.polygon]);

  const removeLayerMask = (id: any) => {
    map.removeLayer(id + 'MASK');
  };

  const resetBoardIds = () => {
    setIdsBoardProjects([]);
    setGroupedIdsBoardProjects([]);
  };

  useEffect(() => {
    mapService.autocomplete = autocomplete;
  }, [autocomplete]);

  useEffect(() => {
    commentAvailable = commentVisible;
    setOpen(commentVisible);
    if (map) {
      setTimeout(() => {
        map.resize();
      }, 2000);
    }
    if (!commentVisible) {
      markerNote.remove();
      popup.remove();
    }
  }, [commentVisible]);

  useEffect(() => {
    if (map) {
      if (highlighted.type) {
        showHighlighted(highlighted.type, highlighted.value);
      } else {
        hideHighlighted();
      }
    }
  }, [highlighted]);

  useEffect(() => {
    if (data.problemid || data.cartoid) {
      setVisible(true);
    }
  }, [data]);

  
  useEffect(() => {
    popup.remove();
    if (map && tabActiveNavbar === MAP_TAB) {
      resetBoardIds();
    }
  }, [tabActiveNavbar]);
  
  useEffect(() => {
    popup.remove();
    if (boardProjects && !boardProjects.ids) {
      setIdsBoardProjects(boardProjects);
    }
    if (boardProjects) {
      setIdsBoardProjects(boardProjects.ids);
      setGroupedIdsBoardProjects(boardProjects.groupedIds);
    }
    if (map) {
      map.isStyleLoaded(() => {
        addGeojsonLayer(boardProjects.geojsonData);
      });
    }
  }, [boardProjects]);

  useEffect(() => {
    let filterProjectsDraft = { ...filterProjects };
    filterProjectsDraft.projecttype = '';
    filterProjectsDraft.status = '';
    // if (idsBoardProjects.length) {
    const [intervalId, promise] = waitingInterval(map);
    promise.then(() => {
      let requestData = { table: PROJECTS_DRAFT_MAP_STYLES.tiles[0] };
      const promises: Promise<any>[] = [];
      promises.push(postDataAsyn(SERVER.MAP_TABLES, requestData, getToken()));
      Promise.all(promises).then(tiles => {
        if (tiles.length > 0) {
          updateLayerSource(PROJECTS_DRAFT + 'draft', tiles[0]);
          showLayers(PROJECTS_DRAFT + 'draft');
        }
      });
    });
    return () => {
      clearInterval(intervalId);
    };
    // }
  }, [idsBoardProjects]);
  
  useEffect(() => {
    let totalmarkers: any = [];
    if (map) {
      markersNotes?.forEach((marker: any) => {
        marker.marker.remove();
      });
      notes?.forEach((note: any) => {
        let colorOfMarker = note?.color?.color ? note?.color?.color : '#F6BE0F';
        const doc = document.createElement('div');
        doc.className = 'marker-note';
        doc.style.backgroundColor = colorOfMarker;
        const newmarker = new mapboxgl.Marker(doc);
        const html = notesPopup(setNote, handleDeleteNote, note);
        let newpopup = new mapboxgl.Popup({
          closeButton: false,
          offset: {
            top: [0, 10],
            bottom: [0, -10],
            left: [10, 0],
            right: [-10, 0],
          },
        });
        newpopup.on('close', (e: any) => {
          momentaryMarker.remove();
        });
        newmarker.setPopup(newpopup);
        newpopup.setDOMContent(html);
        newmarker.setLngLat([note?.longitude, note?.latitude]).setPopup(newpopup);
        totalmarkers.push({ marker: newmarker, note: note });
      });
      setMarkerNotes(totalmarkers);
    }
  }, [notes]);

  useEffect(() => {
    if (commentVisible && markersNotes.length > 0) {
      markersNotes.forEach((marker: any) => {
        marker.marker.addTo(map);
      });
    } else if (markersNotes.length > 0) {
      markersNotes.forEach((marker: any) => {
        marker.marker.remove();
      });
    }
  }, [markersNotes, commentVisible]);

  const addFunction = () => {
    let mask;
    if (coordinatesJurisdiction?.length > 0) {
      const DEPTH = depth(coordinatesJurisdiction);
      if (DEPTH == 4) {
        mask = turf.multiPolygon(coordinatesJurisdiction);
      } else {
        mask = turf.polygon(coordinatesJurisdiction);
      }
      let misbounds =
        -111.10771487514684 + ',' + 34.094858978187546 + ',' + -98.58537218284262 + ',' + 45.470609601267824;
      var arrayBounds = misbounds.split(',');
      let poly = polyMask(mask, arrayBounds);
      setOpacityLayer(true);
      if (map.getLayer('mask')) {
        map.removeLayer('mask');
      }
      if (map.getSource('mask')) {
        map.getSource('mask').setData(poly);
      } else {
        map.addSource('mask', {
          type: 'geojson',
          data: poly,
        });
      }
      if (!map.getLayer('mask')) {
        map.addLayer({
          id: 'mask',
          source: 'mask',
          type: 'fill',
          paint: {
            'fill-color': 'black',
            'fill-opacity': 0.8,
          },
        });
      }
      if (!map.getLayer('border')) {
        map.addLayer({
          id: 'border',
          source: 'mask',
          type: 'line',
          paint: {
            'line-color': '#28c499',
            'line-width': 1,
          },
        });
      }
      map.moveLayer('border');
      setTimeout(() => {
        if (map.getLayer('mask')) {
          map.removeLayer('mask');
        }
        if (map.getLayer('border')) {
          map.removeLayer('border');
        }
      }, 4000);
    } else {
      if (opacityLayer && map.loaded() && map.getLayer('mask')) {
        map.removeLayer('mask');
        map.removeSource('mask');
      }
    }
  };

  useEffect(() => {
    const [intervalId, promise] = waitingInterval(map);
    promise.then(() => {
      addFunction();
    });
    return () => {
      clearInterval(intervalId);
    };
  }, [coordinatesJurisdiction]);

  useEffect(() => {
    applyFilters(PROBLEMS_TRIGGER, filterProblems);
  }, [filterProblems, zoomEndCounter, dragEndCounter]);
  useEffect(() => {
    applyFilters(MHFD_PROJECTS, filterProjectOptions);
  }, [groupedProjectIdsType, zoomEndCounter, dragEndCounter]);

  useEffect(() => {
    for (const component of COMPONENT_LAYERS.tiles) {
      applyFilters(component, filterComponentOptions);
    }
  }, [filterComponentOptions, paramComponents, componentsNobounds]);

  useEffect(() => {
    getNotes();
    (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: divMapRef.current as HTMLElement,
      dragRotate: true,
      touchZoomRotate: true,
      style: dropdownItems.items[dropdownItems.default].style,
      center: [userInformation.coordinates.longitude, userInformation.coordinates.latitude],
      zoom: 9,
      attributionControl: false,
    });
    mapService.map = map;
    mapService.loadImages();
    map.once('load', () => {
      flytoBoundsCoor(
        getCurrent,
        userInformation,
        globalMapId,
        coorBounds,
        map,
        groupOrganization,
        setCoordinatesJurisdiction,
      );
    });

    map.addControl(
      new mapboxgl.ScaleControl({
        unit: 'imperial',
      }),
      'bottom-right',
    );
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }));
    addMapGeocoder(map, geocoderRef);

    let value = 0;
    let _ = 0;
    let __ = 1;
    const mapOnRenderFn = () => {
      if (!globalMapId && itMoved) {
        const center = [map.getCenter().lng, map.getCenter().lat];
        const bbox = [
          map.getBounds()._sw.lng,
          map.getBounds()._sw.lat,
          map.getBounds()._ne.lng,
          map.getBounds()._ne.lat,
        ];
        addHistoric({ center, bbox });
      }
      globalMapId = null;
      itMoved = false;

    };
    const zoomEndFn = () => {
      mapService.hideOpacity();
      setZoomEndCounter(_++);
      setOpacityLayer(false);
      value += 1;
      if (value >= 2) {
        setBoundMap(getMapBoundingBoxTrimmed(map));
      }
    };
    const dragEndFn = () => {
      mapService.hideOpacity();
      setDragEndCounter(__++);
      setOpacityLayer(false);
      setBoundMap(getMapBoundingBoxTrimmed(map));
      itMoved = true;
    };
    const updateZoom = () => {
      const zoom = map.getZoom().toFixed(2);
      setZoomValue(zoom);
    };
    map.on('render', mapOnRenderFn);
    map.on('zoomend', zoomEndFn);
    map.on('dragend', dragEndFn);
    map.on('load', updateZoom);
    map.on('move', updateZoom);
    getProjectsFilteredIds();
    return () => {
      map.off('dragend', dragEndFn);
      map.off('load', updateZoom);
      map.off('move', updateZoom);
      map.off('zoomend', zoomEndFn);
      map.off('render', mapOnRenderFn);
    };
  }, []);

  useEffect(() => {
    const bounds = map.getBounds();
    setZoomGeom(bounds);
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
        setKeyword('');
      }
    }
    const boundingBox = getMapBoundingBoxTrimmed(map);
    setBoundMap(boundingBox);
    let defaultBounds = `${-105.3236683149282},${39.274174328991904},${-104.48895750946532},${40.26156304805423}`;
    if (toggleModalFilter) {
      // if tab of filters is open
      if (filterTabNumber === PROJECTS_TRIGGER) {
        setFilterCoordinates(applyFilter ? boundingBox : defaultBounds, tabCards);
        getParamFilterProjects(applyFilter ? boundingBox : defaultBounds, filterProjectOptions);
      } else if (filterTabNumber === PROBLEMS_TRIGGER) {
        setFilterCoordinates(applyFilter ? boundingBox : defaultBounds, tabCards);
        getGalleryProblems();
        getParamFilterProblems(applyFilter ? boundingBox : defaultBounds, filterProblemOptions);
      } else {
        getParamFilterComponents(applyFilter ? boundingBox : defaultBounds, filterComponentOptions);
      }
    } else {
      setFilterCoordinates(applyFilter ? boundingBox : defaultBounds, tabCards);
    }
  }, [applyFilter, zoomEndCounter, dragEndCounter, filterTabNumber]);
  useEffect(() => {
    getParamFilterComponentsDefaultBounds(filterComponentOptions);
  }, [filterComponentOptions]);
  useEffect(() => {
    if (zoom?.length > 0) {
      map.fitBounds([zoom[0], zoom[2]], { padding: 100 });
    }
  }, [zoom]);

  useEffect(() => {
    let mask;
    if (groupOrganization[0] && map.loaded()) {
      let coorMHFD = groupOrganization[0].coordinates.coordinates;
      const DEPTH = depth(coorMHFD);
      if (DEPTH == 4) {
        mask = turf.multiPolygon(coorMHFD);
      } else {
        mask = turf.polygon(coorMHFD);
      }
      // PREVIOUS SQUARE OF MHFD
      // let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
      // LARGER BECAUSE SOME COUNTIES AND SERVICE AREAS ARE BIGGER
      let misbounds =
        -111.10771487514684 + ',' + 34.094858978187546 + ',' + -98.58537218284262 + ',' + 45.470609601267824;
      var arrayBounds = misbounds.split(',');
      let poly = polyMask(mask, arrayBounds);
      setOpacityLayer(true);
      if (map.getLayer('maskInit')) {
        map.removeLayer('maskInit');
      }
      if (map.getSource('maskInit')) {
        map.getSource('maskInit').setData(poly);
      } else {
        map.addSource('maskInit', {
          type: 'geojson',
          data: poly,
        });
      }
      if (!map.getLayer('maskInit')) {
        map.addLayer({
          id: 'maskInit',
          source: 'maskInit',
          type: 'fill',
          paint: {
            'fill-color': 'black',
            'fill-opacity': 0.8,
          },
        });
      }
      if (!map.getLayer('borderInit')) {
        map.addLayer({
          id: 'borderInit',
          source: 'maskInit',
          type: 'line',
          paint: {
            'line-color': '#28c499',
            'line-width': 1,
          },
        });
      }
      map.moveLayer('borderInit');
    }
  }, [groupOrganization]);

  useEffect(() => {
    if (coorBounds && (coorBounds.length === 0 || coorBounds[0][0])) {
      flytoBoundsCoor(
        getCurrent,
        userInformation,
        globalMapId,
        coorBounds,
        map,
        groupOrganization,
        setCoordinatesJurisdiction,
      );
    }
  }, [userInformation.polygon, groupOrganization]);

  useEffect(() => {
    if (currentPopup !== -1 && activeMobilePopups.length > currentPopup) {
      highlithOnTap(activeMobilePopups[currentPopup]);
    } else {
      hideHighlighted();
    }
  }, [currentPopup, activeMobilePopups]);

  useMapResize(leftWidth, map);

  const showLayers = (key: string) => {
    const styles = { ...tileStyles as any };
    styles[key].forEach((_: LayerStylesType, index: number) => {
      const currentLayer: any = map.getLayer(key + '_' + index);
      if (currentLayer) {
        if (key === PROJECTS_DRAFT + 'draft') {
          let allFilters: any = ['in', ['get', 'projectid'], ['literal', []]];
          const statusLayer = currentLayer?.metadata?.project_status;
          const typeLayer = currentLayer?.metadata?.project_type || currentLayer?.metadata?.projecttype;
          let verifiedStatus= 5;
          typeLayer?.forEach((type: any) => {
            if (statusLayer.length > 0) {
              statusLayer.forEach((currentStatus: any) => {
                verifiedStatus = currentStatus;
                switch (tabKey) {
                  case 'Capital':
                    verifiedStatus = 5;
                    break;
                  case 'Maintenance':
                    verifiedStatus = 8;
                    break;
                  case 'Study':
                    verifiedStatus = 1;
                    break;
                  case 'Acquisition':
                    verifiedStatus = 13;
                    break;
                  case 'R&D':
                    verifiedStatus = 15;
                    break;
                  default:
                    break;
                }
              });
            }
          });
          const undefinedValues = groupedIdsBoardProjects?.undefined?.undefined ?? [];
          const newValues = [...(groupedIdsBoardProjects ? groupedIdsBoardProjects[1]?.[verifiedStatus] ?? []: []), ...undefinedValues];
          const result = {
            ...groupedIdsBoardProjects,
            1: {
              ...(groupedIdsBoardProjects?groupedIdsBoardProjects[1]: []),
              [Number(verifiedStatus)]: newValues,
            },
          };
          // delete result.undefined;
          let idsToFilter: any = [];
          typeLayer?.forEach((type: any) => {
            if (statusLayer.length > 0) {
              statusLayer.forEach((currentStatus: any) => {
                let idsCurrent = result[currentStatus];
                if (idsCurrent && idsCurrent[type]?.length > 0) {
                  idsToFilter = [...idsToFilter, ...result[currentStatus][type]];
                }
              });
            }
          });

          allFilters = ['all', ['in', ['get', 'projectid'], ['literal', [...idsToFilter]]]];
          map.setFilter(key + '_' + index, allFilters);
          map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        } else {
          map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        }
        if (COMPONENT_LAYERS.tiles.includes(key) && filterComponents) {
          mapService.showSelectedComponents(filterComponents.component_type.split(','));
        }
        if (key === PROBLEMS_TRIGGER) {
          isProblemActive = true;
        }
      }
    });
    if (key === STREAMS_FILTERS) {
      styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
        if (map && map.getLayer(STREAMS_POINT + '_' + index)) {
          map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'visible');
        }
      });
    }
  };

  useEffect(() => {
    const [intervalId, promise] = waitingInterval(map);
    promise.then(() => {
      applySkyMapLayer();
      mapService.applyMapLayers(layerFilters, selectedLayers, showLayers, applyFilters, getProjectsFilteredIds, filterProblems, filterProjectOptions, addMapListeners);
      if (areObjectsDifferent(initFilterProblems, filterProblems)) {
        applyProblemClusterLayer();
      }
      setSpinMapLoaded(false);
      applyNearMapLayer();
      applyMeasuresLayer(map, geojsonMeasures, geojsonMeasuresSaved);
      const removedLayers = SWITCHES_MAP.filter((layerElement: any) => !selectedLayers.includes(layerElement));
      removedLayers.forEach((layerExcluded: any) => {
        if (typeof layerExcluded === 'object') {
          layerExcluded.tiles.forEach((subKey: string) => {
            hideLayerAfterRender(subKey);
          });
        } else {
          hideLayerAfterRender(layerExcluded);
        }
      });
    });
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedLayers]);

  useEffect(() => {
    if (map.getLayer('mapboxArcs')) {
      map.removeLayer('mapboxArcs');
    }
    if (map.getLayer('arcs')) {
      map.removeLayer('arcs');
    }
    if (bboxComponents.centroids && bboxComponents.centroids.length === 0) {
      setTimeout(() => {
        map.setPitch(0);
      }, 3000);
    } else {
      const SOURCE_COLOR = [189, 56, 68];
      const TARGET_COLOR = [13, 87, 73];
      const CIAN_SOLID = [118, 239, 213];
      const RED_SOLID = [255, 60, 60];
      let scatterData: any[] = bboxComponents.centroids.map((c: any) => {
        return {
          position: c.centroid,
          name: c.component,
          total: 1,
          color: c.component === 'self' ? SOURCE_COLOR : TARGET_COLOR,
        };
      });
      let arcs: any[] = [];

      for (let i = 1; i < bboxComponents.centroids.length; i++) {
        arcs.push({
          source: bboxComponents.centroids[0].centroid,
          target: bboxComponents.centroids[i].centroid,
          value: bboxComponents.centroids[i].arcWidth,
          colorArc: bboxComponents.centroids[i].component == 'detention_facilities' ? RED_SOLID : CIAN_SOLID,
        });
      }
      let mapboxArcsLayer = new MapboxLayer({
        type: ScatterplotLayer,
        id: 'mapboxArcs',
        data: scatterData,
        opacity: 1,
        pickable: true,
        getRadius: (d: any) => {
          if (d.name === 'self') {
            return 2;
          } else {
            return 1;
          }
        },
        getColor: (d: any) => d.color,
      });

      let arcsLayer = new MapboxLayer({
        type: ArcLayer,
        id: 'arcs',
        data: arcs,
        brushRadius: 100000,
        getStrokeWidth: (d: any) => 4,
        opacity: 1,
        getSourcePosition: (d: any) => d.source,
        getTargetPosition: (d: any) => d.target,
        getWidth: (d: any) => d.value * 2,
        getHeight: 0.7,
        getSourceColor: (d: any) => d.colorArc,
        getTargetColor: (d: any) => d.colorArc,
      });
      map.setPitch(70);
      map.addLayer(mapboxArcsLayer);
      map.addLayer(arcsLayer);
    }
  }, [bboxComponents]);

  const removePopup = () => {
    popup.remove();
  };

  const applySkyMapLayer = () => {
    if (!map.getLayer('sky')) {
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-halo-color': 'blue',
          'sky-atmosphere-sun': [45.0, 45.0],
          'sky-atmosphere-sun-intensity': 5,
        },
      });
    }
  };

  const applyNearMapLayer = () => {
    if (!map.getSource('raster-tiles')) {
      map.addSource('raster-tiles', {
        type: 'raster',
        tileSize: 128,
        tiles: [`https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`],
      });
      map.addLayer(NEARMAP_STYLE, 'aerialway');
    }
  };

  const applyProblemClusterLayer = () => {
    const controller = new AbortController();
    datasets
      .getData(SERVER.MAP_PROBLEM_TABLES, datasets.getToken(), controller.signal)
      .then((geoj: any) => {
        addGeojsonSource(map, geoj.geom, isProblemActive);
        setProblemClusterGeojson(geoj.geom);
      })
      .catch(handleAbortError);
    return controller;
  };
  const searchEquivalentinProblemBoundary = (key: string) => {
    if (PROPSPROBLEMTABLES.problems.includes(key)) {
      const index = PROPSPROBLEMTABLES.problems.indexOf(key);
      return PROPSPROBLEMTABLES.problem_boundary[index];
    }
    return key;
  };

  const getIdByProjectType = () => {
    const capitalProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 5)
      .map((project: any) => project.project_id);
    const maintenanceProjects = projectsids
      .filter(
        (project: any) =>
          (project.code_project_type_id >= 7 && project.code_project_type_id <= 11) ||
          project.code_project_type_id === 17,
      )
      .map((project: any) => project.project_id);
    const studyProjects = projectsids
      .filter((project: any) => project.code_project_type_id === 1)
      .map((project: any) => project.project_id);
    const studyProjectsFHAD = projectsids
      .filter((project: any) => project.code_project_type_id === 4)
      .map((project: any) => project.project_id);
    // const acquisitionProjects = projectsids.filter((project:any) => project.code_project_type_id === 13).map((project:any) => project.project_id);
    // const developementImprProjects = projectsids.filter((project:any) => project.code_project_type_id === 6).map((project:any) => project.project_id);
    const projectsWithoutStyle = projectsids
      .filter(
        (project: any) =>
          project.code_project_type_id !== 5 &&
          project.code_project_type_id !== 1 &&
          project.code_project_type_id !== 4 &&
          !(project.code_project_type_id >= 7 && project.code_project_type_id <= 11) &&
          project.code_project_type_id !== 17,
      )
      .map((project: any) => project.project_id);
    const groupedProjectsByType = {
      5: capitalProjects,
      7: maintenanceProjects,
      1: studyProjects,
      4: studyProjectsFHAD,
      999: projectsWithoutStyle,
      // 13: acquisitionProjects,
      // 6: developementImprProjects
    };
    setGroupedProjectIdsType(groupedProjectsByType);
  };

  useEffect(() => {
    getIdByProjectType();
  }, [projectsids]);

  const applyFilters = useCallback(
    (key: string, toFilter: any) => {
      if (!map) return;
      const styles = { ...(tileStyles as any) };
      let clusterAdded = false;
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map?.getLayer(key + '_' + index)) {
          return;
        }
        const allFilters: any[] = ['all'];
        if (key === PROBLEMS_TRIGGER) {
          for (const filterField in toFilter) {
            let filters = toFilter[filterField];
            if (key === MHFD_PROJECTS && filterField === 'status' && !filters) {
              filters = 'Active,Closeout,Closed';
            }
            if (filterField === 'keyword') {
              if (filters[key]) {
                allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...filters[key]]]]);
              }
            }
            if (filters && filters.length) {
              const options: any[] = ['any'];
              if (
                filterField === 'keyword' ||
                filterField === 'completedyear' ||
                filterField === 'component_type' ||
                filterField === 'year_of_study' ||
                filterField === 'problemname' ||
                filterField === 'projectname' ||
                filterField === 'finalcost' ||
                filterField === 'projecttype' ||
                filterField === 'problemtypeProjects'
              ) {
                continue;
              }
              if (filterField === 'components') {
                allFilters.push([
                  'in',
                  [
                    'get',
                    key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[5] : PROPSPROBLEMTABLES.problems[5],
                  ],
                  ['literal', [...filters]],
                ]);
                continue;
              }
              if (typeof filters === 'object' && filterField !== 'mhfdmanager') {
                if (filterField === 'solutioncost') {
                  const lower = filters[0];
                  const upper = filters[1];
                  const lowerArray: any[] = [
                    '>=',
                    [
                      'to-number',
                      ['get', key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField],
                    ],
                    +lower,
                  ];
                  const upperArray: any[] = [
                    '<=',
                    [
                      'to-number',
                      ['get', key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField],
                    ],
                    +upper,
                  ];
                  const allFilter = ['all', lowerArray, upperArray];
                  if (
                    searchEquivalentinProblemBoundary(filterField) === 'component_status' ||
                    searchEquivalentinProblemBoundary(filterField) === 'estimated_cost'
                  ) {
                    allFilter.push(['has', searchEquivalentinProblemBoundary(filterField)]);
                  }
                  options.push(allFilter);
                } else {
                  for (const range of filters) {
                    if (typeof range === 'string') {
                      const [lower, upper] = range.split(',');
                      const lowerArray: any[] = [
                        '>=',
                        [
                          'to-number',
                          [
                            'get',
                            key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField,
                          ],
                        ],
                        +lower,
                      ];
                      const upperArray: any[] = [
                        '<=',
                        [
                          'to-number',
                          [
                            'get',
                            key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField,
                          ],
                        ],
                        +upper,
                      ];
                      const allFilter = ['all', lowerArray, upperArray];
                      if (
                        searchEquivalentinProblemBoundary(filterField) === 'component_status' ||
                        searchEquivalentinProblemBoundary(filterField) === 'estimated_cost'
                      ) {
                        allFilter.push(['has', searchEquivalentinProblemBoundary(filterField)]);
                      }
                      options.push(allFilter);
                    }
                  }
                }
              } else {
                let managers;
                if (filterField === 'mhfdmanager' && mhfdmanagers) {
                  const mhfdmanagersArray = filters.map((mhfdmanager: any) => {
                    const mhfdmanagerObject = (mhfdmanagers as any).find(
                      (mhfdmanagerObject: any) => mhfdmanagerObject.id === mhfdmanager,
                    );
                    return mhfdmanagerObject?.value;
                  });
                  managers = mhfdmanagersArray.join(',');
                }
                const filterToCheck = filterField !== 'mhfdmanager' ? filters : managers;
                for (const filter of filterToCheck.split(',')) {
                  if (isNaN(+filter)) {
                    options.push([
                      '==',
                      ['get', key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField],
                      filter,
                    ]);
                  } else {
                    const equalFilter: any[] = [
                      '==',
                      [
                        'to-number',
                        [
                          'get',
                          key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField,
                        ],
                      ],
                      +filter,
                    ];
                    options.push(equalFilter);
                  }
                }
              }

              allFilters.push(options);
            }
          }
        } else if (key === MHFD_PROJECTS) {
          const currentLayer = map.getLayer(key + '_' + index);
          let projecttypes = currentLayer.metadata.projecttype;
          let combinedProjects: any = [];
          for (let type in groupedProjectIdsType) {
            if (projecttypes.includes(+type)) {
              combinedProjects.push(...groupedProjectIdsType[type]);
            }
          }
          if (combinedProjects.length === 0) {
            allFilters.push(['in', ['get', 'projectid'], ['literal', [-1]]]);
          } else {
            allFilters.push(['in', ['get', 'projectid'], ['literal', combinedProjects]]);
          }
        } else {
          componentsNobounds?.actionsIds?.forEach((component: any) => {
            for (const componentLayer of COMPONENT_LAYERS.tiles) {
              const ComponentParsed = component.component_type.toLowerCase().replace(/ /g, '_');
              if (componentLayer.includes(ComponentParsed)) {
                allFilters.push({
                  type: componentLayer,
                  filter: ['in', ['get', 'component_id'], ['literal', component.actions]],
                });
              }
            }
          });
        }
        if (key === PROBLEMS_TRIGGER && problemClusterGeojson) {
          if (!clusterAdded) {
            addGeojsonSource(map, problemClusterGeojson, isProblemActive, allFilters);
            clusterAdded = true;
          }
        }
        if (map.getLayer(key + '_' + index)) {
          if (key !== MHFD_PROJECTS && key !== PROBLEMS_TRIGGER) {
            let filterFinal: any = [];
            allFilters.forEach(filterAction => {
              if (filterAction !== allFilters[0]) {
                if (filterAction?.type.includes(key)) {
                  filterFinal.push(allFilters[0]);
                  filterFinal.push(filterAction.filter);
                  map.setFilter(key + '_' + index, filterFinal);
                }
              }
            });
          } else {
            map.setFilter(key + '_' + index, allFilters);
          }
        }
      });
    },
    [
      problemClusterGeojson,
      projectsids,
      filterProjectOptions,
      groupedProjectIdsType,
      paramComponents,
      componentsNobounds,
    ],
  );

  const hideLayerAfterRender = async (key: string) => {
    const styles = { ...(tileStyles as any) };
    if (styles[key]) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (map.getLayer(key + '_' + index)) {
          // HERE IS HIDING THE LAYER
          map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
        }
      });
    }
  };
  // showHighlighted, hideOneHighlighted, hideHighlighted functions dont use anymore cartodb_id as a parameter to filter, now they use projectid
  const showHighlighted = (key: string, projectid: string) => {
    const styles = { ...(tileStyles as any) };
    if (key.includes('mhfd_projects')) {
      if (styles[key]) {
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
            if (map.getLayer(key + '_highlight_' + index)) {
              map.setFilter(key + '_highlight_' + index, ['in', 'projectid', projectid]);
            }
          }
        });
      }
    } else {
      if (styles[key]) {
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
            if (map.getLayer(key + '_highlight_' + index)) {
              map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', projectid]);
            }
          }
        });
      }
    }
  };

  const hideOneHighlighted = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((style: LayerStylesType, index: number) => {
      if (key.includes('mhfd_projects')) {
        if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
          if (map.getLayer(key + '_highlight_' + index)) {
            map.setFilter(key + '_highlight_' + index, ['in', 'projectid']);
          }
        }
      } else {
        if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
          if (map.getLayer(key + '_highlight_' + index)) {
            map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id']);
          }
        }
      }
    });
  };

  const hideHighlighted = () => {
    const styles = { ...(tileStyles as any) };
    for (const key in styles) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (key.includes('mhfd_projects')) {
          if (map.getLayer(key + '_highlight_' + index)) {
            map.setFilter(key + '_highlight_' + index, ['in', 'projectid']);
          }
        } else {
          if (map.getLayer(key + '_highlight_' + index)) {
            map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id']);
          }
        }
      });
    }
  };

  const addToMap = () => {
    if (markersNotes.length > 0) {
      markersNotes.forEach((marker: any) => {
        marker.marker._popup.remove();
      });
    }
    canAdd.value = true;
  };

  const hideLayers = (key: string) => {
    const styles = { ...(tileStyles as any) };
    styles[key].forEach((_: LayerStylesType, index: number) => {
      if (map.getLayer(key + '_' + index)) {
        map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
      }
    });
    if (key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
      styles[STREAMS_POINT].forEach((_: LayerStylesType, index: number) => {
        if (map.getLayer(STREAMS_POINT + '_' + index)) {
          map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'none');
        }
      });
    }
    if (key === PROBLEMS_TRIGGER) {
      isProblemActive = false;
      removeGeojsonCluster(map);
    }
  };

  const getDetailPage = (item: any) => {
    setVisible(true);
    setData(item);
    if (item.problemid) {
      existDetailedPageProblem(item.problemid);
    } else {
      getDetailedPageProject(item.project_id || item.iditem.projectid || item.project_id);
    }
  };
  const highlithOnTap = (id: any) => {
    hideHighlighted();
    showHighlighted(id.layer, id.id);
  };
  const showPopup = (index: any, size: number, id: any) => {
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
  const [distanceValue, setDistanceValue] = useState('0');
  const [distanceValueMi, setDistanceValueMi] = useState('0');
  const [areaValue, setAreaValue] = useState('0');
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
        map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
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
        map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
      }

      geojsonMeasures.features = [];
      linestringMeasure.geometry.coordinates = [];
      map.getSource('geojsonMeasure').setData(geojsonMeasures);
      setIsDrawingMeasure(false);
      setIsMeasuring(false);
    }
  };

  // TODO: Move this function to service
  const measureCenterAndDelete = (type: any, item: any) => {
    if (type == 'center') {
      const coords = JSON.parse(item.coordinates);
      if (item.type == 'line') {
        const line = turf.lineString(coords);
        const bbox = turf.bbox(line);
        map.fitBounds(bbox, { padding: 80 });
      } else {
        const polygon = turf.polygon(coords);
        const bbox = turf.bbox(polygon);
        map.fitBounds(bbox, { padding: 80 });
      }
    } else if (type == 'delete') {
      geojsonMeasuresSaved.features = geojsonMeasuresSaved.features.filter(elem => elem.properties.id != item.id);
      popup.remove();
      map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
    }
  };

  useEffect(() => {
    const eventToClick = eventclick;
    map.on('click', eventToClick);
    return () => {
      map.off('click', eventToClick);
    };
  }, [allLayers]);

  const eventclick = async (e: any) => {
    if (isEdit) {
      editNoteWithElem(currentNote, editNote);
      isEdit = false;
      newNote = undefined;
      currentNote = undefined;
    }
    if (newNote !== void 0 && isEdit === false) {
      createNoteWithElem(newNote, createNote);
      markerNote.remove();
      popup.remove();
      isEdit = false;
      newNote = undefined;
      currentNote = undefined;
    }
    if (markerGeocoder) {
      markerGeocoder.remove();
      setMarkerGeocoder(undefined);
    }
    if (searchMarker) {
      searchMarker.remove();
      setKeyword('');
    }
    if (isMeasuring) {
      measureFunction(
        e,
        map,
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
      // if (markersNotes.length > 0) {
      //   markersNotes.forEach((marker: any) => {
      //     console.log('entra 2')
      //     marker.marker._popup.remove();
      //   });
      // }
      if (commentAvailable && canAdd.value) {
        const html = notesPopup(setNote, handleDeleteNote);
        popup = new mapboxgl.Popup({
          closeButton: false,
          offset: {
            top: [0, 10],
            bottom: [0, -10],
            left: [10, 0],
            right: [-10, 0],
          },
        });
        markerNote.setPopup(popup);
        popup.setDOMContent(html);
        markerNote
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setPopup(popup)
          .addTo(map)
          .togglePopup();
        canAdd.value = false;
        return;
      }
      if (commentAvailable) {
        return;
      }
      hideHighlighted();
      const popups: any = [];
      const mobile: any = [];
      const menuOptions: any = [];
      const ids: any = [];
      const mobileIds: any = [];
      const bbox = [e.point.x, e.point.y, e.point.x, e.point.y];
      setMobilePopups([]);
      setActiveMobilePopups([]);
      setSelectedPopup(-1);
      const measureFeature = map.queryRenderedFeatures(bbox, {
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
        await addPopupsOnClick(
          map,
          bbox,
          allLayers,
          coordX,
          coordY,
          e,
          mobile,
          menuOptions,
          popups,
          mobileIds,
          ids,
          userInformation,
          () => { },
          () => { },
          [],
          MAPTYPES.MAINMAP,
        );
      }
      if (popups.length) {
        popup.remove();
        popup = new mapboxgl.Popup({ closeButton: true });
        setMobilePopups(mobile);
        setActiveMobilePopups(mobileIds);
        setSelectedPopup(0);
        addPopupAndListeners(
          MAPTYPES.MAINMAP,
          menuOptions,
          popups,
          userInformation,
          getDetailPage,
          popup,
          map,
          showPopup,
          seeDetails,
          createProject,
          measureCenterAndDelete,
          e,
          ids,
          undefined,
          openEdit
        );
      }
    }
  };

  const openEdit = (project: any) => {
    datasets.getData(
      SERVER.V2_DETAILED_PAGE(project.project_id),
      datasets.getToken()
    ).then((value: any) => {
      setCompleteProjectData({ ...value, tabKey });
      setTimeout(() => {
        setShowModalProject(true);
      }, 200);
    });
  }

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
  const createProject = (details: any) => {
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
    }
    if (details.layer === 'Components') {
      let newComponents = [
        {
          cartodb_id: details.cartodb_id ? details.cartodb_id : '',
          jurisdiction: details.jurisdiction ? details.jurisdiction : '',
          original_cost: details.original_cost ? details.original_cost : '',
          problem_id: details.problemid ? details.problemid : '',
          status: details.status ? details.status : '',
          source_table_name: details.table ? details.table : '',
          type: details.type ? details.type : '',
          object_id: details.type ? details.objectid : '',
        },
      ];
      setComponentsFromMap(newComponents);
      getComponentGeom(details.table, details.objectid);
      setProblemId('-1');
      setTimeout(() => {
        getZoomGeomComp(details.table, details.objectid);
      }, 4500);
      setShowDefault(true);
    } else if (details.type === 'problems') {
      getAllComponentsByProblemId(details.problemid);
      setProblemId(details.problemid);
      setShowDefault(true);
    } else {
      setShowDefault(false);
      setComponentsFromMap([]);
    }
    setVisibleCreateProject(true);
  };
  useEffect(() => {
    if (visibleCreateProject && dataProblem.problemid) {
      getZoomGeomProblem(dataProblem.problemid);
    }
  }, [visibleCreateProject]);
  const addMapListeners = (key: string) => {
    const styles = { ...(tileStyles as any) };
    const availableLayers: any[] = [];
    if (styles[key]) {
      styles[key].forEach((style: LayerStylesType, index: number) => {
        if (!map.getLayer(key + '_' + index)) {
          return;
        }
        availableLayers.push(key + '_' + index);
        if (style.type != 'symbol') {
          map.on('mousemove', key + '_' + index, (e: any) => {
            if (commentAvailable || isMeasuring) {
              return;
            }
            if (hovereableLayers.includes(key)) {
              if (e.features[0].source.includes('mhfd_projects')) {
                showHighlighted(key, e.features[0].properties.projectid);
              } else {
                showHighlighted(key, e.features[0].properties.cartodb_id);
              }
            }
            if (key.includes('projects') || key === PROBLEMS_TRIGGER) {
              map.getCanvas().style.cursor = 'pointer';
              let idtosearch = e.features[0].properties.projectid;
              let keytoSend = key;
              if (key === PROBLEMS_TRIGGER) {
                idtosearch = e.features[0].properties.cartodb_id;
                keytoSend = FILTER_PROBLEMS_TRIGGER;
              }
              setSelectedOnMap(idtosearch, keytoSend);
            } else {
              setSelectedOnMap(-1, key);
            }
          });
          map.on('mouseleave', key + '_' + index, (e: any) => {
            if (commentAvailable) {
              return;
            }
            if (hovereableLayers.includes(key)) {
              hideOneHighlighted(key);
            }
            map.getCanvas().style.cursor = '';
            setSelectedOnMap(-1, '');
          });
        }
      });
      setAllLayers(allLayers => [...allLayers, ...availableLayers]);

      map.on('mouseenter', key, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', key, () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('mousemove', () => {
        map.getCanvas().style.cursor = !(canAdd.value && commentAvailable) && !isMeasuring ? 'default' : 'crosshair';
      });
    }
  };

  const selectCheckboxes = (selectedItems: Array<LayersType>) => {
    const deleteLayers = selectedLayers.filter((layer: any) => !selectedItems.includes(layer as string));
    deleteLayers.forEach((layer: LayersType) => {
      if (layer === 'border' || layer === 'area_based_mask') {
        removeLayerMask(layer);
      } else {
        removeTilesHandler(layer);
      }
    });
    updateSelectedLayers(selectedItems);
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
  const renderOption = (item: any) => {
    if (item.place_name === 'Stream'){
      return {
        key: `${item.text}|${item.place_name}|${item.center[0]}|${item.center[1]}`,
        value: `${item.center[0]},${item.center[1]}?${item.text}|${item.place_name}`,
        label: (
          <div className="global-search-item">
            <h6 style={{ whiteSpace: 'normal' }}>{item.text}</h6>
            <h5 className="wraptext" style={{ whiteSpace: 'normal' }}>Stream</h5>
          </div>
        ),
      };
    }else{
      const firstText = item.place_name.split(',')[0];
      const secondText = item.place_name.split(',');
      secondText.splice(0,1);
      return {
        key: `${item.text}|${item.place_name}|${item.center[0]}|${item.center[1]}`,
        value: `${item.center[0]},${item.center[1]}?${item.text}|${item.place_name}`,
        label: (
          <div className="global-search-item">
            <h6 style={{ whiteSpace: 'normal' }}>{firstText}</h6>
            <h5 className="wraptext" style={{ whiteSpace: 'normal' }}>{secondText.join(',')}</h5>
          </div>
        ),
      };
    }    
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
    map.flyTo({ center: coord, zoom: 14.5 });
    const placeName = keyword[1];
    setKeyword(placeName);
    searchMarker.remove();
    searchMarker = new mapboxgl.Marker({ color: '#F4C754', scale: 0.7 });
    searchMarker.setLngLat(coord);
    map.on('flyend', function () {
      console.log('flying = false;');
    });
    map.once('moveend', (e: any) => {
      const point = map.project(coord);
      const features = map.queryRenderedFeatures(point, {
        layers: ['counties-background', 'municipalities-background', 'watershed_service_areas-background'],
      });
      const mobile = [],
        menuOptions = [],
        popups = [],
        ids = [];
      let counties = 1,
        municipalities = 1,
        watershed_service_areas = 1;
      for (const feature of features) {
        if (feature.source === 'watershed_service_areas' && watershed_service_areas) {
          watershed_service_areas--;
          const item = {
            layer: MENU_OPTIONS.SERVICE_AREA,
            feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
            watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
            constructionmanagers: feature.properties.constructionmanagers
              ? feature.properties.constructionmanagers
              : '-',
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
        if (feature.source === 'counties' && counties) {
          counties--;
          const item = {
            layer: MENU_OPTIONS.COUNTIES,
            feature: feature.properties.county ? feature.properties.county : '-',
            constructionmanagers: feature.properties.construction_manager
              ? feature.properties.construction_manager
              : '-',
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
        if (feature.source === 'municipalities' && municipalities) {
          municipalities--;
          const item = {
            layer: MENU_OPTIONS.MUNICIPALITIES,
            feature: feature.properties.city ? feature.properties.city : '-',
          };
          mobile.push({
            layer: item.layer,
            feature: item.feature,
          });
          menuOptions.push(MENU_OPTIONS.MUNICIPALITIES);
          popups.push(item);
          ids.push({ layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id });
        }
      }
      if (popups.length) {
        setMobilePopups(mobile);
        setSelectedPopup(0);
        addPopupServiceCountyMunicipality(
          menuOptions,
          popups,
          userInformation,
          searchPopup,
          map,
          showPopup,
          seeDetails,
          createProject,
          ids,
          coord,
          searchMarker,
          setKeyword,
          setMarkerGeocoder,
        );
      }
    });
  };
  const flyTo = (longitude: number, latitude: number, zoom?: number) => {
    map.flyTo({
      center: [longitude, latitude],
      zoom: zoom ?? 15,
    });
  };

  const openEditNote = (note: any) => {
    flyTo(note.longitude, note.latitude, 16.5);
    popup.remove();
    openMarkerOfNoteWithoutAdd(
      note,
      markersNotes,
      // eventsOnClickNotes
    );
  };

  const setSideBarStatus = (status: boolean) => {
    setCommentVisible(status);
    setOpen(status);
  };
  const [measuringState, setMeasuringState] = useState(isMeasuring);
  const [measuringState2, setMeasuringState2] = useState(isMeasuring);
  const [isdrawingmeasure, setIsDrawingMeasure] = useState(false);
  const setIsMeasuring = (value: boolean) => {
    isMeasuring = value;
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
  return (
    <>
      {commentVisible && (
        <SideBarComment
          visible={commentVisible}
          setVisible={setSideBarStatus}
          flyTo={flyTo}
          openEditNote={openEditNote}
          addToMap={addToMap}
        />
      )}
      <div>
        {visibleCreateProject && (
          <ModalProjectView
            visible={visibleCreateProject}
            setVisible={setVisibleCreateProject}
            data={'no data'}
            showDefaultTab={showDefault}
            locality={autocomplete}
            editable={true}
            problemId={problemid}
          />
        )}
      </div>

      <div className="map">
        {isProblemActive && (
          <div className="legendProblemTypemap">
            <h5>
              Problem Type
              <Popover
                content={
                  <div className="popoveer-00">
                    <p className='dark-text'>Problem Types</p>
                    <p>
                      <span className='dark-text'>Flood Hazard </span> Problems related to existing flood or
                      fluvial hazard to life and property.
                    </p>
                    <p>
                      <span className='dark-text'>Stream Condition </span> Problems related to the physical,
                      environmental, and social function or condition of the stream in an urban context.
                    </p>
                    <p>
                      <span className='dark-text'>Watershed Change </span> Problems related to flood waters that
                      may pose safety or functional concerns related to people, property, and the environment due to
                      changing watershed conditions (land use, topography, regional detention, etc).
                    </p>
                  </div>
                }
              >
                <InfoCircleOutlined className='iconinfocircle' />
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
        )}

        <span className="zoomvaluemap">
          <b>Nearmap: March 19, 2023</b>
          <b className='text-zoomlevel'>Zoom Level: {zoomValue}</b>
        </span>
        {!!visible && (
          <DetailModal
            visible={visible}
            setVisible={setVisible}
            data={data}
            type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
          />
        )}
        {!!(mobilePopups.length && window.innerWidth < 700) && (
          <MobilePopup seeDetails={seeDetails} items={mobilePopups} />
        )}
        <div ref={divMapRef} className="map-style" />
        <div className="m-head">
          <MapDropdownLayers
            selectCheckboxes={selectCheckboxes}
            selectedLayers={selectedLayers}
            removePopup={removePopup}
          />
          <AutoComplete
            dropdownMatchSelectWidth={true}
            className='autocomplete-map'
            options={mapSearch.map(renderOption)}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={keyword}
            listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 530 : 300) : 256}
          >
            <Input.Search allowClear placeholder="Stream or Location" />
          </AutoComplete>
        </div>
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

        <SideMenuTools map={map} setCommentVisible={setCommentVisible} mapService={mapService} isMobile={isMobile} />
        {isMobile && <MobileMenu />}
      </div>
    </>
  );
};

export default Map;
