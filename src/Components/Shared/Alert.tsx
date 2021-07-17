import React from "react";
import { Button, Modal} from 'antd';

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
    <Button className="btn-cancel" onClick={() => {
      handleCancel();
    }}>Cancel</Button>
    <Button className="btn-submit" onClick={() => {
      save();
    }}>Update</Button>
  </Modal>
};
