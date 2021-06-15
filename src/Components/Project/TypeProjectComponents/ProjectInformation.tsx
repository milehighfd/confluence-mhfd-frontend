import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {  PROJECT_INFORMATION, SERVICE_AREA, SERVICE_AREA_VALUE } from "../../../constants/constants";


const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);

export const ProjectInformation = ({description, setDescription}:
  {description: string, setDescription: Function}) => {
  const apllyDescription = (e: any)=>{
    setDescription(e.target.value);
  };
  
  return(
    <>
    <h5>1. Project Information</h5>
    <label className="sub-title">Description <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
    <TextArea rows={4} placeholder="Add description" onChange={(description)=>apllyDescription(description)} value={description}/>
    </>
  );
}
