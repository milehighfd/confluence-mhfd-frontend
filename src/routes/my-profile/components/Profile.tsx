import { Button, Col, Dropdown, Row, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
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
      <div style={{textAlign:'initial', padding:'10px', marginTop:'10px'}} className="profile">
        <Row >
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Email</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input className="input-profile" type="text" placeholder="jvillines@confluence.com" style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>jvillines@confluence.com</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Phone</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input className="input-profile" type="text" placeholder="+1 234 5678 9090" style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>+1 234 5678 9090</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Organization</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input className="input-profile" type="text" placeholder="MHFD District Boundary" style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>MHFD District Boundary</p>
            }
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>Jurisdiction</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select defaultValue="None" style={{ width: '100%', marginBottom:'15px', borderRadius:'25px' }}>
              <Option value="None">None</Option>
              <Option value="None1">None1</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'15px' }}>County</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select defaultValue="Douglas" style={{ width: '100%', marginBottom:'15px'  }}>
              <Option value="Douglas">Douglas</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Service Area</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            <Select defaultValue="South" style={{ width: '100%', marginBottom:'20px'  }}>
              <Option value="South">South</Option>
            </Select>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 9 }}>
            <p className="color-sub" style={{paddingBottom:'10px' }}>Default Map</p>
          </Col>
          <Col xs={{ span: 24}} lg={{ span: 15 }}>
            {editProfile ?
              <input className="input-profile" type="text" placeholder="Mile High Flood District" style={{border:'1px solid #d9d9d9', borderRadius:'15px', padding:'3px 8px', width:'100%',marginBottom:'15px'}}></input>
              :<p style={{paddingBottom:'10px' }}>Mile High Flood District</p>
            }
          </Col>
        </Row>
        <div className="foot-profile">
          <Button style={{width:'100%'}} className="btn-purple" onClick={()=>{setEditProfile(!editProfile)}}>{editProfile ? 'Save':'Edit Profile'}</Button>
        </div>
      </div>
    </div>
  )
};

export default Profile;