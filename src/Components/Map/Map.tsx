import React, { useEffect, useRef, useState } from 'react'
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import ReactDOMServer from 'react-dom/server';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapFilterView from '../Shared/MapFilter/MapFilterView';
import MapTypesView from "../Shared/MapTypes/MapTypesView";
import { MainPopup, ComponentPopup } from './MapPopups';
import { Dropdown, Button } from 'antd';
import { MapProps, ComponentType, MapStyleTypes } from '../../Classes/MapTypes';
import { MAP_DROPDOWN_ITEMS,
        MAPBOX_TOKEN, HERE_TOKEN,
        PROBLEMS_TRIGGER,
        PROJECTS_TRIGGER,
        COMPONENTS_TRIGGER,
        DENVER_LOCATION,
        SELECT_ALL_FILTERS } from "../../constants/constants";
import { Feature, Properties, Point } from '@turf/turf';
import { localComponents, polygonFill, polygonStroke, tileStyles } from '../../constants/mapStyles';

const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const MapboxDraw= require('@mapbox/mapbox-gl-draw');

let map : any = null;
let popup = new mapboxgl.Popup();
// const drawConstants = [PROBLEMS_TRIGGER, PROJECTS_TRIGGER, COMPONENTS_TRIGGER];
const drawConstants = [PROJECTS_TRIGGER, COMPONENTS_TRIGGER];

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const Map = ({ leftWidth,
            layers,
            problems,
            projects,
            components,
            layerFilters,
            setSelectedItems,
            selectedItems,
            setIsPolygon,
            getReverseGeocode,
            savePolygonCoordinates,
            saveMarkerCoordinates,
            getMapTables,
            markerRef,
            polygonRef,
            getPolygonStreams } : MapProps) => {

    let geocoderRef = useRef<HTMLDivElement>(null);
    const [dropdownItems, setDropdownItems] = useState({default: 1, items: MAP_DROPDOWN_ITEMS});
    const [selectedLayers, setSelectedLayers] = useState<any>([]);
    const [visibleDropdown, setVisibleDropdown] = useState(false);

    useEffect(() => {
        (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            dragRotate: false,
            touchZoomRotate: false,
            style: dropdownItems.items[dropdownItems.default].style, //hosted style id
            ...DENVER_LOCATION
        });
        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'bottom-right');

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Search...',
            marker: false
        });

        if(geocoderRef.current) {
            geocoderRef.current.appendChild(geocoder.onAdd(map));
        }

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
    }, []);

    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
    }, [dropdownItems.items[dropdownItems.default].style]);

    useEffect(() => {
        map.resize();
    }, [leftWidth]);

    useEffect(() => {
        paintSelectedComponents(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
        if (map.isStyleLoaded()) {
            drawConstants.forEach((item : string) => {
                drawItemsInMap(item);
            });
        }

        addMapListeners();
    }, [projects]);

    useEffect(() => {
        selectedLayers.forEach((layer : any) => {
            if (typeof layer === 'object') {
                layer.tiles.forEach((sublayer : string) => getMapTables(sublayer, layer.name));
            } else {
                getMapTables(layer);
            }
        });
    }, [selectedLayers]);

    useEffect(() => {
        Object.keys(layerFilters).forEach((key : string) => {
            const tiles = layerFilters[key];
            /* Momentary Implementation Cause' 2 Filters Don't Have Enpoint */
            if (tiles && Array.isArray(tiles)) {
                addLayersSource(key, tiles);
            } else if (tiles && typeof tiles === 'object') {
                Object.keys(tiles).forEach((subKey : string) => {
                    if (tiles[subKey]) {
                        addLayersSource(subKey, tiles[subKey]);
                    }
                });
            }
        })
    }, [layerFilters]);

    const addMapLayers = (id : string, style : MapStyleTypes) => {
        const source = id;
        if (style.type === 'line') {
            id += '_stroke';
        }

        map.addLayer({
            id,
            source,
            ...style
        });
    }    

    const addLayersSource = (key : string, tiles : Array<string>) => {
        if (!map.getSource(key)) {
            map.addSource(key, {
                type: 'vector',
                tiles: tiles
            });

            addTilesLayers(key);
        }
    }

    const addTilesLayers = (key : string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style : any, index : number) => {
            map.addLayer({
                id: key + '_' + index,
                source: key,
                ...style
            });
        });
        
        drawConstants.forEach((item : string) => {
            drawItemsInMap(item);
        });
    }

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

    const addMapListeners = () => {
        /* Add Listeners to the problems and Components */
        drawConstants.forEach((trigger : string) => {
            map.on('load', () =>  drawItemsInMap(trigger));
            map.on('style.load', () => drawItemsInMap(trigger));
            map.on('click', trigger, (e : any) => {
                const description = e.features[0].properties.description;
                popup.remove();
                popup = new mapboxgl.Popup();
                popup.setLngLat(e.lngLat)
                     .setHTML(description)
                     .addTo(map);
            });
            // Change the cursor to a pointer when the mouse is over the states layer.
            map.on('mouseenter', trigger, () =>  {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', trigger, () => {
                map.getCanvas().style.cursor = '';
            });
        });
    }

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

    const drawItemsInMap = (trigger : string) => {
        let items : any = null;

        if(trigger === PROBLEMS_TRIGGER && layers && layers.polygons) {
            items = problems;
        } else if(trigger === PROJECTS_TRIGGER && layers && layers.polygons) {
            items = projects;
        } else if(trigger === COMPONENTS_TRIGGER && layers && layers.components) {
            items = components;
        }

        if(!items) return;
        refreshSourceLayers(trigger);

        const itemsFeatures = items.map((item : any) => {
            const nameConst = trigger.slice(0, -1);
            const id = item[nameConst + 'Id'];

            return {
                id: id,
                type: 'Feature',
                properties: {
                    description: popUpContent(trigger, item)
                },
                geometry: {
                    type: trigger !== COMPONENTS_TRIGGER ? 'Polygon' : 'Point',
                    coordinates: trigger !== COMPONENTS_TRIGGER ? [item.coordinates] : item.coordinates
                }
            }
        });

        map.addSource(trigger, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: itemsFeatures
            }
        });

        if(trigger !== COMPONENTS_TRIGGER) {
            /* Fill and Stroke of Polygons */
            addMapLayers(trigger, polygonFill);
            addMapLayers(trigger, polygonStroke);
        } else {
            /* Points represented as Components */
            addMapLayers(trigger, localComponents);
        }
    }

    const refreshSourceLayers = (id : string) => {
        const mapSource = map.getSource(id);
        if(mapSource) {
            map.removeLayer(id);
            if(id !== COMPONENTS_TRIGGER) map.removeLayer(id + '_stroke');
            map.removeSource(id);
        }
    }

    const selectCheckboxes = (selectedItems : Array<string>) => {
        setSelectedLayers(selectedItems);
    }

    const handleSelectAll = () => {
        setSelectedLayers(SELECT_ALL_FILTERS);
    }

    const handleResetAll = () => {
        selectedLayers.forEach((layer : any) => {
            if (typeof layer === 'object') {
                layer.tiles.forEach((subKey : string) => {
                    removeTileLayers(subKey);
                });
            } else {
                removeTileLayers(layer);
            }
        })

        setSelectedLayers([]);
    }

    const removeTileLayers = (key : string) => {
        const styles = { ...tileStyles as any };
        styles[key].forEach((style : any, index : number) => {
            map.removeLayer(key + '_' + index);
        });
        map.removeSource(key);
    };

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
                <Dropdown
                    visible={visibleDropdown}
                    onVisibleChange={(flag : boolean) => setVisibleDropdown(flag)}
                    overlay={MapFilterView({ selectCheckboxes, handleSelectAll, handleResetAll, selectedLayers })}
                    className="btn-02"
                    trigger={['click']}>
                    <Button>
                        <img src="/Icons/icon-05.svg" alt="" />
                    </Button>
                </Dropdown>
            </div>

            <Dropdown
                overlay={MapTypesView({ dropdownItems, selectMapStyle })}
                className="btn-03"
                trigger={['click']}>
                <Button>
                    {dropdownItems.items[dropdownItems.default].type} <img src="/Icons/icon-12.svg" alt="" />
                </Button>
            </Dropdown>

            <div className="m-footer">
                <h5>NFHL 100 year floodplain</h5>
                <hr />
                <p><span style={{ background: '#99C9FF' }} />6 - 12 inches</p>
                <p><span style={{ background: '#4B9CFF' }} /> 12 - 18 inches</p>
                <p><span style={{ background: '#4C81C4' }} /> 18 - 24 inches</p>
                <p><span style={{ background: '#4A6A9C' }} /> +24 inches</p>
                <p><span style={{ background: '#8FA7C8', height: '2px', marginTop: '7px' }} />Stream Channel</p>
                <p><span style={{ background: '#ffffff', border: '1px dashed' }} />Service Area (Watershed)</p>
            </div>

            {/* <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt="" width="12px"/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>
                </div> */}
        </div>
    )
}

export default Map;
