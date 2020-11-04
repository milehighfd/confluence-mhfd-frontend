import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio, Form, Menu } from 'antd';
import { useFormik } from 'formik';

import { CITIES, SERVICE_AREA, COUNTIES, RADIO_ITEMS, DROPDOWN_ORGANIZATION, GOVERNMENT_ADMIN, GOVERNMENT_STAFF } from "../../../constants/constants";
import { VALIDATION_USER } from "../../../constants/validation";
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';
import RadioItemsView from './RadioItemsView';
import MenuAreaView from './MenuAreaView';
import { User } from '../../../Classes/TypeList';
import Alert from '../../Shared/Alert';
import moment from 'moment';

export default ({ user, pos, saveUser, deleteUser, type, deleteUserDatabase }: { user: User, pos: number, saveUser: Function, deleteUser: Function, type: string, deleteUserDatabase: Function }) => {
  const validationSchema = VALIDATION_USER;
  const { Panel } = Collapse;

  const visible = {
    visible: false
  };
  const menu = () => {
    return (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ?
      <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
          // values, setTitle
          values.organization = event.item.props.children.props.children;
          const auxTitle = event.item.props.children.props.children;
          setTitle(auxTitle);
        }}>
        <Menu.ItemGroup key="g1">
          <label className="label-sg">{'Regional Agency'}</label>
          {DROPDOWN_ORGANIZATION.REGIONAL_AGENCY.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2">
          <label className="label-sg">{'City'}</label>
          {DROPDOWN_ORGANIZATION.CITY.map((item: string, index: number) => (<Menu.Item key={index + "g2"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g3">
          <label className="label-sg">{'City and County'}</label>
          {DROPDOWN_ORGANIZATION.CITY_AND_COUNTY.map((item: string, index: number) => (<Menu.Item key={index + "g3"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g4">
          <label className="label-sg">{'Unincorporated County'}</label>
          {DROPDOWN_ORGANIZATION.UNINCORPORATED_COUNTY.map((item: string, index: number) => (<Menu.Item key={index + "g4"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
      </Menu> :
      <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
          values.organization = event.item.props.children.props.children;
          const auxTitle = event.item.props.children.props.children;
          setTitle(auxTitle);
        }}>
        <Menu.ItemGroup key="g1">
          <label className="label-sg">{'Regional Agency'}</label>
          {DROPDOWN_ORGANIZATION.REGIONAL_AGENCY_PUBLIC.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
      </Menu>
  };
  const [modal, setModal] = useState(visible);
  const [modalDelete, setModalDelete] = useState(visible);
  const [, setSwitchTo] = useState<boolean>(user.activated);
  const [designation, setDesignation] = useState<string>(user.designation);
  const [, setTitle] = useState<string>('');
  const [initialValues, setInitialValues] = useState(user);
  const [activated, setActivated] = useState(false);
  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });

  useEffect(() => {
    const auxUser = { ...user };
    setInitialValues(auxUser);
    values._id = user._id;
    values.firstName = user.firstName;
    values.lastName = user.lastName;
    values.activated = user.activated;
    values.organization = user.organization;
    values.name = user.name;
    values.designation = user.designation;
    values.email = user.email;
    values.city = user.city;
    values.county = user.county;
    values.serviceArea = user.serviceArea;
    values.phone = user.phone;
    values.title = user.title;
    values.status = user.status;
    values.createdAt = user.createdAt;
  }, [user]);

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
    auxMessageError.message = 'Updating user data was successful';
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
    datasets.putData(SERVER.EDIT_USER + '/' + user._id, values, datasets.getToken()).then(res => {
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
  const message = 'Are you sure you want to update the user ' + values.firstName + ' ' + values.lastName + '?';
  const messageDelete = 'Are you sure you want to delete the user' + values.firstName + ' ' + values.lastName + '?';
  const handleSwitchButton = (checked: boolean) => {
    setSwitchTo(checked);
    setTitle(user._id);
    deleteUser(user._id + type);
  }

  const genExtra = () => (
    <Row className="user-head" type="flex" justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
      <Col span={19} onClick={() => {
        console.log('click click');
        setActivated(!activated);
      }}>
        <h6>{pos + '. ' + user.firstName + ' ' + user.lastName}</h6>
      </Col>
      <Col span={3} style={{ textAlign: 'right' }}>
        <div>
          <Switch className={'switch-options'} checked={user.status === 'approved' ? true: false} onChange={handleSwitchButton} />
        </div>
      </Col>
      <Col span={1} style={{ textAlign: 'right' }} onClick={() => {
        setActivated(!activated);
      }} >
        <img src={activated ? "/Icons/icon-21.svg" : "/Icons/icon-20.svg"} alt="" />
      </Col>
    </Row>
  );

  return (
    <>
      <Collapse accordion={false} activeKey={activated ? 1 : 0} className="user-tab">

        <Panel disabled={true} header="" key="1" extra={genExtra()}>
          <Form onSubmit={handleSubmit}>
            <div className="gutter-example">
              <h3>PROFILE</h3>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <p>FIRST NAME</p>
                  <Input placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange}
                    style={(errors.firstName && touched.firstName) ? { border: "solid red" } : {}} />
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>LAST NAME</p>
                  <Input placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange}
                    style={(errors.lastName && touched.lastName) ? { border: "solid red" } : {}} />
                </Col>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <p>EMAIL</p>
                  <Input placeholder="Email" value={values.email} name="email" onChange={handleChange}
                    style={(errors.email && touched.email) ? { border: "solid red" } : {}} />
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>TITLE</p>
                  <Input placeholder="Title" value={values.title} name="title" onChange={handleChange} />
                </Col>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <p>PHONE NUMBER</p>
                  <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange} />
                </Col>
              </Row>
            </div>
            <hr></hr>
            <div className="gutter-example">
              <h3>USER DESIGNATION</h3>
              <Row gutter={16}>
                <Radio.Group name="designation" value={designation} onChange={(event) => {
                  values.designation = event.target.value;
                  setDesignation(event.target.value);
                }} style={{ width: '100%' }}>
                  {RADIO_ITEMS.map((item: { value: string, name: string }, index: number) => {
                    return <RadioItemsView key={index} index={index} value={item.value} name={item.name} />
                  })}
                </Radio.Group>
              </Row>
            </div>
            <hr></hr>
            <div className="gutter-example">
              <h3>AREAS</h3>
              <Row gutter={16}>
                <Col className="gutter-row" span={12} id={("city" + values._id)}>
                  <p>AREAS</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(CITIES, 'city', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("city" + values._id)) as HTMLElement}>
                    <Button>
                      {values.city ? values.city : 'City'} <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>

                <Col className="gutter-row" span={12} id={("county" + values._id)}>
                  <p>COUNTY</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(COUNTIES, 'county', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("county" + values._id)) as HTMLElement}>
                    <Button >
                      {values.county ? values.county : 'County'}  <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col className="gutter-row" span={12} id={("serviceArea" + values._id)}>
                  <p>SERVICE AREA</p>
                  <Dropdown trigger={['click']} overlay={MenuAreaView(SERVICE_AREA, 'serviceArea', values, setTitle)}
                    getPopupContainer={() => document.getElementById(("serviceArea" + values._id)) as HTMLElement}
                    placement="bottomLeft">
                    <Button >
                      {values.serviceArea ? values.serviceArea : 'Service Area'}  <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <hr></hr>
            <div className="gutter-example">
              <h3>DEFAULT MAP ZOOM AREA</h3>
              <Row gutter={16}>
                <Col className="gutter-row" span={12} id={("organization" + values._id)}>
                  <p>ORGANIZATION</p>
                  <Dropdown trigger={['click']} overlay={menu}
                    getPopupContainer={() => document.getElementById(("organization" + values._id)) as HTMLElement}>
                    <Button>
                      {values.organization ? values.organization : 'Organization'}  <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <br />
            <div className="gutter-example">
              <Row gutter={16}>
                <Col className="gutter-row" span={16}>
                <p><i><b>DATE REGISTERED:</b>&nbsp;
                { moment(values.createdAt).format("LL").toUpperCase() } AT {moment(values.createdAt).format("LT")}</i></p>
                </Col>
              </Row>
            </div>
            <br />
            <span style={{ color: messageError.color }}>&nbsp;&nbsp; {messageError.message}</span>
            <div className="user-footer">
              {values.status === 'approved' ? <Button className="btn-d" onClick={() => deleteUser(user._id + "/deleted")}>Delete</Button> : 
               values.status === 'deleted' ? <Button className="btn-d" onClick={() => {
                 console.log('USER',user._id);
                 deleteUserDatabase(user._id);
               } }>Delete</Button> : <Button className="btn-d"></Button> }
              <Button style={{ color: '#28C499' }} className="btn-s colorButton" block htmlType="submit">Save</Button>
            </div>
          </Form>
        </Panel>
      </Collapse>
      <Alert save={result} visible={modal} setVisible={setModal} message={message} />
      {/* <Alert save={deleteUserDatabase(user._id)} visible={modalDelete} setVisible={setModalDelete} message={messageDelete} /> */}
    </>
  )
}
