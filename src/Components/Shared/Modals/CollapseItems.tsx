import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Collapse, Table, Row, Col, Menu } from 'antd';

import { MapService } from '../../../utils/MapService';
import store from '../../../store';
import { PROBLEMS_MODAL, PROJECTS_MODAL, COMPONENT_LAYERS } from '../../../constants/constants';
import { tileStyles } from '../../../constants/mapStyles';
import { ComponentPopup, MainPopup } from '../../Map/MapPopups';
import { LayerStylesType } from '../../../Classes/MapTypes';
import { CloseOutlined } from '@ant-design/icons';
// import DetailedModal from '../Modals/DetailedModal';


const { Panel } = Collapse;

export default ({ type, data, detailedPage, getComponentsByProblemId, id, typeid, loaderTableCompoents, updateModal, componentCounter, getComponentCounter }:
       { type: string, data: any, detailedPage: any, getComponentsByProblemId: Function, id: string, typeid: string,
        loaderTableCompoents: boolean, updateModal: Function, componentCounter: number, getComponentCounter: Function }) => {
  const [ active, setActive ] = useState(['1','2','3','4']);
  const [ zoomValue, setZoomValue] = useState(0);
  let html = document.getElementById('map2');
  const layers = store.getState().map.layers;
  let map: any;
  console.log(componentCounter, getComponentCounter);
  // if (html) {
  //   map = new MapService('map2');
  //   map.create('map2');
  // }
  useEffect(() => {
    const waiting = () => {
      html = document.getElementById('map2');
      if (!html) {
        setTimeout(waiting, 50);
      } else {
        if(!map) {
          map = new MapService('map2');
          map.isStyleLoaded(addLayer);
        }
      }
    };
    waiting();
  }, []);
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
          <MainPopup item={item}></MainPopup>
      </>
  );
  const updateZoom = () => {
    const zoom = map.getZoom().toFixed(2);
    setZoomValue(zoom);
}
  const addLayer = () => {
    if(map) {
      let i = 0;
      const styles = {...tileStyles as any};
      for (const key in layers.components) {
          map.addVectorSource(key, layers.components[key]);
          i = 0;
          if((detailedPage.problemid && type === PROBLEMS_MODAL) ||(detailedPage.projectid && type === PROJECTS_MODAL)) {
            for (const component of styles[key] ) {
              map.addLayer(key + i, key, component);
              map.setFilter(key + i, ['in', type === PROBLEMS_MODAL ? 'problemid': 'projectid',type === PROBLEMS_MODAL ? detailedPage.problemid : detailedPage.projectid]);
              i++;

            }
            addMapListeners(key, key );
          }

      }
      if(type === PROBLEMS_MODAL) {
        map.addVectorSource('problems', layers.problems);
        for (const problem of tileStyles.problems) {
          map.addLayer('problems-layer_' + i, 'problems', problem);
          map.setFilter('problems-layer_' + i, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          i++;
        }
        addMapListeners('problems', 'problems-layer_');
        let idProjectLine = 0;
        let idProjectPolygon = 0;
        detailedPage.components.forEach((element: any) => {
          if(element.projectid) {
            // let i = 0;
            map.addVectorSource('projects-line', layers.projects.projects_line_1);
            for (const project of tileStyles.projects_line_1) {
              map.addLayer('projects-line_' + idProjectLine, 'projects-line', project);
              map.setFilter('projects-line_' + idProjectLine, ['in', 'projectid', element.projectid]);
              idProjectLine++;
            }
            map.addVectorSource('projects-polygon', layers.projects.projects_polygon_);
            // i = 0;
            for (const project of tileStyles.projects_polygon_) {
              map.addLayer('projects-polygon_' + idProjectPolygon, 'projects-polygon', project);
              map.setFilter('projects-polygon_' + idProjectPolygon, ['in', 'projectid', element.projectid]);
              idProjectPolygon++;
            }
          }
        });
        addMapListeners('projects_line_1', 'projects-line_');
        addMapListeners('projects_polygon_', 'projects-polygon_');
      } else {
        detailedPage.problems.forEach((element: any) => {
          if(element.problemid) {
            i = 0;
            map.addVectorSource('problems', layers.problems);
            for (const problem of tileStyles.problems) {
              map.addLayer('problems-layer_' + i, 'problems', problem);
              map.setFilter('problems-layer_' + i, ['in', 'problemid', element.problemid]);
              i++;
            }
          }
        });
        addMapListeners('problems', 'problems-layer_');
        map.addVectorSource('projects-line', layers.projects.projects_line_1);
        let idProjectLine = 0;
        let idProjectPolygon = 0;
        for (const project of tileStyles.projects_line_1) {
          map.addLayer('projects-line_' + idProjectLine, 'projects-line', project);
          map.setFilter('projects-line_' + idProjectLine, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          idProjectLine++;
        }
        map.addVectorSource('projects-polygon', layers.projects.projects_polygon_);
        i = 0;
        for (const project of tileStyles.projects_polygon_) {
          map.addLayer('projects-polygon_' + idProjectPolygon, 'projects-polygon', project);
          map.setFilter('projects-polygon_' + idProjectPolygon, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          idProjectPolygon++;
        }
        addMapListeners('projects_line_1', 'projects-line_');
        addMapListeners('projects_polygon_', 'projects-polygon_');

      }
      const reducer = (accumulator: any, currentValue: any) => [accumulator[0] + currentValue[0], accumulator[1] + currentValue[1]];
      // const coor = detailedPage.coordinates[0].reduce(reducer, [0,0]);
      map.fitBounds([detailedPage.coordinates[0][0],detailedPage.coordinates[0][2]]);
      map.getLoadZoom(updateZoom);
      map.getMoveZoom(updateZoom);
    }
  }
  const addMapListeners = (key: string, value: string) => {
    const styles = { ...tileStyles as any };
    if (styles[key]) {
        styles[key].forEach((style : LayerStylesType, index : number) => {
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
            map.click(value + index, (e:any) => {
              e.preventDefault();
              if ( map.getLayoutProperty(key + '_' + index, 'visibility') === 'none') {
                return;
              }
              if (key === 'problems') {
                getComponentCounter(e.features[0].properties.problemid || 0, 'problemid', setCounterPopup);
                const item = {
                    type: 'problems',
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
              if (key.includes('projects') && !key.includes('mep')) {
                  getComponentCounter(e.features[0].properties.projectid || 0, 'projectid', setCounterPopup);
                  const item = {
                      type: 'projects',
                      title: 'Project',
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
                const item = {
                    layer: 'Components',
                    subtype: e.features[0].properties.type ? e.features[0].properties.type : '-',
                    status: e.features[0].properties.subtype ? e.features[0].properties.subtype : '-',
                    estimatedcost: e.features[0].properties.original_cost ? e.features[0].properties.original_cost : '-',
                    studyname: e.features[0].properties.mdp_osp_study_name ? e.features[0].properties.mdp_osp_study_name : '-',
                    jurisdiction: e.features[0].properties.jurisdiction ? e.features[0].properties.jurisdiction : '-',
                    problem: 'Dataset in development'
                };
                html = loadComponentPopup(item);
            }
              if (key === 'mep_projects_temp_locations') {
                  const item = {
                      layer: 'MEP Temporary Location',
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === 'mep_projects_detention_basins') {
                  const item = {
                      layer: 'MEP Detention Basin',
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === 'mep_projects_channels') {
                  const item = {
                      layer: 'MEP Channel',
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === 'mep_projects_storm_outfalls') {
                  const item = {
                      layer: 'MEP Storm Outfall',
                      feature: e.features[0].properties.proj_name ? e.features[0].properties.proj_name : '-',
                      projectno: e.features[0].properties.proj_no ? e.features[0].properties.proj_no : '-',
                      mepstatus: e.features[0].properties.mep_status ? e.features[0].properties.mep_status : '-',
                      mepstatusdate: e.features[0].properties.status_date ? e.features[0].properties.status_date : '-',
                      notes: e.features[0].properties.mhfd_notes ? e.features[0].properties.mhfd_notes : '-',
                      servicearea: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-'
                  }
                  html = loadComponentPopup(item);
              }
              if (key === 'watershed_service_areas') {
                  const item = {
                      layer: 'Service Area',
                      feature: e.features[0].properties.servicearea ? e.features[0].properties.servicearea : '-',
                      watershedmanager: e.features[0].properties.watershedmanager ? e.features[0].properties.watershedmanager : '-',
                      constructionmanagers: e.features[0].properties.constructionmanagers ? e.features[0].properties.constructionmanagers : '-',
                  }
                  html = loadComponentPopup(item);
              }
              if (key === 'catchments' || key === 'basin') {
                  const item = {
                      layer: 'Watershed',
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
        sorter: true,
        width: 300
      },
      {
        title: 'Cost',
        dataIndex: 'estimated_cost',
        render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(estimated_cost),
        sorter: true
      },
      {
        title: '% Complete',
        dataIndex: 'percen',
        render: (percen: number) => Math.round(percen * 10) /10 + '%',
        sorter: true
      },
      {
        title: '% of Total Cost',
        dataIndex: 'original_cost',
        sorter: true,
        render: (original_cost: number) => Math.round(original_cost * 10)/10 + '%'
        /* new Intl.NumberFormat("en-EN").format(original_cost) + '%' */
      }
    ];
  } else {
    columns = [
      {
        title: 'Component Type',
        dataIndex: 'type',
        sorter: true,
        width: 300
      },
      {
        title: 'Cost',
        dataIndex: 'estimated_cost',
        render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(estimated_cost),
        sorter: true
      },
      {
        title: '% Complete',
        dataIndex: 'percen',
        render: (percen: number) => Math.round(percen * 10) /10 + '%',
        sorter: true,
      },
      {
        title: '% of Total Cost',
        dataIndex: 'original_cost',
        sorter: true,
        render: (original_cost: number) => Math.round(original_cost * 10)/10 + '%'
        /* new Intl.NumberFormat("en-EN").format(original_cost) */
      }
    ];
  }

  const openProblem = (problemname: string) => {
    const problem = detailedPage.problems.filter((prob: any) => prob.problemname === problemname);
    //problemid = problem[0].problemid;
    //setProblemId(problemid);
    updateModal(problem[0].problemid);
  }

  const columnProblems = [
    {
      title: 'Name',
      dataIndex: 'problemname',
      render: (problemname: string) => <div onClick={() => {openProblem(problemname)}}>{problemname}</div>
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
    <Collapse defaultActiveKey={['1','2','3','4']} onChange={(e: any) => {
      setActive(e);
    }}>
      {type === PROJECTS_MODAL && <Panel header="PROBLEM" key="1" extra={genExtra('1')}>
        <Row className="table-up-modal">
            <Col span={24}>
              <Table loading={false} columns={columnProblems} rowKey={(record: any) => record.problemid} dataSource={detailedPage.problems} pagination={false}
                onChange={(pagination, filters, sort) => {

                }} />
            </Col>
          </Row>
      </Panel>}

      {type === PROJECTS_MODAL && <Panel header="VENDORS" key="2" extra={genExtra('2')}>
        <div className="detailed-info">
          <Row>
            <Col span={4}>
              <label><i>Contractor</i></label>
            </Col>
            <Col span={8}>
              <p>{ detailedPage.contractor ? detailedPage.contractor : 'N/A' }</p>
            </Col>
            <Col span={4}>
              <label><i>Consultant</i></label>
            </Col>
            <Col span={8}>
              <p>{detailedPage.consultant ? detailedPage.consultant : 'N/A' }</p>
            </Col>
          </Row>
        </div>
      </Panel>}
      {/*

      <Panel header="VENDORS" key="2" extra={genExtra()}>
        <div className="detailed-info">
          <Row>
            <Col span={4}>
              <label><i>Contractor</i></label>
            </Col>
            <Col span={8}>
              <p>Atkins</p>
            </Col>
            <Col span={4}>
              <label><i>Consultant</i></label>
            </Col>
            <Col span={8}>
              <p>Applegate Group</p>
            </Col>
          </Row>
        </div>
      </Panel> */}

      <Panel header={type === PROBLEMS_MODAL ? 'Solution Components' : 'Solution Components'} key="3" extra={genExtra('3')}>
        <Row className="table-up-modal">
          <Col span={24}>
            <Table loading={loaderTableCompoents} columns={columns} rowKey={(record: any) => record.type} dataSource={data} pagination={false}
              onChange={(pagination, filters, sort) => {
                getComponentsByProblemId({id, typeid, sortby: sort.columnKey, sorttype: (sort.order === 'descend' ? 'desc': 'asc')});
                // handleTableChange(pagination, filters, sort)
              }} />
          </Col>
        </Row>
        {data.length > 0 && <div className="solution-b" style={{display:'flex'}}>
          <div style={{width:'284px'}}><b>Total Estimated Cost</b></div>
          <div style={{padding: '0px 12.5px'}}><b>${new Intl.NumberFormat("en-EN").format(total)}</b></div>
        </div>}
      </Panel>

      <Panel header="Map" key="4" extra={genExtra('4')}>
        <div className="map" style={{height:'500px'}}>
          <div id="map2" style={{ height: '100%', width: '100%' }} >
            <div></div>
          </div>
          {/* <div className="test-style"> Zoom: {zoomValue}</div> */}
              
          <div className="m-footer icon-legend">
            <Collapse accordion defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header="Legend" key="1">
              <hr />
              <div className="scroll-footer">
                  <p><span style={{ background: '#ffdd00', border: 'hidden' }} />Projects</p>
                  <p><span className="color-footer-problem" style={{ background: '#FF342F', border: 'hidden'   }} />Problems</p>
                  <p><span style={{ background: '#3EE135', border: 'hidden' }} />Components</p>
              </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </Panel>

      {/* <Panel header="Attachments" key="5" extra={genExtra()}>
        <div className="data-00">
          <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-1.jpg</div>
          <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-2.jpg</div>
        </div>
      </Panel> */}

    </Collapse>
  </div>
}
