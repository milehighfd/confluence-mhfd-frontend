import React, { useState } from "react";
import { Modal, Button, InputNumber } from 'antd';
import { MaintenanceTypes } from "./RequestViewUtil";
import { useProjectState } from '../../../hook/projectHook';

const AmountModal = ({ project, projectId, visible, setVisible, startYear, saveData, tabKey, projectsubtype }: {
  project: any,
  projectId: any,
  visible: boolean,
  setVisible: Function,
  startYear: number,
  saveData: Function,
  tabKey: string,
  projectsubtype: string,
}) => {
  const [year0, setYear0] = useState(project.req1);
  const [year1, setYear1] = useState(project.req2);
  const [year2, setYear2] = useState(project.req3);
  const [year3, setYear3] = useState(project.req4);
  const [year4, setYear4] = useState(project.req5);
  console.log("prOJECT", project);
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

  let showFirst = true;
  let showSecond = true;
  let showThird = true;
  let showFourth = true;
  let showFifth = true;
  if (tabKey === 'Maintenance') {
    showFirst = projectsubtype === MaintenanceTypes[0];
    showSecond = projectsubtype === MaintenanceTypes[1];
    showThird = projectsubtype === MaintenanceTypes[2];
    showFourth = projectsubtype === MaintenanceTypes[3];
    showFifth = projectsubtype === MaintenanceTypes[4];
  }

  let labels = []
  if (tabKey === 'Maintenance') {
    labels = [startYear, startYear, startYear, startYear, startYear];
  } else {
    labels = [Number(startYear), Number(startYear) + 1, Number(startYear) + 2, Number(startYear) + 3, Number(startYear) + 4]
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
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
      {
        (project.projectData.projecttype == 'Capital') && 
        <div style={{ marginBottom: '15px',marginTop: '-15px', fontWeight: 'bold'}}>Estimated Project Cost: {formatter.format(project.projectData.estimatedcost)}</div>
      }
      {
        showFirst &&
        <>
      <p>{labels[0]}</p>
      <InputNumber min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year0} onChange={setYear0}
      />
      <Button className="button-close" onClick={() => setYear0(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>
        </>
      }
      {
        showSecond &&
        <>
      <p>{labels[1]}</p>
      <InputNumber min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year1} onChange={setYear1}
      />
      <Button className="button-close" onClick={() => setYear1(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>
        </>
      }
      {
        showThird &&
        <>
      <p>{labels[2]}</p>
      <InputNumber min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year2} onChange={setYear2}
      />
      <Button className="button-close" onClick={() => setYear2(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>
        </>
      }
      {
        showFourth &&
        <>
      <p>{labels[3]}</p>
      <InputNumber  min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year3} onChange={setYear3}
      />
      <Button className="button-close" onClick={() => setYear3(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>
        </>
      }
      {
        showFifth &&
        <>
      <p>{labels[4]}</p>
      <InputNumber min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={year4} onChange={setYear4}
      />
      <Button className="button-close" onClick={() => setYear4(null)}>
        <img src="/Icons/icon-23.svg" />
      </Button>
        </>
      }
    </Modal>
  )
}

export default AmountModal;
