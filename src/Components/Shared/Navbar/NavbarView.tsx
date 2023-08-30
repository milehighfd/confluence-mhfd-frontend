import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Badge, Button, Dropdown, Layout, Menu, Modal, Popover, Tabs } from 'antd';
import { CaretDownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { GlobalMapHook } from 'utils/globalMapHook';
import * as datasets from 'Config/datasets';
import 'Scss/Components/Shared/navbar.scss';
import { FILTER_PROJECTS_TRIGGER, ROUTERS, ROUTER_TITLE, MAP_TAB, WORK_REQUEST_TAB, WORK_PLAN_TAB } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useUsersState } from 'hook/usersHook';
import ModalEditUserView from 'Components/Profile/ProfileComponents/ModalEditUserView';
import { useAppUserDispatch, useAppUserState } from 'hook/useAppUser';
import moment from 'moment';
import { SERVER } from 'Config/Server.config';
import ModalTutorial from '../Sidebar/ModalTutorial';
import DetailModal from 'routes/detail-page/components/DetailModal';

const { TabPane } = Tabs;
const { Header } = Layout;
const content = (<div className="popoveer-00">No Notifications</div>);

const NavbarView = ({
  tabActive,
  // setTabActive,
}: {
  tabActive?: string,
  // setTabActive?: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { deleteNotification } = useAppUserDispatch();
  const [key, setKey] = useState('1');
  const [tabKey, setTabKey] = useState<any>('Unread');
  const [openProfile, setOpenProfile] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const tabKeys = ['Unread', 'All'];
  const stateValue = {
    visible: false,
    visible1:false
  }
  const [projectData, setProjectData] = useState<any>({});
  const {userInformation, groupOrganization} = useProfileState ();
  const user =userInformation;
  const {updateUserInformation, getGroupOrganization} = useProfileDispatch();
  const [state, setState] = useState(stateValue);
  const [visibleTutorial, setVisibleTutorial] = useState(false);
  const [notification,setNotification] = useState<any>([]);
  const { changeTutorialStatus,getDetailedPageProject, setTabActiveNavbar } = useMapDispatch();
  const { tabActiveNavbar } = useMapState();
  const { getTimesLogin, resetTimesLogin } = useProfileDispatch();
  const { timesLogged } = useUsersState();
  const { deleteMaps } = GlobalMapHook();
  const appUser = useAppUserState();
  let displayedTabKey = tabKeys;
  const contentNotification = (
    <div className="popoveer-00 notification-popoveer">
      <div className="notification-header">
        <h2 className='notification-layout'>NOTIFICATIONS</h2>
      </div>
      <Tabs defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)} className="tabs-map">
        {
          displayedTabKey.map((tk: string) => (
            <TabPane className='notification-layout'
              key={tk}>
              {notification?.map((item: any) => {
                let check1 = moment.utc(item?.project_status_notification?.project_status?.planned_end_date, 'YYYY-MM-DD');
                let monthEnd = check1.format('MM');
                let dayEnd = check1.format('DD');
                let yearEnd = check1.format('YYYY');
                return (
                  <div key={item.notification_id} className="notification-body" onClick={() => readClick(item?.project?.project_id,item?.notification_id)}>
                    <img src={"/picture/user03.png"} alt="" height="35px" />
                    <div className="text-notification">
                      <p>{item?.project?.project_name}</p>
                      <p className="date">{`${item?.project_status_notification?.project_status?.code_phase_type?.phase_name} is due on ${monthEnd}/${dayEnd}/${yearEnd}`}</p>
                    </div>
                  </div>
                )
              })}
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  );
  function readClick(id: any, notification_id: any) {
    const sendId = {notification_id: notification_id};
    datasets.postData(SERVER.NOTIFICATIONS, sendId, datasets.getToken()).then(async result => {
      setProjectData({ project_id: id });
      deleteNotification(notification_id);
      console.log(result)
    });
  }
  let locationPage = useLocation();
  useEffect(() => {
    resetTimesLogin();
    getTimesLogin();
  }, []);
  useEffect(() => {
    setNotification(appUser.notifications);
  },[appUser.notifications]);
  useEffect(() => {
    let currentRef = window.location.href?window.location.href:"none";
    if (timesLogged !== -1) {
      if (timesLogged <= 1 && currentRef.includes('/map')) {
        setState({...state, visible1: true});
      }
    }
  }, [timesLogged]);
  useEffect(() => {
    changeTutorialStatus(state.visible1);
  }, [state]);
  useEffect(() => {
      if(locationPage.pathname === '/profile-view' || tabActiveNavbar === 'Schedule' || tabActiveNavbar === 'Phase') {
        if (sliderIndex === 1) {
          setState({...state, visible1: false});
          setSliderIndex(0);
        }
      }else{
          if (sliderIndex === 2) {
            setState({...state, visible1: false});
            setSliderIndex(0);
        }
    }
  }, [sliderIndex]);
  
  const showModal = () => {
    const auxState = {...state};
    auxState.visible = true;
    setState(auxState);
  };
  const handleOk = () => {
    setState({...state, visible:false});
   };
   const handleCancel = () => {
     setState({...state, visible:false});
   };

  const [redirect, setRedirect] = useState(false);
  const name = user.firstName;
  const initialName = user.firstName.charAt(0) + user.lastName.charAt(0);
  const location = useLocation().pathname.split('/');
  let value = '';
  if(location[1] === ROUTERS.PROFILE_VIEW && location.length === 2) {
    value = ROUTER_TITLE.PROFILE_VIEW;
  } else if (location[1] === ROUTERS.MAP && location.length === 2) {
    if(tabActiveNavbar === MAP_TAB) {
      value = ROUTER_TITLE.MAP;
    }else{
      if(tabActiveNavbar === WORK_REQUEST_TAB) {
        value = ROUTER_TITLE.WORK_REQUEST;
      }else{
        value = ROUTER_TITLE.WORK_PLAN;
      } 
    }
  } else if (location[1] === ROUTERS.NEW_PROJECT_TYPES && location.length === 2) {
    value = ROUTER_TITLE.NEW_PROJECT_TYPES;
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
    deleteMaps();
  }
  const showProfile = () => {
    setOpenProfile(true);
  }
  const hideProfile = () => {
    setOpenProfile(false);
  }
  const items = [
    { key: 'tutorial', label: 'Tutorial' },
    { key: 'logout', label: localStorage.getItem('mfx-token') == 'GUEST' ? 'Sign In' : 'Logout' },
  ];
  const menu = (
    <Menu
      className="menu-login-dropdown new-style-drop-navbar"
      items={items}
      onClick={({ key }) => {
        switch(key) {
          case 'my-profile':
            showProfile();
            break;
          case 'tutorial':
            showModal();
            break;
          case 'logout':
            logout();
            break;
        }
      }}
    />
  );

  const setDetailOpen = (value: boolean) => {
    if (!value) {
      setProjectData({})
    }
  }
  if (redirect) {
    return <Redirect to="/login" />
  }

  return <Header className="header">
    <div className="logo-navbar"/>
    {projectData?.project_id && <DetailModal
      visible={projectData?.project_id}
      setVisible={setDetailOpen}
      data={projectData}
      type={FILTER_PROJECTS_TRIGGER}
    />}
    {openProfile && <ModalEditUserView updateUserInformation={updateUserInformation} user={user}
      isVisible={true} hideProfile={hideProfile} groupOrganization={groupOrganization} getGroupOrganization={getGroupOrganization} />}
    <h6>{value}</h6>
  </Header>

};

export default NavbarView;
