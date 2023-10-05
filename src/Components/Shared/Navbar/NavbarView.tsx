import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Badge, Button, Dropdown, Input, Layout, Menu, Modal, Popover, Tabs, Tooltip } from 'antd';
import { CaretDownOutlined, CloseCircleFilled, CloseCircleOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { GlobalMapHook } from 'utils/globalMapHook';
import * as datasets from 'Config/datasets';
import 'Scss/Components/Shared/navbar.scss';
import { FILTER_PROJECTS_TRIGGER, ROUTERS, ROUTER_TITLE, MAP_TAB, WORK_REQUEST_TAB, WORK_PLAN_TAB } from 'constants/constants';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { useProfileDispatch, useProfileState } from 'hook/profileHook';
import { useUsersState } from 'hook/usersHook';
import moment from 'moment';
import { SERVER } from 'Config/Server.config';
import ModalTutorial from '../Sidebar/ModalTutorial';
import DetailModal from 'routes/detail-page/components/DetailModal';
import NavBarSearchTooltipItem from './NavBarSearch/NavBarSearchTooltipItem';

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
  const { deleteNotification } = useProfileDispatch();
  const [key, setKey] = useState('1');
  const [tabKey, setTabKey] = useState<any>('Unread');
  const [openProfile, setOpenProfile] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const tabKeys = ['Unread', 'All'];
  const stateValue = {
    visible: false,
    visible1:false
  }
  const [projectDataGlobal, setProjectDataGlobal] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const {userInformation, groupOrganization} = useProfileState ();
  const {updateUserInformation, getGroupOrganization} = useProfileDispatch();
  const [state, setState] = useState(stateValue);
  const [visibleTutorial, setVisibleTutorial] = useState(false);
  const [notification,setNotification] = useState<any>([]);
  const { changeTutorialStatus,getDetailedPageProject, setTabActiveNavbar } = useMapDispatch();
  const { tabActiveNavbar } = useMapState();
  const { getTimesLogin, resetTimesLogin } = useProfileDispatch();
  const { timesLogged } = useUsersState();
  const { deleteMaps } = GlobalMapHook();
  const [activeSearch, setActiveSearch] = useState(false);
  const [tabActiveSearch, setTabActiveSearch] = useState('Detail Page');
  const [keyword, setKeyword] = useState('');
  const [searchGlobalData, setSearchGlobalData] = useState<any>([]);
  const appUser = useProfileState();
  const [disabledLG, setDisabledLG] = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');

  let locationPage = useLocation();
  useEffect(() => {
    resetTimesLogin();
    getTimesLogin();
  }, []);
  useEffect(() => {
    setNotification(userInformation.notifications);
  },[userInformation.notifications]);
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
  const name = userInformation?.firstName;
  const initialName = userInformation?.firstName?.charAt(0) + userInformation?.lastName?.charAt(0);
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

  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce((keyword:any) => {
    let type = 'PROJECT';
    switch (tabActiveSearch) {
      case 'Work Request':
        type = WORK_REQUEST_TAB;
        break;
      case 'Work Plan':
        type = WORK_PLAN_TAB;
        break;
    }
    if (activeSearch && keyword !== '') {
      datasets
        .postData(
          SERVER.SEARCH_GLOBAL_PROJECTS,
          { keyword: keyword, type: type },
          datasets.getToken()
        )
        .then((data) => {
          if (type === 'PROJECT') {
            setSearchGlobalData(
              data.projects?.map((item: any) => {
                return {
                  name: item?.project_name,
                  type: `${item?.code_project_type?.project_type_name} · ${item?.currentId[0]?.code_phase_type?.phase_name}`,
                  state: item?.currentId[0]?.code_phase_type?.code_status_type?.status_name,
                  id: item?.project_id,
                  status: item?.currentId[0]?.code_phase_type?.code_status_type?.code_status_type_id,
                };
              })
            );
          } else {
            setSearchGlobalData(
              data.projects?.map((item: any) => {
                return {
                  name: item?.project_name,
                  type: `${item?.board?.year} ${item?.partner?.business_associate?.business_name} · ${item?.board?.projecttype}`,
                  state: item?.code_status_type?.status_name,
                  id: item?.project_id,
                  year: item?.board?.year,
                  locality: item?.board?.locality,
                  projectType: item?.board?.projecttype,
                };
              })
            );
          }
        });
    }
    }, 500),
    [tabActiveSearch, activeSearch]
  );

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (activeSearch && event.target.closest('.navbar-search-content') === null && event.target.id !== 'navbar-search' && !event.target.closest('#navbar-search')) {
        setActiveSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSearch]);  
  
  if (redirect) {
    return <Redirect to="/login" />
  }

  return <Header className="header">
    <div className="logo-navbar"/>
    {visible && <DetailModal
      visible={visible}
      setVisible={setVisible}
      data={projectDataGlobal}
      type={FILTER_PROJECTS_TRIGGER}
    />}
    <h6>{value}</h6>
    <Input
      id='navbar-search'
      className='navbar-search'
      placeholder="Search"
      prefix={<SearchOutlined onClick={() => setActiveSearch(!activeSearch)} />}
      suffix={keyword && <CloseCircleFilled onClick={() => setKeyword('')} />}  
      value={keyword}
      onChange={(e) => {
        setKeyword(e.target.value)
        if (e.target.value === ''){
          setActiveSearch(false);
        }else{
          setActiveSearch(true);
        }
      }}
    />
    {activeSearch && <div style={{position:'absolute'}} className='navbar-search-content'>
      <div className="navbar-search-tooltip">
        <div className='tab-navbar-search'>
          <p className={tabActiveSearch === 'Detail Page'? 'active':''} onClick={()=>{setTabActiveSearch('Detail Page')}}>Project Details</p>
          <p
            style={
              userInformation.designation === 'admin' ||
                userInformation.designation === 'staff' ?
                {} :
                { opacity: 0.3, pointerEvents: 'none' }
            }
            className={tabActiveSearch === 'Work Request' ? 'active' : ''}
            onClick={
              (userInformation.designation === 'admin' ||
                userInformation.designation === 'staff') ?
                () => setTabActiveSearch('Work Request') : undefined
            }
          >Work Request
          </p>
          <p className={tabActiveSearch === 'Work Plan'? 'active':''} onClick={()=>{setTabActiveSearch('Work Plan')}}>Work  Plan</p>
        </div>
        <NavBarSearchTooltipItem
          title={tabActiveSearch}
          cards={searchGlobalData}
          tabActiveSearch={tabActiveSearch}
          setActiveSearch={setActiveSearch}
          setProjectData={setProjectDataGlobal}
          setVisible={setVisible}
        />
      </div>
    </div> }
    {/* <Tooltip overlayClassName='tootip-search-responsive' trigger={["focus","click"]} title={NavBarSearchTooltip}>
      <Input  id='navbar-search' className='navbar-search' placeholder="Search" prefix={<SearchOutlined />} />
    </Tooltip> */}
  </Header>

};

export default NavbarView;
