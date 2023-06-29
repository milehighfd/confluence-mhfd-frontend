import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { LayerStylesType } from 'Classes/MapTypes';
import { SERVER } from 'Config/Server.config';
import { FLOOD_HAZARDS, MENU_OPTIONS, MHFD_PROJECTS, NEARMAP_TOKEN, PROBLEMS_MODAL, PROBLEMS_TRIGGER, PROJECTS_MODAL, STREAM_IMPROVEMENT_MEASURE } from 'constants/constants';
import { NEARMAP_STYLE, tileStylesDetailPage as tileStyles } from 'constants/mapStyles';
import { useDetailedState } from 'hook/detailedHook';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProfileState } from 'hook/profileHook';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import { addPopupAndListeners, addPopupsOnClick } from 'routes/map/components/MapFunctionsPopup';
import { MapService } from 'utils/MapService';
import * as datasets from 'Config/datasets';

var map: any;
let coordX = -1;
let coordY = -1;
let popup = new mapboxgl.Popup({closeButton: true,});
const MapModal = ({
  type,
  activeTab
}: {
  type: any,
  activeTab:any
}) => {
  const { detailed } = useDetailedState();
  const { setSelectedPopup } = useMapDispatch();
  const { galleryProjectsV2, layers } = useMapState();
  const { userInformation } = useProfileState();
  const [allLayers, setAllLayers] = useState<any[]>([]);
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  let html = document.getElementById('map3');
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map3');
      if (!html) {
        setTimeout(waiting, 150);
      } else {
        if(!map) {
          map = new MapService('map3');
          map.isStyleLoaded(addLayer);
        }
      }
    };
    waiting();
    return () => {
      map.remove();
      map = undefined;
    }
  }, []);
  const showComponents = (bboxComp: any) => {
      if (bboxComp) {
        console.log('bboxCompon', bboxComp)
        if (map.getLayer('mapboxArcs2')) {
          map.removeLayer('mapboxArcs2');
        }
        if (map.getLayer('arcs2')) {
          map.removeLayer('arcs2');
        }
        if (bboxComp.centroids && bboxComp.centroids.length === 0) {
          console.log('bboxComp', bboxComp)
          setTimeout(() => {
            map.setPitch(0, {duration: 2000});
          }, 3000);
        } else {
          const SOURCE_COLOR = [189, 56, 68];
          const TARGET_COLOR = [13, 87, 73];
          const CIAN_SOLID = [118, 239, 213];
          const RED_SOLID = [255, 60, 60];
          let scatterData: any[] = bboxComp.centroids.map((c: any) => {
            return {
              position: c.centroid,
              name: c.component,
              total: 1,
              color: c.component === 'self' ? SOURCE_COLOR : TARGET_COLOR,
            };
          });
          let arcs: any[] = [];
    
          for (let i = 1; i < bboxComp.centroids.length; i++) {
            arcs.push({
              source: bboxComp.centroids[0].centroid,
              target: bboxComp.centroids[i].centroid,
              value: bboxComp.centroids[i].arcWidth,
              colorArc: bboxComp.centroids[i].component == 'detention_facilities' ? RED_SOLID : CIAN_SOLID,
            });
          }
          let mapboxArcsLayer = new MapboxLayer({
            type: ScatterplotLayer,
            id: 'mapboxArcs2',
            data: scatterData,
            opacity: 1,
            pickable: true,
            getRadius: (d: any) => {
              if (d.name === 'self') {
                return 2;
              } else {
                return 1;
              }
            },
            getColor: (d: any) => d.color,
          });
    
          let arcsLayer = new MapboxLayer({
            type: ArcLayer,
            id: 'arcs2',
            data: arcs,
            brushRadius: 100000,
            getStrokeWidth: (d: any) => 4,
            opacity: 1,
            getSourcePosition: (d: any) => d.source,
            getTargetPosition: (d: any) => d.target,
            getWidth: (d: any) => d.value * 2,
            getHeight: 0.7,
            getSourceColor: (d: any) => d.colorArc,
            getTargetColor: (d: any) => d.colorArc,
          });
          map.map.setPitch(70, {duration: 5000});
          map.map.addLayer(mapboxArcsLayer);
          map.map.addLayer(arcsLayer);

        }
      }
  }
  const applyNearMapLayer = () => {
    if (!map.getSource('raster-tiles')) {
        map.map.addSource('raster-tiles', {
            'type': 'raster',
            'tileSize': 128,
            'tiles': [
                `https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=${NEARMAP_TOKEN}`
                ]
        });
        map.map.addLayer(
          NEARMAP_STYLE,
            'aerialway'
        );
    }
  }
const addLayer = () => {
  if(map) {
    let i = 0;
    const styles = {...tileStyles as any};

  if(type === PROBLEMS_MODAL) {
      i = 0;
      map.addVectorSource(MENU_OPTIONS.PROBLEMS, layers.problem_boundary, tileStyles.problem_boundary);
      for (const problem of tileStyles.problem_boundary) {
        map.addLayer(`${PROBLEMS_TRIGGER}` + i, MENU_OPTIONS.PROBLEMS, problem);
        map.setFilter(`${PROBLEMS_TRIGGER}` + i, ['in', 'cartodb_id', detailed?.cartodb_id]);
        i++;
      }
      addMapListeners(PROBLEMS_TRIGGER, `${PROBLEMS_TRIGGER}`);
    FLOOD_HAZARDS.tiles.forEach((tiles:any) => {
        map.addVectorSource(tiles, layers.floodhazards[tiles]);
        styles[tiles].forEach((element: any, index: number) => {
          map.addLayer(`${tiles}${index}`, tiles, element);
          map.setFilter(`${tiles}${index}`, ['in', 'problem_id', detailed?.problemid]);
        });
        addMapListeners(tiles, `${tiles}`);
      });
      let idProjectLine = 0;
      detailed?.components?.forEach((element: any) => {
      if(element.projectid) {
          map.addVectorSource(MHFD_PROJECTS, layers.projects[MHFD_PROJECTS]);
          for (const project of tileStyles[MHFD_PROJECTS]) {
            map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
            map.setFilter(MHFD_PROJECTS + idProjectLine, ['in', 'projectid', element.projectid]);
            idProjectLine++;
          }
        }
      });
      addMapListeners(MHFD_PROJECTS, MHFD_PROJECTS);
  } else if(type === PROJECTS_MODAL) {
      detailed?.problems?.forEach((element: any) => {
      if(element.problemid) {
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
        if(+detailed.code_project_type_id !== 5 && !(+detailed.code_project_type_id >= 7 && +detailed.code_project_type_id <= 11) && +detailed.code_project_type_id !== 17 && +detailed.code_project_type_id !== 1 && +detailed.code_project_type_id !== 4){
          if(projecttypes.includes(999)){
            map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
          }
        }else{
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
    for (const key in layers.components) {
      map.addVectorSource(key, layers.components[key]);
      i = 0;
      if((detailed?.problemid && type === PROBLEMS_MODAL) ||(detailed?.project_id && type === PROJECTS_MODAL)) {
        for (const component of styles[key] ) {
          map.addLayer(key + i, key, component);
          let fieldComparator = type === PROBLEMS_MODAL ? 'problemid': 'projectid';
          if (STREAM_IMPROVEMENT_MEASURE === key) {
            fieldComparator = type === PROBLEMS_MODAL ? 'problem_id': 'project_id';
          }
          map.setFilter(key + i, ['in', fieldComparator,type === PROBLEMS_MODAL ? detailed?.problemid : detailed?.project_id]);
          i++;
        }
        addMapListeners(key, key );
      }

    }
      let typeForComponents;
      if (detailed.project_id) {
        typeForComponents = MHFD_PROJECTS;
      } else {
        typeForComponents = MENU_OPTIONS.PROBLEMS_BOUNDARY;
      }
      const id = typeForComponents === MHFD_PROJECTS ? detailed.project_id : detailed.problem_id;
      if (detailed?.project_id) {
        datasets.getData(SERVER.BBOX_COMPONENTS + '?table=' + typeForComponents + '&id=' + id + '&activetab='+activeTab).then(
          cordinates => {
            map.fitBounds(
              [
                [cordinates.bbox[0][0][0], cordinates.bbox[0][0][1]],
                [cordinates.bbox[0][2][0], cordinates.bbox[0][2][1]],
              ],
              {
                duration: 10,
              },
            );
            if (activeTab === 1) {
              setTimeout(() => {
                showComponents(cordinates);
              }, 2000);
            }
          },
          e => {
            console.log('e', e);
          },
        );
      }
    applyNearMapLayer();
  }
}
useEffect(() => {
  if (map) {
    let eventToClick = eventclick;
    map.map.on('click', eventToClick);
    return () => {
      map && map.map.off('click', eventToClick);
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
  setMobilePopups([]);
  setActiveMobilePopups([]);
  setSelectedPopup(-1);
  await addPopupsOnClick(
    map.map,
    bbox,
    allLayers,
    coordX,
    coordY,
    e,
    galleryProjectsV2,
    mobile,
    menuOptions,
    popups,
    mobileIds,
    ids,
    userInformation,
    false,
    () => {},
    () => {},
    () => {},
    [],
  );

  if (popups.length) {
    popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true });
    setMobilePopups(mobile);
    setActiveMobilePopups(mobileIds);
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
    const styles = { ...tileStyles as any };
    const availableLayers: any[] = [];
    if (styles[key]) {
        styles[key]?.forEach((style : LayerStylesType, index : number) => {
          let html: any = null;
            if (!map.getLayer(value + index)) {
                return;
            }
            map.addMouseEnter(value + index, () => {
              map.getCanvas().style.cursor = 'pointer';
            });
            map.removeMouseEnter(value + index, () => {
              map.getCanvas().style.cursor = '';
            });
            map.clickOnMap((e:any) => {
              if (!e.defaultPrevented) {
                map.removePopUp();
              }
            });
            availableLayers.push(key +index);
        });
        setAllLayers(allLayers => [...allLayers, ...availableLayers]);
    }
}

  useEffect(() => {
    const div = document.getElementById('popup-detailed-page');
    if (div != null) {
        div.innerHTML = `${0}`;
    }
}, []);
  return (
    <div
      id="map3"
      style={{height:'100%', width:'100%', borderRadius:'15px', paddingBottom:'10px'}}
    />
  )
}

export default MapModal;
