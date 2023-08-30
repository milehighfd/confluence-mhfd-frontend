import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Col, Row } from 'antd';
import mapboxgl from 'mapbox-gl';
import { LayerStylesType } from 'Classes/MapTypes';
import { SERVER } from 'Config/Server.config';
import {
  FLOOD_HAZARDS,
  MENU_OPTIONS,
  MHFD_PROJECTS,
  NEARMAP_TOKEN,
  PROBLEMS_MODAL,
  PROBLEMS_TRIGGER,
  PROJECTS_MODAL,
  SELECT_ALL_FILTERS,
  STREAM_IMPROVEMENT_MEASURE,
} from 'constants/constants';
import { NEARMAP_STYLE, tileStylesDetailPage as tileStyles } from 'constants/mapStyles';
import { useDetailedState } from 'hook/detailedHook';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProfileState } from 'hook/profileHook';
import { addPopupAndListeners, addPopupsOnClick } from 'routes/map/components/MapFunctionsPopup';
import { MapService } from 'utils/MapService';
import * as datasets from 'Config/datasets';

var map: any;
let coordX = -1;
let coordY = -1;
let popup = new mapboxgl.Popup({ closeButton: true });
const Map = forwardRef(({ type }: { type: any }, ref) => {
  const { detailed } = useDetailedState();
  const { resetDetailed, setSelectedPopup, getMapTables, getComponentsByProjid } = useMapDispatch();
  const { layers, layers: layerFilters } = useMapState();
  const [, setZoomValue] = useState(0);
  const { userInformation } = useProfileState();
  const [allLayers, setAllLayers] = useState<any[]>([]);
  let html = document.getElementById('map2');
  const applyNearMapLayer = () => {
    if (!map.getSource('raster-tiles')) {
      map.map.addSource('raster-tiles', {
        type: 'raster',
        tileSize: 128,
        tiles: [`https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`],
      });
      map.map.addLayer(NEARMAP_STYLE, 'aerialway');
    }
  };
  const updateZoom = () => {
    if (!map) return;
    const zoom = map.getZoom().toFixed(2);
    setZoomValue(zoom);
  };
  const getCanvasBase64 = () => {
    return new Promise((resolve, reject) => {
      const w8 = () => {
        setTimeout(() => {
          html = document.getElementById('map2');
          if (!html) {
            setTimeout(w8, 50);
          } else {
            if (!map) {
              setTimeout(w8, 50);
            } else {
              map.isStyleLoaded(() => {
                resolve(map.getCanvas().toDataURL());
              });
            }
          }
        }, 10000);
      };
      w8();
    });
  };
  useImperativeHandle(ref, () => ({
    getCanvasBase64,
  }));

  const addLayer = () => {
    if (map) {
      let i = 0;
      const styles = { ...(tileStyles as any) };
      for (const key in layers.components) {
        map.addVectorSource(key, layers.components[key]);
        i = 0;
        if ((detailed?.problemid && type === PROBLEMS_MODAL) || (detailed?.project_id && type === PROJECTS_MODAL)) {
          for (const component of styles[key]) {
            map.addLayer(key + i, key, component);
            let fieldComparator = type === PROBLEMS_MODAL ? 'problemid' : 'projectid';
            if (STREAM_IMPROVEMENT_MEASURE === key) {
              fieldComparator = type === PROBLEMS_MODAL ? 'problem_id' : 'project_id';
            }
            map.setFilter(key + i, [
              'in',
              fieldComparator,
              type === PROBLEMS_MODAL ? detailed?.problemid : detailed?.project_id,
            ]);
            i++;
          }
          addMapListeners(key, key);
        }
      }
      if (type === PROBLEMS_MODAL) {
        i = 0;
        map.addVectorSource(MENU_OPTIONS.PROBLEMS_BOUNDARY, layers.problem_boundary, tileStyles.problem_boundary);
        for (const problem of tileStyles.problem_boundary) {
          map.addLayer(`${PROBLEMS_TRIGGER}` + i, MENU_OPTIONS.PROBLEMS_BOUNDARY, problem);
          if (detailed?.cartodb_id) {
            map.setFilter(`${PROBLEMS_TRIGGER}` + i, ['in', 'cartodb_id', detailed?.cartodb_id]);
          }
          i++;
        }
        addMapListeners(PROBLEMS_TRIGGER, `${PROBLEMS_TRIGGER}`);
        FLOOD_HAZARDS.tiles.forEach((tiles: any) => {
          map.addVectorSource(tiles, layers.floodhazards[tiles]);
          styles[tiles].forEach((element: any, index: number) => {
            map.addLayer(`${tiles}${index}`, tiles, element);
            if (detailed?.problemid) {
              map.setFilter(`${tiles}${index}`, ['in', 'problem_id', detailed?.problemid]);
            }
          });
          addMapListeners(tiles, `${tiles}`);
        });
        let idProjectLine = 0;
        detailed?.components?.forEach((element: any) => {
          if (element.projectid) {
            map.addVectorSource(MHFD_PROJECTS, layers.projects[MHFD_PROJECTS]);
            for (const project of tileStyles[MHFD_PROJECTS]) {
              map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
              map.setFilter(MHFD_PROJECTS + idProjectLine, ['in', 'projectid', element.projectid]);
              idProjectLine++;
            }
          }
        });
        addMapListeners(MHFD_PROJECTS, MHFD_PROJECTS);
      } else if (type === PROJECTS_MODAL) {
        detailed?.problems?.forEach((element: any) => {
          if (element.problemid) {
            i = 0;
            map.addVectorSource(PROBLEMS_TRIGGER, layers.problem_boundary);
            for (const problem of tileStyles.problem_boundary) {
              map.addLayer(`${PROBLEMS_TRIGGER}` + i, PROBLEMS_TRIGGER, problem);
              map.setFilter(`${PROBLEMS_TRIGGER}` + i, ['in', 'problem_id', element.problemid]);
              i++;
            }
          }
        });
        addMapListeners(PROBLEMS_TRIGGER, `${PROBLEMS_TRIGGER}`);
        map.addVectorSource(MHFD_PROJECTS, layers.projects[MHFD_PROJECTS]);
        let idProjectLine = 0;
        for (const project of tileStyles[MHFD_PROJECTS]) {
          let projecttypes = project.metadata.projecttype;
          if (detailed.code_project_type_id !== undefined) {
            if (
              +detailed.code_project_type_id !== 5 &&
              !(+detailed.code_project_type_id >= 7 && +detailed.code_project_type_id <= 11) &&
              +detailed.code_project_type_id !== 17 &&
              +detailed.code_project_type_id !== 1 &&
              +detailed.code_project_type_id !== 4
            ) {
              if (projecttypes.includes(999)) {
                map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
              }
            } else {
              if (projecttypes.includes(+detailed.code_project_type_id)) {
                map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
              }
            }
            if (detailed?.project_id) {
              map.setFilter(MHFD_PROJECTS + idProjectLine, ['in', 'projectid', detailed?.project_id]);
            }

            idProjectLine++;
          }
          i = 0;
          addMapListeners(MHFD_PROJECTS, MHFD_PROJECTS);
        }
      }
      if (detailed?.coordinates) {
        map.fitBounds([
          detailed?.coordinates[0][0],
          detailed?.coordinates[0][2]
        ],
          {
            duration: 10
          });
      } else {
        if (detailed?.project_id) {
          console.log('project id', detailed?.project_id);
          datasets.getData(`${SERVER.BBOX_COMPONENTS}?table=${MHFD_PROJECTS}&id=${detailed?.project_id}&activetab=1`).then((coordinates: any) => {
            console.log('coordinates', coordinates);
            if (coordinates.bbox) {
              map.fitBounds(
                [
                  [coordinates.bbox[0][0][0], coordinates.bbox[0][0][1]],
                  [coordinates.bbox[0][2][0], coordinates.bbox[0][2][1]],
                ],
                {
                  padding: 0,
                  duration: 10
                }
              );
            }
          });
        }
      }
      map.getLoadZoom(updateZoom);
      map.getMoveZoom(updateZoom);
      applyNearMapLayer();
    }
  };

  useEffect(() => {
    if (map) {
      let eventToClick = eventclick;
      map.map.on('click', eventToClick);
      return () => {
        map.map.off('click', eventToClick);
      };
    }
  }, [allLayers]);

  const eventclick = async (e: any) => {
    const popups: any = [];
    const mobile: any = [];
    const menuOptions: any = [];
    const ids: any = [];
    const mobileIds: any = [];
    const bbox = [e.point.x, e.point.y, e.point.x, e.point.y];
    setSelectedPopup(-1);
    await addPopupsOnClick(
      map.map,
      bbox,
      allLayers,
      coordX,
      coordY,
      e,
      mobile,
      menuOptions,
      popups,
      mobileIds,
      ids,
      userInformation,
      getComponentsByProjid,
      () => {},
      [],
      'DETAIL_MAP'
    );

    if (popups.length) {
      popup.remove();
      popup = new mapboxgl.Popup({ closeButton: true });
      setSelectedPopup(0);
      addPopupAndListeners(
        'detail_map',
        menuOptions,
        popups,
        userInformation,
        () => {},
        popup,
        map.map,
        showPopup,
        () => {},
        () => {},
        () => {},
        e,
        ids,
      );
    }
  };
  const showPopup = (index: any, size: number, id: any, event: any) => {
    console.log('index', index, size, id, event);
    for (let i = 0; i < size; i++) {
      const div = document.getElementById('popup-' + i);
      if (div != null) {
        div.classList.remove('map-pop-03');
      }
    }
    const div = document.getElementById('popup-' + index);
    if (div != null) {
      div.classList.add('map-pop-03');
    }
    return;
  };
  const addMapListeners = (key: string, value: string) => {
    const styles = { ...(tileStyles as any) };
    const availableLayers: any[] = [];
    if (styles[key]) {
      styles[key]?.forEach((style: LayerStylesType, index: number) => {
        if (!map.getLayer(value + index)) {
          return;
        }
        availableLayers.push(key + index);
        map.addMouseEnter(value + index, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.removeMouseEnter(value + index, () => {
          map.getCanvas().style.cursor = '';
        });
        map.clickOnMap((e: any) => {
          if (!e.defaultPrevented) {
            map.removePopUp();
          }
        });
      });
      setAllLayers(allLayers => [...allLayers, ...availableLayers]);
    }
  };

  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map2');
      if (!html) {
        setTimeout(waiting, 150);
      } else {
        if (!map) {
          map = new MapService('map2');
          map.isStyleLoaded(addLayer);
        }
      }
    };
    waiting();
    return () => {
      map = undefined;
      resetDetailed();
    };
  }, []);

  useEffect(() => {
    if (Object.keys(layers).length === 0) {
      SELECT_ALL_FILTERS.forEach(async layer => {
        if (layer !== 'area_based_mask' && layer !== 'border') {
          if (typeof layer === 'object') {
            if (layer.name !== 'use_land_cover') {
              layer.tiles.forEach(async (subKey: string) => {
                getMapTables(subKey, layer.name);
              });
            }
          } else {
            getMapTables(layer);
          }
        }
      });
    }
  }, [layerFilters, layers]);

  useEffect(() => {
    console.log('DETAILES', detailed);
    if (map) {
      map.isStyleLoaded(addLayer);
    }
  }, [detailed]);
  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 24 }}
          style={{ display: 'flex', alignItems: 'center' }}
          className="subtitle-detail"
        >
          <h3 style={{ marginBottom: '15px', marginTop: '20px', marginRight: '35px' }} id="maps">
            MAP
          </h3>
          <div className="line-01" style={{ marginBottom: '15px', marginTop: '20px', width: '94%' }}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <div id="map2" style={{ height: '520px', width: '100%', borderRadius: '1%' }}></div>
        </Col>
      </Row>
    </>
  );
});

export default Map;
