import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Collapse, Table, Row, Col } from 'antd';

import { MapService } from '../../../utils/MapService';
import store from '../../../store';
import { PROBLEMS_MODAL, PROJECTS_MODAL, COMPONENT_LAYERS, MENU_OPTIONS, MEP_PROJECTS_TEMP_LOCATIONS, MEP_PROJECTS_DETENTION_BASINS, MEP_PROJECTS_CHANNELS, MEP_PROJECTS_STORM_OUTFALLS, SERVICE_AREA_FILTERS, NEARMAP_TOKEN, PROBLEMS_TRIGGER, MHFD_PROJECTS, FLOOD_HAZARDS } from '../../../constants/constants';
import { tileStyles, NEARMAP_STYLE } from '../../../constants/mapStyles';
import { ComponentPopup, MainPopup } from '../../Map/MapPopups';
import { LayerStylesType } from '../../../Classes/MapTypes';
import { getComponentCounter } from '../../../dataFetching/map';
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { STREAM_IMPROVEMENT_MEASURE } from '../../../routes/map/constants/layout.constants';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { getTitleOfProblemsPart, getTitleOfStreamImprovements } from 'routes/map/components/MapFunctionsUtilities';
const { Panel } = Collapse;
var map: any;

export default forwardRef(({
  type,
  data,
  detailedPage,
  id,
  typeid,
  updateModal,
  problemParts
}: {
  type: string,
  data: any,
  detailedPage: any,
  id: string,
  typeid: string,
  updateModal: Function
  problemParts?: any
}, ref) => {
  const {
    loaderTableCompoents
  } = useMapState();
  const {
    getComponentsByProblemId
  } = useMapDispatch();
  let sections = ['4'];
  if (detailedPage?.problems && detailedPage?.problems?.length > 0) {
    sections.push('1');
  }
  if (problemParts) {
    sections.push('33');
  }
  if (detailedPage?.consultant || detailedPage?.contractor) {
    sections.push('2');
  }
  if (detailedPage?.components && detailedPage?.components?.length > 0) {
    sections.push('3');
  }
  const [ active, setActive ] = useState(sections);
  const [, setZoomValue] = useState(0);
  let html = document.getElementById('map2');
  const layers = store.getState().map.layers;
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
        }, 3000);
      }
      w8();
    });
  }
  useImperativeHandle(
    ref,
    () => ({
      getCanvasBase64
    })
  )
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
    }
    
  }, []);
  useEffect(() => {
    if (map) {
      map.isStyleLoaded(addLayer);
    }
  }, [detailedPage]);
  const [counterPopup, setCounterPopup] = useState({componentes: 0});

  useEffect(() => {
    const div = document.getElementById('popup-detailed-page');
    if (div != null) {
        div.innerHTML = `${counterPopup.componentes}`;
    }
}, [counterPopup]);
  const loadComponentPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
    <>
        <ComponentPopup item={item}></ComponentPopup>
    </>
  );
  const loadMainPopup = (item: any) => ReactDOMServer.renderToStaticMarkup (
      <>
          <MainPopup id={-1} item={item} getDetailPage={() => {}} detailPage={true} mapType={undefined}></MainPopup>
      </>
  );
  const updateZoom = () => {
    if (!map) return;
    const zoom = map.getZoom().toFixed(2);
    setZoomValue(zoom);
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
      for (const key in layers.components) {
          map.addVectorSource(key, layers.components[key]);
          i = 0;
          if((detailedPage?.problemid && type === PROBLEMS_MODAL) ||(detailedPage?.projectid && type === PROJECTS_MODAL)) {
            for (const component of styles[key] ) {
              map.addLayer(key + i, key, component);
              let fieldComparator = type === PROBLEMS_MODAL ? 'problemid': 'projectid';
              if (STREAM_IMPROVEMENT_MEASURE === key) { 
                fieldComparator = type === PROBLEMS_MODAL ? 'problem_id': 'project_id';
              }
              map.setFilter(key + i, ['in', fieldComparator,type === PROBLEMS_MODAL ? detailedPage?.problemid : detailedPage?.projectid]);
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
          map.setFilter(`${PROBLEMS_TRIGGER}-layer_` + i, ['in', 'cartodb_id', detailedPage?.cartodb_id]);
          i++;
        }
        addMapListeners(PROBLEMS_TRIGGER, `${PROBLEMS_TRIGGER}-layer_`);
        FLOOD_HAZARDS.tiles.forEach((tiles:any) => {
          map.addVectorSource(tiles, layers.floodhazards[tiles]);
          styles[tiles].forEach((element: any, index: number) => {
            map.addLayer(`${tiles}-layer_${index}`, tiles, element);
            map.setFilter(`${tiles}-layer_${index}`, ['in', 'problem_id', detailedPage?.problemid]);
          }); 
          addMapListeners(tiles, `${tiles}-layer_`);
          // console.log('should have added layer', `${tiles}-layer_`, styles[tiles], tiles , layers.floodhazards[tiles]);
        });
        let idProjectLine = 0;
        detailedPage?.components?.forEach((element: any) => {
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
        detailedPage?.problems?.forEach((element: any) => {
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
          if (detailedPage?.projectid) {
            map.setFilter('projects-line_' + idProjectLine, ['in', 'projectid', detailedPage?.projectid]);
          }
          
          idProjectLine++;
        }
        i = 0;
        addMapListeners(MHFD_PROJECTS, 'projects-line_');
      }
      if (detailedPage?.coordinates) {
        map.fitBounds([
          detailedPage?.coordinates[0][0],
          detailedPage?.coordinates[0][2]
        ],
          {
            duration: 10
          });
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
              if (key === PROBLEMS_TRIGGER) {
                getComponentCounter(e.features[0].properties.problemid || 0, 'problemid', setCounterPopup);
                console.log("111111111111111111111111111")
                const item = {
                  type: MENU_OPTIONS.PROBLEMS,
                  streamname: e.features[0].properties.streamname,
                  title: e.features[0].properties.problem_type ? (e.features[0].properties.problem_type + ' Problem') : '-',
                  problem_type: e.features[0].properties.problem_type ? e.features[0].properties.problem_type: '-',
                  name: e.features[0].properties.problem_name ? e.features[0].properties.problem_name : '-',
                  organization: e.features[0].properties.local_government ? e.features[0].properties.local_government : '-',
                  value: e.features[0].properties.estimated_cost ? e.features[0].properties.estimated_cost : e.features[0].properties.component_cost ? e.features[0].properties.component_cost : '-1',
                  status: e.features[0].properties.component_status ? (e.features[0].properties.component_status + '%') : '-',
                  priority: e.features[0].properties.problem_severity ? e.features[0].properties.problem_severity + ' Priority' : '-',
                  problemid: e.features[0].properties.problem_id,
                  component_count: 0,
                  popupId: 'popup',
                  image: `gallery/${e.features[0].properties.problem_type}.png`,
              };
                
                // const item = {
                //     type: MENU_OPTIONS.PROBLEMS,
                //     title: e.features[0].properties.problem_type ? (e.features[0].properties.problem_type + ' Problem') : '-',
                //     name: e.features[0].properties.problem_name ? e.features[0].properties.problem_name : '-',
                //     organization: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                //     value: e.features[0].properties.solutioncost ? e.features[0].properties.solutioncost : '0',
                //     status: e.features[0].properties.solutionstatus ? (e.features[0].properties.solutionstatus + '%') : '-',
                //     priority: e.features[0].properties.problempriority ? e.features[0].properties.problempriority + ' Priority': '-',
                //     popupId: 'popup-detailed-page'
                // };
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

              if (e.features[0].source.includes('flood_hazard')||e.features[0].source.includes('stream_function')||e.features[0].source.includes('future_development')) {
                const item = {
                  layer: getTitleOfProblemsPart(e.features[0]),
                  feature: getTitleOfProblemsPart(e.features[0]),
                  problem_part_category: e.features[0].properties.problem_part_category ? e.features[0].properties.problem_part_category : '-',
                  problem_part_subcategory: e.features[0].properties.problem_part_subcategory ? e.features[0].properties.problem_part_subcategory : '-',
                  problem_part_name: e.features[0].properties.problem_part_name ? e.features[0].properties.problem_part_name : '-',
                  source_complete_year: e.features[0].properties.source_complete_year ? e.features[0].properties.source_complete_year : '0',
                  stream_name: e.features[0].properties.stream_name ? e.features[0].properties.stream_name : '-',
                  local_government: e.features[0].properties.local_government ? e.features[0].properties.local_government : '-'
        
                };
                html = loadComponentPopup(item);
              }

              if (COMPONENT_LAYERS.tiles.includes( key)) {
                const problemid = (e.features[0].properties.problem_id ? e.features[0].properties.problem_id :'');
                          let problemname = '';
                          // if(problemid) {
                          //   if (e.source === STREAM_IMPROVEMENT_MEASURE){
                          //     let aw = await datasets.getData(SERVER.PROBLEMNNAMECOMP+problemid, datasets.getToken());
                          //     problemname = aw.problem_name;
                          //   } else {
                          //     let aw = await datasets.getData(SERVER.PROBLEMNAME+"/"+problemid, datasets.getToken());
                          //     problemname = aw[0]?.problemname;
                          //   }
                          // }

                let volume 
              if(e.features[0].source === 'detention_facilities'){
                  volume = {volume:e.features[0].properties.detention_volume? e.features[0].properties.detention_volume : '-'}
              }
              let item;

              if(e.features[0].source === STREAM_IMPROVEMENT_MEASURE ) {
                item = {
                  layer: MENU_OPTIONS.COMPONENTS,
                  type: getTitleOfStreamImprovements(e.features[0].properties),
                  subtype: e.features[0].properties.complexity_subtype ? e.features[0].properties.complexity_subtype : '-',
                  estimatedcost: e.features[0].properties.estimated_cost_base ? e.features[0].properties.estimated_cost_base : '-',
                  studyname: e.features[0].properties.source_name ? e.features[0].properties.source_name : '-',
                  studyyear: e.features[0].properties.source_complete_year ? e.features[0].properties.source_complete_year: '-',
                  streamname: e.features[0].properties.stream_name ? e.features[0].properties.stream_name : '-',
                  local_gov: e.features[0].properties.local_government ? e.features[0].properties.local_government: '-',
                  objectid: e.features[0].properties.objectid?e.features[0].properties.objectid:'-',
                  table: e.features[0].source ? e.features[0].source : '-',
                  problem: problemname,
                  ...volume
                }
              } else {
                  item= {
                    layer: MENU_OPTIONS.COMPONENTS,
                    type: e.features[0].properties.type ? e.features[0].properties.type : '-',
                    subtype: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
                    status: e.features[0].properties.status ? e.features[0].properties.status : '-',
                    estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                    studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
                    studyyear: e.features[0].properties.year_of_study ? e.features[0].properties.year_of_study: '-',
                    jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                    original_cost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                    table: e.features[0].source ? e.features[0].source : '-',
                    cartodb_id: e.features[0].properties.cartodb_id? e.features[0].properties.cartodb_id: '-',
                    problem: problemname,
                    problemid: problemid,
                    objectid: e.features[0].properties.objectid?e.features[0].properties.objectid:'-',
                    streamname: e.features[0].properties.drainageway,
                    ...volume,
                  };
                }

                // const item = {
                //     layer: MENU_OPTIONS.COMPONENTS,
                //     subtype: e.features[0]?.properties?.type ? e.features[0]?.properties?.type : '-',
                //     status: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
                //     estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                //     studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
                //     jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                //     problem: problemname
                // };
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
  const total = data.reduce((prev: any, next: any) => prev + next.estimated_cost, 0);
  let columns = [];
  if (type === PROJECTS_MODAL) {
    columns = [
      {
        title: 'Component Type',
        dataIndex: 'type',
        sorter: {
          compare: (a: any, b: any) => a.type.localeCompare(b.type)
        },
        width: 300
      },
      {
        title: 'Cost',
        dataIndex: 'estimated_cost',
        render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(Math.round(estimated_cost)),
        sorter: {
          compare: (a: any, b: any) => +a.estimated_cost - (+b.estimated_cost)
        },
      },
      {
        title: '% Complete',
        dataIndex: 'complete_cost',
        render: (complete_cost: number) => `${complete_cost ? Math.round((complete_cost/total)*100) : 0}%`,
        sorter: {
          compare: (a: any, b: any) => +a.complete_cost - (+b.complete_cost)
        },
      },
      {
        title: '% of Total Cost',
        dataIndex: 'percen',
        sorter: {
          compare: (a: any, b: any) => +a.percen - +b.percen
        },
        render: (percen: any) => `${Math.round(percen)}%`
      }
    ];
  } else {
    columns = [
      {
        title: 'Component Type',
        dataIndex: 'type',
        sorter: {
          compare: (a: any, b: any) => a.type.localeCompare(b.type)
        },
        width: 300
      },
      {
        title: 'Cost',
        dataIndex: 'estimated_cost',
        render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(estimated_cost),
        sorter: {
          compare: (a: any, b: any) => +a.estimated_cost - +b.estimated_cost
        },
      },
      {
        title: '% Complete',
        dataIndex: 'original_cost',
        render: (original_cost: number) => `${original_cost ? (Math.round(original_cost * 10) /10) : 0}%`,
        sorter: {
          compare: (a: any, b: any) => +a.original_cost - +b.original_cost
        },
      },
      {
        title: '% of Total Cost',
        dataIndex: 'percen',
        sorter: {
          compare: (a: any, b: any) => +a.percen - +b.percen
        },
        render: (percen: any) => `${percen}%`
      }
    ];
  }

  const openProblem = (problemname: string) => {
    const problem = detailedPage?.problems.filter((prob: any) => prob.problemname === problemname);
    updateModal(problem[0].problemid);
  }
  const columnsProblemPart = [
    {
      title: 'Problem Type',
      dataIndex: 'problem_type',
      sorter: {
        compare: (a: any, b: any) => a.problem_type.localeCompare(b.problem_type)
      },
    },
    {
      title: 'Problem Part Category',
      dataIndex: 'problem_part_category',
      // render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(estimated_cost),
      sorter: {
        compare: (a: any, b: any) => a.problem_part_category.localeCompare(b.problem_part_category)
      },
    },
    {
      title: 'Problem Part Subcategory',
      dataIndex: 'problem_part_subcategory',
      // render: (original_cost: number) => `${original_cost ? (Math.round(original_cost * 10) /10) : 0}%`,
      sorter: {
        compare: (a: any, b: any) => a.problem_part_subcategory.localeCompare(b.problem_part_subcategory)
      },
    }
  ];
  const columnProblems = [
    {
      title: 'Name',
      dataIndex: 'problemname',
      render: (problemname: string) => <div onClick={() => {openProblem(problemname)}}>{problemname}</div>,
      sorter: {
        compare: (a: any, b: any) => a.problemname.localeCompare(b.problemname)
      },
    },
    {
      title: 'Priority',
      dataIndex: 'problempriority'
    }
  ];
  const genExtra = (key: string) => {
    html = document.getElementById('map2');
    return <div key={key} className="divider" onClick={() => {
      if(map) {
        map.resize();
      }
    }}>
      <div className="line-01"></div>
      {active.includes(key) ? <img src="/Icons/icon-21.svg" alt="" /> : <img src="/Icons/icon-20.svg" alt="" />}
    </div>
  };

  return <div className="tabs-detailed">
    <Collapse defaultActiveKey={active} onChange={(e: any) => {
      setActive(e);
    }}>
      {type === PROJECTS_MODAL && <Panel header="PROBLEM" key="1" extra={genExtra('1')}>
        <Row className="table-up-modal">
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Table loading={false} columns={columnProblems} rowKey={(record: any) => record.problemid} dataSource={detailedPage?.problems} pagination={false}
                onChange={(pagination, filters, sort) => {

                }} />
            </Col>
          </Row>
      </Panel>}

      {type === PROJECTS_MODAL && <Panel header="VENDORS" key="2" extra={genExtra('2')}>
        <div className="detailed-info padding-00">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <label><i>Contractor</i></label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <p>{ detailedPage?.contractor ? detailedPage?.contractor : 'N/A' }</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              <label><i>Consultant</i></label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <p>{detailedPage?.consultant ? detailedPage?.consultant : 'N/A' }</p>
            </Col>
          </Row>
        </div>
      </Panel>}
      {type === PROBLEMS_MODAL && <Panel header={'Problem Parts'} key="33" extra={genExtra('33')}>
        <div className="scroll-mobile">
          <Row className="table-up-modal">
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Table loading={loaderTableCompoents} columns={columnsProblemPart} rowKey={(record: any) => record.type} dataSource={problemParts} pagination={false}
                onChange={(pagination, filters, sort) => {
                  const _sort: any = sort;
                  console.log('_sort', _sort);
                  // getComponentsByProblemId({id, typeid, sortby: _sort.columnKey, sorttype: (_sort.order === 'descend' ? 'desc': 'asc')});
                }} />
            </Col>
          </Row>
        </div>
      </Panel>}
      <Panel header={type === PROBLEMS_MODAL ? 'Solution Components' : 'Solution Components'} key="3" extra={genExtra('3')}>
        <div className="scroll-mobile">
          <Row className="table-up-modal">
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Table loading={loaderTableCompoents} columns={columns} rowKey={(record: any) => record.type} dataSource={data} pagination={false}
                onChange={(pagination, filters, sort) => {
                  const _sort: any = sort;
                  console.log('_sort', _sort);
                  getComponentsByProblemId({id, typeid, sortby: _sort.columnKey, sorttype: (_sort.order === 'descend' ? 'desc': 'asc')});
                }} />
            </Col>
          </Row>
          {data?.length > 0 && <div className="solution-b" style={{display:'flex'}}>
            <div style={{width:'284px'}}><b>Total Estimated Cost</b></div>
            <div style={{padding: '0px 12.5px'}}><b>${new Intl.NumberFormat("en-EN").format(Math.round(total))}</b></div>
          </div>}
        </div>
      </Panel>

      <Panel header="Map" key="4" extra={genExtra('4')}>
        <div className="map map-modal">
          <div id="map2" style={{ height: '100%', width: '100%' }} className="mapborderradius">
            <div></div>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
})
