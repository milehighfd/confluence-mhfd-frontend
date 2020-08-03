import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, Menu, Dropdown } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { ROLES, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, DROPDOWN_ORGANIZATION, CONSULTANT, CONSULTANT_CONTRACTOR, ORGANIZATION, OTHER, STAFF } from "../../constants/constants";
import { Redirect, Link } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_SIGN_UP } from "../../constants/validation";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import "../Login/Login.scss"


export default ({ replaceAppUser, getUserInformation }: { replaceAppUser: Function, getUserInformation: Function }) => {
  const roles = ROLES;
  const validationSchema = VALIDATION_SIGN_UP;
  const keyCaptcha = SERVER.CAPTCHA;
  const [message, setMessage] = useState({ message: '', color: '#28C499' });
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [targetButton, setTargetButton] = useState('staff');
  const [organization, setOrganization] = useState(ROLES[0].options);
  const [other, setOther] = useState({value: '', visible: false});
  const menu = () => {
    return (values.designation === GOVERNMENT_STAFF) ?
      <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
          values.organization = event.item.props.children.props.children;
          const auxTitle = event.item.props.children.props.children;
          setTitle(auxTitle);
        }}>
          <Menu.ItemGroup key="g1">
            {/* <label className="label-sg">{'Regional Agency'}</label> */}
            {ORGANIZATION.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
          </Menu.ItemGroup>
        {/* <Menu.ItemGroup key="g1">
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
        </Menu.ItemGroup> */}
      </Menu> : 
      (values.designation === CONSULTANT) ? 
      <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
          values.organization = event.item.props.children.props.children;
          const auxTitle = event.item.props.children.props.children;
          setTitle(auxTitle);
        }}>
        <Menu.ItemGroup key="g1">
          {/* <label className="label-sg">{'Regional Agency'}</label> */}
          {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item onClick={() => {
            const auxOther = {...other};
            auxOther.value = '';
            auxOther.visible = false;
            setOther(auxOther);
          }} key={index + "g1"}><span>{item}</span></Menu.Item>))}
          <Menu.Item onClick={() => {
            const auxOther = {...other};
            auxOther.visible = true;
            setOther(auxOther);
          }} key={"other"}><span>Other</span></Menu.Item>
        </Menu.ItemGroup>
      </Menu> :
      <Menu className="js-mm-00 sign-menu-organization"
        onClick={(event) => {
          values.organization = event.item.props.children.props.children;
          const auxTitle = event.item.props.children.props.children;
          setTitle(auxTitle);
        }}>
        <Menu.ItemGroup key="g1">
          {/* <label className="label-sg">{'Regional Agency'}</label> */}
          {DROPDOWN_ORGANIZATION.REGIONAL_AGENCY_PUBLIC.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
        </Menu.ItemGroup>
      </Menu>
  };
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      designation: 'staff',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organization: 'Mile High Flood District',
      recaptcha: '',
      zoomarea: ''
    },
    validationSchema,
    onSubmit(values: { firstName: string, lastName: string, email: string, password: string, designation: string, organization: string, recaptcha: string, zoomarea: string }) {
      if(values.designation === CONSULTANT && values.organization === 'Other'){
        if(!other.value) {
          return;
        }
        values.organization = other.value;
      }
      setTitle(title);
      values.zoomarea = values.designation === GOVERNMENT_STAFF? values.organization: 'Mile High Flood Control District Boundary';
      datasets.postData(SERVER.SIGN_UP, values).then(res => {
        if (res?.token) {
          const auxMessage = { ...message };
          auxMessage.message = 'Successful Registration';
          setMessage(auxMessage);
          localStorage.setItem('mfx-token', res.token);
          replaceAppUser(res.user);
          getUserInformation();
          setRedirect(true);
        } else {
          const auxMessage = { ...message };
          auxMessage.message = res.error;
          auxMessage.color = 'red';
          setMessage(auxMessage);
        }
      })
    }
  });
  if (redirect) {
    return <Redirect to="/map" />
  }

  return <Layout style={{ background: '#fff' }}>
    <Row>
      <CarouselAutoPlayView />
      <Col span={11} className="login-hh">
        <div className="login-step01">
          <div>
            <Form style={{ width: '420px' }} className="login-form" onSubmit={handleSubmit} autoComplete="off">
              <h1>
                Sign Up!
              </h1>
              <Row style={{ marginTop: '15px' }}>
                <span className="loginLabels">Define your user role:</span>
                <Col className="signup">
                  {roles.map((role: { value: string, style: string, title: string, options: Array<string> }, index: number) => {
                    return <Button key={index} style={{ width: role.style }} className={targetButton === role.value ? 'button-dropdown' : ''} onClick={() => {
                      values.designation = role.value;
                      values.organization = role.value === STAFF ? 'Mile High Flood District':'';
                      const auxTitle = role.value;
                      setTargetButton(role.value);
                      setOrganization(role.options);
                      setTitle(auxTitle);
                      const auxOther = {...other};
                      auxOther.value = '';
                      auxOther.visible = false;
                      setOther(auxOther);
                    }}>{role.title}</Button>
                  })}
                </Col>
              </Row>
              <div className="group">
                <input placeholder="First Name" type="text" name="firstName" onChange={handleChange}
                  style={(errors.firstName && touched.firstName) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
                <span className="highlight"></span>
                <span className="bar"></span>
                {/* <label className={values.firstName ? "login-field-top":"login-field-botton"}>First Name</label>*/}
              </div>
              <div className="group">
                <input placeholder="Last Name" type="text" name="lastName" onChange={handleChange}
                  style={(errors.lastName && touched.lastName) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
                <span className="highlight"></span>
                <span className="bar"></span>
                {/*<label  className={values.lastName ? "login-field-top":"login-field-botton"} >Last Name</label>*/}
              </div>
              <div className="group">
                <input placeholder="Email" type="email" name="email" onChange={handleChange}
                  style={(errors.email && touched.email) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
                <span className="highlight"></span>
                <span className="bar"></span>
                {/*<label  className={values.email ? "login-field-top":"login-field-botton"} >Email</label>*/}
              </div>
              {(values.designation !== OTHER && values.designation !== STAFF) ? <div className="group btn-up">
                <div id="sign-up-organization">
                  <Dropdown overlay={menu} getPopupContainer={() => document.getElementById("sign-up-organization") as HTMLElement}>
                    <Button className={values.organization ? 'text-button-dropdown' : ''} style={(errors.organization && touched.organization) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} >
                      {values.organization ? values.organization : 'Organization'}
                      <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </div>
                {other.visible && <input placeholder="Organization" type="text" onChange={(e) => {
                  const auxOther = {...other};
                  auxOther.value = e.target.value;
                  setOther(auxOther);
                }}
                  style={(!other.value) ? { borderBottom: 'solid red 1px', paddingLeft: '10px'} : { paddingLeft: '10px' }} />}
              </div>: values.designation !== STAFF ? <div className="group">
                <input placeholder="Organization" type="text" name="organization" onChange={handleChange}
                  style={(errors.organization && touched.organization) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
                <span className="highlight"></span>
                <span className="bar"></span>
              </div>: ''}
              <div className="group">
                <input type="password" placeholder="Password" name="password" onChange={handleChange}
                  style={(errors.password && touched.password) ? { borderBottom: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} />
                <span className="highlight"></span>
                <span className="bar"></span>
                {/*<label  className={values.password ? "login-field-top":"login-field-botton"}>Password</label>*/}
              </div>
              <ReCAPTCHA
                sitekey={"" + keyCaptcha}
                onChange={(event) => {
                  values.recaptcha = '' + (event !== 'null' ? event : '');
                }}
              />
              <div>
                <span style={{ color: message.color }}>&nbsp;&nbsp; {message.message}</span>
              </div>
              <Form.Item style={{ marginBottom: '15px' }}>
                <Button className="buttonLogin" block htmlType="submit" >
                  Sign Up
                </Button>
              </Form.Item>
              <div style={{ textAlign: "center" }}>
                <span> I have an account</span>
                <Link to={'/login'} className="login-form-forgot">
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  </Layout>
}
