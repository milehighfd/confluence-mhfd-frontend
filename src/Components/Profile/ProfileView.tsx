import React, { useEffect } from "react";
import { Layout, Row, Col, Tabs } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Collaborators from "./ProfileComponents/Collaborators";
import TabPaneView from "./ProfileComponents/TabPaneView";
import UserInformationView from "./ProfileComponents/UserInformationView";

import { ProjectTypes } from "../../Classes/MapTypes";
import { User, ProjectName } from "../../Classes/TypeList";

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

export default ({ user, projects, countProjects, getUserProjects, getCountProjects, uploadImage, getUserInformation, spinImage, spinValue }:
  {
    user: User, projects: ProjectTypes[], countProjects: ProjectName[], getUserProjects: Function, getCountProjects: Function,
    uploadImage: Function, getUserInformation: Function, spinImage: boolean, spinValue: Function }) => {
  const searchProblem = () => {
    console.log('search problem');
  }
  const searchProjects = (options: { requestName: string, status: string }) => {
    getUserProjects(newOptions(options));
  }

  const newOptions = (options: { requestName: string, status: string }) => {
    const newOption = (options.requestName.trim() && options.status) ? options :
      (options.requestName.trim()) ? { requestName: options.requestName } :
        (options.status) ? { status: options.status } : {}
    return newOption;
  }
  useEffect(() => {
    getUserProjects({})
  }, [getUserProjects]);

  useEffect(() => {
    getCountProjects()
  }, [getCountProjects]);
  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);
  return <>
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="map-00 profile-00" style={{ height: 'calc(100vh - 58px)', overflowY: 'scroll' }}>
          <Row className="profile-header">
            <UserInformationView key="userProfile" user={user} countProjects={countProjects} uploadImage={uploadImage} spinImage={spinImage} spinValue={spinValue} />
            <div className="profile-divider"></div>
          </Row>
          <Row >
            <Col className="profile-tabs" span={17}>
              <Tabs style={{ padding: '0 25px' }} defaultActiveKey="1" className="tabs-map">
                <TabPane tab="Problems" key="1">
                  <TabPaneView type={"Problems"} datas={cardInformationProblems} search={searchProblem} />
                </TabPane>
                <TabPane tab="Projects" key="2">
                  <TabPaneView type={"Projects"} datas={projects} search={searchProjects} />
                </TabPane>
                <TabPane tab="Activity" key="3">
                  Lorem
                </TabPane>
                <TabPane tab="Current Work Plan" key="4">
                  Lorem
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
