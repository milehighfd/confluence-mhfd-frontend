import React, { useState, useEffect } from "react";
import { Button, Row, Col, Popover, Table } from 'antd';
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';

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

export const DropPin = ({typeProject, geom, setGeom, setIsEditingPosition}:
  {typeProject: string, geom: any, setGeom: Function, setIsEditingPosition?: any}) => {
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
    console.log('nnnnnnnnnnn', isAddLocation)
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
    console.log('latitude',latitude, latitude === '--', isAddLocation === false)
    if(latitude === '--' && isAddLocation === false){
      setIsEditingPosition(true);
    }else {
      setIsEditingPosition(false);
    }
  }, [latitude])
  return(
    <>
    <div className="sub-title-project">
        <h5 className="requestor-information "> 2. PROJECT GEOMETRY *</h5>
    </div>
    <p className='text-default'>
      Drop a pin on the map by first clicking on ‘Add Location’.
    </p>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 18 }} xxl={{ span: 16 }}>
        <Table dataSource={dataSource} columns={columns} bordered  className="table-project"/>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6}} xxl={{ span: 8 }}>
          <Button className="btn-location" onClick={changeLocation}>{isAddLocation?'Remove Location':(latitude != '--' && longitude != '--' ? 'Change Location':'Add Location')}</Button>
           {/* <Button className="btn-location" onClick={changeLocation}>{isAddLocation?'Remove Location':(latitude != '--' && longitude != '--' ? 'Change Location':'Add Location')}</Button> */}
        </Col>
      </Row>
    </>
  );
}
