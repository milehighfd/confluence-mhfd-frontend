import React, { useState } from "react";
import { Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import store from "../../../store";
import { ROUTERS_SIDEBAR } from "../constants/layout.constants";
import '../../../Scss/Components/sidebar.scss';

const SidebarMenu = () => {
   
     const [collapsed, setCollapsed] = useState<boolean>(true);
     const location = useLocation();
     const appUser = store.getState().appUser;
     const indexOf = "" + ROUTERS_SIDEBAR.indexOf(location.pathname);
     const showWorkRequestPlan = (appUser.designation !== 'guest' && appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff')
     const userApproved = appUser.status === 'approved';
   
  return (
    <Menu theme="dark" defaultSelectedKeys={[indexOf]} mode="inline" >
    {(appUser.designation !== 'guest') ?
    <Menu.Item key="0" className="menu-mobile">
      <Link to={'/profile-view'} style={{ textDecoration: 'none' }}>
        <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="22px" height="18px"/>
        <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="22px" height="18px" />
        <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>my confluence</span>
      </Link>
    </Menu.Item> : ''}
    <Menu.Item key="1" className="menu-mobile" style={{padding: '0px 0px 0px 0px'}}>
      <Link to={'/map'} >
        <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="22px" height="18px" />
        <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="22px" height="18px" />
        <span style={{marginLeft: collapsed ? '-20px' : '-2px', padding: '0'}}>map view</span>
      </Link>
    </Menu.Item>
    {showWorkRequestPlan &&
      <Menu.Item key="4" className="menu-mobile">
        <Link to={userApproved ? '/work-request': '#'}>
          <img className="img-h anticon" src="/Icons/menu-white-14.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}} />
          <img className="img-a anticon" src="/Icons/menu-green-14.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}} />
          <span>work request</span>
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>work request</span>
        </Link>
      </Menu.Item>
    }
    {showWorkRequestPlan ?
    <Menu.Item key="3" className="menu-mobile">
      <Link to={userApproved ? '/work-plan': '#'}>
        <img className="img-h anticon" src="/Icons/menu-white-13.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}}/>
        <img className="img-a anticon" src="/Icons/menu-green-13.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}}/>
        <span style={{marginLeft: collapsed ? '-20px' : '0px'}}>project management</span>
      </Link>
    </Menu.Item> : ''}
    {(appUser.designation !== 'guest') ?
    <Menu.Item key="5" className="menu-mobile">
      <Link to={'/map'}>
        <img className="img-h anticon" src="/Icons/menu-white-11.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
        <img className="img-a anticon" src="/Icons/menu-green-11.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
        <span style={{marginLeft: collapsed ? '-20px' : '0px'}}>project management</span>
      </Link>
    </Menu.Item> : ''}
    {(appUser.designation !== 'guest') ?
    <Menu.Item key="2" className="menu-mobile">
      <Link to={'/map'}>
        <img className="img-h anticon" src="/Icons/menu-white-15.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}} />
        <img className="img-a anticon" src="/Icons/menu-green-15.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
        <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>watershed story</span>
      </Link>
    </Menu.Item> : ''}
    {(appUser.designation === 'admin' ||
      appUser.designation === 'staff') && (appUser.status === 'approved') ?
      <Menu.Item key="6" className="menu-mobile">
        <Link to={'/upload-attachment'}>
          <img className="img-h anticon" src="/Icons/menu-white-07.svg" alt="" width="22px" height="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-07.svg" alt="" width="22px" height="18px" />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>uploader</span>
        </Link>
      </Menu.Item> : ''}
      <Menu.Item key="7" className="menu-mobile">
        <a href={'https://docs.google.com/forms/d/e/1FAIpQLScpFx7KApWLATmdAEUTnEFuDWLEHDIQIjwJiqkHXH5yOl2G4Q/viewform?usp=sf_link'} target="_blank">
          <img className="img-h anticon" src="/Icons/menu-white-12.svg" alt="" width="22px" height="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-12.svg" alt="" width="22px" height="18px" />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>feedback</span>
        </a>
      </Menu.Item>
    {(appUser.designation === 'admin') && (appUser.status === 'approved') ?
      <Menu.Item key="8" className="menu-mobile">
        <Link to={'/user'}>
          <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="22px" height="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="22px" height="18px" />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>settings</span>
        </Link>
      </Menu.Item> : ''}
  </Menu>
  )
}

export default SidebarMenu;