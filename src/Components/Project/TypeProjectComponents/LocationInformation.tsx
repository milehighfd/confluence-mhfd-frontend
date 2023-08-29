import React, { useState, useEffect } from "react";
import { Row, Col, Popover, Select } from 'antd';
import '../../../Scss/Components/projects.scss';
import { JURISDICTION, PROJECT_INFORMATION, SERVICE_AREA, GOVERNMENT_STAFF, WINDOW_WIDTH } from "../../../constants/constants";
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

import { useProfileState } from "hook/profileHook";

const { Option } = Select;
export const LocationInformation = ({
  setServiceArea, setCounty, setjurisdiction, serviceArea, county, editable, jUrisdiction, setCoSponsor, setSponsor, cosponsor, sponsor, isEdit, isCapital, originModal,
  isWorkPlan, index
}: {
  setServiceArea: Function,
  setCounty: Function,
  setjurisdiction: Function,
  serviceArea: any,
  county: any,
  editable: boolean,
  jUrisdiction: any,
  setCoSponsor: Function,
  setSponsor: any,
  cosponsor: any,
  sponsor: any,
  isEdit: boolean,
  isCapital?: boolean,
  originModal?: string,
  isWorkPlan?: boolean
  index?: number
}) => {
  const isMaintenance = originModal === 'Maintenance';
  const isStudy = originModal === 'Study';
  const getLabel = () => {
    if (originModal == 'Study') {
      return 'Study'
    }
    if (originModal == 'Acquisition') {
      return 'acquisition'
    }
    return 'project';
  }
  const getLabelCap = () => {
    if (originModal == 'Study') {
      return 'study'
    }
    if (originModal == 'Acquisition') {
      return 'acquisition'
    }
    return 'Project';
  }

  const contentLocInf = (<div className="popver-info">Some Location Information fields are populated automatically when the {getLabelCap()} Location is drawn. Please check them for accuracy and make changes as-necessary.</div>);
  const contentSerAre = (<div className="popver-info">This is the MHFD Service Area where the {getLabel()} is located.</div>);
  const contentCounty = (<div className="popver-info">This is the County or Counties where the {getLabel()} is located.</div>);
  const contentJuris = (<div className="popver-info">This is the Local Government(s) where the {getLabel()} is located.</div>);
  const content03 = (<div className="popver-info">This is the primary local government sponsor that is requesting the project. By default, this attribute matches that of the Work Request. If changed, this project will be sent to the corresponding Work Request.</div>);
  const content04 = (<div className="popver-info">This is a list of all potential local government co-sponsors which might contribute funding or otherwise participate in the {getLabel()}.</div>);

  const { 
  currentServiceAreaCounty,
  disableFieldsForLG,
  } = useProjectState();
  const { setServiceAreaCounty } = useProjectDispatch();
  const [, setSArea] = useState(undefined);
  const [, setSCounty] = useState(undefined);
  const { userInformation: user } = useProfileState();

  //Variables for use in the dropdowns
  const [countyList, setCountyList] = useState<any[]>([]);
  const [serviceAreaList, setServiceAreaList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);


  const officialS_A = SERVICE_AREA.map((elem: any) => {
    if (elem === 'Boulder Service Area') {
      return 'Boulder Creek Service Area';
    } else {
      return elem;
    }
  }).filter((elem: any) => elem !== 'South Platte River Service Area');
  const [localities, setLocalities] = useState<any[]>([]);


  let isLocalGovernment = user.designation === GOVERNMENT_STAFF;

  const apllyCounty = (e: any) => {
    setCounty(e);
    setSCounty(e);
  };
  //fill jurisdiction,service area and county list with db
  useEffect(() => {
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setCountyList(rows.county.map((item: any) => {
          return { key: item.state_county_id, value: item.county_name, label: item.county_name }
        }).filter((data: any) => !!data.value));
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
          return { key: item.code_local_government_id, value: item.local_government_name, label: item.local_government_name }
        }).filter((data: any) => !!data.value));
        setServiceAreaList(rows.servicearea.map((item: any) => {
          return { key: item.code_service_area_id, value: item.service_area_name, label: item.service_area_name }
        }).filter((data: any) => !!data.value));
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);

  useEffect(() => {
    datasets.getData(`${SERVER.GET_SPONSOR}`)
      .then((rows) => {
        const sponsor = rows.map((row:any) => row.business_name);
        setLocalities(sponsor);
      }).catch((e) => {
        console.log(e);
    })
    return () => {
      setServiceAreaCounty({});
    }
  }, []);

  useEffect(() => {
    if (editable) {
      if (currentServiceAreaCounty && currentServiceAreaCounty['Service Area']) {
        setSArea(currentServiceAreaCounty['Service Area']);
        let SA = serviceArea;
        currentServiceAreaCounty['Service Area'].forEach((element: any) => {
          let service = true;
          if (SA) {
            SA?.forEach((data: any) => {
              if (element.includes(data)) { service = false; }
            });
          }
          if (service) { SA = [...SA, element]; }
        });
        if(serviceArea.length>0 && originModal !== 'Study'){
          setServiceArea(serviceArea);
        }else{
          setServiceArea(SA);
        }
      }
      if (currentServiceAreaCounty && currentServiceAreaCounty['County']) {
        setSCounty(currentServiceAreaCounty['County']);
        let C = county;
        currentServiceAreaCounty['County'].forEach((element: any) => {
          let service = true;
          if (C) {
            C.forEach((data: any) => {
              if (element.includes(data)) { service = false; }
            });
          }
          if (service) { C = [...C, element]; }
        });
        if(county.length>0 && originModal !== 'Study'){
          setCounty(county);
        }else{
          setCounty(C);
        }
      }
      if (currentServiceAreaCounty && currentServiceAreaCounty['jurisdiction']) {
        let J = jUrisdiction;
        currentServiceAreaCounty['jurisdiction'].forEach((element: any) => {

          let service = true;
          if (J) {
            J.forEach((data: any) => {
              if (data === element) { service = false; }
            });
          }
          if (service) {J = [...J, element]; }
         
        });
        if(jUrisdiction.length>0 && originModal !== 'Study'){
          setjurisdiction(jUrisdiction);
        }
        else{
          setjurisdiction(J);
        }
      }
    }
    
  }, [currentServiceAreaCounty]);

  const filterName = (name: string) => {
    if (name.includes('County')) {
      return name.replace('County', '');
    }
    if (name.includes('Service Area')) {
      return name.replace('Service Area', '');
    }
    return name;
  }
  return (
    <>
    <div className="location-information">
      <div className="sub-title-project">
        <h5 className="location">{index}. LOCATION <Popover content={contentLocInf}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Service Area <Popover content={contentSerAre}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          {(isMaintenance || isStudy) && !isWorkPlan && <>
            <span id="required-location" className="requiered">&nbsp;*&nbsp;</span>
            </>}
          <div className="sponsor-select" id="serviceid">
            <Select
              mode="multiple"
              placeholder={serviceArea?.length !== 0 ? serviceArea : "Select a Service Area"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              onChange={(serviceArea: any) => setServiceArea(serviceArea)}
              value={serviceArea} 
              disabled={disableFieldsForLG}
              getPopupContainer={() => (document.getElementById("serviceid") as HTMLElement)}>
              {serviceAreaList.map((element) => 
                element != 'None' && element != 'Boulder Service Area' && <Option key={element.key} value={element.value}>{filterName(element.label)}</Option>
              )}
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">County <Popover content={contentCounty}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          {(isMaintenance || isStudy) && !isWorkPlan && <>
            <span style={{ color: '#df3232' }} className="requiered">&nbsp;*&nbsp;</span>
            </>}
          <div className="sponsor-select" id="countyid">
            <Select
              mode="multiple"
              placeholder={county?.length !== 0 ? county : "Select a County"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              value={county}
              onChange={(county: any) => apllyCounty(county)}
              disabled={disableFieldsForLG}
              getPopupContainer={() => (document.getElementById("countyid") as HTMLElement)}>
              {countyList.map((element) => {
                return <Option key={element.key} value={element.value}>{filterName(element.label)}</Option>
              })}
            </Select>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop:'10px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Local Government <Popover content={contentJuris}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          {(isMaintenance || isStudy) && !isWorkPlan && <>
            <span id="required-location" className="requiered">&nbsp;*&nbsp;</span>
            </>}
          <div className="sponsor-select" id="jurisdictionid">
            <Select
              mode="multiple"
              placeholder={jUrisdiction?.length != 0 ? jUrisdiction : "Select a Jurisdiction"}
              style={{ width: '100%' }}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              value={jUrisdiction}
              disabled={disableFieldsForLG}
              onChange={(jUrisdiction: any) => setjurisdiction(jUrisdiction)}
              getPopupContainer={() => (document.getElementById("jurisdictionid") as HTMLElement)} >
              {jurisdictionList.map((element) => {
                return <Option key={element.key} value={element.value}>{filterName(element.label)}</Option>
              })}
            </Select>
          </div>
        </Col>
      </Row>      
      </div>
    </>
  );
}
