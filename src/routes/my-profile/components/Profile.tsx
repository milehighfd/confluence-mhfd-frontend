import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState } from "hook/profileHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { useAppUserDispatch } from "hook/useAppUser";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";

const STATUS = 'status', JURISDICTION = 'jurisdiction',
COUNTY = 'county', SERVICE_AREA = 'servicearea', CONSULTANT = 'consultant',
CONTRACTOR = 'contractor', STREAMS = 'streams';
const { Option } = Select;
const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { userInformation: user } = useProfileState();
  const { groupOrganization } = useProfileState();
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.map((item: any) => {
    return { key: item.id + item.name, value: item.name, label: item.name }
  }));
  const [countyList, setCountyList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);
  const [serviceAreaList, setServiceAreaList] = useState<any[]>([]);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [organization,setOrganization] = useState(user.organization);
  const [city,setCity] = useState(user.city);
  const [county,setCounty] = useState(user.county);
  const [serviceArea,setServiceArea] = useState(user.serviceArea);
  const [zoomarea,setZoomArea] = useState(user.zoomarea);
  const [disable,setDisable] = useState(false);
  const [save,setsave] = useState(false);
  const {
    replaceAppUser,
    saveUserInformation,   
  } = useAppUserDispatch();
  const [consultantList, setConsultantList] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const [optionCounty, setOptionCounty] = useState({})
  const [optionJurisdiction, setOptionJurisdiction] = useState({})
  const [optionConsultant, setOptionConsultant] = useState({})
  const [optionContractor, setOptionContractor] = useState({})

  useEffect(() => {
    setDataAutocomplete(groupOrganization.map((item: any) => {
      return { key: item.id + item.name, value: item.name, label: item.name }
    }));
  }, [groupOrganization]);

  
  useEffect(() => {   
    if (editProfile) {
      setDisable(false);
    } else {
      setDisable(true);      
    }
  }, [editProfile]);


  
  useEffect(() => {
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setCountyList(rows.county.map((item: any) => {
          return { key: item.state_county_id , value : item.county_name, label : item.county_name }
        }).filter((data:any)=>!!data.value));
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
          return { key: item.code_local_government_id , value: item.local_government_name, label : item.local_government_name }
        }).filter((data:any)=>!!data.value));
        setServiceAreaList(rows.servicearea.map((item: any) => {
          return { key: item.code_service_area_id, value: item.service_area_name, label : item.service_area_name }
        }).filter((data:any)=>!!data.value));
        getGroupList(CONSULTANT).then((valuesGroups) => {
          const groups = valuesGroups.groups;
          setConsultantList(groups.map((item: any) => {
            return { key: item.id, value: item.name, label : item.name }
          }).filter((data:any)=>!!data.value));
        });
        getGroupList(CONTRACTOR).then((valuesGroups) => {
          const groups = valuesGroups.groups; 
          setContractorList(groups.map((item: any) => { 
            return { key: item.id, value: item.name, label : item.name } 
          }).filter((data:any)=>!!data.value));
        });        
        
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);

  useEffect(() => {   
    let userTestStatus: { label:string, options: Array<{key: number, value: string , label : string}> }[] = [
      {label:"Jurisdiction",options:jurisdictionList}      
    ];
    const jurisdiction = {label : "Jurisdiction",options:jurisdictionList}
    const county = {label : "County" , options:countyList }
    const consultant = {label:"Consultant",options:consultantList}
    const contractor = {label:"Contractor",options:contractorList}
    setOptionCounty(county);
    setOptionJurisdiction(jurisdiction);
    setOptionConsultant(consultant);
    setOptionContractor(contractor);
    console.log(userTestStatus)
    console.log(contractor)
  }, [jurisdictionList,countyList,consultantList,contractorList]);

  function isNull(text: string) {
    if(!text){
      return ("-")
    }else{
      return (text)
    }
  } 

  const handleClick = () => {
    setEditProfile(!editProfile)
    if (!save) {
      setsave(!save)
      console.log("ENTER EDIT")
    } else {
      console.log("Upload data");
      datasets.putData(SERVER.USER_UPDATE, {
        email,
        phone,
        organization,
        city,
        county,
        serviceArea,
        zoomarea,
        firstName,
        lastName
      }, datasets.getToken()).then((data) => {
        console.log(data);
      }).then(() => {
        setsave(!save)
        console.log("EXIT EDIT")
        datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
          replaceAppUser(result);
          saveUserInformation(result)
        });
      })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="profile-myprofile">
      <img src="/picture/user.png" height={90} width="90" style={{marginBottom:'15px', marginTop:'50px'}}/>
      <h1>{isNull (user.firstName) + "  " + isNull (user.lastName)}</h1>
      <p style={{marginBottom:'30px'}} className="color-sub sub-title">{isNull (user.title)}</p>
      <div style={{margin:'0px'}} className="line-01"></div>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>82</h2>
          <p className="color-sub">Action Items</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>12</h2>
          <p className="color-sub">Projects</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>20</h2>
          <p className="color-sub">Problems</p>
        </Col>
      </Row>
      <div style={{margin:'0px'}} className="line-01"></div>
      <div style={{textAlign:'initial', padding:'10px', marginTop:'10px'}} className="profile">
        <Row >
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>First Name</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input onChange={(e) => setFirstName(e.target.value)} className="input-profile" type="text" placeholder={isNull(firstName)} style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>{isNull(firstName)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Last Name</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input onChange={(e) => setLastName(e.target.value)} className="input-profile" type="text" placeholder={isNull(lastName)} style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>{isNull(lastName)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Email</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input onChange={(e) => setEmail(e.target.value)} className="input-profile" type="text" placeholder={isNull(email)} style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>{isNull(email)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Phone</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input onChange={(e) => setPhone(e.target.value)} className="input-profile" type="text" placeholder={isNull(phone)} style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>{isNull(phone)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Organization</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>           
              <Select  onChange={(value) => setOrganization(value)} disabled={disable} options={[optionCounty,optionJurisdiction,optionConsultant,optionContractor]} defaultValue="MHFD District Boundary" style={{ width: '100%', marginBottom: '20px' }} getPopupContainer={(trigger: any) => trigger.parentNode}>
                <Option value="MHFD District Boundary">{isNull(organization)}</Option>
              </Select>              
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>Jurisdiction</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select onChange={(value) => setCity(value)} disabled={disable} value={isNull(city)} options={jurisdictionList}  style={{ width: '100%', marginBottom:'15px', borderRadius:'25px' }} getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option >{isNull(city)}</Option>             
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>County</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select onChange={(value) => setCounty(value)} disabled={disable} options={countyList} value={isNull(county)} style={{ width: '100%', marginBottom:'15px'  }} getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option value="Douglas">{isNull(county)}</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Service Area</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select onChange={(value) => setServiceArea(value)} disabled={disable} options={serviceAreaList} value={isNull(serviceArea)} style={{ width: '100%', marginBottom:'20px'  }} getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option value="South">{isNull(serviceArea)}</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Default Map</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {/* {editProfile ? */}
            <Select onChange={(value) => setZoomArea(value)} disabled={disable} options={dataAutocomplete} value={isNull(zoomarea)} style={{ width: '100%', marginBottom:'20px'  }} getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option value="Mile High Flood District">{isNull(zoomarea)}</Option>
            </Select>
              {/* :<p style={{paddingBottom:'10px' }}>Mile High Flood District</p> */}
            {/* } */}
          </Col>
        </Row>
        <div className="foot-profile">
          <Button style={{width:'100%'}} className="btn-purple" onClick={handleClick}>{editProfile ? 'Save':'Edit Profile'}</Button>
        </div>
      </div>
    </div>
  )
};

export default Profile;