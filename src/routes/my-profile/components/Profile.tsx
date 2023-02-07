import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState, useProfileDispatch } from "hook/profileHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { useAppUserDispatch } from "hook/useAppUser";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
import { useMapDispatch } from 'hook/mapHook';
import SelectOrganization from "routes/Utils/SelectOrganization";
import SelectServiceArea from "routes/Utils/SelectServiceArea";

const STATUS = 'status', JURISDICTION = 'jurisdiction',
COUNTY = 'county', SERVICE_AREA = 'servicearea', CONSULTANT = 'consultant',
CONTRACTOR = 'contractor', STREAMS = 'streams';
const { Option } = Select;
const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const {getGroupOrganization} = useProfileDispatch();
  const { userInformation: user } = useProfileState();
  const { groupOrganization } = useProfileState();
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.map((item: any) => {
    return { key: item.id + item.name, value: item.name, label: item.name }
  }));
  const [countyList, setCountyList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);
  
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [organization,setOrganization] = useState('');
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
  const [counterProjects, setCounterProjects] = useState(0);
  //console.log(useProfileState())
  useEffect(() => {
    console.log("fjjghghj")
    getGroupOrganization();   
  }, []);
  useEffect(() => {    
    console.log(groupOrganization)
    setDataAutocomplete(groupOrganization.map((item: any) => {
      return { key: item.id + item.name, value: item.name, label: item.name }
    }));   
  }, [groupOrganization]);
  useEffect(() => {
    if (user.organization) {
      setOrganization(user.organization);
    }    
  }, [user]);

  useEffect(() => {   
    if (editProfile) {
      setDisable(false);
    } else {
      setDisable(true);      
    }
  }, [editProfile]);


  
  useEffect(() => {

    datasets.getData(`${SERVER.COUNT_FAVORITES}`,datasets.getToken())
      .then((rows) => {
        setCounterProjects(rows.count)
      })
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        setCountyList(rows.county.map((item: any) => {
          return { key: item.state_county_id , value : item.county_name, label : item.county_name }
        }).filter((data:any)=>!!data.value));
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
          return { key: item.code_local_government_id , value: item.local_government_name, label : item.local_government_name }
        }).filter((data:any)=>!!data.value));     
        
      })
      .catch((e) => {
        console.log(e);
      })             
  }, []);


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
      //console.log("ENTER EDIT")
    } else {
      //console.log("Upload data");
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
        //console.log(data);
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
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>{counterProjects}</h2>
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
            <SelectOrganization
              organization={organization}
              setOrganization={setOrganization}
              disable={disable}
              defaultValue={organization}
              value={organization}/>
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
          <SelectServiceArea
              serviceArea={serviceArea}
              setServiceArea={setServiceArea}
              disable={disable}
              defaultValue={serviceArea}
              value={serviceArea}/>
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