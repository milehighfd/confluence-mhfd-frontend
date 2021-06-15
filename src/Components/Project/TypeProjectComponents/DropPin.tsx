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
  const content05 = (<div className="popver-info">If the Special Project does not have a physical location (i.e. research study, criteria update, etc.), please drop a pin on the Local Government's City Hall or MHFD Office.</div>);
  const [latitude, setLatitude] = useState('--');
  const [longitude, setLongitude] = useState('--');
  const {saveSpecialLocation, saveAcquisitionLocation} = useProjectDispatch();
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
  useEffect(()=>{
    if(geom) {
      // setLatitude(geom[0][0]);
      // setLongitude(geom[0][1]); 
      setLatitude(geom[0][0]);
      setLongitude(geom[0][1]);
      saveSpecialLocation({geom: {coordinates: [geom[0]]}});
      saveAcquisitionLocation({geom: {coordinates: [geom[0]]}})
    }
  }, []);
  const changeLocation = () => {
    changeAddLocationState(!isLocation);
    setIsLocation(!isLocation);
    setGeom(location);
  }
  useEffect(()=>{
    if(specialLocation.geom) {
      // console.log("SPC:", acquisitionLocation.geom);
      setLatitude( parseFloat(specialLocation.geom.coordinates[0][0][1]).toFixed(2) );
      setLongitude( parseFloat(specialLocation.geom.coordinates[0][0][0]).toFixed(2) );
      setLocation(specialLocation.geom);
      setGeom(specialLocation.geom);
    }
  }, [specialLocation]);

  useEffect(()=>{
    if(acquisitionLocation.geom) {
      // console.log("ACQ:", acquisitionLocation.geom);
      setLatitude(parseFloat(acquisitionLocation.geom.coordinates[0][0][1]).toFixed(2)    );
      setLongitude(parseFloat(acquisitionLocation.geom.coordinates[0][0][0]).toFixed(2)   );
      setLocation(acquisitionLocation.geom);
      setGeom(acquisitionLocation.geom);
    }
  }, [acquisitionLocation]);
  useEffect(()=>{
    setGeom(location);
  },[location]);
  useEffect(()=>{
    if(!isAddLocation) {
      setIsLocation(isAddLocation);
    }
    setLatitude('--');
    setLongitude('--'); 
  },[isAddLocation]);
  useEffect(()=>{
    changeAddLocationState(false);
  },[]);
  return(
    <>
    <h5>2. Drop Pin <Button className="btn-transparent"><img src="/Icons/icon-10.svg" alt="" height="15px" /></Button> {typeProject == 'Special'? <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover>:''} </h5>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
        <Table dataSource={dataSource} columns={columns} bordered />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }}>
           <Button className="btn-location" onClick={changeLocation}>{isAddLocation?'Remove Location':(latitude != '--' && longitude != '--' ? 'Change Location':'Add Location')}</Button>
        </Col>
      </Row>
      <br/>
    </>
  );
}
