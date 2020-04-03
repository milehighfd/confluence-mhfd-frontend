import React, { useState } from "react";
import { Layout, Row, Col, Form, Button, } from 'antd';
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import ReCAPTCHA from "react-google-recaptcha";
const keyCaptcha = SERVER.CAPTCHA;
const validationSchema = Yup.object().shape({
  email: Yup.string()      
    .email()
    .required('Required'),
  recaptcha: Yup.string()
    .min(5)
    .required()
});
export default () => {
  const [message, setMessage] = useState({message: '', color: '#28C499'});
  const [redirect, setRedirect] = useState(false);
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: {email: string, recaptcha: string}) {
      const auxMessage = {...message};
      auxMessage.message = 'The request was sent to reset your email password, this may take a few minutes';
      auxMessage.color = '#28C499';
      setMessage(auxMessage);
      const result = datasets.postData(SERVER.RECOVERY_PASSWORD, values).then(res => {
        if(!res.error) {
          setRedirect(true);
        } else {
          const auxMessage = {...message};
          auxMessage.message = res.error;
          auxMessage.color = 'red';
          setMessage(auxMessage);
        }
      })
    }
  });
  
  if (redirect) {
    return <Redirect to="/login" />
  }
  return <Layout style={{ background: '#fff' }}>
    <Row>
      <CarouselAutoPlayView />
        <Col span={11} className="login-hh">
          <div className="login-step01">
            <div>
            <Row className="returnText">
              <Col span={12}>
              <Button shape="circle" icon="arrow-left" onClick={ () => setRedirect(true)} /><span>Back</span>
              </Col>
            </Row>
            </div>
            <Form style={{ width: '420px' }}  className="login-form" onSubmit={handleSubmit}>
              <h1>
                  Reset your password
              </h1>
              <Row className="resetText">
                <p>Enter your email address below and we’ll send you a link to reset your password.</p>
              </Row>
              <div className="group">
                <input type="email" name="email" onChange={handleChange}
                  style={(errors.email && touched.email) ? {border: 'solid red 1px', paddingLeft: '10px'}:{paddingLeft: '10px'}}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label style={(values.email) ? {top: "-20px"}:{top: "10px"}}>Email</label>
              </div>
              <ReCAPTCHA
                sitekey={"" + keyCaptcha}
                onChange={(event) => {
                  values.recaptcha = '' + (event !== 'null' ? event : '');
                }}
              />
              <div style={{height: '35px'}}>
                <span style={{color: message.color}}>&nbsp;&nbsp; {message.message}</span>
              </div>
              <Form.Item>
                <Button className="buttonLogin" block htmlType="submit">
                    Send Password Reset Email
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
    </Row>
  </Layout>
}
