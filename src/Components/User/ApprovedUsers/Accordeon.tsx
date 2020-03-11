import React, { useState } from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio } from 'antd';

const { Panel } = Collapse;

export default ({ menu, user, index, pos,  handleDropdowns, handleRadioButton, saveUser, deleteUser } : any) => {
    const [switchTo, setSwitchTo] = useState<boolean>(user.approved);

    const handleSwitchButton = (checked : boolean) => {
        setSwitchTo(checked);
    }

    const genExtra = () => (
        <Row className="user-head" type="flex" justify="space-around" align="middle">
          <Col span={19}>
            <h6>{ pos + '. ' + user.profile.name + ' ' + user.profile.lastName }</h6>
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
            <Collapse accordion className="user-tab">
            <Panel header="" key="1" extra={genExtra()}>
                <div className="gutter-example">
                <h3>PROFILE</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="First Name" value={user.profile.name} /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Last Name" value={user.profile.lastName} /></Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="Email" value={user.profile.email} /></Col>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "organization"})}>
                        <Button>
                            {user.profile.organization?user.profile.organization:'Organization'} <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>

                <hr></hr>

                <div className="gutter-example">
                <h3>USER DESIGNATION</h3>
                <Row gutter={16}>
                    <Radio.Group name="designation" value={user.designation} onChange={(e) => handleRadioButton(e, index)} style={{width:'100%'}}>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'MHFD Admin'}></Radio></p>
                            <div className="user-d"><h6>MHFD Admin</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'MHFD Staff'}></Radio></p>
                            <div className="user-d"><h6>MHFD Staff</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'Local Government Admin'}></Radio></p>
                            <div className="user-d">
                            <h6>Local </h6>
                            <h6>Government Admin</h6>
                            </div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'Local Government'}></Radio></p>
                            <div className="user-d">
                            <h6>Local</h6>
                            <h6>Government</h6>
                            </div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'Consultant/Contractor'}></Radio></p>
                            <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                        </div>
                        </Col>
                        <Col span={4}>
                        <div className="user-card">
                            <p><Radio value={'Other'}></Radio></p>
                            <div className="user-d"><h6>Other</h6></div>
                        </div>
                        </Col>
                    </Radio.Group>
                </Row>
                </div>

                <hr></hr>

                <div className="gutter-example">
                <h3>PROFILE</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "city"})}>
                        <Button>
                        {user.areas.city?user.areas.city:'City'} <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>

                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "country"})}>
                        <Button>
                        {user.areas.country?user.areas.country:'Country'}  <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu({handleDropdowns, index, id: "serviceArea"})}>
                    <Button>
                        {user.areas.serviceArea?user.areas.serviceArea:'Service Area'}  <img src="Icons/icon-12.svg" alt=""/>
                    </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>
                <div className="user-footer">
                <Button className="btn-d" onClick={() => deleteUser(index)}>Delete</Button>
                <Button className="btn-s" onClick={() => saveUser(switchTo, index)}>Save</Button>
                </div>
            </Panel>
            </Collapse>
        </>
    )
}
