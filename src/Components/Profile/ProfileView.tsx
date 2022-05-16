import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Tabs, Popover, Spin } from 'antd';

import Navbar from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Collaborators from "./ProfileComponents/Collaborators";
import TabPaneView from "./ProfileComponents/TabPaneView";
import UserInformationView from "./ProfileComponents/UserInformationView";

import { User, ProjectName } from "../../Classes/TypeList";
import { useMapDispatch, useMapState } from "../../hook/mapHook";

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

  const [ filter, setFilter] = useState('');
  const { favoriteCards } = useMapDispatch();
  const { favoriteProblemCards, favoriteProjectCards, favoritesLoader} = useMapState();
  useEffect(() => {
    favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc"});
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

  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="map-00 profile-00">
          <Row className="profile-header">
            <UserInformationView
              key="userProfile"
              setFilter={setFilter} />
          </Row>
          <Row >
            <Col className="profile-tabs" xs={{ span: 24 }} lg={{ span: 17 }}>
              <Spin className="loading-01" spinning={favoritesLoader > 0}>
              <Tabs defaultActiveKey="2" className="tabs-map" onTabClick={(e: string) => {
                if (e == '1') {
                  favoriteCards(user.email, true, { keyword: "", column: 'problemname', order: "asc"});
                } else {
                  favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc"});
                }
              }}>

                <TabPane key="1" tab={<span><Popover content={content} placement="rightBottom">Problems</Popover> </span>}>
                  <TabPaneView type={"Problems"} data={favoriteProblemCards} search={favoriteCards}
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
                  <TabPaneView type={"Projects"} data={favoriteProjectCards} search={favoriteCards}
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
              </Tabs>
              </Spin>
            </Col>

            <Collaborators />
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
