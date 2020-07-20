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
import { MapProps, ComponentType, ObjectLayerType, LayerStylesType } from '../../Classes/MapTypes';
import { MAP_DROPDOWN_ITEMS,
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
        MAP_RESIZABLE_TRANSITION, FLOODPLAINS_NON_FEMA_FILTERS} from "../../constants/constants";
import { Feature, Properties, Point } from '@turf/turf';
import { tileStyles} from '../../constants/mapStyles';
import { addMapGeocoder } from '../../utils/mapUtils';


const MapboxDraw= require('@mapbox/mapbox-gl-draw');

let map : any = null;
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
            setSelectedOnMap
             } : MapProps) => {

    let geocoderRef = useRef<HTMLDivElement>(null);
    const [dropdownItems, setDropdownItems] = useState({default: 1, items: MAP_DROPDOWN_ITEMS});

    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [recentSelection, setRecentSelection] = useState<LayersType>('');
    // const [ spinValue, setSpinValue] = useState(true);
    const user = store.getState().profile.userInformation;
    const coor: any[][] = [];
    if(user?.polygon[0]) {
        let bottomLongitude = user.polygon[0][0];
        let bottomLatitude = user.polygon[0][1];
        let topLongitude = user.polygon[0][0];
        let topLatitude = user.polygon[0][1];
        for (let index = 0; index < user.polygon.length; index++) {
            const element = user.polygon[index];
            if(bottomLongitude > element[0]) {
                bottomLongitude = element[0];
            }
            if(topLongitude < element[0]) {
                topLongitude = element[0];
            }
            if(bottomLatitude > element[1]) {
                bottomLatitude = element[1];
            }
            if(topLatitude < element[1]) {
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
                showHighlighted(highlighted.type, highlighted.value);
            } else {
                hideHighlighted();
            }
        }
    }, [highlighted]);

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
        }
    }, [filterComponents, componentDetailIds]);

    useEffect(() => {
        (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            dragRotate: true,
            touchZoomRotate: false,
            style: dropdownItems.items[dropdownItems.default].style, //hosted style id
            center: [ user.coordinates.longitude, user.coordinates.latitude],
            zoom: 8
        });
        if(coor[0] && coor[1]) {
            map.fitBounds(coor);
        }
        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'bottom-right');
        addMapGeocoder(map, geocoderRef);

        // Uncomment to see coords when a position in map is clicked
        // map.on('click', (e : any) => console.log(e.lngLat));

        if(polygonRef && polygonRef.current) {
            const draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: { polygon: true }
            });
            map.on('draw.create', () => replaceOldPolygon(draw));
            map.on('draw.update', () => replaceOldPolygon(draw));
            polygonRef.current.appendChild(draw.onAdd(map));
        }

        /* Special and Acquisition Projects */
        if(layers && layers.marker) {
            const mapMarker = document.createElement('div');
            mapMarker.className = 'marker';
            mapMarker.style.backgroundImage = layers.acquisition?'url("/Icons/pin-house.svg")':'url("/Icons/pin-star.svg")';

            markerRef.current!.onclick = () => {
                map.getCanvas().style.cursor = 'pointer';

                map.once('click', (e : any) => {
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
        map.on('zoomend', () => {
            value +=1;
            if(value >= 2 ) {
                const bounds = map.getBounds();
                const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
                setFilterCoordinates(boundingBox);
            }
          });
        map.on('dragend', () => {
            const bounds = map.getBounds();
            const boundingBox = bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
            setFilterCoordinates(boundingBox);

        });
    }, []);

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
        if(map.isStyleLoaded()) {
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
        setTimeout(() => {
            setSpinValue(false);
        }, 2000);
    }

    const addLayersSource = (key : string, tiles : Array<string>) => {
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
            styles[key].forEach((style : LayerStylesType, index : number) => {
                if (!components.includes(key)) {
                    console.log('watching here' , key);
                    map.setFilter(key + '_' + index, ['in', 'cartodb_id', -1]);
                } else {
                    map.setFilter(key + '_' + index, null);
                }
            });
        }
    }

    const applyFilters =  (key: string, toFilter: any) => {
        const styles = { ...tileStyles as any };        
        styles[key].forEach((style : LayerStylesType, index : number) => {
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
                    if (filterField === 'yearofstudy') {
                        for (const years of filters.split(',')) {
                            const lowerArray: any[] = ['>=',  ['get', filterField], +years];
                            const upperArray: any[] = ['<=',  ['get', filterField], +years + 9];
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
                    if (filterField === 'problemname') {
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
                allFilters.push(['in', 'cartodb_id', ['literal', [...componentDetailIds[key]]]]);
            }

            if (map.getLayer(key + '_' + index)) {
                map.setFilter(key + '_' + index, allFilters);
            }
        });
    };
    const showHighlighted = (key: string, cartodb_id: string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style : LayerStylesType, index : number) => {
            if (map.getLayer(key + '_' + index) && map.getLayoutProperty(key + '_' + index, 'visibility') !== 'none') {
                map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id', cartodb_id])
            }
        });
    };
    const hideHighlighted = () => {
        const styles = { ...tileStyles as any };
        for (const key of highlightedLayers) {
            styles[key].forEach((style : LayerStylesType, index : number) => {
                if (map.getLayer(key + '_highlight_' + index)) {
                    map.setFilter(key + '_highlight_' + index, ['in', 'cartodb_id'])
                }
            });
        }
    };
    const addTilesLayers = (key : string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style : LayerStylesType, index : number) => {
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
        styles[key].forEach((style : LayerStylesType, index : number) => {
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
        styles[key].forEach((style : LayerStylesType, index : number) => {
            if (map.getLayer(key + '_' + index)) {
                map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
            }
        });
    };

    const paintSelectedComponents = (items : Array<ComponentType>) => {
        if(map.getSource(COMPONENTS_TRIGGER)) {
            components.forEach((component : ComponentType) => {
                map.setFeatureState(
                    { source: COMPONENTS_TRIGGER, id: component.componentId },
                    { hover: false }
                );
            });

            if(items && items.length) {
                items.forEach((item : ComponentType) => {
                    map.setFeatureState(
                        { source: COMPONENTS_TRIGGER, id: item.componentId },
                        { hover: true }
                    );
                });
            }
        }
    }

    const selectMapStyle = (index : number) => {
        setDropdownItems({...dropdownItems, default: index});
    }

    const getMarkerCoords = (marker : any) => {
        const lngLat = marker.getLngLat();
        getReverseGeocode(lngLat.lng, lngLat.lat, HERE_TOKEN);
        saveMarkerCoordinates([lngLat.lng, lngLat.lat]);
    }

    const replaceOldPolygon = (draw : any) => {
        if(draw.getAll().features.length > 1) {
            const features = draw.getAll().features;
            draw.delete(features[0].id);
        }

        const polygon = draw.getAll().features[0].geometry.coordinates;
        const polygonTurfCoords = turf.polygon(polygon);
        const polygonCoords = polygon[0];

        const { geometry } = turf.centroid(polygonTurfCoords);
        savePolygonCoordinates(polygonCoords);
        getReverseGeocode(geometry?.coordinates[0], geometry?.coordinates[1], HERE_TOKEN);

        if(layers) {
            if(layers.components) {
                const selectedItems : Array<ComponentType> = [];
                const turfPoints = components.map((point : ComponentType) => turf.point(point.coordinates));
                const values = turfPoints.map((turfPoint : Feature<Point, Properties>) => turf.inside(turfPoint, polygonTurfCoords));

                components.forEach((point : ComponentType, index : number) => {
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

    const addMapListeners = (key: string) => {
        const styles = { ...tileStyles as any };
        if (styles[key]) {
            styles[key].forEach((style : LayerStylesType, index : number) => {
                if (!map.getLayer(key + '_' + index)) {
                    return;
                }
                map.on('click', key + '_' + index, (e : any) => {
                    let html: any = null;
                    if (key === 'problems') {
                        const item = {
                            type: 'problems',
                            title: e.features[0].properties.problemtype ? (e.features[0].properties.problemtype + ' Problem') : '-',
                            name: e.features[0].properties.problemname ? e.features[0].properties.problemname : '-',
                            organization: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                            value: e.features[0].properties.solutioncost ? e.features[0].properties.solutioncost : '-',
                            status: e.features[0].properties.solutionstatus ? (e.features[0].properties.solutionstatus + '%') : '-',
                            priority: e.features[0].properties.problempriority ? e.features[0].properties.problempriority : '-'
                        };
                        html = loadMainPopup(item);
                    }
                    if (key.includes('projects') && !key.includes('mep')) {
                        const item = {
                            type: 'projects',
                            title: 'Project',
                            name: e.features[0].properties.projectname ? e.features[0].properties.projectname : e.features[0].properties.requestedname ? e.features[0].properties.requestedname : '-',
                            organization: e.features[0].properties.sponsor ? e.features[0].properties.sponsor : 'No sponsor',
                            value: e.features[0].properties.finalCost ? e.features[0].properties.finalCost : e.features[0].properties.estimatedCost ? e.features[0].properties.estimatedCost : '-',
                            status: e.features[0].properties.projecttype ? e.features[0].properties.projecttype : '-',
                            projecctype: e.features[0].properties.projecctype ? e.features[0].properties.projecctype : '-'
                        };
                        html = loadMainPopup(item);
                    }
                    if (key === 'grade_control_structure') {
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
                    if (key === 'pipe_appurtenances') {
                        const item = {
                            layer: 'Components',
                            feature: 'Pipe Appurtenances',
                            description: e.features[0].properties.description ? e.features[0].properties.description: '-'
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'special_item_point') {
                        const item = {
                            layer: 'Components',
                            feature: 'Special Item Point',
                        };
                        html = loadComponentPopup(item)
                    }
                    if (key === 'special_item_linear') {
                        const item = {
                            layer: 'Components',
                            feature: 'Special Item Linear',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'special_item_area') {
                        const item = {
                            layer: 'Components',
                            feature: 'Special Item Area',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'channel_improvements_linear') {
                        const item = {
                            layer: 'Components',
                            feature: 'Channel Improvements Linear',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'channel_improvements_area') {
                        const item = {
                            layer: 'Components',
                            feature: 'Channel Improvements Area',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'removal_line') {
                        const item = {
                            layer: 'Components',
                            feature: 'Removal Line',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'removal_area') {
                        const item = {
                            layer: 'Components',
                            feature: 'Removal Area',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'storm_drain') {
                        const item = {
                            layer: 'Components',
                            feature: 'Storm Drain',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'detention_facilities') {
                        const item = {
                            layer: 'Components',
                            feature: 'Detention Facilities',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'maintenance_trails') {
                        const item = {
                            layer: 'Components',
                            feature: 'Maintenance Trails',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'land_acquisition') {
                        const item = {
                            layer: 'Components',
                            feature: 'Land Acquisition',
                        };
                        html = loadComponentPopup(item);
                    }
                    if (key === 'landscaping_area') {
                        const item = {
                            layer: 'Components',
                            feature: 'Landscaping Area',
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

                    const description = e.features[0].properties.description ? e.features[0].properties.description : '-';
                    if (html) {
                        popup.remove();
                        popup = new mapboxgl.Popup();
                        popup.setLngLat(e.lngLat)
                             .setHTML(html)
                             .addTo(map);
                    }
                });
                map.on('mouseenter', key + '_' + index, (e: any) => {
                    map.getCanvas().style.cursor = 'pointer';
                    if (key.includes('projects') || key === 'problems') {
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
    const loadMainPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
        <>
            <MainPopup item={item}></MainPopup>
        </>
    );

    const loadComponentPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
        <>
            <ComponentPopup item={item}></ComponentPopup>
        </>
    );

    const popUpContent = (trigger : string, item : any) => ReactDOMServer.renderToStaticMarkup(
        <>
            {trigger !== COMPONENTS_TRIGGER ?
                <MainPopup
                    trigger={trigger}
                    item={item} /> :
                <ComponentPopup
                    item={item} />}
        </>
    );



    const refreshSourceLayers = (id : string) => {
        const mapSource = map.getSource(id);
        if(mapSource) {
            map.removeLayer(id);
            if(id !== COMPONENTS_TRIGGER) map.removeLayer(id + '_stroke');
            map.removeSource(id);
        }
    }



    const selectCheckboxes = (selectedItems : Array<LayersType>) => {
        const deleteLayers = selectedLayers.filter(layer => !selectedItems.includes(layer as string));
        deleteLayers.forEach((layer : LayersType) => {
            removeTilesHandler(layer);
        });
        updateSelectedLayers(selectedItems);
    }

    const handleSelectAll = () => {
        updateSelectedLayers(SELECT_ALL_FILTERS as Array<LayersType>);
    }

    const handleResetAll = () => {
        selectedLayers.forEach((layer : LayersType) => {
            removeTilesHandler(layer);
        })
        updateSelectedLayers([]);
    }

    const removeTilesHandler = (selectedLayer : LayersType) => {
        if (typeof selectedLayer === 'object') {
            selectedLayer.tiles.forEach((subKey : string) => {
                hideLayers(subKey);
            });
        } else {
            hideLayers(selectedLayer);
        }
    }

    const removeTileLayers = (key : string) => {
        const styles = { ...tileStyles as any};
        styles[key].forEach((style : LayerStylesType, index : number) => {

            map.removeLayer(key + '_' + index);
        });

        if (map.getSource(key)) {
            map.removeSource(key);
        }
    };
    const layerObjects: any = selectedLayers.filter( element => typeof element === 'object');
    const layerStrings = selectedLayers.filter( element => typeof element !== 'object');
    const [ selectedCheckBox, setSelectedCheckBox ] = useState(selectedLayers);
    return (
            <div className="map">
            <div id="map" style={{ width: '100%', height: '100%' }} />
            <div className="m-head">
                <div
                    ref={geocoderRef}
                    className="geocoder"
                    style={{ width: '200px', height: '35px' }}
                />
                {/*<Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>*/}
                <Dropdown overlayClassName="dropdown-map-layers"
                    visible={visibleDropdown}
                    onVisibleChange={(flag : boolean) => {
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
                    {layerObjects.filter((element: any)  => element.name === PROJECTS_MAP_STYLES.name ).length ? <>
                        <p><span style={{ background: '#ffdd00', border: 'hidden' }} />Projects - Capital</p>
                        <p><span style={{ background: '#29c499', border: 'hidden' }} />Projects - Maintenance</p>
                        <p><span style={{ background: '#951eba', border: 'hidden' }} />Projects - Study</p>
                    </> : ''}
                    {layerStrings.includes(PROBLEMS_TRIGGER) ? <>
                    <p><span className="color-footer-problem" style={{ border: '1px dashed' }} />Problems</p>
                    </> : ''}
                    {layerObjects.filter((element: any)  => element.name === COMPONENT_LAYERS.name ).length ? <>
                        <p><img src="/mapIcons/waterfall.svg" alt=""/> Grade Control Structure</p>
                        <p><img src="/mapIcons/outfall.svg" alt=""/> Pipe Appurtenances</p>
                        <p><img src="/mapIcons/star.svg" alt=""/> Special Item</p>
                        <p><span style={{ background: '#ffc700', border: 'hidden' }} />Special Item</p>
                        <p><span style={{ background: '#34b356', height: '3px', marginTop: '7px', border: 'hidden' }} />Channel Improvement</p>
                        <p><span style={{ background: '#c6cecf', height: '3px', marginTop: '7px', border: 'hidden' }} />Removal Line</p>
                        <p><span style={{ background: '#34b356', height: '3px', marginTop: '7px', border: 'hidden' }} />Storm Drain</p>
                        <p><span style={{ background: '#1f67f2', border: 'hidden' }} />Detention Facility</p>
                        <p><span style={{ background: '#956557', height: '3px', marginTop: '7px', border: 'hidden' }} />Maintenance Trail</p>
                        <p><span style={{ background: '#f2d852', border: 'hidden' }} />Land Acquisition</p>
                        <p><span style={{ background: '#38bb45', border: 'hidden' }} />Landscaping Area</p>
                    </> : ''}
                    {layerObjects.filter((element: any)  => element.name === MEP_PROJECTS.name ).length ? <>
                        <p><span style={{ background: '#968862', height: '3px', marginTop: '7px', border: 'hidden' }} />Channel</p>
                        <p><span style={{ background: '#60bde6', border: 'hidden' }} />Detention Basin</p>
                        <p><img src="/mapIcons/construction.svg" alt=""/> MEP Project</p>
                    </> : '' }
                    {layerObjects.filter((element: any)  => element.name === ROUTINE_MAINTENANCE.name ).length ? <>
                        <p><span style={{ background: '#d9ceba', border: 'hidden' }} />Routine Natural Area</p>
                        <p><span style={{ background: '#4cfca4', border: 'hidden' }} />Routine Weed Control</p>
                        <p><span style={{ background: '#434243', height: '3px', marginTop: '7px', border: 'hidden' }} />Debris</p>
                    </> : '' }
                    {layerStrings.includes(FLOODPLAINS_FEMA_FILTERS) ? <>
                        <p><span style={{ background: '#f7b532', border: 'hidden' }} />National Flood Hazard Layer</p>
                    </> : '' }
                    {layerStrings.includes(FLOODPLAINS_NON_FEMA_FILTERS) ? <>
                        <p><span style={{ background: 'red', border: 'hidden' }} />FEMA NFHL</p>
                    </> : '' }
                    {layerStrings.includes(WATERSHED_FILTERS) ? <>
                        <p><span className="color-footer-watershed" style={{ border: '1px dashed' }} />Watershed</p>
                    </> : '' }
                    {layerStrings.includes(STREAMS_FILTERS) ? <>
                        <p><span style={{ background: '#66d4ff', height: '3px', marginTop: '7px', border: 'hidden' }} />Stream</p>
                    </> : '' }
                    {layerStrings.includes(SERVICE_AREA_FILTERS) ? <>
                        <p><span className="color-footer-service-area" style={{ border: '1px dashed' }} />Service Area</p>
                    </> : '' }
                    {layerStrings.includes(MUNICIPALITIES_FILTERS) ? <>
                        <p><span style={{ background: '#bc73ff', border: 'hidden' }} />Municipality</p>
                    </> : '' }
                    {layerStrings.includes(COUNTIES_FILTERS) ? <>
                        <p><span style={{ background: '#7b2491', border: 'hidden' }} />County</p>
                    </> : '' }
                    {layerStrings.includes(MHFD_BOUNDARY_FILTERS) ? <>
                        <p><span className="color-footer-boundary" style={{ border: '1px dashed' }} />MHFD Boundary</p>
                    </> : '' }
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
