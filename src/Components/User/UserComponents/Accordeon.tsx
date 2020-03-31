import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio, Form, Menu, Result } from 'antd';
import { useFormik } from 'formik';

import { CITIES, SERVICE_AREA, COUNTIES, RADIO_ITEMS } from "../../../constants/constants";
import { VALIDATION_USER } from "../../../constants/validation";
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';
import RadioItemsView from './RadioItemsView';
import MenuAreaView from './MenuAreaView';
import MenuOrganizationView from './MenuOrganizationView';
import { User } from '../../../Classes/TypeList';
import Alert from '../../Shared/Alert';


export default ({ user, pos, saveUser, deleteUser }: {user: User, pos: number, saveUser: Function, deleteUser: Function}) => {
  const validationSchema = VALIDATION_USER;
  const { Panel } = Collapse;
  
  const visible = {
    visible: false
  };
  const [modal, setModal] = useState(visible);
  const [switchTo, setSwitchTo] = useState<boolean>(user.activated);
  const [designation, setDesignation] = useState<string>(user.designation);
  const [title, setTitle] = useState<string>('');
  const [initialValues, setInitialValues] = useState(user);
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
  }, [user]);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values: User) {
      values.designation = designation;
      const auxState = {...visible};
      auxState.visible = true;
      setModal(auxState);
    }
  });

  const result = () => {
    const auxState = {...visible};
    auxState.visible = false;
    setModal(auxState);
    datasets.putData(SERVER.EDIT_USER + '/' + user._id, values, datasets.getToken()).then(res => {
      if (res?._id) {
        saveUser();
      }
    });
  } 
  const message = 'Are you sure you want to update the user ' + values.firstName + ' ' + values.lastName + '?';
  const handleSwitchButton = (checked: boolean) => {
    setSwitchTo(checked);
    setTitle(user._id);
    deleteUser(user._id);
  }

  const genExtra = () => (
    <Row className="user-head" type="flex" justify="space-around" align="middle">
      <Col span={19}>
        <h6>{pos + '. ' + user.firstName + ' ' + user.lastName}</h6>
        {/* <span>(Organization - Service Area - User Designation)</span> */}
      </Col>
      <Col span={3} style={{ textAlign: 'right' }}>
        <div>
          <Switch className={'switch-options'} checked={user.activated} onChange={handleSwitchButton} />
        </div>
      </Col>
      <Col span={1} style={{ textAlign: 'right' }}><img src="Icons/icon-20.svg" alt="" /></Col>
    </Row>
  );

  return (
    <>
      <Collapse accordion className="user-tab">

        <Panel header="" key="1" extra={genExtra()}>
          <Form onSubmit={handleSubmit}>
            <div className="gutter-example">
              <h3>PROFILE</h3>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Input placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange} 
                    style={(errors.firstName && touched.firstName) ? {border: "solid red"}:{}} />
                </Col>
                <Col className="gutter-row" span={12}>
                  <Input placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange} 
                    style={(errors.lastName && touched.lastName) ? {border: "solid red"}:{}}/>
                </Col>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Input placeholder="Email" value={values.email} name="email" onChange={handleChange} 
                  style={(errors.email && touched.email) ? {border: "solid red"}:{}}/>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={MenuOrganizationView(values, setTitle)}>
                    <Button style={(errors.organization && touched.organization) ? {border: "solid red"}:{}}>
                      {values.organization ? values.organization : 'Organization'}  <img src="Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
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
                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={MenuAreaView(CITIES, 'city', values, setTitle)}>
                    <Button style={(errors.city && touched.city && !values.city ) ? {border: "solid red"}:{}}>
                      {values.city ? values.city : 'City'} <img src="Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>

                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={MenuAreaView(COUNTIES, 'county', values, setTitle)}>
                    <Button style={(errors.county && touched.county && !values.county ) ? {border: "solid red"}:{}}>
                      {values.county ? values.county : 'County'}  <img src="Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={MenuAreaView(SERVICE_AREA, 'serviceArea', values, setTitle)}>
                    <Button style={{border: (errors.serviceArea && touched.serviceArea && !values.serviceArea ) ? "solid red":""}}>
                      {values.serviceArea ? values.serviceArea : 'Service Area'}  <img src="Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <div className="user-footer">
              {values.activated ? <Button className="btn-d" onClick={() => deleteUser(user._id)}>Delete</Button> : <Button className="btn-d"></Button>}
              <Button style={{color: '#28C499'}} className="btn-s colorButton" block htmlType="submit">Save</Button>
            </div>
          </Form>
        </Panel>
      </Collapse>
      <Alert save={result} visible={modal} setVisible={setModal} message={message} />
    </>
  )
}
