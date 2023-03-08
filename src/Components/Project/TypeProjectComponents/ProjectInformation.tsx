import React, { useState, useEffect } from "react";
import { Input, Row, Col, Popover, Select } from 'antd';
import {  NEW_PROJECT_TYPES,  STUDY_REASON, STUDY_SUB_REASON } from "../../../constants/constants";

const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);

export const ProjectInformation = ({type, description, setDescription, reason, setReason, subReason, setSubReason}:
  {type?: string, description: string, setDescription: Function, reason?: number, setReason?: Function, subReason?: number, setSubReason?: Function, otherReason?: string, setOtherReason?: Function}) => {
  const [reasonForm, setreasonForm] = useState(reason || undefined);
  const [subReasonForm, setSubReasonForm] = useState(subReason|| undefined);
  const [otherReason, setOtherReason] = useState('');
  const apllyDescription = (e: any)=>{
    setDescription(e.target.value);
  };
  useEffect(() => {
    if(reason === 0){
      setreasonForm(undefined)
    } else {
      setreasonForm(reason);
    }
    if(subReason === 0){
      setSubReasonForm(undefined)
    } else {
      setSubReasonForm(subReason);
    }
    if(reason !== STUDY_REASON[0].id || reason !== STUDY_REASON[1].id || reason !== STUDY_REASON[2].id || reason === undefined){
      setOtherReason('sample');
    }
  }, [reason, subReason]);
  useEffect(() => {
    if(reason === 0){
      setreasonForm(undefined)
    }
    if(subReason === 0){
      setSubReasonForm(undefined)
    }
    if(reason !== STUDY_REASON[0].id || reason !== STUDY_REASON[1].id || reason !== STUDY_REASON[2].id || reason === undefined){
      setOtherReason('sample');
    }
  }, []);
  const apllyOtherReason = (e: any)=>{
    if(e.target.value.length <= 100){
      setOtherReason(e.target.value);
    }
  };
  return(
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px'}}>
          <h5>1. Project Information<span className="requiered">&nbsp;*</span></h5>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{marginBottom: '-25px', paddingTop: '5px'}}>
          <p className="requiered-text"><span className="requiered">*&nbsp;</span>Required</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop:'20px'}}>
        {type && type === NEW_PROJECT_TYPES.Study && (
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{padding: '8px'}}>
              <label className="sub-title">Reason for Study<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <div id="reason">
                <Select style={{width:'100%'}} placeholder={"Select a Reason"} value={reasonForm === STUDY_REASON[0].id || reasonForm === STUDY_REASON[1].id || reasonForm === STUDY_REASON[2].id || reasonForm === undefined? reasonForm :  STUDY_REASON[3].id} onChange={setreasonForm}>
                  <Option key={STUDY_REASON[0].id} value={STUDY_REASON[0].id}>{STUDY_REASON[0].name}</Option>
                  <Option key={STUDY_REASON[1].id} value={STUDY_REASON[1].id}>{STUDY_REASON[1].name}</Option>
                  <Option key={STUDY_REASON[2].id} value={STUDY_REASON[2].id}>{STUDY_REASON[2].name}</Option>
                  <Option key={STUDY_REASON[3].id} value={STUDY_REASON[3].id}>{STUDY_REASON[3].name}</Option>
                </Select>
              </div>
            </Col>
          </>
        )}
        {reasonForm && reasonForm === STUDY_REASON[2].id && ( 
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Sub-Reason for Study</label>
              <div id="subReason">
                <Select style={{width:'100%'}} placeholder={"Select a Sub-Reason"} value={subReasonForm} onChange={setSubReasonForm}>
                  <Option key={STUDY_SUB_REASON[0].id} value={STUDY_SUB_REASON[0].id}>{STUDY_SUB_REASON[0].name}</Option>
                  <Option key={STUDY_SUB_REASON[1].id} value={STUDY_SUB_REASON[1].id}>{STUDY_SUB_REASON[1].name}</Option>
                  <Option key={STUDY_SUB_REASON[2].id} value={STUDY_SUB_REASON[2].id}>{STUDY_SUB_REASON[2].name}</Option>
                </Select>
              </div>
            </Col>
          </>
        )}

        {reasonForm && reasonForm === STUDY_REASON[3].id && ( 
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Other reason<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <TextArea rows={4} placeholder="Add another reason" onChange={(text)=>apllyOtherReason(text)} value={otherReason}/>
            </Col>
          </>
        )}
      </Row>
      <label className="sub-title">Description <Popover content={content00}><img src="../Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <TextArea rows={4} placeholder="Add description" onChange={(description)=>apllyDescription(description)} value={description}/>
    </>
  );
}
