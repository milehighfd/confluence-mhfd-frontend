import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { useProjectState } from '../../../hook/projectHook';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

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
  const [latitude, setLatitude] = useState('39.744137');
  const [longitude, setLongitude] = useState('- 104.950050');
  const {specialLocation} = useProjectState();
  const dataSource = [
    {
      latitude: latitude,
      longitude:longitude,
    },
  ];
  useEffect(()=>{
    if(specialLocation.geom) {
      setLatitude(specialLocation.geom.coordinates[0][1]);
      setLongitude(specialLocation.geom.coordinates[0][0]);
    }
  }, [specialLocation]);
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
