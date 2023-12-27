import React, { useEffect } from 'react';
import NavbarView from 'Components/Shared/Navbar/NavbarView';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import { Layout } from 'antd';
import { UpcomingProjectHeader } from './components/UpcomingProjectHeader';
import { UpcomingProjectBody } from './components/UpcomingProjectBody';
import { useMapDispatch } from 'hook/mapHook';
import { UPCOMING_PROJECTS } from 'constants/constants';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import * as datasets from "../../Config/datasets";
import { SERVER } from 'Config/Server.config';

const UpcomingProjects = () => {
  const { setTabActiveNavbar } =  useMapDispatch();
  const { userInformation } = useProfileState();
  const {
    replaceAppUser,
    saveUserInformation
  } = useProfileDispatch();
  const redirectGuest = () => {
    datasets.getData(SERVER.GUEST).then(async res => {
      if (res?.token) {
        localStorage.setItem('mfx-token', res.token);
        await datasets.getData(SERVER.ME, datasets.getToken()).then(async result => {
          replaceAppUser(result);
          saveUserInformation(result)
        });
      }
    })
  };
  useEffect(() => {
    setTabActiveNavbar(UPCOMING_PROJECTS);
    if (userInformation.isSelect === 'beggining') {
      redirectGuest();
    }
  }, []);
  
  return (
    <Layout>
      <NavbarView parentComponentName={UPCOMING_PROJECTS}/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{ overflow: 'hidden', zIndex: '1' }}>
          <div className="upcoming-layout">
            <UpcomingProjectHeader></UpcomingProjectHeader>
            <UpcomingProjectBody></UpcomingProjectBody>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UpcomingProjects;
