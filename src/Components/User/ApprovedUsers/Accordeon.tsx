import React, { useState } from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio, Form } from 'antd';

const { Panel } = Collapse;

export default ({ menu, user, index, pos,  handleDropdowns, handleRadioButton, saveUser, deleteUser } : any) => {
    const [switchTo, setSwitchTo] = useState<boolean>(user.activated);

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
              <Switch checked={switchTo} onChange={handleSwitchButton} />
            </div>
          </Col>
          <Col span={1} style={{textAlign: 'right'}}><img src="Icons/icon-20.svg" alt=""/></Col>
        </Row>
      );
    return (
        <>
        <Form>
            <Collapse accordion className="user-tab">
            <Panel header="" key="1" extra={genExtra()}>
                <div className="gutter-example">
                <h3>PROFILE</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="First Name" value={user.firstName} /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Last Name" value={user.lastName} /></Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="Email" value={user.email} /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Organization" value={user.organization} /></Col>
                </Row>
                </div>
                <hr></hr>
                <div className="gutter-example">
                <h3>USER DESIGNATION</h3>
                <Row gutter={16}>
                    <Radio.Group name="designation" value={user.designation} onChange={(e) => handleRadioButton(e, index)} style={{width:'100%'}}>
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
                        {user.city ? user.city : 'City'} <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>

                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "country"})}>
                        <Button>
                        {user.country ? user.country : 'Country'}  <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "serviceArea"})}>
                    <Button>
                        {user.serviceArea ? user.serviceArea : 'Service Area'}  <img src="Icons/icon-12.svg" alt=""/>
                    </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>
                <div className="user-footer">
                {user.activated ? <Button className="btn-d" onClick={() => deleteUser(user._id)}>Delete</Button> : ''}
                <Button className="btn-s" onClick={() => saveUser(switchTo, index)}>Save</Button>
                {/*<Button className="btn-s btn-s-01" onClick={() => saveUser(switchTo, index)}>Save</Button>*/}
                </div>
            </Panel>
            </Collapse>
        </Form>
        </>
    )
}
