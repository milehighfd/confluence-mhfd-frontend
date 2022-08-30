import React, { useEffect } from "react";
import { Layout } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import PortafolioBody from "./components/PorfolioBody";

const PortafolioView = () => {


  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden'}} className="map-00 profile-00">
          <PortafolioBody />
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default PortafolioView;