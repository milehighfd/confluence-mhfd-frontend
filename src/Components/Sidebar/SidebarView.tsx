import React, {useState} from "react";
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;


export default () => {
  const [collapsed, setCollapsed] = useState(true);
  return <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1">
              <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="18px" />
              <span>My SMS</span>
            </Menu.Item>
            <Menu.Item key="2">
              <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="18px" />
              <span>Map View</span>
            </Menu.Item>
            <Menu.Item key="3">
              <img className="img-h anticon" src="/Icons/menu-white-03.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-03.svg" alt="" width="18px" />
              <span>Create a Project</span>
            </Menu.Item>
            <Menu.Item key="4">
              <img className="img-h anticon" src="/Icons/menu-white-04.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-04.svg" alt="" width="18px" />
              <span>Work Request</span>
            </Menu.Item>
            <Menu.Item key="5">
              <img className="img-h anticon" src="/Icons/menu-white-05.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-05.svg" alt="" width="18px" />
              <span>Work Plan</span>
            </Menu.Item>
            <Menu.Item key="6">
              <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="18px" />
              <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="18px" />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
};
