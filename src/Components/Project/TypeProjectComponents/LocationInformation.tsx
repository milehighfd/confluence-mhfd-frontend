import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {  PROJECT_INFORMATION, SERVICE_AREA, SERVICE_AREA_VALUE } from "../../../constants/constants";


const { TextArea } = Input;
const { Option } = Select;
const content08 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);

export const LocationInformation = ({setServiceArea, setCounty}:
  {setServiceArea: Function, setCounty: Function}) => {
  
  const apllyServiceArea = (e: any)=>{
    setServiceArea(e);
  };
  const apllyCounty = (e: any)=>{
    setCounty(e);
  };
  return(
    <>
    <h5>4. Location Information <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>    
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Service Area <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select placeholder="Select a Service Area" style={{width:'100%'}} onChange={(serviceArea)=> apllyServiceArea(serviceArea)}>
          {SERVICE_AREA.map((element) =>{
            if(element!= 'None'){
              if(element != 'Boulder Service Area'){
                return <Option key={element} value={element}>{element}</Option>
              }
            }})}
        </Select>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">County <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select placeholder="Select a County" style={{width:'100%'}}  onChange={(county)=> apllyCounty(county)}>
          {PROJECT_INFORMATION.COUNTRY_PROJECT.map((element) =>{
            return <Option key={element} value={element}>{element}</Option>
          })}
        </Select>
      </Col>
    </Row>
    </>
  );
}
