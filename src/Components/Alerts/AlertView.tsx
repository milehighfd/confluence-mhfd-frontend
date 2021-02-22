import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
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
            {/*<div className="alert-mm">
              <Alert type="error" message="Jon Villines just commented on your project 'Piney Creek Channel Restoration'" banner />
            </div>*/}
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
                 <h2>Saving will create a draft project within your jurisdiction's Work Request. Do you want to continue?</h2>
                 <button className="btn-borde">Cancel</button>
                 <button className="btn-purple">Save</button>
               </Modal>
            </div>
         </div>

};
