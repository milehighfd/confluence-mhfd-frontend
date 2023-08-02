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

const DetailModal = React.lazy(() => import('routes/detail-page/components/DetailModal'));

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
    {/* <div className="navbar-options-box">
      <Popover overlayClassName="popoveer-notification-box" placement="bottom" content={notification?.length > 0 ? contentNotification : content}>
        {locationPage.pathname === '/portfolio-list-view' ?
        (<span className="avatar-item">
          <Badge count={22}>
            <button className="notification-icon"></button>
          </Badge>
        </span>):
        (<button className="notification-icon"></button>)}
      </Popover>
      <label className="ll-0"></label>
      <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="/profile-view" onClick={e => e.preventDefault()} >
            {user.photo ?
              <img src={user.photo} className="ll-img" alt="profile" />
              :
              <label className="ll-00">
                {initialName}
              </label>
            }
            {name} <CaretDownOutlined />
          </a>
        </Dropdown>
        <div className="tutorial">
           <Button className="btn-question" onClick={() => {setVisibleTutorial(true)}}>
            <QuestionCircleOutlined />
          </Button>
        </div>
         
    </div>

    <Modal
      centered
       visible={state.visible}
       onOk={handleOk}
       onCancel={handleCancel}
       className="tutorial tutorial-000"
       width="750px"
    >
      <Tabs activeKey={key} tabPosition="left" onChange={(e) => {
        setKey('' + e);
      }}>
        <div className="logo-00">
          <img src="/Icons/Confluence-Color-Tagline.svg" alt="" />
        </div>
        <TabPane tab="Welcome!" key="1">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
           <div className="content">
              <p>
              Welcome to Confluence! Confluence is your one-stop Mile High Flood District data portal.
              MHFD has developed Confluence from the ground up to meet the unique data needs of a regional
              flood control and stream management district. The system is in an early
              state of development and will evolve over the coming years to include more data and features.
              </p>
            </div>
        </TabPane>
        <TabPane tab="Confluence Overview" key="2">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
           <div className="content">
            <p>
              Confluence introduces a new way to interact with MHFD data. The focus of the system is on “Problems,”
              which are issues that have been identified through Master Plans or other means,
              and “Projects,” which can be any type of work intended to solve the Problems.
              Problems are a new data set for MHFD, and they will be developed over time as new Master Plans and Stream Assessments are conducted.
              The purpose of putting Problems at the forefront of Confluence is to focus on the “why” behind our projects and remind
              users that there can be many ways to solve a Problem.
            </p>
          </div>
        </TabPane>
        <TabPane tab="Navigating Confluence" key="3">
          <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              Navigating Confluence is simple. The top-right corner shows the user who is currently logged-in and allows you to log out or access the Confluence help system (this document). The bar on the left displays icons that let you navigate through the different pages in Confluence. You can click the arrow on the bottom of the left navigation bar to expand the bar and show text next to the icons. For now, the navigation options are: My Confluence, Map View, Uploader (for some users), and Settings (for some users). Each of these options is described in the following sections of this help system.
            </p>
          </div>
        </TabPane>
        <TabPane tab="My Confluence" key="4">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
          <div className="content">
            <p>
              “My Confluence” (the House icon) is your personal Confluence homepage. It displays your user details at the top,
              along with a Profile Picture that can be changed by clicking the green pencil icon and selecting a file
              from your computer. You can click the “Edit Profile” button in the upper right to edit your profile.
              This lets you change your contact information, your Areas of Interest,
              and the default zoom area for the Confluence map.
            </p>
            <p>
            The bottom part of the My Confluence page shows “cards” for Problems and Projects that are in your
            Area of Interest, which will typically be either a municipality or the entire District,
            depending on your user type. Click the words “Problems” or “Projects” above the cards to switch
            between the two. You can also search for a specific Problem or Project in your Area of Interest
            using the search bar labeled “Search by Name,” and you can sort cards using the dropdown on the
            upper right that says “By Status.” Clicking on a Problem or Project card will bring up the Detail
            Page for that Problem or Project. Clicking outside of the Detail Page popup will bring you back to
            My Confluence.
            </p>
            <p>
              The right side of the My Confluence page is currently under construction and will be updated
              with new features as Confluence continues to be developed
            </p>
          </div>
        </TabPane>
        <TabPane tab="Map View" key="5">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
         <div className="content">
            <p>
            The Map View (the Folding Map icon) is the main data view in Confluence.
            While My Confluence is a page that shows data within the Area of Interest selected in your
            User Profile, the Map View allows you to access data throughout the entire District and also
            to see it on a map.
            </p>
            <p>
              At any time you can click the chevrons in the middle and expand the map to fill the entire screen.
              The map will zoom to the default zoom level you have set in your User Profile.
              You can temporarily change this zoom level any time by selecting from the dropdown
              at the top of the page, using your mousewheel, or the zoom buttons on the map.
            </p>
            <p>
              There is only one basemap in Confluence, and it transitions to aerial imagery as you zoom closer.
              You can search for features or addresses using the search bar in the upper left,
              and you can toggle data layers on and off using the green layer icon next to the search bar.
              Click on a feature on the map to view a popup of attributes for that feature.
            </p>
            <p>
              The layout of Problem and Project cards on the right side is the same as on the My Confluence page,
              and you can Search, Sort, and Filter data as well as switch between Problem and Project cards.
              The cards you see on the right side will always reflect what is in the current boundary of
              your map view, along with any filters or search results you have applied.
              Hovering over a feature on the map will highlight its associated card on the right, and vice-versa.
            </p>
            <p>Clicking on a card will bring up the Detail Page for that item.
            The Detail Page shows additional information about the item you have selected, including location,
            staff, status, and cost, as well as related Problems, Projects, and Components.
            The Detail Page is a “cut sheet” of feature information that you can export or share by
            clicking on the icons on the upper right of the page. Clicking the “X” in the upper right or
            just clicking outside of the popup window will close the Detail Page and bring you back to the Map View
            </p>
          </div>
        </TabPane>
        <TabPane tab="Uploader" key="6">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
         <div className="content">
           <p>
             The Document Uploader (Up Arrow icon) is only available to system administrators,
             and allows photos and other files to be uploaded and associated with features in the system.
           </p>
         </div>
        </TabPane>
        <TabPane tab="Settings" key="7">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
         <div className="content">
            <p>
              The Settings page (Gear icon) is only available to system administrators,
              and it is where pending user requests can be reviewed and approved and other
              administrative actions can be taken.
            </p>
         </div>
        </TabPane>
        <TabPane tab="Future Modules" key="8">
         <img className="img-tuto" src="/Icons/tuto.png" alt="" width="485px" />
         <div className="content">
            <p>
              There is a development roadmap for Confluence that will add a number of enhancements over time. These include:
            </p>
            <p>
              A “Project Request” module that will allow users to create their own Projects,
              associate them with Problems, and submit those Projects to MHFD for funding.
              This module will also allow local government and MHFD staff to view draft and approved
              Work Plans and to make changes to those Work Plans.
            </p>
            <p>
              A “Project Management” module that will allow local government and MHFD staff to view and
              update key project information during the life of a project including costs, permits, agreements, etc.
            </p>
            <p>
              A “Watershed Story” module that will bring together all the latest information about a watershed including Master
              Plan and Stream Assessment data along with Problems, Projects, Development Activity, Routine Maintenance,
              and more, all in one convenient location.
            </p>
         </div>
        </TabPane>
      </Tabs>
      <div>
        <Button className="btn-purple" onClick={() => {
          const auxKey = +key + 1;
          if(auxKey === 9) {
            setKey('1');
          } else {
            setKey('' + auxKey)
          }
        }} >Continue</Button>
      </div>
    </Modal>
    <ModalTutorial 
      visibleTutorial={visibleTutorial}
      setVisibleTutorial={setVisibleTutorial}
      locationPage={locationPage}
      sliderIndex={sliderIndex}
      tabActive={tabActiveNavbar}
      setSliderIndex={setSliderIndex}
    /> */}
  </Header>

};

export default NavbarView;
