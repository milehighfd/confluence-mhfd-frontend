import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { JURISDICTION, PROJECT_INFORMATION, SERVICE_AREA, SERVICE_AREA_VALUE } from "../../../constants/constants";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import { useProfileState } from '../../../hook/profileHook';


const { TextArea } = Input;
const { Option } = Select;
const content08 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"><b>Sponsor</b> is the Jurisdiction that requested the project.</div>);
const content04 = (<div className="popver-info"><b>Co-Sponsor</b> is any additional Jurisdiction that will be contributing funding to the project.</div>);
export const LocationInformation = ({setServiceArea, setCounty, setJurisdiccion, serviceArea, county, editable, jurisdiccion, setCoSponsor, setSponsor, cosponsor,sponsor }:
  {setServiceArea: Function, setCounty: Function, setJurisdiccion:Function, serviceArea: string, county:string, editable:boolean, jurisdiccion:string, setCoSponsor:Function, setSponsor: Function, cosponsor:any, sponsor:any }) => {
  const {currentServiceAreaCounty} = useProjectState();
  const {groupOrganization} = useProfileState();
  const [sArea, setSArea] = useState(undefined);
  const [sCounty, setSCounty] = useState(undefined);
  const [disable , setdisable ] = useState(!editable);
  
  const apllyServiceArea = (e: any)=>{
    setServiceArea(e);
    setSArea(e);
  };
  const apllyCounty = (e: any)=>{
    setCounty(e);
    setSCounty(e);
  };
  const apllyJuridiccion = (e: any)=>{
    setJurisdiccion(e);
  };
  useEffect(()=>{
    if(editable){
      console.log(currentServiceAreaCounty, "couuuuun")
      if(currentServiceAreaCounty && currentServiceAreaCounty['Service Area']) {
        setSArea(currentServiceAreaCounty['Service Area']);
        setServiceArea(currentServiceAreaCounty['Service Area']);
      }
      if(currentServiceAreaCounty && currentServiceAreaCounty['County']) {
        setSCounty(currentServiceAreaCounty['County']);
        setCounty(currentServiceAreaCounty['County']);
      }
      if(currentServiceAreaCounty && currentServiceAreaCounty['jurisdiction']) {
        setJurisdiccion(currentServiceAreaCounty['jurisdiction']);
      }
    }
  },[currentServiceAreaCounty]);
  return(
    <>
    <h5>4. Location Information <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>    
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Service Area <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select mode="multiple" placeholder={serviceArea.length!=0?serviceArea:"Select a Service Area"} style={{width:'100%'}} onChange={(serviceArea:any)=> setServiceArea(serviceArea)} value={serviceArea}>
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
        <Select mode="multiple" placeholder={county.length!=0?county:"Select a County"} style={{width:'100%'}} value={county} onChange={(county:any)=> apllyCounty(county)} disabled={disable}>
          {PROJECT_INFORMATION.COUNTRY_PROJECT.map((element) =>{
            return <Option key={element} value={element}>{element}</Option>
          })}
        </Select>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Jurisdiccion <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select mode="multiple" placeholder={jurisdiccion.length!=0?jurisdiccion:"Select a Jurisdiccion"} style={{width:'100%'}} value={jurisdiccion} onChange={(jurisdiccion:any)=> setJurisdiccion(jurisdiccion)}>
        {JURISDICTION.map((element:string ) =>{
            return <Option key={element} value={element}>{element}</Option>
          })}
        </Select>
      </Col>
    </Row>
    <br/>
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Sponsor <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select placeholder={sponsor+""}style={{width:'100%'}} >
          <Option value={sponsor+""}>{sponsor+""}</Option>
        </Select>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Potencial Co-Sponsor <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <div className="sponsor-select">
          <Select  mode="multiple" placeholder={cosponsor.length!=0?cosponsor: "Select a Co-Sponsor"} style={{width:'100%'}} onChange={(coSponsor:any)=> setCoSponsor(coSponsor)} value={cosponsor}>
            {groupOrganization.map((element:any) =>{
              if(element.aoi !== sponsor){
                return <Option key={element.aoi} value={element.aoi}>{element.aoi}</Option>
              }
            })}
          </Select>
        </div>
      </Col>
    </Row>
    </>
  );
}
