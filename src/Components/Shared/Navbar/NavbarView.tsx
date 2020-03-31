import React, { useState } from "react";
import { Layout, Menu, Dropdown, Icon } from 'antd';
import * as datasets from "../../../Config/datasets";
import { Redirect } from "react-router-dom";
import { User } from "../../../Classes/User";
import { replaceAppUser } from '../../../store/actions/appUser';
import store from "../../../store";
const { SubMenu } = Menu;
const { Header } = Layout;


export default () => {
  const [redirect, setRedirect] = useState(false);
  const user = store.getState().appUser;
  const name = user.firstName;
  const initialName = user.firstName.charAt(0) + user.lastName.charAt(0);
  const logout = () => {
    datasets.logout();
    setRedirect(true);
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );


  if (redirect) {
    return <Redirect to="/login" />
  }

  return <Header className="header">
    <div className="logo"
      style={{ backgroundImage: 'url(/Icons/logo.svg)' }}
    />
    <h6>Confluence   |   User Management</h6>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['0']}
      style={{ lineHeight: '58px', float: 'right' }}
    >
      <Menu.Item><img src="/Icons/icon-26.svg" alt="" /></Menu.Item>
      <label className="ll-0"></label>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <label className="ll-00">{initialName}</label> {name} <Icon type="caret-down" />
        </a>
      </Dropdown>
      <Menu.Item><img src="/Icons/icon-27.svg" alt="" /></Menu.Item>
    </Menu>
  </Header>

}
