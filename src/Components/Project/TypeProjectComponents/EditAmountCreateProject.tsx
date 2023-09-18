import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from "antd";
import { CloseCircleFilled } from '@ant-design/icons';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { formatter } from 'Components/Work/Request/RequestViewUtil';
import AmountNumericInput from './AmountNumericInput';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';

const EditAmountCreateProject = ({
  index,
  type,
  project_id,
  getTotalCost,
  save
}:{
  index: number,
  type: string,
  project_id: any,
  getTotalCost: any,
  save: any
}) => {
  const {
    columns2: columns,
    year: startYear,
    tabKey,
    namespaceId
  } = useRequestState();
  const { loadOneColumn } = useRequestDispatch();
  const { status, createdProject } = useProjectState();
  const { setCreatedProject } = useProjectDispatch();
  const [project, setProject] = useState<any>({})
  const [projectsubtype, setProjectsubtype] = useState<any>()
  const [board_project_id, setBoard_project_id] = useState<any>()
  const [value, setValue] = useState('');
  const isMaintenance = tabKey === 'Maintenance'

  // const projectsubtype = projectData?.code_project_type?.project_type_name;

  // const { board_project_id, projectData } = project;
  // console.log(board_project_id, 'BOARD PROJECT ID')
  
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
    console.log(send, 'SEND')
    console.log(board_project_id, 'BOARD PROJECT ID')
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
    // setVisible(false);
  };

  useEffect(() => {
    console.log(createdProject, 'CREATED PROJECT')
    console.log(columns)
  }, [createdProject]);

  useEffect(() => {
    console.log(save, 'SAVE')
    if(save === true && board_project_id !== undefined){
      handleOk();
    }
  }, [save, board_project_id]);

  useEffect(() => {
    console.log(status, 'STATUS')
  }, [status]);
  useEffect(() => {
    console.log(type, 'TYPE')
    console.log(project_id, 'PROJECT')
  }, []);

  useEffect(() => {
      console.log(columns, 'COLUMNS aaa')
    let dataProject: any = {};
    const results = columns.map((x: any, index: number) => {
      const row = x.projects.find((y: any) => y.project_id === project_id);
      if (row !== undefined) {
        dataProject = row;
      }
      return { column: index, index: row };
    });
    setProject(dataProject);
    console.log(results, 'RESULTS')
 }, [columns]);

  useEffect(() => {
    console.log(project, 'PROJECT')
    if(Object.keys(project).length !== 0){
      console.log('project',project)
      setProjectsubtype(project?.projectData?.code_project_type?.project_type_name);
      setBoard_project_id(project?.board_project_id);
    }
    
  }, [project]);

  useEffect(() => {
    if (board_project_id === undefined) return;
    datasets.getData(SERVER.BOARD_PROJECT_COST(board_project_id))
      .then((res: any) => {
        setCost(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [board_project_id]);

  useEffect(() => {
    console.log(cost, 'cost')
  }, [cost]);

    const costDataList = useCostDataFormattingHook(tabKey, projectsubtype, startYear, board_project_id, true);

    // console.log(costDataList, 'costDataList')
      
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
            // <AmountModalField
            //   key={item.key}
            //   label={item.label}
            //   value={cost[item.key]}
            //   isRequired={item.isRequired}
            //   setter={(value: any) => setCost({ ...cost, [item.key]: value })}
            //   disabled={disabled}
            // />
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