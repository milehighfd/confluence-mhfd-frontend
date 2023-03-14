import { Button, Col, Dropdown, message, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useProfileState, useProfileDispatch } from "hook/profileHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { useAppUserDispatch } from "hook/useAppUser";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
import { useMapDispatch } from 'hook/mapHook';
import SelectOrganization from "routes/Utils/SelectOrganization";
import SelectServiceArea from "routes/Utils/SelectServiceArea";
import SelectZoomArea from "routes/Utils/SelectZoomArea";

const STATUS = 'status', JURISDICTION = 'jurisdiction',
COUNTY = 'county', SERVICE_AREA = 'servicearea', CONSULTANT = 'consultant',
CONTRACTOR = 'contractor', STREAMS = 'streams';
const { Option } = Select;
const Profile = ({
  counterProjects,
  counterProblems
}: {
  counterProjects: number,
  counterProblems: number,
}) => {
  const [editProfile, setEditProfile] = useState(false);
  
  const { userInformation: user } = useProfileState();
  const { groupOrganization } = useProfileState();
  
  const [countyList, setCountyList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization,setOrganization] = useState('');
  const [city,setCity] = useState('');
  const [county,setCounty] = useState('');
  const [serviceArea,setServiceArea] = useState('');
  const [zoomarea,setZoomArea] = useState('');
  const [contactInfo,setContactInfo] =useState<any>({});
  const [disable,setDisable] = useState(false);
  const [save,setsave] = useState(false);
  const {
    replaceAppUser,
    saveUserInformation,   
  } = useAppUserDispatch();
  //console.log(useProfileState()) 
  useEffect(() => {
    getMe();
  }, []); 
  useEffect(() => {
    setContactInfo(user.business_associate_contact)
    if (user.organization) {
      setOrganization(user.organization);
    }    
    if (user.serviceArea) {
      setServiceArea(user.serviceArea);
    }   
    if (user.zoomarea) {
      setZoomArea(user.zoomarea);
    }
    if (user.email) {
      setEmail(user.email);
    }
    if (user.firstName) {
      setFirstName(user.firstName);
    }
    if (user.lastName) {
      setLastName(user.lastName);
    }
    if (user.phone) {
      setPhone(user.phone);
    }
    if (user.city) {
      setCity(user.city);
    }
    if (user.county) {
      setCounty(user.county);
    }
  }, [user,save]);

  useEffect(() => {   
    if (editProfile) {
      setDisable(false);
    } else {
      setDisable(true);      
    }
  }, [editProfile]);
  const [ fileImage, setFileImage ] = useState({ uid: ''});
  console.log(contactInfo)
  const getMe = () =>{
    datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
      replaceAppUser(result);
      saveUserInformation(result)
    });
  }

  
  useEffect(() => {
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
        getMe();
      })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const uploadImage = (files: Array<any>) => {
    console.log(files)
    const dataForm: FormData = new FormData();
    if (files) {
      for (const file of files) {
        dataForm.append('file', file.originFileObj);
      }
    }
    datasets.postDataMultipart(SERVER.USER_UPLOAD_PHOTO, dataForm, datasets.getToken()).then(user => {      
        console.log("EXITO")
        getMe();      
    })
    
  };


  const beforeUpload = (file: any) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt2M;
  }

  return (
    <div className="profile-myprofile">
      <img src={!user.photo ? "/picture/user-default.svg" : user.photo} height={90} width="90" style={{ marginBottom: '15px', marginTop: '50px' , borderRadius: '50%'}} />
      <div className="profile-change-image">
        <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={({ file }: any) => {
          if (fileImage.uid !== file.uid) {
            setFileImage({...file});
            // spinValue(true);
            uploadImage([{ ...file }]);
          }
        }} >
          <Button type="default" shape="circle" className="btn-edit-00">
            <img src="/Icons/icon-66.svg" alt="" style={{marginTop: '-4px'}} className='img-change'/>
          </Button>
        </Upload>
      </div>
      <h1>{isNull (user.firstName) + "  " + isNull (user.lastName)}</h1>
      <p style={{marginBottom:'30px'}} className="color-sub sub-title">{isNull (user.title)}</p>
      <div style={{margin:'0px'}} className="line-01"></div>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>-</h2>
          <p className="color-sub">Action Items</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>{counterProjects}</h2>
          <p className="color-sub">Projects</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>{counterProblems}</h2>
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
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>Address Line 1</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.business_address_line_1 || 'N/A'}</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>Address Line 2</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.business_address_line_2 || 'N/A'}</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>City</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.city || 'N/A'}</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>State</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.state || 'N/A'}</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>Zip Code</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.zip || 'N/A'}</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>Organization</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            {/* <SelectOrganization
              organization={organization}
              setOrganization={setOrganization}
              disable={true}
              defaultValue={organization}
              value={organization}/> */}
              <p style={{ paddingBottom: '10px' }}>{contactInfo.business_address?.business_associate?.business_associate_name || 'N/A'}</p>
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
            <SelectZoomArea
              zoomArea={zoomarea}
              setZoomArea={setZoomArea}
              disable={disable}              
              value={zoomarea}/>
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