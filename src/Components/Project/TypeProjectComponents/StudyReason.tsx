import React from "react";
import { Input, Row, Col, Popover, Select } from 'antd';
import {  MAINTENANCE_ELIGIBILITY, NEW_PROJECT_TYPES, WINDOW_WIDTH } from "../../../constants/constants";
import { useProjectState } from "hook/projectHook";

const { TextArea } = Input;
const { Option } = Select;
const content00 = (<div className="popver-info">Please include all known information relating to the origin, purpose, need, and scope of this project. Description is a required field.</div>);
const content01 = (<div className="popver-info"></div>);
const selec = ['None'];
for (var i = 1; i < 13; i++) {
  selec.push('' + i);
}



export const StudyReason = ({
  type,
  studyReasons,
  reason,
  setReason,
  otherReason,
  setOtherReason,
}:{
  type: string | undefined;
  studyReasons: any;
  reason: any;
  setReason: any;
  otherReason: any;
  setOtherReason: any;
}) => {
  const {
    disableFieldsForLG,
  } = useProjectState();
  const applyOtherReason = (e: any)=>{
    if(e.target.value.length <= 100){
      setOtherReason(e.target.value);
    }
  };
  const handleChange = (e: any) => {
    if (e) setReason(e);
  }
  const getValue = (reason: number | undefined) => {
    const found = studyReasons.find((d:any) => d.id === reason);
    if (found) {
      if (found.isSubreason) {
        return studyReasons.find((d:any) => d.name === 'Master plan recomendations are outdated').id;
      } else {
        return reason;
      }
    }
    return null;
  };
  return (<>
    {type && type?.toLowerCase() === NEW_PROJECT_TYPES.Study.toLowerCase() && (
      <>
        <Row gutter={[16, 16]} className="information-description">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: '8px' }}>
            <label className="sub-title">Reason for Study <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <div id="reason">
              <Select
                style={{ width: '100%' }}
                placeholder={"Select a Reason"}
                listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                value={getValue(reason)}
                disabled={disableFieldsForLG}
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
      studyReasons.find((d: any) => d.id === reason)?.isParent ||
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
                  value={studyReasons.filter((x: any) => x.isSubreason).find((d: any) => reason === d.id) ? reason : 'Select a Sub-Reason'}
                  disabled={disableFieldsForLG}
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
    {reason && reason === studyReasons.find((x: any) => 'Other' === x.name)?.id && (
      <>
        <Row gutter={[16, 16]} className="information-description">
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <label className="sub-title">Other reason<Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <TextArea rows={1} placeholder="Add another reason" onChange={(text) => applyOtherReason(text)} value={otherReason} />
          </Col>
        </Row>
      </>
    )}
  </>);
}
