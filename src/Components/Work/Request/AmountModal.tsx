import React, { useEffect, useState } from "react";
import { Modal, Button } from 'antd';
import { MaintenanceTypes, formatter } from "./RequestViewUtil";
import * as datasets from 'Config/datasets';
import { SERVER } from "Config/Server.config";
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import AmountModalField from "./AmountModalField";
import useCostDataFormattingHook from "hook/custom/useCostDataFormattingHook";

const AmountModal = ({ project, visible, setVisible }: {
  project: any,
  visible: boolean,
  setVisible: Function
}) => {
  const { board_project_id, projectData } = project;
  const projectsubtype = projectData?.code_project_type?.project_type_name;
  const {
    year: startYear,
    tabKey,
    namespaceId
  } = useRequestState();
  const { loadOneColumn } = useRequestDispatch();
  const isMaintenance = tabKey === 'Maintenance';
  const indexProjectType = MaintenanceTypes.indexOf(projectsubtype);

  const [cost, setCost] = useState<any>({
    req1: null,
    req2: null,
    req3: null,
    req4: null,
    req5: null,
    year1: null,
    year2: null,
  });

  const handleOk = (e: any) => {
    datasets.putData(
      SERVER.BOARD_PROJECT_COST(board_project_id),
      cost
    ).then((res: any) => {
      setCost(res.newCost);
      res.columnsChanged.forEach((columnNumber: number) => {
        loadOneColumn(namespaceId, columnNumber);
      });
    })
      .catch((err: any) => {
        console.log(err);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const costDataList = useCostDataFormattingHook(tabKey, projectsubtype, startYear);

  useEffect(() => {
    if (!visible) return;
    datasets.getData(SERVER.BOARD_PROJECT_COST(board_project_id))
      .then((res: any) => {
        setCost(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [board_project_id, visible]);
  const okayDisabled = isMaintenance && indexProjectType !== -1 &&
    costDataList[indexProjectType].show && cost[`${costDataList[indexProjectType].key}`] === null;
  return (
    <Modal
      title="How much funding from MHFD is being requested for the following years:"
      centered
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="work-modal-edit"
      width="390px"
      footer={[
        <Button className="btn-transparent" onClick={handleCancel}>
          {isMaintenance ? 'Cancel' : 'Clear'}
        </Button>,
        <Button
          className="btn-purple"
          onClick={handleOk}
          disabled={okayDisabled}
        >
          Save
        </Button>,
      ]}
    >
      {
        (tabKey === 'Capital') &&
        <div
          style={{
            marginBottom: '15px',
            marginTop: '-15px',
            fontWeight: 'bold'
          }}
        >
          Estimated Project Cost: {formatter.format(projectData?.estimatedcost)}
        </div>
      }
      {
        costDataList.map((item: any) => {
          return (
            item.show &&
            <AmountModalField
              key={item.key}
              label={item.label}
              value={cost[item.key]}
              isRequired={item.isRequired}
              setter={(value: any) => setCost({ ...cost, [item.key]: value })}
            />
          )
        })
      }
    </Modal>
  )
}

export default AmountModal;
