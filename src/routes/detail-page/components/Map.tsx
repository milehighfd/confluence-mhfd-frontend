import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import * as turf from '@turf/turf';
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import ReactDOMServer from 'react-dom/server';
import { useDetailedState } from "hook/detailedHook";
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { NEARMAP_STYLE, tileStylesDetailPage as tileStyles } from "constants/mapStyles";
import store from "store/index";
import { COMPONENT_LAYERS, FLOOD_HAZARDS, MAPTYPES, MENU_OPTIONS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_STORM_OUTFALLS, MEP_PROJECTS_TEMP_LOCATIONS, MHFD_PROJECTS, NEARMAP_TOKEN, PROBLEMS_MODAL, PROBLEMS_TRIGGER, PROJECTS_MODAL, PROPSPROBLEMTABLES, SELECT_ALL_FILTERS, SERVICE_AREA_FILTERS, STREAM_IMPROVEMENT_MEASURE } from "constants/constants";
import { MapService } from "utils/MapService";
import { LayerStylesType } from "Classes/MapTypes";
import { getComponentCounter } from "dataFetching/map";
import { ComponentPopup, MainPopup } from "Components/Map/MapPopups";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "Config/Server.config";
import { getTitleOfProblemsPart, getTitleOfStreamImprovements } from "routes/map/components/MapFunctionsUtilities";
import EventService from "services/EventService";
import { addPopupAndListeners, addPopupsOnClick } from "routes/map/components/MapFunctionsPopup";
import mapboxgl from "mapbox-gl";
import { useProfileState } from "hook/profileHook";

var map: any;
let coordX = -1;
let coordY = -1;
let popup = new mapboxgl.Popup({closeButton: true,});
const Map = ({type}: {type: any}) => {
  const {
    detailed,
  } = useDetailedState();
  const {
    resetDetailed,
    setSelectedPopup
  } = useMapDispatch();
  const {
    galleryProjectsV2,
  } = useMapState();
  const [, setZoomValue] = useState(0);
  const [counterPopup, setCounterPopup] = useState({componentes: 0});
  const { userInformation } = useProfileState();
  const [allLayers, setAllLayers] = useState<any[]>([]);
  const [mobilePopups, setMobilePopups] = useState<any>([]);
  const [activeMobilePopups, setActiveMobilePopups] = useState<any>([]);
  const layers = store.getState().map.layers;
  let html = document.getElementById('map2');
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
      <MainPopup id={-1} item={item} test={() => {}  } mapType={'detail_map'} ></MainPopup>
  </>
);
const loadComponentPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
  <>
      <ComponentPopup item={item}></ComponentPopup>
  </>
);
const addLayer = () => {
  if(map) {
    let i = 0;
    const styles = {...tileStyles as any};
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
      // console.log('should have added layer', `${tiles}`, styles[tiles], tiles , layers.floodhazards[tiles]);
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
      map.addLayer(MHFD_PROJECTS + idProjectLine, MHFD_PROJECTS, project);
      // commented cause there where an in inconsistency with cartodb_id, it was showing a different project.
      // if (detailedPage?.cartodb_id) {
      //   map.setFilter(MHFD_PROJECTS + idProjectLine, ['in', 'cartodb_id', detailedPage?.cartodb_id]);
      // }
      if (detailed?.project_id) {
        map.setFilter(MHFD_PROJECTS + idProjectLine, ['in', 'projectid', detailed?.project_id]);
      }
      
      idProjectLine++;
    }
    i = 0;
    addMapListeners(MHFD_PROJECTS, MHFD_PROJECTS);
    }
    if (detailed?.coordinates) {
      console.log('Should not exist');
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
        datasets.getData(`${SERVER.BBOX_COMPONENTS}?table=${MHFD_PROJECTS}&id=${detailed?.project_id}&activetab=1`).then((coordinates: any) => {
          if( coordinates.bbox ) {
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
        // datasets.getData(SERVER.GET_BBOX_PROJECTID(detailed.project_id), datasets.getToken())
        //   .then(
        //     (cordinates: any) => {
        //       // let coordinates = coor.coordinates[0];
        //       // setGeom(coordinates);
        //       // setEditLocation(coordinates);
        //       const log =cordinates[0][0];
        //       const lat = cordinates[0][1]
        //       map.fitBounds(
        //         [[cordinates[0][0] ,cordinates[0][1]],[cordinates[2][0] ,cordinates[2][1]]],
        //         {
        //           duration: 10
        //         })
        //     },
        //     (e) => {
        //       console.log('e', e);
        //     }
        //   )
      }
    }
    map.getLoadZoom(updateZoom);
    map.getMoveZoom(updateZoom);
    applyNearMapLayer();
  }
}

useEffect(() => {
  if (map) {
    EventService.setRef('click', eventclick);
    let eventToClick = EventService.getRef('click');
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
    addPopupAndListeners(
      'detail_map',
      menuOptions,
      popups,
      userInformation,
      () => {},
      setMobilePopups,
      setActiveMobilePopups,
      setSelectedPopup,
      mobile,
      mobileIds,
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
            availableLayers.push(key +index);
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
            // map.click(value + index, async (e:any) => {
            //   e.preventDefault();
            //   if ( map.getLayoutProperty(key + '_' + index, 'visibility') === 'none') {
            //     return;
            //   }
            //   if (key === MENU_OPTIONS.PROBLEMS || key === 'problem_boundary') {
            //     getComponentCounter(e.features[0].properties.problemid || 0, 'problemid', setCounterPopup);
                
            //     const item = {
            //       type: MENU_OPTIONS.PROBLEMS,
            //       streamname: e.features[0].properties.streamname,
            //       title: e.features[0].properties.problem_type ? (e.features[0].properties.problem_type + ' Problem') : '-',
            //       problem_type: e.features[0].properties.problem_type ? e.features[0].properties.problem_type: '-',
            //       name: e.features[0].properties.problem_name ? e.features[0].properties.problem_name : '-',
            //       organization: e.features[0].properties.local_government ? e.features[0].properties.local_government : '-',
            //       value: e.features[0].properties.estimated_cost ? e.features[0].properties.estimated_cost : e.features[0].properties.component_cost ? e.features[0].properties.component_cost : '-1',
            //       status: e.features[0].properties.component_status ? (e.features[0].properties.component_status + '%') : '-',
            //       priority: e.features[0].properties.problem_severity ? e.features[0].properties.problem_severity + ' Priority' : '-',
            //       problemid: e.features[0].properties.problem_id,
            //       component_count: e.features[0].properties.component_count ?? 0,
            //       popupId: 'popup-detailed-page',
            //       image: `gallery/${e.features[0].properties.problem_type}.png`,
            //   };
            //     html = loadMainPopup(item);
            //   }
            //   if (key.includes(MENU_OPTIONS.PROJECTS) && !key.includes('mep')) {
            //       getComponentCounter(e.features[0].properties.projectid || 0, 'projectid', setCounterPopup);
            //       const item = {
            //           type: MENU_OPTIONS.PROJECTS,
            //           title: MENU_OPTIONS.PROJECT,
            //           name: e.features[0].properties.projectname ? e.features[0].properties.projectname : e.features[0].properties.requestedname ? e.features[0].properties.requestedname : '-',
            //           organization: e.features[0].properties.sponsor ? e.features[0].properties.sponsor : 'No sponsor',
            //           value: e.features[0].properties.finalcost ? e.features[0].properties.finalcost : e.features[0].properties.estimatedcost ? e.features[0].properties.estimatedcost : '0',
            //           projecctype: e.features[0].properties.projectsubtype ? e.features[0].properties.projectsubtype :  e.features[0].properties.projecttype ? e.features[0].properties.projecttype : '-',
            //           status: e.features[0].properties.status ? e.features[0].properties.status : '-',
            //           component_count: detailed.totalComponents,
            //           popupId: 'popup-detailed-page'
            //       };
            //       html = loadMainPopup(item);
            //   }
            //   if (COMPONENT_LAYERS.tiles.includes( key)) {
            //     const problemid = (e.features[0].properties.problem_id ? e.features[0].properties.problem_id :'');
            //               let problemname = '';
            //               // if(problemid) {
            //               //   if (e.source === STREAM_IMPROVEMENT_MEASURE){
            //               //     let aw = await datasets.getData(SERVER.PROBLEMNNAMECOMP+problemid, datasets.getToken());
            //               //     problemname = aw.problem_name;
            //               //   } else {
            //               //     let aw = await datasets.getData(SERVER.PROBLEMNAME+"/"+problemid, datasets.getToken());
            //               //     problemname = aw[0]?.problemname;
            //               //   }
            //               // }

            //     let volume 
            //   if(e.features[0].source === 'detention_facilities'){
            //       volume = {volume:e.features[0].properties.detention_volume? e.features[0].properties.detention_volume : '-'}
            //   }
            //   let item;

            //   if(e.features[0].source === STREAM_IMPROVEMENT_MEASURE ) {
            //     item = {
            //       layer: MENU_OPTIONS.COMPONENTS,
            //       type: getTitleOfStreamImprovements(e.features[0].properties),
            //       subtype: e.features[0].properties.complexity_subtype ? e.features[0].properties.complexity_subtype : '-',
            //       estimatedcost: e.features[0].properties.estimated_cost_base ? e.features[0].properties.estimated_cost_base : '-',
            //       studyname: e.features[0].properties.source_name ? e.features[0].properties.source_name : '-',
            //       studyyear: e.features[0].properties.source_complete_year ? e.features[0].properties.source_complete_year: '-',
            //       streamname: e.features[0].properties.stream_name ? e.features[0].properties.stream_name : '-',
            //       local_gov: e.features[0].properties.local_government ? e.features[0].properties.local_government: '-',
            //       objectid: e.features[0].properties.objectid?e.features[0].properties.objectid:'-',
            //       table: e.features[0].source ? e.features[0].source : '-',
            //       problem: problemname,
            //       ...volume
            //     }
            //   } else {
            //       item= {
            //         layer: MENU_OPTIONS.COMPONENTS,
            //         type: e.features[0].properties.type ? e.features[0].properties.type : '-',
            //         subtype: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
            //         status: e.features[0].properties.status ? e.features[0].properties.status : '-',
            //         estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
            //         studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
            //         studyyear: e.features[0].properties.year_of_study ? e.features[0].properties.year_of_study: '-',
            //         jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
            //         original_cost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
            //         table: e.features[0].source ? e.features[0].source : '-',
            //         cartodb_id: e.features[0].properties.cartodb_id? e.features[0].properties.cartodb_id: '-',
            //         problem: problemname,
            //         problemid: problemid,
            //         objectid: e.features[0].properties.objectid?e.features[0].properties.objectid:'-',
            //         streamname: e.features[0].properties.drainageway,
            //         ...volume,
            //       };
            //     }

            //     // const item = {
            //     //     layer: MENU_OPTIONS.COMPONENTS,
            //     //     subtype: e.features[0]?.properties?.type ? e.features[0]?.properties?.type : '-',
            //     //     status: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
            //     //     estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
            //     //     studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
            //     //     jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
            //     //     problem: problemname
            //     // };
            //     html = loadComponentPopup(item);
            // }
            // if (e.features[0].source.includes('flood_hazard')||e.features[0].source.includes('stream_function')||e.features[0].source.includes('future_development')) {
            //   const item = {
            //     layer: getTitleOfProblemsPart(e.features[0]),
            //     feature: getTitleOfProblemsPart(e.features[0]),
            //     problem_part_category: e.features[0].properties.problem_part_category ? e.features[0].properties.problem_part_category : '-',
            //     problem_part_subcategory: e.features[0].properties.problem_part_subcategory ? e.features[0].properties.problem_part_subcategory : '-',
            //     problem_part_name: e.features[0].properties.problem_part_name ? e.features[0].properties.problem_part_name : '-',
            //     source_complete_year: e.features[0].properties.source_complete_year ? e.features[0].properties.source_complete_year : '0',
            //     stream_name: e.features[0].properties.stream_name ? e.features[0].properties.stream_name : '-',
            //     local_government: e.features[0].properties.local_government ? e.features[0].properties.local_government : '-'
      
            //   };
            //   html = loadComponentPopup(item);
            // }
            //   if (key === MEP_PROJECTS_TEMP_LOCATIONS) {
            //       const item = {
            //           layer: MENU_OPTIONS.MEP_TEMPORARY_LOCATION,
            //           feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
            //           projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
            //           mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
            //           mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
            //           notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
            //           servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (key === MEP_PROJECTS_DETENTION_BASINS) {
            //       const item = {
            //           layer: MENU_OPTIONS.MEP_DETENTION_BASIN,
            //           feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
            //           projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
            //           mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
            //           mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
            //           notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
            //           servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (key === MEP_PROJECTS_CHANNELS) {
            //       const item = {
            //           layer: MENU_OPTIONS.MEP_CHANNEL,
            //           feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
            //           projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
            //           mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
            //           mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
            //           notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
            //           servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (key === MEP_PROJECTS_STORM_OUTFALLS) {
            //       const item = {
            //           layer: MENU_OPTIONS.MEP_STORM_OUTFALL,
            //           feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
            //           projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
            //           mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
            //           mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
            //           notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
            //           servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (key ===  SERVICE_AREA_FILTERS) {
            //       const item = {
            //           layer: MENU_OPTIONS.SERVICE_AREA,
            //           feature: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-',
            //           watershedmanager: e.features[0].properties.watershedmanager ? e.features[0].properties.watershedmanager : '-',
            //           constructionmanagers: e.features[0].properties.constructionmanagers ? e.features[0].properties.constructionmanagers : '-',
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (key === MENU_OPTIONS.CATCHMENTS || key === MENU_OPTIONS.BASIN) {
            //       const item = {
            //           layer: MENU_OPTIONS.WATERSHED,
            //           feature: e.features[0].properties.str_name ? e.features[0].properties.str_name : 'No name'
            //       }
            //       html = loadComponentPopup(item);
            //   }
            //   if (html) {
            //     map.removePopUp();
            //     map.addPopUp(e.lngLat, html);
            //   }
            // });
        });
        setAllLayers(allLayers => [...allLayers, ...availableLayers]);

    }
}

  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map2');
      if (!html) {
        setTimeout(waiting, 150);
      } else {
        if(!map) {
          map = new MapService('map2');
          map.isStyleLoaded(addLayer);
        }
      }
    };
    waiting();
    return () => {
      map = undefined;
      resetDetailed();
    }
  }, []);
  useEffect(() => {
    const div = document.getElementById('popup-detailed-page');
    if (div != null) {
        div.innerHTML = `${counterPopup.componentes}`;
    }
}, [counterPopup]);
useEffect(() => {
  if (map) {
    map.isStyleLoaded(addLayer);
  }
}, [detailed]);
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}} id="maps">MAP</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 20 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <div id="map2" style={{height:'520px', width:'100%', borderRadius:'1%'}}></div>
          {/* <img src="/picture/map.png" width='100%'/> */}
        </Col>
      </Row>
    </>
  )
}

export default Map;