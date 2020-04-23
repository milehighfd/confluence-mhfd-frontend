import React, { useEffect } from "react";
import { Layout, Row, Col, Tabs } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Collaborators from "./ProfileComponents/Collaborators";
import TabPaneView from "./ProfileComponents/TabPaneView";
import UserInformationView from "./ProfileComponents/UserInformationView";

import { ProjectTypes } from "../../Classes/MapTypes";
import { User } from "../../Classes/TypeList";

const { TabPane } = Tabs;

const cardInformationProblems: Array<any> = [
  {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }, {
    image: "/Icons/eje.png", requestName: "West Tollagate Creek GSB Drops", jurisdiction: "Westminster", estimatedCost: 400500,
    field4: 5, field5: "Components", priority: "High Priority", percentage: "80%"
  }
];

export default ({user, projects, getUserProjects } : { user: User, projects: ProjectTypes[], getUserProjects: Function}) => {
  const searchProblem = () => {
    console.log('search problem');
  }
  const searchProjects = (options: { requestName: string, status: string}) => {
    getUserProjects(newOptions(options));
  }

  const newOptions = (options: { requestName: string, status: string}) => {
    const newOption = (options.requestName.trim() && options.status) ? options :
                      (options.requestName.trim()) ? { requestName: options.requestName } :
                      (options.status) ? { status: options.status } : {}
    return newOption;
  }
  useEffect(() => {
    getUserProjects({})
  }, [getUserProjects]);
  console.log('user: dsad', user);
  
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00 profile-00" style={{height: 'calc(100vh - 58px)', overflowY: 'scroll'}}>
              <Row className="profile-header">
                <UserInformationView user={user} />
                <div className="profile-divider"></div>
              </Row>
              <Row>
                <Col className="profile-tabs" span={17}>
                  <Tabs style={{padding:'0 53px'}} defaultActiveKey="1" className="tabs-map">
                      <TabPane tab="Problems" key="1">
                        <TabPaneView type={"Problems"} datas={cardInformationProblems} search={searchProblem}/>
                      </TabPane>
                      <TabPane tab="Projects" key="2">
                        <TabPaneView type={"Projects"} datas={projects} search={searchProjects} />
                      </TabPane>
                  </Tabs>
                </Col>
                <Collaborators />
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
