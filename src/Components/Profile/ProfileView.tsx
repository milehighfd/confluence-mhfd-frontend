import React, { useEffect } from "react";
import { Layout, Row, Col, Tabs, Button, Dropdown, Menu, List, Avatar, Popover } from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Collaborators from "./ProfileComponents/Collaborators";
import TabPaneView from "./ProfileComponents/TabPaneView";
import UserInformationView from "./ProfileComponents/UserInformationView";

import { ProjectTypes } from "../../Classes/MapTypes";
import { User, ProjectName } from "../../Classes/TypeList";
import { problemPanel } from "../../utils/detailedUtils";

const content = (<div className="popoveer-00">View Problems within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);
const content00 = (<div className="popoveer-00">View Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

const { TabPane } = Tabs;
const data = [
  {
    title: 'West Tollgate Creek GSB Drops',
  },
];
const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);
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

export default ({ user, projects, problems, countProjects, getUserProjects, getCountProjects, uploadImage, getUserInformation, spinImage, spinValue, updateUserInformation,
    getUserProblem, getUserProject }:
  {
    user: User, projects: any, problems: any, countProjects: ProjectName[], getUserProjects: Function, getCountProjects: Function,
    uploadImage: Function, getUserInformation: Function, spinImage: boolean, spinValue: Function, updateUserInformation: Function,
    getUserProblem: Function, getUserProject: Function }) => {
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
    getUserProjects({});
  }, [getUserProjects]);

  useEffect(() => {
    getCountProjects()
  }, [getCountProjects]);
  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);
  useEffect(() => {
    if(user._id) {
      console.log('volviendo gg');

      getUserProblem({ keyword: '', column: 'problemname', order: 'asc' });
      getUserProject({ keyword: '', column: 'streamname', order: 'asc' });
    }
  }, [user]);
  //console.log(projects, problems);

  return <>
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="map-00 profile-00" style={{ height: 'calc(100vh - 58px)', overflowY: 'scroll' }}>
          <Row className="profile-header">
            <UserInformationView updateUserInformation={updateUserInformation} key="userProfile" user={user} countProjects={countProjects} uploadImage={uploadImage} spinImage={spinImage} spinValue={spinValue} />
          </Row>
          <Row >
            <Col className="profile-tabs" span={17}>
              <Tabs defaultActiveKey="1" className="tabs-map">

                <TabPane key="1" tab={<span><Popover content={content} placement="rightBottom">Problems</Popover> </span>}>
                  <TabPaneView type={"Problems"} data={problems} search={getUserProblem} />
                </TabPane>

                <TabPane key="2" tab={<span><Popover content={content00} placement="rightBottom">Projects</Popover> </span>}>
                  <TabPaneView type={"Projects"} data={projects} search={getUserProject} />
                </TabPane>
                {/* <TabPane tab="Activity" key="3">
                    <div className="tab-activity">
                      <div className="btn-sort">
                        <Dropdown overlay={menu} trigger={['click']}>
                          <Button className="profile-bystatus">
                          By Project
                          </Button>
                        </Dropdown>

                        <label className="sort-by">
                          <CaretUpOutlined className="arrow-up"/>
                          <CaretDownOutlined className="arrow-down" />
                        </label>
                      </div>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Recent" key="1">
                          <div className="list-comment">
                            <List
                              itemLayout="horizontal"
                              dataSource={data}
                              renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src="/Icons/icon-28.svg" />}
                                    title={<a href="">{item.title}</a>}
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                  />
                                  <div className="comp">
                                    <div>
                                      <img src="/Icons/icon-71.svg" height="30px" style={{borderRadius: '50%'}} className="img-00"/>
                                      <img src="/Icons/icon-71.svg" height="30px" style={{borderRadius: '50%'}} className="img-01"/>
                                      <img src="/Icons/icon-71.svg" height="30px" style={{borderRadius: '50%'}} className="img-02"/>
                                      <span>+2</span>
                                    </div>
                                    <div>
                                      <h6>Capital Maintence</h6>
                                    </div>
                                  </div>
                                </List.Item>
                              )}
                            />
                          </div>
                          <div className="comment">
                            <img src="/Icons/icon-28.svg" height="35px"/>
                            <input type="text" placeholder="Write comments..."/>
                          </div>
                        </TabPane>
                        <TabPane tab="Popular" key="2">
                          Tab 2
                        </TabPane>
                      </Tabs>
                    </div>
                </TabPane>
                <TabPane tab="Current Work Plan" key="4">
                  Lorem
                </TabPane> */}
              </Tabs>
            </Col>
            <Collaborators />
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
