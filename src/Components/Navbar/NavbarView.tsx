import * as React from "react";
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        Logout
      </a>
    </Menu.Item>
  </Menu>
);
export default () => {
  return <Header className="header">
      <div className="logo"
      style={{backgroundImage: 'url(Icons/logo.svg)'}}
      />
      <h6>Confluence   |   User Managementf</h6>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        style={{ lineHeight: '58px', float: 'right' }}
      >
        <Menu.Item key=""><img src="Icons/icon-26.svg" alt=""/></Menu.Item>
        <label className="ll-0"></label>
        <Dropdown overlay={menu}>
           <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
             <label className="ll-00">JC</label> Janelle <Icon type="caret-down" />
           </a>
         </Dropdown>
        <Menu.Item key=""><img src="Icons/icon-27.svg" alt=""/></Menu.Item>
      </Menu>
    </Header>

}
