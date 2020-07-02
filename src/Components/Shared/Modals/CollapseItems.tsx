import React, { useEffect, useState } from 'react';
import { Collapse, Table, Row, Col, Button, Dropdown, Menu } from 'antd';
import { MapService } from '../../../utils/MapService';


const { Panel } = Collapse;
export default ({ type, data }: { type: string, data: any }) => {
  const html = document.getElementById('map2');
  if (html) {
    const map = new MapService('map2');
  }
  //console.log('COLLAPSE',data);
  const showComponent = (type: any) => {
    if (type === 'project') {
      return <Panel header="PROBLEM" key="1" extra={genExtra()}>
        <div className="problem-t">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </Panel>;
    } else {
      return '';
    }
  }
  const showVendors = (type: any) => {
    if (type === 'project') {
      return <Panel header="VENDORS" key="2" extra={genExtra()}>
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
      </Panel>
    } else {
      return '';
    }
  }
  const dataSource = [
    {
      key: '1',
      name: '8 structures in LDC floodplain @Alpha St',
      priority: 'High Priority',
    },
    {
      key: '2',
      name: '8 structures in LDC floodplain @Alpha St',
      priority: 'High Priority',
    },
    {
      key: '3',
      name: '8 structures in LDC floodplain @Alpha St',
      priority: 'High Priority',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
    },
  ];

  const genExtra = () => (
    <div className="divider">
      <div className="line-01"></div>
      <img src="/Icons/icon-20.svg" alt="" />
    </div>
  );

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
    <Collapse>
      {
        showComponent(type)
      }
      { showVendors(type) }
      {/* <Panel header="PROBLEM" key="1" extra={genExtra()}>
        <div className="problem-t">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </Panel>

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
        <Row className="solution-h">
          <Col span={8}><Button>Solution Type <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
          <Col span={4}><Button>Cost <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
          <Col span={4}><Button>Percent <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
          <Col span={8}><Button>Total Cost <img src="/Icons/icon-14.svg" alt="" /></Button></Col>
        </Row>
        {data.components.map( (item: {type: string, percentage: number, estimated_cost: number, original_cost: number}) => {
          return <Row className="solution-b">
                  <Col span={8}>{item.type}</Col>
                  <Col span={4}>${ new Intl.NumberFormat("en-EN").format(item.estimated_cost)}</Col>
                  <Col span={4}>{item.percentage}</Col> 
                  <Col span={8}>{ new Intl.NumberFormat("en-EN").format(item.original_cost/data.solutioncost)}</Col>  
                </Row>
        })}
        {/* <Row className="solution-b">
          <Col span={8}>Alpha St culvert</Col>
          <Col span={4}>$500,000</Col>
          <Col span={4}>Active</Col>
          <Col span={8}>Increased Conveyance - Crossing</Col>
        </Row>
        <Row className="solution-b">
          <Col span={8}>Beta Ave culvert</Col>
          <Col span={4}>$1,200,000</Col>
          <Col span={4}>Active</Col>
          <Col span={8}>Increased Conveyance - Crossing</Col>
        </Row>
        <Row className="solution-b">
          <Col span={8}>Channel imp - LDC @Alpha St</Col>
          <Col span={4}>$700,000</Col>
          <Col span={4}>Active</Col>
          <Col span={8}>Increased Conveyance - Crossing</Col>
        </Row>
        <Row className="solution-b">
          <Col span={8}>Pedestrian bridge in park</Col>
          <Col span={4}>$250,000</Col>
          <Col span={4}>Active</Col>
          <Col span={8}>Increased Conveyance - Crossing</Col>
        </Row>
        <Row className="solution-b">
          <Col span={8}><b>Total Estimated Cost</b></Col>
          <Col span={4}><b>$2,650,000</b></Col>
        </Row> */}
      </Panel>

      <Panel header="Map" key="4" extra={genExtra()}>
        <div className="map">
          <div id="map2" style={{ height: '100%', width: '100%' }} >
            <div>-</div>
          </div>
          
          {/* <Dropdown overlay={menu} className="btn-03">
            <Button>
              Dark Terrain <img src="/Icons/icon-12.svg" alt="" />
            </Button>
          </Dropdown>

          <div className="m-zoom">
            <Button style={{ borderRadius: '4px 4px 0px 0px' }}><img src="/Icons/icon-35.svg" alt="" width="12px" /></Button>
            <Button style={{ borderRadius: '0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)' }}><img src="/Icons/icon-36.svg" alt="" width="12px" /></Button>
          </div>

          <div className="m-foo">
            <p><div style={{ background: '#29c499', marginRight: '5px' }}></div> Problems</p>
            <p><div style={{ background: '#fac774', marginRight: '5px' }}></div> Projects</p>
          </div> */}
        </div>
      </Panel>

      {/* <Panel header="Attachments" key="5" extra={genExtra()}>
        <div className="data-00">
          <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-1.jpg</div>
          <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-2.jpg</div>
        </div>
      </Panel> */}

      {/*<Panel header="Mitigation Types" key="1" extra={genExtra()} >
  <Row>
    <Col span={12}><img src="/Icons/chart-01.png" alt="" height="333px"/></Col>
    <Col span={12}><img src="/Icons/chart-02.png" alt="" height="333px"/></Col>
  </Row>
</Panel>*/}
    </Collapse>
  </div>
}