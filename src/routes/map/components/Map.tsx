import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as datasets from "Config/datasets";
import { SERVER } from "Config/Server.config";
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { measureFunction, addPopupAndListeners, addPopupServiceCountyMunicipality, addPopupsOnClick } from 'routes/map/components/MapFunctionsPopup';
import { InfoCircleOutlined } from "@ant-design/icons";
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
    SELECT_ALL_FILTERS,
    FILTER_PROBLEMS_TRIGGER,
    FILTER_PROJECTS_TRIGGER,
    MHFD_PROJECTS,
    NEARMAP_TOKEN,
    EFFECTIVE_REACHES,
    MENU_OPTIONS,
    SERVICE_AREA_FILTERS,
    STREAMS_POINT,
    PROPSPROBLEMTABLES,
    MAPTYPES,
    initFilterProblems,
    USE_LAND_COVER_LABEL,
    USE_LAND_COVER_MAP,
    FEMA_FLOOD_HAZARD,
    USE_LAND_COVER,
    COUNTIES_FILTERS,
    MUNICIPALITIES_FILTERS,
    SEMSWA_SERVICE_AREA,
    WATERSHED_FILTERS,
    NRCS_SOILS,
    FLOODPLAINS_NON_FEMA_FILTERS,
    ACTIVE_LOMS,
    STREAM_MANAGEMENT_CORRIDORS,
    ROUTINE_MAINTENANCE,
    MEP_PROJECTS,
    FLOOD_HAZARDS,
    DWR_DAM_SAFETY,
    RESEARCH_MONITORING,
    CLIMB_TO_SAFETY
} from "constants/constants";
import { 
  COMPONENT_LAYERS_STYLE,
  ROUTINE_MAINTENANCE_STYLES,
  MEP_PROJECTS_STYLES,
  tileStyles, widthLayersStream,
  NEARMAP_STYLE,
  USE_LAND_TILES_STYLE
} from 'constants/mapStyles';
import { addMapGeocoder, getMapBoundingBoxTrimmed } from 'utils/mapUtils';
import { Input, AutoComplete } from 'antd';
import { useMapState, useMapDispatch } from 'hook/mapHook';
import { useProjectDispatch } from 'hook/projectHook';
import { handleAbortError, setOpacityLayer } from 'store/actions/mapActions';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer, ScatterplotLayer} from '@deck.gl/layers';
import MapService from 'Components/Map/MapService';
import { useNoteDispatch, useNotesState } from 'hook/notesHook';
import { useProfileState } from 'hook/profileHook';
import { addGeojsonSource, removeGeojsonCluster } from 'routes/map/components/MapFunctionsCluster';
import { flytoBoundsCoor, getTitle, polyMask, depth, waitingInterval} from 'routes/map/components/MapFunctionsUtilities';
import { GlobalMapHook } from 'utils/globalMapHook';
import MobileMenu from 'routes/map/components/MobileMenu';
import SideMenuTools from 'routes/map/components/SideMenuTools';
import { commentPopup } from 'routes/map/components/MapGetters';
import { hovereableLayers } from '../constants/layout.constants';
import {
  createNoteWithElem,
  editNoteWithElem,
  handleColor,
  openMarkerOfNoteWithoutAdd
} from 'routes/map/components/MapFunctionsNotes';
import useMapResize from 'hook/custom/useMapResize';
import useIsMobile from 'hook/custom/useIsMobile';
import { areObjectsDifferent } from 'utils/comparators';
import MapDropdownLayers from './MapDropdownLayers';

const SideBarComment = React.lazy(() => import('Components/Map/SideBarComment'));
const ModalProjectView = React.lazy(() => import('Components/ProjectModal/ModalProjectView'));
const DetailModal = React.lazy(() => import('routes/detail-page/components/DetailModal'));
const MobilePopup =  React.lazy(() => import('Components/MobilePopup/MobilePopup'));

let map: any = null;
let searchMarker = new mapboxgl.Marker({ color: "#F4C754", scale: 0.7 });
let searchPopup = new mapboxgl.Popup({closeButton: true,});
let popup = new mapboxgl.Popup({closeButton: true,});
let isEdit = false;
let newNote:any = undefined;
let currentNote :any=undefined;
type LayersType = string | ObjectLayerType;
let coordX = -1;
let coordY = -1;
const factorKMToMiles = 0.621371;
const factorKMtoFeet =  3280.8;
const factorm2toacre = 0.00024710538146717;
let itMoved = false;
let globalMapId: string | null = null;

const docNote = document.createElement('div');
      docNote.className = 'marker-note';
const markerNote = new mapboxgl.Marker(docNote);
let momentaryMarker = new mapboxgl.Marker({color:'#FFFFFF', scale: 0.7});
let isMeasuring = false;
type GeoJSONMeasures = {
  type: string;
  features: any[]
}
    const geojsonMeasures = {
      'type': 'FeatureCollection',
      'features': []
      };
    const geojsonMeasuresSaved: GeoJSONMeasures = {
      'type': 'FeatureCollection',
      'features': []
    };

    const linestringMeasure = {
      'type': 'Feature',
      'geometry': {
      'type': 'LineString',
      'coordinates': []
      }
    };
let canAdd = {value: false};
let isProblemActive = true;

let commentAvailable = false;

const Map = ({
    leftWidth
}: MapProps) => {
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
    getGalleryProblems
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
    galleryProjectsV2,
    selectedLayers,
    filterProblemOptions,
    filterProjectOptions,
    highlighted,
    filterComponentOptions,
    paramFilters: {
      components: paramComponents,
      componentsNoBounds: componentsNobounds
    },
    filterProblems,
    filterComponents,
    mapSearch,
    applyFilter,
    zoomProblemOrProject: zoom,
    projectsids
  } = useMapState();
    let geocoderRef = useRef<HTMLDivElement>(null);
    const divMapRef = useRef<HTMLDivElement>(null);
    const dropdownItems = { default: 1, items: MAP_DROPDOWN_ITEMS };
    const { notes , availableColors} = useNotesState();
    const { getNotes, createNote, editNote, setOpen, deleteNote } = useNoteDispatch();
    const {setComponentsFromMap, getAllComponentsByProblemId, getComponentGeom, getZoomGeomProblem, getZoomGeomComp} = useProjectDispatch();
    const [mobilePopups, setMobilePopups] = useState<any>([]);
    const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
    const [visibleCreateProject, setVisibleCreateProject ] = useState(false);
    const [problemid, setProblemId ] = useState<any>(undefined);
    const [problemClusterGeojson, setProblemClusterGeojson] = useState(undefined);
    const [zoomValue, setZoomValue] = useState(0);
    const [groupedProjectIdsType, setGroupedProjectIdsType] = useState<any>([]);
    const { addHistoric, getCurrent } = GlobalMapHook();
    const [markersNotes, setMarkerNotes] = useState([]) ;
    const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
    const { userInformation, groupOrganization } = useProfileState();
    const [visible, setVisible] = useState(false);
    const [zoomEndCounter, setZoomEndCounter] = useState(0);
    const [dragEndCounter, setDragEndCounter] = useState(0);
    const [allLayers, setAllLayers] = useState<any[]>([]);
    const [mapService] = useState<MapService>(new MapService());
    const [commentVisible, setCommentVisible] = useState(false); // is set on open notes sidebar
    const coorBounds: any[][] = [];

    const [data, setData] = useState({
        problemid: '',
        id: '',
        objectid: '',
        value: '',
        type: '',
        cartoid: ''
    });

    const [dataProblem, setDataProblem] = useState({
        problemid: '',
        id: '',
        objectid: '',
        value: '',
        type: '',
        cartoid: ''
    });
    const [ showDefault, setShowDefault ] = useState(false);
    const isMobile = useIsMobile();

    const handleComments = useCallback((event: any, note? :any) => {
      const getText = event?.target?.value ? event.target.value : event ;
      const getColorId = handleColor(availableColors);
       if (!note) {
      const note = {
        color_id: getColorId,
        note_text: getText,
        latitude: popup.getLngLat().lat,
        longitude: popup.getLngLat().lng
      }; 
        newNote = note;
        return;
      }else {
        const noteEdit = {
          newnotes_id: note.newnotes_id,
          color_id: getColorId,
          note_text: getText,
          latitude: note.latitude,
          longitude: note.longitude
      };
        currentNote = noteEdit;
        isEdit =true
        return;
      }
    }, [availableColors]);

    const handleDeleteNote = (note: any) => {
      let noteId = note.newnotes_id
      deleteNote(noteId);
      markerNote.remove();
      popup.remove();
    }
    useEffect(()=>{
      const user = userInformation;
      if (user?.polygon[0]) {
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
        bottomLongitude -= 0.125;
        topLongitude += 0.125;
        coorBounds.push([bottomLongitude, bottomLatitude]);
        coorBounds.push([topLongitude, topLatitude]);
    }
    },[userInformation.polygon]);
 
    const addLayerMask = (id: any) => {
      console.trace('zxc shouldbehere', id, map.getSource('mask'));
      if (map.getSource('mask')) {
        if (id == 'border' &&  !map.getLayer(id+"MASK")) {
          map.addLayer({
            "id": id+'MASK',
            "source": "mask",
            "type": "line",
            "paint": {
              'line-color': '#28c499',
              'line-width': 1,
            },
            "z-index": 10
          });
        } else if(id == 'area_based_mask' && !map.getLayer(id+"MASK")) {
          map.addLayer({
            "id": id+'MASK',
            "source": "mask",
            "type": "fill",
            "paint": {
                "fill-color": "black",
                'fill-opacity': 0.8
            },
            "z-index": 10
          });
        }
      }
    }
    const removeLayerMask= (id: any)  => {
      map.removeLayer(id+'MASK');
    }
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
        if (!commentVisible){
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
        if(data.problemid || data.cartoid) {
            setVisible(true);
        }
    }, [data]);

    useEffect(() => {
        let totalmarkers:any = [];
        if (map) {
          markersNotes?.forEach((marker:any) => {
            marker.marker.remove()
          });
          notes?.forEach( (note: any) => {
            let colorOfMarker = note?.color?.color?note?.color?.color:'#F6BE0F';
            const doc = document.createElement('div');
            doc.className = 'marker-note';
            doc.style.backgroundColor = colorOfMarker;
            const newmarker = new mapboxgl.Marker(doc);     
            const html = commentPopup(handleComments,handleDeleteNote, note);
            let newpopup = new mapboxgl.Popup({
              closeButton: false,
              offset: { 
                'top': [0, 10],
                'bottom': [0, -10],
                'left': [10,0],
                'right': [-10,0]
              }
            });
            newpopup.on('close', (e: any)=> {
              momentaryMarker.remove();
            });
            newmarker.setPopup(newpopup);
            newpopup.setDOMContent(html);
            newmarker.setLngLat([note?.longitude, note?.latitude]).setPopup(newpopup);
            totalmarkers.push({ marker: newmarker, note: note});
          });
          setMarkerNotes(totalmarkers);
        }
    }, [notes]);
 
    useEffect(()=>{
      if(commentVisible && markersNotes.length > 0) {
        markersNotes.forEach((marker:any) => {
          marker.marker.addTo(map)
        });
      } else if(markersNotes.length > 0 ){
        markersNotes.forEach((marker:any) => {
          marker.marker.remove()
        });
      }
    },[markersNotes, commentVisible]);

    const addFunction = () => {
      let mask;   
      if (coordinatesJurisdiction?.length > 0) {
        const DEPTH = depth(coordinatesJurisdiction);
        if (DEPTH == 4) {
          mask = turf.multiPolygon(coordinatesJurisdiction);
        } else {
          mask = turf.polygon(coordinatesJurisdiction);
        }
        let misbounds = -111.10771487514684 + ',' + 34.094858978187546 + ',' + -98.58537218284262 + ',' + 45.470609601267824;
        var arrayBounds = misbounds.split(',');
        let poly = polyMask(mask, arrayBounds);
        setOpacityLayer(true);
        if (map.getLayer('mask')) {
          map.removeLayer('mask');
        }
        if(map.getSource('mask')) {
          map.getSource('mask').setData(poly);
        } else {
          map.addSource('mask', {
              "type": "geojson",
              "data": poly
          });
        }
        if (!map.getLayer('mask')) {
          map.addLayer({
            "id": "mask",
            "source": "mask",
            "type": "fill",
            "paint": {
                "fill-color": "black",
                'fill-opacity': 0.8
            }
          });
        }
        if (!map.getLayer('border')) {
          map.addLayer({
            "id": 'border',
            "source": "mask",
            "type": "line",
            "paint": {
              'line-color': '#28c499',
              'line-width': 1,
            }
          });
        }
        map.moveLayer('border')
        setTimeout(()=>{
          if (map.getLayer('mask')) {
            map.removeLayer('mask');
          }
          if (map.getLayer('border')) {
            map.removeLayer('border');
          }
        },4000);
      } else {
        if (opacityLayer && map.loaded() && map.getLayer('mask')) {
          map.removeLayer('mask');
          map.removeSource('mask');
        }
      }
    }

  useEffect(() => {   
    const [intervalId, promise] = waitingInterval(map);
    promise.then(() => {
      addFunction()
    });
    return () => {
      clearInterval(intervalId);
    }
  }, [coordinatesJurisdiction]);

  useEffect(() => {
    applyFilters(PROBLEMS_TRIGGER, filterProblems);
  }, [filterProblems,zoomEndCounter, dragEndCounter]);
  useEffect(() => {
    applyFilters(MHFD_PROJECTS, filterProjectOptions);
  }, [projectsids,zoomEndCounter, dragEndCounter]);
  useEffect(() => {
    applyFilters(MHFD_PROJECTS, filterProjectOptions);
  }, [groupedProjectIdsType]);

  useEffect(() => {
    for (const component of COMPONENT_LAYERS.tiles) {
      applyFilters(component, filterComponentOptions);
    }
    applyFilters(MHFD_PROJECTS, filterProjectOptions);
    applyFilters(PROBLEMS_TRIGGER, filterProblems);
  }, [filterComponentOptions, paramComponents, componentsNobounds]);

    useEffect(() => {
      /// UNCOMMENT WHEN NOTES IS READY
      getNotes();
      (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
      map = new mapboxgl.Map({
          container: divMapRef.current as HTMLElement,
          dragRotate: true,
          touchZoomRotate: true,
          style: dropdownItems.items[dropdownItems.default].style,
          center: [userInformation.coordinates.longitude, userInformation.coordinates.latitude],
          zoom: 8,
          attributionControl: false
      });
      const imagesPaths = [
        'custom-sprite/30x30px.png',
        'custom-sprite/dollar.png',
        'custom-sprite/fema-floodway.png',
        'custom-sprite/Levee.png',
        'custom-sprite/Frame13a.png',
        'custom-sprite/Frame17m2t.png',
        'custom-sprite/Frame21C.png',
        'custom-sprite/pjm2.png',
        'custom-sprite/ic-stripered.png',
        'custom-sprite/ic-stripeviolet.png',
        'custom-sprite/Urbanclimbtosafetysign_origclean.png',
        'custom-sprite/rd-draft_ORANGE.png',
        'custom-sprite/rd-apprv_GREEN.png',
        'custom-sprite/rd-rqst_PINK.png',
        'custom-sprite/prop-acq-rqst_PINK.png',
        'custom-sprite/prop-acq-apprv_GREEN.png',
        'custom-sprite/prop-acq-draft_ORANGE.png',
        'custom-sprite/MEP-X.png',
        'custom-sprite/floodwaypattern.png'
      ];
      imagesPaths.forEach((imagePath: string) => {
        map.loadImage(imagePath, (error: any, image: any) => {
          if (error) {
            console.log('error on load ', error);
            return;
          }
          if (!map.hasImage(imagePath.split('/')[1].split('.')[0])) {
              map.addImage(imagePath.split('/')[1].split('.')[0], image);
          }
        })
      });

      mapService.map = map;  
      flytoBoundsCoor(
        getCurrent, 
        userInformation,
        globalMapId,
        coorBounds,
        map,
        groupOrganization,
        setCoordinatesJurisdiction
      );
        

      map.addControl(new mapboxgl.ScaleControl({
          unit: 'imperial'
      }), 'bottom-right');
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.addControl( new mapboxgl.AttributionControl({compact:true}) )
      addMapGeocoder(map, geocoderRef);

      let value = 0;
      let _ = 0;
      let __ = 1;
      const mapOnRenderFn = () => {
        if (!globalMapId && itMoved) {
          const center = [map.getCenter().lng, map.getCenter().lat];
          const bbox = [map.getBounds()._sw.lng, map.getBounds()._sw.lat, 
          map.getBounds()._ne.lng, map.getBounds()._ne.lat];
          addHistoric({center, bbox});
        }
        globalMapId = null;
        itMoved = false;
      }
      const zoomEndFn = () => {
        mapService.hideOpacity();
        setZoomEndCounter(_++);
        setOpacityLayer(false)
        value += 1;
        if (value >= 2) {
            setBoundMap(getMapBoundingBoxTrimmed(map));
        }
      }
      const dragEndFn = () => {
        mapService.hideOpacity();
        setDragEndCounter(__++);
        setOpacityLayer(false)
        setBoundMap(getMapBoundingBoxTrimmed(map));
        itMoved = true;
      }
      const updateZoom = () => {
          const zoom = map.getZoom().toFixed(2);
          setZoomValue(zoom);
      }
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
        if(markerGeocoder) {
            let lnglat = markerGeocoder.getLngLat();
            let swInside = true;
            let neInside = true;
            if( (lnglat.lat < bounds._sw.lat || lnglat.lng < bounds._sw.lng)){
                swInside = false;
            } 
            if( (lnglat.lat > bounds._ne.lat || lnglat.lng > bounds._ne.lng) ){
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
        if (toggleModalFilter) { // if tab of filters is open 
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
    useEffect(()=>{
      getParamFilterComponentsDefaultBounds(filterComponentOptions)
    },[filterComponentOptions])
    useEffect(() => {
        if (zoom?.length > 0) {
            map.fitBounds([zoom[0], zoom[2]], { padding: 100 });
        }
    }, [zoom]);

    useEffect(()=>{
      let mask;  
      if (groupOrganization[0] && map.loaded()) {
        let coorMHFD = groupOrganization[0].coordinates.coordinates 
        const DEPTH = depth(coorMHFD);
        if (DEPTH == 4) {
          mask = turf.multiPolygon(coorMHFD);
        } else {
          mask = turf.polygon(coorMHFD);
        }
        // PREVIOUS SQUARE OF MHFD 
        // let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
        // LARGER BECAUSE SOME COUNTIES AND SERVICE AREAS ARE BIGGER 
        let misbounds = -111.10771487514684 + ',' + 34.094858978187546 + ',' + -98.58537218284262 + ',' + 45.470609601267824;
        var arrayBounds = misbounds.split(',');
        let poly = polyMask(mask, arrayBounds);
        setOpacityLayer(true);
        if (map.getLayer('maskInit')) {
          map.removeLayer('maskInit');
        }
        if(map.getSource('maskInit')) {
          map.getSource('maskInit').setData(poly);
        } else {
          map.addSource('maskInit', {
              "type": "geojson",
              "data": poly
          });
        }
        if (!map.getLayer('maskInit')) {
          map.addLayer({
            "id": "maskInit",
            "source": "maskInit",
            "type": "fill",
            "paint": {
                "fill-color": "black",
                'fill-opacity': 0.8
            }
          });
        }
        if (!map.getLayer('borderInit')) {
          map.addLayer({
            "id": 'borderInit',
            "source": "maskInit",
            "type": "line",
            "paint": {
              'line-color': '#28c499',
              'line-width': 1,
            }
          });
        }
        map.moveLayer('borderInit')
      }
    },[groupOrganization])

    useEffect(() => {
      if(coorBounds && (coorBounds.length === 0 || coorBounds[0][0])){
        flytoBoundsCoor(
          getCurrent, 
          userInformation,
          globalMapId,
          coorBounds,
          map,
          groupOrganization,
          setCoordinatesJurisdiction
        );
        }
    }, [userInformation.polygon, groupOrganization])

    useEffect(() => {
        if (currentPopup !== -1 && activeMobilePopups.length > currentPopup) {
            highlithOnTap(activeMobilePopups[currentPopup]);
        } else {
            hideHighlighted();
        }
    }, [currentPopup, activeMobilePopups]);

    useMapResize(leftWidth, map);

    useEffect(() => {
      const [intervalId, promise] = waitingInterval(map);
      promise.then(() => {
        applySkyMapLayer();
        applyMapLayers();
        if (areObjectsDifferent(initFilterProblems, filterProblems)) {
          applyProblemClusterLayer();
        }
        setSpinMapLoaded(false);
        applyNearMapLayer();
        applyMeasuresLayer();
        const removedLayers = SWITCHES_MAP.filter((layerElement:any) => !selectedLayers.includes(layerElement))
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
            map.removeLayer('mapboxArcs')
        }
        if (map.getLayer('arcs')) {
            map.removeLayer('arcs')
        }
        if (bboxComponents.centroids && bboxComponents.centroids.length === 0) {
            setTimeout(() => {
                map.setPitch(0)
            }, 3000)
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
                    color: c.component === 'self' ? SOURCE_COLOR : TARGET_COLOR
                }
            });
            let arcs: any[] = [];

            for (let i = 1;  i < bboxComponents.centroids.length ; i++) {
                arcs.push({
                    source: bboxComponents.centroids[0].centroid,
                    target: bboxComponents.centroids[i].centroid,
                    value: bboxComponents.centroids[i].arcWidth,
                    colorArc: bboxComponents.centroids[i].component == "detention_facilities"? RED_SOLID: CIAN_SOLID
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
                getColor: (d: any) => d.color
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
                getSourceColor: (d:any)=> d.colorArc,
                getTargetColor: (d:any)=> d.colorArc
            });
            map.setPitch(70)
            map.addLayer(mapboxArcsLayer);
            map.addLayer(arcsLayer);
        }
    }, [bboxComponents])

    const removePopup = () => {
        popup.remove();
    }

    const applyMeasuresLayer = () => {
      if(!map.getSource('geojsonMeasure')) {
        map.addSource('geojsonMeasure', {
          'type': 'geojson',
          'data': geojsonMeasures
        })
        map.addLayer({
          id: 'measure-points',
          type: 'circle',
          source: 'geojsonMeasure',
          paint: {
          'circle-radius': 5,
          'circle-color': '#FDB32B'
          },
          filter: ['in', '$type', 'Point']
          });
        map.addLayer({
          id: 'measure-lines',
          type: 'line',
          source: 'geojsonMeasure',
          layout: {
          'line-cap': 'round',
          'line-join': 'round'
          },
          paint: {
          'line-color': '#DBA32A',
          'line-width': 2.5
          },
          filter: ['in', '$type', 'LineString']
        });
      }
      if(!map.getSource('geojsonMeasuresSaved')){
        map.addSource('geojsonMeasuresSaved', {
          'type': 'geojson',
          'data': geojsonMeasuresSaved
        });
        map.addLayer({
          id:'measuresSaved',
          type:'fill',
          source: 'geojsonMeasuresSaved',
          paint: {
            'fill-color': '#E7832A',
            'fill-outline-color': '#E7832A',
            'fill-opacity': 0.3
          },
          filter: ['in', 'type', 'polygon']
        });
        map.addLayer({
          id:'measuresSaved-border',
          type:'line',
          source: 'geojsonMeasuresSaved',
          paint: {
            'line-color': '#E7832A',
            'line-width': 4 
          }
        });
        map.addLayer({
          id:'measuresSaved-border-invisible',
          type:'line',
          source: 'geojsonMeasuresSaved',
          paint: {
            'line-color': '#E70000',
            'line-width': 17,
            'line-opacity': 0
          },
          filter: ['in', 'type', 'line']
        })
      }
    }
    const applySkyMapLayer = () => {
      if (!map.getLayer('sky')) {
          map.addLayer({
            id: "sky",
            type: "sky",
            paint: {
              "sky-type": "atmosphere",
              "sky-atmosphere-halo-color": "blue",
              "sky-atmosphere-sun": [45.0, 45.0],
              "sky-atmosphere-sun-intensity": 5,
            },
          })
      }
    }
    
    const applyNearMapLayer = () => {
        if (!map.getSource('raster-tiles')) {
            map.addSource('raster-tiles', {
                'type': 'raster',
                'tileSize': 128,
                'tiles': [
                    `https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`
                    ]
            });
            map.addLayer(
              NEARMAP_STYLE,
                'aerialway'
            );
        }
    }

    const applyTileSetLayer = () => {
      const sourceNameTile = 'milehighfd.create';
      const tileName = 'Adams1_LULC';
      if (!map.getSource(sourceNameTile)) {
        map.addSource(sourceNameTile, {
          "url": `mapbox://${sourceNameTile}`,
          "type": "vector"
        });
        map.addLayer({
          'id': 'douglas',
          'type': 'fill',
          'source': sourceNameTile,
          'source-layer': tileName,
          layout: {
            visibility: "visible"
          },
          paint: {
            'fill-color': [
              "match",
              ["get", "gridcode"],
              [1],
              "#ffffff",
              [2],
              "#b2b2b2",
              [3],
              "#73b2ff",
              [4],
              "#cdf57a",
              [5],
              "#728944",
              [6],
              "#abcd66",
              [7],
              "#734c00",
              [8],
              "#cdaa66",
              [9],
              "#ffaa00",
              "hsla(0, 0%, 0%, 0)"
            ]
          }
        });
      }
    }

    const applyProblemClusterLayer = () => {
      const controller = new AbortController();
      datasets.getData(
        SERVER.MAP_PROBLEM_TABLES,
        datasets.getToken(),
        controller.signal
      )
        .then((geoj:any) => {
          addGeojsonSource(map, geoj.geom, isProblemActive);
          setProblemClusterGeojson(geoj.geom);
        })
        .catch(handleAbortError);
      return controller;
    }
    const applyMapLayers = () => {
        SELECT_ALL_FILTERS.forEach((layer) => {          
          if (typeof layer === 'object') {
            if (layer.name === USE_LAND_COVER_LABEL && process.env.REACT_APP_NODE_ENV !== 'prod') {
              applyTileSetLayer();
              layer.tiles.forEach((tile: string) => {
                addTileSource(tile);
              });
            } 
            else if (layer.tiles) {
              layer.tiles.forEach((subKey: string) => {
                  const tiles = layerFilters[layer.name] as any;
                  if (tiles) {
                      addLayersSource(subKey, tiles[subKey]);
                  }
              });
            }
          } else {
            if(layer !== 'area_based_mask' && layer !== 'border') {
              addLayersSource(layer, layerFilters[layer]);
            }
          }
        });
        selectedLayers.forEach((layer: LayersType) => {
          if(layer === 'area_based_mask' || layer === 'border') {
            addLayerMask(layer);
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
        getProjectsFilteredIds();
        applyFilters(MHFD_PROJECTS, filterProjectOptions);
        setTimeout(()=>{
          topLandUseCover();
          topCounties();
          topMunicipalities();
          topServiceArea();
          topAdditionalLayers();
          topStreams();
          topEffectiveReaches();
          toMEPproject();
          topProjects();
          topComponents();
          toProblemParts();
          topAddLayers();
          topProblems();
          topHovereableLayers();
          topStreamLabels();
          topLabels();
          if (map.getLayer('area_based_maskMASK')) {
            map.moveLayer('area_based_maskMASK');
          }
          if (map.getLayer('borderMASK')) {
            map.moveLayer('borderMASK');
          }
        }, 300);
    }
    const topHovereableLayers = () => {
      const styles = { ...tileStyles as any };
      hovereableLayers.forEach((key:any) => {
        if (styles[key]) {
          styles[key].forEach((style: LayerStylesType, index: number) => {
            if (!hovereableLayers.includes(key)) {
              return;
            }
            if(map.getLayer(key + '_highlight_' + index)) {
              map.moveLayer( key + '_highlight_' + index, )  
            }
          })
        }
      })
    }

    const topLandUseCover = () => {
      const useLandCover = USE_LAND_COVER as any
      useLandCover.tiles.forEach((element:any) => {
        if (map.getLayer(`${element}_0`)) {
          map.moveLayer(`${element}_0`);
        }
      });
    }

    const topProblems = () => {
      const styles = { ...tileStyles as any };   
      styles[PROBLEMS_TRIGGER].forEach((style: LayerStylesType, index: number) => {
        if (map.getLayer(`${PROBLEMS_TRIGGER}_${index}`)) {
          map.moveLayer(`${PROBLEMS_TRIGGER}_${index}`);
        }
      })
    }

    const topAddLayers = () => {
        const styles = { ...tileStyles as any };   
          styles[DWR_DAM_SAFETY].forEach((style: LayerStylesType, index: number) => {
            map.moveLayer(`${DWR_DAM_SAFETY}_${index}`);
          })
          styles[RESEARCH_MONITORING].forEach((style: LayerStylesType, index: number) => {
            map.moveLayer(`${RESEARCH_MONITORING}_${index}`);
          })
          styles[CLIMB_TO_SAFETY].forEach((style: LayerStylesType, index: number) => {
            map.moveLayer(`${CLIMB_TO_SAFETY}_${index}`);
          })
    }

    const topProjects = () => {
      const styles = { ...tileStyles as any };   
        styles[MHFD_PROJECTS].forEach((style: LayerStylesType, index: number) => {
          map.moveLayer(`${MHFD_PROJECTS}_${index}`);
        })
    }
    const topComponents = () => {
      const styles = { ...COMPONENT_LAYERS_STYLE as any };
      for (const component of COMPONENT_LAYERS.tiles) {
        styles[component].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${component}_${index}`)) {
            map.moveLayer(`${component}_${index}`);
          }
        })
      }
    }

    const toMEPproject = () => {
      const styles = { ...MEP_PROJECTS_STYLES as any };
      for (const component of MEP_PROJECTS.tiles) {
        styles[component].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${component}_${index}`)) {
            map.moveLayer(`${component}_${index}`);
          }
        })
      }
    }

    const toProblemParts = () => {
      const styles = { ...tileStyles as any };
      for (const problemsParts of FLOOD_HAZARDS.tiles) {
        styles[problemsParts].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${problemsParts}_${index}`)) {
            map.moveLayer(`${problemsParts}_${index}`);
          }
        })
      }
    }

    const topMunicipalities = () => {
      const styles = { ...tileStyles as any };
        styles[MUNICIPALITIES_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${MUNICIPALITIES_FILTERS}_${index}`)) {
            map.moveLayer(`${MUNICIPALITIES_FILTERS}_${index}`);  
          }
        })
    }

    const topCounties = () => {
      const styles = { ...tileStyles as any };
        styles[COUNTIES_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${COUNTIES_FILTERS}_${index}`)) {
            map.moveLayer(`${COUNTIES_FILTERS}_${index}`);  
          }
        })
    }

    const topServiceArea = () => {
      const styles = { ...tileStyles as any };
        styles[SEMSWA_SERVICE_AREA].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${SEMSWA_SERVICE_AREA}_${index}`)) {
            map.moveLayer(`${SEMSWA_SERVICE_AREA}_${index}`);  
          }
        })
        styles[SERVICE_AREA_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${SERVICE_AREA_FILTERS}_${index}`)) {
            map.moveLayer(`${SERVICE_AREA_FILTERS}_${index}`);  
          }
        })
    }

    const topAdditionalLayers = () => {
      const styles = { ...tileStyles as any };
        styles[WATERSHED_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${WATERSHED_FILTERS}_${index}`)) {
            map.moveLayer(`${WATERSHED_FILTERS}_${index}`);  
          }
        })
        styles[NRCS_SOILS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${NRCS_SOILS}_${index}`)) {
            map.moveLayer(`${NRCS_SOILS}_${index}`);  
          }
        })
        styles[FEMA_FLOOD_HAZARD].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${FEMA_FLOOD_HAZARD}_${index}`)) {
            map.moveLayer(`${FEMA_FLOOD_HAZARD}_${index}`);  
          }
        })
        styles[FLOODPLAINS_NON_FEMA_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${FLOODPLAINS_NON_FEMA_FILTERS}_${index}`)) {
            map.moveLayer(`${FLOODPLAINS_NON_FEMA_FILTERS}_${index}`);  
          }
        })
        styles[ACTIVE_LOMS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${ACTIVE_LOMS}_${index}`)) {
            map.moveLayer(`${ACTIVE_LOMS}_${index}`);  
          }
        })
        styles[STREAM_MANAGEMENT_CORRIDORS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${STREAM_MANAGEMENT_CORRIDORS}_${index}`)) {
            map.moveLayer(`${STREAM_MANAGEMENT_CORRIDORS}_${index}`);  
          }
        })
        const stylesMaintenanceRoutine = { ...ROUTINE_MAINTENANCE_STYLES as any }
        for (const component of ROUTINE_MAINTENANCE.tiles) {
          stylesMaintenanceRoutine[component].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(`${component}_${index}`)) {
              map.moveLayer(`${component}_${index}`);
            }
          })
        }
    }
    const topEffectiveReaches = () => {
      const styles = { ...tileStyles as any };   
      styles[EFFECTIVE_REACHES].forEach((style: LayerStylesType, index: number) => {
        if(map.getLayer(`${EFFECTIVE_REACHES}_${index}`)) {
          map.moveLayer(`${EFFECTIVE_REACHES}_${index}`);
        }
      })
    }
    const topLabels= () => {
      setTimeout(() => {
        if (map.getLayer('measuresSaved') && 
          map.getLayer('measure-lines') &&
          map.getLayer('poi-label') &&
          map.getLayer('state-label') &&
          map.getLayer('country-label') &&
          map.getLayer('munis-centroids-shea-plusother') &&
          map.getLayer('munis-centroids-district-view-dkc40e')
        ) {
          map.moveLayer('measuresSaved');
          map.moveLayer('measure-lines');
          map.moveLayer('measuresSaved-border');
          map.moveLayer('poi-label');
          map.moveLayer('state-label');
          map.moveLayer('country-label');
          map.moveLayer('munis-centroids-shea-plusother');
          map.moveLayer('munis-centroids-district-view-dkc40e');
        } else {
          topLabels();
        }
      }, 1000);
      
    }
    const topStreams = () => {
      if (map.getLayer('streams_0')) {
        map.moveLayer('streams_0');
      }
      if (map.getLayer('streams_1')) {
        map.moveLayer('streams_1');
      }
      if (map.getLayer('streams_2')) {
        map.moveLayer('streams_2');
      }
      if (map.getLayer('streams_3')) {
        map.moveLayer('streams_3');
      }
      if (map.getLayer('mhfd_flow_points_0')) {
        map.moveLayer('mhfd_flow_points_0');
      }
      if (map.getLayer('mhfd_flow_points_1')) {
        map.moveLayer('mhfd_flow_points_1');
      }
      if (map.getLayer('mhfd_flow_points_2')) {
        map.moveLayer('mhfd_flow_points_2');
      }
      
    }
    const topStreamLabels = () => {
      map.moveLayer('streams_4');
      map.moveLayer('streams_5');
    }
    const addTileSource = (sourceName: string) => {
      if (!map.getSource(sourceName)) {
        map.addSource(sourceName, {
          "url": `mapbox://${sourceName}`,
          "type": "vector"
        });
        addTilesLayers(sourceName);
      }
    };
    const addLayersSource = (key: string, tiles: Array<string>) => {
        if (!map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
            map.addSource(key, {
                type: 'vector',
                tiles: tiles
            });
            addTilesLayers(key);
        }
    }

    const showSelectedComponents = (components: string[]): void => {
        if (!components.length || components[0] === '') {
            return;
        }
        const styles = { ...tileStyles as any };
        for (const key of COMPONENT_LAYERS.tiles) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (!components.includes(key)) {
                    map.setFilter(key + '_' + index, ['in', 'cartodb_id', -1]);
                }
            });
        }
    }

    const searchEquivalentinProblemBoundary = (key: string) => {
      if ( PROPSPROBLEMTABLES.problems.includes(key)) {
        const index = PROPSPROBLEMTABLES.problems.indexOf(key);
        return PROPSPROBLEMTABLES.problem_boundary[index];
      }
      return key;
    }

    const getIdByProjectType = (() => {

      const capitalProjects = projectsids.filter((project:any) => project.code_project_type_id === 5).map((project:any) => project.project_id);
      const maintenanceProjects = projectsids.filter((project:any) => (project.code_project_type_id >= 7 && project.code_project_type_id <= 11) || project.code_project_type_id === 17 ).map((project:any) => project.project_id);
      const studyProjects = projectsids.filter((project:any) => project.code_project_type_id === 1).map((project:any) => project.project_id);
      const studyProjectsFHAD = projectsids.filter((project:any) => project.code_project_type_id === 4).map((project:any) => project.project_id);
      // const acquisitionProjects = projectsids.filter((project:any) => project.code_project_type_id === 13).map((project:any) => project.project_id);
      // const developementImprProjects = projectsids.filter((project:any) => project.code_project_type_id === 6).map((project:any) => project.project_id);
      const projectsWithoutStyle = projectsids.filter((project:any) => project.code_project_type_id !== 5 && project.code_project_type_id !== 1 && project.code_project_type_id !== 4 && !(project.code_project_type_id >= 7 && project.code_project_type_id <= 11) && project.code_project_type_id !== 17).map((project:any) => project.project_id);
      const groupedProjectsByType ={
        5: capitalProjects,
        7: maintenanceProjects,
        1: studyProjects,
        4: studyProjectsFHAD,
        999: projectsWithoutStyle
        // 13: acquisitionProjects,
        // 6: developementImprProjects
      };
      setGroupedProjectIdsType(groupedProjectsByType)
    })

    useEffect(() => {
      getIdByProjectType()
    }, [projectsids]);

    const applyFilters = useCallback((key: string, toFilter: any) => {
      if (!map) return;
        const styles = { ...tileStyles as any };
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
                      console.log('filter field estimated', filters);
                        for (const range of filters) {
                            const [lower, upper] = range.split(',');
                            console.log('filters', lower, upper);
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
                    if (filterField === 'completedyear') {
                        continue;
                    }
                    if (typeof filters === 'object') {
                      if (filterField === 'solutioncost') {
                        const lower = filters[0];
                        const upper = filters[1];
                        const lowerArray: any[] = ['>=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +lower];
                        const upperArray: any[] = ['<=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +upper];
                        const allFilter = ['all', lowerArray, upperArray];
                        if (searchEquivalentinProblemBoundary(filterField) === 'component_status' || searchEquivalentinProblemBoundary(filterField) === 'estimated_cost') {
                          allFilter.push(['has', searchEquivalentinProblemBoundary(filterField)]); 
                        }
                        options.push(allFilter);
                      } else {
                        for (const range of filters) {
                          if(typeof range === 'string'){
                            const [lower, upper] = range.split(',');
                            const lowerArray: any[] = ['>=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +lower];
                            const upperArray: any[] = ['<=', ['to-number', ['get', (key === PROBLEMS_TRIGGER ? searchEquivalentinProblemBoundary(filterField) : filterField)]], +upper];
                            const allFilter = ['all', lowerArray, upperArray];
                            if (searchEquivalentinProblemBoundary(filterField) === 'component_status' || searchEquivalentinProblemBoundary(filterField) === 'estimated_cost') {
                              allFilter.push(['has', searchEquivalentinProblemBoundary(filterField)]); 
                            }
                            options.push(allFilter);
                          }
                          
                        }
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
            } else if (key === MHFD_PROJECTS) {
              const currentLayer = map.getLayer(key + '_' + index)
              let projecttypes = currentLayer.metadata.projecttype;
              let combinedProjects:any=[];
              for (let type in groupedProjectIdsType){
                if(projecttypes.includes(+type)){
                  combinedProjects.push(...groupedProjectIdsType[type]);
                  }
              }
              if(combinedProjects.length === 0){
                allFilters.push(['in', ['get','projectid'], ['literal', [-1]]]);
              }else{
                allFilters.push(['in', ['get','projectid'], ['literal', combinedProjects]]);
              }
            } else{
              componentsNobounds?.actionsIds?.forEach((component:any) => {
                for (const componentLayer of COMPONENT_LAYERS.tiles) {
                  const ComponentParsed = component.component_type.toLowerCase().replace(/ /g,"_")
                  if(componentLayer.includes(ComponentParsed)){
                    allFilters.push({type: componentLayer,filter: ['in', ['get','component_id'], ['literal', component.actions]]});
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
              if(key !== MHFD_PROJECTS && key !== PROBLEMS_TRIGGER){
                let filterFinal:any = [];
                allFilters.forEach(filterAction => {
                  if(filterAction!==allFilters[0]){
                    if(filterAction?.type.includes(key)){
                      filterFinal.push(allFilters[0])
                      filterFinal.push(filterAction.filter)
                      map.setFilter(key + '_' + index, filterFinal);
                    }
                  }
                });
              }else{
                map.setFilter(key + '_' + index, allFilters);
              }
            }
        });
    }, [problemClusterGeojson, projectsids,filterProjectOptions, groupedProjectIdsType, paramComponents, componentsNobounds]);

    const hideLayerAfterRender = async (key: string,) => {
      const styles = { ...(tileStyles as any) };
      if (styles[key]) {
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index)) {
              map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
            }
        });
      }
    };
    // showHighlighted, hideOneHighlighted, hideHighlighted functions dont use anymore cartodb_id as a parameter to filter, now they use projectid 
    const showHighlighted = (key: string, projectid: string) => {
        const styles = { ...tileStyles as any }
        if(key.includes('mhfd_projects')){
          if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                    if(map.getLayer(key + '_highlight_' + index)) { 
                        map.setFilter(key + '_highlight_' + index, ['in', 'projectid', projectid])
                    }
                    
                }
            });
          }
        }else{
          if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                    if(map.getLayer(key + '_highlight_' + index)) { 
                        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', projectid])
                    }
                    
                }
            });
          }
        }
        
    };
    const hideOneHighlighted = (key: string) => {
        const styles = { ...tileStyles as any }
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if(key.includes('mhfd_projects')){
            if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
              if(map.getLayer(key + '_highlight_' + index)) {
                  map.setFilter(key + '_highlight_' + index, ['in', 'projectid'])
              }
          }
          }else{
            if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
              if(map.getLayer(key + '_highlight_' + index)) {
                  map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
              }
          }
        }
        });
    };
    const hideHighlighted = () => {
        const styles = { ...tileStyles as any };
        for (const key in styles) {
          styles[key].forEach((style: LayerStylesType, index: number) => {
            if(key.includes('mhfd_projects')){
              if (map.getLayer(key + '_highlight_' + index)) {
                map.setFilter(key + '_highlight_' + index, ['in', 'projectid'])
              }
            }else {
              if (map.getLayer(key + '_highlight_' + index)) {
                map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
            }
            }
           
          });
        }
    };

    const addToMap = () => {
      if(markersNotes.length > 0 ){
        markersNotes.forEach((marker:any) => {
          marker.marker._popup.remove();
        });
      }
      canAdd.value = true;
    }
    const addLayerProperties = (key: string, index: number, style: any) => {
      if (key === 'counties' || key === 'municipalities' || key === 'watershed_service_areas') {
        if (!map.getLayer(key + '-background')) {
            map.addLayer({
                id: key + '-background',
                type: 'fill',
                source: key,
                'source-layer': 'pluto15v1',
                layout: {
                    visibility: 'visible'
                },
                paint: {
                    'fill-color': '#ffffff',
                    'fill-opacity': 0
                }
            });
        }
    }
    if(key) {
      map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
    }
    
    if (!hovereableLayers.includes(key)) {
        return;
    }
    
    if(style.type === 'line' && key == STREAMS_FILTERS) {
      map.addLayer({
        id: key + '_highlight_' + index,
        source: key,
        type: 'line',
        'source-layer': 'pluto15v1',
        layout: {
            visibility: 'visible'
        },
        paint: {
            'line-color': '#fff',
            'line-width': style.source_name ? widthLayersStream[0]:widthLayersStream[1],
        },
        filter: ['in', 'cartodb_id']
      });
    } else if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
        map.addLayer({
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
    } else if( (style.type === 'circle' || style.type === 'symbol') && key != 'streams') {
        map.addLayer({
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
    }
    const addTilesLayers = (key: string) => {
      if (key.includes('milehighfd') && process.env.REACT_APP_NODE_ENV !== 'prod') {
        const tileName: string = USE_LAND_COVER_MAP[key];
        const style = USE_LAND_TILES_STYLE;
        map.addLayer({
          id: key + '_0',
          'source': key,
          'source-layer': tileName,
          ...style
        })
      } else {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if(style)
          if(style.source_name){
            map.addLayer({
              id: key + '_' + index,
              source: style.source_name,
              ...style
          });
          } else {
            map.addLayer({
              id: key + '_' + index,
              source: key,
              ...style
            });
          }
          addLayerProperties(key, index, style);
        }); 
      }
      addMapListeners(key); 
    }

    const showLayers = (key: string) => {

        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index)) {
                map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
                if (COMPONENT_LAYERS.tiles.includes(key) && filterComponents) {
                    showSelectedComponents(filterComponents.component_type.split(','));
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

    const hideLayers = (key: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index)) {
                map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
            }
        });
        if(key === STREAMS_FILTERS && styles[STREAMS_POINT]) {
          styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(STREAMS_POINT + '_' + index)) {
              map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'none');
            }
          })
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
            getDetailedPageProject(item.project_id || item.iditem.projectid || item.project_id)
        }
    }
    const highlithOnTap = (id: any) => {
        hideHighlighted();
        showHighlighted(id.layer, id.id);
    }
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
    }
    const [distanceValue, setDistanceValue] = useState('0');
    const [distanceValueMi, setDistanceValueMi] = useState('0');
    const [areaValue, setAreaValue] = useState('0');
    const finishMeasure = (type?: string) => {
      const size = type === 'line' ? 1 : 2;
      if(linestringMeasure.geometry.coordinates.length > size && isMeasuring){
        var line = turf.lineString(linestringMeasure.geometry.coordinates);
        var polygon = type === 'line' ? undefined : turf.lineToPolygon(JSON.parse(JSON.stringify(line)));
        const area = type === 'line' ? undefined : ( polygon ? turf.area(polygon) : undefined) ;
        if ( type !== 'line' && area) {
          setAreaValue((area * factorm2toacre).toLocaleString(undefined, {maximumFractionDigits: 2}));
        }
        const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
        const perimeter = turf.length(JSON.parse(JSON.stringify(newLS)));
        if (type === 'line') {
          line.properties = {
            id: geojsonMeasuresSaved.features.length, 
            coordinates: line.geometry?.coordinates,
            area: 0,
            perimeterFeet: (perimeter * factorKMtoFeet).toLocaleString(undefined, {maximumFractionDigits: 2}),
            perimeterMi: (perimeter * factorKMToMiles).toLocaleString(undefined, {maximumFractionDigits: 2}),
            type: 'line'
          };
          geojsonMeasuresSaved.features.push(line)
          map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
        } else if (polygon && area) {
          polygon.properties = { 
            id: geojsonMeasuresSaved.features.length, 
            coordinates: polygon.geometry?.coordinates,
            area: (area * factorm2toacre).toLocaleString(undefined, {maximumFractionDigits: 2}),
            perimeterFeet: (perimeter * factorKMtoFeet).toLocaleString(undefined, {maximumFractionDigits: 2}),
            perimeterMi: (perimeter * factorKMToMiles).toLocaleString(undefined, {maximumFractionDigits: 2}),
            type: 'polygon'
          }
          geojsonMeasuresSaved.features.push(polygon)
          map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
        }
        
        geojsonMeasures.features = [];
        linestringMeasure.geometry.coordinates =  [];
        map.getSource('geojsonMeasure').setData(geojsonMeasures);
        setIsDrawingMeasure(false);
        setIsMeasuring(false);
      }
    }

    // TODO: Move this function to service
    const measureCenterAndDelete = (type: any, item: any) => {
      if(type == 'center'){
        const coords = JSON.parse(item.coordinates);
        if (item.type == 'line') {
          const line = turf.lineString(coords);
          const bbox = turf.bbox(line);
          map.fitBounds(bbox, {padding:80});
        } else {
          const polygon = turf.polygon(coords);
          const bbox = turf.bbox(polygon);
          map.fitBounds(bbox, {padding:80});
        }
        
        
      } else if(type == 'delete') {
         geojsonMeasuresSaved.features = geojsonMeasuresSaved.features.filter(elem => elem.properties.id != item.id);
         popup.remove();
         map.getSource('geojsonMeasuresSaved').setData(geojsonMeasuresSaved);
      }

    }
   
    useEffect(() => {
      const eventToClick = eventclick;
      map.on('click', eventToClick);
      return () => {
        map.off('click', eventToClick);
      };
    }, [allLayers]);

        const eventclick =  async (e: any) => {
            if (isEdit) {
              editNoteWithElem(currentNote, editNote);
              isEdit= false
              newNote =  undefined;
              currentNote= undefined
            }
            if (newNote !== void(0) && isEdit === false) {
              createNoteWithElem(newNote, createNote);
              markerNote.remove();
              popup.remove();
              isEdit= false
              newNote =  undefined;
              currentNote= undefined
            }
            if(markerGeocoder){
              markerGeocoder.remove();
              setMarkerGeocoder(undefined);
            }
            if(searchMarker){
              searchMarker.remove();
              setKeyword('');
            }
            if(isMeasuring) {
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
                setDistanceValueMi
              );
            } else {
              if(markersNotes.length > 0 ){
                markersNotes.forEach((marker:any) => {
                  marker.marker._popup.remove();
                });
              }
              if (commentAvailable && canAdd.value) {
                const html = commentPopup(handleComments,handleDeleteNote);
                popup = new mapboxgl.Popup({
                  closeButton: false, 
                  offset: { 
                    'top': [0, 10],
                    'bottom': [0, -10],
                    'left': [10,0],
                    'right': [-10,0]
                  }
                });
                markerNote.setPopup(popup);
                popup.setDOMContent(html);
                markerNote.setLngLat([e.lngLat.lng, e.lngLat.lat]).setPopup(popup).addTo(map).togglePopup();
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
            const bbox = [e.point.x , e.point.y ,
            e.point.x , e.point.y ];
            setMobilePopups([]);
            setActiveMobilePopups([]);
            setSelectedPopup(-1);
              
            const measureFeature = map.queryRenderedFeatures(bbox, { layers: ['measuresSaved', 'measuresSaved-border', 'measuresSaved-border-invisible'] });
            if(measureFeature.length){
              let measure = measureFeature[0];
              const item = {
                layer: MENU_OPTIONS.MEASURES,
                coordinates: measure.properties.coordinates,
                area: measure.properties.area, 
                perimeterFeet: measure.properties.perimeterFeet,
                perimeterMi: measure.properties.perimeterMi,
                id: measure.properties.id,
                type: measure.properties.type
              }
              menuOptions.push(MENU_OPTIONS.MEASURES);
              popups.push(item);
              mobile.push(item);
              mobileIds.push({layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id});
              ids.push({layer: measure.layer.id.replace(/_\d+$/, ''), id: measure.properties.id});
            } else {
             await addPopupsOnClick(
                map,
                bbox, 
                allLayers,
                coordX,
                coordY,
                e,
                galleryProjectsV2,
                mobile,
                menuOptions,
                popups,
                mobileIds,
                ids,
                userInformation,
                () => {},
                () => {},
                [],
                MAPTYPES.MAINMAP
              );
           }
            if (popups.length) { 
              popup.remove();
              popup = new mapboxgl.Popup({closeButton: true,});
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
                  ids
                )
            }
            }
           
        };
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
                id: details.id !== '-'? details.id: undefined,
                objectid: details.objectid,
                cartoid: details.valueid,
                type: details.type,
                value: details.valueid,
                problemid: ''
            });
        }

    }
    const createProject = (details: any) => {
      popup.remove();
        if (details.problemid) {
            setDataProblem({
                id: '',
                objectid: '',
                cartoid: '',
                type: '',
                value: '',
                problemid: details.problemid
            });
        }
        if(details.layer === 'Components') {
          let newComponents = [{
            cartodb_id: details.cartodb_id?details.cartodb_id:'',
            jurisdiction: details.jurisdiction?details.jurisdiction:'',
            original_cost: details.original_cost?details.original_cost:'',
            problem_id: details.problemid ? details.problemid : '',
            status: details.status?details.status:'',
            source_table_name: details.table?details.table:'',
            type: details.type?details.type:'',
            object_id: details.type?details.objectid:''
          }];
          setComponentsFromMap(newComponents);
          getComponentGeom(details.table, details.objectid);
          setProblemId('-1');
          setTimeout(()=>{
            getZoomGeomComp(details.table, details.objectid);
          },4500 );
          setShowDefault(true);
        } else if (details.type === 'problems') {
          getAllComponentsByProblemId(details.problemid);
          setProblemId(details.problemid);
          setShowDefault(true);
        }else {
          setShowDefault(false);
          setComponentsFromMap([]);
        }
        setVisibleCreateProject(true);
    }
    useEffect(()=>{
      if(visibleCreateProject && dataProblem.problemid){
        getZoomGeomProblem(dataProblem.problemid);
      }
    },[visibleCreateProject]);
    const addMapListeners = (key: string) => {
        const styles = { ...tileStyles as any };
        const availableLayers: any[] = [];
        if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (!map.getLayer(key + '_' + index)) {
                    return;
                }
                availableLayers.push(key + '_' + index);
                if(style.type != 'symbol') {
                  map.on('mousemove', key + '_' + index, (e: any) => {
                      if (commentAvailable || isMeasuring) {
                          return;
                      }
                      if (hovereableLayers.includes(key)) {

                          if(e.features[0].source.includes('mhfd_projects')){
                            showHighlighted(key, e.features[0].properties.projectid);
                          }else{
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
              map.getCanvas().style.cursor = 
                  (!(canAdd.value && commentAvailable) && !isMeasuring)
                  ? 'default'
                  : 'crosshair';
            });
        }
    }

    const selectCheckboxes = (selectedItems: Array<LayersType>) => {
        const deleteLayers = selectedLayers.filter((layer: any) => !selectedItems.includes(layer as string));
        deleteLayers.forEach((layer: LayersType) => {
          if(layer === 'border' || layer === 'area_based_mask') {
            removeLayerMask(layer);
          } else {
            removeTilesHandler(layer);
          }
            
        });
        updateSelectedLayers(selectedItems);
    }
    const removeTilesHandler = (selectedLayer: LayersType) => {
        if (typeof selectedLayer === 'object') {
            selectedLayer.tiles.forEach((subKey: string) => {
                hideLayers(subKey);
            });
        } else {
            hideLayers(selectedLayer);
        }
    }
    const renderOption = (item: any) => {
      return {
        key: `${item.text}|${item.place_name}`,
        value: `${item.center[0]},${item.center[1]}?${item.text}|${item.place_name}`,
        label: <div className="global-search-item">
          <h6 style={{ whiteSpace: 'normal' }}>{item.text}</h6>
          <p>{item.place_name}</p>
        </div>
      };
    };
    const [keyword, setKeyword] = useState('');
    const handleSearch = (value: string) => {
        setKeyword(value)
        mapSearchQuery(value);
    };

    const onSelect = (value: any) => {
        console.log('onSelect:::', value);
        const keyword = value.split('?');
        const coord = keyword[0].split(',');
        const titleObject = getTitle(keyword[1]);
        map.flyTo({ center: coord, zoom: 14.5 });
        const placeName = keyword[1];
        setKeyword(placeName);
        searchMarker.remove();        
        searchMarker = new mapboxgl.Marker({ color: "#F4C754", scale: 0.7 });
        searchMarker.setLngLat(coord);
        map.once('moveend', (e:any) => { 
          const point = map.project(coord);
          const features = map.queryRenderedFeatures(point, { layers: ['counties-background', 'municipalities-background', 'watershed_service_areas-background'] });
          const mobile = [], menuOptions = [], popups = [], ids = [];
          let counties = 1, municipalities = 1, watershed_service_areas = 1;
          for (const feature of features) {
              if (feature.source === 'watershed_service_areas' && watershed_service_areas) {
                  watershed_service_areas--;
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
              if (feature.source === 'counties' && counties) {
                counties--; 
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
            if (feature.source === 'municipalities' && municipalities) {  
                municipalities--;
                const item = {
                  layer: MENU_OPTIONS.MUNICIPALITIES,
                  feature: feature.properties.city ? feature.properties.city : '-',
              }
              mobile.push({
                  layer: item.layer,
                  feature: item.feature
              })
              menuOptions.push(MENU_OPTIONS.MUNICIPALITIES);
              popups.push(item);
              ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
            }
          }
          if (popups.length) {
            setMobilePopups(mobile);
            setSelectedPopup(0);
            addPopupServiceCountyMunicipality(
              menuOptions,
              popups,
              userInformation,
              titleObject,
              searchPopup,
              map,
              showPopup,
              seeDetails,
              createProject,
              ids,
              coord, 
              searchMarker,
              setKeyword, 
              setMarkerGeocoder
            );
          }
        } )
       
    };
    const flyTo = (longitude: number, latitude: number, zoom?: number) => {
        map.flyTo({
            center: [longitude, latitude],
            zoom: zoom ?? 15 
            });
    }

    const openEditNote = (note: any) => {
      flyTo(note.longitude, note.latitude, 16.5);
      popup.remove();
      openMarkerOfNoteWithoutAdd(
        note,
        markersNotes,
        // eventsOnClickNotes
      );
    }

    const setSideBarStatus = (status: boolean) => {
        setCommentVisible(status);
        setOpen(status);
    }
    const [measuringState, setMeasuringState] = useState(isMeasuring);
    const [measuringState2, setMeasuringState2] = useState(isMeasuring);
    const [isdrawingmeasure, setIsDrawingMeasure] = useState(false);
    const setIsMeasuring = (value: boolean) => {
      isMeasuring = value;
      setMeasuringState2(value);
      setMeasuringState(false);
      geojsonMeasures.features = [];
      linestringMeasure.geometry.coordinates =  [];
      setDistanceValue('0');
      setDistanceValueMi('0');
      setAreaValue('0');
      if(map.getSource('geojsonMeasure')){
        map.getSource('geojsonMeasure').setData(geojsonMeasures);
      }
    }
    return (
        <>
        {
          commentVisible &&
          <SideBarComment
            visible={commentVisible}
            setVisible={setSideBarStatus}
            flyTo={flyTo}
            openEditNote={openEditNote}
            addToMap={addToMap}
          />
        }
        <div>
          {
            visibleCreateProject &&
            <ModalProjectView
              visible= {visibleCreateProject}
              setVisible= {setVisibleCreateProject}
              data={"no data"}
              showDefaultTab={showDefault}
              locality= {autocomplete}
              editable = {true}
              problemId= {problemid}
            />
            }
        </div>

        <div className="map">
          {
            isProblemActive && <div className="legendProblemTypemap">
              <h5>
                Problem Type
                <Popover
                  content={<div className='popoveer-00'>
                    <p style={{fontWeight:'600'}}>Problem Types</p>
                    <p><span style={{fontWeight:'600'}}>Flood Hazard </span> Problems related to existing flood or fluvial hazard to life and property.</p>
                    <p><span style={{fontWeight:'600'}}>Stream Condition </span> Problems related to the physical, environmental, and social function or condition of the stream in an urban context.</p>
                    <p><span style={{fontWeight:'600'}}>Watershed Change </span>  Problems related to flood waters that may pose safety or functional concerns related to people, property, and the environment due to changing watershed conditions (land use, topography, regional detention, etc).</p>
                  </div>}
                >
                  <InfoCircleOutlined style={{marginLeft: '35px', color: '#bfbfbf'}}/>
                </Popover>              </h5>
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
          }

          <span className="zoomvaluemap"><b>Nearmap: March 19, 2023</b><b style={{paddingLeft:'10px'}}>Zoom Level: {zoomValue}</b></span>
            {
              visible &&
              <DetailModal
                visible={visible}
                setVisible={setVisible}
                data={data}
                type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
              />
            }
            {
              (mobilePopups.length && window.innerWidth < 700) &&
              <MobilePopup
                seeDetails={seeDetails}
                items={mobilePopups} />
            }
            <div ref={divMapRef} className='map-style' />
            <div className="m-head">
                <MapDropdownLayers
                  selectCheckboxes={selectCheckboxes}
                  selectedLayers={selectedLayers}
                  removePopup={removePopup}
                />
                <AutoComplete
                    dropdownMatchSelectWidth={true}
                    style={{ width: 240 }}
                    options={mapSearch.length > 0 ? ([...mapSearch.map(renderOption), {}]) : mapSearch.map(renderOption)}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    value={keyword}
                >
                  <Input.Search allowClear placeholder="Stream or Location"  />
                </AutoComplete>
            </div>
            <div className="measure-button">
              {!measuringState && <Button style={{ borderRadius: '4px' }} onClick={()=>setMeasuringState(true)} ><img className="img-icon" alt="" /></Button>}
              {measuringState && 
              <div className='measurecontainer'> 
                <div id={'measure-block'} className="measure-block" onClick={()=> setMeasuringState(false)}>
                    <div className="headmap">
                        <h4>Measure distances and areas</h4>
                        <button className='close-measure-button' onClick={()=>setIsMeasuring(false)} ></button>
                    </div>
                    <hr style={{opacity: 0.4, width: '96%'}}></hr>
                    <div className="bodymap" onClick={() => setIsMeasuring(true)}>
                      <b>
                        <img className='img-measure-00'  src='/Icons/fi_play-circle.svg' alt="Create new measurement"></img>
                        Create a new measurement
                      </b>
                    </div>
                </div>
              </div>}
              {
                measuringState2 && 
                <div className='measurecontainer'  > 
                  <div id={'measure-block'} className="measure-block">
                    <div className="headmap">
                      <h4>Measure distances and areas</h4>
                      <button className='close-measure-button' onClick={()=>setIsMeasuring(false)} ></button>
                    </div>
                    <hr style={{opacity: 0.4, width: '96%'}}></hr>
                    <div className="bodymapvalues" >
                      {
                        distanceValue == '0' && areaValue =='0' ? 
                        <span>Start creating a measurement by adding points to the map</span>
                        :<><span >Distance: <b>{distanceValue} Feet ({distanceValueMi} Miles)</b> </span>
                        <span >Area: <b>{areaValue} Acres</b> </span></>
                      }
                       
                    </div>
                    <hr style={{opacity: 0.4, width: '96%'}}></hr>
                    <p className='paragraph'> 
                      {
                        !isdrawingmeasure && 
                        <span className="button-c" style={{marginLeft:'-1px'}} onClick={()=>setIsMeasuring(false)}>
                          <a style={{color:'#11093C'}}>
                            <img className='img-measure-05' alt="Cancel"></img>
                            <b>Cancel</b>
                          </a>
                        </span >
                      }
                      {  
                        isdrawingmeasure && 
                        <span className="button-c" style={{paddingLeft:'20px'}} onClick={()=>finishMeasure('line')}>
                          <a style={{color:'#11093C'}}>
                            <img className='img-measure-png-01' src='/Icons/icon-line.png' alt="Finish Line"></img>
                            <b>Finish Line</b>
                          </a>
                        </span >
                      }
                      {  
                        isdrawingmeasure && 
                        <span className="button-c" style={{paddingLeft:'22px'}} onClick={()=>finishMeasure('polygon')}>
                          <a style={{color:'#11093C'}}>
                            <img className='img-measure-png-02' src='/Icons/icon-polygon.png' alt="Finish Polygon"></img>
                            <b>Finish Polygon</b>
                          </a>
                        </span >
                      }
                    </p>
                  </div>
                </div>
              }
            </div>
            
            <SideMenuTools
              map={map}
              setCommentVisible={setCommentVisible}
              mapService={mapService}
              isMobile={isMobile}
            />
            {
              isMobile && <MobileMenu />
            }
        </div>
    </>
    )
}

export default Map;
