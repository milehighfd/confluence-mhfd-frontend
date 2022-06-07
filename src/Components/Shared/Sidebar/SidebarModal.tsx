import React, { useState } from "react";
import { Modal } from 'antd';
import '../../../Scss/Components/sidebar.scss';
import { stateValue } from "./constants/layout.constants";


const SidebarModal = () => {
  const [state, setState] = useState(stateValue);

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

export default SidebarModal;