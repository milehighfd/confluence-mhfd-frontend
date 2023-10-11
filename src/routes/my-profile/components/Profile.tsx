import { Button, Col, Dropdown, message, Row, Select, Upload } from "antd";
import { DebounceInput } from "react-debounce-input";
import React, { useCallback, useEffect, useState } from "react";
import { useProfileState, useProfileDispatch } from "hook/profileHook";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { getGroupList } from "routes/portfolio-view/components/ListUtils";
import { useMapDispatch } from 'hook/mapHook';
import SelectOrganization from "routes/Utils/SelectOrganization";
import SelectServiceArea from "routes/Utils/SelectServiceArea";
import SelectZoomArea from "routes/Utils/SelectZoomArea";
import { formatPhoneNumber } from "utils/utils";
import { WINDOW_WIDTH } from "constants/constants";

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
  const [editProfile, setEditProfile] = useState(true);
  const [isFromSave, setIsFromSave] = useState(false);
  
  const { userInformation: user } = useProfileState();
  const { groupOrganization } = useProfileState();
  
  const [countyList, setCountyList] = useState<any[]>([]);
  const [jurisdictionList, setJurisdictionList] = useState<any[]>([]);
  const {
    setCoordinatesJurisdiction
  } = useMapDispatch();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization,setOrganization] = useState('');
  const [city,setCity] = useState('');
  const [county,setCounty] = useState('');
  const [serviceArea,setServiceArea] = useState('');
  const [zoomarea,setZoomArea] = useState('');
  const [disable,setDisable] = useState(false);
  //deferred values
  const {
    replaceAppUser,
    saveUserInformation,   
  } = useProfileDispatch();
  //console.log(useProfileState()) 
  useEffect(() => {
    getMe();
    return () => {
      setCoordinatesJurisdiction([]);
    }
  }, []); 
  useEffect(() => {
    if (!isFromSave) {
      if (user?.business_associate_contact?.business_address?.business_associate?.business_name) {
        setOrganization(user?.business_associate_contact?.business_address?.business_associate?.business_name);
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
    }
  }, [user, isFromSave]);

  useEffect(() => {   
    if (editProfile) {
      setDisable(false);
    } else {
      setDisable(true);      
    }
  }, [editProfile]);
  const [ fileImage, setFileImage ] = useState({ uid: ''});
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
  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  

  const debouncedHandleClick = useCallback(
    debounce(() => {
      datasets.putData(SERVER.USER_UPDATE, {
        email,
        phone,
        organization: user?.organization,
        city,
        county,
        serviceArea,
        zoomarea,
        firstName,
        lastName
      }, datasets.getToken())
        .then(() => {
          setIsFromSave(true);
          getMe();
        })
        .catch((e) => {
          console.log(e);
        });
    }, 1000),
    [email, phone, organization, city, county, serviceArea, zoomarea, firstName, lastName]
  );
  
  useEffect(() => {
    debouncedHandleClick();
  }, [debouncedHandleClick]);

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
  };


  return (
    <div className="profile-myprofile">
      <img src={!user.photo ? "/Icons/AvatarUser.svg" : user.photo} height={90} width="90" style={{ marginBottom: '15px', marginTop: '50px' , borderRadius: '50%'}} />
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
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>First Name</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            {editProfile ?
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                onChange={(e: any) => setFirstName(e.target.value)}
                type="text"
                className="input-profile"
                value={isNull(firstName)}
              />
              :<p style={{paddingBottom:'10px' }}>{isNull(firstName)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Last Name</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            {editProfile ?
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                onChange={(e: any) => setLastName(e.target.value)}
                type="text"
                className="input-profile"
                value={isNull(lastName)}
              />
              :<p style={{paddingBottom:'10px' }}>{isNull(lastName)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Email</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            {editProfile ?
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                onChange={(e: any) => setEmail(e.target.value)}
                type="text"
                className="input-profile"
                value={isNull(email)}
              />
              :<p style={{paddingBottom:'10px' }}>{isNull(email)}</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Phone</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            {editProfile ?
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                onChange={(e: any) => setPhone(formatPhoneNumber(e.target.value))}
                type="text"
                className="input-profile"
                value={isNull(formatPhoneNumber(phone))}
              />
              :<p style={{paddingBottom:'10px' }}>{isNull(formatPhoneNumber(phone))}</p>
            }
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 10 }}>
            <p className="color-sub" style={{ paddingBottom: '10px' }}>Business Associate</p>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          {editProfile ?
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                onChange={(e: any) => setOrganization(e.target.value)}
                type="text"
                className="input-profile"
                value={isNull(organization)}
                disabled={true}
                style={{cursor: 'not-allowed'}}
              />
              :<p style={{paddingBottom:'10px' }}>{isNull(organization)}</p>
            }            
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>Local Government</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            <Select
              onChange={(value) => setCity(value)}
              disabled={disable}
              value={isNull(city)}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              options={jurisdictionList}
              style={{ width: '100%', marginBottom:'15px', borderRadius:'25px' }}
              getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option >{isNull(city)}</Option>             
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>County</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
            <Select
              onChange={(value) => setCounty(value)}
              disabled={disable}
              options={countyList}
              listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
              value={isNull(county)}
              style={{ width: '100%', marginBottom:'15px', borderRadius:'25px'  }}
              getPopupContainer={(trigger:any) => trigger.parentNode}>
              <Option value="Douglas">{isNull(county)}</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Service Area</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
          <SelectServiceArea
              serviceArea={serviceArea}
              setServiceArea={setServiceArea}
              disable={disable}
              defaultValue={serviceArea}
              value={serviceArea}/>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 10 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Default Map</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 14 }}>
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
      </div>
    </div>
  )
};

export default Profile;
