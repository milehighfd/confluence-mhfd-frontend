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

const Map = ({ leftWidth, children } : any) => {
    let mapRef = useRef<any>();
    const [dropdownItems, setDropdownItems] = useState<any>({default: 0, items: MAP_DROPDOWN_ITEMS});

    useEffect(() => {
        (mapboxgl as any).accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: 'map',
            style: dropdownItems.items[dropdownItems.default].style, //hosted style id
            center: [-105.02, 39.805], // starting position
            zoom: 11, // starting zoom
        });

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'bottom-right');

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
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
            drawPolygon.appendChild(draw.onAdd(map));
        }
    }, []);

    useEffect(() => {
        map.setStyle(dropdownItems.items[dropdownItems.default].style);
    }, [dropdownItems.items[dropdownItems.default].style])

    useEffect(() => {
        map.resize();
    }, [leftWidth]);

    const selectMapStyle = (index : number) => {
        setDropdownItems({...dropdownItems, default: index});
    }  

    const replaceOldPolygon = (draw : any) => {
        if(draw.getAll().features.length > 1) {
            const features = draw.getAll().features;
            draw.delete(features[0].id);
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
                    placeholder="Search..."
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
                    <p><div style={{background:'#99C9FF'}}></div> 6 - 12 inches</p>
                    <p><div style={{background:'#4B9CFF'}}></div> 12 - 18 inches</p>
                    <p><div style={{background:'#4C81C4'}}></div> 18 - 24 inches</p>
                    <p><div style={{background:'#4A6A9C'}}></div> +24 inches</p>
                    <p><div style={{background:'#8FA7C8', height: '2px', marginTop: '7px'}}></div> Stream Channel</p>
                    <p><div style={{background:'#ffffff', border: '1px dashed'}}></div> Service Area (Watershed)</p>
                </div>

                {/* <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt=""/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt=""/></Button>
                </div> */}
        </div>
    )
}

export default Map;
