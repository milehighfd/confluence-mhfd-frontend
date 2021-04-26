import React, { useState } from "react";
import { Modal } from 'antd';

const stateValue = {
  visible: false
}
export const DeleteAlert = ({ visibleAlert, setVisibleAlert, action, name }: {
  visibleAlert: boolean,
  setVisibleAlert: Function,
  action: Function,
  name: string
}) => {
  const [state, setState] = useState(stateValue);

  const handleOk = (e: any) => {
    setVisibleAlert(false);
    action();
  };

  const handleCancel = (e: any) => {
    setVisibleAlert(false);
  };

  return (
    <Modal
      centered
      visible={visibleAlert}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-confirm"
      width="400px"
    >
      <h2>Delete draft project '{name}'?</h2>
      <button className="btn-borde" onClick={handleCancel}>Cancel</button>
      <button className="btn-danger" onClick={handleOk}><span>Delete</span></button>
    </Modal>
  )

};
