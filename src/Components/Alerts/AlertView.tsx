import React, {useState} from "react";
import { Alert,  Modal, Button, Card, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const stateValue = {
  visible: false
}
export const AlertView = ({visibleAlert, setVisibleAlert, setVisible}:
  {visibleAlert : boolean, setVisibleAlert: Function, setVisible: Function} ) => {
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
    setVisibleAlert(false);
    setState(auxState);
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
  };
 return (
  <>
  {visibleAlert}
    <div>
      <div className="alert-mm">
        <Alert type="success" message="Jon Villines just commented on your project 'Piney Creek Channel Restoration'" banner />
        <Alert type="error" message="Jon Villines just commented on your project 'Piney Creek Channel Restoration'" banner />
      </div>
      <div >
        <Modal
          centered
          visible={visibleAlert}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal-confirm"
          width="400px"
        >
          <h2>Saving will create a draft project within your jurisdiction's Work Request. Do you want to continue?</h2>
          <button className="btn-borde" onClick={handleCancel}>Cancel</button>
          <button className="btn-purple" onClick={handleOk}>Save</button>
        </Modal>
      </div>
    </div>
  </>)

};
