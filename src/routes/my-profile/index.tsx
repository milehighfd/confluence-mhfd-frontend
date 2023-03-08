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
        <Layout style={{overflow:'hidden'}} className="map-00 profile-00">
          {/* <div className="header-myprofile">
            <h2>My Profile</h2>
          </div> */}
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 6 }}>
              <Profile counterProjects={counterProjects} counterProblems={counterProblems} />
            </Col>
            <Col xs= {{span: 23}} lg={{ span: 13}}>
              <Searches counterProjects={counterProjects} counterProblems={counterProblems} getCount={getCount}/>
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