import React, { useEffect } from "react";
import { Input,  Popover, Select } from 'antd';
import {  MAINTENANCE_ELIGIBILITY, NEW_PROJECT_TYPES,  STUDY_REASON, WINDOW_WIDTH } from "../../../constants/constants";
import { SERVER } from "../../../Config/Server.config";
import * as datasets from "../../../Config/datasets";
import { StudyReason } from "./StudyReason";
import { InformationMaintenance } from "./InformationMaintenance";
import { InformationAcquisition } from "./InformationAcquisition";

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
  applyOwnership,
  progress,
  setProgress,
  purchaseDate,
  setPurchaseDate,
  year,
  index,
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
  applyOwnership?: any,
  progress?: any,
  setProgress?: any,
  purchaseDate?: any,
  setPurchaseDate?: any,
  year?: any,
  index?: any,
}) => {
  const [studyReasons, setStudyReasons] = React.useState<any[]>([]);
  useEffect(() => {
    if(reason && reason === studyReasons.find((x:any)=> 'Other' === x.name)?.id){
      setOtherReason('');
    } else {
      if (reason) setReason(reason)
    }
    if(otherReason) setOtherReason(otherReason);
  }, [reason]);
  
  const applyDescription = (e: any)=>{
    setDescription(e.target.value);
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
  }, [type]);
 
  return (
    <>
      <div className="sub-title-project">
        <h5>{index}. Project Information&nbsp;*</h5>
        <p className="requiered-text"><span className="requiered">*&nbsp;Required</span></p>
      </div>
      <StudyReason
        type={type}
        studyReasons={studyReasons}
        reason={reason}
        setReason={setReason}
        otherReason={otherReason}
        setOtherReason={setOtherReason}
      />
      <label className="sub-title">Description <Popover content={content00}><img src="../Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
      <TextArea rows={4} placeholder="Add description" onChange={(description) => applyDescription(description)} value={description} />
      {type && type?.toLowerCase() === NEW_PROJECT_TYPES.Maintenance.toLowerCase() && (<>
        <InformationMaintenance
          frequency={frequency}
          applyFrequency={applyFrequency}
          ownership={ownership}
          applyOwnership={applyOwnership}
          eligibility={eligibility}
          applyEligibility={applyEligibility}
        />
      </>)}
      {type && type?.toLowerCase() === NEW_PROJECT_TYPES.Acquisition.toLowerCase() && (
        <InformationAcquisition
          progress={progress}
          setProgress={setProgress}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
          year={year}
        />)}
    </>
  );
}
