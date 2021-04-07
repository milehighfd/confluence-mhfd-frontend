import React, { useState } from "react";
import { Modal, Button, Input, InputNumber } from 'antd';

const stateValue = {
  visible: false
}

const AmountModal = ({ project, projectId, visible, setVisible, startYear, saveData }: { project: any, projectId: any, visible: boolean, setVisible: Function, startYear: number, saveData: Function }) => {
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

  const priceFormatter = (value: any) => {
    return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const priceParser = (value: any) => {
    value = value.replace(/\$\s?|(,*)/g, '');
    if (value === '0') {
      return value;
    }
    while (value.length > 0 && value[0] === '0') {
      value = value.substr(1);
    }
    return value
  }

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
      <InputNumber className="rheostat-input" size='large' min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year0} onChange={setYear0}
      />
      <Button onClick={() => setYear0(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>

      <p>{startYear + 1}</p>
      <InputNumber className="rheostat-input" size='large' min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year1} onChange={setYear1}
      />
      <Button onClick={() => setYear1(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>

      <p>{startYear + 2}</p>
      <InputNumber className="rheostat-input" size='large' min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year2} onChange={setYear2}
      />
      <Button onClick={() => setYear2(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>

      <p>{startYear + 3}</p>
      <InputNumber className="rheostat-input" size='large' min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year3} onChange={setYear3}
      />
      <Button onClick={() => setYear3(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>

      <p>{startYear + 4}</p>
      <InputNumber className="rheostat-input" size='large' min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year4} onChange={setYear4}
      />
      <Button onClick={() => setYear4(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>

    </Modal>
  )
}

export default AmountModal;
