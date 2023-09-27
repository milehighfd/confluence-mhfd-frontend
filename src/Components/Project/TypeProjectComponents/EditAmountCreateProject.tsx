import React, { useEffect, useState } from 'react';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import * as datasets from 'Config/datasets';
import { formatter } from 'Components/Work/Request/RequestViewUtil';
import AmountNumericInput from './AmountNumericInput';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';

const EditAmountCreateProject = ({
  index,
  type,
  project_id,
  getTotalCost,
  save,
  subType
}:{
  index: number,
  type: string,
  project_id: any,
  getTotalCost: any,
  save: any
  subType: any
}) => {
  const {
    columns2: columns,
    year: startYear,
    tabKey
  } = useRequestState();
  const { loadOneColumn } = useRequestDispatch();
  const { status, createdProject } = useProjectState();
  const { setCreatedProject } = useProjectDispatch();
  const [project, setProject] = useState<any>({})
  const [board_project_id, setBoard_project_id] = useState<any>()
  const isMaintenance = tabKey === 'Maintenance'
  
  const [cost, setCost] = useState<any>({
    req1: null,
    req2: null,
    req3: null,
    req4: null,
    req5: null,
    year1: null,
    year2: null,
  });

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

  const handleOk = () => {
    const send = { ...cost, isMaintenance };
    datasets.putData(
      BOARD_PROJECT_COST(board_project_id),
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
  };

  useEffect(() => {
    if(Object.keys(createdProject).length !== 0){
      setBoard_project_id(createdProject?.boardProjectId?.board_project_id);
      setCreatedProject({});
    }
  }, [createdProject]);

  useEffect(() => {
    if(save === true && board_project_id !== undefined){
      handleOk();
    }
  }, [save, board_project_id]);

  useEffect(() => {
    let dataProject: any = {};
    const results = columns.map((x: any, index: number) => {
      const row = x.projects.find((y: any) => y.project_id === project_id);
      if (row !== undefined) {
        dataProject = row;
      }
      return { column: index, index: row };
    });
    setProject(dataProject);
 }, [columns]);

  useEffect(() => {
    if(Object.keys(project).length !== 0){
      setBoard_project_id(project?.board_project_id);
    }
  }, [project]);

  useEffect(() => {
    if (board_project_id === undefined) return;
    datasets.getData(
      BOARD_PROJECT_COST(board_project_id),
      datasets.getToken()
    )
      .then((res: any) => {
        setCost(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [board_project_id]);

    const costDataList = useCostDataFormattingHook(tabKey, subType, startYear, board_project_id, true);

  return (
  <div className='sec-edit-amount'>
    <div className="sub-title-project">
      <h5 className="requestor-information">{index}. Edit Amount </h5>
    </div>
    <p>How much funding from MHFD is being requested for the following years:</p>
      <b>Total Requested Funding: {formatter.format(getSumOfcosts())}</b>
      <br/>
      <b>Estimated Project Cost: {formatter.format(getTotalCost() ? getTotalCost() : 0)}</b>
    <div className='edit-amount-create-project'>
      <div className={type === 'maintenance' ?'edit-amount-content-maintenance':'edit-amount-content'}>
      {
        costDataList.map((item: any) => {
          return (
            item.show &&
            
            
            <div className='edit-amount'>
              <label className="sub-title">{item.label} </label>
              <AmountNumericInput key={item.key} value={cost[item.key]} onChange={(value: any) => setCost({ ...cost, [item.key]: value })} />
            </div>
          )
        })
      }
        
        
        {/* <div className='edit-amount'>
          <label className="sub-title">2021 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        <div className='edit-amount'>
          <label className="sub-title">2022 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        <div className='edit-amount'>
          <label className="sub-title">2023 </label>
          <Input className='input-amount' value='$' allowClear/> 
        </div>
        {type !== 'maintenance' && <>
          <div className='edit-amount'>
            <label className="sub-title">2024 </label>
            <Input className='input-amount' value='$' allowClear/> 
          </div>
          <div className='edit-amount'>
            <label className="sub-title">2025 </label>
            <Input className='input-amount' value='$' allowClear/> 
          </div>
        </>} */}
      </div>
    </div>
  </div>
  )
};

export default EditAmountCreateProject;