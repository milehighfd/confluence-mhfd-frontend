import React from "react";
import { Modal} from 'antd';

export default ({ save, visible, setVisible, message }: { save: Function, visible: { visible: boolean }, setVisible: Function, message: string }) => {
  const handleCancel = () => {
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
    <h2>{message}</h2>
    <button className="btn-cancel" onClick={() => {
      handleCancel();
    }}>Cancel</button>
    <button className="btn-submit" onClick={() => {
      save();
    }}>Submit</button>
  </Modal>
};
