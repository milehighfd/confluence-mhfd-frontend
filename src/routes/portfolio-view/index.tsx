import React, { useState } from 'react';
import { Layout } from 'antd';
import SidebarView from 'Components/Shared/Sidebar/SidebarView';
import PortafolioBody from 'routes/portfolio-view/components/PorfolioBody';
import NavbarView from 'Components/Shared/Navbar/NavbarView';

const PortfolioView = () => {

  return (
    <Layout>
      <NavbarView />
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{ overflow: 'hidden', zIndex:'1' }} className="map-00 profile-00">
          <PortafolioBody />
        </Layout>
      </Layout>
    </Layout>
  )
};

export default PortfolioView;
