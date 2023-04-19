import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import PortafolioBody from "./components/PorfolioBody";
import NavbarView from "Components/Shared/Navbar/NavbarView";

const PortfolioView = () => {
  const [optionSelect, setOptionSelect] = useState('List');

  return <>
    <Layout>
      <NavbarView tabActive={optionSelect}/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden'}} className="map-00 profile-00">
          <PortafolioBody optionSelect={optionSelect} setOptionSelect={setOptionSelect}/>
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default PortfolioView;