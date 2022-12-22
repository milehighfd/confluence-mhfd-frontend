import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Radio, Row, Select, Table, Tabs } from 'antd';

const { Option } = Select;
const ProfileUser = ({record}:{record:any}) => {
  
  return <>
    <div className="profile-user">
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 2 }} style={{paddingRight:'20px'}}>
          <h3>PROFILE</h3>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 22 }} style={{paddingRight:'20px'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingRight:'20px'}}>
          <h1>FIRST NAME</h1>
          <Input placeholder="Admin" style={{marginBottom: '15px'}}/>
          <h1>EMAIL</h1>
          <Input placeholder="admin@admin.com" style={{marginBottom: '15px'}} />
          <h1>PHONE NUMBER</h1>
          <Input placeholder="Phone" style={{marginBottom: '15px'}}/>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingLeft:'20px'}}>
          <h1>LAST NAME</h1>
          <Input placeholder="Admin" style={{marginBottom: '15px'}}/>
          <h1>EMAIL</h1>
          <Input placeholder="MHFD Admin" style={{marginBottom: '15px'}}/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 4 }} style={{paddingRight:'20px'}}>
          <h3>USER DESIGNATION</h3>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 20 }} style={{paddingRight:'20px'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingRight:'20px', display:'flex'}}>
          <Col xs={{ span: 24}} lg={{ span: 12 }} style={{paddingRight:'20px'}}>
            <Radio style={{marginBottom: '10px'}} >MHFD Senior Manager</Radio><br />
            <Radio style={{marginBottom: '10px'}}>MHFD Staff</Radio><br />
            <Radio style={{marginBottom: '10px'}}>Local Government</Radio>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 12 }} style={{paddingLeft:'20px'}}>
            <Radio style={{marginBottom: '10px'}}>Consultant / Contractor</Radio><br />
            <Radio style={{marginBottom: '10px'}}>Other</Radio>
          </Col>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 2 }} style={{paddingRight:'20px'}}>
          <h3>AREAS</h3>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 22 }} style={{paddingRight:'20px'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingRight:'20px'}}>
          <h1>AREAS</h1>
          <Select defaultValue="None" style={{ width: '100%', marginBottom:'10px' }}>
            <Option value="None">None</Option>
          </Select>
          <h1>SERVICE AREA</h1>
          <Select defaultValue="Cherry Creek Service Area" style={{ width: '100%', marginBottom:'10px' }}>
            <Option value="Cherry Creek Service Area">Cherry Creek Service Area</Option>
          </Select>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingLeft:'20px'}}>
          <h1>COUNTY</h1>
          <Select defaultValue="Doughlas" style={{ width: '100%', marginBottom:'10px' }}>
            <Option value="Doughlas">Doughlas</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <br />
      <h3>DEFAULT MAP ZOOM AREA</h3>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 9 }} style={{paddingRight:'20px'}}>
          <Select defaultValue="Mile Highg Flood District" style={{ width: '100%', marginBottom:'10px' }}>
            <Option value="Mile Highg Flood District">Mile Highg Flood District</Option>
          </Select>
          <h1 style={{fontStyle:'italic'}}>Date Registered: JUNE 1, 2020 AT 8:34 AM</h1>
        </Col>
      </Row>
      <br />
      <div style={{textAlign:"end"}}>
        <Button className="btn-profile-list" style={{marginRight:'20px', borderColor:'transparent'}}>
          Cancel
        </Button>
        <Button className="btn-purple btn-profile-list">
          Save
        </Button>
      </div>
    </div>
  </>
};

export default ProfileUser;