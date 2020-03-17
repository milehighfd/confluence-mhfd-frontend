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
import { MAP_DROPDOWN_ITEMS } from "../../constants/constants";

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbmk4ODgiLCJhIjoiY2swenFnd2o0MHN4djNibnhwOGpicHVhcyJ9.gGs9uPzUhpgH3F127w3ggQ';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const MapboxDraw= require('@mapbox/mapbox-gl-draw');

let map : any = null;
const drawConstants = ['problems', 'projects', 'components'];

const Map = ({ leftWidth, children, problems, projects, components, setSelectedItems, selectedItems, setIsPolygon, getReverseGeocode } : any) => {
    let mapRef = useRef<any>();
    const [dropdownItems, setDropdownItems] = useState<any>({default: 0, items: MAP_DROPDOWN_ITEMS});

    useEffect(() => {
        (mapboxgl as any).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            style: dropdownItems.items[dropdownItems.default].style, //hosted style id
            center: [-105.04, 39.805], // starting position
            zoom: 10.8, // starting zoom
        });
        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'bottom-right');

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Search...',
            marker: false
        });

        const geo = document.getElementById('geocoder')!;
        geo.appendChild(geocoder.onAdd(map));

        // Uncomment to see coords when a position in map is clicked
        // map.on('click', (e : any) => console.log(e.lngLat));

        const drawPolygon = document.getElementById('polygon');
        if(drawPolygon) {
            const draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: { polygon: true }
            });
            map.on('draw.create', () => replaceOldPolygon(draw))
            map.on('draw.update', () => replaceOldPolygon(draw))
            drawPolygon.appendChild(draw.onAdd(map));
        }
        addMapListeners();
    }, []);

    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
        refreshPaintedComponents();
    }, [dropdownItems.items[dropdownItems.default].style]);

    useEffect(() => {
        map.resize();
    }, [leftWidth]);

    /* https://github.com/mapbox/mapbox-gl-js/issues/2268 Mapbox issue when refreshing layers */
    const refreshPaintedComponents = () => {
        if(map.isStyleLoaded()) setTimeout(refreshPaintedComponents, 500);
        else paintSelectedComponents(selectedItems);
    }

    const paintSelectedComponents = (items : Array<[]>) => {
        if(map.getSource('components')) {
            components.map((component : any) => {
                map.setFeatureState(
                    { source: 'components', id: component.componentId },
                    { hover: false }
                );
            });
    
            if(items.length) {
                items.map((item : any) => {
                    map.setFeatureState(
                        { source: 'components', id: item.componentId },
                        { hover: true }
                    );
                });
            }
        }
    }

    const selectMapStyle = (index : number) => {
        setDropdownItems({...dropdownItems, default: index});
    }

    const replaceOldPolygon = (draw : any) => {
        if(draw.getAll().features.length > 1) {
            const features = draw.getAll().features;
            draw.delete(features[0].id);
        }
        const points = getComponentsInPolygon(draw.getAll().features[0].geometry.coordinates[0]);
        const polygonCoords = turf.polygon(draw.getAll().features[0].geometry.coordinates);
        const turfPoints = points.map((point : any) => turf.point(point.coordinates));

        const selectedItems : Array<[]> = [];
        const values = turfPoints.map((v : any) => turf.inside(v, polygonCoords));
        points.map((point : any, index : number) => { if(values[index]) selectedItems.push(point) });

        paintSelectedComponents(selectedItems);
        setSelectedItems(selectedItems);
        setIsPolygon(true);

        /* Get the coords on Drawing */
        // console.log(draw.getAll().features[0].geometry.coordinates);
    }

    const getComponentsInPolygon = (polygon : Array<[]>) => {
        const minMaxX = getMinMaxOf2DIndex(polygon, 0);
        const minMaxY = getMinMaxOf2DIndex(polygon, 1);

        const minX = minMaxX.min;
        const maxX = minMaxX.max;
        const minY = minMaxY.min;
        const maxY = minMaxY.max;

        const points : Array<[]> = [];
        components.map((point : any) => {
            if(point.coordinates[0] >= minX && point.coordinates[0] <= maxX && point.coordinates[1] >= minY && point.coordinates[1] <= maxY){
                points.push(point);
            }
        });

        getReverseGeocode((maxX + minX)/2, (maxY + minY)/2, MAPBOX_TOKEN);
        return points;
    }

    const getMinMaxOf2DIndex = (arr : Array<[]>, ind : number) => {
        return {
            min: Math.min.apply(null, arr.map((e) => { return e[ind]})),
            max: Math.max.apply(null, arr.map((e) => { return e[ind]}))
        }
    }

    const addMapListeners = () => {
        /* Add Listeners to the problems and Components */
        drawConstants.map((trigger : string) => {
            map.on('load', () =>  drawItemsInMap(trigger));
            map.on('style.load', () => drawItemsInMap(trigger));
            map.on('click', trigger, (e : any) => {
                const description = e.features[0].properties.description;
                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(description)
                    .addTo(map)
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

    const popUpContent = (trigger : string, name : string, jurisdiction: string, studyName : string) => ReactDOMServer.renderToStaticMarkup(
        <>
            {trigger !== 'components' ? 
                <MainPopup 
                    trigger={trigger}
                    name={name}
                    jurisdiction={jurisdiction} /> : 
                <ComponentPopup
                    name={name}
                    jurisdiction={jurisdiction}
                    studyName={studyName} />}
        </>
    );

    const drawItemsInMap = (trigger : string) => {
        let items = null;
        if(trigger === 'problems') items = problems;
        else if(trigger === 'projects') items = projects;
        else if(trigger === 'components') items = components;
        if(!items) return;
        refreshSourceLayers(trigger);

        const itemsFeatures = items.map((item : any) => {
            const nameConst = trigger.slice(0, -1);

            const id = item[nameConst + 'Id'];
            const name = item[nameConst + 'Name'];
            const jurisdiction = item.jurisdiction;

            const studyName = item.studyName;
                
            return {
                id: id,
                type: 'Feature',
                properties: {
                    description: popUpContent(trigger, name, jurisdiction, studyName)
                },
                geometry: {
                    type: trigger !== 'components'?'Polygon':'Point',
                    coordinates: trigger !== 'components'?[item.coordinates]:item.coordinates
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

        if(trigger !== 'components') {
            map.addLayer({
                id: trigger,
                type: 'fill',
                source: trigger,
                layout: {},
                paint: trigger === 'problems' ? {
                    'fill-color': '#088',
                    'fill-opacity': 0.3,
                    } : {
                        'fill-color': '#088',
                        'fill-opacity': 0,
                }
            });

            map.addLayer({
                id: trigger + '_line',
                type: 'line',
                source: trigger,
                layout: {},
                paint: trigger === 'problems'? {
                    'line-color': '#00bfa5',
                    'line-width': 2.5,
                    } : {
                        'line-color': '#ff8f00',
                        'line-width': 1,
                    }
            });
        } else {
            map.addLayer({
                id: trigger,
                type: 'circle',
                source: trigger,
                layout: {},
                paint: {
                    'circle-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        '#9e9d24',
                        '#ef5350'
                    ],
                    'circle-stroke-color': '#f44336',
                    'circle-stroke-width': 1,
                    'circle-stroke-opacity': 0.75,
                    'circle-opacity': 1
                }
            });
        }
    }

    const refreshSourceLayers = (id : string) => {
        const mapSource = map.getSource(id);
        if(mapSource) {
            map.removeLayer(id);
            map.removeLayer(id + '_line');
            map.removeSource(id);
        }
    }

    return (
        <div className="map">
            <div id="map" ref={mapRef} style={{width: '100%', height: '100%'}}>
                {children}
            </div>
            <div className="m-head">
                <div
                    id="geocoder"
                    className="geocoder"
                    style={{width: '200px', height: '35px' }}
                    />
                    {/*<Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>*/}
                    <Dropdown overlay={MapFilterView} className="btn-02">
                    <Button>
                        <img src="/Icons/icon-05.svg" alt=""/>
                    </Button>
                    </Dropdown>
                </div>

                <Dropdown overlay={MapTypesView({dropdownItems, selectMapStyle})} className="btn-03">
                    <Button>
                        {dropdownItems.items[dropdownItems.default].type} <img src="/Icons/icon-12.svg" alt=""/>
                    </Button>
                    </Dropdown>

                <div className="m-footer">
                    <h5>NFHL 100 year floodplain</h5>
                    <hr/>
                    <p><span style={{background:'#99C9FF'}} />6 - 12 inches</p>
                    <p><span style={{background:'#4B9CFF'}} /> 12 - 18 inches</p>
                    <p><span style={{background:'#4C81C4'}} /> 18 - 24 inches</p>
                    <p><span style={{background:'#4A6A9C'}} /> +24 inches</p>
                    <p><span style={{background:'#8FA7C8', height: '2px', marginTop: '7px'}} />Stream Channel</p>
                    <p><span style={{background:'#ffffff', border: '1px dashed'}} />Service Area (Watershed)</p>
                </div>

                {/* <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt="" width="12px"/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>
                </div> */}
        </div>
    )
}

export default Map;
