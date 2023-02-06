import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState } from "hook/profileHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";


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
  const [phone, setPhone] = useState(user.phone);
  const [organization,setOrganization] = useState(user.organization);
  const [city,setCity] = useState(user.city);
  const [county,setCounty] = useState(user.county);
  const [serviceArea,setServiceArea] = useState(user.serviceArea);
  const [zoomarea,setZoomArea] = useState(user.zoomarea);
  const [disable,setDisable] = useState(false);
  const [user_id,setUser_id] = useState(user.user_id);

  useEffect(() => {
    setDataAutocomplete(groupOrganization.map((item: any) => {
      return { key: item.id + item.name, value: item.name, label: item.name }
    }));
  }, [groupOrganization]);

  useEffect(() => {
    console.log(email)
  }, [email]);

  useEffect(() => {
    console.log(user_id+2);
    if (editProfile) {
      setDisable(false);
    } else {
      setDisable(true);
      console.log("Upload data");      
      datasets.putData(SERVER.USER_UPDATE, {
        email,
        phone,    
        organization,
        city,
        county,
        serviceArea,
        zoomarea    
      }, datasets.getToken()).then((data) => {
        console.log(data);
      })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [editProfile]);
  
  useEffect(() => {
    datasets.getData(`${SERVER.ALL_GROUP_ORGANIZATION}`)
      .then((rows) => {
        console.log(rows.county);
        setCountyList(rows.county.map((item: any) => {
          return { key: item.state_county_id , value : item.county_name, label : item.county_name }
        }));
        setJurisdictionList(rows.jurisdiction.map((item: any) => {
          return { key: item.code_local_government_id , value: item.local_government_name, label : item.local_government_name }
        }));
        setServiceAreaList(rows.servicearea.map((item: any) => {
          return { key: item.code_service_area_id, value: item.service_area_name, label : item.service_area_name }
        }));
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
              <Select onChange={(value) => setOrganization(value)} disabled={disable} defaultValue="MHFD District Boundary" style={{ width: '100%', marginBottom: '20px' }} getPopupContainer={(trigger: any) => trigger.parentNode}>
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
          <Button style={{width:'100%'}} className="btn-purple" onClick={()=>{setEditProfile(!editProfile)}}>{editProfile ? 'Save':'Edit Profile'}</Button>
        </div>
      </div>
    </div>
  )
};

export default Profile;