import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import SidebarMenu from './SidebarMenu';
import SidebarModal from './SidebarModal';
import '../../../Scss/Components/Shared/sidebar.scss';
import SidebarMenuDown from './SidebarMenuDown';
import ModalTutorial from './ModalTutorial';
import { useLocation } from 'react-router-dom';
import { getTimesLogin, resetTimesLogin } from 'store/actions/usersActions';
import { useMapState } from 'hook/mapHook';
import IntroducionModal from './IntroducionModal';

const { Sider } = Layout;
const SidebarView = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [visibleTutorial, setVisibleTutorial] = useState(false);
  const [visibleIntroduction, setVisibleIntroduction] = useState(false);
  const { tabActiveNavbar } = useMapState();
  let locationPage = useLocation();
  useEffect(() => {
    resetTimesLogin();
    getTimesLogin();
  }, []);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    if (locationPage.pathname === '/profile-view' || tabActiveNavbar === 'Schedule' || tabActiveNavbar === 'Phase') {
      if (sliderIndex === 1) {
        setVisibleTutorial(false);
        setSliderIndex(0);
      }
    } else {
      if (sliderIndex === 2) {
        setVisibleTutorial(false);
        setSliderIndex(0);
      }
    }
  }, [sliderIndex]);

  return (
    <Sider
      className="display-sider"
      collapsedWidth="58"
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <SidebarMenu collapsed={collapsed} />
      <SidebarMenuDown
        collapsed={collapsed}
        setVisibleTutorial={setVisibleTutorial}
        setVisibleIntroduction={setVisibleIntroduction}
      />
      <SidebarModal />
      <ModalTutorial
        visibleTutorial={visibleTutorial}
        setVisibleTutorial={setVisibleTutorial}
        locationPage={locationPage}
        sliderIndex={sliderIndex}
        tabActive={tabActiveNavbar}
        setSliderIndex={setSliderIndex}
      />
      <IntroducionModal
        visibleIntroduction={visibleIntroduction}
        setVisibleIntroduction={setVisibleIntroduction}
      ></IntroducionModal>
    </Sider>
  );
};
export default SidebarView;
