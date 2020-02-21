import * as React from "react";
import { Layout } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";


export default () => {
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout>
              <div> I tried Ross, I tried</div>
            </Layout>
          </Layout>
        </Layout>
        </>
}