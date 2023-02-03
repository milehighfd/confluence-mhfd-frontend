import React, { useEffect } from "react";
import { Col, Layout, Row } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import Search from "antd/lib/transfer/search";
import Profile from "./components/Profile";
import Searches from "./components/Searches";
import Actions from "./components/Actions";

const MyProfile = () => {


  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden'}} className="map-00 profile-00">
          {/* <div className="header-myprofile">
            <h2>My Profile</h2>
          </div> */}
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 6 }}>
              <Profile />
            </Col>
            <Col xs= {{span: 23}} lg={{ span: 13}}>
              <Searches />
            </Col>
            <Col xs={{span: 11 }}lg={{ span: 5 }}>
              <Actions />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default MyProfile;