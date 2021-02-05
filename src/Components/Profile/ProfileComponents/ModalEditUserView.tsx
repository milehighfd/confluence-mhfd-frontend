import React, { useState, useEffect } from "react";
import { Modal, Row, Input, Dropdown, Col, Button, Menu, Form, Popover  } from "antd";
import { useFormik } from "formik";

import { User } from '../../../Classes/TypeList';
import MenuAreaView from "../../User/UserComponents/MenuAreaView";

import { VALIDATION_USER_PROFILE } from "../../../constants/validation";
import { ADMIN, STAFF, GOVERNMENT_ADMIN, GOVERNMENT_STAFF, ORGANIZATION, CONSULTANT_CONTRACTOR, CITIES, COUNTIES, SERVICE_AREA, RADIO_ITEMS, CONSULTANT, DROPDOWN_ORGANIZATION, OTHER } from "../../../constants/constants";

const content = (<div className="popoveer-00">Defines the Area-Of-Interest for the map and the respective projects and problems shown in the Map Gallery and My Confluence screens.</div>);

export default ({ user, updateUserInformation, isVisible, hideProfile, groupOrganization, getGroupOrganization }:
  { user: User, updateUserInformation: Function, isVisible: boolean, hideProfile: Function, groupOrganization: [], getGroupOrganization: Function }) => {
  const initialValues = { ...user };
  const [organization, setOrganization] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');
  const [role, setRole] = useState({ name: '', value: '' });
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
    values.zoomarea = user.zoomarea;
    const auxOrganization = (values.designation === ADMIN || values.designation === STAFF) ? CITIES :
      (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ? ORGANIZATION : CONSULTANT_CONTRACTOR;
    setOrganization([...auxOrganization]);
    setRole(RADIO_ITEMS.filter(element => element.value === (user.designation))[0] ? { ...RADIO_ITEMS.filter(element => element.value === (user.designation))[0] } : { name: '', value: '' });
  }
  useEffect(() => {
    asign();
    console.log(title, organization.length);
  }, [user]);
  useEffect(() => {
    console.log('my user is ', user);
    getGroupOrganization();
  }, []);
  const validationSchema = VALIDATION_USER_PROFILE;

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values: User) {
      await updateUserInformation(values);
      hideProfile();
      handleCancel();
    }
  });

  const menu = () => {
    return (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ?
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
            {CONSULTANT_CONTRACTOR.map((item: string, index: number) => (<Menu.Item key={index + "g1"}><span>{item}</span></Menu.Item>))}
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
  const menuZoom = () => {
    return <Menu className="js-mm-00 sign-menu-organization"
          onClick={(event) => {
            values.zoomarea = event.item.props.children.props.children;
            const auxTitle = event.item.props.children.props.children;
            setTitle(auxTitle);
          }}>
            <Menu.ItemGroup>
              {
                groupOrganization.map((item: {aoi: string, values: Array<{name: string}>}, index: number) => {
                  return <Menu.Item key={item.aoi}><span>{item.aoi}</span></Menu.Item>
                })
              }
            </Menu.ItemGroup>    
        </Menu>
  };
  const stateValue = {
    visible: isVisible ? isVisible : false
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
    asign();
    setState(auxState);
    hideProfile();
  };
  return <div className="edit-profile">
    <Button className="btn-opacity" onClick={showModal}>
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
              <p>FIRST NAME</p>
              <Input placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange}
                style={(errors.firstName && touched.firstName && !values.firstName) ? { border: "solid red 1px" } : {}} />
            </Col>
            <Col className="gutter-row" span={12}>
              <p>LAST NAME</p>
              <Input placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange}
                style={(errors.lastName && touched.lastName && !values.lastName) ? { border: "solid red 1px" } : {}} />
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <p>EMAIL</p>
              <Input disabled placeholder="Email" value={values.email} name="email" onChange={handleChange}
                style={(errors.email && touched.email && !values.email) ? { border: "solid red 1px" } : {}} />
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
          <h6>USER DESIGNATION</h6>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <p>ROLE</p>
              <Input placeholder="Account Type" value={role.name} disabled />
            </Col>
            <Col className="gutter-row" span={12}>
              <p>ORGANIZATION</p>
              {values.designation !== OTHER ? <div id="sign-up-organization">
                <Dropdown className={values.designation === ADMIN ? 'btn-disabled' : ''} disabled={values.designation === ADMIN} overlay={menu} getPopupContainer={() => document.getElementById("sign-up-organization") as HTMLElement}>
                  <Button style={{ paddingLeft: '10px' }} className="btn-borde" >
                    {values.organization ? values.organization : ((values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ? 'Local government' : 'Organization')}
                    <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </div> :
              <Input placeholder="Organization" value={values.organization} name="organization" onChange={handleChange} />}
            </Col>
          </Row>
        </div>

        <hr></hr>
        <div className="gutter-example">
          <h6>Areas of Interest</h6>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <p>CITY</p>
              <Dropdown overlay={MenuAreaView(CITIES, 'city', values, setTitle)}>
                <Button className="btn-borde">
                  {values.city ? values.city : 'City'} <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>

            <Col className="gutter-row" span={12}>
              <p>COUNTY</p>
              <Dropdown overlay={MenuAreaView(COUNTIES, 'county', values, setTitle)}>
                <Button className="btn-borde">
                  {values.county ? values.county : 'County'}  <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <p>SERVICE AREA</p>
              <Dropdown overlay={MenuAreaView(SERVICE_AREA, 'serviceArea', values, setTitle)}

                placement="bottomLeft">
                <Button className="btn-borde">
                  {values.serviceArea ? values.serviceArea : 'Service Area'}  <img src="/Icons/icon-12.svg" alt="" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="gutter-example">
          <h3>DEFAULT MAP ZOOM AREA <Popover content={content}><img src="/Icons/icon-19.svg" alt="" style={{marginTop:'-3px', cursor: 'pointer'}} /></Popover></h3>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              {/* <p>ORGANIZATION</p> */}
              <div id="sign-up-organization">
                <Dropdown placement="topCenter" overlay={menuZoom} getPopupContainer={() => document.getElementById("sign-up-organization") as HTMLElement}>
                  <Button className="btn-borde" style={{ paddingLeft: '10px' }} >
                    {values.zoomarea ? values.zoomarea : 'Default map zoom area'}
                    <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>

              </div>
            </Col>
            <Col className="gutter-row" span={3}>
                <Button className="btn-borde" onClick={() => {
                  values.zoomarea = (values.designation === GOVERNMENT_ADMIN || values.designation === GOVERNMENT_STAFF) ? values.organization : 'Mile High Flood District';
                  const auxTitle = 'Mile High Flood District';
                  setTitle(auxTitle);
                }} style={{padding: '0px', textAlignLast: 'center'}} >
                  Default
                </Button>
            </Col>
          </Row>
        </div>
        <br></br>
        <div className="gutter-example footer-modal" style={{ textAlign: 'center' }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
              <Button className="btn-purple" block htmlType="submit">Save</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  </div>
}
