import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Geom } from "../../../Classes/Project";
import { geoNaturalEarth1 } from "d3-geo";
import { saveSpecialLocation } from "../../../store/actions/ProjectActions";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const columns = [
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
    ellipsis: true,
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
    ellipsis: true,
  },
];

export const DropPin = ({typeProject, geom, setGeom}:
  {typeProject: string, geom: any, setGeom: Function}) => {
  const onChange = (e: any)=>{
  }
  const [latitude, setLatitude] = useState('--');
  const [longitude, setLongitude] = useState('--');
  const {specialLocation, acquisitionLocation, isAddLocation} = useProjectState();
  const [location, setLocation] =useState();
  const [isLocation, setIsLocation] = useState(false);
  const {changeAddLocationState} = useProjectDispatch();
  const dataSource = [
    {
      latitude: latitude,
      longitude: longitude,
    },
  ];
  const changeLocation = () => {
    changeAddLocationState(!isLocation);
    setIsLocation(!isLocation);
    setGeom(location);
  }
  useEffect(()=>{
    if(specialLocation.geom) {
      setLatitude(specialLocation.geom.coordinates[0][1]);
      setLongitude(specialLocation.geom.coordinates[0][0]);
      setLocation(specialLocation.geom);
    }
  }, [specialLocation]);

  useEffect(()=>{
    if(acquisitionLocation.geom) {
      setLatitude(acquisitionLocation.geom.coordinates[0][1]);
      setLongitude(acquisitionLocation.geom.coordinates[0][0]);
      setLocation(acquisitionLocation.geom);
    }
  }, [acquisitionLocation]);
  useEffect(()=>{
    setGeom(location);
  },[location]);
  useEffect(()=>{
    if(!isAddLocation) {
      setIsLocation(isAddLocation);
    }
  },[isAddLocation]);
  useEffect(()=>{
    changeAddLocationState(false);
  },[]);
  return(
    <>
    <h5>2. Drop Pin <Button className="btn-transparent"><img src="/Icons/icon-10.svg" alt="" height="15px" /></Button></h5>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
        <Table dataSource={dataSource} columns={columns} bordered />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }}>
            {!isLocation && <Button className="btn-location" onClick={changeLocation}>Add Location</Button>}
        </Col>
      </Row>
      <br/>
    </>
  );
}
