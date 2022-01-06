import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import {  NEW_PROJECT_TYPES, PROJECT_INFORMATION, SERVICE_AREA, SERVICE_AREA_VALUE } from "../../../constants/constants";


const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);

export const ProjectInformation = ({type, description, setDescription, reason, setReason, subReason, setSubReason, otherReason, setOtherReason}:
  {type?: string, description: string, setDescription: Function, reason?: string, setReason?: Function, subReason?: string, setSubReason?: Function, otherReason?: string, setOtherReason?: Function}) => {
  const [reasonForm, setreasonForm] = useState(reason || undefined);
  const [subReasonForm, setSubReasonForm] = useState(subReason|| undefined);
  const apllyDescription = (e: any)=>{
    setDescription(e.target.value);
  };
  useEffect(() => {
    if(reason === ''){
      setreasonForm(undefined)
    }
    if(subReason === ''){
      setSubReasonForm(undefined)
    }
  }, []);
  const apllyOtherReason = (e: any)=>{
    if(e.target.value.length <= 100){
      if(setOtherReason){
        setOtherReason(e.target.value);
      }
    }
  };
  useEffect(() => {
    if(setReason){
      setReason(reasonForm)
    }
    if(setSubReason){
      setSubReason(subReasonForm)
    }
  }, [reasonForm, subReasonForm]);
  return(
    <>
      <h5>1. Project Information</h5>
      <Row gutter={[16, 16]}>
        {type && type === NEW_PROJECT_TYPES.Study && (
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Reason for Study<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <div id="reason">
                <Select style={{width:'100%'}} placeholder={"Select a Reason"} value={reasonForm} onChange={setreasonForm}>
                  <Option key={"Not previously studied"} value={"Not previously studied"}>{"Not previously studied"}</Option>
                  <Option key={"Flood hazard mapping is outdated"} value={"Flood hazard mapping is outdated"}>{"Flood hazard mapping is outdated"}</Option>
                  <Option key={"Master plan recommendations are outdated"} value={"Master plan recommendations are outdated"}>{"Master plan recommendations are outdated"}</Option>
                  <Option key={"Other"} value={"Other"}>{"Other"}</Option>
                </Select>
              </div>
            </Col>
          </>
        )}
        {reason && reason === "Master plan recommendations are outdated" && (
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Sub-Reason for Study</label>
              <div id="subReason">
                <Select style={{width:'100%'}} placeholder={"Select a Sub-Reason"} value={subReasonForm} onChange={setSubReasonForm}>
                  <Option key={"Changed watershed conditions (land-use, topo, regional detention, etc.)"} value={"Changed watershed conditions (land-use, topo, regional detention, etc.)"}>{"Changed watershed conditions (land-use, topo, regional detention, etc.)"}</Option>
                  <Option key={"Not aligned with current stream management practices"} value={"Not aligned with current stream management practices"}>{"Not aligned with current stream management practices"}</Option>
                  <Option key={"New opportunity available"} value={"New opportunity available"}>{"New opportunity available"}</Option>
                </Select>
              </div>
            </Col>
          </>
        )}

        {reason && reason === "Other" && (
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Other reason <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <TextArea rows={4} placeholder="Add other reason" onChange={(text)=>apllyOtherReason(text)} value={otherReason}/>
            </Col>
          </>
        )}
      </Row>
      <br />
      <label className="sub-title">Description <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <TextArea rows={4} placeholder="Add description" onChange={(description)=>apllyDescription(description)} value={description}/>
    </>
  );
}
