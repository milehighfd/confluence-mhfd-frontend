import { Map, Popup } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '../constants/constants';
import * as mapboxgl from 'mapbox-gl';
import { SERVER } from '../Config/Server.config';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';
export class MapService {
  public token: String = MAPBOX_TOKEN;
  public map: Map;
  public draw: any;
  public popup: Popup;
  public popupOffset: Popup;
  public user = 'vizonomy';
  public style = 'ckd9o19kq0e9x1ipdm8zdq98m';
  public styleSatellite = 'cjge6lf7w000v2spxkflkhlau';
  // public styleUrl = `${SERVER.URL_BASE}/style/${this.style}/milehighfd/${MAPBOX_TOKEN}`;
  public styleUrl = `mapbox://styles/milehighfd/ckd9o19kq0e9x1ipdm8zdq98m`;
  public styleUrlSatelite = 'mapbox://styles/milehighfd/ck4jfj4yy5abd1cqw90v1dlft';
  controller: boolean = false;
  constructor( id: string) {
    (mapboxgl as any).accessToken = this.token;
    this.map = new Map({
      container: id,
      preserveDrawingBuffer: true,
      style: this.styleUrl,
      center: [-104.7236683149282,39.674174328991904],
      zoom: 8.9,
      maxBounds: [[-180, -90], [180, 90]],
      minZoom: 2.4
    });
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
     });
     this.popupOffset = new mapboxgl.Popup({
       offset: [0,-10],
       closeButton: false,
       closeOnClick: false
     })
     const width = window.innerWidth;
     if (width < 800) {
      this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');  
     } else {
       this.map.addControl(new mapboxgl.ScaleControl({
        unit: 'imperial'
      }), 'bottom-right');
      this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
     }
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
            'fill-color': '#F5C444',
            'fill-outline-color': '#F5C444',
            'fill-opacity': 0.3
          }
        }, {
          'id': 'gl-draw-polygon-and-line-vertex-active',
          'type': 'circle',
          'paint': {
            'circle-radius': 5,
            'circle-color': '#F5C444',
          }
        }
      ]
    });
   
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();
    // const minX = coords && coords.longitudeSW ? +coords.longitudeSW : -129.39,
    //       minY = coords && coords.latitudeSW ? +coords.latitudeSW : 25.82,
    //       maxX = coords && coords.longitudeNE ? +coords.longitudeNE : -66.94,
    //       maxY = coords && coords.latitudeNE ? +coords.latitudeNE : 49.38;
    // if (coords.role !== 'admin') {
    //   this.map.setMaxBounds([[minX, minY], [maxX, maxY]]);
    // }
    this.map.fitBounds([[-105.3236683149282,39.274174328991904],[-104.48895750946532,40.26156304805423]]);
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
  flyTo(coordinates: any) {
    this.map.flyTo({center: coordinates});
  }
  fitBounds(coordinates: any) {
    this.map.fitBounds(coordinates, {padding: 40});
  }
  addDrawController() {
    if (!this.controller) {
      this.map.addControl(this.draw, 'bottom-left');
    }
    this.controller = true;
  }
  addDrawControllerTopLeft() {
    if (!this.controller) {
      this.map.addControl(this.draw, 'top-left');
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
  isStyleLoaded(cb: any) {
    // console.log('1', this.map.isStyleLoaded());
    
    if (this.map && this.map.isStyleLoaded()) {
      // console.log('2', this.map.isStyleLoaded());
      cb();
      this.setOnMapLoad(cb);
    } else {
      setTimeout(() => {
        // console.log('3');
        this.isStyleLoaded(cb);
      }, 1000);
    }
  }
  setOnMapLoad(cb: any) {
    this.map.on('style.load', cb);
  }
  getLayoutProperty(layer: string, propertie: string) {
    if (this.map.getLayer(layer)) {
      return this.map.getLayoutProperty(layer, propertie);
    }
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
  addPopUpOffset(coordinates: any, html: any) {
    this.popupOffset.setLngLat(coordinates)
          .setHTML(html)
          .addTo(this.map);
  }
  loadImages() {
    this.map.loadImage('custom-sprite/30x30px.png', (error: any, image: any) => {
      if (error) {
          console.log('error on load ', error);
          return;
      }
      if (!this.map.hasImage('adjust-24px')) {
          this.map.addImage('adjust-24px', image);
      }
    });
    this.map.loadImage('custom-sprite/dollar.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('dollar')) {
            this.map.addImage('dollar', image);
        }
    });
    this.map.loadImage('custom-sprite/fema-floodway.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('fema-floodway')) {
            this.map.addImage('fema-floodway', image);
        }
    });
    this.map.loadImage('custom-sprite/Frame13a.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('Frame13a')) {
            this.map.addImage('Frame13a', image);
        }
    });
    this.map.loadImage('custom-sprite/Frame17m2t.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('Frame17m2t')) {
            this.map.addImage('Frame17m2t', image);
        }
    });
    this.map.loadImage('custom-sprite/Frame21C.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('Frame21C')) {
            this.map.addImage('Frame21C', image);
        }
    });
    this.map.loadImage('custom-sprite/pjm2.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
        }
        if (!this.map.hasImage('pjm2')) {
            this.map.addImage('pjm2', image);
        }
    });
    this.map.loadImage('custom-sprite/Urbanclimbtosafetysign_origclean-50.png', (error: any, image: any) => {
        if (error) {
            console.log('error on load ', error);
            return;
        }
        if (!this.map.hasImage('Urbanclimbtosafetysign_origclean')) {
            this.map.addImage('Urbanclimbtosafetysign_origclean', image);
        }
    });
  }
  removePopUpOffset() {
    this.popupOffset.remove();
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
  getCanvas() {
    return  this.map.getCanvas();
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
    // console.log(layer);
    this.map.on('click', layer, cb);
  }
  clickOnMap(cb: any) {
    this.map.on('click', cb);
  }
  createDraw(cb: any) {
    this.map.on('draw.create', cb);
  }
  deleteDraw(cb: any) {
    this.map.off('draw.create', cb);
  }
  updateDraw(cb: any) {
    this.map.on('draw.update', cb);
  }
  getLoadZoom(cb: any) {
    this.map.on('load', cb);
  }
  getMoveZoom(cb: any) {
    this.map.on('move', cb);
  }

  addSourceOpacity(data :any) {
    
    if(!this.map.getSource('mask')) {
      this.map.addSource('mask', {
        "type": "geojson",
        "data": data
      });
    } else {
      
      if(this.map.getLayer('area_based_maskMASK')) {
        this.map.removeLayer('area_based_maskMASK');
      }
      if(this.map.getLayer('borderMASK')) {
        this.map.removeLayer('borderMASK');
      }
      this.map.removeSource('mask');
      setTimeout(()=>{
        if (!this.map.getSource('mask')) {
          this.map.addSource('mask', {
            "type": "geojson",
            "data": data
          });
        }
      },300);
    }
  }
  addLayerMask(id: any) {
    if(id == 'area_based_mask' && !this.map.getLayer(id+"MASK")) {
      this.map.addLayer({
        "id": id+'MASK',
        "source": "mask",
        "type": "fill",
        "paint": {
            "fill-color": "black",
            'fill-opacity': 0.8
        }
      });
    } else if (id == 'border' &&  !this.map.getLayer(id+"MASK")) {
      this.map.addLayer({
        "id": id+'MASK',
        "source": "mask",
        "type": "line",
        "paint": {
          'line-color': '#28c499',
          'line-width': 1,
        }
      });
    }
  }
  removeLayerMask(id: any) {
    this.map.removeLayer(id+'MASK');
  }
}
