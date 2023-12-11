import React, { lazy, Suspense } from 'react';
import NavbarView from "Components/Shared/Navbar/NavbarView";
import SidebarView from "Components/Shared/Sidebar/SidebarView";
import { Layout } from "antd";

const UpcomingProjects = () => {
  return (
    <Layout>
      <NavbarView />
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{ overflow: 'hidden', zIndex:'1' }}>
          <h1>Confluence  | Upcoming Projects</h1>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UpcomingProjects;