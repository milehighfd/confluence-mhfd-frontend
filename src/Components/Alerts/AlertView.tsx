import React, {useState} from "react";
import { Alert,  Modal, Button  } from 'antd';
import { RightOutlined } from '@ant-design/icons';

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
 return   <div>
            <div className="alert-mm">
              <Alert type="error" message="Jon Villines just commented on your project 'Piney Creek Channel Restoration'" banner />
            </div>
            <div >
              <Button type="primary" onClick={showModal}>
                 Open Modal
               </Button>
               <Modal
                 centered
                 visible={state.visible}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 className="modal-confirm"
                 width="400px"
               >
                 <h2>Are you sure want to submit the draft project?</h2>
                 <button className="btn-borde">Cancel</button>
                 <button className="btn-purple">Submit</button>
               </Modal>
            </div>

            <div className="map-pop-02">
              <h4>LAYERS</h4>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Detention Facilities <RightOutlined /></Button>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> Problems <RightOutlined /></Button>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-75.svg" alt=""/> Watersheds <RightOutlined /></Button>
              </div>
              <div className="layer-popup">
                <Button className="btn-transparent"><img src="/Icons/icon-76.svg" alt=""/> MEP Referrals <RightOutlined /></Button>
              </div>
            </div>
         </div>

};
