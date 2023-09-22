import React, { useState, useEffect } from "react";
import { Button, Row, Col, Popover, Table } from 'antd';
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import { Countywide } from "./Countywide";
import { NEW_PROJECT_TYPES } from "constants/constants";

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

export const DropPin = ({
  typeProject, 
  geom, 
  setGeom, 
  setIsEditingPosition,
  showDraw,
}:{
  typeProject: string, 
  geom: any, 
  setGeom: Function, 
  setIsEditingPosition?: any,
  showDraw?: any,
}) => {
  const [latitude, setLatitude] = useState('--');
  const [longitude, setLongitude] = useState('--');
  const {saveSpecialLocation, saveAcquisitionLocation} = useProjectDispatch();
  const {specialLocation, acquisitionLocation, isAddLocation, disableFieldsForLG} = useProjectState();
  const [location, setLocation] =useState();
  const [isLocation, setIsLocation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {changeAddLocationState} = useProjectDispatch();
  const dataSource = [
    {
      latitude: latitude,
      longitude: longitude,
    },
  ];
  useEffect(()=>{
    if(geom && geom[0]) {
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
    if(specialLocation.geom && (typeProject === NEW_PROJECT_TYPES.Special || typeProject.toLowerCase() === NEW_PROJECT_TYPES.RND.toLowerCase())) {
      setLatitude( parseFloat(specialLocation.geom.coordinates[0][0][1]).toFixed(4) );
      setLongitude( parseFloat(specialLocation.geom.coordinates[0][0][0]).toFixed(4) );
      setLocation(specialLocation.geom);
      setGeom(specialLocation.geom);
    } else {
      setLocation(undefined);
      setLatitude('--');
      setLongitude('--');
    }
  }, [specialLocation]);
  useEffect(()=>{
    if(acquisitionLocation.geom && typeProject === 'acquisition') {
      setLatitude(parseFloat(acquisitionLocation.geom.coordinates[0][0][1]).toFixed(4)    );
      setLongitude(parseFloat(acquisitionLocation.geom.coordinates[0][0][0]).toFixed(4)   );
      // setLocation(acquisitionLocation.geom);
      setGeom(acquisitionLocation.geom);
    } else {
      setLocation(undefined);
      setLatitude('--');
      setLongitude('--');
    }
  }, [acquisitionLocation]);
  useEffect(()=>{
    setGeom(location);
  },[location]);

  useEffect(()=>{
    if(isEdit === true ){
      setGeom('');
    }
  },[isEdit]);

  useEffect(()=>{
    if(isAddLocation === true ){
      setIsEditingPosition(true);
      setIsEdit(true);
    } else {
      setIsEditingPosition(false);
      setIsEdit(false);
    }
    if(!isAddLocation) {
      setIsLocation(isAddLocation);
    }
    setLatitude('--');
    setLongitude('--'); 
  },[isAddLocation]);
  useEffect(()=>{
    changeAddLocationState(false);
  },[]);

  // useEffect(()=> {
  //   if(latitude === '--' && isAddLocation === false){
  //     setIsEditingPosition(true);
  //   }else {
  //     setIsEditingPosition(false);
  //   }
  // }, [latitude])
  return(
    <>    
      {showDraw && <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
        <Table dataSource={dataSource} columns={columns} bordered className="table-project table-dropin"/>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }} className="center-droppin">
           <Button disabled={disableFieldsForLG} className="btn-purple" onClick={changeLocation}>{isAddLocation?'Remove Location':(latitude != '--' && longitude != '--' ? 'Change Location':'Add Location')}</Button>
        </Col>
      </Row>}
      <br/>
    </>
  );
}
