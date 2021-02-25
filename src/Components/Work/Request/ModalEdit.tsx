import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

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

  return <>
  <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Apply total requested financing amount for any applicable year:"
        centered
        visible={state.visible}
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
  </>
}
