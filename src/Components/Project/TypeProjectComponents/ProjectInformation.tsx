import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {  PROJECT_INFORMATION, SERVICE_AREA, SERVICE_AREA_VALUE } from "../../../constants/constants";


const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);

export const ProjectInformation = ({typeProject, description, setDescription, serviceArea, setServiceArea, country, setCountry}:
  {typeProject: string, description: string, setDescription: Function, serviceArea: string, setServiceArea: Function, country: string, setCountry: Function}) => {
  const onChange = (e: any)=>{
    setDescription(e.target.value);
  };
  const apllyServiceArea = (e: any)=>{
    setServiceArea(e);
  };
  const apllyCountry = (e: any)=>{
    setCountry(e);
  };
  return(
    <>
    <h5>1. Project Information</h5>
    <label className="sub-title">Description <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
    <TextArea rows={4} placeholder="Add description"/>
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
        <Select placeholder="Select a Country" style={{width:'100%'}}  onChange={(country)=> apllyCountry(country)}>
          {PROJECT_INFORMATION.COUNTRY_PROJECT.map((element) =>{
            return <Option key={element} value={element}>{element}</Option>
          })}
        </Select>
      </Col>
    </Row>
    </>
  );
}
