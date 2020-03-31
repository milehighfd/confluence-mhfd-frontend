import React, { useState } from "react";
import { Alert, Modal, Button } from 'antd';

export default ({ save, visible, setVisible }: { save: Function, visible: { visible: boolean }, setVisible: Function }) => {
  const handleCancel = () => {
    console.log('rrorr close');
    const auxState = {...visible};
    auxState.visible = false;
    setVisible(auxState);
  };
  return <Modal
    centered
    visible={visible.visible}
    onCancel={handleCancel}
    className="modal-confirm"
    width="400px"
  >
    <h2>Are you sure you want to update the user?</h2>
    <button className="btn-cancel" onClick={() => {
      handleCancel();
    }}>Cancel</button>
    <button className="btn-submit" onClick={() => {
      save();
    }}>Submit</button>
  </Modal>
};
