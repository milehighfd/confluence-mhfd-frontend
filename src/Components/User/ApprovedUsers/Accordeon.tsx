import React, { useState } from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio, Form } from 'antd';
import { USER } from "../../../constants/constants";
import { VALIDATION_USER } from "../../../constants/validation";
import { useFormik } from 'formik';
import * as datasets from "../../../Config/datasets";
import { SERVER } from '../../../Config/Server.config';


const { Panel } = Collapse;
const initialValues = USER;
const validationSchema = VALIDATION_USER;
export default ({ menu, user, index, pos, saveUser, handleDropdowns, deleteUser } : any) => {
    const [switchTo, setSwitchTo] = useState<boolean>(user.activated);
    const [designation, setDesignation] = useState<string>(user.designation);
    initialValues._id = user._id;
    initialValues.firstName = user.firstName;
    initialValues.lastName = user.lastName;
    initialValues.activated = user.activated;
    initialValues.organization = user.organization;
    initialValues.name = user.name;
    initialValues.designation = user.designation;
    initialValues.email = user.email;
    initialValues.city = user.city ? user.city : 'city';
    initialValues.county = user.county ? user.county : 'County';
    initialValues.serviceArea = user.serviceArea ? user.serviceArea : 'serviceArea';
    const { values, handleSubmit, handleChange } = useFormik({
        initialValues,
        validationSchema,
        onSubmit(values: {_id: string, firstName: string, lastName: string, activated: boolean, organization: string, name: string, designation: string, email: string, city: string, county: string, serviceArea: string}) {
            values.designation = designation;
            const result = datasets.putData(SERVER.EDIT_USER + '/' + user._id, values, datasets.getToken()).then( res => {
                if (res?._id) {
                    saveUser();
                }
            });
        }
    });

    const handleSwitchButton = (checked : boolean) => {
        setSwitchTo(checked);
    }

    const genExtra = () => (
        <Row className="user-head" type="flex" justify="space-around" align="middle">
          <Col span={19}>
            <h6>{ pos + '. ' + user.firstName + ' ' + user.lastName }</h6>
            <span>(Organization - Service Area - User Designation)</span>
          </Col>
          <Col span={3} style={{textAlign: 'right'}}>
            <div>
              <Switch className={'switch-options'} checked={switchTo} onChange={handleSwitchButton} />
            </div>
          </Col>
          <Col span={1} style={{textAlign: 'right'}}><img src="Icons/icon-20.svg" alt=""/></Col>
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
                    <Col className="gutter-row" span={12}><Input placeholder="First Name" value={values.firstName} name="firstName" onChange={handleChange} /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Last Name" value={values.lastName} name="lastName" onChange={handleChange} /></Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="Email" value={values.email} name="email" onChange={handleChange} /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Organization" value={values.organization} name="organization" onChange={handleChange} /></Col>
                </Row>
                </div>
                <hr></hr>
                <div className="gutter-example">
                <h3>USER DESIGNATION</h3>
                <Row gutter={16}>
                    <Radio.Group name="designation" value={designation} onChange={(event) => {
                            values.designation = event.target.value;
                            setDesignation(event.target.value);
                        }} style={{width:'100%'}}>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'admin'}></Radio></p>
                            <div className="user-d"><h6>MHFD Admin</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'staff'}></Radio></p>
                            <div className="user-d"><h6>MHFD Staff</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'government_admin'}></Radio></p>
                            <div className="user-d">
                            <h6>Local </h6>
                            <h6>Government Admin</h6>
                            </div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'government_staff'}></Radio></p>
                            <div className="user-d">
                            <h6>Local</h6>
                            <h6>Government</h6>
                            </div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'consultant'}></Radio></p>
                            <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'other'}></Radio></p>
                            <div className="user-d"><h6>Other</h6></div>
                        </div>
                        </Col>
                    </Radio.Group>
                </Row>
                </div>
                <hr></hr>
                <div className="gutter-example">
                <h3>AREAS</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "city"})}>
                        <Button>
                        {values.city ? values.city : 'City'} <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>

                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "county"})}>
                        <Button>
                        {values.county ? values.county : 'County'}  <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "serviceArea"})}>
                    <Button>
                        {values.serviceArea ? values.serviceArea : 'Service Area'}  <img src="Icons/icon-12.svg" alt=""/>
                    </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>
                <div className="user-footer">
                {values.activated ? <Button className="btn-d" onClick={() => deleteUser(values._id)}>Delete</Button> : ''}
                <Button className="btn-s" block htmlType="submit" >Save</Button>
                </div>
            </Form>
        </Panel>
    </Collapse>
    </>
    )
}
