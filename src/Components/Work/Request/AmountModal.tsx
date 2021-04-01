import React, { useState } from "react";
import { Modal, Button, Input } from 'antd';

const stateValue = {
  visible: false
}

const AmountModal = ({ visible, setVisible }: { visible: boolean, setVisible: Function }) => {

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <Modal
      title="Apply total requested financing amount for any applicable year:"
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="work-modal-edit"
      width="390px"
      footer={[
        <Button className="btn-transparent" onClick={handleCancel}>
          Clear
          </Button>,
        <Button className="btn-purple" onClick={handleOk}>
          Save
          </Button>,
      ]}
    >
      <p>2020</p>
      <Input placeholder="" prefix={<img src="/Icons/icon-23.svg" />} />

      <p>2021</p>
      <Input placeholder="" prefix={<img src="/Icons/icon-23.svg" />} />

      <p>2022</p>
      <Input placeholder="" prefix={<img src="/Icons/icon-23.svg" />} />

      <p>2023</p>
      <Input placeholder="" prefix={<img src="/Icons/icon-23.svg" />} />

      <p>2024</p>
      <Input placeholder="" prefix={<img src="/Icons/icon-23.svg" />} />

    </Modal>
  )
}

export default AmountModal;
