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
import { LayerStylesType } from 'Classes/MapTypes';
class MapService {

  private _map: any;
  private _autocomplete: any;

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
      'custom-sprite/fema-floodway.png',
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
      'custom-sprite/floodwaypattern.png',
    ];
    imagesPaths.forEach((imagePath: string) => {
      this.map.loadImage(imagePath, (error: any, image: any) => {
        if (error) {
          console.log('error on load ', error);
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
            console.log('Works ');
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
      this.map.moveLayer(`${DWR_DAM_SAFETY}_${index}`);
    });
    styles[RESEARCH_MONITORING].forEach((style: LayerStylesType, index: number) => {
      this.map.moveLayer(`${RESEARCH_MONITORING}_${index}`);
    });
    styles[CLIMB_TO_SAFETY].forEach((style: LayerStylesType, index: number) => {
      this.map.moveLayer(`${CLIMB_TO_SAFETY}_${index}`);
    });
  };

  topProjects () {
    const styles = { ...(tileStyles as any) };
    styles[MHFD_PROJECTS].forEach((style: LayerStylesType, index: number) => {
      this.map.moveLayer(`${MHFD_PROJECTS}_${index}`);
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
  topStreamLabels () {
    this.map.moveLayer('streams_4');
    this.map.moveLayer('streams_5');
  };

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
