import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, Layout, Menu, MenuProps, Popover, Radio, Row, Select, Switch, Table, Tabs } from 'antd';
import { useFormik } from 'formik';
import { CITIES, SERVICE_AREA, COUNTIES, RADIO_ITEMS, DROPDOWN_ORGANIZATION, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, OTHER, ADMIN, STAFF, CONSULTANT } from "../../../constants/constants";
import { VALIDATION_USER } from "../../../constants/validation";
import * as datasets from "../../../Config/datasets";
// import RadioItemsView from './RadioItemsView';
// import MenuAreaView from './MenuAreaView';
import { User } from '../../../Classes/TypeList';
import Alert from '../../../Components/Shared/Alert';
import moment from 'moment';
import { useProfileDispatch, useProfileState } from '../../../hook/profileHook';
import { SERVER } from "Config/Server.config";
import RadioItemsView from "Components/User/UserComponents/RadioItemsView";
import RadioDesignation from "./RadioDesignation";
import { DownOutlined } from "@ant-design/icons";
import MenuAreaView from "Components/User/UserComponents/MenuAreaView";
import SelectOrganization from "routes/Utils/SelectOrganization";
import SelectZoomArea from "routes/Utils/SelectZoomArea";
import SelectServiceArea from "routes/Utils/SelectServiceArea";
import TextArea from "antd/lib/input/TextArea";
import { BusinessAssociatesDropdownMemoized } from './BusinessAssociateDropdown';

const { Option } = Select;
const ProfileUser = ({ record, saveUser, deleteUser, type, deleteUserDatabase }: { record: User, saveUser: Function, deleteUser: Function, type: string, deleteUserDatabase: Function }) => {
  
  const [organization,setOrganization] = useState('');
  const [zoomarea,setZoomArea] = useState('');
  const [serviceArea,setServiceArea] = useState('');
  const { groupOrganization } = useProfileState();
  const [saveAlert, setSaveAlert] = useState(false);
  const validationSchema = VALIDATION_USER;
  const { Panel } = Collapse;
  
  const visible = {
    visible: false
  };
  const [organizationList, setOrganizationList] = useState<any[]>([]);
  const [consultantList, setConsultantList] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [selectAssociate, setSelectAssociate] = useState(-1);
  const [selectContact, setSelectContact] = useState(-1);
  const [associateLabel, setAssociateLabel] = useState<any> ('');
  const [contactData, setContactData] = useState<any> ({});
  const [primary, setPrimary] = useState(-1);
  const [addressLine1, setAdressLine1] = useState('');
  const [addressLine2, setAdressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('');
  const [contactId,setContactId] = useState('');

  //console.log('itemsZoomtoarea', itemsZoomtoarea)
  

  const menuContactAssociate = () => {
    const itemMenu: MenuProps['items'] = [];
    let dataMenu: any[] = [];
    const generateItemMenu = (content: Array<any>) => {
      content.forEach((element, index: number) => {
        if (element.key === primary) {          
          itemMenu.push({
            key: element.key,
            label: <span style={{ border: 'transparent' }}>{element.label + ' (primary)'}</span>
          });
          dataMenu.push({
            ...element
          });

        }
      });
      content.forEach((element, index: number) => {
        if (element.key !== primary) {
          itemMenu.push({
            key: element.key,
            label: <span style={{ border: 'transparent' }}>{element.label}</span>
          });
          dataMenu.push({
            ...element
          });
        }
      });
      itemMenu.push({
        key: 'Create_1',
        label: <span style={{ border: 'transparent' }}>{'Create Contact'}</span>
      });
    };
    generateItemMenu(listContacts);
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {     
        console.log((dataMenu.find((elm) => +elm.key === +event.key)))         
        if (event.key === 'Create_1') {
          setDisabled(false)
          setContactData({})
          setZip('')
          setCity('')
          setAdressLine1('')
          setAdressLine2('')
          setState('')
        } else {
          setContactId((dataMenu.find((elm) => +elm.key === +event.key)).key)
          setContactData(((dataMenu.find((elm) => +elm.key === +event.key))))
          setZip(((dataMenu.find((elm) => +elm.key === +event.key)).zip))
          setCity((dataMenu.find((elm) => +elm.key === +event.key)).city)
          setAdressLine1((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_1)
          setAdressLine2((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_2)
          setState((dataMenu.find((elm) => +elm.key === +event.key)).state)
          setDisabled(true)
        }
      }}>
    </Menu>
  };

  const [modal, setModal] = useState(visible);
  const [, setSwitchTo] = useState<boolean>(record.activated);
  const [designation, setDesignation] = useState<string>(record.designation);
  const [initialValues, setInitialValues] = useState<any>(record);
  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });
  const [businessAssociate, setBusinessAssociate] = useState<any>([]); 
  const [listAssociates, setListAssociates] = useState<any>([]); 
  const [listContacts, setListContacts] = useState<any>([]); 

  useEffect(() => {   
    console.log('entrando');
    const auxUser:any = { ...record };
    setInitialValues(auxUser);
    values.user_id = record.user_id;
    values.firstName = record.firstName;
    values.lastName = record.lastName;
    values.activated = record.activated;
    values.zoomarea = record.zoomarea;
    values.name = record.name;
    values.designation = record.designation;
    values.email = record.email;
    values.city = record.city;
    values.county = record.county;
    values.serviceArea = record.serviceArea;
    values.phone = record.phone;
    values.title = record.title;
    values.status = record.status;
    values.createdAt = record.createdAt;   
    setFirstName(record.firstName);
    setLastName(record.lastName);
    setDesignation(record.designation);
    setEmail(record.email);
    setCity(record.city);
    setCounty(record.county);
    setPhone(record.phone);
    setTitle(record.title);
    setOrganization (record.organization);
    setZoomArea(record.zoomarea);
    setServiceArea(record.serviceArea);
    setAssociateLabel(auxUser?.business_associate_contact.business_address.business_associate.business_name)
    console.log('RECORD')
    console.log(auxUser?.business_associate_contact.business_address.business_associate.business_name)
    // setAdressLine1(record?.business_associate_contact?.business_address?.business_address_line_1);
  }, [record]);

  useEffect(() => {
    datasets.getData(SERVER.BUSINESS_ASSOCIATES).then(res => {
      const businessAssociates = res.map((x: any) => {
        return ({ label: x.business_name, key: x.business_associates_id, primary_business_associate_contact_id: x.primary_business_associate_contact_id })
      })
      setBusinessAssociate(businessAssociates)
      setListAssociates(res)
    });
  }, []);
  useEffect(() => {
    if (Object.keys(listAssociates).length > 0) {
      const associates = listAssociates.find((f:any)=> +f.business_associates_id === +selectAssociate)
      let aux: any[] = [];
      associates?.business_addresses?.forEach((ba: any) => {
        aux = [...aux, ...ba.business_associate_contacts.map((contact: any) => {
          return {
            business_address_id: ba.business_address_id,
            business_address_line_1: ba.business_address_line_1,
            business_address_line_2: ba.business_address_line_2,
            city: ba.city,
            state: ba.state,
            zip: ba.zip,
            key: contact.business_associate_contact_id,
            label: contact.contact_name
          }
        })];
      });
      setListContacts(aux);
    }
  }, [selectAssociate]);

  useEffect(() => {      
    const auxUser = { ...record };
    setInitialValues(auxUser);    
    values.zoomarea = zoomarea;    
    values.serviceArea = serviceArea;
    values.organization = organization;
  }, [organization,zoomarea,serviceArea]);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values: any) {
      
      values.designation = designation;
      const auxState = { ...visible };
      auxState.visible = true;
      setModal(auxState);
    }
  });
  const handleChangeData = (value : any, setValue?: any) => {
    console.log('here');
    setValue(value)
  }


  const updateSuccessful = () => {
    const auxMessageError = { ...messageError };
    auxMessageError.message = 'Updating record data was successful';
    auxMessageError.color = '#28C499';
    setMessageError(auxMessageError);
    const timer = setTimeout(() => {
      const auxMessageError = { ...messageError };
      auxMessageError.message = '';
      auxMessageError.color = '#28C499';
      setMessageError(auxMessageError);
    }, 5000);
    return () => clearTimeout(timer);
  }

  const updateError = (error: string) => {
    const auxMessageError = { ...messageError };
    auxMessageError.message = error;
    auxMessageError.color = 'red';
    setMessageError(auxMessageError);
    const timer = setTimeout(() => {
      const auxMessageError = { ...messageError };
      auxMessageError.message = '';
      auxMessageError.color = '#28C499';
      setMessageError(auxMessageError);
    }, 10000);
    return () => clearTimeout(timer);
  }
  const result = () => {
    const auxState = { ...visible };
    auxState.visible = false;
    setModal(auxState);
    const newUser: any = {
      firstName,
      lastName,
      email,
      title,
      phone,
      designation,
      organization,
      serviceArea,
      county,
      city,
      zoomarea,
      business_associate_contact_id: +contactId
    };
    if (!disabled) {
      datasets.postData(SERVER.SAVE_BUSINESS_ADRESS_AND_CONTACT(selectAssociate), {
        business_address_line_1: addressLine1,
        business_address_line_2: addressLine2,
        full_address: addressLine1,
        state,
        city,
        zip,
        name: firstName + ' ' + lastName,
        email: email
      }, datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +res?.businessContact?.businessContact?.business_associate_contact_id;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          console.log('my res ', res);  
          if (res.message === 'SUCCESS') {        
            saveUser();
            updateSuccessful();
          } else {
            if (res?.error) {
              updateError(res.error);
            }
            else {
              updateError(res);
            }
          }
        });
      });
    } else {
      datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => {   
        if (res.message === 'SUCCESS') {        
          saveUser();
          updateSuccessful();
        } else {
          if (res?.error) {
            updateError(res.error);
          }
          else {
            updateError(res);
          }
        }
      });
    }
    setSaveAlert(false)
  }
  const message = 'Are you sure you want to update the record ' + values.firstName + ' ' + values.lastName + '?';
  const handleSwitchButton = (checked: boolean) => {
    setSwitchTo(checked);
    setTitle(record.user_id);
    deleteUser(record.user_id + type);
  }

  //console.log(MenuAreaView(CITIES, 'city', values, setTitle));
  return (
    <>
    <Alert save={result} visible={{visible:saveAlert}} setVisible={setSaveAlert} message={message}/>
      <div className="profile-user">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 2 }} style={{ paddingRight: '20px' }}>
            <h3>PROFILE</h3>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 22 }} style={{ paddingRight: '20px' }}>
            <div className="line-01"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
            <h1>FIRST NAME</h1>
            <Input
              placeholder="First Name"
              value={firstName}
              name="firstName"
              onChange={(e) => {handleChangeData(e.target.value, setFirstName)}}
              style={{marginBottom: '15px'}}
            />
            <h1>EMAIL</h1>
            <Input
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => {handleChangeData(e.target.value, setEmail)}}
              style={{marginBottom: '15px'}}
            />
            {/* <h1>PHONE NUMBER</h1>
            <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange} /> */}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
            <h1>LAST NAME</h1>
            <Input
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={(e) => {handleChangeData(e.target.value, setLastName)}}
              style={{marginBottom: '15px'}}
            />
            <h1>TITLE</h1>
            <Input
              placeholder="Title"
              value={title}
              name="title"
              onChange={(e) => {handleChangeData(e.target.value, setTitle)}}
              style={{marginBottom: '15px'}}
            />
            {/* <h1>ORGANIZATIONS</h1> */}
            {/* TODO: change data dropdown */}            
            {/* <SelectOrganization
              organization={organization}
              setOrganization={setOrganization}
              defaultValue={organization}
              value={organization}/> */}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <h1>PHONE NUMBER</h1>
            <Input
              placeholder="Phone"
              value={phone}
              name="phone"
              onChange={(e) => {handleChangeData(e.target.value, setPhone)}}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ paddingRight: '20px' }}>
            <h3>USER DESIGNATION</h3>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 20 }} style={{ paddingRight: '20px' }}>
            <div className="line-01"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
          <Row>
            <Radio.Group
              name="designation"
              value={designation}
              onChange={event => {
                values.designation = event.target.value;
                setDesignation(event.target.value);
              }}
              // style={{ display: 'inline-flex', width: '100%', alignSelf: 'stretch' }}
            >
              <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ paddingRight: '20px'}}>
                {RADIO_ITEMS.map((item: { value: string; name: string }, index: number) => {
                  //console.log('indexx', index);
                  if (index < 3) {
                  }
                  return <RadioDesignation key={item.name} index={index} value={item.value} name={item.name}/>;
                })}
              </Col>
            </Radio.Group>
            {/* <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingRight:'20px', display:'flex'}}>
            <Col xs={{ span: 24}} lg={{ span: 12 }} style={{paddingRight:'20px'}}>
              <Radio style={{marginBottom: '10px'}} >MHFD Senior Manager</Radio><br />
              <Radio style={{marginBottom: '10px'}}>MHFD Staff</Radio><br />
              <Radio style={{marginBottom: '10px'}}>Local Government</Radio>
            </Col>
            <Col xs={{ span: 24}} lg={{ span: 12 }} style={{paddingLeft:'20px'}}>
              <Radio style={{marginBottom: '10px'}}>Consultant / Contractor</Radio><br />
              <Radio style={{marginBottom: '10px'}}>Other</Radio>
            </Col>
          </Col> */}
          </Row>
          </Col>
          </Row>
        <br />
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 4 }} style={{ paddingRight: '20px' }}>
            <h3>ORGANIZATION</h3>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 20 }} style={{ paddingRight: '20px' }}>
            <div className="line-01"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
            <div className="gutter-row" id={("city" + values.user_id)}>
              <p>ORGANIZATION</p>
              <Input placeholder="Enter Organization" value={values.organization} name="organization" onChange={handleChange} style={{marginBottom:'15px'}}/>
            </div>
            <div className="gutter-row"  id={("ba" + values.user_id)}>
              <p>BUSINESS ASSOCIATE</p>
              <BusinessAssociatesDropdownMemoized 
                businessAssociate={businessAssociate}
                setAssociateLabel={setAssociateLabel}
                setPrimary={setPrimary}
                setSelectAssociate={setSelectAssociate}
                associateLabel={associateLabel}
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
            <div className="gutter-row" id={("design" + values.user_id)} style={{opacity:'0'}}>
              <p>FIELD FOR DESIGN</p>
              <Input placeholder="Enter Organization" style={{marginBottom:'15px', cursor: 'auto'}} disabled={true}/>
            </div>
            <div className="gutter-row"  id={("poc" + values.user_id)}>
              <p>POINT OF CONTACT</p>
              <Dropdown trigger={['click']} overlay={menuContactAssociate}
                getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                <Button className="btn-borde-management">
                  {Object.keys(contactData).length > 0? contactData.label : 'Select Contact'}  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Col>
          {
            !disabled &&
            <>
            <Col xs={{ span: 24 }} lg={{ span: 18 }} style={{ paddingRight: '0px' }}>
            <h1>ADDRESS LINE 1</h1>
            <Input
              placeholder="Address Line 1"
              value={(addressLine1 === '' && disabled ? (addressLine1 !== '' ? addressLine1 : values.business_associate_contact?.business_address?.business_address_line_1) : addressLine1)}
              name="address_line_1"
              onChange = {(e) => {handleChangeData(e.target.value, setAdressLine1)}}
              disabled={disabled}
            />
            <h1>ADDRESS LINE 2</h1>
            <Input
              placeholder="Address Line 2"
              value={(addressLine2 === '' && disabled ? (addressLine2 !== '' ? addressLine2 : values.business_associate_contact?.business_address?.business_address_line_2) : addressLine2)} 
              name="address_line_1" 
              onChange= {(e) => {handleChangeData(e.target.value, setAdressLine2)}}
              disabled = {disabled}
            />
            {/* <h1>PHONE NUMBER</h1>
            <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange} /> */}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
            <h1>CITY</h1>
            <Input
              placeholder="City"
              value={(city === '' && disabled ? (city !== '' ? city : values.business_associate_contact?.business_address?.city) : city)}
              onChange= {(e) => {handleChangeData(e.target.value, setCity)}}
              disabled={disabled}
            />
            <h1>ZIP CODE</h1>
            <Input
              placeholder="Zip Code"
              value={(zip === '' && disabled ? (zip !== '' ? zip : values.business_associate_contact?.business_address?.zip) : zip)}
              onChange= {(e) => {handleChangeData(e.target.value, setZip)}}
              style={errors.email && touched.email ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
              disabled={disabled}
            />
            {/* <h1>PHONE NUMBER</h1>
            <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange} /> */}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
            <h1>STATE</h1>
            <Input
              placeholder="State"
              value={(state === '' && disabled ? (state !== '' ? state : values.business_associate_contact?.business_address?.state) : state)}
              onChange= {(e) => {handleChangeData(e.target.value, setState)}}
              style={errors.lastName && touched.lastName ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
              disabled={disabled}
            />
          </Col>
          </>
          }
        </Row>
        <br />
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 2 }} style={{ paddingRight: '20px' }}>
            <h3>AREAS</h3>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 22 }} style={{ paddingRight: '20px' }}>
            <div className="line-01"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
          <div className="gutter-row" id={("city" + values.user_id)}>
                  <p>AREAS</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(CITIES, 'city', values,  setCity)}
                    getPopupContainer={() => document.getElementById(("city" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {values.city ? values.city : 'City'} <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
            <div className="gutter-row"  id={("serviceArea" + values.user_id)}>
                  <p>SERVICE AREA</p>
                    <SelectServiceArea
                       serviceArea={serviceArea}
                       setServiceArea={setServiceArea}                  
                       defaultValue={serviceArea}
                       value={serviceArea}/>
                </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
          <div className="gutter-row"  id={("county" + values.user_id)}>
                  <p>COUNTY</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(COUNTIES, 'county', values,  setCounty)}
                    getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {values.county ? values.county : 'County'}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
          </Col>
        </Row>
        <h3>DEFAULT MAP ZOOM AREA</h3>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
            <Row>
              <div className="gutter-row" id={'zoomarea' + values.user_id} style={{ width: '100%' }}>
                <SelectZoomArea
                  zoomArea={zoomarea}
                  setZoomArea={setZoomArea}                  
                  defaultValue={zoomarea}
                  value={zoomarea} />
              </div>
            </Row>
            <h1 style={{ fontStyle: 'italic' }}>
              <p>
                <i>
                  <b>DATE REGISTERED:</b>&nbsp;
                  {moment(values.createdAt)
                    .format('LL')
                    .toUpperCase()}{' '}
                  AT {moment(values.createdAt).format('LT')}
                </i>
              </p>
            </h1>
          </Col>
        </Row>
        <br />
        <div style={{ textAlign: 'end' }}>
          <Button className="btn-profile-list" style={{ marginRight: '20px', borderColor: 'transparent' }}>
            Cancel
          </Button>
          <Button onClick={()=>{setSaveAlert(true)}} className="btn-purple btn-profile-list">Save</Button>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;