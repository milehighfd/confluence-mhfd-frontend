import React from 'react';
import NavbarView from "Components/Shared/Navbar/NavbarView";
import SidebarView from "Components/Shared/Sidebar/SidebarView";
import { Layout } from "antd";
import { UpcomingProjectHeader } from './components/UpcomingProjectHeader';
import { UpcomingProjectBody } from './components/UpcomingProjectBody';

const UpcomingProjects = () => {
  return (
    <Layout>
      <NavbarView />
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{ overflow: 'hidden', zIndex:'1' }}>
          <div className='upcoming-layout'>
            <UpcomingProjectHeader></UpcomingProjectHeader>
            <UpcomingProjectBody></UpcomingProjectBody>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UpcomingProjects;