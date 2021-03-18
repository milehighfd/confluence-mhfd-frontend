import { Map, MapboxOptions, Popup } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
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
  MENU_OPTIONS,
  MAP_RESIZABLE_TRANSITION, FLOODPLAINS_NON_FEMA_FILTERS, ROUTINE_NATURAL_AREAS, ROUTINE_WEED_CONTROL, ROUTINE_DEBRIS_AREA, ROUTINE_DEBRIS_LINEAR, FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, PROJECTS_LINE, PROJECTS_POLYGONS, MEP_PROJECTS_TEMP_LOCATIONS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, LANDSCAPING_AREA, LAND_ACQUISITION, DETENTION_FACILITIES, STORM_DRAIN, CHANNEL_IMPROVEMENTS_AREA, CHANNEL_IMPROVEMENTS_LINEAR, SPECIAL_ITEM_AREA, SPECIAL_ITEM_LINEAR, SPECIAL_ITEM_POINT, PIPE_APPURTENANCES, GRADE_CONTROL_STRUCTURE, NRCS_SOILS, DWR_DAM_SAFETY, STREAM_MANAGEMENT_CORRIDORS, BCZ_PREBLE_MEADOW_JUMPING, BCZ_UTE_LADIES_TRESSES_ORCHID, RESEARCH_MONITORING, CLIMB_TO_SAFETY, SEMSWA_SERVICE_AREA, ADMIN, STAFF
} from "../constants/constants";
export class MapService {
  public token: String = MAPBOX_TOKEN;
  public map: Map;
  public draw: any;
  public popup: Popup;
  public user = 'vizonomy';
  public style = 'cjge6kg6s000i2sox4zl3i1ur';
  public styleSatellite = 'cjge6lf7w000v2spxkflkhlau';
  public styleUrl = 'mapbox://styles/milehighfd/ckd9o19kq0e9x1ipdm8zdq98m';
  public styleUrlSatelite = 'mapbox://styles/milehighfd/ck4jfj4yy5abd1cqw90v1dlft';
  controller: boolean = false;
  constructor() {
    (mapboxgl as any).accessToken = this.token;
    this.map = new Map({
      container: 'map',
      preserveDrawingBuffer: true,
      style: this.styleUrl,
      center: [-99, 39.20],
      zoom: 3,
      maxBounds: [[-180, -90], [180, 90]],
      minZoom: 2.4
    });
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
     });
  }
  create(mapId: string, coords?: any) {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
          polygon: true,
          trash: true
      },
      styles: [
        {
          'id': 'gl-draw-polygon-fill-static',
          'type': 'fill',
          'paint': {
            'fill-color': '#31404b',
            'fill-outline-color': '#31404b',
            'fill-opacity': 0.3
          }
        }, {
          'id': 'gl-draw-polygon-and-line-vertex-active',
          'type': 'circle',
          'paint': {
            'circle-radius': 7,
            'circle-color': '#31404b',
          }
        }
      ]
    });
   
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();
    const minX = coords && coords.longitudeSW ? +coords.longitudeSW : -129.39,
          minY = coords && coords.latitudeSW ? +coords.latitudeSW : 25.82,
          maxX = coords && coords.longitudeNE ? +coords.longitudeNE : -66.94,
          maxY = coords && coords.latitudeNE ? +coords.latitudeNE : 49.38;
    if (coords.role !== 'admin') {
      this.map.setMaxBounds([[minX, minY], [maxX, maxY]]);
    }
    this.map.fitBounds([[minX, minY], [maxX, maxY]]);
  }
  getDraw() {
    return this.draw;
  }
  resize(): void {
    setTimeout(() => {
      this.map.resize();
    }, 600);
  }
  addGeocoderController(coords: any) {
    let minX = coords ? +coords.longitudeSW : -129.39,
    minY = coords ? +coords.latitudeSW : 25.82,
    maxX = coords ? +coords.longitudeNE : -66.94,
    maxY = coords ? +coords.latitudeNE : 49.38;
    if (coords.role === 'admin') {
      minX = -129.39;
      minY = 25.82;
      maxX = -66.94;
      maxY = 49.38;
    }
    this.map.addControl(new MapboxGeocoder({
      accessToken: this.token,
      // limit results to Australia
      country: 'us',
      // further limit results to the geographic bounds representing the region of
      // New South Wales
      bbox: [minX, minY, maxX, maxY],
    }));
  }
  addDrawController() {
    if (!this.controller) {
      this.map.addControl(this.draw, 'bottom-left');
    }
    this.controller = true;
  }
  removeDrawController() {
    if (this.controller) {
      this.map.removeControl(this.draw);
    }
    this.controller = false;
  }
  setFilter(layer: string, filter: Array<any>) {
    if (this.map.getLayer(layer)) {
      this.map.setFilter(layer, filter);
    }
  }
  isStyleLoaded(cb: Function) {
    if (this.map && this.map.isStyleLoaded()) {
      cb();
      this.setOnMapLoad(cb);
    } else {
      setTimeout(() => {
        this.isStyleLoaded(cb);
      }, 1000);
    }
  }
  setOnMapLoad(cb: any) {
    this.map.on('style.load', cb);
  }
  offEvent(propertie: string, cb: any) {
    this.map.off(propertie, cb);
  }
  setStyle(type: string) {
    if (type === 'satellite') {
      this.map.setStyle(this.styleUrlSatelite);
    } else {
      this.map.setStyle(this.styleUrl);
    }
  }
  getSource(id: string) {
    return this.map.getSource(id);
  }
  getLayer (id: string) {
    return this.map.getLayer(id);
  }
  addSource(id: string, data: any) {
    this.map.addSource(id, {
      type: 'geojson',
      data: data
    });
  }
  addVectorSource(id: string, data: any) {
    if (!this.getSource(id)) {
      this.map.addSource(id, {
        type: 'vector',
        tiles: data
      });
    }
  }
  addGenericSource(id: string, properties: any) {
    this.map.addSource(id, properties);
  }
  addLayer(id: string, sourceId: string, style: any) {
    const layer = {
      id: id,
      source: sourceId
      , ...style
    };
    if (!this.map.getLayer(id)) {
      this.map.addLayer(layer);
    }
  }
  getLayers(): any {
    return this.map.getStyle().layers;
  }
  addLayerBefore(id: string, sourceId: string, style: any, before_id: string): void {
    const layer = {
      id: id,
      source: sourceId
      , ...style
    };
    if (!this.map.getLayer(id)) {
      if (!this.map.getLayer(before_id)) {
        this.map.addLayer(layer);
      } else {
        this.map.addLayer(layer, before_id);
      }
    }
  }
  removeSource(id: string) {
    if (this.map.getSource(id)) {
      this.map.removeSource(id);
    }
  }
  removeLayer(id: string) {
    if (this.map.getLayer(id)) {
      this.map.removeLayer(id);
    }
  }
  addPopUp(coordinates: any, html: any) {
    this.popup.setLngLat(coordinates)
          .setHTML(html)
          .addTo(this.map);
  }
  getBoundingBox() {
    return this.map.getBounds();
  }
  removePopUp() {
    this.popup.remove();
  }
  addMouseEnter(layer: string, cb: any) {
    this.map.on('mouseenter', layer , cb);
  }
  removeMouseEnter(layer: string, cb: any) {
    this.map.on('mouseleave', layer , cb);
  }
  zoomIn() {
    this.map.zoomIn();
  }
  zoomOut() {
    this.map.zoomOut();
  }
  dragEnd(cb: any) {
    this.map.on('dragend', cb);
  }
  zoomEnd(cb: any) {
    this.map.on('zoomend', cb);
  }
  getZoom() {
    return this.map.getZoom();
  }
  click(layer: string, cb: any) {
    console.log(layer);
    this.map.on('click', layer, cb);
  }
  createDraw(cb: any) {
    this.map.on('draw.create', cb);
  }
  updateDraw(cb: any) {
    this.map.on('draw.update', cb);
  }
}
