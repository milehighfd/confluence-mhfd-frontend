import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Badge, Button, Dropdown, Layout, Menu, Modal, Popover, Tabs } from 'antd';
import { CaretDownOutlined, DoubleRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { GlobalMapHook } from 'utils/globalMapHook';
import * as datasets from 'Config/datasets';
import 'Scss/Components/navbar.scss';
import { ROUTERS, ROUTER_TITLE } from 'constants/constants';
import { useMapDispatch } from 'hook/mapHook';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useUsersState } from 'hook/usersHook';
import ModalEditUserView from 'Components/Profile/ProfileComponents/ModalEditUserView';

const { TabPane } = Tabs;
const { Header } = Layout;
const content = (<div className="popoveer-00">Notifications (Coming Soon)</div>);

const NavbarView = ({
  tabActive
}: {
  tabActive?: string
}) => {
  const [key, setKey] = useState('1');
  const [tabKey, setTabKey] = useState<any>('Unread');
  const [openProfile, setOpenProfile] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const tabKeys = ['Unread', 'All'];
  const stateValue = {
    visible: false,
    visible1:false
  }
  const {userInformation, groupOrganization} = useProfileState ();
  const user =userInformation;
  const {updateUserInformation, getGroupOrganization} = useProfileDispatch();
  const [state, setState] = useState(stateValue);
  const { changeTutorialStatus } = useMapDispatch();
  const { getTimesLogin, resetTimesLogin } = useProfileDispatch();
  const { timesLogged } = useUsersState();
  const { deleteMaps } = GlobalMapHook();
  let displayedTabKey = tabKeys;
  const contentNotification = (
    <div className="popoveer-00 notification-popoveer" style={{maxWidth:'1000000px', width:'369px'}}>
      <div className="notification-header">
        <h2 style={{marginBottom:'0px'}}>NOTIFICATIONS</h2>
      </div>
      <Tabs defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)} className="tabs-map">
        {
          displayedTabKey.map((tk: string) => (
            <TabPane style={{marginBottom:'0px'}} 
              key={tk}>
              <div className="notification-body">
                <img src={"/picture/user03.png"} alt="" height="35px" />
                <div className="text-notification">
                  <p>Badger Gulch @ Upstream of Ridgegate Parkway 2020</p>
                  <p className="date">Work Request is due on 10/28/22</p>
                </div>
              </div>
              <div className="notification-body">
                <img src={"/picture/user03.png"} alt="" height="35px" />
                <div className="text-notification">
                  <p>Badger Gulch @ Upstream of Ridgegate Parkway 2020</p>
                  <p className="date">Work Request is due on 10/28/22</p>
                </div>
              </div>
              <div className="notification-body">
                <img src={"/picture/user03.png"} alt="" height="35px" />
                <div className="text-notification">
                  <p>Badger Gulch @ Upstream of Ridgegate Parkway 2020</p>
                  <p className="date">Work Request is due on 10/28/22</p>
                </div>
              </div>
              <div className="notification-body">
                <img src={"/picture/user03.png"} alt="" height="35px" />
                <div className="text-notification">
                  <p>Badger Gulch @ Upstream of Ridgegate Parkway 2020</p>
                  <p className="date">Work Request is due on 10/28/22</p>
                </div>
              </div>
              <div className="notification-body">
                <img src={"/picture/user03.png"} alt="" height="35px" />
                <div className="text-notification">
                  <p>Badger Gulch @ Upstream of Ridgegate Parkway 2020</p>
                  <p className="date">Work Request is due on 10/28/22</p>
                </div>
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  );
  let locationPage = useLocation();
  useEffect(() => {
    resetTimesLogin();
    getTimesLogin();
  }, []);
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
      if(locationPage.pathname === '/profile-view' || tabActive === 'Schedule' || tabActive === 'Phase') {
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
  const handleOk = (e: any) => {
     const auxState = {...state};
     auxState.visible = false;
     setState(auxState);
   };
   const handleCancel = (e: any) => {
     const auxState = {...state};
     auxState.visible = false;
     setState(auxState);
   };
   const showModal1 = () => {
     const auxState = {...state};
     auxState.visible1 = true;
     setState(auxState);
   };
   const handleOk1 = (e: any) => {
      const auxState = {...state};
      auxState.visible1 = false;
      setState(auxState);
    };
    const handleCancel1 = () => {
      const auxState = {...state};
      auxState.visible1 = false;
      setState(auxState);
    };
  const [redirect, setRedirect] = useState(false);
  const name = user.firstName;
  const initialName = user.firstName.charAt(0) + user.lastName.charAt(0);
  const location = useLocation().pathname.split('/');
  let value = '';
  if(location[1] === ROUTERS.PROFILE_VIEW && location.length === 2) {
    value = ROUTER_TITLE.PROFILE_VIEW;
  } else if (location[1] === ROUTERS.MAP && location.length === 2) {
    value = ROUTER_TITLE.MAP;
  } else if (location[1] === ROUTERS.NEW_PROJECT_TYPES && location.length === 2) {
    value = ROUTER_TITLE.NEW_PROJECT_TYPES;
  } else if (location[1] === ROUTERS.WORK_PLAN && location.length === 2) {
    value = ROUTER_TITLE.WORK_PLAN;
  } else if (location[1] === ROUTERS.WORK_REQUEST && location.length === 2) {
    value = ROUTER_TITLE.WORK_REQUEST;
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
      style={{ marginTop: '-12px'}}
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

  if (redirect) {
    return <Redirect to="/login" />
  }

  return <Header className="header">
    <div className="logo"
      style={{ backgroundImage: 'url(/Icons/logo-02.svg)' }}
    />
    { openProfile && <ModalEditUserView updateUserInformation={updateUserInformation} user={user}
      isVisible={true} hideProfile={hideProfile} groupOrganization={groupOrganization} getGroupOrganization={getGroupOrganization} />}
    <h6>{value}</h6>
    <div style={{alignItems:'center', display:'flex', justifyContent:'end'}}>
      <Popover overlayClassName="popoveer-notification-box" placement="bottom" content={locationPage.pathname === '/pm-tools' ? contentNotification : content}>
        {locationPage.pathname === '/portfolio-list-view' ?
        (<span className="avatar-item">
          <Badge count={22}>
            <button className="notification-icon"></button>
          </Badge>
        </span>):
        (<button className="notification-icon"></button>)}
      </Popover>
      <label className="ll-0" style={{marginTop: '7px' }}></label>
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
           <Button className="btn-question" onClick={showModal1}>
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
    <Modal
     visible={state.visible1}
     onOk={handleOk1}
     onCancel={handleCancel1}
     width="100vw"
     style={{ top: '0', height: '100vh' }}
     className="tutorial-carousel tutorial"
     maskStyle={{
        backgroundColor: "#0000008f"
      }}
    >
      {
        locationPage.pathname === '/map' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-17">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View more than 20 curated layers for additional project context.</i></p>
              </div>
              <div className="tuto-18">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Explore Confluence and learn more about your streams and watersheds. Please use this button to make suggestions, ask questions and provide overall feedback.</i></p>
              </div>
              <div className="tuto-19">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>This is the hybrid map view. Click on the chevron arrows to expand into full map view.</i></p>
              </div>
              <div className="tuto-20">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Access project and problem profiles, detailing associated actions, financial information, team members, and other attributes.</i></p>
              </div>
            </div>}

            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-21">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View different modules within Confluence by clicking the icons in the sidebar.</i></p>
              </div>
              <div className="tuto-22">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create and organize your own map notes.</i></p>
              </div>
              <div className="tuto-23">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Return to your previous map location.</i></p>
              </div>
              <div className="tuto-24">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Confluence uses the latest satellite imagery from Nearmap. Zoom closer to get a peek.</i></p>
              </div>
              <div className="tuto-25">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Measure distances and calculate areas.</i></p>
              </div>
              <div className="tuto-26">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Favorite a project or problem and see it in your MyConfluence profile at any time.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/profile-view' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-27">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View your favorited projects and problems.</i></p>
              </div>
              <div className="tuto-28">
                <p><i>Edit your profile and apply your default map area.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/work-request' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-29">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View all projects in your current board view (to the right)</i></p>
              </div>
              <div className="tuto-47">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create as many 'draft' projects as you want for your Local Government to possibly submit to MHFD for funding.</i></p>
              </div>
              <div className="tuto-31">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Change between Work Plan years, Submit a "Board", View Analytics, Apply a Filter, Share a URL, or Export to CSV</i></p>
              </div>
              <div className="tuto-32">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Move project cards between columns and add requested yearly amounts to develop a plan</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-33">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Change the project type for the current Work Request view.</i></p>
              </div>
              <div className="tuto-34">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Click on the three dots to Zoom to the Project, Edit the Project, and Edit Yearly Amounts.</i></p>
              </div>
              <div className="tuto-35">
                <p><i>Expand the Total Cost for the Work Request board. View a breakdown by County, and Add Target Costs.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/work-plan' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-29">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View all projects in your current board view (to the right).</i></p>
              </div>
              <div className="tuto-30">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Create a project on behalf of a Local Government or to go directly onto the Work Plan.</i></p>
              </div>
              <div className="tuto-31">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Change between Work Request years, Submit a Request, View Analytics, Share a URL, or Export to CSV.</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-33">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Change the project type for the Work Plan and year selected above.</i></p>
              </div>
              <div className="tuto-34">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>Click on the three dots to Zoom to the Project, Edit the Project, and Edit Yearly Amounts.</i></p>
              </div>
              <div className="tuto-35">
                <p><i>Expand the Total Cost for the Work Plan board. View a breakdown by Local Government, and Add Target Costs.</i></p>
                <img src="/Icons/tutorial/ic_arrow9.svg" alt="" />
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/pm-tools' && tabActive === 'List' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-48">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Apply a quick filter by county, local government, service area, manager, consultant and other dimensions.</i></p>
              </div>
              <div className="tuto-37">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Toggle across various views to see your projects in a table, progress view, or calendar display.</i></p>
              </div>
              <div className="tuto-38">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>View only projects where you are a team member.</i></p>
              </div>
              <div className="tuto-39">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Group your selection by various dimensions including by project phase, manager, and contractor.</i></p>
              </div>
            </div>}
            {sliderIndex === 1 && <div className="tuto-01">
              <div className="tuto-40">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>View notifications for projects whose current phase end date is less than 14 days away.</i></p>
              </div>
              <div className="tuto-41">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Click on a project title to open it's Detail Page.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/pm-tools' && tabActive === 'Phase' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-40">
                <img src="/Icons/tutorial/ic_arrow8.svg" alt="" />
                <p><i>View project notifications where a it's current phase end date is less than 14 days away.</i></p>
              </div>
              <div className="tuto-45">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Click on a circle to open that project's phase sidebar. Leave notes, View dates, and Complete the Action checklist.</i></p>
              </div>
              <div className="tuto-42">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Projects consist of distinct phases, grouped into a smaller number of project statuses (i.e. Active) that are the same for all project types.</i></p>
              </div>
            </div>}
          </>
        )
      }
      {
         locationPage.pathname === '/pm-tools' && tabActive === 'Schedule' && (
          <>
            {sliderIndex === 0 && <div className="tuto-01">
              <div className="tuto-43">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>If data is available, a timeline of distinct phases for the project willl appear. Otherwise, if no data is available, users can initiate a project's timeline by clicking on 'Add Dates' and then assigning a current phase and start date.</i></p>
              </div>
              <div className="tuto-44">
                <img src="/Icons/tutorial/ic_arrow7.svg" alt="" />
                <p><i>Left click and drag to scroll left or right or select a daily or monthly view above.</i></p>
              </div>
            </div>}
          </>
        )
      }
      <div className="footer-next">
        <h4>How to Use the&nbsp;
          {locationPage.pathname === '/map' && 'Map'}
          {locationPage.pathname === '/profile-view' && 'MyConfluence Page'}
          {locationPage.pathname === '/work-plan' && 'Work Plan'}
          {locationPage.pathname === '/work-request' &&  'Work Request Board'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'List' && 'PM Tools List View'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'Phase' && 'PM Tools Phase View'}
          {locationPage.pathname === '/pm-tools' && tabActive === 'Schedule' && 'PM Tools Schedule View'}

        </h4>
        <Button onClick={() => {
          setSliderIndex(sliderIndex => sliderIndex + 1);
        }} className="btn-green">{sliderIndex === 1 || tabActive === 'Schedule' || tabActive === 'Phase' ? 'Close': (locationPage.pathname === '/profile-view' ? 'Close':<>Next <DoubleRightOutlined /> </>)}</Button>
      </div>
    </Modal>
  </Header>

};

export default NavbarView;
