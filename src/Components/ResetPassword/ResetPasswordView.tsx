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
  const [redirect, setRedirect] = useState(false);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: {email: string, recaptcha: string}) {
      const result = datasets.postData(SERVER.RECOVERY_PASSWORD, values).then(res => {
        if(res) {
          setRedirect(true);
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
                <input type="email" required name="email" onChange={handleChange}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>
              <ReCAPTCHA
                sitekey={"" + keyCaptcha}
                onChange={(event) => {
                  values.recaptcha = '' + (event !== 'null' ? event : '');
                }}
              />
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
