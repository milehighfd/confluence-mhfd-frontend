import React, { useEffect, useRef, useState } from 'react'
import * as mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";
import { Dropdown, Button } from 'antd';
import { MAP_DROPDOWN_ITEMS } from "../../constants/constants";

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbmk4ODgiLCJhIjoiY2swenFnd2o0MHN4djNibnhwOGpicHVhcyJ9.gGs9uPzUhpgH3F127w3ggQ';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
const MapboxDraw= require('@mapbox/mapbox-gl-draw');

let map : any = null;

const Map = ({ leftWidth, children, polygons, components } : any) => {
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
        
        map.on('style.load', () => drawPolygons());
    }, []);

    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
    }, [dropdownItems.items[dropdownItems.default].style])

    useEffect(() => {
        map.resize();
    }, [leftWidth]);

    // Refacture when Backend
    useEffect(() => {
        /* Refacture the logic when recieving props from Backend */
        map.on('load', () => drawPolygons());
    }, [polygons])

    useEffect(() => {
        /* Refacture the logic when recieving props from Backend */
        map.on('load', () => drawComponents());
    }, [components])
    // -----------------------

    const selectMapStyle = (index : number) => {
        setDropdownItems({...dropdownItems, default: index});
    }  

    const replaceOldPolygon = (draw : any) => {
        if(draw.getAll().features.length > 1) {
            const features = draw.getAll().features;
            draw.delete(features[0].id);
        }

        /* Get the coords on Drawing */
        // console.log(draw.getAll().features[0].geometry.coordinates);
    }


    const drawPolygons = () => {
        if(!polygons) return;

        polygons.map((polygon : any) => {
            refreshSourceLayers(polygon.id);
            map.addSource(polygon.id, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [polygon.coordinates]
                    }
                }
            });
            map.addLayer({
                id: polygon.id + '_fill',
                type: 'fill',
                source: polygon.id,
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.3,
                }
            });
            map.addLayer({
                id: polygon.id + '_line',
                type: 'line',
                source: polygon.id,
                layout: {},
                paint: {
                    'line-color': '#00bfa5',
                    'line-width': 2.5,
                }
            });
        });
    }

    const drawComponents = () => {
        if(!components) return;

        components.map((component : any) => {
            refreshSourceLayers(component.id);
            map.addSource(component.id, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [component.coordinates]
                    }
                }
            });
            map.addLayer({
                id: component.id + '_line',
                type: 'line',
                source: component.id,
                layout: {},
                paint: {
                    'line-color': '#ff8f00',
                    'line-width': 1,
                }
            });
        });
    }

    const refreshSourceLayers = (id : number) => {
        const mapSource = map.getSource(id);
        if(mapSource) {
            map.removeLayer(id + '_fill');
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
                    style={{ width: 200 }}
                    />
                    <Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>
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
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt=""/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt=""/></Button>
                </div> */}
        </div>
    )
}

export default Map;
