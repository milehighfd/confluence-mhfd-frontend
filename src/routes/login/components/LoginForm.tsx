import React, { useState, useEffect } from 'react';
import { Form, Button, } from 'antd';
import { useFormik } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useProfileDispatch } from 'hook/profileHook';
import { useAppUserDispatch } from 'hook/useAppUser';
import { useMapDispatch } from 'hook/mapHook';
import { REQUIRED } from 'routes/login/components/constantsLogin';
import { GlobalMapHook } from 'utils/globalMapHook';
import CheckYourEmailModal from '../../sign-up/components/CheckYourEmailModal';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(REQUIRED),
  password: Yup.string()
    .min(2)
    .required(REQUIRED),
  recaptcha: Yup.string()
    .min(5)
    .required()
});

const LoginView = () => {
  const {
    replaceAppUser,
    saveUserInformation,
    resetAppUser,
    resetProfile,
    addNotifications
  } = useAppUserDispatch();
  const [emailModal, setEmailModal] = useState(false);
  const { resetMap } = useMapDispatch();
  const [emailOnBlur, setEmailOnBlur] = useState(false);
  const [passwordOnBlur, setPasswordOnBlur] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState({ message: '', color: '#28C499' });
  const { getGroupOrganization, resetTimesLogin } = useProfileDispatch();
  const { callMaps } = GlobalMapHook();
  useEffect(() => {
    resetMap();
    resetAppUser();
    resetProfile();
    getGroupOrganization();
  }, [resetAppUser, resetProfile, resetMap, getGroupOrganization]);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      recaptcha: ''
    },
    validationSchema,
    onSubmit(values: { email: string, password: string, recaptcha: string }) {
      datasets.postData(SERVER.LOGIN, values)
      .then(async res => {
        resetTimesLogin();
        if (res?.token) {
          callMaps();
          setMessage({
            message: 'Successful Connection',
            color: '#28C499'
          });
          localStorage.setItem('mfx-token', res.token);
          sessionStorage.removeItem('globalMap');
          await datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
            replaceAppUser(result);
            saveUserInformation(result)
          });
          await datasets.getData(SERVER.NOTIFICATIONS, datasets.getToken()).then(async result => {
            addNotifications(result);
          });
          setRedirect(true);
        } else if (res?.order === 'need_reset_and_confirm'){
          setEmailModal(true);
        } else {
          setMessage({
            message: 'Could not connect, check your email and password',
            color: 'red'
          });
        }
      })
    }
  });

  if (redirect) {
    return <Redirect to="/map" />
  }

  return (
    <>
      {
        !emailModal ? <Form className="login-form" onFinish={handleSubmit}>
          <img src="/Icons/Confluence-Color-Tagline.svg" alt="Confluence Logo" width="248px" />
          <div className="group-container">
            <div className="group">
              {
                (emailOnBlur || values.email.length > 0) && <label>Email Address</label>
              }
              <input
                placeholder="Email Address"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={() => setEmailOnBlur(false)}
                onClick={() => setEmailOnBlur(true)}
                style={(errors.email && touched.email) ? { borderBottom: 'solid red 1px' } : { paddingLeft: '10px' }}
                autoComplete="username"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              {
                (passwordOnBlur || values.password.length > 0) && <label>Enter Password</label>
              }
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={() => setPasswordOnBlur(false)}
                onClick={() => setPasswordOnBlur(true)}
                autoComplete="current-password"
                style={(errors.password && touched.password) ? { borderBottom: 'solid red 1px' } : { paddingLeft: '10px' }}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="marbot-4">
              <span>Don't have an account?</span>
              <Link
                to={'/pre-signup'}
                className="login-form-forgot"
              >
                Sign-Up
              </Link>
              <Link
                to={'/reset-password'}
                className="login-forgot"
              >
                Forgot Password?
              </Link>
              <br/><br/>
              <GoogleReCaptcha
                onVerify={(token: string) => {
                  values.recaptcha = '' + (token !== 'null' ? token : '');
                }}
              />
            </div>
            <span style={{ color: message.color }}>&nbsp;&nbsp; {message.message}</span>
            <Button className="btn-purple" block htmlType="submit">
              Login
            </Button>
          </div>
        </Form> :
        <CheckYourEmailModal
          email={values.email}
          isResetPassword
        />
    }
    </>
  );
};

export default LoginView;
