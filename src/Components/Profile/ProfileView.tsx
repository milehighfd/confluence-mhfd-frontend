import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Tabs, Popover } from 'antd';

import Navbar from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Collaborators from "./ProfileComponents/Collaborators";
import TabPaneView from "./ProfileComponents/TabPaneView";
import UserInformationView from "./ProfileComponents/UserInformationView";

import { User, ProjectName } from "../../Classes/TypeList";
import { useMapDispatch, useMapState } from "../../hook/mapHook";
import store from "../../store";

const content = (<div className="popoveer-00">View Problems within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);
const content00 = (<div className="popoveer-00">View Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

const { TabPane } = Tabs;

export default ({ user, projects, problems, countProjects, getUserProjects, getCountProjects, uploadImage, getUserInformation, spinImage, spinValue, updateUserInformation,
    getUserProblem, getUserProject, getDetailedPageProblem, getDetailedPageProject, getComponentsByProblemId,
    displayModal, detailed, loaderDetailedPage, componentsOfProblems, loaderTableCompoents, loaderCardProblems,
    loaderCardProjects, groupOrganization, getGroupOrganization, componentCounter,
    getComponentCounter }:
  {
    user: User, projects: any, problems: any, countProjects: ProjectName[], getUserProjects: Function, getCountProjects: Function,
    uploadImage: Function, getUserInformation: Function, spinImage: boolean, spinValue: Function, updateUserInformation: Function,
    getUserProblem: Function, getUserProject: Function, getDetailedPageProblem: Function, getDetailedPageProject: Function,
    getComponentsByProblemId: Function, displayModal: any,
    detailed: any, loaderDetailedPage: any, componentsOfProblems: any, loaderTableCompoents: any, loaderCardProblems: boolean,
    loaderCardProjects: boolean, groupOrganization: [], getGroupOrganization: Function, componentCounter: number,
    getComponentCounter: Function }) => {

  // const newOptions = (options: { requestName: string, status: string }) => {
  //   const newOption = (options.requestName.trim() && options.status) ? options :
  //     (options.requestName.trim()) ? { requestName: options.requestName } :
  //       (options.status) ? { status: options.status } : {}
  //   return newOption;
  // }
  const [ filter, setFilter] = useState('');
  const { favoriteCards } = useMapDispatch();
  const { favoriteProblemCards, favoriteProjectCards} = useMapState();
  useEffect(() => {
    console.log('my user ', user);
    favoriteCards(user.email, true);
    favoriteCards(user.email, false);

  }, [user]);
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
      getUserProblem({ keyword: '', column: 'problemname', order: 'asc' });
      getUserProject({ keyword: '', column: 'projectname', order: 'asc' });
    }
  }, [user]);

  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="map-00 profile-00">
          <Row className="profile-header">
            <UserInformationView projects={projects} updateUserInformation={updateUserInformation}
              key="userProfile" user={user} countProjects={countProjects} uploadImage={uploadImage}
              spinImage={spinImage} spinValue={spinValue} groupOrganizacion={groupOrganization}
              getGroupOrganization={getGroupOrganization} setFilter={setFilter} />
          </Row>
          <Row >
            <Col className="profile-tabs" xs={{ span: 24 }} lg={{ span: 17 }}>
              <Tabs defaultActiveKey="2" className="tabs-map">

                <TabPane key="1" tab={<span><Popover content={content} placement="rightBottom">Problems</Popover> </span>}>
                  <TabPaneView type={"Problems"} data={favoriteProblemCards} search={getUserProblem}
                    getDetailedPageProblem={getDetailedPageProblem} getDetailedPageProject={getDetailedPageProject}
                    getComponentsByProblemId={getComponentsByProblemId}
                    displayModal={displayModal} detailed={detailed}
                    loaderDetailedPage={loaderDetailedPage} componentsOfProblems={componentsOfProblems}
                    loaderTableCompoents={loaderTableCompoents}
                    spinValue={loaderCardProblems} filter={filter}
                    componentCounter={componentCounter}
                    getComponentCounter={getComponentCounter}
                  />
                </TabPane>

                <TabPane key="2" tab={<span><Popover content={content00} placement="rightBottom">Projects</Popover> </span>}>
                  <TabPaneView type={"Projects"} data={favoriteProjectCards} search={getUserProject}
                    getDetailedPageProblem={getDetailedPageProblem} getDetailedPageProject={getDetailedPageProject}
                    getComponentsByProblemId={getComponentsByProblemId}
                    displayModal={displayModal} detailed={detailed}
                    loaderDetailedPage={loaderDetailedPage} componentsOfProblems={componentsOfProblems}
                    loaderTableCompoents={loaderTableCompoents}
                    spinValue={loaderCardProjects} filter={filter}
                    componentCounter={componentCounter}
                    getComponentCounter={getComponentCounter}
                  />
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
