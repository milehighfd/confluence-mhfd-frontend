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
import { Dropdown, Button, Collapse } from 'antd';
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
    MAP_RESIZABLE_TRANSITION, FLOODPLAINS_NON_FEMA_FILTERS, ROUTINE_NATURAL_AREAS, ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER
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
    applyFilter
}: MapProps) => {
    // console.log( mapSearch);=
    let geocoderRef = useRef<HTMLDivElement>(null);
    const [dropdownItems, setDropdownItems] = useState({ default: 1, items: MAP_DROPDOWN_ITEMS });
    const { toggleModalFilter, boundsMap, tabCards,
        filterTabNumber, coordinatesJurisdiction, opacityLayer } = useMapState();
    const { setBoundMap, getParamFilterComponents, getParamFilterProblems, 
            getParamFilterProjects, setCoordinatesJurisdiction } = useMapDispatch();

    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [recentSelection, setRecentSelection] = useState<LayersType>('');
    const [zoomValue, setZoomValue] = useState(0);
    // const [ spinValue, setSpinValue] = useState(true);
    const user = store.getState().profile.userInformation;
    const [visible, setVisible] = useState(true);
    const [zoomEndCounter, setZoomEndCounter] = useState(0);
    const [dragEndCounter, setDragEndCounter] = useState(0);
    //const [layerOpacity, setLayerOpacity] = useState(false);
    const coor: any[][] = [];
    const [data, setData] = useState({
        problemid: '',
        id: '',
        objectid: '',
        value: '',
        type: ''
    });
    //let mask: any;

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
        console.log('apply opacity');
        if (coordinatesJurisdiction.length > 0) {
            mask = turf.polygon(coordinatesJurisdiction);
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
                        "fill-color": "white",
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
                        "fill-color": "white",
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

    if (coordinatesJurisdiction.length > 0) {
        if (map.isStyleLoaded()) {
            applyOpacity();
        }
    }

    if (user?.polygon[0]) {
        let bottomLongitude = user.polygon[0][0];
        let bottomLatitude = user.polygon[0][1];
        let topLongitude = user.polygon[0][0];
        let topLatitude = user.polygon[0][1];
        for (let index = 0; index < user.polygon.length; index++) {
            const element = user.polygon[index];
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
        coor.push([topLongitude, topLatitude])
    }

    useEffect(() => {
        if (map) {
            if (highlighted.type) {
                console.log('HIGHLIGHT', highlighted.type);
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
            touchZoomRotate: false,
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

        //console.log('DEFAULT STYLE', dropdownItems.items[dropdownItems.default].style);

        /* map.on('load', function() {
            map.addSource('layer-opacity', {
                'type': 'raster',
                'url': dropdownItems.items[dropdownItems.default].style, //hosted style id
            });
            map.addLayer({
                'id': 'layer-opacity',
                'source': 'layer-opacity',
                'type': 'raster'
            });
        }) */

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
                "fill-color": "white",
                'fill-opacity': 0.8
            }
        }); */

        map.once('zoomend', () => {
            value += 1;
            if (value >= 2) {
                const bounds = map.getBounds();
                const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
                setBoundMap(boundingBox);
                console.log(applyFilter);
                if (applyFilter) {
                    if (toggleModalFilter) {
                        getParamsFilter(boundingBox);
                    } else {
                        setFilterCoordinates(boundingBox, tabCards);
                    }
                }
                hideLayerOpacity();
            }
            
        });
        map.once('dragend', () => {
            const bounds = map.getBounds();
            const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
            setBoundMap(boundingBox);
            console.log(applyFilter);
            
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
                hideLayerOpacity();
            }
            
        });
        const updateZoom = () => {
            console.log('update zoom')
            const zoom = map.getZoom().toFixed(2);
            setZoomValue(zoom);
        }
        let _ = 0;
        map.on('zoomend', () => {
            setZoomEndCounter(_++);
            console.log(zoomEndCounter);
            hideLayerOpacity();
        });
        let __ = 1;// #good practices
        map.on('dragend', () => {
            console.log('move end')
            setDragEndCounter(__++);
            hideLayerOpacity();
        });
        map.on('load', updateZoom);
        map.on('move', updateZoom);

    }, []);


    useEffect(() => {
        console.log('my apply filter ', applyFilter, zoomEndCounter);
        const bounds = map.getBounds();
        const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
        setBoundMap(boundingBox);
        console.log(applyFilter);
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

        /* if (opacityLayer) {
            showOpacityLayer('opacity_layer');
        } */


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
                }
            };
            waiting();
        });
        if (map.isStyleLoaded()) {
            applyMapLayers();
        } else {
            const waiting = () => {
                if (!map.isStyleLoaded()) {
                    setTimeout(waiting, 50);
                } else {
                    applyMapLayers();
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
                    setCoordinatesJurisdiction([]);
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
        setTimeout(() => {
            setSpinValue(false);
        }, 2000);
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
        const styles = { ...tileStyles as any };
        styles[key].forEach((style: LayerStylesType, index: number) => {
            if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id])
            }
        });
    };
    const hideHighlighted = () => {
        const styles = { ...tileStyles as any };
        for (const key of highlightedLayers) {
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
            if (key.includes('problems') || key.includes('projects')) {
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
                })
            }
            map.addLayer({
                id: key + '_' + index,
                source: key,
                ...style
            });

            map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
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
        const polygonTurfCoords = turf.polygon(polygon);
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
        console.log('item::::', item);

        setVisible(true);
        setData(item);
        if (item.problemid) {
            existDetailedPageProblem(item.problemid);
        } else {
            const url = 'objectid=' + item.objectid + '&cartoid=' + item.valueid + '&type=' + item.type;
            existDetailedPageProject(url);
        }


    }

    const addMapListeners = (key: string) => {
        const styles = { ...tileStyles as any };
        if (styles[key]) {
            styles[key].forEach((style: LayerStylesType, index: number) => {
                if (!map.getLayer(key + '_' + index)) {
                    return;
                }
                map.on('click', key + '_' + index, (e: any) => {
                    let html: any = null;
                    if (map.getLayoutProperty(key + '_' + index, 'visibility') === 'none') {
                        return;
                    }
                    let itemValue;
                    if (key === 'problems') {
                        getComponentCounter(e.features[0].properties.problemid || 0, 'problemid', setCounterPopup);
                        const item = {
                            type: 'problems',
                            title: e.features[0].properties.problemtype ? (e.features[0].properties.problemtype + ' Problem') : '-',
                            name: e.features[0].properties.problemname ? e.features[0].properties.problemname : '-',
                            organization: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                            value: e.features[0].properties.solutioncost ? e.features[0].properties.solutioncost : '0',
                            status: e.features[0].properties.solutionstatus ? (e.features[0].properties.solutionstatus + '%') : '-',
                            priority: e.features[0].properties.problempriority ? e.features[0].properties.problempriority + ' Priority' : '-',
                            problemid: e.features[0].properties.problemid,
                            popupId: 'popup'
                        };
                        itemValue = { ...item };
                        html = loadMainPopup(item, test);
                    }
                    if (key.includes('projects') && !key.includes('mep')) {
                        getComponentCounter(e.features[0].properties.projectid || 0, 'projectid', setCounterPopup);
                        const item = {
                            type: key,
                            title: 'Project',
                            name: e.features[0].properties.projectname ? e.features[0].properties.projectname : e.features[0].properties.requestedname ? e.features[0].properties.requestedname : '-',
                            organization: e.features[0].properties.sponsor ? e.features[0].properties.sponsor : 'No sponsor',
                            value: e.features[0].properties.finalcost ? e.features[0].properties.finalcost : e.features[0].properties.estimatedcost ? e.features[0].properties.estimatedcost : '0',
                            projecctype: e.features[0].properties.projectsubtype ? e.features[0].properties.projectsubtype : e.features[0].properties.projecttype ? e.features[0].properties.projecttype : '-',
                            status: e.features[0].properties.status ? e.features[0].properties.status : '-',
                            objectid: e.features[0].properties.objectid,
                            valueid: e.features[0].properties.cartodb_id,
                            id: e.features[0].properties.projectid,
                            popupId: 'popup'
                        };
                        itemValue = { ...item };
                        itemValue.value = item.valueid;
                        html = loadMainPopup(item, test);
                    }
                    if (COMPONENT_LAYERS.tiles.includes(key)) {
                        const item = {
                            layer: 'Components',
                            subtype: e.features[0].properties.type ? e.features[0].properties.type : '-',
                            status: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
                            estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                            studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
                            jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                            problem: 'Dataset in development'
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'mep_projects_temp_locations') {
                        const item = {
                            layer: 'MEP Temporary Location',
                            feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                            projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                            mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                            mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                            notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                            servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === 'mep_projects_detention_basins') {
                        const item = {
                            layer: 'MEP Detention Basin',
                            feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                            projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                            mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                            mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                            notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                            servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === 'mep_projects_channels') {
                        const item = {
                            layer: 'MEP Channel',
                            feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                            projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                            mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                            mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                            notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                            servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === 'mep_projects_storm_outfalls') {
                        const item = {
                            layer: 'MEP Storm Outfall',
                            feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                            projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                            mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                            mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                            notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                            servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === 'watershed_service_areas') {
                        const item = {
                            layer: 'Service Area',
                            feature: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-',
                            watershedmanager: e.features[0].properties.watershedmanager ? e.features[0].properties.watershedmanager : '-',
                            constructionmanagers: e.features[0].properties.constructionmanagers ? e.features[0].properties.constructionmanagers : '-',
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === 'catchments' || key === 'basin') {
                        const item = {
                            layer: 'Watershed',
                            feature: e.features[0].properties.str_name ? e.features[0].properties.str_name : 'No name'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === ROUTINE_NATURAL_AREAS) {
                        const item = {
                            layer: 'Vegetation Management - Natural Area',
                            feature: e.features[0].properties.work_item_name ? e.features[0].properties.work_item_name : '-',
                            contract: e.features[0].properties.contract ? e.features[0].properties.contract : '-',
                            contractor: e.features[0].properties.contractor ? e.features[0].properties.contractor : '-',
                            local_gov: e.features[0].properties.local_gov ? e.features[0].properties.local_gov : '-',
                            acreage: e.features[0].properties.acreage ? numberWithCommas(Math.round(e.features[0].properties.acreage * 100) / 100) : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === ROUTINE_WEED_CONTROL) {
                        const item = {
                            layer: 'Vegetation Management - Weed Control',
                            feature: e.features[0].properties.work_item_name ? e.features[0].properties.work_item_name : '-',
                            contract: e.features[0].properties.contract ? e.features[0].properties.contract : '-',
                            contractor: e.features[0].properties.contractor ? e.features[0].properties.contractor : '-',
                            local_gov: e.features[0].properties.local_gov ? e.features[0].properties.local_gov : '-',
                            mow_frequency: e.features[0].properties.mow_frequency ? e.features[0].properties.mow_frequency : '-',
                            acreage: e.features[0].properties.acreage ? numberWithCommas(Math.round(e.features[0].properties.acreage * 100) / 100) : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === ROUTINE_DEBRIS_AREA) {
                        const item = {
                            layer: 'Debris Management Area',
                            feature: e.features[0].properties.work_item_name ? e.features[0].properties.work_item_name : '-',
                            contract: e.features[0].properties.contract ? e.features[0].properties.contract : '-',
                            contractor: e.features[0].properties.contractor ? e.features[0].properties.contractor : '-',
                            local_gov: e.features[0].properties.local_gov ? e.features[0].properties.local_gov : '-',
                            debris_frequency: e.features[0].properties.debris_frequency ? e.features[0].properties.debris_frequency : '-',
                            acreage: e.features[0].properties.acreage ? numberWithCommas(Math.round(e.features[0].properties.acreage * 100) / 100) : '-'
                        }
                        html = loadComponentPopup(item);
                    }
                    if (key === ROUTINE_DEBRIS_LINEAR) {
                        const item = {
                            layer: 'Debris Management Linear',
                            feature: e.features[0].properties.work_item_name ? e.features[0].properties.work_item_name : '-',
                            contract: e.features[0].properties.contract ? e.features[0].properties.contract : '-',
                            contractor: e.features[0].properties.contractor ? e.features[0].properties.contractor : '-',
                            local_gov: e.features[0].properties.local_gov ? e.features[0].properties.local_gov : '-',
                            debris_frequency: e.features[0].properties.debris_frequency ? e.features[0].properties.debris_frequency : '-',
                            length: e.features[0].properties.length ? Math.round(e.features[0].properties.length) : '-'
                        }
                        html = loadComponentPopup(item);
                    }
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
                map.on('mousemove', key + '_' + index, (e: any) => {
                    if (key.includes('projects') || key === 'problems') {
                        map.getCanvas().style.cursor = 'pointer';
                        setSelectedOnMap(e.features[0].properties.cartodb_id, key);
                    } else {
                        setSelectedOnMap(-1, '');
                    }
                });
                map.on('mouseleave', key + '_' + index, () => {
                    map.getCanvas().style.cursor = '';
                    setSelectedOnMap(-1, '');
                })
            });
            map.on('mouseenter', key, () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', key, () => {
                map.getCanvas().style.cursor = '';
            })
        }
    }

    const loadMainPopup = (item: any, test: Function) => ReactDOMServer.renderToStaticMarkup(
        <>
            <MainPopup item={item} test={test} sw={true}></MainPopup>
        </>
    );

    const loadComponentPopup = (item: any) => ReactDOMServer.renderToStaticMarkup(
        <>
            <ComponentPopup item={item}></ComponentPopup>
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

    const layerObjects: any = selectedLayers.filter(element => typeof element === 'object');
    const layerStrings = selectedLayers.filter(element => typeof element !== 'object');
    const [selectedCheckBox, setSelectedCheckBox] = useState(selectedLayers);

    return (
        <div className="map">
            {displayModal && visible && <DetailedModal
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
            <div id="map" style={{ width: '100%', height: '100%' }} />
            <div className="m-head">
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
                <Dropdown overlayClassName="dropdown-map-layers"
                    visible={visibleDropdown}
                    onVisibleChange={(flag: boolean) => {
                        // selectCheckboxes(selectedCheckBox);
                        setVisibleDropdown(flag);

                    }}
                    overlay={MapFilterView({ selectCheckboxes, setVisibleDropdown, selectedLayers, setSelectedCheckBox, removePopup, isExtendedView })}
                    className="btn-02"
                    trigger={['click']}>
                    <Button>
                        <img src="/Icons/icon-05.svg" alt="" />
                    </Button>
                </Dropdown>
            </div>

            {/* <Dropdown
                overlay={MapTypesView({ dropdownItems, selectMapStyle })}
                className="btn-03"
                trigger={['click']}>
                <Button>
                    {dropdownItems.items[dropdownItems.default].type} <img src="/Icons/icon-12.svg" alt="" />
                </Button>
            </Dropdown> */}

            <div className="m-footer">
                <Collapse accordion defaultActiveKey={['1']} expandIconPosition="right">
                    <Panel header="Legend" key="1">
                        <hr />
                        <div className="scroll-footer">
                            {layerObjects.filter((element: any) => element.name === PROJECTS_MAP_STYLES.name).length ? <>
                                <p><span style={{ background: '#ffdd00', border: 'hidden' }} />Projects</p>
                            </> : ''}
                            {layerStrings.includes(PROBLEMS_TRIGGER) ? <>
                                <p><span className="color-footer-problem" style={{ background: '#FF342F', border: 'hidden' }} />Problems</p>
                            </> : ''}
                            {layerObjects.filter((element: any) => element.name === COMPONENT_LAYERS.name).length ? <>
                                <p><span style={{ background: '#3EE135', border: 'hidden' }} />Components</p>
                            </> : ''}
                            {/* {layerStrings.includes(MHFD_BOUNDARY_FILTERS) ? <>
                        <p><span className="color-footer-boundary" style={{ border: '1px dashed' }} />MHFD Boundary</p>
                    </> : '' } */}
                        </div>
                    </Panel>
                </Collapse>
            </div>

            {/* <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt="" width="12px"/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>
                </div> */}
        </div>

    )
}

export default Map;
