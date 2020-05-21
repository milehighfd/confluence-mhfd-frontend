import React from 'react';
import { Layout } from 'antd';

import NavbarView from '../Shared/Navbar/NavbarView';
import SidebarView from '../Shared/Sidebar/SidebarView';

const { Content } = Layout;

export default () => {
    return <>
        <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="layout user">
          <Content style={{ padding: '0 120px' }}></Content>
        </Layout>
      </Layout>
    </Layout>
    </>;
}