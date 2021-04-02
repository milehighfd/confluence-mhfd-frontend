import React, { useState } from "react";
import { Modal, Button, Input } from 'antd';

const stateValue = {
  visible: false
}

const AmountModal = ({ project, projectId, visible, setVisible, startYear, saveData }: { project:any, projectId: any, visible: boolean, setVisible: Function, startYear: number, saveData: Function }) => {
  const [year0, setYear0] = useState(project.req1);
  const [year1, setYear1] = useState(project.req2);
  const [year2, setYear2] = useState(project.req3);
  const [year3, setYear3] = useState(project.req4);
  const [year4, setYear4] = useState(project.req5);

  const handleOk = (e: any) => {
    saveData({
      projectId,
      amounts: [year0, year1, year2, year3, year4]
    })
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setYear0(project.req1);
    setYear1(project.req2);
    setYear2(project.req3);
    setYear3(project.req4);
    setYear4(project.req5);
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
      <p>{startYear}</p>
      <Input value={year0} onChange={(e: any) => setYear0(e.target.value)} prefix={
        <Button onClick={() => setYear0(null)}>
          <img src="/Icons/icon-23.svg" />
        </Button>
      } />

      <p>{startYear + 1}</p>
      <Input value={year1} onChange={(e: any) => setYear1(e.target.value)} prefix={
        <Button onClick={() => setYear1(null)}>
          <img src="/Icons/icon-23.svg" />
        </Button>
      } />

      <p>{startYear + 2}</p>
      <Input value={year2} onChange={(e: any) => setYear2(e.target.value)} prefix={
        <Button onClick={() => setYear2(null)}>
          <img src="/Icons/icon-23.svg" />
        </Button>
      } />

      <p>{startYear + 3}</p>
      <Input value={year3} onChange={(e: any) => setYear3(e.target.value)} prefix={
        <Button onClick={() => setYear3(null)}>
          <img src="/Icons/icon-23.svg" />
        </Button>
      } />

      <p>{startYear + 4}</p>
      <Input value={year4} onChange={(e: any) => setYear4(e.target.value)} prefix={
        <Button onClick={() => setYear4(null)}>
          <img src="/Icons/icon-23.svg" />
        </Button>
      } />

    </Modal>
  )
}

export default AmountModal;
