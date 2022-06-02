import React, { useState } from "react";
import { Layout, Menu, Modal, Button } from 'antd';
import { Link, useLocation } from "react-router-dom";
import store from "../../../store";
import { ROUTERS_SIDEBAR } from "../../../constants/constants";
import '../../../Scss/Components/sidebar.scss';
const { Sider } = Layout;

const stateValue = {
  visible: false
}

export default () => {
  const [state, setState] = useState(stateValue);
 const showModal = () => {
   const auxState = {...state};
   auxState.visible = true;
   setState(auxState);
 };

 const handleOk = (e: any) => {
   console.log(e);
   const auxState = {...state};
   auxState.visible = false;
   setState(auxState);
 };

 const handleCancel = (e: any) => {
   console.log(e);
   const auxState = {...state};
   auxState.visible = false;
   setState(auxState);
 };

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const location = useLocation();
  const appUser = store.getState().appUser;
  const indexOf = "" + ROUTERS_SIDEBAR.indexOf(location.pathname);

  const showWorkRequestPlan = (appUser.designation !== 'guest' && appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff')
  const userApproved = appUser.status === 'approved';

  return <Sider collapsedWidth="58" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} style={{'zIndex': 1000}}>
    <Menu theme="dark" defaultSelectedKeys={[indexOf]} mode="inline" >
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="0" className="menu-mobile">
        <Link to={'/profile-view'} style={{ textDecoration: 'none' }}>
          <img className="img-h anticon" src="/Icons/menu-white-01.svg" alt="" width="22px" height="18px"/>
          <img className="img-a anticon" src="/Icons/menu-green-01.svg" alt="" width="22px" height="18px" />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>my confluence</span>
        </Link>
      </Menu.Item> : ''}
      <Menu.Item key="1" className="menu-mobile" style={{padding: '0px 0px 0px 0px'}}>
        <Link to={'/map'} >
          <img className="img-h anticon" src="/Icons/menu-white-02.svg" alt="" width="22px" height="18px" />
          <img className="img-a anticon" src="/Icons/menu-green-02.svg" alt="" width="22px" height="18px" />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px', padding: '0'}}>map view</span>
        </Link>
      </Menu.Item>
      {showWorkRequestPlan &&
        <Menu.Item key="4" className="menu-mobile">
          <Link to={userApproved ? '/work-request': '#'}>
            <img className="img-h anticon" src="/Icons/menu-white-14.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}} />
            <img className="img-a anticon" src="/Icons/menu-green-14.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}} />
            <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>work request</span>
          </Link>
        </Menu.Item>
      }
      {showWorkRequestPlan ?
      <Menu.Item key="3" className="menu-mobile">
        <Link to={userApproved ? '/work-plan': '#'}>
          <img className="img-h anticon" src="/Icons/menu-white-13.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}}/>
          <img className="img-a anticon" src="/Icons/menu-green-13.svg" alt="" width="22px" height="18px" style={{opacity: userApproved ? '1': '0.2'}}/>
          <span style={{marginLeft: collapsed ? '-20px' : '0px'}}>work plan</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="5" className="menu-mobile">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-11.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
          <img className="img-a anticon" src="/Icons/menu-green-11.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
          <span style={{marginLeft: collapsed ? '-20px' : '0px'}}>project management</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation !== 'guest') ?
      <Menu.Item key="2" className="menu-mobile">
        <Link to={'/map'}>
          <img className="img-h anticon" src="/Icons/menu-white-15.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}} />
          <img className="img-a anticon" src="/Icons/menu-green-15.svg" alt="" width="22px" height="18px" style={{opacity: '0.2'}}  />
          <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>watershed story</span>
        </Link>
      </Menu.Item> : ''}
      {(appUser.designation === 'admin' ||
        appUser.designation === 'staff') && (appUser.status === 'approved') ?
        <Menu.Item key="6" className="menu-mobile">
          <Link to={'/upload-attachment'}>
            <img className="img-h anticon" src="/Icons/menu-white-07.svg" alt="" width="22px" height="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-07.svg" alt="" width="22px" height="18px" />
            <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>uploader</span>
          </Link>
        </Menu.Item> : ''}
        <Menu.Item key="7" className="menu-mobile">
          <a href={'https://docs.google.com/forms/d/e/1FAIpQLScpFx7KApWLATmdAEUTnEFuDWLEHDIQIjwJiqkHXH5yOl2G4Q/viewform?usp=sf_link'} target="_blank">
            <img className="img-h anticon" src="/Icons/menu-white-12.svg" alt="" width="22px" height="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-12.svg" alt="" width="22px" height="18px" />
            <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>feedback</span>
          </a>
        </Menu.Item>
      {(appUser.designation === 'admin') && (appUser.status === 'approved') ?
        <Menu.Item key="8" className="menu-mobile">
          <Link to={'/user'}>
            <img className="img-h anticon" src="/Icons/menu-white-06.svg" alt="" width="22px" height="18px" />
            <img className="img-a anticon" src="/Icons/menu-green-06.svg" alt="" width="22px" height="18px" />
            <span style={{marginLeft: collapsed ? '-20px' : '-2px'}}>settings</span>
          </Link>
        </Menu.Item> : ''}
        {/* <Menu.Item key="9" className="menu-desktop">
          <a onClick={showModal}>
            <i className="anticon mdi mdi-help-circle-outline"/>
            <span></span>
          </a>
        </Menu.Item>
        <Menu.Item key="10" className="menu-desktop">
          <Link to={''}>
            <i className="anticon mdi mdi-logout" />
          </Link>
        </Menu.Item> */}
    </Menu>
    <Modal
       centered
       visible={state.visible}
       onOk={handleOk}
       onCancel={handleCancel}
       className="tutorial-mobile"
       width="100vw"
       style={{height:'100%', top:'0px'}}
     >
       <div className="tuto-01">
         <div className="tuto-17">
           <img src="/Icons/tutorial/ic_arrow5.svg" alt="" />
           <p><i>Click here to see all of the layers for display.</i></p>
         </div>
         <div className="tuto-18">
           <img src="/Icons/tutorial/ic_arrow22.svg" alt="" />
           <p><i>Click here to zoom to your location.</i></p>
         </div>
         <div className="tuto-19">
           <img src="/Icons/tutorial/ic_arrow22.svg" alt="" />
           <p><i>Click here to quickly zoom out to MHFD boundary extents.</i></p>
         </div>
         <div className="tuto-20">
           <img src="/Icons/tutorial/ic_arrow33.svg" alt="" />
           <p><i>Swipe up to view all Project & Problem cards within your area.</i></p>
         </div>
       </div>
     </Modal>
  </Sider>
};
