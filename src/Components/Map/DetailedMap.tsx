import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import MapTypesView from '../Shared/MapTypes/MapTypesView';

import { Dropdown, Button } from 'antd';
import { MAPBOX_TOKEN, MAP_DROPDOWN_ITEMS } from '../../constants/constants';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { polygonFill, polygonStroke, selectedComponents } from '../../constants/mapStyles';
import { ComponentType } from '../../Classes/MapTypes';
import { ComponentPopup } from './MapPopups';
import { addMapLayers } from '../../utils/mapUtils';

let map : any = null;
let popup = new mapboxgl.Popup({closeButton: true,});
type PolygonCoords = Array<Array<number>>;

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const getCenterCoordinates = (coordinates : PolygonCoords) => {
  const polygon = turf.polygon([coordinates]);
  const { geometry } = turf.centroid(polygon);
  return geometry?.coordinates as mapboxgl.LngLatLike;
}

export default ({ coordinates, components } : { coordinates : PolygonCoords, components : Array<ComponentType> }) => {
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

  const popUpContent = (component : ComponentType) => ReactDOMServer.renderToStaticMarkup(
    <ComponentPopup item={component} />
  );

  const drawPolygon = () => {
    const source = 'polygon';

    map.addSource(source, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        }
      }
    });

    addMapLayers(map, source, polygonFill);
    addMapLayers(map, source, polygonStroke);

    if (components) {
      drawComponents();
    }
  }

  const drawComponents = () => {
    const source = 'components';

    const componentItems = components.map((component : ComponentType) => ({
      id: component.componentId,
      type: 'Feature',
      properties: {
        description: popUpContent(component)
      },
      geometry: {
        type: 'Point',
        coordinates: component.coordinates
      }
    }));

    map.addSource(source, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: componentItems
      }
    });

    addMapLayers(map, source, selectedComponents);
    addComponentsListener(source);
  }

  const addComponentsListener = (trigger: string) => {
    map.on('click', trigger, (e: any) => {
      const description = e.features[0].properties.description;
      popup.remove();
      popup = new mapboxgl.Popup({closeButton: true,});
      popup.setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', trigger, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', trigger, () => {
      map.getCanvas().style.cursor = '';
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
