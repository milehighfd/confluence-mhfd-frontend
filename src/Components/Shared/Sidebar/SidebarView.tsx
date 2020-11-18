import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import store from "../../../store";
import { ROUTERS_SIDEBAR } from "../../../constants/constants";
import '../../../Scss/sidebar.scss';
const { Sider } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const location = useLocation();
  const appUser = store.getState().appUser;
  const indexOf = "" + ROUTERS_SIDEBAR.indexOf(location.pathname);

  return <Sider collapsedWidth="58" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
    <Menu theme="dark" defaultSelectedKeys={[indexOf]} mode="inline" >
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="0">
        <Link to={'/profile-view'}>
          <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="18px" />
          <span>My Confluence</span>
        </Link>
      </Menu.Item> : ''}
      <Menu.Item key="1">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="18px" />
          <span>Map View</span>
        </Link>
      </Menu.Item>
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="2">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-15.svg" alt="" width="18px" style={{opacity: '0.2'}} />
          <img className="img-a anticon" src="/Icons/menu-green-15.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <span>Watershed Story - Under Construction</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="3">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-13.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <img className="img-a anticon" src="/Icons/menu-green-13.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <span>Work Plan - Under Construction</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="4">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-14.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <img className="img-a anticon" src="/Icons/menu-green-14.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <span>Work Request - Under Construction</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="5">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-11.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <img className="img-a anticon" src="/Icons/menu-green-11.svg" alt="" width="18px" style={{opacity: '0.2'}}  />
          <span>Project Management - Under Construction</span>
        </Link>
      </Menu.Item> : ''}
      {/* {(appUser.designation === 'admin' ||
        appUser.designation === 'staff'||
        appUser.designation === 'government_admin' ||
        appUser.designation === 'government_staff') && appUser.activated ?
      <Menu.Item key="2">
        <Link to={'/new-project-types'}>
          <img className="img-h anticon" src="/Icons/menu-white-03.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-03.svg" alt="" width="18px" />
          <span>Create a Project</span>
        </Link>
      </Menu.Item>: ''} */}
      {/* {(appUser.designation === 'government_admin' ||
        appUser.designation === 'government_staff') && appUser.activated ?
      <Menu.Item key="3">
        <Link to={'/work-request'}>
          <img className="img-h anticon" src="/Icons/menu-white-04.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-04.svg" alt="" width="18px" />
          <span>Work Request</span>
        </Link>
      </Menu.Item>: ''} */}
      {/* {(appUser.designation === 'admin' ||
        appUser.designation === 'staff') && appUser.activated ?
      <Menu.Item key="4">
        <Link to={'/work-plan'}>
          <img className="img-h anticon" src="/Icons/menu-white-05.svg" alt="" width="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-05.svg" alt="" width="18px" />
          <span>Work Plan</span>
        </Link>
      </Menu.Item>: ''} */}
      {(appUser.designation === 'admin' ||
        appUser.designation === 'staff') && (appUser.status === 'approved') ?
        <Menu.Item key="6">
          <Link to={'/upload-attachment'}>
            <img className="img-h anticon" src="/Icons/menu-white-07.svg" alt="" width="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-07.svg" alt="" width="18px" />
            <span>Uploader</span>
          </Link>
        </Menu.Item> : ''}
        {(appUser.designation !== 'guest') ?
        <Menu.Item key="7">
          <a href={'https://docs.google.com/forms/d/e/1FAIpQLScpFx7KApWLATmdAEUTnEFuDWLEHDIQIjwJiqkHXH5yOl2G4Q/viewform?usp=sf_link'} target="_blank">
            <img className="img-h anticon" src="/Icons/menu-white-12.svg" alt="" width="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-12.svg" alt="" width="18px" />
            <span>Feedback</span>
          </a>
        </Menu.Item> : ''}
      {(appUser.designation === 'admin') && (appUser.status === 'approved') ?
        <Menu.Item key="8">
          <Link to={'/user'}>
            <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="18px" />
            <span>Settings</span>
          </Link>
        </Menu.Item> : ''}
    </Menu>
  </Sider>
};
