import React, { useState, useEffect } from "react";
import { Row, Col, Popover, Select } from 'antd';
import '../../../Scss/Components/projects.scss';
import { JURISDICTION, PROJECT_INFORMATION, SERVICE_AREA, GOVERNMENT_STAFF } from "../../../constants/constants";
import { useProjectDispatch, useProjectState } from '../../../hook/projectHook';
import { useProfileState } from '../../../hook/profileHook';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

import store from '../../../store';

const { Option } = Select;
export const LocationInformation = ({
  setServiceArea, setCounty, setjurisdiction, serviceArea, county, editable, jUrisdiction, setCoSponsor, setSponsor, cosponsor, sponsor, isEdit, isCapital, originModal
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
  originModal?: string

}) => {
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

  const { currentServiceAreaCounty, jurisdiction } = useProjectState();
  const { setServiceAreaCounty } = useProjectDispatch();
  const { groupOrganization } = useProfileState();
  const [sArea, setSArea] = useState(undefined);
  const [sCounty, setSCounty] = useState(undefined);
  const [disable, setdisable] = useState(!editable);
  const user = store.getState().profile.userInformation;


  const officialS_A = SERVICE_AREA.map((elem: any) => {
    if (elem == 'Boulder Service Area') {
      return 'Boulder Creek Service Area';
    } else {
      return elem;
    }
  }).filter((elem: any) => elem != 'South Platte River Service Area');
  const [localities, setLocalities] = useState<any[]>([]);


  let isLocalGovernment = user.designation === GOVERNMENT_STAFF;

  const apllyCounty = (e: any) => {
    setCounty(e);
    setSCounty(e);
  };

  useEffect(() => {
    datasets.getData(`${SERVER.URL_BASE}/locality/WORK_REQUEST`)
      .then((rows) => {
        const localitiesData = rows.localities.map((l: any) => l.name);
        localitiesData.push(localitiesData.splice(localitiesData.indexOf('MHFD District Work Plan'), 1)[0]);
        setLocalities(localitiesData);
      }).catch((e) => {
        console.log(e);
      })

    return () => {
      setServiceAreaCounty({});
    }
  }, []);

  useEffect(() => {
    if (!isLocalGovernment && jurisdiction && !isEdit) {
      // setSponsor([jurisdiction]);
    }
  }, [jurisdiction]);
  useEffect(() => {
    console.log('HERE IS THE VALUE ', currentServiceAreaCounty);
    if (editable) {
      if (currentServiceAreaCounty && currentServiceAreaCounty['Service Area']) {
        setSArea(currentServiceAreaCounty['Service Area']);
        let SA = serviceArea;
        currentServiceAreaCounty['Service Area'].map((element: any) => {
          let service = true;
          // if (element.includes('Service Area')) {
          //   element = element.replace(' Service Area', '');
          // }
          if (SA) {
            SA.map((data: any) => {
              if (element.includes(data)) { service = false; }
            });
          }
          if (service) { SA = [...SA, element]; }
        });
        setServiceArea(SA);
      }
      if (currentServiceAreaCounty && currentServiceAreaCounty['County']) {
        setSCounty(currentServiceAreaCounty['County']);
        let C = county;
        currentServiceAreaCounty['County'].map((element: any) => {
          // if (element.includes('County')) {
          //   element = element.replace(' County', '');
          // }
          let service = true;
          if (C) {
            C.map((data: any) => {
              if (element.includes(data)) { service = false; }
            });
          }
          if (service) { C = [...C, element]; }
        });
        setCounty(C);
      }
      if (currentServiceAreaCounty && currentServiceAreaCounty['jurisdiction']) {
        let J = jUrisdiction;
        currentServiceAreaCounty['jurisdiction'].map((element: any) => {

          let service = true;
          if (J) {
            J.map((data: any) => {
              if (data === element) { service = false; }
            });
          }
          if (service) { J = [...J, element]; }
        });
        setjurisdiction(J);
      }
    }
  }, [currentServiceAreaCounty]);

  return (
    <>
      <h5>{isCapital ? '5.' : '3.'} Location Information <Popover content={contentLocInf}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Service Area <Popover content={contentSerAre}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div className="sponsor-select" id="serviceid">
            <Select mode="multiple" placeholder={serviceArea?.length !== 0 ? serviceArea : "Select a Service Area"} style={{ width: '100%' }} onChange={(serviceArea: any) => setServiceArea(serviceArea)} value={serviceArea} disabled={disable} getPopupContainer={() => (document.getElementById("serviceid") as HTMLElement)}>
              {officialS_A.map((element) => {
                if (element != 'None') {
                  if (element != 'Boulder Service Area') {
                    return <Option key={element} value={element}>{element}</Option>
                  }
                }
              })}
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">County <Popover content={contentCounty}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div className="sponsor-select" id="countyid">
            <Select mode="multiple" placeholder={county?.length !== 0 ? county : "Select a County"} style={{ width: '100%' }} value={county} onChange={(county: any) => apllyCounty(county)} disabled={disable} getPopupContainer={() => (document.getElementById("countyid") as HTMLElement)}>
              {PROJECT_INFORMATION.COUNTRY_PROJECT.map((element) => {
                return <Option key={element} value={element}>{element}</Option>
              })}
            </Select>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop:'10px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Jurisdiction <Popover content={contentJuris}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div className="sponsor-select" id="jurisdictionid">
            <Select mode="multiple" placeholder={jUrisdiction?.length != 0 ? jUrisdiction : "Select a Jurisdiction"} style={{ width: '100%' }} value={jUrisdiction} onChange={(jUrisdiction: any) => setjurisdiction(jUrisdiction)} getPopupContainer={() => (document.getElementById("jurisdictionid") as HTMLElement)} >
              {JURISDICTION.map((element: string) => {
                return <Option key={element} value={element}>{element}</Option>
              })}
            </Select>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop:'10px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Sponsor <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div id="sponsorid">
            <Select style={{ width: '100%' }} placeholder={sponsor !== 'Select a Sponsor' ? sponsor: 'Select a Sponsor'} value={sponsor} disabled={isLocalGovernment || isEdit} onChange={setSponsor} getPopupContainer={() => (document.getElementById("sponsorid") as HTMLElement)}>
              {
                isLocalGovernment ? (
                  <Option value={sponsor + ""}>{sponsor + ""}</Option>
                ) : (
                  localities.map((element: string) => {
                    return <Option key={element} value={element}>{element}</Option>
                  })
                )
              }
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <label className="sub-title">Potential Co-Sponsor <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
          <div className="sponsor-select" id="cosponsorid">
            <Select mode="multiple" placeholder={cosponsor?.length != 0 ? cosponsor : "Select a Co-Sponsor"} style={{ width: '100%' }} onChange={(coSponsor: any) => setCoSponsor(coSponsor)} value={cosponsor} getPopupContainer={() => (document.getElementById("cosponsorid") as HTMLElement)}>
              {localities.map((element: string) => {
                return <Option key={element} value={element}>{element}</Option>
              })}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
}
