import React from 'react';
import { Row, Col, Collapse, Dropdown, Button, Input, Switch, Radio } from 'antd';

const { Panel } = Collapse;

export default ({ menu } : any) => {

    const genExtra = () => (
        <Row className="user-head" type="flex" justify="space-around" align="middle">
          <Col span={19}>
            <h6>1. Ronnie Gougers</h6>
            <span>(Organization - Service Area - User Designation)</span>
          </Col>
          <Col span={3} style={{textAlign: 'right'}}>
            <div>
              <Switch defaultChecked />
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
                    <Col className="gutter-row" span={12}><Input placeholder="First Name" /></Col>
                    <Col className="gutter-row" span={12}><Input placeholder="Last Name" /></Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}><Input placeholder="Email" /></Col>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu}>
                        <Button>
                        Organization <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>

                <hr></hr>

                <div className="gutter-example">
                <h3>USER DESIGNATION</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d"><h6>MHFD Admin</h6></div>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d"><h6>MHFD Staff</h6></div>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d">
                        <h6>Local </h6>
                        <h6>Government Admin</h6>
                        </div>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d">
                        <h6>Local</h6>
                        <h6>Government</h6>
                        </div>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d"><h6> Consultant/ Contractor</h6></div>
                    </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                    <div className="user-card">
                        <p><Radio></Radio></p>
                        <div className="user-d"><h6>Other</h6></div>
                    </div>
                    </Col>
                </Row>
                </div>

                <hr></hr>

                <div className="gutter-example">
                <h3>PROFILE</h3>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu}>
                        <Button>
                        User Designation <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>

                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu}>
                        <Button>
                        User Designation <img src="Icons/icon-12.svg" alt=""/>
                        </Button>
                    </Dropdown>
                    </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                    <Dropdown overlay={menu}>
                    <Button>
                        User Designation <img src="Icons/icon-12.svg" alt=""/>
                    </Button>
                    </Dropdown>
                    </Col>
                </Row>
                </div>
                <div className="user-footer">
                <Button className="btn-d">Delete</Button>
                <Button className="btn-s">Save</Button>
                </div>
            </Panel>
            </Collapse>
        </>
    )
}
