import React, { useState } from "react";
import { Layout, Row, Col, Form, Button } from 'antd';
import { useLocation, Redirect } from "react-router-dom";
import CarouselAutoPlayView from "../Shared/CarouselAutoPlay/CarouselAutoPlayView";
import * as Yup from "yup";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
     .oneOf([Yup.ref('password'), null])
     .required('Password confirm is required')
});
export default () => {
  const [redirect, setRedirect] = useState(false);

  const location = useLocation().pathname;
  const url = location.split('/');
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      id: url[2],
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit(values: {id: string, password: string, passwordConfirm: string}) {
      const result = datasets.postData(SERVER.RESET_PASSWORD, values).then(res => {
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
          
          <Form style={{ width: '420px' }}  className="login-form" onSubmit={handleSubmit} >
        <h1>
            Reset your password
        </h1>
          <Row className="resetText">
            <p>Enter a new password to reset the password for your account
              {/* ,<span> Shea Thomas</span> */}
              </p>
          </Row>
        <div className="group">
          <input type="password" name="password" onChange={handleChange} required/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>New Password</label>
        </div>
        <div className="group">
          <input type="password" name="passwordConfirm" onChange={handleChange} required/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Confirm New Password</label>
        </div>
        <div>
          <Button className="buttonLogin" block htmlType="submit">
              Set New Password
          </Button>
        </div>
        </Form>
        </div>
      </Col>
    </Row>
  </Layout>
}
