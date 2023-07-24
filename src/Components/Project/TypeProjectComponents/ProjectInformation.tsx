import React, { useEffect } from "react";
import { Input, Row, Col, Popover, Select, Switch } from 'antd';
import {  MAINTENANCE_ELIGIBILITY, NEW_PROJECT_TYPES,  STUDY_REASON, WINDOW_WIDTH } from "../../../constants/constants";
import { SERVER } from "../../../Config/Server.config";
import * as datasets from "../../../Config/datasets";

const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info">Frequency indicates the number of times per-year that a maintenance activity is requested for routine activities. For example, select 2 for twice-per-year, or select 12 for monthly.</div>);
const content05 = (<div className="popver-info" style={{ width: '261px' }}> Indicate why this project is eligible for MHFD maintenance. <br /><br /><b>Capital Project</b> – The project was completed as part of a MHFD Capital Improvement Plan
  <br /> <b>MEP</b> – The project has been accepted through development review as part of MHFD's Maintenance Eligibility Program (MEP)
  <br /><b>Grandfathered</b> – Development occurred before MHFD’s Maintenance Eligibility Program started in 1980
  <br /><b>Not Eligible</b> – The project does not meet any of the above criteria
  <br /><b>Unknown</b>  – Maintenance eligibility status is unknown</div>);
const content04 = (<div className="popver-info">Flip this switch to indicate that the project is located on a property to which the Local Government has legal right-of-access. This is a requirement for all Maintenance Projects.</div>);
const selec = ['None'];
for (var i = 1; i < 13; i++) {
  selec.push('' + i);
}



export const ProjectInformation = ({
  type, 
  description, 
  setDescription, 
  reason, 
  setReason, 
  otherReason, 
  setOtherReason,
  frequency,
  applyFrequency,
  eligibility,
  applyEligibility,
  ownership,
  applyOwnership
}:{
  type?: string, 
  description: string, 
  setDescription: Function, 
  reason?: number, 
  setReason?: any, 
  otherReason?: any, 
  setOtherReason?: any,
  frequency?: any,
  applyFrequency?: any,
  eligibility?: any,
  applyEligibility?: any,
  ownership?: any,
  applyOwnership?: any
}) => {
  const [studyReasons, setStudyReasons] = React.useState<any[]>([]);
  const [studySubReasons, setStudySubReasons] = React.useState<any[]>([]);
  useEffect(() => {
    console.log(reason, studyReasons, studyReasons.find(d => d.id === reason)?.isParent);
    if(reason && reason === studyReasons.find((x:any)=> 'Other' === x.name)?.id){
      setOtherReason('');
    } else {
      if (reason) setReason(reason)
    }
    if(otherReason) setOtherReason(otherReason);
  }, [reason]);
  
  const apllyDescription = (e: any)=>{
    setDescription(e.target.value);
  };

  const apllyOtherReason = (e: any)=>{
    if(e.target.value.length <= 100){
      setOtherReason(e.target.value);
    }
  };

  useEffect(() => {
    if (type && type?.toLowerCase() === NEW_PROJECT_TYPES.Study.toLowerCase()) {
      datasets.getData(SERVER.GET_STUDIES).then((res: any) => {
        setStudyReasons(res.map((d: any) => ({
          id: d.code_study_reason_id,
          name: d.reason_name,
          ...d
        })));
      });
    }
  }, []);

  const handleChange = (e: any) => {
    if (e) setReason(e);
  }

  const getValue = (reason: number | undefined) => {
    const found = studyReasons.find(d => d.id === reason);
    if (found) {
      if (found.isSubreason) {
        return studyReasons.find(d => d.name === 'Master plan recomendations are outdated').id;
      } else {
        return reason;
      }
    }
    return null;
  };
  return (
    <>
      <div className="sub-title-project">
        <h5>1. Project Information&nbsp;*</h5>
        <p className="requiered-text"><span className="requiered">*&nbsp;Required</span></p>
      </div>
        {type && type?.toLowerCase() === NEW_PROJECT_TYPES.Study.toLowerCase() && (
          <>
          <Row gutter={[16, 16]} className="information-description">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '8px' }}>
              <label className="sub-title">Reason for Study<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <div id="reason">
                <Select
                  style={{ width: '100%' }}
                  placeholder={"Select a Reason"}
                  listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                  value={getValue(reason)}
                  onChange={handleChange}>
                  {studyReasons.filter((x: any) => !x.isSubreason).map((x: any) => {
                    return (<Option key={x.id} value={x.id}>{x.name}</Option>)
                  })}
                </Select>
              </div>
            </Col>
          </Row>
          </>
        )}
        {reason && (
           studyReasons.find(d => d.id === reason)?.isParent ||
           getValue(reason) !== reason
        ) && (
            <>
            <Row gutter={[16, 16]} className="information-description">
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '0px 8px' }}>
                <label className="sub-title">Sub-Reason for Study</label>
                <div id="subReason">
                <Select
                  style={{ width: '100%' }}
                  placeholder={"Select a Sub-Reason"}
                  listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                  value={studyReasons.filter((x: any) => x.isSubreason).find(d => reason === d.id) ? reason : 'Select a Sub-Reason'}
                  onChange={handleChange}>
                    {studyReasons.filter((x: any) => x.isSubreason).map((x: any) => {
                      return (<Option key={x.id} value={x.id}>{x.name}</Option>)
                    })}
                  </Select>
                </div>
              </Col>
              </Row>
            </>
          )}

        {reason && reason === studyReasons.find((x:any)=> 'Other' === x.name)?.id && ( 
          <>
          <Row gutter={[16, 16]} className="information-description">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <label className="sub-title">Other reason<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
              <TextArea rows={1} placeholder="Add another reason" onChange={(text)=>apllyOtherReason(text)} value={otherReason}/>
            </Col>
            </Row>
          </>
        )}
      <label className="sub-title">Description <Popover content={content00}><img src="../Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <TextArea rows={4} placeholder="Add description" onChange={(description)=>apllyDescription(description)} value={description}/>
      {type && type?.toLowerCase() === NEW_PROJECT_TYPES.Maintenance.toLowerCase() && (<><Row gutter={[16, 16]} style={{ marginTop: '-5px' }}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Frequency <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div id="freqid">
            <Select
              placeholder={frequency != '' ? frequency + "" : "Select a Frequency"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onChange={(frequency) => applyFrequency(frequency)}
              getPopupContainer={() => (document.getElementById("freqid") as HTMLElement)}>
              {selec.map((element) => {
                return <Option key={element} value={element}>{element}</Option>
              })}
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Access Control <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <p className="switch-option" style={{ fontSize: '14px' }}>Public Access / Ownership <span>
            <Switch checkedChildren="Yes" unCheckedChildren="No" checked={ownership} onChange={(ownership) => applyOwnership(ownership)} />
          </span></p>
        </Col>
      </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <label className="sub-title">Maintenance Eligibility <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <div id="elegid">
              <Select
                placeholder={eligibility != '' ? MAINTENANCE_ELIGIBILITY.find((el: any) => parseInt(el.id) === parseInt(eligibility))?.name + "" : "Select a Eligibility"}
                style={{ width: '100%' }}
                listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                onChange={(eligibilit) => applyEligibility(eligibilit)}
                getPopupContainer={() => (document.getElementById("elegid") as HTMLElement)}>
                {MAINTENANCE_ELIGIBILITY.map((element) => {
                  return <Option key={element.id} value={element.id}>{element.name}</Option>
                })}
              </Select>
            </div>
          </Col>
        </Row></>)}
    </>
  );
}
