import React, { useEffect } from "react";
import { Layout } from 'antd';
import NavbarContainer from "../../Components/Shared/Navbar/NavbarContainer";
import SidebarView from "../../Components/Shared/Sidebar/SidebarView";
import UserManagementBody from "./components/UserManagementBody";

const UserManagement = () => {


  return <>
    <Layout>
      <NavbarContainer/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{overflow:'hidden'}} className="map-00 profile-00">
          <UserManagementBody/>
        </Layout>
      </Layout>
    </Layout>
  </>
};

export default UserManagement;