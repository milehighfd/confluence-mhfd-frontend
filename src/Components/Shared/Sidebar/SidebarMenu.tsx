import React from 'react';
import { Menu, MenuProps, Badge, Popover, Button } from 'antd';
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTERS_SIDEBAR } from "./constants/layout.constants";
import '../../../Scss/Components/Shared/sidebar.scss';
import { useMapDispatch, useMapState } from "hook/mapHook";
import { MAP, WORK_PLAN, WORK_REQUEST } from "constants/constants";
import { useAppUserState } from "hook/useAppUser";
import { QuestionCircleOutlined } from "@ant-design/icons";

const SidebarMenu = ({ collapsed, setVisibleTutorial, }: { collapsed: boolean, setVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const location = useLocation();
  const history = useHistory();
  const { search } = history.location;
  const appUser = useAppUserState();
  const { setTabActiveNavbar } =  useMapDispatch();
  const { tabActiveNavbar } = useMapState();
  const indexOf = '' + (ROUTERS_SIDEBAR.indexOf(location.pathname) === 1 ? (tabActiveNavbar === MAP? '1': (tabActiveNavbar === WORK_REQUEST ? '4':'3')):ROUTERS_SIDEBAR.indexOf(location.pathname));
  const showWorkRequestPlan = (appUser?.designation?.toLocaleLowerCase() !== 'guest' && (appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff'))
  const userApproved = appUser.status === 'approved';
  const pmToolsAccess = (appUser?.designation?.toLocaleLowerCase() !== 'guest' && (appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff') && appUser.status === 'approved');

  const itemMenuSidebar: MenuProps['items'] = [{
    className: Number(indexOf) === 0 ? 'menu-sidebar-hover':'',
    key: '0',
    label: <Link to={'/profile-view'}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-01.svg" alt="" width="22px" height="20px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-01.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse mobile-menu-no-display' : 'menu-sidebar'}>my confluence</span>
    </Link>
  }, {
    className: Number(indexOf) === 1 ? 'menu-sidebar-hover':'',
    key: '1',
    label: <Link to={'/map'} onClick={()=>{setTabActiveNavbar(MAP)}}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-02.svg" alt="" width="22px" height="20px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-02.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse mobile-menu-no-display' : 'menu-sidebar'}>map view</span>
    </Link>
  }, 
  {
    key: '4',
    className: Number(indexOf) === 4  ? 'menu-sidebar-hover mobile-menu-no-display':'mobile-menu-no-display',
    label: <Link to={userApproved ? '/map'+search : '#'} onClick={()=>{setTabActiveNavbar(WORK_REQUEST)}}>
      <img className={"img-h anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-14.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-14.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse mobile-menu-no-display' : 'menu-sidebar'}>work request</span>
    </Link>
  },
  {
    key: '3',
    className: Number(indexOf) === 3 ? 'menu-sidebar-hover mobile-menu-no-display':'mobile-menu-no-display',
    label: <Link to={userApproved ? '/map'+search : '#'} onClick={()=>{setTabActiveNavbar(WORK_PLAN)}}>
      <img className={"img-h anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-13.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(userApproved?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-13.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>work plan</span>
    </Link>
  },
  {
    className: Number(indexOf) === 5 ? 'menu-sidebar-hover mobile-menu-no-display':'mobile-menu-no-display',
    key: '5',
    label: <Link to={pmToolsAccess ? '/pm-tools' : '#'}>
      <img className={"img-h anticon"+(pmToolsAccess?'':' img-opaque')+(collapsed?" img-collapsed":"")}src="/Icons/menu-white-11.svg" alt="" width="22px" height="22px"/>
      <img className={"img-a anticon"+(pmToolsAccess?'':' img-opaque')+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-11.svg" alt="" width="22px" height="22px"/>
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>pm tools</span>
    </Link>
  }, {
    className: Number(indexOf) === 2 ? 'menu-sidebar-hover mobile-menu-no-display':'mobile-menu-no-display',
    key: '2',
    label: <Link to={'/map'}>
      <img className={"img-h anticon img-opaque"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-15.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon img-opaque"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-15.svg" alt="" width="22px" height="22px" />
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
      <span className={collapsed? 'menu-sidebar-colapse mobile-menu-no-display' : 'menu-sidebar'}>feedback</span>
    </a>
  }, {
    key: '8',
    className: Number(indexOf) === 8 ? 'menu-sidebar-hover mobile-menu-no-display':'mobile-menu-no-display',
    label: <Link to={'/user'}>
      <img className={"img-h anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-white-06.svg" alt="" width="22px" height="22px" />
      <img className={"img-a anticon"+(collapsed?" img-collapsed":"")} src="/Icons/menu-green-06.svg" alt="" width="22px" height="22px" />
      <span className={collapsed? 'menu-sidebar-colapse' : 'menu-sidebar'}>settings</span>
    </Link>
  },
  {
    key: '9',
    className: Number(indexOf) === 9 ? 'menu-sidebar-hover desktop-menu-no-display':'desktop-menu-no-display',
    label: <Button className="btn-question" onClick={() => {setVisibleTutorial(true)}}>
    <QuestionCircleOutlined />
  </Button>
  },
];
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
  return <Menu theme="dark" className="menu-mobile footer-mobile" defaultSelectedKeys={[indexOf]} mode="inline" items={itemMenuSidebar}>
  </Menu>
}

export default SidebarMenu;
