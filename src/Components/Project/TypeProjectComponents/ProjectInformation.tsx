import React, { useState, useEffect } from "react";
import { Input, Row, Col, Popover, Select } from 'antd';
import {  NEW_PROJECT_TYPES,  STUDY_REASON, STUDY_SUB_REASON } from "../../../constants/constants";

const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);

export const ProjectInformation = ({type, description, setDescription, reason, setReason, subReason, setSubReason}:
  {type?: string, description: string, setDescription: Function, reason?: string, setReason?: Function, subReason?: string, setSubReason?: Function, otherReason?: string, setOtherReason?: Function}) => {
  const [reasonForm, setreasonForm] = useState(reason || undefined);
  const [subReasonForm, setSubReasonForm] = useState(subReason|| undefined);
  const [otherReason, setOtherReason] = useState(reason || undefined);
  const apllyDescription = (e: any)=>{
    setDescription(e.target.value);
  };
  useEffect(() => {
    if(reason === ''){
      setreasonForm(undefined)
    } else {
      setreasonForm(reason);
    }
    if(subReason === ''){
      setSubReasonForm(undefined)
    } else {
      setSubReasonForm(subReason);
    }
    if(reason !== STUDY_REASON[0] || reason !== STUDY_REASON[1] || reason !== STUDY_REASON[2] || reason === undefined){
      setOtherReason(reason);
    } else{
      setOtherReason(undefined);
    }
  }, [reason, subReason]);
  useEffect(() => {
    if(reason === ''){
      setreasonForm(undefined)
    }
    if(subReason === ''){
      setSubReasonForm(undefined)
    }
    if(reason !== STUDY_REASON[0] || reason !== STUDY_REASON[1] || reason !== STUDY_REASON[2] || reason === undefined){
      setOtherReason(reason);
    } else{
      setOtherReason(undefined);
    }
  }, []);
  const apllyOtherReason = (e: any)=>{
    if(e.target.value.length <= 100){
      setOtherReason(e.target.value);
      if(setReason){
        setReason(e.target.value);
      }
    }
  };
  useEffect(() => {
    if(setReason && reasonForm !== STUDY_REASON[3]){ 
      setReason(reasonForm)
    }
    if(setReason && reasonForm === STUDY_REASON[3]){
      setReason(otherReason);
    }
    if(setSubReason){
      setSubReason(subReasonForm);
    }
  }, [reasonForm, subReasonForm]);
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
                <Select style={{width:'100%'}} placeholder={"Select a Reason"} value={reasonForm === STUDY_REASON[0] || reasonForm === STUDY_REASON[1] || reasonForm === STUDY_REASON[2] || reasonForm === undefined? reasonForm :  STUDY_REASON[3]} onChange={setreasonForm}>
                  <Option key={STUDY_REASON[0]} value={STUDY_REASON[0]}>{STUDY_REASON[0]}</Option>
                  <Option key={STUDY_REASON[1]} value={STUDY_REASON[1]}>{STUDY_REASON[1]}</Option>
                  <Option key={STUDY_REASON[2]} value={STUDY_REASON[2]}>{STUDY_REASON[2]}</Option>
                  <Option key={STUDY_REASON[3]} value={STUDY_REASON[3]}>{STUDY_REASON[3]}</Option>
                </Select>
              </div>
            </Col>
            <br></br>
          </>
        )}
        {reasonForm && reasonForm === STUDY_REASON[2] && ( 
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Sub-Reason for Study</label>
              <div id="subReason">
                <Select style={{width:'100%'}} placeholder={"Select a Sub-Reason"} value={subReasonForm} onChange={setSubReasonForm}>
                  <Option key={STUDY_SUB_REASON[0]} value={STUDY_SUB_REASON[0]}>{STUDY_SUB_REASON[0]}</Option>
                  <Option key={STUDY_SUB_REASON[1]} value={STUDY_SUB_REASON[1]}>{STUDY_SUB_REASON[1]}</Option>
                  <Option key={STUDY_SUB_REASON[2]} value={STUDY_SUB_REASON[2]}>{STUDY_SUB_REASON[2]}</Option>
                </Select>
              </div>
            </Col>
            <br></br>
          </>
        )}

        {reasonForm && reasonForm === STUDY_REASON[3] && ( 
          <>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Other reason<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <TextArea rows={4} placeholder="Add another reason" onChange={(text)=>apllyOtherReason(text)} value={otherReason}/>
            </Col>
            <br></br>
          </>
        )}
      </Row>
      <label className="sub-title">Description <Popover content={content00}><img src="../Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <TextArea rows={4} placeholder="Add description" onChange={(description)=>apllyDescription(description)} value={description}/>
    </>
  );
}
