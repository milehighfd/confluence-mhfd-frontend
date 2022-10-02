import React from "react";
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from "react-router-dom";
import store from "../../../store";
import { ROUTERS_SIDEBAR } from "./constants/layout.constants";
import '../../../Scss/Components/sidebar.scss';

const SidebarMenu = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const appUser = store.getState().appUser;
  const indexOf = '' + ROUTERS_SIDEBAR.indexOf(location.pathname);
  const showWorkRequestPlan = (appUser.designation !== 'guest' && appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff')
  const userApproved = appUser.status === 'approved';
  const itemMenuSidebar: MenuProps['items'] = [{
    key: '0',
    label: <Link to={'/profile-view'} style={{ textDecoration: 'none' }}>
      <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="22px" height="20px" />
      <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="22px" height="22px" />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>my confluence</span>
    </Link>
  }, {
    key: '1',
    label: <Link to={'/map'} >
      <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="22px" height="20px" />
      <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="22px" height="22px" style={{display: 'inline-block !important'}} />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px', padding: '0' }}>map view</span>
    </Link>
  }, {
    key: '4',
    label: <Link to={userApproved ? '/work-request' : '#'}>
      <img className="img-h anticon" src="/Icons/menu-white-14.svg" alt="" width="22px" height="22px" style={{ opacity: userApproved ? '1' : '0.2' }} />
      <img className="img-a anticon" src="/Icons/menu-green-14.svg" alt="" width="22px" height="22px" style={{ opacity: userApproved ? '1' : '0.2' }} />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>work request</span>
    </Link>
  }, {
    key: '3',
    label: <Link to={userApproved ? '/work-plan' : '#'}>
      <img className="img-h anticon" src="/Icons/menu-white-13.svg" alt="" width="22px" height="22px" style={{ opacity: userApproved ? '1' : '0.2' }} />
      <img className="img-a anticon" src="/Icons/menu-green-13.svg" alt="" width="22px" height="22px" style={{ opacity: userApproved ? '1' : '0.2' }} />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>work plan</span>
    </Link>
  }, {
    key: '5',
    label: <Link to={'/map'}>
      <img className="img-h anticon" src="/Icons/menu-white-11.svg" alt="" width="22px" height="22px" style={{ opacity: '0.2' }} />
      <img className="img-a anticon" src="/Icons/menu-green-11.svg" alt="" width="22px" height="22px" style={{ opacity: '0.2', }} />
    </Link>
  }, {
    key: '2',
    label: <Link to={'/map'}>
      <img className="img-h anticon" src="/Icons/menu-white-15.svg" alt="" width="22px" height="22px" style={{ opacity: '0.2' }} />
      <img className="img-a anticon" src="/Icons/menu-green-15.svg" alt="" width="22px" height="22px" style={{ opacity: '0.2' }} />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>watershed story</span>
    </Link>
  // }, {
  //   key: '6',
  //   label: <Link to={'/upload-attachment'}>
  //     <img className="img-h anticon" src="/Icons/menu-white-07.svg" alt="" width="22px" height="22px" />
  //     <img className="img-a anticon" src="/Icons/menu-green-07.svg" alt="" width="22px" height="22px" />
  //     <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>uploader</span>
  //   </Link>
  }, {
    key: '7',
    label: <a href={'https://forms.office.com/r/CUgfTnrTUm'} target="_blank">
      <img className="img-h anticon" src="/Icons/menu-white-12.svg" alt="" width="22px" height="22px" />
      <img className="img-a anticon" src="/Icons/menu-green-12.svg" alt="" width="22px" height="22px" />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>feedback</span>
    </a>
  }, {
    key: '8',
    label: <Link to={'/user'}>
      <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="22px" height="22px" />
      <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="22px" height="22px" />
      <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>settings</span>
    </Link>
  }];
  const removeItemArray = (key: string) => {
    let index = itemMenuSidebar.map((x: any) => x.key).indexOf(key);
    if (index > -1) {
      itemMenuSidebar.splice(index, 1);
    }
  };
  if (!((appUser.designation === 'admin') && (appUser.status === 'approved'))) {
    removeItemArray('8');
  }
  if (!((appUser.designation === 'admin' || appUser.designation === 'staff') && (appUser.status === 'approved'))) {
    removeItemArray('6');
  }
  if (!(appUser.designation !== 'guest')) {
    removeItemArray('0');
    removeItemArray('2');
    removeItemArray('5');
  }
  if (!showWorkRequestPlan) {
    removeItemArray('3');
    removeItemArray('4');
  }
  return <Menu theme="dark" style={{display: 'flex !important'}} className="menu-mobile" defaultSelectedKeys={[indexOf]} mode="inline" items={itemMenuSidebar}>
  </Menu>
}

export default SidebarMenu;
