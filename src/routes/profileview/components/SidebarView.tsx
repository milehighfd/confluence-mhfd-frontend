import React, { useState } from "react";
import { Layout } from 'antd';
import '../../../Scss/Components/sidebar.scss';
import SidebarMenu from './SidebarMenu';
import SidebarModal from './SidebarModal';

const { Sider } = Layout; 

export default () => {

  const [collapsed, setCollapsed] = useState<boolean>(true);

  return <Sider collapsedWidth="58" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{'zIndex': 1000}}>
    <SidebarMenu />
    <SidebarModal />
  </Sider>
};
