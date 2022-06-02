import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Tabs, Popover, Spin } from 'antd';

import Navbar from "../../../../src/Components/Shared/Navbar/NavbarContainer"
import SidebarView from "./SidebarView";
import Collaborators from "./Collaborators";
import TabPaneView from "./TabPaneView";
import UserInformationView from "./UserInformationView";
import ProfileHeader from "./ProfileHeader";


import { useMapDispatch, useMapState } from "../../../../src/hook/mapHook";
import { useProfileState } from "../../../../src/hook/profileHook";
import { useAppUserDispatch } from "../../../../src/hook/useAppUser";

const content = (<div className="popoveer-00">View Problems within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);
const content00 = (<div className="popoveer-00">View Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

const { TabPane } = Tabs;

export default () => {
    const { userInformation: user } = useProfileState();
    const {
      getUserInformation
    } = useAppUserDispatch();
    const [ filter, setFilter] = useState('');
    const { favoriteCards } = useMapDispatch();
    const { favoriteProblemCards, favoriteProjectCards, favoritesLoader} = useMapState();
    useEffect(() => {
      favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc"});
    }, [user]);
  
    useEffect(() => {
      getUserInformation();
    }, []);
    
  return (
    <Row>
        <Col className="profile-tabs" xs={{ span: 24 }} lg={{ span: 17 }}>
        <Spin className="loading-01" spinning={favoritesLoader > 0}>
        <Tabs defaultActiveKey="2" className="tabs-map" onTabClick={(e: string) => {
            if (e == '1') {
            favoriteCards(user.email, true, { keyword: "", column: 'problemname', order: "asc"});
            } else {
            favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc"});
            }
        }} style={{marginLeft: '24px'}}>
            <TabPane key="1" tab={<span><Popover content={content} placement="rightBottom">Problems</Popover> </span>} >
            <TabPaneView
                type={"Problems"}
                data={favoriteProblemCards}
                filter={filter}
            />
            </TabPane>
            <TabPane key="2" tab={<span><Popover content={content00} placement="rightBottom">Projects</Popover> </span>}>
            <TabPaneView
                type={"Projects"}
                data={favoriteProjectCards}
                filter={filter}
            />
            </TabPane>
        </Tabs>
        </Spin>
        </Col>
        <Collaborators />
    </Row>
  )
}
