import React, { useEffect, useRef, useState } from 'react'
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import ReactDOMServer from 'react-dom/server';
import store from '../../store';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapFilterView from '../Shared/MapFilter/MapFilterView';
import { MainPopup, ComponentPopup } from './MapPopups';
import { Dropdown, Button, Collapse, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';
//import { opacityLayer } from '../../constants/mapStyles';
import { MapProps, ComponentType, ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import {
    MAP_DROPDOWN_ITEMS,
    MAPBOX_TOKEN, HERE_TOKEN,
    PROBLEMS_TRIGGER,
    PROJECTS_TRIGGER,
    COMPONENTS_TRIGGER,
    PROJECTS_MAP_STYLES,
    COMPONENT_LAYERS,
    MEP_PROJECTS,
    ROUTINE_MAINTENANCE,
    FLOODPLAINS_FEMA_FILTERS,
    STREAMS_FILTERS,
    WATERSHED_FILTERS,
    SERVICE_AREA_FILTERS,
    MUNICIPALITIES_FILTERS,
    COUNTIES_FILTERS,
    MHFD_BOUNDARY_FILTERS,
    SELECT_ALL_FILTERS,
    MAP_RESIZABLE_TRANSITION, FLOODPLAINS_NON_FEMA_FILTERS, ROUTINE_NATURAL_AREAS, ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA, CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT, PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, NRCS_SOILS, DWR_DAM_SAFETY, STREAM_MANAGEMENT_CORRIDORS, BCZ_PREBLE_MEADOW_JUMPING, BCZ_UTE_LADIES_TRESSES_ORCHID, RESEARCH_MONITORING, CLIMB_TO_SAFETY, SEMSWA_SERVICE_AREA
} from "../../constants/constants";
import { Feature, Properties, Point } from '@turf/turf';
import { tileStyles } from '../../constants/mapStyles';
import { addMapGeocoder, addMapLayers } from '../../utils/mapUtils';
import { numberWithCommas } from '../../utils/utils';
import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select';
import DetailedModal from '../Shared/Modals/DetailedModal';
import { useMapState, useMapDispatch } from '../../hook/mapHook';
import { style } from 'd3';
import { setOpacityLayer } from '../../store/actions/mapActions';
import { useProfileDispatch } from '../../hook/profileHook';
import AlertView from '../Alerts/AlertView';
import {MapboxLayer} from '@deck.gl/mapbox';
import {ArcLayer, ScatterplotLayer} from '@deck.gl/layers';
import * as d3 from 'd3';
const { Option } = AutoComplete;

const MapboxDraw = require('@mapbox/mapbox-gl-draw');

let map: any = null;
let popup = new mapboxgl.Popup();
const drawConstants = [PROJECTS_TRIGGER, COMPONENTS_TRIGGER];
const highlightedLayers = ['problems', 'projects_line_1', 'projects_polygon_'];
type LayersType = string | ObjectLayerType;

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */
const { Panel } = Collapse;
{/*const genExtra = () => (
  <CloseOutlined />
);*/}

const Map = ({ leftWidth,
    layers,
    components,
    layerFilters,
    setSelectedItems,
    selectedItems,
    setIsPolygon,
    getReverseGeocode,
    savePolygonCoordinates,
    saveMarkerCoordinates,
    markerRef,
    polygonRef,
    selectedLayers,
    polygon,
    getPolygonStreams,
    updateSelectedLayers,
    setFilterCoordinates,
    highlighted,
    filterProblems,
    filterProjects,
    filterComponents,
    setSpinValue,
    componentDetailIds,
    isExtendedView,
    setSelectedOnMap,
    getParamsFilter,
    mapSearchQuery,
    mapSearch,
    componentCounter,
    getComponentCounter,
    getDetailedPageProblem,
    getDetailedPageProject,
    getComponentsByProblemId,
    loaderDetailedPage,
    componentsOfProblems,
    loaderTableCompoents,
    displayModal,
    detailed,
    existDetailedPageProblem,
    existDetailedPageProject,
    zoom,
    applyFilter,
    filterProblemOptions,
    filterProjectOptions,
    filterComponentOptions
}: MapProps) => {
    // console.log( mapSearch);=
    let geocoderRef = useRef<HTMLDivElement>(null);
    const hovereableLayers = [ PROBLEMS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS,
        MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, ROUTINE_NATURAL_AREAS,
         ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR,
        LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA,
        CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT,
         PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE];
    const [dropdownItems, setDropdownItems] = useState({ default: 1, items: MAP_DROPDOWN_ITEMS });
    const { toggleModalFilter, boundsMap, tabCards,
        filterTabNumber, coordinatesJurisdiction, opacityLayer, bboxComponents } = useMapState();
    const { setBoundMap, getParamFilterComponents, getParamFilterProblems,
        getParamFilterProjects, setCoordinatesJurisdiction, setNameZoomArea,
        setFilterProblemOptions, setFilterProjectOptions, setSpinMapLoaded, setAutocomplete, setBBOXComponents } = useMapDispatch();
    const { saveUserInformation } = useProfileDispatch();

    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [recentSelection, setRecentSelection] = useState<LayersType>('');
    const [zoomValue, setZoomValue] = useState(0);
    const notComponentOptions: any[] = ['NCRS Soils', 'DWR Dam Safety', 'Stream Management Corridors', `BCZ - Preble’s Meadow Jumping Mouse`, 'BCZ - Ute Ladies Tresses Orchid',  'Research/Monitoring', 'Climb to Safety', 'SEMSWA Service Area'];
    // const [ spinValue, setSpinValue] = useState(true);
    const user = store.getState().profile.userInformation;
    const [visible, setVisible] = useState(false);
    const [zoomEndCounter, setZoomEndCounter] = useState(0);
    const [dragEndCounter, setDragEndCounter] = useState(0);
    const empty:any[] = [];
    const [allLayers, setAllLayers] = useState(empty);
    //const [layerOpacity, setLayerOpacity] = useState(false);
    const coor: any[][] = [];
    const coordinatesMHFD = [
        [-105.3236581, 39.4057815],
        [-105.3236581, 40.1315705],
        [-104.4889475, 40.1315705],
        [-104.4889475, 39.4057815],
        [-105.3236581, 39.4057815]
    ];
    const [data, setData] = useState({
        problemid: '',
        id: '',
        objectid: '',
        value: '',
        type: '',
        cartoid: ''
    });

    const polyMask = (mask: any, bounds: any) => {
        console.log('mask', mask);
        console.log('bounds', bounds);
        if (mask !== undefined && bounds.length > 0) {
            var bboxPoly = turf.bboxPolygon(bounds);
            return turf.difference(bboxPoly, mask);
        }
    }

    const applyOpacity = async () => {
        let mask;
        console.log('apply opacity', coordinatesJurisdiction);
        if (coordinatesJurisdiction.length > 0) {
            mask = turf.multiPolygon(coordinatesJurisdiction);
            const arrayBounds = boundsMap.split(',');
            console.log('BOUNDS', boundsMap);
            if (!map.getLayer('mask')) {
                map.addSource('mask', {
                    "type": "geojson",
                    "data": polyMask(mask, arrayBounds)
                });

                map.addLayer({
                    "id": "mask",
                    "source": "mask",
                    "type": "fill",
                    "paint": {
                        "fill-color": "black",
                        'fill-opacity': 0.8
                    }
                });
            } else {
                map.setLayoutProperty('mask', 'visibility', 'visible');
                map.removeLayer('mask');
                map.removeSource('mask');
                map.addSource('mask', {
                    "type": "geojson",
                    "data": polyMask(mask, arrayBounds)
                });

                map.addLayer({
                    "id": "mask",
                    "source": "mask",
                    "type": "fill",
                    "paint": {
                        "fill-color": "black",
                        'fill-opacity': 0.8
                    }
                });
                /* map.setLayoutProperty('mask', 'visibility', 'visible');
                const newConfig = {
                    "type": "geojson",
                    "data": polyMask(mask, arrayBounds)
                }
                map.getSource('mask').setData(newConfig); */
            }
        }
    }

    /* if (coordinatesJurisdiction.length > 0) {
        if (map.isStyleLoaded()) {
            applyOpacity();
        }
    } */



    const hideOpacity = async () => {

        /* const waiting = () => {
        if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 50);
                } else {
                    // setCoordinatesJurisdiction([]);
                    map.setLayoutProperty('mask', 'visibility', 'none');
                    setOpacityLayer(false);
                }
            }
            waiting(); */
     //   const waiting = () => {
        if  (map.loaded()) {
            console.log('hide opacity');
            if (map.getLayer('mask')) {
                map.setLayoutProperty('mask', 'visibility', 'visible');
                map.removeLayer('mask');
                map.removeSource('mask');
            }
    /*    } else {
            setTimeout(waiting, 50);
        }
    }
        waiting(); */
    }
}

    if (user?.polygon[0]) {
        let myPolygon: any = [];
        for (let index = 0; index < user.polygon.length; index++) {
            const geo = user.polygon[index];
            if (geo[0].hasOwnProperty('length')) {
                for (let index2 = 0; index2 < geo.length; index2++) {
                    const geo2 = geo[index2];
                    myPolygon.push(...geo2);
                }
            } else {
                myPolygon.push([...geo]);
            }
            //  if (element[0].hasOwnProperty('length')) {
              //  for (const element2 of element) {
              //      myPolygon.push([...element2]);
               // }
         //   } else {
              //  myPolygon.push([...element]);
            //}
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
        coor.push([bottomLongitude, bottomLatitude]);
        coor.push([topLongitude, topLatitude]);
    }

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
        let mask
        if (coordinatesJurisdiction.length > 0) {
            mask = turf.multiPolygon(coordinatesJurisdiction);
            let miboundsmap = map.getBounds();
            // let boundingBox1 = miboundsmap._sw.lng + ',' + miboundsmap._sw.lat + ',' + miboundsmap._ne.lng + ',' + miboundsmap._ne.lat;
            let misbounds = -105.44866830999993 + ',' + 39.13673489846491 + ',' + -104.36395751000016 + ',' + 40.39677734100488;

            // console.log('porque', boundingBox1)
            var arrayBounds = misbounds.split(',');
            console.log('BOUNDS', boundsMap);
            setOpacityLayer(true);
            if (!map.getLayer('mask')) {
                map.addSource('mask', {
                    "type": "geojson",
                    "data": polyMask(mask, arrayBounds)
                });

                map.addLayer({
                    "id": "mask",
                    "source": "mask",
                    "type": "fill",
                    "paint": {
                        "fill-color": "black",
                        'fill-opacity': 0.8
                    }
                });
            } else {
                map.setLayoutProperty('mask', 'visibility', 'visible');
                map.removeLayer('mask');
                map.removeSource('mask');
                map.addSource('mask', {
                    "type": "geojson",
                    "data": polyMask(mask, arrayBounds)
                });

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
        } else {
            if (opacityLayer) {
                if  (map.loaded()) {
                    console.log('hide opacity');
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
            applyFilters('problems', filterProblems);
        }
    }, [filterProblems]);

    useEffect(() => {
        if (map) {
            applyFilters('projects_line_1', filterProjects);
            applyFilters('projects_polygon_', filterProjects);
        }
    }, [filterProjects, componentDetailIds]);

    useEffect(() => {
        if (map) {
            for (const component of COMPONENT_LAYERS.tiles) {
                applyFilters(component, filterComponents);
            }
            applyFilters('projects_line_1', filterProjects);
            applyFilters('projects_polygon_', filterProjects);
            applyFilters('problems', filterProblems);
        }
    }, [filterComponents, componentDetailIds]);

    useEffect(() => {
        (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            dragRotate: true,
            touchZoomRotate: true,
            style: dropdownItems.items[dropdownItems.default].style, //hosted style id
            center: [user.coordinates.longitude, user.coordinates.latitude],
            zoom: 8
        });
        if (coor[0] && coor[1]) {
            map.fitBounds(coor);
        }

        map.addControl(new mapboxgl.ScaleControl({
            unit: 'imperial'
        }), 'bottom-right');
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        addMapGeocoder(map, geocoderRef);

        // Uncomment to see coords when a position in map is clicked
        // map.on('click', (e : any) => console.log(e.lngLat));

        if (polygonRef && polygonRef.current) {
            const draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: { polygon: true }
            });
            map.on('draw.create', () => replaceOldPolygon(draw));
            map.on('draw.update', () => replaceOldPolygon(draw));
            polygonRef.current.appendChild(draw.onAdd(map));
        }

        /* Special and Acquisition Projects */
        if (layers && layers.marker) {
            const mapMarker = document.createElement('div');
            mapMarker.className = 'marker';
            mapMarker.style.backgroundImage = layers.acquisition ? 'url("/Icons/pin-house.svg")' : 'url("/Icons/pin-star.svg")';

            markerRef.current!.onclick = () => {
                map.getCanvas().style.cursor = 'pointer';

                map.once('click', (e: any) => {
                    const marker = new mapboxgl.Marker(mapMarker)
                        .setLngLat(e.lngLat)
                        .setDraggable(true)
                        .addTo(map);

                    getReverseGeocode(e.lngLat.lng, e.lngLat.lat, HERE_TOKEN);
                    saveMarkerCoordinates([e.lngLat.lng, e.lngLat.lat]);
                    marker.on('dragend', () => getMarkerCoords(marker));
                    map.getCanvas().style.cursor = '';
                });
            }
        }
        let value = 0;
        /* map.addSource('mask', {
            "type": "geojson",
            "data": polyMask(mask, boundsMap)
        });

        map.addLayer({
            "id": "zmask",
            "source": "mask",
            "type": "fill",
            "paint": {
                "fill-color": "black",
                'fill-opacity': 0.8
            }
        }); */
        let _ = 0;
        map.on('zoomend', () => {
            hideOpacity();
            setZoomEndCounter(_++);
            setOpacityLayer(false)
            value += 1;
            if (value >= 2) {
                const bounds = map.getBounds();
                const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
                setBoundMap(boundingBox);
                if (applyFilter) {
                    //TODO: move this ifs inside toggle modal if it works again
                    if (filterTabNumber === PROJECTS_TRIGGER) {
                        getParamFilterProjects(boundingBox, filterProjectOptions);
                    } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                        getParamFilterProblems(boundingBox, filterProblemOptions);
                    } else {
                        getParamFilterComponents(boundingBox, filterComponentOptions);
                    }
                    if (toggleModalFilter) {
                        getParamsFilter(boundingBox);
                    } else {
                        setFilterCoordinates(boundingBox, tabCards);
                    }
                }
                // hideLayerOpacity();
            }

        });
        let __ = 1;
        map.on('dragend', () => {
            hideOpacity();
            setDragEndCounter(__++);
            setOpacityLayer(false)
            const bounds = map.getBounds();
            const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
            setBoundMap(boundingBox);
            if (applyFilter) {
                if (filterTabNumber === PROJECTS_TRIGGER) {
                    getParamFilterProjects(boundingBox, filterProjectOptions);
                } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                    getParamFilterProblems(boundingBox, filterProblemOptions);
                } else {
                    getParamFilterComponents(boundingBox, filterComponentOptions);
                }
                if (toggleModalFilter) {
                    //TODO: move those ifs inside toggle modal if it works again
                } else {
                    setFilterCoordinates(boundingBox, tabCards);
                }
                // hideLayerOpacity();
            }




        });
        const updateZoom = () => {
            //console.log('update zoom')
            const zoom = map.getZoom().toFixed(2);
            setZoomValue(zoom);
        }
        // let _ = 0;
        // map.on('zoomend', () => {
        //     //console.log('zoomendOn', opacityLayer)
        //     if (!opacityLayer) {
        //         hideOpacity();
        //     }
        //     setZoomEndCounter(_++);
        //     console.log(zoomEndCounter);
        //     setOpacityLayer(false)
        // });
        // let __ = 1;// #good practices
        // map.on('dragend', () => {
        //     console.log('move end')
        //     setDragEndCounter(__++);
        //     // hideLayerOpacity();
        //     setOpacityLayer(false)
        // });
        map.on('load', updateZoom);
        map.on('move', updateZoom);

    }, []);


    useEffect(() => {
        //console.log('my apply filter ', applyFilter, zoomEndCounter);
        const bounds = map.getBounds();
        const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
        setBoundMap(boundingBox);
        if (applyFilter) {
            if (toggleModalFilter) {
                if (filterTabNumber === PROJECTS_TRIGGER) {
                    getParamFilterProjects(boundingBox);
                } else if (filterTabNumber === PROBLEMS_TRIGGER) {
                    getParamFilterProblems(boundingBox);
                } else {
                    getParamFilterComponents(boundingBox);
                }
            } else {
                setFilterCoordinates(boundingBox, tabCards);
            }
        }

    }, [applyFilter, zoomEndCounter, dragEndCounter]);
    useEffect(() => {
        if (zoom.length > 0) {
            map.fitBounds([zoom[0], zoom[2]], { padding: 100 });
        }
    }, [zoom]);

    useEffect(() => {
        map.fitBounds(coor);
    }, [polygon])

    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
    }, [dropdownItems.items[dropdownItems.default].style]);

    useEffect(() => {
        /* Due the addition of 200ms extend transition resizing the map
        every 25ms to add the transition effect within the map extension. */
        const mapResize = () => map.resize();
        for (let i = 0; i <= MAP_RESIZABLE_TRANSITION * 1000; i = i + 25) {
            setTimeout(() => mapResize(), i);
        }
    }, [leftWidth]);

    useEffect(() => {
        paintSelectedComponents(selectedItems);
    }, [selectedItems]);
    useEffect(() => {
        map.on('style.load', () => {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 50);
                } else {
                    applyMapLayers();
                    setSpinValue(false);
                    setSpinMapLoaded(false);
                }
            };
            waiting();
        });
        if (map.isStyleLoaded()) {
            applyMapLayers();
            setSpinValue(false);
            setSpinMapLoaded(false);
        } else {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 50);
                } else {
                    applyMapLayers();
                    setSpinValue(false);
                    setSpinMapLoaded(false);
                }
            };
            waiting();
        }
    }, [selectedLayers]);

    useEffect(() => {
        if (recentSelection) {
            removeTilesHandler(recentSelection);
        }
    }, [recentSelection]);

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
            const YELLOW_SOLID = [118, 239, 213];
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
                    value: bboxComponents.centroids[i].arcWidth
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
                getSourceColor: YELLOW_SOLID,
                getTargetColor: YELLOW_SOLID
            });
            map.setPitch(80)
            map.addLayer(mapboxArcsLayer);
            map.addLayer(arcsLayer);
        }
    }, [bboxComponents])

    const removePopup = () => {
        popup.remove();
    }

    const hideLayerOpacity = async () => {
        console.log('before hide', opacityLayer);
        if (opacityLayer) {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 50);
                } else {
                    // setCoordinatesJurisdiction([]);
                    map.setLayoutProperty('mask', 'visibility', 'none');
                    setOpacityLayer(false);
                }
            };
            waiting();
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
            if (typeof layer === 'object') {
                layer.tiles.forEach((subKey: string) => {
                    showLayers(subKey);
                });
            } else {
                showLayers(layer);
            }
        });
        applyFilters('problems', filterProblems);
        applyFilters('projects_line_1', filterProjects);
        applyFilters('projects_polygon_', filterProjects);
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

    const applyFilters = (key: string, toFilter: any) => {
        // console.log('enter here for ', key);
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
    /*     const showOpacityLayer = (key: string) => {
            const styles = { ...tileStyles as any };
            //console.log('STYLES', styles['opacity_layers'][0]);

            /* styles['opacity_layers'].foreach((style : LayerStylesType, index : number) => {
                console.log(style);
            }) */
    /* styles[key].forEach((style : LayerStylesType, index : number) => {
    } */
    /* const source = 'polygon-opa';
    map.addSource(source, {
        type: 'geojson',
        //style: styles['opacity_layers'][0],
        data: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [boundsMap]
            }
        }
    });
    addMapLayers(map, source, opacityLayer); */
    //} */

    const showHighlighted = (key: string, cartodb_id: string) => {
        const styles = { ...tileStyles as any }
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
    const addTilesLayers = (key: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            map.addLayer({
                id: key + '_' + index,
                source: key,
                ...style
            });

            map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
            if (!hovereableLayers.includes(key)) {
                return;
            }
            if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
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
            }
            if (style.type === 'circle' || style.type === 'symbol') {
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
    };

    const hideLayers = (key: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index)) {
                map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
            }
        });
    };

    const paintSelectedComponents = (items: Array<ComponentType>) => {
        if (map.getSource(COMPONENTS_TRIGGER)) {
            components.forEach((component: ComponentType) => {
                map.setFeatureState(
                    { source: COMPONENTS_TRIGGER, id: component.componentId },
                    { hover: false }
                );
            });

            if (items && items.length) {
                items.forEach((item: ComponentType) => {
                    map.setFeatureState(
                        { source: COMPONENTS_TRIGGER, id: item.componentId },
                        { hover: true }
                    );
                });
            }
        }
    }

    const selectMapStyle = (index: number) => {
        setDropdownItems({ ...dropdownItems, default: index });
    }

    const getMarkerCoords = (marker: any) => {
        const lngLat = marker.getLngLat();
        getReverseGeocode(lngLat.lng, lngLat.lat, HERE_TOKEN);
        saveMarkerCoordinates([lngLat.lng, lngLat.lat]);
    }

    const replaceOldPolygon = (draw: any) => {
        if (draw.getAll().features.length > 1) {
            const features = draw.getAll().features;
            draw.delete(features[0].id);
        }

        const polygon = draw.getAll().features[0].geometry.coordinates;
        const polygonTurfCoords = turf.multiPolygon(polygon);
        const polygonCoords = polygon[0];

        const { geometry } = turf.centroid(polygonTurfCoords);
        savePolygonCoordinates(polygonCoords);
        getReverseGeocode(geometry?.coordinates[0], geometry?.coordinates[1], HERE_TOKEN);

        if (layers) {
            if (layers.components) {
                const selectedItems: Array<ComponentType> = [];
                const turfPoints = components.map((point: ComponentType) => turf.point(point.coordinates));
                const values = turfPoints.map((turfPoint: Feature<Point, Properties>) => turf.inside(turfPoint, polygonTurfCoords));

                components.forEach((point: ComponentType, index: number) => {
                    if (values[index]) {
                        selectedItems.push(point);
                    }
                });

                paintSelectedComponents(selectedItems);
                setSelectedItems(selectedItems);
                setIsPolygon(true);
            } else if (layers.study) {
                // getPolygonStreams(polygonTurfCoords.geometry);
                getPolygonStreams(polygonCoords);
            }
        }

        /* Get the coords on Drawing */
        // console.log(draw.getAll().features[0].geometry.coordinates);
    }
    const test = (item: any) => {

        setVisible(true);
        setData(item);
        if (item.problemid) {
            existDetailedPageProblem(item.problemid);
        } else {
            const url = 'objectid=' + item.objectid + '&cartoid=' + item.valueid + '&type=' + item.type;
            existDetailedPageProject(url);
        }


    }
    const showPopup = (index: any, size: number, id: any, event:any) => {
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

    useEffect(() => {
        if (allLayers.length < 100) {
            return;
        }
        map.on('click', (e: any) => {
            hideHighlighted();
            const popups: any = [];
            const menuOptions: any = [];
            const ids: any = [];
            const bbox = [e.point.x , e.point.y ,
            e.point.x , e.point.y ];
            let features = map.queryRenderedFeatures(bbox, { layers: allLayers });
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
                let html: any = null;
                let itemValue;
                if (feature.source === 'projects_polygon_' || feature.source === 'projects_line_1') {
                    getComponentCounter(feature.properties.projectid || 0, 'projectid', setCounterPopup);
                    const item = {
                        type: 'project',
                        title: 'Project',
                        name: feature.properties.projectname ? feature.properties.projectname : feature.properties.requestedname ? feature.properties.requestedname : '-',
                        organization: feature.properties.sponsor ? feature.properties.sponsor : 'No sponsor',
                        value: feature.properties.finalcost ? feature.properties.finalcost : feature.properties.estimatedcost ? feature.properties.estimatedcost : '0',
                        projecctype: feature.properties.projectsubtype ? feature.properties.projectsubtype : feature.properties.projecttype ? feature.properties.projecttype : '-',
                        status: feature.properties.status ? feature.properties.status : '-',
                        objectid: feature.properties.objectid,
                        valueid: feature.properties.cartodb_id,
                        id: feature.properties.projectid,
                        popupId: 'popup'
                    };
                    itemValue = { ...item };
                   // itemValue.value = item.valueid;
                    menuOptions.push('Project');
                    popups.push(itemValue);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'problems') {
                    getComponentCounter(feature.properties.problemid || 0, 'problemid', setCounterPopup);
                    const item = {
                        type: 'problems',
                        title: feature.properties.problemtype ? (feature.properties.problemtype + ' Problem') : '-',
                        name: feature.properties.problemname ? feature.properties.problemname : '-',
                        organization: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
                        value: feature.properties.solutioncost ? feature.properties.solutioncost : '0',
                        status: feature.properties.solutionstatus ? (feature.properties.solutionstatus + '%') : '-',
                        priority: feature.properties.problempriority ? feature.properties.problempriority + ' Priority' : '-',
                        problemid: feature.properties.problemid,
                        popupId: 'popup'
                    };
                    itemValue = { ...item };
                    menuOptions.push('Problem');
                    popups.push(itemValue);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'mep_projects_temp_locations') {
                    const item = {
                        layer: 'MEP Temporary Location',
                        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
                        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
                        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
                        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
                        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
                        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
                    }
                    menuOptions.push('MEP Temporary Location');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'mep_projects_temp_locations') {
                    const item = {
                        layer: 'MEP Temporary Location',
                        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
                        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
                        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
                        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
                        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
                        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
                    }
                    menuOptions.push('MEP Temporary Location');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'mep_projects_detention_basins') {
                    const item = {
                        layer: 'MEP Detention Basin',
                        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
                        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
                        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
                        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
                        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
                        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
                    }
                    menuOptions.push('MEP Detention Basin');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'mep_projects_channels') {
                    const item = {
                        layer: 'MEP Channel',
                        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
                        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
                        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
                        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
                        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
                        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
                    }
                    menuOptions.push('MEP Channel');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'mep_projects_storm_outfalls') {
                    const item = {
                        layer: 'MEP Storm Outfall',
                        feature: feature.properties.proj_name ? feature.properties.proj_name : '-',
                        projectno: feature.properties.proj_no ? feature.properties.proj_no : '-',
                        mepstatus: feature.properties.mep_status ? feature.properties.mep_status : '-',
                        mepstatusdate: feature.properties.status_date ? feature.properties.status_date : '-',
                        notes: feature.properties.mhfd_notes ? feature.properties.mhfd_notes : '-',
                        servicearea: feature.properties.servicearea ? feature.properties.servicearea : '-'
                    }
                    menuOptions.push('MEP Storm Outfall');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'watershed_service_areas') {
                    const item = {
                        layer: 'Service Area',
                        feature: feature.properties.servicearea ? feature.properties.servicearea : '-',
                        watershedmanager: feature.properties.watershedmanager ? feature.properties.watershedmanager : '-',
                        constructionmanagers: feature.properties.constructionmanagers ? feature.properties.constructionmanagers : '-',
                    }
                    menuOptions.push('Service Area');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === 'catchments' || feature.source === 'basin') {
                    const item = {
                        layer: 'Watershed',
                        feature: feature.properties.str_name ? feature.properties.str_name : 'No name'
                    }
                    menuOptions.push('Watershed');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === ROUTINE_NATURAL_AREAS) {
                    const item = {
                        layer: 'Vegetation Management - Natural Area',
                        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
                        contract: feature.properties.contract ? feature.properties.contract : '-',
                        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
                        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
                        acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-'
                    }
                    menuOptions.push('Vegetation Management - Natural Area');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === ROUTINE_WEED_CONTROL) {
                    const item = {
                        layer: 'Vegetation Management - Weed Control',
                        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
                        contract: feature.properties.contract ? feature.properties.contract : '-',
                        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
                        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
                        mow_frequency: feature.properties.mow_frequency ? feature.properties.mow_frequency : '-',
                        acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-'
                    }
                    menuOptions.push('Vegetation Management - Weed Control');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === ROUTINE_DEBRIS_AREA) {
                    const item = {
                        layer: 'Debris Management Area',
                        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
                        contract: feature.properties.contract ? feature.properties.contract : '-',
                        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
                        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
                        debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
                        acreage: feature.properties.acreage ? numberWithCommas(Math.round(feature.properties.acreage * 100) / 100) : '-'
                    }
                    menuOptions.push('Debris Management Area');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === ROUTINE_DEBRIS_LINEAR) {
                    const item = {
                        layer: 'Debris Management Linear',
                        feature: feature.properties.work_item_name ? feature.properties.work_item_name : '-',
                        contract: feature.properties.contract ? feature.properties.contract : '-',
                        contractor: feature.properties.contractor ? feature.properties.contractor : '-',
                        local_gov: feature.properties.local_gov ? feature.properties.local_gov : '-',
                        debris_frequency: feature.properties.debris_frequency ? feature.properties.debris_frequency : '-',
                        length: feature.properties.length ? Math.round(feature.properties.length) : '-'
                    }
                    menuOptions.push('Debris Management Linear');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                // new layers
                if (feature.source === NRCS_SOILS) {
                    const item = {
                        layer: 'NCRS Soils',
                        hydgrpdcd: feature.properties.hydgrpdcd,
                        muname: feature.properties.muname,
                        aws0150wta: feature.properties.aws0150wta,
                        drclassdcd: feature.properties.drclassdcd,
                        nrcsweb: 'NA'
                    }
                    menuOptions.push('NCRS Soils');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === DWR_DAM_SAFETY) {
                    const item = {
                        layer: 'DWR Dam Safety',
                        dam_name: feature.properties.dam_name,
                        hazard_class: feature.properties.hazard_class,
                        year_completed: feature.properties.year_completed,
                        dam_height: feature.properties.dam_height,
                        more_information: feature.properties.more_information
                    }
                    menuOptions.push('DWR Dam Safety');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === STREAM_MANAGEMENT_CORRIDORS) {
                    const item = {
                        layer: 'Stream Management Corridors',
                        scale: feature.properties.scale,
                        date_created: feature.properties.date_created,
                    }
                    console.log(item, feature.properties);
                    menuOptions.push('Stream Management Corridors');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === BCZ_PREBLE_MEADOW_JUMPING) {
                    const item = {
                        layer: 'BCZ - Preble’s Meadow Jumping Mouse',
                        expirationdate: feature.properties.expirationdate,
                        website: 'https://www.fws.gov/mountain-prairie/es/preblesMeadowJumpingMouse.php',
                        letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0030_PMJM_Denver_Block_Clearance_extension_accessible_signed.pdf',
                        map: `https://www.fws.gov/mountain-prairie/es/species/mammals/preble/9-2016_USFWS_Preble's_map_Denver_Metro_Area.pdf`
                    }
                    menuOptions.push('BCZ - Preble’s Meadow Jumping Mouse');
                    popups.push(item);
                    console.log('my item is ', item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === BCZ_UTE_LADIES_TRESSES_ORCHID) {
                    const item = {
                        layer: 'BCZ - Ute Ladies Tresses Orchid',
                        expirationdate: feature.properties.expirationdate,
                        website: 'https://www.fws.gov/mountain-prairie/es/uteLadiestress.php',
                        letter: 'https://www.fws.gov/mountain-prairie/es/Library/2020-TA-0031_ULTO_Denver_Block_Clearance_extension_accessible_signed.pdf',
                        map: 'https://www.fws.gov/mountain-prairie/es/species/plants/uteladiestress/BlockClearanceMap2008.pdf'
                    }
                    menuOptions.push('BCZ - Ute Ladies Tresses Orchid');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === RESEARCH_MONITORING) {
                    const item = {
                        layer: 'Research/Monitoring',
                        sitename: feature.properties.sitename,
                        sitetype: feature.properties.sitetype,
                        bmptype: feature.properties.bmptype,
                    }
                    menuOptions.push('Research/Monitoring');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === CLIMB_TO_SAFETY) {
                    const item = {
                        layer: 'Climb to Safety',
                    }
                    menuOptions.push('Climb to Safety');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                if (feature.source === SEMSWA_SERVICE_AREA) {
                    const item = {
                        layer: 'SEMSWA Service Area',
                    }
                    menuOptions.push('SEMSWA Service Area');
                    popups.push(item);
                    ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                }
                
                for (const component of COMPONENT_LAYERS.tiles) {
                    if (feature.source === component) {
                        const item = {
                            layer: 'Components',
                            subtype: feature.properties.type ? feature.properties.type : '-',
                            status: feature.properties.subtype ? feature.properties.subtype : '-',
                            estimatedcost: feature.properties.original_cost ? feature.properties.original_cost : '-',
                            studyname: feature.properties.mdp_osp_study_name ? feature.properties.mdp_osp_study_name : '-',
                            jurisdiction: feature.properties.jurisdiction ? feature.properties.jurisdiction : '-',
                            problem: 'Dataset in development'
                        };
                        const name = feature.source.split('_').map((word: string) => word[0].toUpperCase() + word.slice(1)).join(' ');
                        menuOptions.push(name);
                        popups.push(item);
                        ids.push({layer: feature.layer.id.replace(/_\d+$/, ''), id: feature.properties.cartodb_id});
                    }
                }
            }

            if (popups.length) {
                const html = loadMenuPopupWithData(menuOptions, popups);
                if (html) {
                    popup.remove();
                    popup = new mapboxgl.Popup();
                    popup.setLngLat(e.lngLat)
                        .setHTML(html)
                        .addTo(map);
                    for (const index in popups) {
                        console.log(index);
                        document.getElementById('menu-' + index)?.addEventListener('click', showPopup.bind(index, index, popups.length, ids[index]));
                        document.getElementById('buttonPopup-' + index)?.addEventListener('click', seeDetails.bind(popups[index], popups[index]));
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
    const addMapListeners = async (key: string) => {
        const styles = { ...tileStyles as any };
        const availableLayers: any[] = [];
        if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (!map.getLayer(key + '_' + index)) {
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
                map.on('mousemove', key + '_' + index, (e: any) => {
                    if (hovereableLayers.includes(key)) {
                        showHighlighted(key, e.features[0].properties.cartodb_id);
                    }
                    if (key.includes('projects') || key === 'problems') {
                        map.getCanvas().style.cursor = 'pointer';
                        setSelectedOnMap(e.features[0].properties.cartodb_id, key);
                    } else {
                        setSelectedOnMap(-1, '');
                    }
                });
                map.on('mouseleave', key + '_' + index, (e: any) => {
                    if (hovereableLayers.includes(key)) {
                        hideOneHighlighted(key);
                    }
                    map.getCanvas().style.cursor = '';
                    setSelectedOnMap(-1, '');
                });
            });
            setAllLayers(allLayers => [...allLayers, ...availableLayers]);

            map.on('mouseenter', key, () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', key, () => {
                map.getCanvas().style.cursor = '';
            })
        }
    }


    const loadMenuPopupWithData = (menuOptions: any[], popups: any[]) => ReactDOMServer.renderToStaticMarkup(

        <>
            {menuOptions.length === 1 ? <> { (menuOptions[0] !== 'Project' && menuOptions[0] !== 'Problem') ? loadComponentPopup(0, popups[0], !notComponentOptions.includes(menuOptions[0])) :
                                menuOptions[0] === 'Project' ? loadMainPopup(0, popups[0], test, true) : loadMainPopup(0, popups[0], test)}
                                </> :
            <div className="map-pop-02">
              <div className="headmap">LAYERS</div>
              <div className="layer-popup">
                {
                    menuOptions.map((menu: any, index: number) => {
                        return (
                            <div>
                                <Button id={'menu-' + index} className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/><span className="text-popup-00"> {menu}</span> <RightOutlined /></Button>
                                { (menu !== 'Project' && menu !== 'Problem') ? loadComponentPopup(index, popups[index], !notComponentOptions.includes(menuOptions[index])) :
                                menu === 'Project' ? loadMainPopup(index, popups[index], test, true) : loadMainPopup(index, popups[index], test)}
                            </div>
                        )
                    })
                }
            </div>
            </div>}
        </>
    );
    const loadMenuPopup = () => ReactDOMServer.renderToStaticMarkup(
        <>
            <div className="map-pop-02">
              <div className="headmap">LAYERS</div>
              <div className="layer-popup">
                <Button id="cochi" className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Detention Facilities <RightOutlined /></Button>
                <div id="xd" className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> Problems <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Watersheds <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> MEP Referrals <RightOutlined /></Button>
                <div className="map-pop-00">
                  <Card hoverable>
                    <div className="bodymap">
                      <h4>Irondale Gulch - Montbello Tributary @ Upper Irondale Gulch Watershed 2019</h4>
                      <h6>Denver</h6>
                      <h5>$$2,134,000 <span style={{float: 'right'}}><b>4</b> Components</span></h5>
                      <hr/>
                      <div style={{display: 'flex', width:'100%', marginTop: '12px'}}>
                        <p>Capital</p>
                        <span>Initiated</span>
                      </div>
                    </div>
                    <div style={{ padding: '10px', marginTop: '-15px', color: '#28C499', display:'flex'}}>
                        <Button  style={{ width: '50%', marginRight: '10px'}} className="btn-purple">Create Project</Button>
                        <Button  style={{ width: '50%', color: '#28C499' }} className="btn-borde">See Details</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
        </>
    );
    const loadMainPopup = (id: number, item: any, test: Function, sw?: boolean) =>(
        <>

            <MainPopup id={id} item={item} test={test} sw={sw}></MainPopup>
        </>
    );

    const loadComponentPopup = (index: number, item: any, isComponent: boolean) => (
        <>
            <ComponentPopup id={index} item={item} isComponent={isComponent}></ComponentPopup>
        </>
    );

    const popUpContent = (trigger: string, item: any) => ReactDOMServer.renderToStaticMarkup(
        <>
            {trigger !== COMPONENTS_TRIGGER ?
                <MainPopup
                    trigger={trigger}
                    item={item} /> :
                <ComponentPopup
                    item={item} />}
        </>
    );



    const refreshSourceLayers = (id: string) => {
        const mapSource = map.getSource(id);
        if (mapSource) {
            map.removeLayer(id);
            if (id !== COMPONENTS_TRIGGER) map.removeLayer(id + '_stroke');
            map.removeSource(id);
        }
    }



    const selectCheckboxes = (selectedItems: Array<LayersType>) => {
        const deleteLayers = selectedLayers.filter(layer => !selectedItems.includes(layer as string));
        deleteLayers.forEach((layer: LayersType) => {
            removeTilesHandler(layer);
        });
        updateSelectedLayers(selectedItems);
    }

    const handleSelectAll = () => {
        updateSelectedLayers(SELECT_ALL_FILTERS as Array<LayersType>);
    }

    const handleResetAll = () => {
        selectedLayers.forEach((layer: LayersType) => {
            removeTilesHandler(layer);
        })
        updateSelectedLayers([]);
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

    const removeTileLayers = (key: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {

            map.removeLayer(key + '_' + index);
        });

        if (map.getSource(key)) {
            map.removeSource(key);
        }
    };
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
        map.flyTo({ center: coord, zoom: 14.5 });
        const placeName = keyword[1];
        setKeyword(placeName);
    };
    //end geocoder

    const showMHFD = () => {
        setAutocomplete('')
        const user = store.getState().profile.userInformation;
        user.polygon = coordinatesMHFD;
        saveUserInformation(user);
        if (!opacityLayer) {
            hideOpacity();
        }
        setOpacityLayer(false);
        setCoordinatesJurisdiction([]);
        const optionsProblem = { ...filterProblemOptions };
        const optionsProject = { ...filterProjectOptions };
        optionsProblem['servicearea'] = '';
        optionsProject['servicearea'] = '';
        optionsProblem['county'] = '';
        optionsProject['county'] = '';
        optionsProblem['jurisdiction'] = '';
        optionsProject['jurisdiction'] = '';
        setFilterProblemOptions(optionsProblem);
        setFilterProjectOptions(optionsProject);
        setNameZoomArea('Mile High Flood District');
        setBBOXComponents({ bbox: [], centroids: [] })
        //setArea(name);
    }

    const layerObjects: any = selectedLayers.filter(element => typeof element === 'object');
    const layerStrings = selectedLayers.filter(element => typeof element !== 'object');
    const [selectedCheckBox, setSelectedCheckBox] = useState(selectedLayers);

    return (
        <div className="map">
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
                componentsOfProblems={componentsOfProblems}
                loaderTableCompoents={loaderTableCompoents}
                componentCounter={componentCounter}
                getComponentCounter={getComponentCounter}
            />}
            <div id="map" />
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

                {/*<div
                    ref={geocoderRef}
                    className="geocoder"
                    style={{ width: '200px', height: '35px' }}
                />
                <Button className="btn-purple"><img src="/Icons/icon-04.svg" alt=""/></Button>*/}

            </div>

            {/* <Dropdown
                overlay={MapTypesView({ dropdownItems, selectMapStyle })}
                className="btn-03"
                trigger={['click']}>
                <Button>
                    {dropdownItems.items[dropdownItems.default].type} <img src="/Icons/icon-12.svg" alt="" />
                </Button>
            </Dropdown> */}

            {/*<div className="m-footer">
              <Collapse accordion defaultActiveKey={['1']} expandIconPosition="right">
                <Panel header="Legend" key="1">
                <hr />
                <div className="scroll-footer">
                    {layerObjects.filter((element: any)  => element.name === PROJECTS_MAP_STYLES.name ).length ? <>
                        <p><span style={{ background: '#ffdd00', border: 'hidden' }} />Projects</p>
                    </> : ''}
                    {layerStrings.includes(PROBLEMS_TRIGGER) ? <>
                    <p><span className="color-footer-problem" style={{ background: '#FF342F', border: 'hidden'   }} />Problems</p>
                    </> : ''}
                    {layerObjects.filter((element: any)  => element.name === COMPONENT_LAYERS.name ).length ? <>
                        <p><span style={{ background: '#3EE135', border: 'hidden' }} />Components</p>
                    </> : ''}
                     {layerStrings.includes(MHFD_BOUNDARY_FILTERS) ? <>
                        <p><span className="color-footer-boundary" style={{ border: '1px dashed' }} />MHFD Boundary</p>
                    </> : '' }
                </div>
                </Panel>
              </Collapse>

            </div>*/}

            <div className="m-zoom">
                <Button className="btn-green"><img src="/Icons/icon-87.svg" width="15px"
                onClick={() => {
                    function success(position: any) {
                        const latitude  = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        console.log(latitude, longitude);
                        map.flyTo({
                            center: [longitude, latitude],
                            zoom: 14
                            });
                      }
                    
                      function error() {
                        // thinking 
                      }
                    
                      if(!navigator.geolocation) {
                          // add some error here
                      } else {
                        navigator.geolocation.getCurrentPosition(success, error);
                      }
                }}
                /></Button>
                <Button style={{ borderRadius: '4px' }} onClick={() => showMHFD()} ><img className="img-icon" /></Button>
                {/*<Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>*/}
            </div>

            <div className="menu-desktop collapse-tabs">
            <Collapse  accordion>
               <Panel header="Explore Confluence" key="1">
                <Button className="btn-map"><img src="/Icons/menu-green-02.svg" alt="" width="18px"/> Map</Button>
                <div className="ggyyyy">
                 <div className="mhfd-mobile">
                   <h6>About the Platform</h6>
                   <p>Confluence is your one-stop Mile High Flood District data portal.
                   MHFD has developed Confluence from the ground up to meet the unique data needs of a
                   regional flood control and stream management district.</p>
                 </div>
                 <div className="ffoo">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </div>
                </div>
               </Panel>
             </Collapse>
            </div>
        </div>

    )
}

export default Map;
