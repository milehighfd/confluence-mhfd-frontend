import React, { useEffect, useState } from 'react';
import { Badge, Menu, MenuProps, Tabs } from 'antd';
import { Redirect, useLocation } from 'react-router-dom';
import store from '../../../store';
import { ROUTERS_SIDEBAR } from './constants/layout.constants';
import '../../../Scss/Components/Shared/sidebar.scss';
import '../../../Scss/Theme/scroll.scss';
import * as datasets from 'Config/datasets';
import { useProfileState } from 'hook/profileHook';
import { GlobalMapHook } from 'utils/globalMapHook';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
import { useAppUserDispatch } from 'hook/useAppUser';

const SidebarMenuDown = ({
  collapsed,
  setVisibleTutorial,
  setVisibleIntroduction,
}: {
  collapsed: boolean;
  setVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteNotification } = useAppUserDispatch();
  const { TabPane } = Tabs;
  const { userInformation } = useProfileState();
  const SubMenu = Menu.SubMenu;
  const [redirect, setRedirect] = useState(false);
  const tabKeys = ['Unread', 'All'];
  const [tabKey, setTabKey] = useState<any>('Unread');
  const user = userInformation;
  const [notification, setNotification] = useState<any>([]);
  const [projectData, setProjectData] = useState<any>({});
  const { deleteMaps } = GlobalMapHook();
  const location = useLocation();
  let displayedTabKey = tabKeys;
  const appUser = store.getState().appUser;
  const indexOf = '' + ROUTERS_SIDEBAR.indexOf(location.pathname);
  const name = user.firstName;
  const initialName = user.firstName.charAt(0) + user.lastName.charAt(0);
  const content = <div className="none-notification">No Notifications</div>;
  const logout = () => {
    datasets.logout();
    setRedirect(true);
    deleteMaps();
  };
  const contentNotification = (
    <div className="notification-popoveer">
      <div className="notification-header">
        <h2 className="notification-layout">NOTIFICATIONS</h2>
        <span className="clear-notifications">Mark all as read</span>
      </div>
      <Tabs
        defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={key => setTabKey(key)}
        className="tabs-map"
      >
        {displayedTabKey.map((tk: string) => (
          <TabPane className="notification-layout" key={tk}>
            <div className='notification-layout-body'>
              {notification?.map((item: any) => {
                let check1 = moment.utc(
                  item?.project_status_notification?.project_status?.planned_end_date,
                  'YYYY-MM-DD',
                );
                let monthEnd = check1.format('MM');
                let dayEnd = check1.format('DD');
                let yearEnd = check1.format('YYYY');
                return (
                  <div
                    key={item.notification_id}
                    className="notification-body"
                    onClick={() => readClick(item?.project?.project_id, item?.notification_id)}
                  >
                    <img src={'/picture/user03.png'} alt="" height="35px" />
                    <div className="text-notification">
                      <p>{item?.project?.project_name}</p>
                      <p className="date">{`${item?.project_status_notification?.project_status?.code_phase_type?.phase_name} is due on ${monthEnd}/${dayEnd}/${yearEnd}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
  const notificationLabel = (
    <div className="menu-back-layout">
      <Badge className="notification-badge" count={notification?.length}>
        <button className="notification-icon"></button>
      </Badge>
      <span className={collapsed ? 'menu-down-sidebar-colapse' : 'menu-down-sidebar'}>Notifications</span>
    </div>
  );
  const optionsLabel = (
    <div className="menu-back-layout">
      {user.photo ? (
        <img src={user.photo} className={'ll-img anticon' + (collapsed ? ' img-profile-collapsed' : '')} alt="profile" />
      ) : (
        <label className="ll-00">{initialName}</label>
      )}
      <span className={collapsed ? 'menu-down-sidebar-colapse' : 'menu-down-sidebar'}>{name}</span>
    </div>
  );

  function readClick(id: any, notification_id: any) {
    const sendId = { notification_id: notification_id };
    datasets.postData(SERVER.NOTIFICATIONS, sendId, datasets.getToken()).then(async result => {
      setProjectData({ project_id: id });
      deleteNotification(notification_id);
      console.log(result);
    });
  }
  useEffect(() => {
    setNotification(appUser.notifications);
  }, [appUser.notifications]);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <Menu theme="dark" className="menu-mobile sidebar-down" defaultSelectedKeys={[indexOf]} mode="vertical">
      <SubMenu
        className="submenu-sidebar custom-submenu"
        key="sub1"
        theme="light"
        title={notificationLabel}
        popupOffset={[15, -10]}
      >
        <Menu.Item key="1" className="notification-layout">
          {notification?.length > 0 ? contentNotification : content}
        </Menu.Item>
      </SubMenu>
      <SubMenu
        className="submenu-sidebar submenu-sidebar-porfile"
        key="sub4"
        theme="light"
        title={optionsLabel}
        popupOffset={[15, -80]}
      >
        <Menu.Item className="option-layout" onClick={() => setVisibleIntroduction(true)} key="2">
          Introduction
        </Menu.Item>
        <Menu.Item className="option-layout" onClick={() => setVisibleTutorial(true)} key="3">
          Tutorial
        </Menu.Item>
        <Menu.Item className="option-layout" onClick={logout} key="4">
          {localStorage.getItem('mfx-token') == 'GUEST' ? 'Sign In' : 'Logout'}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default SidebarMenuDown;
