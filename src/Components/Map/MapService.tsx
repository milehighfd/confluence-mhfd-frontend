import {
  SWITCHES_MAP,
  MAP_DROPDOWN_ITEMS,
  MAPBOX_TOKEN,
  PROBLEMS_TRIGGER,
  PROJECTS_TRIGGER,
  COMPONENT_LAYERS,
  STREAMS_FILTERS,
  SELECT_ALL_FILTERS,
  FILTER_PROBLEMS_TRIGGER,
  FILTER_PROJECTS_TRIGGER,
  MHFD_PROJECTS,
  NEARMAP_TOKEN,
  EFFECTIVE_REACHES,
  MENU_OPTIONS,
  SERVICE_AREA_FILTERS,
  STREAMS_POINT,
  PROPSPROBLEMTABLES,
  MAPTYPES,
  initFilterProblems,
  USE_LAND_COVER_LABEL,
  USE_LAND_COVER_MAP,
  FEMA_FLOOD_HAZARD,
  USE_LAND_COVER,
  COUNTIES_FILTERS,
  MUNICIPALITIES_FILTERS,
  SEMSWA_SERVICE_AREA,
  WATERSHED_FILTERS,
  NRCS_SOILS,
  FLOODPLAINS_NON_FEMA_FILTERS,
  ACTIVE_LOMS,
  STREAM_MANAGEMENT_CORRIDORS,
  ROUTINE_MAINTENANCE,
  MEP_PROJECTS,
  FLOOD_HAZARDS,
  DWR_DAM_SAFETY,
  RESEARCH_MONITORING,
  CLIMB_TO_SAFETY,
  PROJECTS_DRAFT,
  EFFECTIVE_REACHES_ENDPOINTS,
} from 'constants/constants';
import {
  COMPONENT_LAYERS_STYLE,
  ROUTINE_MAINTENANCE_STYLES,
  MEP_PROJECTS_STYLES,
  tileStyles,
  widthLayersStream,
  NEARMAP_STYLE,
  USE_LAND_TILES_STYLE,
} from 'constants/mapStyles';
import { hovereableLayers } from '../../routes/map/constants/layout.constants';
import { LayerStylesType, ObjectLayerType } from 'Classes/MapTypes';
import { useProfileState } from 'hook/profileHook';
type LayersType = string | ObjectLayerType;
class MapService {

  private _map: any;
  private _autocomplete: any;
  private _user: any;
  private _isMhfdStaff: any;
  isAutocompleteUsed = false;

  hideAndRemoveLayer() {
    if (this.map && this.map.getLayer('mask')) {
      this.map.removeLayer('mask');
      this.map.removeSource('mask');
    }
  }

  hideOpacity() {
    if (['Boulder', 'Boulder County'].includes(this.autocomplete)) {
      if (!this.isAutocompleteUsed) {
        this.isAutocompleteUsed = true;
        return;
      }
    }
    if (this.map.loaded()) {
      this.hideAndRemoveLayer();
    }
  }

  loadImages() {
    const imagesPaths = [
      'custom-sprite/30x30px.png',
      'custom-sprite/dollar.png',
      'custom-sprite/Levee.png',
      'custom-sprite/Frame13a.png',
      'custom-sprite/Frame17m2t.png',
      'custom-sprite/Frame21C.png',
      'custom-sprite/pjm2.png',
      'custom-sprite/ic-stripered.png',
      'custom-sprite/ic-stripeviolet.png',
      'custom-sprite/Urbanclimbtosafetysign_origclean.png',
      'custom-sprite/rd-draft_ORANGE.png',
      'custom-sprite/rd-apprv_GREEN.png',
      'custom-sprite/rd-rqst_PINK.png',
      'custom-sprite/prop-acq-rqst_PINK.png',
      'custom-sprite/prop-acq-apprv_GREEN.png',
      'custom-sprite/prop-acq-draft_ORANGE.png',
      'custom-sprite/MEP-X.png',
      'custom-sprite/floodway43.png',
      'custom-sprite/VM_07_sml.png',
      'custom-sprite/prpl_angl_thk.png',
      'custom-sprite/prpl_angl.png',
      'custom-sprite/PrecipStage.png',
      'custom-sprite/Precip.png',
      'custom-sprite/WeatherStage.png',
      'custom-sprite/Weather.png',
      'custom-sprite/Stage.png',
      'custom-sprite/MEP-X.png',
      'custom-sprite/propacq_RED_small.png',
      'custom-sprite/SMC_medgreen.png',
      'custom-sprite/SMC_lightgreen.png',
      'custom-sprite/floodhazardpoint_small.png',
      'custom-sprite/watershedchangepoint_small.png',
      'custom-sprite/streamconditionpoint_small.png',
      
      'custom-sprite/propacq_ORANGE_bold_small.png',
      // 'custom-sprite/RD_ORANGE_bold_small.png',
      'custom-sprite/propacq_PINK_bold_small.png',
      // 'custom-sprite/RD_PINK_bold_small.png',
      'custom-sprite/propacq_GREEN_bold_small.png',
      // 'custom-sprite/RD_GREEN_bold_small.png',
      // 'custom-sprite/rd_YELLOW.png',
      'custom-sprite/prop-acq_YELLOW.png',
      // 'custom-sprite/rd_RED.png',
      'custom-sprite/prop-acq_RED.png',
      'custom-sprite/MEP-X.png',
      'custom-sprite/SMC_medgreen.png',
      'custom-sprite/SMC_lightgreen.png',
      // 'custom-sprite/RD_RED_small.png',
      'custom-sprite/RD_red.png',
      'custom-sprite/RD_pink.png',
      'custom-sprite/RD_orange.png',
      'custom-sprite/RD_yellow.png',
      'custom-sprite/RD_green.png',
      'custom-sprite/floodhazardpoint_small.png',
      'custom-sprite/watershedchangepoint_small.png',
      'custom-sprite/streamconditionpoint_small.png',
      'custom-sprite/darkgreenhatchfill.png',
      'custom-sprite/dots-small_olive.png',
      'custom-sprite/SQR-teal-supersml.png',
      'custom-sprite/SpecialPt_small.png',
      'custom-sprite/PipeApp_small.png',
      'custom-sprite/lightgreenhatchfill-backwrd-lesssmall.png',
      'custom-sprite/HEX-dbl-green-darker-superrrrsmall.png',
      'custom-sprite/GradeCtrl_small.png',
      'custom-sprite/crossfill_sml.png',
      'custom-sprite/Hex_DetBasin.png',
      'custom-sprite/Checker_Special.png',
    ];
    imagesPaths.forEach((imagePath: string) => {
      this.map.loadImage(imagePath, (error: any, image: any) => {
        if (error) {
          console.error('error on load ', error);
          return;
        }
        if (!this.map.hasImage(imagePath.split('/')[1].split('.')[0])) {
          this.map.addImage(imagePath.split('/')[1].split('.')[0], image);
        }
      });
    });
  }

  topHovereableLayers () {
    const styles = { ...(tileStyles as any) };
    hovereableLayers.forEach((key: any) => {
      if (styles[key]) {
        styles[key].forEach((_: LayerStylesType, index: number) => {
          if (this.map.getLayer(key + '_highlight_' + index)) {
            this.map.moveLayer(key + '_highlight_' + index);
          }
        });
      }
    });
  };

  topLandUseCover () {
    const useLandCover = USE_LAND_COVER as any;
    useLandCover.tiles.forEach((element: any) => {
      if (this.map.getLayer(`${element}_0`)) {
        this.map.moveLayer(`${element}_0`);
      }
    });
  };

  topProblems () {
    const styles = { ...(tileStyles as any) };
    styles[PROBLEMS_TRIGGER].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${PROBLEMS_TRIGGER}_${index}`)) {
        this.map.moveLayer(`${PROBLEMS_TRIGGER}_${index}`);
      }
    });
  };

  topAddLayers () {
    const styles = { ...(tileStyles as any) };
    styles[DWR_DAM_SAFETY].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${DWR_DAM_SAFETY}_${index}`)) {
        this.map.moveLayer(`${DWR_DAM_SAFETY}_${index}`);
      }
    });
    styles[RESEARCH_MONITORING].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${RESEARCH_MONITORING}_${index}`)) {
        this.map.moveLayer(`${RESEARCH_MONITORING}_${index}`);
      }
    });
    styles[CLIMB_TO_SAFETY].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${CLIMB_TO_SAFETY}_${index}`)) {
        this.map.moveLayer(`${CLIMB_TO_SAFETY}_${index}`);
      }
    });
  };

  topProjects () {
    const styles = { ...(tileStyles as any) };
    styles[MHFD_PROJECTS].forEach((_: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${MHFD_PROJECTS}_${index}`)) {
        this.map.moveLayer(`${MHFD_PROJECTS}_${index}`);
      }
      
    });
  };
  topComponents () {
    const styles = { ...(COMPONENT_LAYERS_STYLE as any) };
      for (const component of COMPONENT_LAYERS.tiles) {
        styles[component].forEach((style: LayerStylesType, index: number) => {
          if (this.map.getLayer(`${component}_${index}`)) {
            this.map.moveLayer(`${component}_${index}`);
          }
        });
      }
  };

  topMEPproject () {
    const styles = { ...(MEP_PROJECTS_STYLES as any) };
    for (const component of MEP_PROJECTS.tiles) {
      styles[component].forEach((style: LayerStylesType, index: number) => {
        if (this.map.getLayer(`${component}_${index}`)) {
          this.map.moveLayer(`${component}_${index}`);
        }
      });
    }
  };

  topProblemParts () {
    const styles = { ...(tileStyles as any) };
    for (const problemsParts of FLOOD_HAZARDS.tiles) {
      styles[problemsParts].forEach((style: LayerStylesType, index: number) => {
        if (this.map.getLayer(`${problemsParts}_${index}`)) {
          this.map.moveLayer(`${problemsParts}_${index}`);
        }
      });
    }
  };

  topMunicipalities () {
    const styles = { ...(tileStyles as any) };
    styles[MUNICIPALITIES_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${MUNICIPALITIES_FILTERS}_${index}`)) {
        this.map.moveLayer(`${MUNICIPALITIES_FILTERS}_${index}`);
      }
    });
  };

  topCounties () {
    const styles = { ...(tileStyles as any) };
    styles[COUNTIES_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${COUNTIES_FILTERS}_${index}`)) {
        this.map.moveLayer(`${COUNTIES_FILTERS}_${index}`);
      }
    });
  };

  topServiceArea () {
    const styles = { ...(tileStyles as any) };
    styles[SEMSWA_SERVICE_AREA].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${SEMSWA_SERVICE_AREA}_${index}`)) {
        this.map.moveLayer(`${SEMSWA_SERVICE_AREA}_${index}`);
      }
    });
    styles[SERVICE_AREA_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${SERVICE_AREA_FILTERS}_${index}`)) {
        this.map.moveLayer(`${SERVICE_AREA_FILTERS}_${index}`);
      }
    });
  };

  topAdditionalLayers () {
    const styles = { ...(tileStyles as any) };
    styles[WATERSHED_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${WATERSHED_FILTERS}_${index}`)) {
        this.map.moveLayer(`${WATERSHED_FILTERS}_${index}`);
      }
    });
    styles[NRCS_SOILS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${NRCS_SOILS}_${index}`)) {
        this.map.moveLayer(`${NRCS_SOILS}_${index}`);
      }
    });
    styles[FEMA_FLOOD_HAZARD].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${FEMA_FLOOD_HAZARD}_${index}`)) {
        this.map.moveLayer(`${FEMA_FLOOD_HAZARD}_${index}`);
      }
    });
    styles[FLOODPLAINS_NON_FEMA_FILTERS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${FLOODPLAINS_NON_FEMA_FILTERS}_${index}`)) {
        this.map.moveLayer(`${FLOODPLAINS_NON_FEMA_FILTERS}_${index}`);
      }
    });
    styles[ACTIVE_LOMS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${ACTIVE_LOMS}_${index}`)) {
        this.map.moveLayer(`${ACTIVE_LOMS}_${index}`);
      }
    });
    styles[STREAM_MANAGEMENT_CORRIDORS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${STREAM_MANAGEMENT_CORRIDORS}_${index}`)) {
        this.map.moveLayer(`${STREAM_MANAGEMENT_CORRIDORS}_${index}`);
      }
    });
    const stylesMaintenanceRoutine = { ...(ROUTINE_MAINTENANCE_STYLES as any) };
    for (const component of ROUTINE_MAINTENANCE.tiles) {
      stylesMaintenanceRoutine[component].forEach((style: LayerStylesType, index: number) => {
        if (this.map.getLayer(`${component}_${index}`)) {
          this.map.moveLayer(`${component}_${index}`);
        }
      });
    }
  };
  topEffectiveReaches () {
    const styles = { ...(tileStyles as any) };
    styles[EFFECTIVE_REACHES].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${EFFECTIVE_REACHES}_${index}`)) {
        this.map.moveLayer(`${EFFECTIVE_REACHES}_${index}`);
      }
    });
    styles[EFFECTIVE_REACHES_ENDPOINTS].forEach((style: LayerStylesType, index: number) => {
      if (this.map.getLayer(`${EFFECTIVE_REACHES_ENDPOINTS}_${index}`)) {
        this.map.moveLayer(`${EFFECTIVE_REACHES_ENDPOINTS}_${index}`);
      }
    });
  };
  topLabels () {
    setTimeout(() => {
      if (
        this.map.getLayer('measuresSaved') &&
        this.map.getLayer('measure-lines') &&
        this.map.getLayer('poi-label') &&
        this.map.getLayer('state-label') &&
        this.map.getLayer('country-label') &&
        this.map.getLayer('munis-centroids-shea-plusother') &&
        this.map.getLayer('munis-centroids-district-view-dkc40e')
      ) {
        this.map.moveLayer('measuresSaved');
        this.map.moveLayer('measure-lines');
        this.map.moveLayer('measuresSaved-border');
        this.map.moveLayer('poi-label');
        this.map.moveLayer('state-label');
        this.map.moveLayer('country-label');
        this.map.moveLayer('munis-centroids-shea-plusother');
        this.map.moveLayer('munis-centroids-district-view-dkc40e');
      } else {
        this.topLabels();
      }
    }, 1000);
  };
  topStreams () {
    if (this.map.getLayer('streams_0')) {
      this.map.moveLayer('streams_0');
    }
    if (this.map.getLayer('streams_1')) {
      this.map.moveLayer('streams_1');
    }
    if (this.map.getLayer('streams_2')) {
      this.map.moveLayer('streams_2');
    }
    if (this.map.getLayer('streams_3')) {
      this.map.moveLayer('streams_3');
    }
    if (this.map.getLayer('mhfd_flow_points_0')) {
      this.map.moveLayer('mhfd_flow_points_0');
    }
    if (this.map.getLayer('mhfd_flow_points_1')) {
      this.map.moveLayer('mhfd_flow_points_1');
    }
    if (this.map.getLayer('mhfd_flow_points_2')) {
      this.map.moveLayer('mhfd_flow_points_2');
    }
  };
  // topStreamLabels () {
  //   this.map.moveLayer('streams_4');
  //   this.map.moveLayer('streams_5');
  // };
  applyTileSetLayer() {
    const sourceNameTile = 'milehighfd.create';
    const tileName = 'Adams1_LULC';
    if (!this.map.getSource(sourceNameTile)) {
      this.map.addSource(sourceNameTile, {
        url: `mapbox://${sourceNameTile}`,
        type: 'vector',
      });
      this.map.addLayer({
        id: 'douglas',
        type: 'fill',
        source: sourceNameTile,
        'source-layer': tileName,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': [
            'match',
            ['get', 'gridcode'],
            [1],
            '#ffffff',
            [2],
            '#b2b2b2',
            [3],
            '#73b2ff',
            [4],
            '#cdf57a',
            [5],
            '#728944',
            [6],
            '#abcd66',
            [7],
            '#734c00',
            [8],
            '#cdaa66',
            [9],
            '#ffaa00',
            'hsla(0, 0%, 0%, 0)',
          ],
        },
      });
    }
  };
  
  addLayerMask(id: any) {
    if (this.map.getSource('mask')) {
      if (id == 'border' && !this.map.getLayer(id + 'MASK')) {
        this.map.addLayer({
          id: id + 'MASK',
          source: 'mask',
          type: 'line',
          paint: {
            'line-color': '#28c499',
            'line-width': 1,
          },
          'z-index': 10,
        });
      } else if (id == 'area_based_mask' && !this.map.getLayer(id + 'MASK')) {
        this.map.addLayer({
          id: id + 'MASK',
          source: 'mask',
          type: 'fill',
          paint: {
            'fill-color': 'black',
            'fill-opacity': 0.8,
          },
          'z-index': 10,
        });
      }
    }
  };
  showSelectedComponents(components: string[]){
    if (!components.length || components[0] === '') {
        return;
    }
    const styles = { ...tileStyles as any };
    for (const key of COMPONENT_LAYERS.tiles) {
        styles[key].forEach((_: LayerStylesType, index: number) => {
            if (!components.includes(key)) {
                this.map.setFilter(key + '_' + index, ['in', 'cartodb_id', -1]);
            }
        });
    }
  }
  setUser(user: any) {
    this._user = user;
    this._isMhfdStaff = user.designation === 'admin' || user.designation === 'staff' ||
    user.business_associate_contact?.business_address?.business_associate?.business_name === 'MHFD';
  }
  removeMapLayers() {
    SELECT_ALL_FILTERS.forEach(layer => {
      if (typeof layer === 'object') {
        if (layer.name === USE_LAND_COVER_LABEL) {
          layer.tiles.forEach((tile: string) => {
            if (this.map.getLayer(tile + '_0')) {
              this.map.removeLayer(tile + '_0');
            }
          });
        } else if (layer.tiles) {
          layer.tiles.forEach((subKey: string) => {
            if (this.map.getLayer(subKey + '_0')) {
              this.map.removeLayer(subKey + '_0');
            }
          });
        }
      } else {
        if (layer !== 'area_based_mask' && layer !== 'border') {
          if (this.map.getLayer(layer + '_0')) {
            this.map.removeLayer(layer + '_0');
          }
        }
      }
    });
  }
  applyMapLayers(
    layerFilters: any,
    selectedLayers: any,
    showLayers: any,
    applyFilters: any,
    getProjectsFilteredIds: any,
    filterProblems: any,
    filterProjectOptions: any,
    addMapListeners: any
  ) {
    SELECT_ALL_FILTERS.forEach(layer => {
      if (typeof layer === 'object') {
        if (layer.name === USE_LAND_COVER_LABEL) {
          this.applyTileSetLayer();
          layer.tiles.forEach((tile: string) => {
            this.addTileSource(tile, addMapListeners);
          });
        } else if (layer.tiles) {
          layer.tiles.forEach((subKey: string) => {
            const tiles = layerFilters[layer.name] as any;
            if (tiles) {
              this.addLayersSource(subKey, tiles[subKey], addMapListeners);
            }
          });
        }
      } else {
        if (layer !== 'area_based_mask' && layer !== 'border') {
          this.addLayersSource(layer, layerFilters[layer], addMapListeners);
        }
      }
    });
    selectedLayers.forEach((layer: LayersType) => {
      if (layer === 'area_based_mask' || layer === 'border') {
        this.addLayerMask(layer);
        return;
      }
      if (typeof layer === 'object') {
        layer.tiles.forEach((subKey: string) => {
          showLayers(subKey);
        });
      } else {
        showLayers(layer);
      }
    });
    applyFilters(PROBLEMS_TRIGGER, filterProblems);
    getProjectsFilteredIds();
    applyFilters(MHFD_PROJECTS, filterProjectOptions);
    setTimeout(() => {
      this.topLandUseCover();
      this.topCounties();
      this.topMunicipalities();
      this.topServiceArea();
      this.topAdditionalLayers();
      this.topStreams();
      this.topEffectiveReaches();
      this.topMEPproject();
      this.topProjects();
      this.topComponents();
      this.topProblemParts();
      this.topAddLayers();
      this.topProblems();
      this.topHovereableLayers();
      // this.topStreamLabels();
      this.topLabels();
      if (this.map.getLayer('area_based_maskMASK')) {
        this.map.moveLayer('area_based_maskMASK');
      }
      if (this.map.getLayer('borderMASK')) {
        this.map.moveLayer('borderMASK');
      }
    }, 300);
  };
  addLayerProperties(key: string, index: number, style: any) {
    if (key === 'counties' || key === 'municipalities' || key === 'watershed_service_areas') {
      if (!this.map.getLayer(key + '-background')) {
        this.map.addLayer({
          id: key + '-background',
          type: 'fill',
          source: key,
          'source-layer': 'pluto15v1',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': '#ffffff',
            'fill-opacity': 0,
          },
        });
      }
    }
    if (key) {
      // if (this.map.getLayer(key + '_' + index)) {
        this.map.setLayoutProperty(key + '_' + index, 'visibility', 'none');
      // }
    }

    if (!hovereableLayers.includes(key)) {
      return;
    }

    if (style.type === 'line' && key == STREAMS_FILTERS) {
      this.map.addLayer({
        id: key + '_highlight_' + index,
        source: key,
        type: 'line',
        'source-layer': 'pluto15v1',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-color': '#fff',
          'line-width': style.source_name ? widthLayersStream[0] : widthLayersStream[1],
        },
        filter: ['in', 'cartodb_id'],
      });
    } else if (style.type === 'line' || style.type === 'fill' || style.type === 'heatmap') {
      this.map.addLayer({
        id: key + '_highlight_' + index,
        source: key,
        type: 'line',
        'source-layer': 'pluto15v1',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-color': '#fff',
          'line-width': 7,
        },
        filter: ['in', 'cartodb_id'],
      });
    } else if ((style.type === 'circle' || style.type === 'symbol') && key != 'streams') {
      this.map.addLayer({
        id: key + '_highlight_' + index,
        type: 'circle',
        'source-layer': 'pluto15v1',
        source: key,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'circle-color': '#FFF',
          'circle-radius': 7,
          'circle-opacity': 1,
        },
        filter: ['in', 'cartodb_id'],
      });
    }
  };
  addTilesLayers(key: string, addMapListeners: any) {
    if (key.includes('milehighfd') && process.env.REACT_APP_NODE_ENV !== 'prod') {
      const tileName: string = USE_LAND_COVER_MAP[key];
      const style = USE_LAND_TILES_STYLE;
      this.map.addLayer({
        id: key + '_0',
        source: key,
        'source-layer': tileName,
        ...style,
      });
    } else {
      const styles = { ...(tileStyles as any) };
      styles[key]?.forEach((style: LayerStylesType, index: number) => {
        if (key.includes(PROJECTS_DRAFT + 'draft')) {
          if (this.map.getLayer(key + '_' + index)) {
            return;
          }
          this.map.addLayer({
            id: key + '_' + index,
            source: key,
            filter: ['in', ['get', 'projectid'], ['literal', []]],
            ...style,
          });
          this.map.setLayoutProperty(key + '_' + index, 'visibility', 'visible');
        } else {
          if (style.source_name) {
            this.map.addLayer({
              id: key + '_' + index,
              source: style.source_name,
              ...style,
            });
          } else {
            this.map.addLayer({
              id: key + '_' + index,
              source: key,
              ...style,
            });
          }
        }
        this.addLayerProperties(key, index, style);
      });
    }
    addMapListeners(key);
  };
  addTileSource(sourceName: string, addMapListeners: any) {
    if (!this.map.getSource(sourceName)) {
      this.map.addSource(sourceName, {
        url: `mapbox://${sourceName}`,
        type: 'vector',
      });
      this.addTilesLayers(sourceName, addMapListeners);
    }
  };
  addLayersSource(key: string, tiles: Array<string>, addMapListeners: any) {
    if (!this.map.getSource(key) && tiles && !tiles.hasOwnProperty('error')) {
      this.map.addSource(key, {
        type: 'vector',
        tiles: tiles,
      });
      this.addTilesLayers(key, addMapListeners);
    }
  };
  changeBaseMapStyle(type: string) {
    console.trace('type', type);
    if(type === 'light') {
      console.log('About to set ', type, MAP_DROPDOWN_ITEMS[1].style);
      this.map.setStyle(MAP_DROPDOWN_ITEMS[5].style);
    } else if (type === 'street') {
      console.log('About to set ' ,type, MAP_DROPDOWN_ITEMS[2].style);
      this.map.setStyle(MAP_DROPDOWN_ITEMS[1].style);
    }
  }

  get map(): any {
    return this._map;
  }

  set map(value: any) {
    this._map = value;
  }

  get autocomplete(): any {
    return this._autocomplete;
  }

  set autocomplete(value: any) {
    this.isAutocompleteUsed = false;
    this._autocomplete = value;
  }

}

export default MapService;
