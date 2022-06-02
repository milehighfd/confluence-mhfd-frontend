import React, { useState } from "react";
import { Modal } from 'antd';
import { useLocation } from "react-router-dom";
import store from "../../../store";
import '../../../Scss/Components/sidebar.scss';

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

    //  const [collapsed, setCollapsed] = useState<boolean>(true);
     const location = useLocation();
     const appUser = store.getState().appUser;
    //  const indexOf = "" + ROUTERS_SIDEBAR.indexOf(location.pathname);

    //  const showWorkRequestPlan = (appUser.designation !== 'guest' && appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff')
    //  const userApproved = appUser.status === 'approved';

  return (
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
  )
};
