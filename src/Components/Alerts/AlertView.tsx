import React, {useState} from "react";
import { Modal } from 'antd';

const stateValue = {
  visible: false
}
export const AlertView = ({visibleAlert, setVisibleAlert, setSave, sponsor}:
  {visibleAlert : boolean, setVisibleAlert: Function, setSave: Function, sponsor: string} ) => {
  const [state, setState] = useState(stateValue);

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    auxState.visible = false;
    setVisibleAlert(false);
    setState(auxState);
    setSave(true);
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
      <div >
        <Modal
          centered
          visible={visibleAlert}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal-confirm"
          width="400px"
        >
          <h2>Saving will create a draft project within {sponsor}'s Work Request. Do you want to continue?</h2>
          <button className="btn-borde" onClick={handleCancel}>Cancel</button>
          <button className="btn-purple" onClick={handleOk}><span>Save</span></button>
        </Modal>
      </div>
    </div>
  </>)

};
