import React, { useState } from "react";
import { Layout } from 'antd';
import SidebarMenu from './SidebarMenu';
import SidebarModal from './SidebarModal';
import '../../../Scss/Components/sidebar.scss';

const { Sider } = Layout;
const SidebarView = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return <Sider collapsedWidth="58" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{ 'zIndex': 1000 }}>
    <SidebarMenu />
    <SidebarModal />
  </Sider>
};

export default SidebarView;
