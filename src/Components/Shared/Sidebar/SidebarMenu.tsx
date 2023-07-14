import React from "react";
import { Menu, MenuProps } from 'antd';
import { Link, useLocation } from "react-router-dom";
import store from "../../../store";
import { ROUTERS_SIDEBAR } from "./constants/layout.constants";
import '../../../Scss/Components/sidebar.scss';
import { useMapDispatch, useMapState } from "hook/mapHook";
import { MAP, WORK_PLAN, WORK_REQUEST } from "constants/constants";

const SidebarMenu = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const appUser = store.getState().appUser;
  const { setTabActiveNavbar } =  useMapDispatch();
  const { tabActiveNavbar } = useMapState();
  const indexOf = '' + (ROUTERS_SIDEBAR.indexOf(location.pathname) === 1 ? (tabActiveNavbar === MAP? '1': (tabActiveNavbar === WORK_REQUEST ? '4':'3')):ROUTERS_SIDEBAR.indexOf(location.pathname));
  const showWorkRequestPlan = (appUser?.designation?.toLocaleLowerCase() !== 'guest' && (appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff'))
  const userApproved = appUser.status === 'approved';
  const pmToolsAccess = (appUser?.designation?.toLocaleLowerCase() !== 'guest' && (appUser.designation === 'admin' || appUser.designation === 'staff') && appUser.status === 'approved');

  const itemMenuSidebar: MenuProps['items'] = [{
    className: Number(indexOf) === 0 ? 'menu-sidebar-hover':'',
    key: '0',
    label: <Link to={'/profile-view'}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-01.svg" alt="" width="22px" height="20px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-01.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>my confluence</span>
    </Link>
  }, {
    className: Number(indexOf) === 1 ? 'menu-sidebar-hover':'',
    key: '1',
    label: <Link to={'/map'} onClick={()=>{setTabActiveNavbar(MAP)}}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-02.svg" alt="" width="22px" height="20px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-02.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>map view</span>
    </Link>
  }, 
  {
    key: '4',
    className: Number(indexOf) === 4  ? 'menu-sidebar-hover':'',
    label: <Link to={userApproved ? '/map' : '#'} onClick={()=>{setTabActiveNavbar(WORK_REQUEST)}}>
      <img className={"img-h anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-14.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-14.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>work request</span>
    </Link>
  },
  {
    key: '3',
    className: Number(indexOf) === 3 ? 'menu-sidebar-hover':'',
    label: <Link to={userApproved ? '/map' : '#'} onClick={()=>{setTabActiveNavbar(WORK_PLAN)}}>
      <img className={"img-h anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-13.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-13.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>work plan</span>
    </Link>
  },
  {
    className: Number(indexOf) === 5 ? 'menu-sidebar-hover':'',
    key: '5',
    label: <Link to={pmToolsAccess ? '/pm-tools' : '#'}>
      <img className={"img-h anticon"+(pmToolsAccess?'':' img-opaque')+(collapsed?" img-collapsed":"")}src="/Icons/menu-white-11.svg" alt="" width="22px" height="22px"/>
      <img className={"img-a anticon"+(pmToolsAccess?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-11.svg" alt="" width="22px" height="22px"/>
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>pm tools</span>
    </Link>
  }, {
    className: Number(indexOf) === 2 ? 'menu-sidebar-hover':'',
    key: '2',
    label: <Link to={'/map'}>
      <img className="img-h anticon img-opaque" src="/Icons/menu-white-15.svg" alt="" width="22px" height="22px" />
      <img className="img-a anticon img-opaque" src="/Icons/menu-green-15.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>watershed story</span>
    </Link>
  // }, {
  //   key: '6',
  //   label: <Link to={'/upload-attachment'}>
  //     <img className="img-h anticon" src="/Icons/menu-white-07.svg" alt="" width="22px" height="22px" />
  //     <img className="img-a anticon" src="/Icons/menu-green-07.svg" alt="" width="22px" height="22px" />
  //     <span style={{ marginLeft: collapsed ? '-20px' : '-2px' }}>uploader</span>
  //   </Link>
  }, {
    className: Number(indexOf) === 7 ? 'menu-sidebar-hover':'',
    key: '7',
    label: <a href={'https://forms.office.com/r/CUgfTnrTUm'} target="_blank">
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-12.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-12.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>feedback</span>
    </a>
  }, {
    key: '8',
    className: Number(indexOf) === 8 ? 'menu-sidebar-hover':'',
    label: <Link to={'/user'}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-06.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-06.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>settings</span>
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
  if (!(appUser?.designation?.toLocaleLowerCase() !== 'guest')) {
    removeItemArray('0');
    removeItemArray('2');
    removeItemArray('5');
  }
  if (!showWorkRequestPlan) {
    removeItemArray('3');
    removeItemArray('4');
    removeItemArray('11');
  }
  return <Menu theme="dark" className="menu-mobile" defaultSelectedKeys={[indexOf]} mode="inline" items={itemMenuSidebar}>
  </Menu>
}

export default SidebarMenu;
