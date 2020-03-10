import React, { useState } from "react";
import { Layout, Menu, Icon } from 'antd';
import { Link, useLocation } from "react-router-dom";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;


export default () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const location = useLocation();
  const routes = ['/profile-view', '/map', '/new-project-types', '/work-request', '/work-plan', '/user'];
  const indexOf = "" + routes.indexOf(location.pathname);

  return <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
    <Menu theme="dark" defaultSelectedKeys={[indexOf]} mode="inline">
      <Menu.Item key="0" >
        <Link to={'/profile-view'}>
          <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="18px" />
          <span>My SMS</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="18px" />
          <span>Map View</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={'/new-project-types'}>
          <img className="img-h anticon" src="/Icons/menu-white-03.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-03.svg" alt="" width="18px" />
          <span>Create a Project</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/work-request'}>
          <img className="img-h anticon" src="/Icons/menu-white-04.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-04.svg" alt="" width="18px" />
          <span>Work Request</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={'/work-plan'}>
          <img className="img-h anticon" src="/Icons/menu-white-05.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-05.svg" alt="" width="18px" />
          <span>Work Plan</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={'/user'}>
          <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="18px" />
          <span>Settings</span>
        </Link>
      </Menu.Item>
    </Menu>
  </Sider>
};
