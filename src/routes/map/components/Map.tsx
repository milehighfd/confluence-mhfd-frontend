import React, { useEffect, useRef, useState } from 'react'
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import MapFilterView from '../../../Components/Shared/MapFilter/MapFilterView';
import { Dropdown,  Button } from 'antd';
import { MapProps, ObjectLayerType, LayerStylesType } from '../../../Classes/MapTypes';
import {
    MAP_DROPDOWN_ITEMS,
    MAPBOX_TOKEN,
    PROBLEMS_TRIGGER,
    PROJECTS_TRIGGER,
    COMPONENT_LAYERS,
    STREAMS_FILTERS,
    MUNICIPALITIES_FILTERS,
    SELECT_ALL_FILTERS,
    MAP_RESIZABLE_TRANSITION, ROUTINE_NATURAL_AREAS, ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, MHFD_PROJECTS, NRCS_SOILS, DWR_DAM_SAFETY, STREAM_MANAGEMENT_CORRIDORS, RESEARCH_MONITORING, CLIMB_TO_SAFETY, SEMSWA_SERVICE_AREA, ADMIN, STAFF,
    NEARMAP_TOKEN,
    BLOCK_CLEARANCE_ZONES_LAYERS,
    ACTIVE_LOMS,
    EFFECTIVE_REACHES,
    MENU_OPTIONS,
    SERVICE_AREA_FILTERS,
    STREAMS_POINT,
    PROPSPROBLEMTABLES,
    STREAM_IMPROVEMENT_MEASURE
} from "../../../constants/constants";
import { COMPONENT_LAYERS_STYLE, tileStyles, widthLayersStream, NEARMAP_STYLE } from '../../../constants/mapStyles';
import { addMapGeocoder } from '../../../utils/mapUtils';
import { numberWithCommas } from '../../../utils/utils';
import { Input, AutoComplete } from 'antd';
import DetailedModal from '../../../Components/Shared/Modals/DetailedModal';
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

import {clickingCircleColor, clickingOptions, clickingAddLabelButton, clickingUnFocusInput, clickingColorElement, rotateIcon} from '../../../Components/Map/commetsFunctions';
import { GlobalMapHook } from '../../../utils/globalMapHook';
import { useDetailedState } from '../../../hook/detailedHook';
import MobileMenu from './MobileMenu';
import SideMenuTools from './SideMenuTools';
import { commentPopup, loadMenuPopupWithData } from './MapGetters';
import { hovereableLayers } from '../constants/layout.constants';
const { Option } = AutoComplete;

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
    const geojsonMeasures = {
      'type': 'FeatureCollection',
      'features': new Array()
      };
    const geojsonMeasuresSaved = {
      'type': 'FeatureCollection',
      'features': new Array()
    };

    const linestringMeasure = {
      'type': 'Feature',
      'geometry': {
      'type': 'LineString',
      'coordinates': new Array()
      }
    };
let canAdd = false;

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
    getGalleryProblems, 
    getGalleryProjects,
    updateSelectedLayers,
    setFilterCoordinates,
    setFilterProblemOptions,
    setFilterProjectOptions,
    setFilterComponentOptions,
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
    setSelectedPopup
  } = useMapDispatch();
  const {
    toggleModalFilter,
    boundsMap,
    tabCards,
    filterTabNumber,
    coordinatesJurisdiction,
    opacityLayer,
    bboxComponents,
    autocomplete,
    currentPopup,
    layers: layerFilters,
    galleryProjects,
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
    zoomProblemOrProject: zoom
  } = useMapState();
  const {
    detailed,
  } = useDetailedState();
    let geocoderRef = useRef<HTMLDivElement>(null);

    const dropdownItems = { default: 1, items: MAP_DROPDOWN_ITEMS };
    const { notes } = useNotesState();
    const { getNotes, createNote, editNote, setOpen, deleteNote } = useNoteDispatch();
    const {setComponentsFromMap, getAllComponentsByProblemId, getComponentGeom, getZoomGeomProblem, getZoomGeomComp} = useProjectDispatch();
    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [mobilePopups, setMobilePopups] = useState<any>([]);
    const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
    const [visibleCreateProject, setVisibleCreateProject ] = useState(false);
    const [problemid, setProblemId ] = useState<any>(undefined);

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
    const [swSave, setSwSave] = useState(false);
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
    const polyMask = (mask: any, bounds: any) => {
        if (mask !== undefined && bounds.length > 0) {
            var bboxPoly = turf.bboxPolygon(bounds);
            return turf.difference(bboxPoly, mask);
        }
    }
    useEffect(()=>{
      const user = userInformation;
      if (user?.polygon[0]) {
        let myPolygon: any = [];
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
    const [counterPopup, setCounterPopup] = useState({ componentes: 0 });

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
                    clickoutsideList();
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
                            content: textarea.value,
                            latitude: noteClicked.latitude,
                            longitude: noteClicked.longitude
                        };
                        createNoteWithElem(note);
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
                        _id: noteClicked._id,
                        color: color,
                        content: textarea.value,
                        latitude: noteClicked.latitude,
                        longitude: noteClicked.longitude
                    };
                    
                    editNoteWithElem(note);

                  }
              });
            }
            const del = document.getElementById('delete-comment');
            if (del != null) {
              del.addEventListener('click', () => {
                let noteId = del.getAttribute('value');
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
      if (coordinatesJurisdiction.length > 0 && map) {
          mask = turf.multiPolygon(coordinatesJurisdiction);
          let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;
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
              map.addLayer({
                  "id": "mask",
                  "source": "mask",
                  "type": "fill",
                  "paint": {
                      "fill-color": "black",
                      'fill-opacity': 0.8
                  }
              });
              map.addLayer({
                "id": 'border',
                "source": "mask",
                "type": "line",
                "paint": {
                  'line-color': '#28c499',
                  'line-width': 1,
                }
              });
              map.moveLayer('border')
              setTimeout(()=>{
                map.removeLayer('mask');
                map.removeLayer('border');
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
    }, [filterProblems]);

    useEffect(() => {
        if (map) {
            applyFilters(MHFD_PROJECTS, filterProjects);
        }
    }, [filterProjects, componentDetailIds]);

    useEffect(() => {
        if (map) {
            for (const component of COMPONENT_LAYERS.tiles) {
                applyFilters(component, filterComponents);
            }
            applyFilters(MHFD_PROJECTS, filterProjects);
            applyFilters(PROBLEMS_TRIGGER, filterProblems);
        }
    }, [filterComponents, componentDetailIds]);

    const setValueInFilters = (value: any, type: any, filterOptions: any, withSuffix: boolean = false) => {
      const options = { ...filterOptions };
      options.jurisdiction = '';
      options.county = '';
      options.servicearea = '';
      if (!withSuffix) {
        if (value.includes('County')) {
          let index = value.indexOf('County');
          if (index !== -1) {
            value = value.substr(0, index - 1);
          }
        }
        if (value.includes('Service Area')) {
          let index = value.indexOf('Service Area');
          if (index !== -1) {
            value = value.substr(0, index - 1);
          }
        }
      }
      if(type == "Service Area") {
        options.servicearea = value;
      } else if(type) {
        options[type.toLowerCase()] = value;
      }
      return options;
    }
    const flytoBoundsCoor = () => {
      let historicBounds = getCurrent();
      if(historicBounds && historicBounds.bbox && userInformation.isSelect != 'isSelect') {
        globalMapId = historicBounds.id;
        map.fitBounds([[historicBounds.bbox[0],historicBounds.bbox[1]],[historicBounds.bbox[2],historicBounds.bbox[3]]]);
      } else if (coorBounds[0] && coorBounds[1]) {
        map.fitBounds(coorBounds);
        if(userInformation.isSelect != 'isSelect') {
          setTimeout(()=>{
           const zoomareaSelected = groupOrganization.filter((x: any) => x.aoi === userInformation.zoomarea).map((element: any) => {
             return {
               aoi: element.aoi,
               filter: element.filter,
               coordinates: element.coordinates
             }
           });
           if(zoomareaSelected[0]){
             let type = zoomareaSelected[0].filter; 
             let zone = zoomareaSelected[0].aoi;
             zone = zone.replace('County ', '').replace('Service Area', '');
             setCoordinatesJurisdiction(zoomareaSelected[0].coordinates);
             const loadFiltered = (zone: any , type: any, projectOptions: any, problemOptions: any, componentOptions: any) => {
                let optionsproj = setValueInFilters(zone, type, projectOptions, true);
                let optionsprob = setValueInFilters(zone, type, problemOptions);
                let optionscomp = setValueInFilters(zone, type, componentOptions);
                setTimeout(()=>{
                  setFilterProjectOptions(optionsproj);
                  getGalleryProjects();
                  getParamFilterProjects(boundsMap, optionsproj);
                  setFilterProblemOptions(optionsprob);
                  getGalleryProblems();
                  getParamFilterProblems(boundsMap, optionsprob);
                  setFilterComponentOptions(optionscomp);
                  getParamFilterComponents(boundsMap, optionscomp);
                },1300);
              }
              // map.once('idle',() => {
              //   setTimeout(()=>{
              //     loadFiltered(zone, type, filterProjectOptions, filterProblemOptions, filterComponentOptions); 
              //   },1000);
              // });
           }
   
          },5000);

        }
      }
    }
    useEffect(() => {
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
        
            flytoBoundsCoor();
        

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
                if (applyFilter) {
                    if (toggleModalFilter) {
                        if (filterTabNumber === PROJECTS_TRIGGER) {
                            getParamFilterProjects(boundingBox, filterProjectOptions);
                        } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                            getParamFilterProblems(boundingBox, filterProblemOptions);
                        } else {
                            getParamFilterComponents(boundingBox, filterComponentOptions);
                        }
                        getParamsFilter(boundingBox);
                    } else {
                        setFilterCoordinates(boundingBox, tabCards);
                    }
                }
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
            if (applyFilter) {
                if (toggleModalFilter) {
                    if (filterTabNumber === PROJECTS_TRIGGER) {
                        getParamFilterProjects(boundingBox, filterProjectOptions);
                    } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                        getParamFilterProblems(boundingBox, filterProblemOptions);
                    } else {
                        getParamFilterComponents(boundingBox, filterComponentOptions);
                    }
                } else {
                    setFilterCoordinates(boundingBox, tabCards);
                }
            }
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
        if (toggleModalFilter) {
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
        if (zoom.length > 0) {
            map.fitBounds([zoom[0], zoom[2]], { padding: 100 });
        }
    }, [zoom]);

    useEffect(() => {
      flytoBoundsCoor()
    }, [userInformation.polygon])

    useEffect(() => {
        if (currentPopup !== -1 && activeMobilePopups.length > currentPopup) {
            highlithOnTap(activeMobilePopups[currentPopup]);
        } else {
            hideHighlighted();
        }
    }, [currentPopup, activeMobilePopups]);
    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
    }, [dropdownItems.items[dropdownItems.default].style]);

    useEffect(() => {
        const mapResize = () => map.resize();
        for (let i = 0; i <= MAP_RESIZABLE_TRANSITION * 1000; i = i + 25) {
            setTimeout(() => mapResize(), i);
        }
    }, [leftWidth]);

    useEffect(() => {
        map.on('style.load', () => {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 250);
                } else {
                    applySkyMapLayer();
                    applyMapLayers();
                    setSpinMapLoaded(false);
                    applyNearMapLayer();
                    applyMeasuresLayer();
                }
            };
            waiting();
        });
        if (map.isStyleLoaded()) {
            applyMapLayers();
            setSpinMapLoaded(false);
        } else {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 250);
                } else {
                    applyMapLayers();
                    setSpinMapLoaded(false);
                }
            };
            waiting();
        }
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
        applyFilters(MHFD_PROJECTS, filterProjects);
        setTimeout(()=>{
            topStreams()
            topEffectiveReaches();
            topProjects();
            if (map.getLayer('borderMASK')) {
              map.moveLayer('borderMASK');
            }
            topHovereableLayers();
            topStreamLabels();
            topLabels();
            topServiceArea();
            topComponents();
            if (map.getLayer('area_based_maskMASK')) {
              map.moveLayer('area_based_maskMASK');
            }
            // setTimeout(() => {
            //   topProblems();
            // }, 10000);
        },800);
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
    const topProjects = () => {
      const styles = { ...tileStyles as any };   
        styles[MHFD_PROJECTS].forEach((style: LayerStylesType, index: number) => {
          map.moveLayer(`${MHFD_PROJECTS}_${index}`);
        })
    }
    const topProblems = () => {
      const styles = { ...tileStyles as any };   
        styles[PROBLEMS_TRIGGER].forEach((style: LayerStylesType, index: number) => {
          map.moveLayer(`${PROBLEMS_TRIGGER}_${index}`);
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
    const applyFilters = (key: string, toFilter: any) => {
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
                    if (filterField === 'servicearea') {
                      
                      let filterValue = filters;
                        if(filterValue[filters.length - 1] == ' ') {
                          filterValue = filters.substring(0,filters.length - 1);
                        }
                        allFilters.push(['==', ['get', (key === PROBLEMS_TRIGGER ? PROPSPROBLEMTABLES.problem_boundary[9] : filterField)], filterValue]);
                        continue;
                    }
                    if(filterField === 'county' ){
                      let filterValue = filters.replace('County','');
                        if(filterValue[filterValue.length - 1] == ' ') {
                          filterValue = filterValue.substring(0,filterValue.length - 1);
                        }
                        allFilters.push(['==', ['get', filterField], filterValue]);
                        continue;
                    }
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

            if (map.getLayer(key + '_' + index)) {
                map.setFilter(key + '_' + index, allFilters);
            }
        });
    };

    const showHighlighted = (key: string, cartodb_id: string) => {
        const styles = { ...tileStyles as any }
        if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                    if(map.getLayer(key + '_highlight_' + index)) { 
                        map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id])
                    }
                    
                }
            });
        }
    };
    const hideOneHighlighted = (key: string) => {
        const styles = { ...tileStyles as any }
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                if(map.getLayer(key + '_highlight_' + index)) {
                    map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
                }
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

    const addToMap = () => {
      if(markersNotes.length > 0 ){
        markersNotes.forEach((marker:any) => {
          marker.marker._popup.remove();
        });
      }
      canAdd = true;
    }
    const addTilesLayers = (key: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
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
            if(key != STREAMS_FILTERS && key != STREAMS_POINT) {
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

        });
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
        if(key === STREAMS_FILTERS) {
          styles[STREAMS_POINT].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(STREAMS_POINT + '_' + index)) {
              map.setLayoutProperty(STREAMS_POINT + '_' + index, 'visibility', 'none');
            }
          })
        }
    };

    const test = (item: any) => {
      console.log('item inside map ', item);
        setVisible(true);
        setData(item);
        if (item.problemid) {
            existDetailedPageProblem(item.problemid);
        } else {
            const url = 'projectid' + (item.projectid || item.id) + '&type=' + item.type;
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

    const getDateMep = (mep_eligibilitystatus: any, props: any) => {
        if(!mep_eligibilitystatus) return undefined;
        let finalDate = new Date(0);
        if( mep_eligibilitystatus == 'Design Approval') {
            finalDate = new Date(props.mep_date_designapproval);
        } else if( mep_eligibilitystatus == 'Construction Approval') {
            finalDate = new Date(props.mep_date_constructionapproval);
        } else if( mep_eligibilitystatus == 'Final Acceptance') {
            finalDate = new Date(props.mep_date_finalacceptance);
        } else if( mep_eligibilitystatus == 'Ineligible') {
            console.log(props.mep_date_ineligible);
            finalDate = new Date(props.mep_date_ineligible);
        }
        let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() +1 : ('0' + (finalDate.getDate() + 1) )) + '/' + finalDate.getFullYear();
        if(stringDate.includes('NaN')) {
        return '-'
        } else {
        return stringDate;
        }
    }
    const parseDateZ = (dateParser: any) => {
        let finalDate = new Date(dateParser);
        let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() +1 : ('0' + (finalDate.getDate() + 1) )) + '/' + finalDate.getFullYear();
        if(stringDate.includes('NaN')) {
        return '-'
        } else {
        return stringDate;
        }
    } 
    const epochTransform = (dateParser: any) => {
        let finalDate = new Date(0);
        finalDate.setUTCMilliseconds(dateParser);
        let stringDate = ((finalDate.getMonth() > 8) ? (finalDate.getMonth() + 1) : ('0' + (finalDate.getMonth() + 1))) + '/' + ((finalDate.getDate() > 9) ? finalDate.getDate() +1 : ('0' + (finalDate.getDate() + 1) )) + '/' + finalDate.getFullYear();
        if(stringDate.includes('NaN')) {
        return '-'
        } else {
        return stringDate;
        }
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
        
        geojsonMeasures.features = new Array();
        linestringMeasure.geometry.coordinates =  new Array();
        map.getSource('geojsonMeasure').setData(geojsonMeasures);
        setIsDrawingMeasure(false);
        setIsMeasuring(false);
      }
    }
    const measureFunction = (e: any) => {
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
            (point) => point.geometry.coordinates
          );
          geojsonMeasures.features.push(linestringMeasure);
          const newLS = turf.lineString(linestringMeasure.geometry.coordinates);
          const distance = turf.length(newLS);
          setDistanceValue((distance * factorKMtoFeet).toLocaleString(undefined, {maximumFractionDigits: 2}));
          setDistanceValueMi((distance * factorKMToMiles).toLocaleString(undefined, {maximumFractionDigits: 2}));
          if(linestringMeasure.geometry.coordinates.length > 2) {
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
            <img id="circle${index}" class="img-circle${noteClicked?.color_id == el._id?' selected':''}" style="background:${el.color}"/> 
              <input id="input${index}" class="inputlabel${noteClicked?.color_id == el._id?' underlined':''}" value="${el.label}" readonly>
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
    const createNoteWithElem = (note: any) => {

      const contentTitle:any = document.getElementById('color-text');
      if(contentTitle != null) {
        const comment_id = contentTitle.getAttribute('current_id');
        if(comment_id) {
          note.color_id = comment_id;
        }
      }
      createNote(note);
    }
    const editNoteWithElem = (note: any) => {

      const contentTitle:any = document.getElementById('color-text');
      if(contentTitle != null) {
        const comment_id = contentTitle.getAttribute('current_id');
        if(comment_id) {
          note.color_id = comment_id;
        }
      }
      editNote(note);
    }
    const clickoutsideList = () => {
      const ignoreElementClick = document.getElementById('id-list-popup');
      const div = document.getElementById('color-list');
      if(ignoreElementClick != null && div != null){ 
        document.addEventListener('click', (event: any) => {
          const isClickInsideElement = ignoreElementClick.contains(event.target);
          const isClickingInsideParentElem = div.contains(event.target);  
          if (!isClickInsideElement) {
              if (!isClickingInsideParentElem && ignoreElementClick.style.display != 'none') {
                ignoreElementClick.style.display = 'none';
                rotateIcon('down');
              }
              
          }
        });
      }
      listOfElements.forEach((el:any, index_:any) => { 
        let divoptionstohide = document.getElementById(`divoptions${index_}`);
        if(divoptionstohide != null){
          divoptionstohide.style.display = 'none';
        }
        let divcolorstohide = document.getElementById(`divcolor${index_}`);
        if(divcolorstohide != null){
          divcolorstohide.style.display = 'none';
        }
        
        const inputElem: any = document.getElementById(`input${index_}`);
        if(inputElem != null){
          inputElem.readOnly = true;
        }  
        
        const saveOpt: any = document.getElementById(`saveopt${index_}`);
        if(saveOpt != null){
          saveOpt.style.display = 'none';
        }
        const editButton = document.getElementById(`editopt${index_}`);
        if(editButton != null){
          editButton.style.removeProperty('display');
        }
        const liElem: any = document.getElementById(`color${index_}`);
        if(liElem != null) {
          liElem.classList.remove('editinglist');
        }
      });
    }
    const addListonPopupNotes = (e: any) => {
      const div = document.getElementById('color-list');
                if (div != null) {
                  const checker = Array.from(document.getElementsByClassName('list-popup-comment'));
                  checker.forEach((check:any) => {
                    check.remove();
                  });
                    const ul = document.createElement('div');
                    ul.style.display = 'none';
                    ul.classList.add("list-popup-comment");
                    ul.classList.add("legend");
                    ul.setAttribute('id','id-list-popup');
                    div.addEventListener('click', () => {
                        if (ul.style.display === 'none') {
                            ul.style.display = 'block';
                            rotateIcon('up');
                            clickoutsideList();
                        } else {
                            ul.style.display = 'none';
                            rotateIcon('down');
                        }
                    });
                    addListToPopupNotes(ul, div)
                    // div.appendChild(ul);
                    const colorable = document.getElementById('colorable');
                    const red = document.getElementById('red');
                  if (red != null) {
                      red.addEventListener('click', () => {
                          if (colorable != null) {
                              colorable.style.color = colors.RED;
                          }
                      });
                  }
                  const orange = document.getElementById('orange');
                  if (orange != null) {
                      orange.addEventListener('click', () => {
                          if (colorable != null) {
                              colorable.style.color = colors.ORANGE;
                          }
                      });
                  }
                  const grey = document.getElementById('grey');
                  if (grey != null) {
                      grey.addEventListener('click', () => {
                          if (colorable != null) {
                              colorable.style.color = colors.GREY;
                          }
                      });
                  }
                  const yellow = document.getElementById('yellow');
                  if (yellow != null) {
                      yellow.addEventListener('click', () => {
                          if (colorable != null) {
                              colorable.style.color = colors.YELLOW;
                          }
                      });
                  }
                  const save = document.getElementById('save-comment');
                  if (save != null) {
                      save.addEventListener('click', () => {
                        setSwSave(false);
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
                              let note: any = {
                                  color: color,
                                  content: textarea.value,
                                  latitude: e.lngLat.lat,
                                  longitude: e.lngLat.lng
                              };
                              createNoteWithElem(note);
                              popup.remove();
                              canAdd = false;
                              marker.remove();
                              markerNote.remove();
                          }
                        });
                    }
                    const edit = document.getElementById('edit-comment');
                      if (edit != null) {
                          edit.addEventListener('click', () => {
                            setSwSave(false);
                          });
                      }
                    const del = document.getElementById('delete-comment');
                    if (del != null) {
                      del.addEventListener('click', () => {
                        setSwSave(false);
                        markerNote.remove();
                        canAdd = false;
                      });
                    }
                }
    }
    const getTitleOfStreamImprovements = (properties: any) => {
      let title = '';
      if (properties.component_part_category) {
        title = properties.component_part_category ;
      } 
      if ( properties.component_part_subcategory) {
        title += (properties.component_part_category ? ' - ' : '') + properties.component_part_subcategory;
      }
      return title;
    }
    const getTitleOfProblemsPart = (feature: any) => {
      let title = '';
      if (feature.source.includes('hazard_polygon')) {
        title = 'Flood Hazard Polygon' ;
      } 
      if ( feature.source.includes('hazard_line')) {
        title = 'Flood Hazard Line' ;
      }
      if ( feature.source.includes('hazard_point')) {
        title = 'Flood Hazard Point' ;
      }
      if ( feature.source.includes('function_line')) {
        title = 'Stream Function Line' ;
      }
      if ( feature.source.includes('function_polygon')) {
        title = 'Stream Function Polygon' ;
      }
      if ( feature.source.includes('function_point')) {
        title = 'Stream Function Point' ;
      }
      if ( feature.source.includes('development_polygon')) {
        title = 'Watershed Change Polygon' ;
      }
      if ( feature.source.includes('development_line')) {
        title = 'Watershed Change Line' ;
      }

      return title;
    }
    useEffect(() => {

        if (allLayers.length < 100) {
            return;
        }
        map.on('click', async (e: any) => {
            if(markerGeocoder){
              markerGeocoder.remove();
              setMarkerGeocoder(undefined);
            }
            if(searchMarker){
              searchMarker.remove();
              setKeyword('');
            }
            if(isMeasuring) {
              measureFunction(e);
            } else {
              if(markersNotes.length > 0 ){
                markersNotes.forEach((marker:any) => {
                  marker.marker._popup.remove();
                });
              }
              if (commentAvailable && canAdd) {
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
                  addListonPopupNotes(e);
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

              let features = map.queryRenderedFeatures(bbox, { layers: allLayers });
              coordX = e.point.x;
              coordY = e.point.y;
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
              const popupsClassess = document.getElementsByClassName('mapboxgl-popup');
              if ( popupsClassess.length ) {
                  for(let i = 0 ; i < popupsClassess.length ; ++i) {
                    popupsClassess[i].remove();
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
                  if (feature.source === 'projects_polygon_' || feature.source === MHFD_PROJECTS) {
                      const filtered = galleryProjects.filter((item: any) =>
                          item.cartodb_id === feature.properties.cartodb_id
                      );
                      const item = {
                          type: 'project',
                          title: MENU_OPTIONS.PROJECT,
                          name: feature.properties.projectname ? feature.properties.projectname : feature.properties.requestedname ? feature.properties.requestedname : '-',
                          organization: feature.properties.sponsor ? feature.properties.sponsor : 'No sponsor',
                          value: feature.properties.estimatedcost ? feature.properties.estimatedcost : feature.properties.component_cost ? feature.properties.component_cost : '-1',
                          projecctype: feature.properties.projectsubtype ? feature.properties.projectsubtype : feature.properties.projecttype ? feature.properties.projecttype : '-',
                          status: feature.properties.status ? feature.properties.status : '-',
                          objectid: feature.properties.objectid,
                          component_count: feature.properties.component_count,
                          valueid: feature.properties.cartodb_id,
                          id: feature.properties.projectid,
                          streamname: feature.properties.streamname,
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
                      menuOptions.push('Problem');
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
                          layer: 'Streams',
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
                      if (feature.source === component) {
                          const problemid = feature.properties.problemid ?feature.properties.problemid:'';
                          let problemname = '';
                          if(problemid) {
                            let aw = await datasets.getData(SERVER.PROBLEMNAME+"/"+problemid, datasets.getToken());
                            problemname = aw[0]?.problemname;
                          }
                          let volume 
                          if(feature.source === 'detention_facilities'){
                              volume = {volume:feature.properties.detention_volume? feature.properties.detention_volume : '-'}
                          }
                          let item;
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
                              problem: feature.properties.problem_id ? feature.properties.problem_id : '-',
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
            if (popups.length) { 
                const html = loadMenuPopupWithData(menuOptions, popups, userInformation, test);
                setMobilePopups(mobile);
                setActiveMobilePopups(mobileIds);
                setSelectedPopup(0);
                if (html) {
                    popup.remove();
                    popup = new mapboxgl.Popup({closeButton: true,});
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
                    }
                }
            }
            }
           
        });
    }, [allLayers]);
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
                          showHighlighted(key, e.features[0].properties.cartodb_id);
                      }
                      if (key.includes('projects') || key === PROBLEMS_TRIGGER) {
                          map.getCanvas().style.cursor = 'pointer';
                          setSelectedOnMap(e.features[0].properties.cartodb_id, key);
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
                  (!(canAdd && commentAvailable) && !isMeasuring)
                  ? 'default'
                  : 'crosshair';
            });
        }
    }

    const selectCheckboxes = (selectedItems: Array<LayersType>) => {
        const deleteLayers = selectedLayers.filter((layer: any) => !selectedItems.includes(layer as string));
        deleteLayers.forEach((layer: LayersType) => {
          console.log('this is the layer items: ', layer);
          if(layer === 'border' || layer === 'area_based_mask') {
            removeLayerMask(layer);
          } else {
            removeTilesHandler(layer);
          }
            
        });
        updateSelectedLayers(selectedItems);
    }
    const removeTilesHandler = (selectedLayer: LayersType) => {
      console.log('selectedLayer', selectedLayer);
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

    const getTitle = (text: string) => {
        const textTitle = text.split('|');
        const parsed = textTitle[1]?.split(',');
        if (parsed.length === 1) {
            return { title: parsed[0], subtitle: '' };
        }
        parsed.pop();
        let zip = parsed.pop() || 'Colorado XXX';
        zip = zip.trim();
        zip = zip.split(' ')[1];
        const city = parsed.pop()?.trim() || 'City';
        let titleArray = parsed.pop()?.split(',') || ['Place'];
        let title = titleArray[0];
        if (titleArray.length === 2) {
            title = titleArray[1];
        }
        return {
            title: title,
            subtitle: city + ' , CO ' + zip
        }
    }
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
              const html = loadMenuPopupWithData(menuOptions, popups, titleObject, userInformation);
              setMobilePopups(mobile);
              setSelectedPopup(0);
              if (html) {
                searchPopup.remove();
                searchPopup = new mapboxgl.Popup({closeButton: true,});
                console.log('search popup');
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
        } )
       
    };
    const flyTo = (longitude: number, latitude: number, zoom?: number) => {
        map.flyTo({
            center: [longitude, latitude],
            zoom: zoom ?? 12 
            });
    }
    const openMarkerOfNote = (note:any, draftText: any, changeContentTitleData?: any) => {
      markerNotes_global.forEach((marker:any) => {
        marker.marker.addTo(map)
      });
      markerNotes_global.forEach((marker:any) => {
        let popupC = marker.marker.getPopup();
        popupC.remove();
      });
      setTimeout(()=>{
        const noteid = note.id?note.id:note._id; 
        const filterMarker: any = markerNotes_global.filter((marker:any) => marker.note._id == noteid  );
        if(filterMarker.length > 0) {
          filterMarker[0].marker.addTo(map).togglePopup();
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
                clickoutsideList();
                if(changeContentTitleData) {
                  setTimeout(()=>{
                    changeContentTitleData[2](changeContentTitleData[0],changeContentTitleData[1],listOfElements);
                  },600);
                }
              }
            },140);
          },250);
        }
      },400);
      
    }
    const changeContentWithListUpdates = (changeContentTitleData: any) => {
      if(changeContentTitleData) {
        setTimeout(()=>{
          changeContentTitleData[2](changeContentTitleData[0],changeContentTitleData[1],listOfElements);
        },600);
      }
    }
    const openMarkerOfNoteWithoutAdd = (note:any) => {
      
      markersNotes.forEach((marker:any) => {
        let popupC = marker.marker.getPopup();
        popupC.remove();
      });
      const noteid = note.id?note.id:note._id; 
      const filterMarker: any = markersNotes.filter((marker:any) => marker.note._id == noteid  );
      if(filterMarker.length > 0) {
        filterMarker[0].marker.togglePopup();
        setTimeout(()=>{
          eventsOnClickNotes(filterMarker[0].note);
        },300);
      }
    }
    const openEditNote = (note: any) => {
      flyTo(note.longitude, note.latitude, 16.5);
      eventsOnClickNotes(note);
      popup.remove();
      openMarkerOfNoteWithoutAdd(note);
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
      geojsonMeasures.features = new Array();
      linestringMeasure.geometry.coordinates =  new Array();
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
          swSave={swSave}
          setSwSave={setSwSave} />
        <div>
            {visibleCreateProject && <ModalProjectView
                visible= {visibleCreateProject}
                setVisible= {setVisibleCreateProject}
                data={"no data"}
                showDefaultTab={showDefault}
                locality= {"Select a Sponsor"}
                editable = {true}
                problemId= {problemid}
            />
            }
        </div>

        <div className="map">
          <span className="zoomvaluemap"><b>Nearmap: May 27, 2022</b><b style={{paddingLeft:'10px'}}>Zoom Level: {zoomValue}</b></span>
            {visible && <DetailedModal
                detailed={detailed}
                type={data.problemid ? FILTER_PROBLEMS_TRIGGER : FILTER_PROJECTS_TRIGGER}
                data={data}
                visible={visible}
                setVisible={setVisible}
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
                <div id={'measure-block'} className="measure-block" onMouseLeave={()=> setMeasuringState(false)}>
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
