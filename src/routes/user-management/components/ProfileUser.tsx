import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, Layout, Menu, MenuProps, Popover, Radio, Row, Select, Switch, Table, Tabs } from 'antd';
import { useFormik } from 'formik';
import { CITIES, SERVICE_AREA, COUNTIES, RADIO_ITEMS, DROPDOWN_ORGANIZATION, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, OTHER, ADMIN, STAFF, CONSULTANT } from "../../../constants/constants";
import { VALIDATION_USER } from "../../../constants/validation";
import * as datasets from "../../../Config/datasets";
// import RadioItemsView from './RadioItemsView';
// import MenuAreaView from './MenuAreaView';
import { User } from '../../../Classes/TypeList';
// import Alert from '../../Shared/Alert';
import moment from 'moment';
import { useProfileState } from '../../../hook/profileHook';
import { SERVER } from "Config/Server.config";
import RadioItemsView from "Components/User/UserComponents/RadioItemsView";
import RadioDesignation from "./RadioDesignation";
import { DownOutlined } from "@ant-design/icons";
import MenuAreaView from "Components/User/UserComponents/MenuAreaView";

const { Option } = Select;
const ProfileUser = ({ record, saveUser, deleteUser, type, deleteUserDatabase }: { record: User, saveUser: Function, deleteUser: Function, type: string, deleteUserDatabase: Function }) => {
  
  const { groupOrganization } = useProfileState();
  const validationSchema = VALIDATION_USER;
  const { Panel } = Collapse;
  const [dataAutocomplete, setDataAutocomplete] = useState(groupOrganization.filter(function (item: any) {
    if (item.aoi === undefined) {
      return false;
    }
    return true;
  }).map((item: { aoi: string }) => {
    return { key: item.aoi, value: item.aoi, label: item.aoi }
  }));
  const visible = {
    visible: false
  };
  const [organizationList, setOrganizationList] = useState<any[]>([]);
  const [consultantList, setConsultantList] = useState<any[]>([]);
  useEffect(() => {
    datasets.getData(SERVER.GET_ORGANIZATIONS)
      .then((rows) => {
        const organizations = rows
          .filter((row: any) => row.type === 'JURISDICTION')
          .map(({id, name}: { id: number, name: string }) => (name))
          .sort((a: string, b: string) => {
            return a.localeCompare(b);
          });
          // console.log('qwe organizations', organizations);
        setOrganizationList(organizations);
      })
      .catch((e) => {
        console.log(e);
      })
    datasets.getData(SERVER.GET_CONSULTANTS)
      .then((rows) => {
        const consultants = rows
          .map(({_id, name}: { _id: number, name: string }) => (name))
          .filter((value: string, index: number, self: any) => {
            return self.indexOf(value) === index;
          }
          ).sort();
        setConsultantList(consultants);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  const menu2 = () => {
    const itemMenu: MenuProps['items'] = [];
    const generateItemMenu = (content: Array<any>) => {
      content.forEach((element, index: number) => {
        itemMenu.push({
          key: `${index}|${element}`,
          label: <span style={{border:'transparent'}}>{element}</span>
        });
      });
    };
    if (values.designation === ADMIN || values.designation === STAFF) {
      generateItemMenu(['Mile High Flood Control District Boundary']);
    } else if (values.designation === CONSULTANT) {
      generateItemMenu(consultantList);
    } else if (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) {
      generateItemMenu(organizationList);
    } else {
      generateItemMenu(['-']);
    }
    return <Menu
      key={'organization'}
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event:any) => {
        values.organization = event.key.split('|')[1];
        setTitle(values.organization);
      }}>
    </Menu>
  };
  const menu = () => {
    let itemMenu: MenuProps['items']
    let regional: any = [];
    let city: any = [];
    let county: any = [];
    let unincorporated: any = [];
    const genetareMenuItem = (list: Array<any>): Array<any> => {
      let items: Array<any> = [];
      list.forEach((element: string, index: number) => {
        items.push({
          key: `${index}|${element}`,
          label: <span style={{ marginLeft: '12px' }}>{element}</span>
        });
      });
      return items;
    };
    if (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) {
      regional = genetareMenuItem(DROPDOWN_ORGANIZATION.REGIONAL_AGENCY);
      city = genetareMenuItem(DROPDOWN_ORGANIZATION.CITY);
      county = genetareMenuItem(DROPDOWN_ORGANIZATION.CITY_AND_COUNTY);
      unincorporated = genetareMenuItem(DROPDOWN_ORGANIZATION.UNINCORPORATED_COUNTY);
      itemMenu = [
        {
          key: 'regional-items',
          type: 'group',
          label: <label className="label-sg">{'Regional Agency'}</label>,
          children: regional
        },
        {
          key: 'city-items',
          type: 'group',
          label: <label className="label-sg">{'City'}</label>,
          children: city
        },
        {
          key: 'county-items',
          type: 'group',
          label: <label className="label-sg">{'City and County'}</label>,
          children: county
        },
        {
          key: 'unincorporated-items',
          type: 'group',
          label: <label className="label-sg">{'Unincorporated County'}</label>,
          children: unincorporated
        },
      ];
    } else {
      itemMenu = groupOrganization.map((item: any, index: number) => {
        return {
          key: `${index}|${item.aoi}`,
          label: <span>{item.aoi}</span>
        }
      });
    }
    return <Menu
      className="js-mm-00 sign-menu-organization"
      items={itemMenu}
      onClick={(event) => {
        values.zoomarea = event.key.split('|')[1];
        setTitle(values.zoomarea);
      }}>
    </Menu>
  };

  const [modal, setModal] = useState(visible);
  const [, setSwitchTo] = useState<boolean>(record.activated);
  const [designation, setDesignation] = useState<string>(record.designation);
  const [, setTitle] = useState<string>('');
  const [initialValues, setInitialValues] = useState(record);
  const [activated, setActivated] = useState(false);
  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });

  useEffect(() => {
    const auxUser = { ...record };
    setInitialValues(auxUser);
    values._id = record._id;
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
  }, [record]);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values: User) {
      values.designation = designation;
      const auxState = { ...visible };
      auxState.visible = true;
      setModal(auxState);
    }
  });

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
    datasets.putData(SERVER.EDIT_USER + '/' + record._id, values, datasets.getToken()).then(res => {
      if (res?._id) {
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
  const message = 'Are you sure you want to update the record ' + values.firstName + ' ' + values.lastName + '?';
  const handleSwitchButton = (checked: boolean) => {
    setSwitchTo(checked);
    setTitle(record._id);
    deleteUser(record._id + type);
  }

  const genExtra = () => (
    <Row className="record-head" justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col xs={{ span: 19 }} lg={{ span: 19 }} onClick={() => {
        console.log('click click');
        setActivated(!activated);
      }}>
        <h6>{'. ' + record.firstName + ' ' + record.lastName}</h6>
      </Col>
      <Col xs={{ span: 3 }} lg={{ span: 3 }} style={{ textAlign: 'right' }}>
        <div>
          <Switch className={'switch-options'} checked={record.status === 'approved' ? true: false} onChange={handleSwitchButton} />
        </div>
      </Col>
      <Col xs={{ span: 1 }} lg={{ span: 1 }} style={{ textAlign: 'right' }} onClick={() => {
        setActivated(!activated);
      }} >
        <img src={activated ? "/Icons/icon-21.svg" : "/Icons/icon-20.svg"} alt="" />
      </Col>
    </Row>
  );

  return (
    <>
      <div className="profile-record">
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
              value={values.firstName}
              name="firstName"
              onChange={handleChange}
              style={errors.firstName && touched.firstName ? { border: 'solid red' } : {}}
            />
            <h1>EMAIL</h1>
            <Input
              placeholder="Email"
              value={values.email}
              name="email"
              onChange={handleChange}
              style={errors.email && touched.email ? { border: 'solid red' } : {}}
            />
            <h1>PHONE NUMBER</h1>
            <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
            <h1>LAST NAME</h1>
            <Input
              placeholder="Last Name"
              value={values.lastName}
              name="lastName"
              onChange={handleChange}
              style={errors.lastName && touched.lastName ? { border: 'solid red' } : {}}
            />
            <h1>TITLE</h1>
            <Input placeholder="Title" value={values.title} name="title" onChange={handleChange} />
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
          <Radio.Group
            name="designation"
            value={designation}
            onChange={event => {
              values.designation = event.target.value;
              if (values.designation === ADMIN || values.designation === STAFF) {
                values.organization = 'Mile High Flood Control District Boundary';
              } else if (values.designation === OTHER) {
                values.organization = '-';
              } else {
                values.organization = 'Please select one';
              }
              setTitle(values.organization);
              setDesignation(event.target.value);
            }}
            style={{ display: 'inline-flex', width: '100%', alignSelf: 'stretch' }}
          >
            <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px', display: 'flex' }}>
              {RADIO_ITEMS.map((item: { value: string; name: string }, index: number) => {
                console.log('indexx', index);
                if (index < 3) {
                }
                return <RadioDesignation key={index} index={index} value={item.value} name={item.name} />;
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
          <div className="gutter-row" id={("city" + values._id)}>
                  <p>AREAS</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(CITIES, 'city', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("city" + values._id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {values.city ? values.city : 'City'} <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
            <div className="gutter-row"  id={("serviceArea" + values._id)}>
                  <p>SERVICE AREA</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(SERVICE_AREA, 'serviceArea', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("serviceArea" + values._id)) as HTMLElement}
                    placement="bottomLeft">
                    <Button className="btn-borde-management">
                      {values.serviceArea ? values.serviceArea : 'Service Area'}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingLeft: '20px' }}>
          <div className="gutter-row"  id={("county" + values._id)}>
                  <p>COUNTY</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(COUNTIES, 'county', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("county" + values._id)) as HTMLElement}>
                    <Button className="btn-borde-management">
                      {values.county ? values.county : 'County'}  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
          </Col>
        </Row>
        <br />
        <br />
        <div></div>
        <h3>DEFAULT MAP ZOOM AREA</h3>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ paddingRight: '20px' }}>
            <Row gutter={16}>
              <div className="gutter-row"  id={'zoomarea' + values._id}>
                <Dropdown
                className="dropdown-user-management"
                  trigger={['click']}
                  overlay={menu}
                  getPopupContainer={() => document.getElementById('zoomarea' + values._id) as HTMLElement}
                >
                  <Button className="btn-borde-management">
                    {values.zoomarea ? values.zoomarea : 'Zoom Area'} <DownOutlined />
                  </Button>
                </Dropdown>
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
          <Button className="btn-purple btn-profile-list">Save</Button>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;