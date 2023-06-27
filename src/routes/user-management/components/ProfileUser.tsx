import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Button, Col, Dropdown, Input, Menu, MenuProps, Radio, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import * as datasets from 'Config/datasets';
import { COUNTIES, RADIO_ITEMS, STATES_NAME } from 'constants/constants';
import { VALIDATION_USER } from 'constants/validation';
import MenuAreaView from 'Components/User/UserComponents/MenuAreaView';
import { SERVER } from 'Config/Server.config';
import SelectServiceArea from 'routes/Utils/SelectServiceArea';
import SelectZoomArea from 'routes/Utils/SelectZoomArea';
import { User } from 'Classes/TypeList';
import Alert from 'Components/Shared/Alert';
import SelectJurisdiction from 'routes/Utils/SelectJurisdiction';
import { BusinessAssociatesDropdownMemoized } from 'routes/user-management/components/BusinessAssociateDropdown';
import RadioDesignation from 'routes/user-management/components/RadioDesignation';
import { formatPhoneNumber } from 'utils/utils';
import { useAppUserDispatch } from "../../../hook/useAppUser";

const ProfileUser = ({ record, saveUser }: { record: User, saveUser: Function }) => {
  const [organization, setOrganization] = useState('');
  const [zoomarea, setZoomArea] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);
  const validationSchema = VALIDATION_USER;
  const [disabled, setDisabled] = useState(true);
  const [disabledContact, setDisabledContact] = useState(false);
  const [disabledAddress, setDisabledAddress] = useState(false);
  const [selectAssociate, setSelectAssociate] = useState(-1);
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
  const [contactLabel,setContactLabel] = useState('');
  const [update, setUpdate] = useState(false);
  const [jurisdiction, setJurisdiction] = useState('');
  const [designation, setDesignation] = useState<string>(record.designation);
  const [initialValues, setInitialValues] = useState<any>(record);
  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });
  const [businessAssociate, setBusinessAssociate] = useState<any>([]); 
  const [listAssociates, setListAssociates] = useState<any>([]); 
  const [listContacts, setListContacts] = useState<any>([]); 
  const [addressId, setAddressId] = useState<any>(0);
  const [adressLabel, setAdressLabel] = useState<any>('');
  const [showAdress, setShowAdress] = useState<any>(false);
  const [showContact, setShowContact] = useState<any>(false);
  const [createAdress, setCreateAdress] = useState<any>(false);
  const [createContact, setCreateContact] = useState<any>(false);
  const [createFirstName, setCreateFirstName] = useState<any>('');
  const [createLastName, setCreateLastName] = useState<any>('');
  const [createMail, setCreateMail] = useState<any>('');
  const [createTitle, setCreateTitle] = useState<any>('');
  const [createPhone, setCreatePhone] = useState<any>('');

  const {
    replaceAppUser,
    getUserInformation
  } = useAppUserDispatch();

  const menuAdressAssociate = () => {
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
        label: <span style={{ border: 'transparent' }}>{'Add New Address'}</span>
      });
    };
    generateItemMenu(listAssociates.filter((elm: any) => elm.business_associates_id === selectAssociate)[0]
    .business_addresses.map((x: any) => ({
      key: x?.business_address_id,
      label: x?.full_address
    })));
    const adressFiltered = listAssociates.filter((elm: any) => elm.business_associates_id === selectAssociate)[0]
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {
        if (event.key === 'Create_1') {
          setDisabled(false);
          setDisabledAddress(true);
          setDisabledContact(false);
          setContactData({})
          setZip('')
          setCity('')
          setAdressLine1('')
          setAdressLine2('')
          setState('')
          setAdressLabel('')
          setAddressId(0)
          setCreateAdress(true)
        } else {
          setDisabled(true);
          setDisabledAddress(false);
          setContactData(((dataMenu.find((elm) => +elm.key === +event.key))))
          setZip(((dataMenu.find((elm) => +elm.key === +event.key)).zip))
          setCity((dataMenu.find((elm) => +elm.key === +event.key)).city)
          setAdressLine1((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_1)
          setAdressLine2((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_2)
          setState((dataMenu.find((elm) => +elm.key === +event.key)).state)
          setAdressLabel((dataMenu.find((elm) => +elm.key === +event.key)).label)
          setContactLabel('');
          setContactId((dataMenu.find((elm) => +elm.key === +event.key)).key)
          setAddressId((adressFiltered.business_addresses.find((elm: any) => +elm.business_address_id === +event.key)).business_address_id)
          setCreateAdress(false)
          setShowContact(true)
        }
      }}>
    </Menu>
  };

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
        label: <span style={{ border: 'transparent' }}>{'Add New Contact'}</span>
      });
    };
    generateItemMenu(listContacts);
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {    
        console.log(showAdress)
        console.log(showContact)    
        if (event.key === 'Create_1') {
          setDisabledContact(true)
          //setContactData({})
          setZip('')
          setCity('')
          setAdressLine1('')
          setAdressLine2('')
          setState('')
          setContactLabel('')
          setShowAdress(true)
          setShowContact(true)
          setCreateContact(true)
        } else {
          setDisabledContact(false);
          //setContactData(((dataMenu.find((elm) => +elm.key === +event.key))))
          setZip(((dataMenu.find((elm) => +elm.key === +event.key)).zip))
          setCity((dataMenu.find((elm) => +elm.key === +event.key)).city)
          setAdressLine1((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_1)
          setAdressLine2((dataMenu.find((elm) => +elm.key === +event.key)).business_address_line_2)
          setState((dataMenu.find((elm) => +elm.key === +event.key)).state)
          setContactLabel((dataMenu.find((elm) => +elm.key === +event.key)).label)
          setContactId((dataMenu.find((elm) => +elm.key === +event.key)).key)
          setCreateContact(false)
        }
      }}>
    </Menu>
  };

  const menuStates = () => {
    const itemMenu: MenuProps['items'] = [];
    let dataMenu: any[] = [];
    const generateItemMenu = (content: Array<any>) => {
      content.forEach((element) => {        
          itemMenu.push({
            key: element,
            label: <span style={{ border: 'transparent' }}>{element}</span>
          });
          dataMenu.push({
            ...element
          });        
      });
    };
    generateItemMenu(STATES_NAME);
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {   
          setState(event.key);
      }}>
    </Menu>
  };

  useEffect(() => {   
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
    setJurisdiction(record.city);
    setAssociateLabel(auxUser?.business_associate_contact?.business_address?.business_associate.business_name)
    setSelectAssociate(auxUser?.business_associate_contact?.business_address?.business_associate.business_associates_id)
    setContactLabel(auxUser?.business_associate_contact?.contact_name)
    setAdressLabel(auxUser?.business_associate_contact?.business_address?.full_address)
    setAddressId(auxUser?.business_associate_contact?.business_address?.business_address_id)
    setContactId(auxUser?.business_associate_contact_id)
  }, [record]);

  useEffect(() => {
    datasets.getData(SERVER.BUSINESS_ASSOCIATES).then(res => {
      const businessAssociates = res.map((x: any) => {
        return ({
          label: x.business_name,
          key: x.business_associates_id,
          primary_business_associate_contact_id: x.primary_business_associate_contact_id,
          code_business_associates_type_id: x.code_business_associates_type_id 
        });
      });
      setBusinessAssociate(businessAssociates)
      setListAssociates(res)
    });
  }, []);

  useEffect(() => {
    const addressFiltered = (listAssociates.filter((elm: any) => elm.business_associates_id === selectAssociate)[0])?.business_addresses;
    if (addressFiltered && Object.keys(addressFiltered).length > 0) {
      const associates = addressFiltered.find((f: any) => +f.business_address_id === +addressId)
      let aux: any[] = [];
      if (associates) {
        aux = associates.business_associate_contacts?.map((contact: any) => {
          return {
            business_address_id: associates.business_address_id,
            business_address_line_1: associates.business_address_line_1,
            business_address_line_2: associates.business_address_line_2,
            city: associates.city,
            state: associates.state,
            zip: associates.zip,
            key: contact.business_associate_contact_id,
            label: contact.contact_name
          }
        });
      }
      setListContacts(aux);
    }
  }, [selectAssociate,listAssociates,addressId]);

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
    }
  });
  const handleChangeData = (value : any, setValue?: any) => {
    setValue(value)
  }

  const handleZipChange = (value : any, setValue?: any) => {
    if (value.length <= 5 && (value === '' || !isNaN(value))) {
      setValue(value)
    }    
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
      city: jurisdiction,
      zoomarea,
      business_associate_contact_id: +contactId
    };
    if (createAdress) {
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
        newUser.business_associate_contact_id = +res?.businessContact?.business_associate_contact_id;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {        
            saveUser();           
            updateSuccessful();
            setDisabled(true);
            setUpdate(!update);
            getUserInformation();
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
    } else if (createContact) {
      datasets.postData(SERVER.CREATE_CONTACT, {
        contact_name: createFirstName + ' ' + createLastName,
        contact_email: createMail,
        contact_phone_number: createPhone,
        business_address_id: addressId
      }, datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +res?.business_associate_contact_id;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {        
            saveUser();           
            updateSuccessful();
            setDisabled(true);
            setUpdate(!update);
            getUserInformation();
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
          getUserInformation();
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
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }}>
            <h1>PHONE NUMBER</h1>
            <Input
              type='text'
              placeholder="(XXX) XXX-XXXX"
              value={phone}
              name="phone"
              onChange={(e) => {handleChangeData(formatPhoneNumber(e.target.value), setPhone)}}
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
            >
              <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ paddingRight: '20px'}}>
                {RADIO_ITEMS.map((item: { value: string; name: string }, index: number) => {
                  return <RadioDesignation key={item.name} index={index} value={item.value} name={item.name}/>;
                })}
              </Col>
            </Radio.Group>
          </Row>
          </Col>
          </Row>
        <br />
        
        {designation !== 'other' &&
        <>
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
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
              <div className="gutter-row"  id={("ba" + values.user_id)}>
                <p>BUSINESS ASSOCIATE</p>
                <BusinessAssociatesDropdownMemoized
                  businessAssociate={businessAssociate}
                  designation={values.designation}
                  setAssociateLabel={setAssociateLabel}
                  setPrimary={setPrimary}
                  setSelectAssociate={setSelectAssociate}
                  associateLabel={associateLabel}
                  setContactLabel = {setAdressLabel}
                  setShowAdress = {setShowAdress}
                  setCreateAdress = {setCreateAdress}
                  setCreateContact = {setCreateContact}
                  setDisableContact = {setDisabledContact}
                  setDisableAdress = {setDisabledAddress}
                  setDisabled = {setDisabled}
                  setContactData = {setContactData}
                />
              </div>
            </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{paddingLeft: '20px',paddingTop: '20px', paddingRight: '20px' }}>
                <div className="gutter-row" id={("design" + values.user_id)} style={{opacity:'0', display: 'none'}}>
                  <p>FIELD FOR DESIGN</p>
                  <Input placeholder="Enter Organization" style={{marginBottom:'15px', cursor: 'auto'}} disabled={true}/>
                </div>
                {(showAdress || contactLabel)?<div className="gutter-row"  id={("poc" + values.user_id)}>
                  <p>BUSINESS ASSOCIATE ADDRESS </p>
                  <Dropdown trigger={['click']} overlay={menuAdressAssociate}
                    getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {Object.keys(contactData).length > 0? contactData.label : (adressLabel ? adressLabel:'Select Business Associates Address')}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>:<></>}
              </Col>
            </Row>
            {(disabled) && <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{paddingLeft: '20px',paddingTop: '20px', paddingRight: '20px' }}>
                {(showContact || contactLabel)?<div className="gutter-row">
                  <p>BUSINESS ASSOCIATE  CONTACT </p>
                  <Dropdown trigger={['click']} overlay={menuContactAssociate}
                    getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {(contactLabel ? contactLabel:(createContact?'Add New Contact':'Select Business Associate Contact'))}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>:<></>}
              </Col>
          </Row> }
          {(disabledContact) && <Row>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px', paddingRight: '20px'  }}>
              <p>FIRST NAME</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Enter First Name"
                value={createFirstName}
                onChange= {(e) => {handleChangeData(e.target.value, setCreateFirstName)}}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
              <p>LAST NAME</p>
              <Input
                placeholder="Enter Last Name"
                value={createLastName}
                onChange= {(e) => {handleChangeData(e.target.value, setCreateLastName)}}
                style={errors.email && touched.email ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px', paddingRight: '20px'  }}>
              <p>EMAIL</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Enter Email"
                value={createMail}
                onChange= {(e) => {handleChangeData(e.target.value, setCreateMail)}}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
              <p>TITLE</p>
              <Input
                placeholder="Enter Title"
                value={createTitle}
                onChange= {(e) => {handleChangeData(e.target.value, setCreateTitle)}}
                style={errors.email && touched.email ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px', paddingRight: '20px'  }}>
              <p>PHONE NUMBER</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Phone"
                value={createPhone}
                onChange= {(e) => {handleChangeData(formatPhoneNumber(e.target.value), setCreatePhone)}}
              />
            </Col>
          </Row> }
          <Row style={{paddingLeft:'20px'}}>
            {
              disabledAddress &&
              <>
              <Col xs={{ span: 24 }} lg={{ span: 18 }} style={{ paddingRight: '0px' }}>
              <p>ADDRESS</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Address"
                value={(addressLine1 === '' && disabled ? (addressLine1 !== '' ? addressLine1 : values.business_associate_contact?.business_address?.business_address_line_1) : addressLine1)}
                name="address_line_1"
                onChange = {(e) => {handleChangeData(e.target.value, setAdressLine1)}}
                disabled={disabled}
              />
              {/* <p>ADDRESS LINE 2</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Address Line 2"
                value={(addressLine2 === '' && disabled ? (addressLine2 !== '' ? addressLine2 : values.business_associate_contact?.business_address?.business_address_line_2) : addressLine2)} 
                name="address_line_1" 
                onChange= {(e) => {handleChangeData(e.target.value, setAdressLine2)}}
                disabled = {disabled}
              /> */}
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
              <p>CITY</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="City"
                value={(city === '' && disabled ? (city !== '' ? city : values.business_associate_contact?.business_address?.city) : city)}
                onChange= {(e) => {handleChangeData(e.target.value, setCity)}}
                disabled={disabled}
              />
              <p>ZIP CODE</p>
              <Input
                placeholder="Zip Code"
                value={(zip === '' && disabled ? (zip !== '' ? zip : values.business_associate_contact?.business_address?.zip) : zip)}
                onChange= {(e) => {handleZipChange(e.target.value, setZip)}}
                style={errors.email && touched.email ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
                disabled={disabled}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
              <p>STATE</p>
              <Dropdown trigger={['click']} overlay={menuStates} >
                  <Button className="btn-borde-management">
                      {state===''?'State':state}<DownOutlined />
                  </Button>
              </Dropdown>
            </Col>
            </>
            }
          </Row>
          <br />
          </>
        }
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
            <p>JURISDICTION</p>
            <SelectJurisdiction
              setJurisdiction={setJurisdiction}
              defaultValue={jurisdiction}
              value={jurisdiction}
            />
          </div> 
            <div className="gutter-row"  id={("serviceArea" + values.user_id)}>
              <p>SERVICE AREA</p>
                <SelectServiceArea
                  serviceArea={serviceArea}
                  setServiceArea={setServiceArea}                  
                  defaultValue={serviceArea}
                  value={serviceArea}
                />
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
