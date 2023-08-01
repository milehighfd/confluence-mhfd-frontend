import React, { useState, useEffect } from "react";
import { Button, Row, Col, Popover, Table } from 'antd';
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import { Countywide } from "./Countywide";

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
    if(specialLocation.geom) {
      setLatitude( parseFloat(specialLocation.geom.coordinates[0][0][1]).toFixed(2) );
      setLongitude( parseFloat(specialLocation.geom.coordinates[0][0][0]).toFixed(2) );
      setLocation(specialLocation.geom);
      setGeom(specialLocation.geom);
    }
  }, [specialLocation]);

  useEffect(()=>{
    if(acquisitionLocation.geom) {
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
    if(isAddLocation === true ){
      setIsEditingPosition(true);
    } else {
      setIsEditingPosition(false);
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

  useEffect(()=> {
    if(latitude === '--' && isAddLocation === false){
      setIsEditingPosition(true);
    }else {
      setIsEditingPosition(false);
    }
  }, [latitude])
  return(
    <>    
      {showDraw && <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} xxl={{ span: 12 }}>
        <Table dataSource={dataSource} columns={columns} bordered className="table-project table-dropin"/>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12}} xxl={{ span: 12 }} className="center-droppin">
           <Button className="btn-purple" onClick={changeLocation}>{isAddLocation?'Remove Location':(latitude != '--' && longitude != '--' ? 'Change Location':'Add Location')}</Button>
        </Col>
      </Row>}
      <br/>
    </>
  );
}
