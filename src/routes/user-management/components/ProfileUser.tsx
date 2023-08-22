import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Button, Col, Dropdown, Input, Menu, MenuProps, Radio, Row } from 'antd';
import { CheckCircleFilled, DownOutlined } from '@ant-design/icons';
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
import { useNotifications } from 'Components/Shared/Notifications/NotificationsProvider';


const ProfileUser = ({ record, saveUser, setExpandedRow }: { record: User, saveUser: Function, setExpandedRow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [organization, setOrganization] = useState('');
  const [zoomarea, setZoomArea] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
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
  const [update, setUpdate] = useState(true);
  const [jurisdiction, setJurisdiction] = useState('');
  const [designation, setDesignation] = useState<string>(record.designation);
  const [initialValues, setInitialValues] = useState<any>(record);
  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });
  const [businessAssociate, setBusinessAssociate] = useState<any>([]); 
  const [listAssociates, setListAssociates] = useState<any>([]); 
  const [listContacts, setListContacts] = useState<any>([]); 
  const [addressId, setAddressId] = useState<any>(0);
  const [adressLabel, setAdressLabel] = useState<any>('');
  const [createAdress, setCreateAdress] = useState<any>(false);
  const [createContact, setCreateContact] = useState<any>(false);
  const [createFullName, setCreateFullName] = useState<any>('');
  const [createMail, setCreateMail] = useState<any>('');
  const [createAssociate, setCreateAssociate] = useState<any>(false);
  const [createAssociateName, setCreateAssociateName] = useState<any>('');
  const [createPhone, setCreatePhone] = useState<any>('');
  const { openNotification } = useNotifications();

  interface Contact {
    full_address: string;
    city: string;
    state: string;
    zip: string;
  }

  const handleNotification = () => {
    openNotification('Success! Your user update was saved!', "success", "example text for notification");
  };

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
    const selectedAssociate = listAssociates?.filter((elm: any) => elm.business_associates_id === selectAssociate)[0];
    if (selectedAssociate && selectedAssociate.business_addresses) {
      generateItemMenu(selectedAssociate.business_addresses.map((x: any) => ({
        key: x?.business_address_id,
        label: parseAddress(x)
      })));
    } else {
      generateItemMenu([]);
    }
    const adressFiltered = listAssociates.filter((elm: any) => elm.business_associates_id === selectAssociate)[0]
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {
        if (event.key === 'Create_1') {
          setDisabledContact(false);
          setContactData({})
          setZip('')
          setCity('')
          setAdressLine1('')
          setAdressLine2('')
          setState('')
          setAddressId(0)
          setCreateAdress(true)
          setAdressLabel('Add New Address')
          setDisabledAddress(true);
          setDisabled(false);
        } else {          
          setAddressId((adressFiltered.business_addresses.find((elm: any) => +elm.business_address_id === +event.key)).business_address_id)
          setCreateAdress(false)
          setDisabledAddress(true);
          setDisabled(false);
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
        if (event.key === 'Create_1') {
          setDisabledContact(true)
          //setContactData({})
          setContactLabel('')
          setCreateContact(true)
          setCreateFullName('')
          setCreateMail('')
          setCreatePhone('')
        } else {
          setDisabledContact(true);
          //setContactData(((dataMenu.find((elm) => +elm.key === +event.key))))
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
    const address = auxUser?.business_associate_contact?.business_address;
    const formattedAddress = address ? parseAddress(address) : '';
    setAdressLabel(formattedAddress);
    setAddressId(auxUser?.business_associate_contact?.business_address?.business_address_id)
    setContactId(auxUser?.business_associate_contact_id)
    setAdressLine1(auxUser?.business_associate_contact?.business_address?.full_address)
    setAdressLine2(auxUser?.business_associate_contact?.business_address?.address_line_2)
    setZip(auxUser?.business_associate_contact?.business_address?.zip)
    setState(auxUser?.business_associate_contact?.business_address?.state) 
    setCity(auxUser?.business_associate_contact?.business_address?.city)
    setCreateFullName(auxUser?.business_associate_contact?.contact_name)
    setCreateMail(auxUser?.business_associate_contact?.contact_email)
    setCreatePhone(auxUser?.business_associate_contact?.contact_phone_number)
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
      setListAssociates(res ? res : []);
    });
  }, [update]);

  useEffect(() => {
    const addressFiltered = listAssociates?.find((elm: any) => elm.business_associates_id === selectAssociate)?.business_addresses;
    if (addressFiltered && Object.keys(addressFiltered).length > 0) {
      const aux = addressFiltered.map((address: any) => {
        return address.business_associate_contacts?.map((contact: any) => {
          return {
            business_address_id: address.business_address_id,
            business_address_line_1: address.business_address_line_1,
            business_address_line_2: address.business_address_line_2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            key: contact.business_associate_contact_id,
            label: contact.contact_name,
            contact_name: contact.contact_name,
            contact_email: contact.contact_email,
            contact_phone_number: contact.contact_phone_number,
          }
        });
      }).flat();
      setListContacts(aux);
    }
    if (selectAssociate === -1) {
      setListContacts([]);
    }
  }, [selectAssociate, listAssociates]);

  useEffect(() => {      
    const auxUser = { ...record };
    setInitialValues(auxUser);    
    values.zoomarea = zoomarea;    
    values.serviceArea = serviceArea;
    values.organization = organization;
  }, [organization,zoomarea,serviceArea]);

  useEffect(() => {
    const contact = listAssociates?.find((elm: any) => elm.business_associates_id === selectAssociate)?.
      business_addresses?.filter((address: any) => address.business_address_id === addressId)?.[0];
    if (contact && Object.keys(contact).length > 0) {
      setDisabledAddress(true);
      const formattedAddress = parseAddress(contact);
      setAdressLabel(formattedAddress);
      setAdressLine1(contact.full_address);
      setCity(contact.city);
      setZip(contact.zip);
      setState(contact.state);
      setDisabled(false);
    }
  }, [addressId])

  useEffect(() => {
    const contact = listContacts?.find((elm: any) => elm.key === contactId);
    if (contact && Object.keys(contact).length > 0) {
      setCreateFullName(contact.contact_name);
      setCreateMail(contact.contact_email);
      setCreatePhone(contact.contact_phone_number);
    }
  }, [contactId])

  const handleCityChange = (value:any) => {
    if (value.length <= 25) {
      setCity(value);
    }
  };  

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

  const parseAddress = (contact: Contact): string => {
    const { full_address, city, state, zip } = contact;
    let address = full_address;
    if (city) {
      address += `, ${city}`;
    }
    if (state) {
      address += `, ${state}`;
    }
    if (zip) {
      address += `, ${zip}`;
    }
    return address;
  };

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

  const save = (selectAssociateId: any) => {
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
    const newAddress: any = {
      business_address_line_1: addressLine1,
      business_address_line_2: addressLine1,
      full_address: addressLine1,
      state: state,
      city: city,
      zip: zip,
    };
    if (createAdress && !createContact) {
      datasets.postData(SERVER.UPDATE_ADDRESS + '/' + contactId, {
        ...newAddress,
        contact_name: createFullName,
        contact_email: createMail,
        contact_phone_number: createPhone,
        business_associate_contact_id: +selectAssociateId
      },datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +contactId;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {   
            setDisabledContact(false);     
            setDisabledAddress(false);
            saveUser();           
            updateSuccessful();
            setDisabled(true);
            setUpdate(!update);
            setCreateAssociate(false);
            getUserInformation();     
            setConfirmation(true);
            setTimeout(() => {
              setConfirmation(false);
            }, 3000);
          } else {
            if (res?.error) {
              updateError(res.error);
            }
            else {
              updateError(res);
            }
          }
        })
      });
    } else if (createAdress && createContact) {
      datasets.postData(SERVER.SAVE_BUSINESS_ADRESS_AND_CONTACT(selectAssociateId), {
        ...newAddress,
        contact_name: createFullName,
        contact_email: createMail,
        contact_phone_number: createPhone,
        business_address_id: addressId
      }, datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +res?.businessContact?.business_associate_contact_id;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {   
            setDisabledContact(false);     
            setDisabledAddress(false);
            saveUser();           
            updateSuccessful();
            setCreateAssociate(false);
            setDisabled(true);
            setUpdate(!update);
            getUserInformation();     
            setConfirmation(true);
            setTimeout(() => {
              setConfirmation(false);
            }, 3000);
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
    } else if (!createAdress && createContact) {
      datasets.postData(SERVER.CREATE_CONTACT  + '/' + addressId, {
        ...newAddress,
        contact_name: createFullName,
        contact_email: createMail,
        contact_phone_number: createPhone,
        business_address_id: addressId,        
      }, datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +res?.business_associate_contact_id;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {     
            setDisabledContact(false);     
            setDisabledAddress(false);   
            saveUser();           
            updateSuccessful();
            setCreateAssociate(false);
            setDisabled(true);
            setUpdate(!update);
            getUserInformation();
            setConfirmation(true);
            setTimeout(() => {
              setConfirmation(false);
            }, 3000);
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
      datasets.putData(SERVER.UPDATE_BUSINESS_ADRESS_AND_CONTACT(addressId,contactId), {
        ...newAddress,
        contact_name: createFullName,
        contact_email: createMail,
        contact_phone_number: createPhone,
      }, datasets.getToken()).then(res => {
        newUser.business_associate_contact_id = +contactId;
        datasets.putData(SERVER.EDIT_USER + '/' + record.user_id, {...newUser}, datasets.getToken()).then(res => { 
          if (res.message === 'SUCCESS') {   
            setDisabledContact(false);     
            setDisabledAddress(false);
            saveUser();           
            updateSuccessful();
            setCreateAssociate(false);
            setDisabled(true);
            setUpdate(!update);
            getUserInformation();
            setConfirmation(true);
            handleNotification();
            setTimeout(() => {
              setConfirmation(false);
            }, 3000);
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
    }
    setSaveAlert(false)
  }

  const result = () => {
    if (createAssociate) {
      datasets.postData(SERVER.BUSINESS_ASSOCIATES, { name: createAssociateName }, datasets.getToken()).then(res => {
        save(res.business_associates_id);
      });
    }else{
      save(selectAssociate);
    }
  }
  const message = 'Are you sure you want to update the record for ' + values.firstName + ' ' + values.lastName + '?';


  return (
    <>
    {/* <ConfirmationSave visible={confirmation} setVisible={setConfirmation} /> */}
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
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
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
                <div className="gutter-row" id={("ba" + values.user_id)}>
                  <p>BUSINESS ASSOCIATE</p>
                  <BusinessAssociatesDropdownMemoized
                    businessAssociate={businessAssociate}
                    designation={values.designation}
                    setAssociateLabel={setAssociateLabel}
                    setPrimary={setPrimary}
                    setSelectAssociate={setSelectAssociate}
                    associateLabel={associateLabel}
                    setContactLabel={setContactLabel}
                    setAddressLabel={setAdressLabel}
                    setCreateAdress={setCreateAdress}
                    setCreateContact={setCreateContact}
                    setDisableContact={setDisabledContact}
                    setDisableAdress={setDisabledAddress}
                    setDisabled={setDisabled}
                    setContactData={setContactData}
                    setCreateAssociate={setCreateAssociate}
                  />
                </div>
              </Col>
            </Row>
            <Row>
             { createAssociate &&
              <>
                <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px',paddingTop: '20px' }}>
                  <p>BUSINESS ASSOCIATE NAME</p>
                  <Input
                    style={{ marginBottom: '15px' }}
                    placeholder="Business Associate Name"
                    value={createAssociateName}
                    name="address_line_1"
                    onChange={(e) => { handleChangeData(e.target.value, setCreateAssociateName) }}
                    disabled={disabled}
                  />
                </Col>
              </>
            }
            </Row>            
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: '20px', paddingTop: '20px', paddingRight: '20px' }}>
                <div className="gutter-row" id={("design" + values.user_id)} style={{ opacity: '0', display: 'none' }}>
                  <p>FIELD FOR DESIGN</p>
                  <Input placeholder="Enter Organization" style={{ marginBottom: '15px', cursor: 'auto' }} disabled={true} />
                </div>
                <div className="gutter-row" id={("poc" + values.user_id)}>
                  <p>BUSINESS ASSOCIATE ADDRESS </p>
                  <Dropdown trigger={['click']} overlay={menuAdressAssociate}
                    getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {Object.keys(contactData).length > 0 ? contactData.label : (adressLabel ? adressLabel : 'Select Business Associates Address')}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          <Row style={{ paddingLeft: '20px' }}>
            {
              disabledAddress &&
              <>
                <Col xs={{ span: 24 }} lg={{ span: 18 }} style={{ paddingRight: '0px' }}>
                  <p>ADDRESS</p>
                  <Input
                    style={{ marginBottom: '15px' }}
                    placeholder="Address"
                    value={(addressLine1 === '' && disabled ? (addressLine1 !== '' ? addressLine1 : values.business_associate_contact?.business_address?.business_address_line_1) : addressLine1)}
                    name="address_line_1"
                    onChange={(e) => { handleChangeData(e.target.value, setAdressLine1) }}
                    disabled={disabled}
                  />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
                  <p>CITY</p>
                  <Input
                    style={{ marginBottom: '15px' }}
                    placeholder="City"
                    value={(city === '' && disabled ? (city !== '' ? city : values.business_associate_contact?.business_address?.city) : city)}
                    onChange={(e) => { handleCityChange(e.target.value) }}
                    disabled={disabled}
                  />
                  <p>ZIP CODE</p>
                  <Input
                    placeholder="Zip Code"
                    value={(zip === '' && disabled ? (zip !== '' ? zip : values.business_associate_contact?.business_address?.zip) : zip)}
                    onChange={(e) => { handleZipChange(e.target.value, setZip) }}
                    style={errors.email && touched.email ? { border: 'solid red', marginBottom: '15px' } : { marginBottom: '15px' }}
                    disabled={disabled}
                  />
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
                  <p>STATE</p>
                  <Dropdown trigger={['click']} overlay={menuStates} >
                    <Button className="btn-borde-management">
                      {state === '' ? 'State' : state}<DownOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </>
            }
          </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{paddingLeft: '20px',paddingTop: '20px', paddingRight: '20px' }}>
                <div className="gutter-row">
                  <p>BUSINESS ASSOCIATE  CONTACT </p>
                  <Dropdown trigger={['click']} overlay={menuContactAssociate}
                    getPopupContainer={() => document.getElementById(("county" + values.user_id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {(contactLabel ? contactLabel:(createContact?'Add New Contact':'Select Business Associate Contact'))}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row> 
          {disabledContact && <Row>
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px', paddingRight: '20px'  }}>
              <p>CONTACT NAME</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Enter Contact Name"
                value={createFullName}
                onChange= {(e) => {handleChangeData(e.target.value, setCreateFullName)}}
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
              <p>PHONE NUMBER</p>
              <Input
                style={{marginBottom:'15px'}}
                placeholder="Phone"
                value={createPhone}
                onChange= {(e) => {handleChangeData(formatPhoneNumber(e.target.value), setCreatePhone)}}
              />
            </Col>
          </Row> }          
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
          <Button onClick={()=>setExpandedRow(false)} className="btn-profile-list-transparent">
            Cancel
          </Button>
          <Button onClick={()=>{setSaveAlert(true)}} className="btn-purple btn-profile-list">Save</Button>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
