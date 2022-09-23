import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Radio, Row, Select, Table, Tabs } from 'antd';

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
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingRight:'20px'}}>
          <h1>FIRST NAME</h1>
          <Input placeholder="Admin" style={{marginBottom: '15px'}}/>
          <h1>EMAIL</h1>
          <Input placeholder="admin@admin.com" style={{marginBottom: '15px'}} />
          <h1>PHONE NUMBER</h1>
          <Input placeholder="Phone" style={{marginBottom: '15px'}}/>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingLeft:'20px'}}>
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
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingRight:'20px', display:'flex'}}>
          <Col xs={{ span: 24}} lg={{ span: 12 }} style={{paddingRight:'20px'}}>
            <Radio style={{marginBottom: '10px'}}>MHFD Senior Manager</Radio><br />
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
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingRight:'20px'}}>
          <h1>AREAS</h1>
          <Input placeholder="None" style={{marginBottom: '15px'}}/>
          <h1>SERVICE AREA</h1>
          <Input placeholder="Cherry Creek Service Area" style={{marginBottom: '15px'}} />
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingLeft:'20px'}}>
          <h1>COUNTY</h1>
          <Input placeholder="Doughlas" style={{marginBottom: '15px'}}/>
        </Col>
      </Row>
      <br />
      <br />
      <h3>DEFAULT MAP ZOOM AREA</h3>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 10 }} style={{paddingRight:'20px'}}>
          <Input placeholder="Mile Highg Flood District" style={{marginBottom: '15px'}}/>
          <h1 style={{fontStyle:'italic'}}>Date Registered: JUNE 1, 2020 AT 8:34 AM</h1>
        </Col>
      </Row>
      <br />
      <div style={{textAlign:"end"}}>
        <Button style={{marginRight:'20px', borderColor:'transparent'}}>
          Cancel
        </Button>
        <Button className="btn-purple">
          Save
        </Button>
      </div>
    </div>
  </>
};

export default ProfileUser;