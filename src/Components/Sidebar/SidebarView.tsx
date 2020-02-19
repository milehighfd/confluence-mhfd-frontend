import * as React from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;


  let state = {
    collapsed: false,
  };

  let onCollapse = (collapsed:any) => {
    console.log(collapsed);
    state.collapsed = !state.collapsed;
    console.log(state.collapsed);
  };

export default () => {
  return <Layout style={{ minHeight: 'calc(100vh)' }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item key="1">
              <img src="icons/menu-white-01.svg" alt=""/>
              <span>My SMS</span>
            </Menu.Item>
            <Menu.Item key="2">
              <img src="icons/menu-white-02.svg" alt=""/>
              <span>Map View</span>
            </Menu.Item>
            <Menu.Item key="3">
              <img src="icons/menu-white-03.svg" alt=""/>
              <span>Create a Project</span>
            </Menu.Item>
            <Menu.Item key="4">
              <img src="icons/menu-white-04.svg" alt=""/>
              <span>Work Request</span>
            </Menu.Item>
            <Menu.Item key="5">
              <img src="icons/menu-white-05.svg" alt=""/>
              <span>Work Plan</span>
            </Menu.Item>
            <Menu.Item key="6">
              <img src="icons/menu-white-06.svg" alt=""/>
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
};
