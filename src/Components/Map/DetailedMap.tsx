import React, { useEffect, useState } from 'react';
import MapTypesView from '../Shared/MapTypes/MapTypesView';

import { Dropdown, Button } from 'antd';
import { MAPBOX_TOKEN, MAP_DROPDOWN_ITEMS } from '../../constants/constants';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { polygonFill, polygonStroke } from '../../constants/mapStyles';

let map : any = null;
type PolygonCoords = Array<Array<number>>;

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const getCenterCoordinates = (coordinates : PolygonCoords) => {
  const polygon = turf.polygon([coordinates]);
  const { geometry } = turf.centroid(polygon);
  return geometry?.coordinates as mapboxgl.LngLatLike;
}

export default ({ coordinates } : { coordinates : PolygonCoords }) => {
  const [dropdownItems, setDropdownItems] = useState({default: 1, items: MAP_DROPDOWN_ITEMS});

  useEffect(() => {
    (mapboxgl as typeof mapboxgl).accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: 'detailedMap',
      style: dropdownItems.items[dropdownItems.default].style, //hosted style id
      center: getCenterCoordinates(coordinates), // starting position [lng, lat]
      zoom: 12.4 // starting zoom
    });

    const nav = new mapboxgl.NavigationControl({ showCompass: false });
    map.addControl(nav, 'top-right');

    map.on('load', () => drawPolygon());
    map.on('style.load', () => drawPolygon());
  }, []);

  useEffect(() => {
    map.setStyle(dropdownItems.items[dropdownItems.default].style);
  }, [dropdownItems.items[dropdownItems.default].style]);

  const selectMapStyle = (index: number) => {
    setDropdownItems({ ...dropdownItems, default: index });
  }

  const drawPolygon = () => {
    map.addSource('polygon', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        }
      }
    });

    map.addLayer({
      id: 'polygon',
      source: 'polygon',
      ...polygonFill
    });

    map.addLayer({
        id: 'polygon_stroke',
        source: 'polygon',
        ...polygonStroke
    });
  }

  return (
    <div className="map" style={{height: '100%'}}>
      <div id="detailedMap" style={{ width: '100%', height: '100%' }} />

      <Dropdown
        overlay={MapTypesView({ dropdownItems, selectMapStyle })}
        className="btn-03"
        trigger={['click']}>
        <Button>
          {dropdownItems.items[dropdownItems.default].type} <img src="/Icons/icon-12.svg" alt="" />
        </Button>
      </Dropdown>
    </div>
  )
}
