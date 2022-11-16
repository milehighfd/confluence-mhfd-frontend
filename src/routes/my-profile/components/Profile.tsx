import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const Profile = () => {
  return (
    <div className="profile-myprofile">
      <img src="/picture/user.png" height={90} width="90" style={{marginBottom:'15px', marginTop:'50px'}}/>
      <h1>Jon Villines</h1>
      <p style={{marginBottom:'30px'}} className="color-sub">MHFD Senior Manager</p>
      <div style={{margin:'0px'}} className="line-01"></div>
      <Row>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>82</h2>
          <p className="color-sub">Action Items</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>12</h2>
          <p className="color-sub">Projects</p>
        </Col>
        <Col xs={{ span: 24}} lg={{ span: 8 }}>
          <h2 style={{marginBottom:'0px', marginTop:'10px'}}>20</h2>
          <p className="color-sub">Problems</p>
        </Col>
      </Row>
      <div style={{margin:'0px'}} className="line-01"></div>
      <div style={{textAlign:'initial', padding:'10px', marginTop:'10px'}}>
        <Row>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Email</p>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Phone</p>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Organization</p>
            <p className="color-sub" style={{paddingBottom:'20px' }}>Jurisdiction</p>
            <p className="color-sub" style={{paddingBottom:'20px' }}>County</p>
            <p className="color-sub" style={{paddingBottom:'20px' }}>Service Area</p>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Default Map</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <p style={{paddingBottom:'10px' }}>jvillines@confluence.com</p>
            <p style={{paddingBottom:'10px' }}>+1 234 5678 9090</p>
            <p style={{paddingBottom:'10px' }}>MHFD District Boundary</p>
            <Select defaultValue="None" style={{ width: '100%', marginBottom:'10px' }}>
              <Option value="None">None</Option>
              <Option value="None1">None1</Option>
            </Select>
            <Select defaultValue="Douglas" style={{ width: '100%', marginBottom:'10px'  }}>
              <Option value="Douglas">Douglas</Option>
            </Select>
            <Select defaultValue="South" style={{ width: '100%', marginBottom:'25px'  }}>
              <Option value="South">South</Option>
            </Select>
            <p style={{paddingBottom:'10px' }}>Mile High Flood District</p>
          </Col>
        </Row>
        <Button style={{width:'100%'}} className="btn-purple">Edit Profile</Button>
      </div>
    </div>
  )
};

export default Profile;