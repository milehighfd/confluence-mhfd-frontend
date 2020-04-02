import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Icon } from 'antd';
import * as datasets from "../../../Config/datasets";
import { Redirect, useLocation } from "react-router-dom";
import { User } from "../../../Classes/User";
import { replaceAppUser } from '../../../store/actions/appUser';
import store from "../../../store";
import { ROUTERS, ROUTER_TITLE } from "../../../constants/constants";

const { SubMenu } = Menu;
const { Header } = Layout;


export default () => {
  const [redirect, setRedirect] = useState(false);
  const user = store.getState().appUser;
  const name = user.firstName;
  const initialName = user.firstName.charAt(0) + user.lastName.charAt(0);
  const location = useLocation().pathname.split('/');
  let value = '';
  const [title, setTitle] = useState('')
  if(location[1] === ROUTERS.PROFILE_VIEW && location.length === 2) {
    value = ROUTER_TITLE.PROFILE_VIEW;
  } else if (location[1] === ROUTERS.MAP && location.length === 2) {
    value = ROUTER_TITLE.MAP;
  } else if (location[1] === ROUTERS.NEW_PROJECT_TYPES && location.length === 2) {
    value = ROUTER_TITLE.NEW_PROJECT_TYPES;
  } else if (location[1] === ROUTERS.WORK_PLAN && location.length === 2) {
    value = ROUTER_TITLE.WORK_PLAN;
  } else if (location[1] === ROUTERS.WORK_REQUEST && location.length === 2) {
    value = ROUTER_TITLE.WORK_REQUEST;
  } else if (location[1] === ROUTERS.USER && location.length === 2) {
    value = ROUTER_TITLE.USER;
  } else if (location[1] === ROUTERS.PROJECT_CAPITAL && location.length === 3) {
    value = ROUTER_TITLE.PROJECT_CAPITAL;
  } else if (location[1] === ROUTERS.PROJECT_ACQUISITION && location.length === 3) {
    value = ROUTER_TITLE.PROJECT_ACQUISITION;
  } else if (location[1] === ROUTERS.PROJECT_SPECIAL && location.length === 3) {
    value = ROUTER_TITLE.PROJECT_SPECIAL;
  } else if (location[2] === ROUTERS.PROJECT_MAINTENANCE_DEBRIS && location[1] === 'project-maintenance' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_MAINTENANCE_DEBRIS;
  } else if (location[2] === ROUTERS.PROJECT_MAINTENANCE_VEGETATION && location[1] === 'project-maintenance' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_MAINTENANCE_VEGETATION;
  } else if (location[2] === ROUTERS.PROJECT_MAINTENANCE_MINOR_REPAIR && location[1] === 'project-maintenance' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_MAINTENANCE_MINOR_REPAIR;
  } else if (location[2] === ROUTERS.PROJECT_MAINTENANCE_SEDIMENT && location[1] === 'project-maintenance' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_MAINTENANCE_SEDIMENT;
  } else if (location[2] === ROUTERS.PROJECT_MAINTENANCE_RESTORATION && location[1] === 'project-maintenance' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_MAINTENANCE_RESTORATION;
  } else if (location[2] === ROUTERS.PROJECT_STUDY_MASTER && location[1] === 'project-study' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_STUDY_MASTER;
  } else if (location[2] === ROUTERS.PROJECT_STUDY_FHAD && location[1] === 'project-study' && location.length === 4) {
    value = ROUTER_TITLE.PROJECT_STUDY_FHAD;
  }
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
    <h6>{value}</h6>
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
