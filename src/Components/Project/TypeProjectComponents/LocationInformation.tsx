import React, { useState, useEffect } from "react";
import { Input, Row, Col, Popover, Select } from 'antd';
import { JURISDICTION, PROJECT_INFORMATION, SERVICE_AREA, GOVERNMENT_STAFF } from "../../../constants/constants";
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';
import { useProfileState } from '../../../hook/profileHook';

import store from '../../../store';

const { Option } = Select;
const content08 = (<div className="popver-info"></div>);
const content01 = (<div className="popver-info"></div>);
const content02 = (<div className="popver-info"></div>);
const content03 = (<div className="popver-info"><b>Sponsor</b> is the Jurisdiction that requested the project.</div>);
const content04 = (<div className="popver-info"><b>Co-Sponsor</b> is any additional Jurisdiction that will be contributing funding to the project.</div>);
export const LocationInformation = ({
  setServiceArea, setCounty, setjurisdicion, serviceArea, county, editable, jurisdicion, setCoSponsor, setSponsor, cosponsor,sponsor, isEdit
}: {
  setServiceArea: Function,
  setCounty: Function,
  setjurisdicion:Function,
  serviceArea: any,
  county: any,
  editable:boolean,
  jurisdicion: any,
  setCoSponsor:Function,
  setSponsor: any,
  cosponsor:any,
  sponsor:any,
  isEdit: boolean
}) => {
  const {currentServiceAreaCounty, jurisdiction} = useProjectState();
  const {setServiceAreaCounty} = useProjectDispatch();
  const {groupOrganization} = useProfileState();
  const [sArea, setSArea] = useState(undefined);
  const [sCounty, setSCounty] = useState(undefined);
  const [disable , setdisable ] = useState(!editable);
  const user = store.getState().profile.userInformation;

  const officialS_A = SERVICE_AREA.map((elem:any)=> {
    if(elem == 'Boulder Service Area') {
      return 'Boulder Creek Service Area';
    } else {
      return elem;
    }
  }).filter((elem: any) => elem != 'South Platte River Service Area');

  let isLocalGovernment = user.designation === GOVERNMENT_STAFF;
  const apllyServiceArea = (e: any)=>{
    setServiceArea(e);
    setSArea(e);
  };
  const apllyCounty = (e: any)=>{
    setCounty(e);
    setSCounty(e);
  };
  //const apllyJuridiccion = (e: any)=>{
  //   setjurisdicion(e);
  // };
  useEffect(()=>{
    if(!isLocalGovernment && jurisdiction) {
      setSponsor([jurisdiction]);
    }
  },[jurisdiction]);
  useEffect(()=>{
    if(editable){
      if(currentServiceAreaCounty && currentServiceAreaCounty['Service Area']) {
        setSArea(currentServiceAreaCounty['Service Area']);
        let SA = serviceArea;
        currentServiceAreaCounty['Service Area'].map((element:any) => {
          let service = true;
          if(SA) {
            SA.map((data:any) => {
              if(data === element){service = false;}
            });
          }
          if(service){SA = [...SA, element];}
        });
        setServiceArea(SA);
      }
      if(currentServiceAreaCounty && currentServiceAreaCounty['County']) {
        setSCounty(currentServiceAreaCounty['County']);
        let C = county;
        currentServiceAreaCounty['County'].map((element:any) => {
          console.log("element", element);
          if(element == 'Broomfield' || element == 'Denver') {
            element += ' County'
          }
          let service = true;
          if(C) {
            C.map((data:any) => {
              if(data === element){service = false;}
            });
          }
          if(service){C = [...C, element];}
        });
        setCounty(C);
      }
      if(currentServiceAreaCounty && currentServiceAreaCounty['jurisdiction']) {
        console.log("JURISSS", currentServiceAreaCounty['jurisdiction']);
        let J = jurisdicion;
        currentServiceAreaCounty['jurisdiction'].map((element:any) => {

          let service = true;
          if(J){
            J.map((data:any) => {
              if(data === element){service = false;}
            });
          }
          if(service){J = [...J, element];}
        });
        setjurisdicion(J);
      }
    }
  },[currentServiceAreaCounty]);
  useEffect(()=>{
    console.log("serviceArea, county, jurisdicion", typeof serviceArea,"-", typeof county,"-", typeof jurisdicion);
  },[serviceArea, county, jurisdicion]);
  return(
    <>
    <h5>4. Location Information <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Service Area <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <div className="sponsor-select">
          <Select mode="multiple" placeholder={serviceArea?.length!=0?serviceArea:"Select a Service Area"} style={{width:'100%'}} onChange={(serviceArea:any)=> setServiceArea(serviceArea)} value={serviceArea} disabled={disable}>
          {officialS_A.map((element) =>{
              if(element!= 'None'){
                if(element != 'Boulder Service Area'){
                  return <Option key={element} value={element}>{element}</Option>
                }
              }})}
          </Select>
        </div>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">County <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <div className="sponsor-select">
          <Select mode="multiple" placeholder={county?.length!=0?county:"Select a County"} style={{width:'100%'}} value={county} onChange={(county:any)=> apllyCounty(county)} disabled={disable}>
            {PROJECT_INFORMATION.COUNTRY_PROJECT.map((element) =>{
              return <Option key={element} value={element}>{element}</Option>
            })}
          </Select>
        </div>
      </Col>
    </Row>
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Jurisdicion <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <div className="sponsor-select">
          <Select mode="multiple" placeholder={jurisdicion?.length!=0?jurisdicion:"Select a Jurisdicion"} style={{width:'100%'}} value={jurisdicion} onChange={(jurisdicion:any)=> setjurisdicion(jurisdicion)}>
          {JURISDICTION.map((element:string ) =>{
              return <Option key={element} value={element}>{element}</Option>
            })}
          </Select>
        </div>
      </Col>
    </Row>
    <br/>
    <Row gutter={[16, 16]}>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Sponsor <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <Select style={{width:'100%'}} placeholder={sponsor} value={sponsor} disabled={isLocalGovernment} onChange={setSponsor}>
          {
            isLocalGovernment ? (
              <Option value={sponsor+""}>{sponsor+""}</Option>
            ) : (
              JURISDICTION.map((element:string) => {
                return <Option key={element} value={element}>{element}</Option>
              })
            )
          }
        </Select>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <label className="sub-title">Potencial Co-Sponsor <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
        <div className="sponsor-select">
          <Select  mode="multiple" placeholder={cosponsor?.length!=0?cosponsor: "Select a Co-Sponsor"} style={{width:'100%'}} onChange={(coSponsor:any)=> setCoSponsor(coSponsor)} value={cosponsor}>
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
