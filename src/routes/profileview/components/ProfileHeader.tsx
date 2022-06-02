import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Tabs, Popover, Spin } from 'antd';

import Navbar from "../../../../src/Components/Shared/Navbar/NavbarContainer"
import SidebarView from "./SidebarView";
import Collaborators from "./Collaborators";
import TabPaneView from "./TabPaneView";
import UserInformationView from "./UserInformationView";

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
  
    return(
            <Row className="profile-header">
              <UserInformationView
                key="userProfile"
                setFilter={setFilter} />
            </Row>
    )
};  
 