import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const dataSource = [
  {
    latitude:'39.744137',
    longitude:'- 104.950050',
  },
];
const columns = [
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },
];

export const DropPin = ({typeProject}:
  {typeProject: string}) => {
  const onChange = (e: any)=>{ 
  }
  return(
    <>
    <h5>2. Drop Pin <Button className="btn-transparent"><img src="/Icons/icon-10.svg" alt="" height="15px" /></Button></h5>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
        <Table dataSource={dataSource} columns={columns} bordered />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }}>
            <Button className="btn-location">Add Location</Button>
        </Col>
      </Row>
      <br/>

    </>
  );
}
