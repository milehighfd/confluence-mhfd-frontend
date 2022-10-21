import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Radio, Row, Select, Table, Tabs, Timeline } from 'antd';
import { InfoCircleOutlined } from "@ant-design/icons";

const ListViewBodyTable = ({record}:{record:any}) => {
  
  return <>
    <div className="list-timeline">
      <Timeline>
        <Timeline.Item color="#47DB99" className="green-timeline">
          <Row>
            <Col xs={{ span: 24}} lg={{ span: 4 }}>
              <span style={{color: '#575175'}}>Process</span><InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#aea9c6'}}/>
            </Col>
            <Col xs={{ span: 24}} lg={{ span: 20 }}>
              <p style={{color: '#575175'}}>Invoice 1243 from Naranjo</p>
            </Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item color="#FDB32B" className="yellow-timeline">
          <Row>
            <Col xs={{ span: 24}} lg={{ span: 4 }}>
              <span style={{color: '#575175'}}>Process</span><InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#aea9c6'}}/>
            </Col>
            <Col xs={{ span: 24}} lg={{ span: 20 }}>
              <p style={{color: '#575175'}}>Invoice 2197 from Muller</p>
            </Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item color="#47DB99" className="green-timeline">
          <Row>
            <Col xs={{ span: 24}} lg={{ span: 4 }}>
              <span style={{color: '#575175'}}>Contact</span><InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#aea9c6'}}/>
            </Col>
            <Col xs={{ span: 24}} lg={{ span: 20 }}>
              <p style={{color: '#575175'}}>Forrest from HRMD for permitting question</p>
            </Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item color="#47DB99" className="green-timeline">
          <Row>
            <Col xs={{ span: 24}} lg={{ span: 4 }}>
              <span style={{color: '#575175'}}>Sign</span><InfoCircleOutlined style={{marginLeft:'10px', fontSize:'14px', color:'#aea9c6'}}/>
            </Col>
            <Col xs={{ span: 24}} lg={{ span: 20 }}>
              <p style={{color: '#575175'}}>Contract 6571 from Naranjo 18, July 2021</p>
            </Col>
          </Row>
        </Timeline.Item>
      </Timeline>
    </div>
  </>
};

export default ListViewBodyTable;