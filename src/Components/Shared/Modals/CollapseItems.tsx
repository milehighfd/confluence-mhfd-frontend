import React, { useEffect, useState } from 'react';
import { Collapse, Table, Row, Col, Menu } from 'antd';
import { MapService } from '../../../utils/MapService';
import store from '../../../store';
import { PROBLEMS_MODAL, PROJECTS_MODAL } from '../../../constants/constants';
import { tileStyles } from '../../../constants/mapStyles';
// import DetailedModal from '../Modals/DetailedModal';


const { Panel } = Collapse;

export default ({ type, data, detailedPage, getComponentsByProblemId, id, typeid, loaderTableCompoents, updateModal }:
       { type: string, data: any, detailedPage: any, getComponentsByProblemId: Function, id: string, typeid: string, 
        loaderTableCompoents: boolean, updateModal: Function }) => {
  
  let html = document.getElementById('map2');
  const layers = store.getState().map.layers;
  let map: any;
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

  const addLayer = () => {
    if(map) {
      let i = 0;
      if(type === PROBLEMS_MODAL) {
        map.addVectorSource('problems', layers.problems);
        for (const problem of tileStyles.problems) {
          map.addLayer('problems-layer_' + i, 'problems', problem);
          map.setFilter('problems-layer_' + i, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          i++;
        }
        detailedPage.components.forEach((element: any) => {
          if(element.projectid) {
            let i = 0;
            map.addVectorSource('projects-line', layers.projects.projects_line_1);
            for (const project of tileStyles.projects_line_1) {
              map.addLayer('projects-line_' + i, 'projects-line', project);
              map.setFilter('projects-line_' + i, ['in', 'projectid', element.projectid]);
              i++;
            }
            map.addVectorSource('projects-polygon', layers.projects.projects_polygon_);
            i = 0;
            for (const project of tileStyles.projects_polygon_) {
              map.addLayer('projects-polygon_' + i, 'projects-polygon', project);
              map.setFilter('projects-polygon_' + i, ['in', 'projectid', element.projectid]);
              i++;
            }
          }
        });
      } else {
        map.addVectorSource('projects-line', layers.projects.projects_line_1);
        for (const project of tileStyles.projects_line_1) {
          map.addLayer('projects-line_' + i, 'projects-line', project);
          map.setFilter('projects-line_' + i, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          i++;
        }
        map.addVectorSource('projects-polygon', layers.projects.projects_polygon_);
        i = 0;
        for (const project of tileStyles.projects_polygon_) {
          map.addLayer('projects-polygon_' + i, 'projects-polygon', project);
          map.setFilter('projects-polygon_' + i, ['in', 'cartodb_id', detailedPage.cartodb_id]);
          i++;
        }
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
      }

      const styles = {...tileStyles as any};
      for (const key in layers.components) {
          map.addVectorSource(key, layers.components[key]);
          i = 0;
          if((detailedPage.problemid && type === 'problem') ||(detailedPage.projectid && type === 'project')) {
            for (const component of styles[key] ) {
              map.addLayer(key + i, key, component);
              map.setFilter(key + i, ['in', type === 'problem' ? 'problemid': 'projectid',type === 'problem' ? detailedPage.problemid : detailedPage.projectid]);
              i++;
            }
          }

      }
      const reducer = (accumulator: any, currentValue: any) => [accumulator[0] + currentValue[0], accumulator[1] + currentValue[1]];
      const coor = detailedPage.coordinates[0].reduce(reducer, [0,0]);
      map.fitBounds([detailedPage.coordinates[0][0],detailedPage.coordinates[0][2]]);
    }
  }
  const total = data.reduce((prev: any, next: any) => prev + next.estimated_cost, 0);
  let columns = [];
  if (type === PROJECTS_MODAL) {
    columns = [
      {
        title: 'Solution Type',
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
        title: 'Percent',
        dataIndex: 'percentage',
        render: (percentage: number) => Math.round(percentage * 10) /10 + '%',
        sorter: false
      }
    ];
  } else {
    columns = [
      {
        title: 'Solution Type',
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
        title: 'Percent',
        dataIndex: 'percentage',
        render: (percentage: number) => Math.round(percentage * 10) /10 + '%',
        sorter: false,
      },
      {
        title: 'Total Cost',
        dataIndex: 'original_cost',
        sorter: true,
        render: (original_cost: number) => new Intl.NumberFormat("en-EN").format(original_cost)
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
  const genExtra = () => {
    html = document.getElementById('map2');
    return <div className="divider" onClick={() => {
      if(map) {
        map.resize();
      }
    }}>
      <div className="line-01"></div>
      <img src="/Icons/icon-20.svg" alt="" />
    </div>
  };

  const menu = (
    <Menu className="no-links-dropdown">
      <Menu.Item>
        <span className="menu-item-text">1st menu item</span>
      </Menu.Item>
      <Menu.Item>
        <span className="menu-item-text">2nd menu item</span>
      </Menu.Item>
      <Menu.Item>
        <span className="menu-item-text">3rd menu item</span>
      </Menu.Item>
    </Menu>
  );
  return <div className="tabs-detailed">
    <Collapse defaultActiveKey={"4"}>
      {type === PROJECTS_MODAL && <Panel header="PROBLEM" key="1" extra={genExtra()}>
        <Row className="table-up-modal">
            <Col span={24}>
              <Table loading={false} columns={columnProblems} rowKey={(record: any) => record.problemid} dataSource={detailedPage.problems} pagination={false}
                onChange={(pagination, filters, sort) => {
                  
                }} />
            </Col>
          </Row>
      </Panel>}

      {type === PROJECTS_MODAL && <Panel header="VENDORS" key="2" extra={genExtra()}>
        <div className="detailed-info">
          <Row>
            <Col span={4}>
              <label><i>Contractor</i></label>
            </Col>
            <Col span={8}>
              <p>{ detailedPage.contractor }</p>
            </Col>
            <Col span={4}>
              <label><i>Consultant</i></label>
            </Col>
            <Col span={8}>
              <p>{detailedPage.consultant }</p>
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

      <Panel header="Component & solutions" key="3" extra={genExtra()}>
        <Row className="table-up-modal">
          <Col span={24}>
            <Table loading={loaderTableCompoents} columns={columns} rowKey={(record: any) => record.type} dataSource={data} pagination={false}
              onChange={(pagination, filters, sort) => {
                getComponentsByProblemId({id, typeid, sortby: sort.columnKey, sorttype: (sort.order === 'descend' ? 'desc': 'asc')});
                // handleTableChange(pagination, filters, sort)
              }} />
          </Col>
        </Row>
        {total > 0 && <div className="solution-b" style={{display:'flex'}}>
          <div style={{width:'284px'}}><b>Total Estimated Cost</b></div>
          <div style={{padding: '0px 12.5px'}}><b>${new Intl.NumberFormat("en-EN").format(total)}</b></div>
        </div>}
      </Panel>

      <Panel header="Map" key="4" extra={genExtra()}>
        <div className="map">
          <div id="map2" style={{ height: '100%', width: '100%' }} >
            <div>-</div>
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
