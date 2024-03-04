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
import DetailModal from 'routes/detail-page/components/DetailModal';
import { FILTER_PROJECTS_TRIGGER } from 'constants/constants';
import { postData, getData, getToken } from 'Config/datasets';
import ModalProjectView from 'Components/ProjectModal/ModalProjectView';

const SidebarMenuDown = ({
  collapsed,
  setVisibleTutorial,
  setVisibleIntroduction,
}: {
  collapsed: boolean;
  setVisibleTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteNotification, deleteAllNotifications, openDiscussionTab } = useProfileDispatch();
  const { TabPane } = Tabs;
  const { userInformation } = useProfileState();
  const [redirect, setRedirect] = useState(false);
  const tabKeys = ['Unread', 'All'];
  const [tabKey, setTabKey] = useState<any>('Unread');
  const [projectData, setProjectData] = useState<any>({});
  const [activeSearch, setActiveSearch] = useState(false);
  const [notification, setNotification] = useState<any>([]);
  const { deleteMaps } = GlobalMapHook();
  const location = useLocation();
  let displayedTabKey = tabKeys;
  const indexOf = '' + ROUTERS_SIDEBAR.indexOf(location.pathname);
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');  
  const [showModalProject, setShowModalProject] = useState(false);
  const [completeProjectData, setCompleteProjectData] = useState<any>(null);
  const [isVisible , setIsVisible] = useState(false);
  useEffect(() => {
    if (userInformation.firstName) {
      setName(userInformation?.firstName);
      setInitialName(userInformation?.firstName?.charAt(0) + userInformation?.lastName?.charAt(0));
    }
  },[userInformation]);
  const getCompleteProjectData = async (record:any) => {
    const dataFromDB = await getData(SERVER.V2_DETAILED_PAGE(record.project_id), getToken());
    setCompleteProjectData({...dataFromDB, tabKey: record?.code_project_type?.project_type_name});   
    setShowModalProject(true);  
  }
  const content = <div className="none-notification">No Notifications</div>;
  const logout = () => {
    datasets.logout();
    setRedirect(true);
    deleteMaps();
  };
  const toggleAllNotifications = () => {
    datasets.postData(SERVER.READ_NOTIFICATION, {}, datasets.getToken()).then(result => {
      if (result.message === 'SUCCESS') {
        setNotification([]);
        deleteAllNotifications();
      }
    });
  };
  const contentNotification = (
    <div className="notification-popoveer hide-bar-tabs">
      <div className="notification-header">
        <h2 className="notification-layout" style={{marginBottom:'0px'}}>NOTIFICATIONS</h2>
        <span
          className="clear-notifications"
          onClick={() => {
            toggleAllNotifications();
          }}
        >
          Mark all as read
        </span>
      </div>
      <hr style={{opacity:'0.5'}}/>
      <div className="tabs-map" >
            <div className='notification-layout-body'>
              {notification?.map((item: any) => {
                if (!item?.subject && item.project_status_notification !== null){
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
                      <img src={'/Icons/user03.png'} alt="" height="35px" />
                      <div className="text-notification">
                        <p>{item?.project?.project_name}</p>
                        <p className="date">{`${item?.project_status_notification?.project_status?.code_phase_type?.phase_name} is due on ${monthEnd}/${dayEnd}/${yearEnd}`}</p>
                      </div>
                    </div>
                  );
                } else{
                  let check1 = moment.utc(
                    item?.created_date,
                    'YYYY-MM-DD',
                  );
                  let monthEnd = check1.format('MM');
                  let dayEnd = check1.format('DD');
                  let yearEnd = check1.format('YYYY');
                  return (
                    <div
                      key={item.notification_id}
                      className="notification-body"
                      onClick={() => {
                        openDiscussionTab(true);
                        if (item?.subject === 'DETAILS') {
                          readClick(item?.project?.project_id, item?.notification_id);
                        } else {
                          getCompleteProjectData(item?.project);
                          removeNotification(item?.notification_id);
                        }
                      }}
                    >
                      <img src={'/Icons/user03.png'} alt="" height="35px" />
                      <div className="text-notification">
                        <p>{item?.project?.project_name}</p>
                        <p className="date">{`New comment from ${item?.firstName} ${item?.lastName} on ${monthEnd}/${dayEnd}/${yearEnd}`}</p>
                      </div>
                    </div>
                  );
                }                
              })}
            </div>
      </div>
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
      {userInformation.photo ? (
        <img src={userInformation.photo} className={'ll-img anticon' + (collapsed ? ' img-profile-collapsed' : '')} alt="profile" />
      ) : (
        <label className="ll-00">{`${initialName}`}</label>
      )}
      <span className={collapsed ? 'menu-down-sidebar-colapse' : 'menu-down-sidebar'}>{name}</span>
    </div>
  );
  function removeNotification(notification_id: any) {
    const sendId = { notification_id: notification_id };
    datasets.postData(SERVER.NOTIFICATIONS, sendId, datasets.getToken()).then(async result => {
      deleteNotification(notification_id);
    });
  }

  function readClick(id: any, notification_id: any) {
    setProjectData({ project_id: id });
    setIsVisible(true);
    removeNotification(notification_id);
  }
  useEffect(() => {    
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
  const setDetailOpen = (value: boolean) => {
    if (!value) {
      setActiveSearch(false);
      setIsVisible(false);
    }
  };
  return (
    <>
      {
        (isVisible && projectData?.project_id) && <DetailModal
          visible={projectData?.project_id}
          setVisible={setDetailOpen}
          data={projectData}
          type={FILTER_PROJECTS_TRIGGER}
        />}
      {
        showModalProject && <ModalProjectView
          visible={showModalProject}
          setVisible={setShowModalProject}
          data={completeProjectData}
          showDefaultTab={true}
          editable={true}
          locality={undefined}
        />
      }
      <Menu
        theme="dark"
        className="menu-mobile sidebar-down"
        defaultSelectedKeys={[indexOf]}
        mode="vertical"
        items={items}
      /></>
  );
};

export default SidebarMenuDown;
