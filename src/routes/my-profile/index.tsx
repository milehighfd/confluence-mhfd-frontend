import React, { useEffect, useState } from "react";
import { Col, Layout, Row } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import Search from "antd/lib/transfer/search";
import Profile from "./components/Profile";
import Searches from "./components/Searches";
import Actions from "./components/Actions";
import { SERVER } from "Config/Server.config";
import * as datasets from "../../Config/datasets";
// import ProfileMobile from "./components/ProfileMobile";

const MyProfile = () => {

  const [counterProjects, setCounterProjects] = useState(0);
  const [counterProblems, setCounterProblems] = useState(0);

  useEffect(() => {
    getCount();
  }, []); 

  const getCount = () => {
    datasets.getData(`${SERVER.COUNT_FAVORITES}`, datasets.getToken())
      .then((rows) => {
        setCounterProjects(rows.count);
      });
    datasets.getData(`${SERVER.COUNT_FAVORITES}?isProblem=1`, datasets.getToken())
      .then((rows) => {
        setCounterProblems(rows.count);
      })
      
  }

  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden', zIndex:1}} className="map-00 profile-00">
          {/* <div className="header-myprofile">
            <h2>My Profile</h2>
          </div> */}
          <Row>
            <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{zIndex:1}}>
              {/* <ProfileMobile counterProjects={counterProjects} counterProblems={counterProblems} getCount={getCount}/> */}
            </Col>
            <Col xs={0} sm={6} md={6} lg={6} xl={6}  style={{zIndex:1}}>
              <Profile counterProjects={counterProjects} counterProblems={counterProblems} />
            </Col>
            <Col xs={0} sm={13} md={13} lg={13} xl={13}>
              <Searches counterProjects={counterProjects} counterProblems={counterProblems} getCount={getCount}/>
            </Col>
            <Col xs={0} sm={5} md={5} lg={5} xl={5}> 
              <Actions />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default MyProfile;