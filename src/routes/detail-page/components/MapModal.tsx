import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import ReactDOMServer from 'react-dom/server';
import { useDetailedState } from "hook/detailedHook";
import { NEARMAP_STYLE, tileStyles } from "constants/mapStyles";
import store from "store/index";
import { COMPONENT_LAYERS, FLOOD_HAZARDS, MAPTYPES, MENU_OPTIONS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_STORM_OUTFALLS, MEP_PROJECTS_TEMP_LOCATIONS, MHFD_PROJECTS, NEARMAP_TOKEN, PROBLEMS_MODAL, PROBLEMS_TRIGGER, PROJECTS_MODAL, SERVICE_AREA_FILTERS, STREAM_IMPROVEMENT_MEASURE } from "constants/constants";
import { MapService } from "utils/MapService";
import { LayerStylesType } from "Classes/MapTypes";
import { getComponentCounter } from "dataFetching/map";
import { ComponentPopup, MainPopup } from "Components/Map/MapPopups";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "Config/Server.config";

var map: any;
const MapModal = ({type}: {type: any}) => {
  const {
    detailed,
  } = useDetailedState();
  const [, setZoomValue] = useState(0);
  const [counterPopup, setCounterPopup] = useState({componentes: 0});
  const layers = store.getState().map.layers;
  let html = document.getElementById('map3');
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
  const updateZoom = () => {
    if (!map) return;
    const zoom = map.getZoom().toFixed(2);
    setZoomValue(zoom);
}
const loadMainPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
  <>
      <MainPopup id={-1} item={item} test={() => {}  } mapType={MAPTYPES.MAINMAP} ></MainPopup>
  </>
);
const loadComponentPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
  <>
      <ComponentPopup item={item}></ComponentPopup>
  </>
);
const addLayer = () => {
  if(map) {
    console.log('detailedpage data', detailed);
    let i = 0;
    const styles = {...tileStyles as any};
    console.log(layers, "LAYERS")
    for (const key in layers.components) {
      console.log(key, 'KEY')
      map.addVectorSource(key, layers.components[key]);
      i = 0;
      if((detailed?.problemid && type === PROBLEMS_MODAL) ||(detailed?.projectid && type === PROJECTS_MODAL)) {
        for (const component of styles[key] ) {
          map.addLayer(key + i, key, component);
          let fieldComparator = type === PROBLEMS_MODAL ? 'problemid': 'projectid';
          if (STREAM_IMPROVEMENT_MEASURE === key) { 
            fieldComparator = type === PROBLEMS_MODAL ? 'problem_id': 'project_id';
          }
          map.setFilter(key + i, ['in', fieldComparator,type === PROBLEMS_MODAL ? detailed?.problemid : detailed?.projectid]);
          i++;
        }
        addMapListeners(key, key );
      }

  }
  if(type === PROBLEMS_MODAL) {
    i = 0;
    map.addVectorSource(MENU_OPTIONS.PROBLEMS, layers.problem_boundary, tileStyles.problem_boundary);
    for (const problem of tileStyles.problem_boundary) {
      map.addLayer(`${PROBLEMS_TRIGGER}-layer_` + i, MENU_OPTIONS.PROBLEMS, problem);
      map.setFilter(`${PROBLEMS_TRIGGER}-layer_` + i, ['in', 'cartodb_id', detailed?.cartodb_id]);
      i++;
    }
    addMapListeners(PROBLEMS_TRIGGER, `${PROBLEMS_TRIGGER}-layer_`);
    FLOOD_HAZARDS.tiles.forEach((tiles:any) => {
      map.addVectorSource(tiles, layers.floodhazards[tiles]);
      styles[tiles].forEach((element: any, index: number) => {
        map.addLayer(`${tiles}-layer_${index}`, tiles, element);
        map.setFilter(`${tiles}-layer_${index}`, ['in', 'problem_id', detailed?.problemid]);
      }); 
      addMapListeners(tiles, `${tiles}-layer_`);
      // console.log('should have added layer', `${tiles}-layer_`, styles[tiles], tiles , layers.floodhazards[tiles]);
    });
    let idProjectLine = 0;
    detailed?.components?.forEach((element: any) => {
      if(element.projectid) {
        map.addVectorSource('projects-line', layers.projects[MHFD_PROJECTS]);
        for (const project of tileStyles[MHFD_PROJECTS]) {
          map.addLayer('projects-line_' + idProjectLine, 'projects-line', project);
          map.setFilter('projects-line_' + idProjectLine, ['in', 'projectid', element.projectid]);
          idProjectLine++;
        }       
      }
    });
    addMapListeners(MHFD_PROJECTS, 'projects-line_');
  } else if(type === PROJECTS_MODAL) {
    detailed?.problems?.forEach((element: any) => {
      if(element.problemid) {
        i = 0;
        map.addVectorSource(MENU_OPTIONS.PROBLEMS, layers.problem_boundary);
        for (const problem of tileStyles.problem_boundary) {
          map.addLayer(`${PROBLEMS_TRIGGER}-layer_` + i, PROBLEMS_TRIGGER, problem);
          map.setFilter(`${PROBLEMS_TRIGGER}-layer_` + i, ['in', 'problemid', element.problemid]);
          i++;
        }
      }
    });
    addMapListeners(MENU_OPTIONS.PROBLEMS, `${PROBLEMS_TRIGGER}-layer_`);
    map.addVectorSource('projects-line', layers.projects[MHFD_PROJECTS]);
    let idProjectLine = 0;
    for (const project of tileStyles[MHFD_PROJECTS]) {
      map.addLayer('projects-line_' + idProjectLine, 'projects-line', project);
      // commented cause there where an in inconsistency with cartodb_id, it was showing a different project.
      // if (detailedPage?.cartodb_id) {
      //   map.setFilter('projects-line_' + idProjectLine, ['in', 'cartodb_id', detailedPage?.cartodb_id]);
      // }
      if (detailed?.projectid) {
        map.setFilter('projects-line_' + idProjectLine, ['in', 'projectid', detailed?.projectid]);
      }
      
      idProjectLine++;
    }
    i = 0;
    addMapListeners(MHFD_PROJECTS, 'projects-line_');
  }
  if (detailed?.coordinates) {
    map.fitBounds([
      detailed?.coordinates[0][0],
      detailed?.coordinates[0][2]
    ],
      {
        duration: 10
      });
  }else{
    console.log(detailed)
    if(detailed?.project_id){
      datasets.getData(SERVER.GET_BBOX_PROJECTID(detailed.project_id), datasets.getToken())
        .then(
          (cordinates: any) => {
            // let coordinates = coor.coordinates[0];
            // setGeom(coordinates);
            // setEditLocation(coordinates);
            const log =cordinates[0][0];
              const lat = cordinates[0][1]
            map.fitBounds(
              [[cordinates[0][0] ,cordinates[0][1]],[cordinates[2][0] ,cordinates[2][1]]],
              {
                duration: 10
              })
          },
          (e) => {
            console.log('e', e);
          }
        )
    }
  }
  map.getLoadZoom(updateZoom);
  map.getMoveZoom(updateZoom);
  applyNearMapLayer();
}
}
  const addMapListeners = (key: string, value: string) => {
    const styles = { ...tileStyles as any };
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
            map.click(value + index, async (e:any) => {
              e.preventDefault();
              if ( map.getLayoutProperty(key + '_' + index, 'visibility') === 'none') {
                return;
              }
              if (key === MENU_OPTIONS.PROBLEMS) {
                getComponentCounter(e.features[0].properties.problemid || 0, 'problemid', setCounterPopup);
                const item = {
                    type: MENU_OPTIONS.PROBLEMS,
                    title: e.features[0].properties.problemtype ? (e.features[0].properties.problemtype + ' Problem') : '-',
                    name: e.features[0].properties.problemname ? e.features[0].properties.problemname : '-',
                    organization: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                    value: e.features[0].properties.solutioncost ? e.features[0].properties.solutioncost : '0',
                    status: e.features[0].properties.solutionstatus ? (e.features[0].properties.solutionstatus + '%') : '-',
                    priority: e.features[0].properties.problempriority ? e.features[0].properties.problempriority + ' Priority': '-',
                    popupId: 'popup-detailed-page'
                };
                html = loadMainPopup(item);
              }
              if (key.includes(MENU_OPTIONS.PROJECTS) && !key.includes('mep')) {
                  getComponentCounter(e.features[0].properties.projectid || 0, 'projectid', setCounterPopup);
                  const item = {
                      type: MENU_OPTIONS.PROJECTS,
                      title: MENU_OPTIONS.PROJECT,
                      name: e.features[0].properties.projectname ? e.features[0].properties.projectname : e.features[0].properties.requestedname ? e.features[0].properties.requestedname : '-',
                      organization: e.features[0].properties.sponsor ? e.features[0].properties.sponsor : 'No sponsor',
                      value: e.features[0].properties.finalcost ? e.features[0].properties.finalcost : e.features[0].properties.estimatedcost ? e.features[0].properties.estimatedcost : '0',
                      projecctype: e.features[0].properties.projectsubtype ? e.features[0].properties.projectsubtype :  e.features[0].properties.projecttype ? e.features[0].properties.projecttype : '-',
                      status: e.features[0].properties.status ? e.features[0].properties.status : '-',
                      popupId: 'popup-detailed-page'
                  };
                  html = loadMainPopup(item);
              }
              if (COMPONENT_LAYERS.tiles.includes( key)) {
                console.log(e, 'e', key);
                const problemid = e.properties.problemid ?e.properties.problemid:(e.properties.problem_id ? e.properties.problem_id :'');
                          let problemname = '';
                          if(problemid) {
                            if (e.source === STREAM_IMPROVEMENT_MEASURE){
                              let aw = await datasets.getData(SERVER.PROBLEMNNAMECOMP+problemid, datasets.getToken());
                              problemname = aw.problem_name;
                            } else {
                              let aw = await datasets.getData(SERVER.PROBLEMNAME+"/"+problemid, datasets.getToken());
                              problemname = aw[0]?.problemname;
                            }
                          }
                const item = {
                    layer: MENU_OPTIONS.COMPONENTS,
                    subtype: e.features[0].properties.type ? e.features[0].properties.type : '-',
                    status: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
                    estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                    studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
                    jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                    problem: problemname
                };
                html = loadComponentPopup(item);
            }
              if (key === MEP_PROJECTS_TEMP_LOCATIONS) {
                  const item = {
                      layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === MEP_PROJECTS_DETENTION_BASINS) {
                  const item = {
                      layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === MEP_PROJECTS_CHANNELS) {
                  const item = {
                      layer: MENU_OPTIONS.MEP_CHANNEL,
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === MEP_PROJECTS_STORM_OUTFALLS) {
                  const item = {
                      layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key ===  SERVICE_AREA_FILTERS) {
                  const item = {
                      layer: MENU_OPTIONS.SERVICE_AREA,
                      feature: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-',
                      watershedmanager: e.features[0].properties.watershedmanager ? e.features[0].properties.watershedmanager : '-',
                      constructionmanagers: e.features[0].properties.constructionmanagers ? e.features[0].properties.constructionmanagers : '-',
                  }
                  html = loadComponentPopup(item);
              }
              if (key === MENU_OPTIONS.CATCHMENTS || key === MENU_OPTIONS.BASIN) {
                  const item = {
                      layer: MENU_OPTIONS.WATERSHED,
                      feature: e.features[0].properties.str_name ? e.features[0].properties.str_name : 'No name'
                  }
                  html = loadComponentPopup(item);
              }
              if (html) {
                map.removePopUp();
                map.addPopUp(e.lngLat, html);
              }
            });
        });
    }
}

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
      map = undefined;
    }
  }, []);
  useEffect(() => {
    if (map) {
      map.isStyleLoaded(addLayer);
    }
  }, [detailed]);
  useEffect(() => {
    const div = document.getElementById('popup-detailed-page');
    if (div != null) {
        div.innerHTML = `${counterPopup.componentes}`;
    }
  }, [counterPopup]);
  return (
    <>
      <div id="map3" style={{height:'100%', width:'100%', borderRadius:'15px', paddingBottom:'10px'}}></div>
          {/* <img src="/picture/map.png" width='100%'/> */}
    </>
  )
}

export default MapModal;