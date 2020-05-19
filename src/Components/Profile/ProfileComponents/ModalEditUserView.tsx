import React, { useState, useEffect } from "react";
import { Modal, Row, Input, Dropdown, Col, Button, Menu, Form } from "antd";
import { useFormik } from "formik";

import { User } from '../../../Classes/TypeList';
import MenuAreaView from "../../User/UserComponents/MenuAreaView";

import { VALIDATION_USER_PROFILE } from "../../../constants/validation";
import { ADMIN, STAFF, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, OTHER, ORGANIZATION, JURISDICTION, CONSULTANT_CONTRACTOR, CITIES, COUNTIES, SERVICE_AREA, RADIO_ITEMS } from "../../../constants/constants";


export default ({ user, updateUserInformation }: { user: User, updateUserInformation: Function }) => {
  const initialValues ={...user};
  const [organization, setOrganization] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');
  const [ role, setRole ] = useState({ name: '', value: ''});
  const asign = () => {
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
    values.zipCode = user.zipCode;
    const auxOrganization = (values.designation === ADMIN || values.designation === STAFF) ? ORGANIZATION :
                             (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF ) ? JURISDICTION : CONSULTANT_CONTRACTOR;
    setOrganization([...auxOrganization]);
    setRole(RADIO_ITEMS.filter(element => element.value === (user.designation))[0]? {...RADIO_ITEMS.filter(element => element.value === (user.designation))[0]} : { name: '', value: ''});
  }
  useEffect(() => {
    asign();
  }, [user]);
  const validationSchema = VALIDATION_USER_PROFILE;

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values: User) {
      updateUserInformation(values);
      handleCancel();
    }
  });

  const menu = (
    <Menu className="js-mm-00 sign-menu">
      {organization.map((organization: string, index: number) => {
        return <Menu.Item key={index} className="organization-items" onClick={() => {
          values.organization = organization;
          const auxTitle = organization;
          console.log(title);
          setTitle(auxTitle);
        }}>
          <span className="organization-items-text">
            {organization}
          </span>
        </Menu.Item>
      })}
    </Menu>);
  const stateValue = {
    visible: false
  }
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = { ...state };
    auxState.visible = true;
    setState(auxState);
  };

  const handleOk = () => {
    const auxState = { ...state };
    auxState.visible = false;
    setState(auxState);
  };

  const handleCancel = () => {
    const auxState = { ...state };
    auxState.visible = false;
    setState(auxState);
  };
  return <div className="edit-profile">
    <Button onClick={showModal}>
      <img src="/Icons/icon-72.svg" alt="" height="18px" /> Edit Profile
     </Button>
    <Modal
      centered
      visible={state.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-edit"
      width="700px"
    >
      <Form onSubmit={handleSubmit}>
        <h4>Edit Profile</h4>
        <div className="gutter-example">
          <h6>PERSONAL INFO</h6>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Input placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange}
                style={(errors.firstName && touched.firstName) ? { border: "solid red 1px" } : {}} />
            </Col>
            <Col className="gutter-row" span={12}>
              <Input placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange}
                style={(errors.lastName && touched.lastName) ? { border: "solid red 1px" } : {}} />
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Input placeholder="Email" value={values.email} name="email" onChange={handleChange}
                style={(errors.email && touched.email) ? { border: "solid red 1px" } : {}} />
            </Col>
            <Col className="gutter-row" span={12}>
              <Input placeholder="Phone" value={values.phone} name="phone" onChange={handleChange}
                style={(errors.phone && touched.phone) ? { border: "solid red 1px" } : {}} />
            </Col>
          </Row>
        </div>

        <hr></hr>
        <div className="gutter-example">
          <h6>USER DESIGNATION</h6>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}><Input placeholder="Account Type" value={role.name} disabled /></Col>
            <Col className="gutter-row" span={12}>
              {values.designation !== OTHER ? <div id="sign-up-organization">
                <Dropdown overlay={menu} getPopupContainer={() => document.getElementById("sign-up-organization") as HTMLElement}>
                  <Button style={(errors.organization && touched.organization) ? { border: 'solid red 1px', paddingLeft: '10px' } : { paddingLeft: '10px' }} >
                    {values.organization ? values.organization : (values.designation === ADMIN || values.designation === STAFF) ? 'Organization' :
                          (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ? 'Jurisdiction' : 'Consultant/Contractor'}
                    <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </div>
                : (
                  <Input placeholder="Organization" value={values.organization} name="organization" onChange={handleChange}
                    style={(errors.organization && touched.organization) ? { border: "solid red 1px" } : {}} />
                )}
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}><Input placeholder="Title" value={values.title} name="title" onChange={handleChange}
              style={(errors.title && touched.title) ? { border: "solid red 1px" } : {}} /></Col>
            <Col className="gutter-row" span={12}><Input placeholder="Zip Code" value={values.zipCode} name="zipCode" onChange={handleChange}
              style={(errors.zipCode && touched.zipCode) ? { border: "solid red 1px" } : {}} /></Col>
          </Row>
        </div>

        <hr></hr>
        <div className="gutter-example">
          <h6>Areas of Interest</h6>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Dropdown overlay={MenuAreaView(CITIES, 'city', values, setTitle)}>
                <Button style={(errors.city && touched.city && !values.city) ? { border: "solid red 1px" } : {}}>
                  {values.city ? values.city : 'City'} <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>

            <Col className="gutter-row" span={12}>
              <Dropdown overlay={MenuAreaView(COUNTIES, 'county', values, setTitle)}>
                <Button style={(errors.county && touched.county && !values.county) ? { border: "solid red 1px" } : {}}>
                  {values.county ? values.county : 'County'}  <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Dropdown overlay={MenuAreaView(SERVICE_AREA, 'serviceArea', values, setTitle)}

                placement="bottomLeft">
                <Button style={{ border: (errors.serviceArea && touched.serviceArea && !values.serviceArea) ? "solid red 1px" : "" }}>
                  {values.serviceArea ? values.serviceArea : 'Service Area'}  <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <br></br>
        <div className="gutter-example" style={{ textAlign: 'center' }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Button className="cancel" onClick={handleCancel}>Cancel</Button>
              <Button className="save" block htmlType="submit">Save</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  </div>
}
