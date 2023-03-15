import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { measureFunction, addPopupAndListeners, addPopupServiceCountyMunicipality, addPopupsOnClick } from './MapFunctionsPopup';
import { InfoCircleOutlined } from "@ant-design/icons";
import MapFilterView from '../../../Components/Shared/MapFilter/MapFilterView';
import { Dropdown,  Button, Popover } from 'antd';
import { MapProps, ObjectLayerType, LayerStylesType } from '../../../Classes/MapTypes';
import {
    SWITCHES_MAP,
    MAP_DROPDOWN_ITEMS,
    MAPBOX_TOKEN,
    PROBLEMS_TRIGGER,
    PROJECTS_TRIGGER,
    COMPONENT_LAYERS,
    STREAMS_FILTERS,
    SELECT_ALL_FILTERS,
    MAP_RESIZABLE_TRANSITION, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, MHFD_PROJECTS,
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
    FEMA_FLOOD_HAZARD
} from "../../../constants/constants";
import { 
  COMPONENT_LAYERS_STYLE,
  tileStyles, widthLayersStream,
  NEARMAP_STYLE,
  USE_LAND_TILES_STYLE
} from '../../../constants/mapStyles';
import { addMapGeocoder } from '../../../utils/mapUtils';
import { Input, AutoComplete } from 'antd';
import { useMapState, useMapDispatch } from '../../../hook/mapHook';
import { useColorListDispatch, useColorListState } from '../../../hook/colorListHook';
import { useProjectDispatch } from '../../../hook/projectHook';
import { setOpacityLayer } from '../../../store/actions/mapActions';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer, ScatterplotLayer} from '@deck.gl/layers';
import MapService from '../../../Components/Map/MapService';
import MobilePopup from '../../../Components/MobilePopup/MobilePopup';
import { ModalProjectView } from '../../../Components/ProjectModal/ModalProjectView';
import SideBarComment from '../../../Components/Map/SideBarComment';
import { useNoteDispatch, useNotesState } from '../../../hook/notesHook';
import { useProfileState } from '../../../hook/profileHook';
import { addGeojsonSource, removeGeojsonCluster } from './MapFunctionsCluster';
import { flytoBoundsCoor, getTitle, polyMask, depth} from './MapFunctionsUtilities';
import {clickingCircleColor, clickingOptions, clickingAddLabelButton, clickingUnFocusInput, clickingColorElement, rotateIcon} from '../../../Components/Map/commetsFunctions';
import { GlobalMapHook } from '../../../utils/globalMapHook';
import { useDetailedState } from '../../../hook/detailedHook';
import MobileMenu from './MobileMenu';
import SideMenuTools from './SideMenuTools';
import { commentPopup } from './MapGetters';
import { hovereableLayers } from '../constants/layout.constants';
import EventService from '../../../services/EventService';
import {
  createNoteWithElem,
  editNoteWithElem,
  clickoutsideList,
  addListonPopupNotes,
  openMarkerOfNoteWithoutAdd
} from './MapFunctionsNotes';
import DetailModal from 'routes/detail-page/components/DetailModal';

let map: any = null;
let searchMarker = new mapboxgl.Marker({ color: "#F4C754", scale: 0.7 });
let searchPopup = new mapboxgl.Popup({closeButton: true,});
let popup = new mapboxgl.Popup({closeButton: true,});
let currentElement: any = {
  label: 'Map Note', 
  color: "#F6BE0F",
  opacity: 1, 
  color_id: undefined
}
type LayersType = string | ObjectLayerType;
let coordX = -1;
let coordY = -1;
const factorKMToMiles = 0.621371;
const factorKMtoFeet =  3280.8;
const factorm2toacre = 0.00024710538146717;
let itMoved = false;
let globalMapId: string | null = null;

const marker = new mapboxgl.Marker({ color: "#ffbf00", scale: 0.7 });
const docNote = document.createElement('div');
      docNote.className = 'marker-note';
const markerNote = new mapboxgl.Marker(docNote);
let momentaryMarker = new mapboxgl.Marker({color:'#FFFFFF', scale: 0.7});
let markerNotes_global: any = [];
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
let listOfElements = [{
  color: '#FFE120',
  label: `Jon's issue`
},{
  color: "#66D4FF",
  label:  "New projects"
},{
  color: "#6FC699",
  label: "Previous Works"
},{
  color: "#E45360",
  label:  "Color"
}];

const Map = ({
    leftWidth
}: MapProps) => {
  const {
    updateSelectedLayers,
    setFilterCoordinates,
    existDetailedPageProject,
    existDetailedPageProblem,
    setSelectedOnMap,
    getParamsFilter,
    mapSearchQuery,
    setBoundMap,
    getParamFilterComponents,
    getParamFilterProblems,
    getParamFilterProjects,
    setCoordinatesJurisdiction,
    setSpinMapLoaded,
    setSelectedPopup,
    getProjectsFilteredIds
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
    filterProblems,
    filterProjects,
    filterComponents,
    componentDetailIds,
    mapSearch,
    applyFilter,
    zoomProblemOrProject: zoom,
    projectsids
  } = useMapState();
  const {
    detailed,
  } = useDetailedState();
    let geocoderRef = useRef<HTMLDivElement>(null);

    const dropdownItems = { default: 1, items: MAP_DROPDOWN_ITEMS };
    // uncomment on NOTES ready
    const { notes } = useNotesState();
    const { getNotes, createNote, editNote, setOpen, deleteNote } = useNoteDispatch();
    const {setComponentsFromMap, getAllComponentsByProblemId, getComponentGeom, getZoomGeomProblem, getZoomGeomComp} = useProjectDispatch();
    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [mobilePopups, setMobilePopups] = useState<any>([]);
    const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
    const [visibleCreateProject, setVisibleCreateProject ] = useState(false);
    const [problemid, setProblemId ] = useState<any>(undefined);
    const [problemClusterGeojson, setProblemClusterGeojson] = useState(undefined);
    const [notesFilter, setNotesFilter] = useState('all');
    const { colorsList } = useColorListState();
    const { getColorsList, createColorList, updateColorList, deleteColorList} = useColorListDispatch();
    const [zoomValue, setZoomValue] = useState(0);
    const { addHistoric, getCurrent } = GlobalMapHook();
    const colors = {
        RED: '#FF0000',
        ORANGE: '#FA6400',
        GREY: 'rgb(142, 132, 132)',
        YELLOW: '#ffbf00'
    };
    const colorsCodes = {
      RED: 'rgb(255, 0, 0)',
      ORANGE:  'rgb(250, 100, 0)',
      GREY: 'rgb(142, 132, 132)',
      YELLOW: '#ffbf00'
    }
    const [markersNotes, setMarkerNotes] = useState([]) ;
    const [markerGeocoder, setMarkerGeocoder] = useState<any>(undefined);
    const { userInformation, groupOrganization } = useProfileState();
    const [visible, setVisible] = useState(false);
    const [zoomEndCounter, setZoomEndCounter] = useState(0);
    const [dragEndCounter, setDragEndCounter] = useState(0);
    const [allLayers, setAllLayers] = useState<any[]>([]);
    const [mapService] = useState<MapService>(new MapService());
    const [commentVisible, setCommentVisible] = useState(false);
    const [, setSwSave] = useState(false);
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

    useEffect(()=>{
      const user = userInformation;
      if (user?.polygon[0]) {
        let myPolygon: any = [];
        const depthPolygon = depth(userInformation.polygon);
        if (depthPolygon == 4) {
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
        } else if (depthPolygon == 2) {
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
    const [counterPopup] = useState({ componentes: 0 });

    useEffect(() => {
        const div = document.getElementById('popup');
        if (div != null) {
            div.innerHTML = `${counterPopup.componentes}`;
        }
    }, [counterPopup]);

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
            if(!(notesFilter != 'all' && notesFilter != note.color)) {
              let colorOfMarker = note?.color?.color?note?.color?.color:'#F6BE0F';
              const doc = document.createElement('div');
              doc.className = 'marker-note';
              doc.style.backgroundColor = colorOfMarker;
              const newmarker = new mapboxgl.Marker(doc);
              const html = commentPopup(note);
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
                  newmarker.setLngLat([note.longitude, note.latitude]).setPopup(newpopup);
                  newmarker.getElement().addEventListener('click', () => {
                    addEvents(note, [note.longitude, note.latitude]);
                  });
              totalmarkers.push({ marker: newmarker, note: note});
            }
          });
          setMarkerNotes(totalmarkers);
        }
    }, [notes, notesFilter]);
 
    const eventsOnClickNotes = (noteClicked:any) => {
      const div = document.getElementById('color-list');
        if (div != null) {
            momentaryMarker.remove(); 
            document.getElementById('id-list-popup')?.remove();
            const ul = document.createElement('ul');
                  ul.style.display = 'none';
                  ul.classList.add("list-popup-comment");
                  ul.classList.add('legend');
                  ul.setAttribute('id','id-list-popup');
            div.addEventListener('click', () => {
                if (ul.style.display === 'none') {
                    ul.style.display = 'block';
                    rotateIcon('up');
                    clickoutsideList(listOfElements, rotateIcon);
                } else {
                    ul.style.display = 'none';
                    rotateIcon('down');
                }
            });
            addListToPopupNotes(ul,div,noteClicked);
            

            const colorable = document.getElementById('colorable');
           
            
            const save = document.getElementById('save-comment');
            if (save != null) {
                save.addEventListener('click', () => {
                    const textarea = (document.getElementById('textarea') as HTMLInputElement);
                    if (textarea != null) {
                        let color = '';
                        if (colorable != null) {
                            if (colorable.style.color === colorsCodes.RED) {
                                color = 'red';
                            } else if (colorable.style.color === colorsCodes.ORANGE) {
                                color = 'orange';
                            } else if (colorable.style.color === colorsCodes.GREY) {
                                color = 'grey';
                            } else {
                                color = 'yellow';
                            }
                        }
                        const note = {
                            color: color,
                            note_text: textarea.value,
                            latitude: noteClicked.latitude,
                            longitude: noteClicked.longitude
                        };
                        // UN COMMENT FOR NOTES
                        createNoteWithElem(note, createNote);
                        
                        popup.remove();
                        marker.remove();
                        markerNote.remove();
                    }
                });
            }
            const edit = document.getElementById('edit-comment');
            if (edit != null) {
              edit.addEventListener('click', () => {
                  const textarea = (document.getElementById('textarea') as HTMLInputElement);
                  if (textarea != null) {
                    let color = '';
                    if (colorable != null) {
                        if (colorable.style.color === colorsCodes.RED) {
                            color = 'red';
                        } else if (colorable.style.color === colorsCodes.ORANGE) {
                            color = 'orange';
                        } else if (colorable.style.color === colorsCodes.GREY) {
                            color = 'grey';
                        } else {
                            color = 'yellow';
                        }
                    }
                    const note = {
                        newnotes_id: noteClicked.newnotes_id,
                        color: color,
                        note_text: textarea.value,
                        latitude: noteClicked.latitude,
                        longitude: noteClicked.longitude
                    };
                    // UNCOMMENT WHEN NOTES IS READY
                    editNoteWithElem(note, editNote);

                  }
              });
            }
            const del = document.getElementById('delete-comment');
            if (del != null) {
              del.addEventListener('click', () => {
                let noteId = del.getAttribute('value');
                // UN COMMENT WHEN NOTES IS READY 
                deleteNote(noteId);
              });
            }
        }
    }
    const addEvents = (noteClicked: any, coord:any) => {
      
      
      setTimeout(()=>{
        eventsOnClickNotes(noteClicked);
          const div = document.getElementById('id-list-popup');
          if (div != null){
              div.style.display = 'none';
          }

        return;
      },1000);
    }
    useEffect(()=>{
      markerNotes_global = markersNotes;
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
    
    useEffect(() => {
      let mask;
      if (coordinatesJurisdiction?.length > 0 && map && map.isStyleLoaded()) {
        // console.log('DEPTH', depth(coordinatesJurisdiction), 'Coordinates Jurisdiction', coordinatesJurisdiction, "STREING", JSON.stringify(coordinatesJurisdiction));
        const DEPTH = depth(coordinatesJurisdiction);
        if (DEPTH == 4) {
          mask = turf.multiPolygon(coordinatesJurisdiction);
        } else {
          mask = turf.polygon(coordinatesJurisdiction);
        }
        // PREVIOUS SQUARE OF MHFD 
        // let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
        // LARGER BECAUSE SOME COUNTIES AND SERVICE AREAS ARE BIGGER 
        let misbounds = -106.10771487514684 + ',' + 39.094858978187546 + ',' + -103.58537218284262 + ',' + 40.470609601267824;
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
          if (opacityLayer) {
              if  (map.loaded()) {
                  if (map.getLayer('mask')) {
                      map.setLayoutProperty('mask', 'visibility', 'visible');
                      map.removeLayer('mask');
                      map.removeSource('mask');
                  }
              }
          }

      }
  }, [coordinatesJurisdiction]);

    useEffect(() => {
        if (map) {
            applyFilters(PROBLEMS_TRIGGER, filterProblems);
        }
    }, [filterProblems,zoomEndCounter, dragEndCounter]);

    // useEffect(() => {
    //     if (map) {
    //       applyFilters(MHFD_PROJECTS, filterProjects);
    //     }
    // }, [filterProjects, componentDetailIds]);
    useEffect(() => {
      // if(projectsids.length) {
        applyFilters(MHFD_PROJECTS, filterProjectOptions);
      // }
    }, [projectsids]);

    useEffect(() => {
        if (map) {
            for (const component of COMPONENT_LAYERS.tiles) {
                applyFilters(component, filterComponents);
            }
            applyFilters(MHFD_PROJECTS, filterProjectOptions);
            applyFilters(PROBLEMS_TRIGGER, filterProblems);
        }
    }, [filterComponents, componentDetailIds]);

    useEffect(() => {
      /// UNCOMMENT WHEN NOTES IS READY
      getNotes();
        (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
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

        map.on('render', () => {
            if (!globalMapId && itMoved) {
                const center = [map.getCenter().lng, map.getCenter().lat];
                const bbox = [map.getBounds()._sw.lng, map.getBounds()._sw.lat, 
                  map.getBounds()._ne.lng, map.getBounds()._ne.lat];
                addHistoric({center, bbox});
            }
            globalMapId = null;
            itMoved = false;
        });

        let value = 0;
        let _ = 0;
        map.on('zoomend', () => {
            mapService.hideOpacity();
            setZoomEndCounter(_++);
            setOpacityLayer(false)
            value += 1;
            if (value >= 2) {
                const bounds = map.getBounds();
                const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
                setBoundMap(boundingBox);
                // if (applyFilter) {
                //     if (toggleModalFilter) {
                //         if (filterTabNumber === PROJECTS_TRIGGER) {
                //             getParamFilterProjects(boundingBox, filterProjectOptions);
                //         } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                //             getParamFilterProblems(boundingBox, filterProblemOptions);
                //         } else {
                //             getParamFilterComponents(boundingBox, filterComponentOptions);
                //         }
                //         getParamsFilter(boundingBox);
                //     } else {
                //         setFilterCoordinates(boundingBox, tabCards);   // This is commented because the zoonendcounter will trigger useeffect with the same function
                //     }
                // }
            }

        });
        let __ = 1;
        map.on('dragend', () => {
            mapService.hideOpacity();
            setDragEndCounter(__++);
            setOpacityLayer(false)
            const bounds = map.getBounds();
            const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
            setBoundMap(boundingBox);
            // if (applyFilter) {
            //     if (toggleModalFilter) {
            //         if (filterTabNumber === PROJECTS_TRIGGER) {
            //             getParamFilterProjects(boundingBox, filterProjectOptions);
            //         } else if (filterTabNumber === PROBLEMS_TRIGGER) {
            //             getParamFilterProblems(boundingBox, filterProblemOptions);
            //         } else {
            //             getParamFilterComponents(boundingBox, filterComponentOptions);
            //         }
            //     } else {
            //         // setFilterCoordinates(boundingBox, tabCards);  // This is commented because the zoonendcounter will trigger useeffect with the same function
            //     }
            // }
        });
        const updateZoom = () => {
            const zoom = map.getZoom().toFixed(2);
            setZoomValue(zoom);
        }
        map.on('load', updateZoom);
        map.on('move', updateZoom);
        map.on('dragend', () => {
            itMoved = true;
        });
        getColorsList();
        getProjectsFilteredIds();
    }, []);
    const removeAllChildNodes = (parent:any) => {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
    }
    const updateColorsList = () => {
      let ul = document.getElementById('id-list-popup');
      let div = document.getElementById('color-list');
      if(ul != null && div != null){ 
        removeAllChildNodes(ul);
        addListToPopupNotes(ul, div);
      }
    }
    useEffect(() => {
      listOfElements = colorsList;
      updateColorsList();
      // uncomment when notes is ready
      getNotes();
    },[colorsList]);
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
        const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
        setBoundMap(boundingBox);
        let defaultBounds = `${-105.3236683149282},${39.274174328991904},${-104.48895750946532},${40.26156304805423}`;
        if (toggleModalFilter) { // if tab of filters is open 
          if (filterTabNumber === PROJECTS_TRIGGER) {
              getParamFilterProjects(applyFilter ? boundingBox : defaultBounds, filterProjectOptions);
          } else if (filterTabNumber === PROBLEMS_TRIGGER) {
              getParamFilterProblems(applyFilter ? boundingBox : defaultBounds, filterProblemOptions);
          } else {
              getParamFilterComponents(applyFilter ? boundingBox : defaultBounds, filterComponentOptions);
          }
        } else {
          setFilterCoordinates(applyFilter ? boundingBox : defaultBounds, tabCards);
        }
    }, [applyFilter, zoomEndCounter, dragEndCounter]);
    useEffect(() => {
        if (zoom?.length > 0) {
            map.fitBounds([zoom[0], zoom[2]], { padding: 100 });
        }
    }, [zoom]);

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
    // useEffect(() => {
    //     map.setStyle(dropdownItems.items[dropdownItems.default].style);
    // }, [dropdownItems.items[dropdownItems.default].style]);

    useEffect(() => {
        const mapResize = () => map.resize();
        for (let i = 0; i <= MAP_RESIZABLE_TRANSITION * 1000; i = i + 25) {
            setTimeout(() => mapResize(), i);
        }
    }, [leftWidth]);

    useEffect(() => {
      const waiting = () => {
        if (!map.isStyleLoaded()) {
            setTimeout(waiting, 250);
        } else {
            applySkyMapLayer();
            applyMapLayers();
            if (JSON.stringify(initFilterProblems) == JSON.stringify(filterProblems)) {
              applyProblemClusterLayer();
            }
            setSpinMapLoaded(false);
            applyNearMapLayer();
            //applyTileSetLayer();
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
        }
    };
    waiting();
        // map.on('style.load', () => {
        //     const waiting = () => {
        //         if (!map.isStyleLoaded()) {
        //             setTimeout(waiting, 250);
        //         } else {
        //             applySkyMapLayer();
        //             applyMapLayers();
        //             setSpinMapLoaded(false);
        //             applyNearMapLayer();
        //             applyProblemClusterLayer();
        //             applyMeasuresLayer();
        //         }
        //     };
        //     waiting();
        // });
        // if (map.isStyleLoaded()) {
        //     applyMapLayers();
        //     setSpinMapLoaded(false);
        // } else {
        //     const waiting = () => {
        //         if (!map.isStyleLoaded()) {
        //             setTimeout(waiting, 250);
        //         } else {
        //             //applyMapLayers();
        //             setSpinMapLoaded(false);
        //         }
        //     };
        //     waiting();
        // }
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
        // console.log('About to add');
        map.addSource(sourceNameTile, {
          "url": `mapbox://${sourceNameTile}`,
          "type": "vector"
        });
        map.addLayer({
          'id': 'douglas',
          'type': 'fill',
          'source': sourceNameTile,
          'source-layer': tileName,
          // 'type': 'line',
          // 'source-layer': 'pluto15v1',
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
        setTimeout(() => {
          //console.log(map.getStyle().layers);
        }, 3500);
      }
    }

    const applyProblemClusterLayer = () => {
      datasets.getData(SERVER.MAP_PROBLEM_TABLES).then((geoj:any) => {
        addGeojsonSource(map, geoj.geom, isProblemActive);
        setProblemClusterGeojson(geoj.geom);
      });
    }
    const applyMapLayers = async () => {
        await SELECT_ALL_FILTERS.forEach(async (layer) => {          
            if (typeof layer === 'object') {
              if (layer.name === USE_LAND_COVER_LABEL && process.env.REACT_APP_NODE_ENV !== 'prod') {
                await selectedLayers.forEach((layer: LayersType) => {
                  if (typeof layer === 'object' && layer.name === USE_LAND_COVER_LABEL) {
                    applyTileSetLayer();
                    layer.tiles.forEach((tile: string) => {
                      addTileSource(tile);
                    });
                  }
                })
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
                addLayersSource(layer, layerFilters[layer]);
            }
        });
        await selectedLayers.forEach((layer: LayersType) => {
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
            topStreams()
            topEffectiveReaches();
            topProjects();
            topHovereableLayers();
            topStreamLabels();
            topLabels();
            topServiceArea();
            topComponents();
            topFemaFH();
            if (map.getLayer('area_based_maskMASK')) {
              map.moveLayer('area_based_maskMASK');
            }
            if (map.getLayer('borderMASK')) {
              map.moveLayer('borderMASK');
            }
            
        },300);
    }
    const topHovereableLayers = () => {
      const styles = { ...tileStyles as any };
      hovereableLayers.forEach((key:any) => {
        // console.log('key to chec', key, styles[key]);
        styles[key].forEach((style: LayerStylesType, index: number) => {
          if (!hovereableLayers.includes(key)) {
            return;
          }
          if(map.getLayer(key + '_highlight_' + index)) {
            map.moveLayer( key + '_highlight_' + index, )  
          }
        })
      })
    }
    const topFemaFH = () => {
      const styles = { ...tileStyles as any };   
        styles[FEMA_FLOOD_HAZARD].forEach((style: LayerStylesType, index: number) => {
          map.moveLayer(`${FEMA_FLOOD_HAZARD}_${index}`);
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
    const topServiceArea = () => {
      const styles = { ...tileStyles as any };
        styles[SERVICE_AREA_FILTERS].forEach((style: LayerStylesType, index: number) => {
          if (map.getLayer(`${SERVICE_AREA_FILTERS}_${index}`)) {
            map.moveLayer(`${SERVICE_AREA_FILTERS}_${index}`);  
          }
        })
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
    const applyFilters = useCallback((key: string, toFilter: any) => {
      // console.log('toFilter',toFilter)
      // console.log('filterpro', filterProjectOptions);
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (!map?.getLayer(key + '_' + index)) {
                return;
            }
            const allFilters: any[] = ['all'];
            if (key !== MHFD_PROJECTS) {
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
                            if (searchEquivalentinProblemBoundary(filterField) === 'component_status' || searchEquivalentinProblemBoundary(filterField) === 'estimated_cost') {
                              allFilter.push(['has', searchEquivalentinProblemBoundary(filterField)]); 
                            }
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
            } else {
              //console.log('projectsids', projectsids)
              allFilters.push(['in', ['get','projectid'], ['literal', projectsids]]);
            }
            
            // if(!(toFilter['projecttype'] && toFilter['projecttype']) && style.filter) {
            //   allFilters.push(style.filter);
            // }
            if (componentDetailIds && componentDetailIds[key] && key != MHFD_PROJECTS && key != PROBLEMS_TRIGGER) {
                allFilters.push(['in', ['get', 'cartodb_id'], ['literal', [...componentDetailIds[key]]]]);
            }
            if (key == PROBLEMS_TRIGGER && problemClusterGeojson) {
              addGeojsonSource(map, problemClusterGeojson, isProblemActive, allFilters);
            }
            if (map.getLayer(key + '_' + index)) {
                map.setFilter(key + '_' + index, allFilters);
            }
        });
    }, [problemClusterGeojson, projectsids,filterProjectOptions]);

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
        // console.log('keyyy',key)
        if(key.includes('mhfd_projects')){
          // console.log('hereee', projectid,styles[key])
          if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                  // console.log('and hereee', projectid)
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
            // 'line-opacity': style.paint['line-opacity'],
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

    const test = (item: any) => {
 
        setVisible(true);
        setData(item);
        if (item.problemid) {
            existDetailedPageProblem(item.problemid);
        } else {
            const url = 'projectid=' + (item.projectid || item.id);
            existDetailedPageProject(url);
        }


    }
    const highlithOnTap = (id: any) => {
        hideHighlighted();
        showHighlighted(id.layer, id.id);
    }
    const showPopup = (index: any, size: number, id: any, event:any) => {
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

    const measureCenterAndDelete = (type: any, item: any, event: any) => {
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
    
    const addListToPopupNotes = (ul: any, div: any, noteClicked?:any) => {
        let inner = `
        <div class="listofelements" id="currentItemsinList">
          `;
        listOfElements.forEach((el:any , index: any) => {
          inner += ` 
          <li id="color${index}" value=${JSON.stringify(el._id)}>
            <img id="circle${index}" class="img-circle${noteClicked?.color_id == el.color_id?' selected':''}" style="background:${el.color}"/> 
              <input id="input${index}" class="inputlabel${noteClicked?.color_id == el.color_id?' underlined':''}" value="${el.label}" readonly>
            <img id="editopt${index}" class="img-edit" />
            <img id="saveopt${index}" class="img-check" />
            <img id="options${index}" src="/Icons/icon-60.svg" alt=""  class='menu-wr'> 
          </li>`
        });
        inner += '</div>'
        const addLabelButton = `
          <li id="addLabelButton" style="padding-right:12px">
            <button 
                id="addLabelButton-btn"
                type="button"
                class="addlabelbutton"
            >
                Add Label
            </button>
          </li>`;
        inner = inner + addLabelButton;
  
        ul.innerHTML = inner;
  
        let c= div.childNodes;
        if(!c[3]){
          div.appendChild(ul);
        }            
        clickingCircleColor(listOfElements, updateColorList, noteClicked, openMarkerOfNote, changeContentWithListUpdates);
        clickingOptions(listOfElements, deleteColorList, noteClicked, updateColorList, openMarkerOfNote, changeContentWithListUpdates);
        clickingAddLabelButton(createColorList, noteClicked, openMarkerOfNote, changeContentWithListUpdates);
        clickingUnFocusInput(listOfElements, updateColorList, noteClicked, openMarkerOfNote, changeContentWithListUpdates);
        clickingColorElement(listOfElements, currentElement);
    }


   
    useEffect(() => {
      //   if (allLayers.length < 100) {
      //     return;
      // }
      EventService.setRef('click', eventclick);
      let eventToClick = EventService.getRef('click');
      map.on('click', eventToClick);
      return () => {
        map.off('click', eventToClick);
      };
    }, [allLayers]);

        const eventclick =  async (e: any) => {
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
                const html = commentPopup();
                popup.remove();
                popup = new mapboxgl.Popup({
                  closeButton: false, 
                  offset: { 
                    'top': [0, 10],
                    'bottom': [0, -10],
                    'left': [10,0],
                    'right': [-10,0]
                  }
                });
                setTimeout(()=>{
                  markerNote.setPopup(popup);
                  popup.setDOMContent(html);
                  markerNote.setLngLat([e.lngLat.lng, e.lngLat.lat]).setPopup(popup).addTo(map).togglePopup();
                  addListonPopupNotes(
                    e,
                    listOfElements,
                    colors,
                    colorsCodes,
                    // un comment when notes is ready                    
                    createNote,
                    rotateIcon, 
                    addListToPopupNotes,
                    popup,
                    canAdd, // watch out is value not reference  
                    setSwSave,
                    marker,
                    markerNote
                  );
                }, 200);
                
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
                false,
                () => {},
                () => {},
                () => {},
                []
              );
           }
            if (popups.length) { 
              popup.remove();
              popup = new mapboxgl.Popup({closeButton: true,});
                addPopupAndListeners(
                  MAPTYPES.MAINMAP,
                  menuOptions,
                  popups,
                  userInformation,
                  test,
                  setMobilePopups,
                  setActiveMobilePopups,
                  setSelectedPopup,
                  mobile,
                  mobileIds,
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
    const createProject = (details: any, event: any) => {
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
            problemid: null,
            status: details.status?details.status:'',
            table: details.table?details.table:'',
            type: details.type?details.type:'',
            objectid: details.type?details.objectid:''
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
    const addMapListeners = async (key: string) => {
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
                          setSelectedOnMap(e.features[0].properties.projectid, key);
                      } else {
                          setSelectedOnMap(-1, '');
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
          <h6>{item.text}</h6>
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
            addPopupServiceCountyMunicipality(
              menuOptions,
              popups,
              userInformation,
              titleObject,
              setMobilePopups,
              setSelectedPopup,
              mobile,
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
            zoom: zoom ?? 12 
            });
    }
    const openMarkerOfNote = (note:any, draftText: any, changeContentTitleData?: any) => {
      console.log('Open Marker Note', note);
      markerNotes_global.forEach((marker:any) => {
        marker.marker.addTo(map);
      });
      markerNotes_global.forEach((marker:any) => {
        let popupC = marker.marker.getPopup();
        popupC.remove();
      });
      setTimeout(()=>{
        const noteid = note.id?note.id:note.newnotes_id; 
        const filterMarker: any = markerNotes_global.filter((marker:any) => marker.note.newnotes_id == noteid  );
        if(filterMarker.length > 0) {
          filterMarker[0].marker.togglePopup();
          setTimeout(()=>{
            const textarea = (document.getElementById('textarea') as HTMLInputElement);
              if (textarea != null) {
               textarea.value = draftText; 
              }
            eventsOnClickNotes(filterMarker[0].note);
            setTimeout(()=>{
              const isList = document.getElementById('id-list-popup');
              if(isList != null) {
                isList.style.display = 'block';
                clickoutsideList(listOfElements, rotateIcon);
                if(changeContentTitleData) {
                  setTimeout(()=>{
                    changeContentTitleData[2](changeContentTitleData[0],changeContentTitleData[1],listOfElements);
                  },600);
                }
              }
            },240);
          },350);
        }
      },600);
      
    }
    const changeContentWithListUpdates = (changeContentTitleData: any) => {
      if(changeContentTitleData) {
        setTimeout(()=>{
          changeContentTitleData[2](changeContentTitleData[0],changeContentTitleData[1],listOfElements);
        },600);
      }
    }

    const openEditNote = (note: any) => {
      flyTo(note.longitude, note.latitude, 16.5);
      eventsOnClickNotes(note);
      popup.remove();
      openMarkerOfNoteWithoutAdd(
        note,
        markersNotes,
        eventsOnClickNotes
      );
    }

    const setSideBarStatus = (status: boolean) => {
        setCommentVisible(status);
        // un comment when notes is ready
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
        <SideBarComment
          visible={commentVisible}
          setVisible={setSideBarStatus}
          flyTo={flyTo}
          openEditNote={openEditNote}
          addToMap={addToMap}
          changeFilter={setNotesFilter}
          setSwSave={setSwSave} />
        <div>
            {visibleCreateProject && <ModalProjectView
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
            isProblemActive === true ? <div className="legendProblemTypemap">
              <h5>
                Problem Type
                <Popover
                  content={<div className='popoveer-00'>
                    <p style={{fontWeight:'600'}}>Problem Types</p>
                    <p><span style={{fontWeight:'600'}}>Flood Hazard </span> Problems related to existing flood or fluvial hazard to life and property.</p>
                    <p><span style={{fontWeight:'600'}}>Stream Function </span> Problems related to the physical, environmental, and social function or condition of the stream in an urban context.</p>
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
                Stream Function
              </div>
            </div> : ''
          }
          
          <span className="zoomvaluemap"><b>Nearmap: September 4, 2022</b><b style={{paddingLeft:'10px'}}>Zoom Level: {zoomValue}</b></span>
            {visible && <DetailModal
              visible={visible}
              setVisible={setVisible}
              data={data}
              type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
            />}
              {(mobilePopups.length && window.innerWidth < 700) ? <MobilePopup seeDetails={seeDetails} items={mobilePopups}></MobilePopup> : <></>}
            <div id="map">
            </div>
            <div className="m-head">
                <Dropdown overlayClassName="dropdown-map-layers"
                    visible={visibleDropdown}
                    onVisibleChange={(flag: boolean) => {
                        setVisibleDropdown(flag);
                    }}
                    overlay={MapFilterView({ selectCheckboxes, setVisibleDropdown, selectedLayers, removePopup })}
                    trigger={['click']}>
                    <Button>
                    <span className="btn-02"></span>
                    </Button>
                </Dropdown>
                <AutoComplete
                    dropdownMatchSelectWidth={true}
                    style={{ width: 240 }}
                    options={mapSearch.map(renderOption)}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    value={keyword}
                >
                  <Input.Search allowClear placeholder="Stream or Location"  />
                </AutoComplete>
            </div>
            <div className="measure-button">
              {!measuringState && <Button style={{ borderRadius: '4px' }} onClick={()=>setMeasuringState(true)} ><img className="img-icon" /></Button>}
              {measuringState && 
              <div className='measurecontainer'> 
                <div id={'measure-block'} className="measure-block" onClick={()=> setMeasuringState(false)}>
                    <div className="headmap">
                        <h4>Measure distances and areas</h4>
                        <button className='close-measure-button' onClick={()=>setIsMeasuring(false)} ></button>
                    </div>
                    <hr style={{opacity: 0.4, width: '96%'}}></hr>
                    <div className="bodymap" onClick={() => setIsMeasuring(true)}>
                        <b><img className='img-measure-00'></img>Create a new measurement</b>
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
                       <span  className="button-c" style={{marginLeft:'-1px'}} onClick={()=>setIsMeasuring(false)}><a style={{color:'#11093C'}}><img className='img-measure-05'></img> <b>Cancel</b></a></span >
                      }
                      {  
                        isdrawingmeasure && 
                        <span  className="button-c" style={{paddingLeft:'20px'}} onClick={()=>finishMeasure('line')}><a style={{color:'#11093C'}}><img className='img-measure-png-01' src='/Icons/icon-line.png'></img> <b>Finish Line</b></a></span >
                      }
                      {  
                        isdrawingmeasure && 
                        <span  className="button-c" style={{paddingLeft:'22px'}} onClick={()=>finishMeasure('polygon')}><a style={{color:'#11093C'}}><img className='img-measure-png-02' src='/Icons/icon-polygon.png'></img> <b>Finish Polygon</b></a></span >
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
            />
            <MobileMenu />
        </div>
    </>
    )
}

export default Map;
