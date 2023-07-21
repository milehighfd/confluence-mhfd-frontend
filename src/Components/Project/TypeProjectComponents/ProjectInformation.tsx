import React, { useEffect } from "react";
import { Input, Row, Col, Popover, Select } from 'antd';
import {  NEW_PROJECT_TYPES,  STUDY_REASON, WINDOW_WIDTH } from "../../../constants/constants";
import { SERVER } from "../../../Config/Server.config";
import * as datasets from "../../../Config/datasets";

const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);

export const ProjectInformation = ({type, description, setDescription, reason, setReason, otherReason, setOtherReason}:
  {type?: string, description: string, setDescription: Function, reason?: number, setReason?: any, otherReason?: any, setOtherReason?: any}) => {
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
    if (type && type === NEW_PROJECT_TYPES.Study) {
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
        {type && type === NEW_PROJECT_TYPES.Study && (
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
    </>
  );
}
