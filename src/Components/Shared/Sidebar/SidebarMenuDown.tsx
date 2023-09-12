import React, { useEffect, useState } from 'react';
import { Badge, Menu, MenuProps, Tabs } from 'antd';
import { Redirect, useLocation } from 'react-router-dom';
import { ROUTERS_SIDEBAR } from './constants/layout.constants';
import '../../../Scss/Components/Shared/sidebar.scss';
import '../../../Scss/Theme/scroll.scss';
import * as datasets from 'Config/datasets';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { GlobalMapHook } from 'utils/globalMapHook';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';

const SidebarMenuDown = ({
  collapsed,
  setVisibleTutorial,
  setVisibleIntroduction,
}: {
  collapsed: boolean;
  setVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteNotification } = useProfileDispatch();
  const { TabPane } = Tabs;
  const { userInformation } = useProfileState();
  const [redirect, setRedirect] = useState(false);
  const tabKeys = ['Unread', 'All'];
  const [tabKey, setTabKey] = useState<any>('Unread');
  const user = userInformation;
  const [notification, setNotification] = useState<any>([]);
  const { deleteMaps } = GlobalMapHook();
  const location = useLocation();
  let displayedTabKey = tabKeys;
  const indexOf = '' + ROUTERS_SIDEBAR.indexOf(location.pathname);
  const name = user.firstName;
  const initialName = user?.firstName?.charAt(0) + user?.lastName?.charAt(0);
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
      deleteNotification(notification_id);
      console.log(result);
    });
  }
  useEffect(() => {
    console.log('Same loop', userInformation);
    setNotification(userInformation.notifications);
  }, [userInformation.notifications]);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  const items: MenuProps['items'] = [
    {
      key: 'sub1',
      className: 'submenu-sidebar custom-submenu',
      theme: 'light',
      label: notificationLabel,
      popupOffset: [15, -10],
      children: [
        {
          key: '1',
          className: 'notification-layout',
          label: notification?.length > 0 ? contentNotification : content,
        },
      ],
    },
    {
      key: 'sub4',
      className: 'submenu-sidebar submenu-sidebar-porfile',
      theme: 'light',
      label: optionsLabel,
      popupOffset: [15, -100],
      children: [
        {
          key: '2',
          className: 'option-layout option-layout-top',
          label: 'Introduction',
          onClick: () => setVisibleIntroduction(true),
        },
        {
          key: '3',
          className: 'option-layout option-layout-central',
          label: 'Tutorial',
          onClick: () => setVisibleTutorial(true),
        },
        {
          key: '4',
          className: 'option-line',
          type: 'divider',
          dashed: true,
        },
        {
          key: '5',
          className: 'option-layout',
          label: localStorage.getItem('mfx-token') === 'GUEST' ? 'Sign In' : 'Logout',
          onClick: logout,
        },
      ]
    }
  ];

  return (
    <Menu
      theme="dark"
      className="menu-mobile sidebar-down"
      defaultSelectedKeys={[indexOf]}
      mode="vertical"
      items={items}
    />
  );
};

export default SidebarMenuDown;
