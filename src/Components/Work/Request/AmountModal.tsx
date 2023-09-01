import React, { useEffect, useState } from "react";
import { Modal, Button } from 'antd';
import { MaintenanceTypes, formatter } from "./RequestViewUtil";
import * as datasets from 'Config/datasets';
import { SERVER } from "Config/Server.config";
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import AmountModalField from "./AmountModalField";
import useCostDataFormattingHook from "hook/custom/useCostDataFormattingHook";
import { useAppUserState } from "hook/useAppUser";
import { useProfileState } from "hook/profileHook";
import { useProjectDispatch, useProjectState } from "hook/projectHook";

const AmountModal = ({ project, visible, setVisible }: {
  project: any,
  visible: boolean,
  setVisible: Function
}) => {
  const { board_project_id, projectData } = project;
  const projectsubtype = projectData?.code_project_type?.project_type_name;
  const {
    getComponentsByProjectId,
  } = useProjectDispatch();
  const {
    listComponents
  } = useProjectState();
  const {
    year: startYear,
    tabKey,
    namespaceId
  } = useRequestState();
  const { loadOneColumn } = useRequestDispatch();
  const isMaintenance = tabKey === 'Maintenance';
  const appUser = useProfileState();
  const [disabled, setDisabled] = useState<boolean>((appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff') && namespaceId.type === 'WORK_PLAN');
  const [requestFunding, setRequestFunding] = useState<any>(0);

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
    const send = { ...cost, isMaintenance };
    datasets.putData(
      SERVER.BOARD_PROJECT_COST(board_project_id),
      send,
      datasets.getToken()
    ).then((res: any) => {
      setCost(res.newCost);
      res.columnsChanged.forEach((columnNumber: number) => {
        loadOneColumn(columnNumber);
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

  const costDataList = useCostDataFormattingHook(tabKey, projectsubtype, startYear, board_project_id, visible);

  const getSumOfcosts = () => {
    const sumcost = [
      'req1',
      'req2',
      'req3',
      'req4',
      'req5',
      'year1',
      'year2'
    ]
    let totalSum = 0;
    for(let i = 0; i < sumcost.length; i++) {
      const key = sumcost[i];
      if (cost.hasOwnProperty(key)) {
        totalSum += cost[key];
      }
    }
    return totalSum;
  }

  useEffect(() => {
    if (tabKey === 'Capital') {
      getComponentsByProjectId(project?.project_id);
    }
  }, [project])

  useEffect(() => {
    if (tabKey === 'Capital') {
      const costComponents = listComponents?.result?.map((item: any) => {
        return item.original_cost;
      });
      const totalComponents = costComponents?.reduce((acc: any, curr: any) => acc + curr, 0);
      const costProject = cost?.projectData?.currentCost?.map((item: any) => {
        return item.cost;
      });
      const totalProject = costProject?.reduce((acc: any, curr: any) => acc + curr, 0);
      const totalIndependent = cost?.projectData?.independent_actions.map((item: any) => {
        return item.cost;
      });
      const totalIndependentCost = totalIndependent?.reduce((acc: any, curr: any) => acc + curr, 0);
      let totalCost = totalComponents + totalProject + totalIndependentCost;
      setRequestFunding(isNaN(totalCost) ? 0 : totalCost);
    }
  }, [listComponents, cost])

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
          disabled={disabled}
        >
          Save
        </Button>,
      ]}
    >
      {
        <div
          style={{
            marginBottom: '15px',
            marginTop: '-15px',
            fontWeight: 'bold'
          }}
        >
          Total Requested Funding: {formatter.format(getSumOfcosts())}
        </div>
      }
      {
        (tabKey === 'Capital') &&
        <div
          style={{
            marginBottom: '15px',
            marginTop: '-15px',
            fontWeight: 'bold'
          }}
        >
          Estimated Project Cost: {formatter.format(requestFunding)}
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
              disabled={disabled}
            />
          )
        })
      }
    </Modal>
  )
}

export default AmountModal;
