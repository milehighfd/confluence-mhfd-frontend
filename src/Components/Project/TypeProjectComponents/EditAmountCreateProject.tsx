import React, { useEffect, useState } from 'react';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { formatter } from 'Components/Work/Request/RequestViewUtil';
import AmountNumericInput from './AmountNumericInput';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';
import { WORK_PLAN, YEAR_LOGIC_2024 } from 'constants/constants';

const EditAmountCreateProject = ({
  index,
  type,
  project_id,
  getTotalCost,
  save,
  subType,
  sponsor
}:{
  index: number,
  type: string,
  project_id: any,
  getTotalCost: any,
  save: any,
  subType: any,
  sponsor: any
}) => {
  const {
    columns2: columns,
    year: startYear,
    tabKey,
    boardStatus,
    namespaceId,
  } = useRequestState();
  const { loadOneColumn, loadColumns } = useRequestDispatch();
  const { status, createdProject } = useProjectState();
  const { setCreatedProject, sendProjectToBoardYear } = useProjectDispatch();
  const [project, setProject] = useState<any>({})
  const [board_project_id, setBoard_project_id] = useState<any>()
  const [createData, setCreatedData] = useState<any>({})
  const isMaintenance = tabKey === 'Maintenance'
  const [completeCosts, setCompleteCosts] = useState<any>({});
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

  useEffect(() => {
    console.log(boardStatus, 'nameboardspaceId')
  },[cost])

  const handleOk = () => {
    let newCostToSend:any = [];
    if(completeCosts?.amounts) {
      newCostToSend = completeCosts?.amounts.map((x: any) => {
        if (x.business_name === 'MHFD') {
          return {
            ...x,
            values: cost
          }
        }
        return x;
      });
    } else if (Object.keys(project).length === 0){
      newCostToSend = [
          {
            business_associates_id: 4585,
            business_name: "MHFD",
            code_partner_type_id: 88,
            values: {
              req1: cost.req1,
              req2: cost.req2,
              req3: cost.req3,
              req4: cost.req4,
              req5: cost.req5
            }
          }
        ]
    }
    const newCompleteCosts = {
      ...completeCosts,
      amounts: newCostToSend
    }
    // const send = { ...cost, isMaintenance };
    const send = newCompleteCosts;
    console.log('We are sending this: ', send);
    datasets.putData(
      BOARD_PROJECT_COST(board_project_id),
      send,
      datasets.getToken()
    ).then((res: any) => {
      // setCost(res.newCost);
      res.columnsChanged.forEach((columnNumber: number) => {
        loadOneColumn(columnNumber);
      });
    })
      .catch((err: any) => {
        console.log(err);
      });
      setCreatedProject({});
    if (namespaceId.type === WORK_PLAN 
      // && boardStatus === 'Approved' && 
      // namespaceId.year >= YEAR_LOGIC_2024
    ) {
      let subTypeName = '';
      if (namespaceId.projecttype === 'Maintenance'){
        subTypeName = subType;
      }      
      const years = convertObjectToArrays(cost, namespaceId.year);
      const sendBody = {
        project_id : createData.project_data.project_id,
        year: namespaceId.year,
        extraYears: years.extraYears,
        sponsor: sponsor,        
        project_type: namespaceId.projecttype,
        extraYearsAmounts: years.extraYearsAmounts,
        subType: subTypeName,
      }
      sendProjectToBoardYear(
        sendBody.project_id,
        sendBody.year,
        sendBody.extraYears,
        sendBody.sponsor,
        sendBody.project_type,
        sendBody.extraYearsAmounts,
        sendBody.subType
      );
    }    
  };

  function convertObjectToArrays(input: any, year: number) {
    const extraYears = [];
    const extraYearsAmounts = [];
    for (let i = 1; i <= 5; i++) {
      const value = input[`req${i}`];
      if (value !== null && value !== 0) {
        extraYears.push(+year + i - 1);
        extraYearsAmounts.push(value);
      }
    }
    return { extraYears, extraYearsAmounts };
  }


  useEffect(() => {
    console.log('cost ', cost);
  } ,[cost]);
  useEffect(() => {
    console.log('Created project ', createdProject);
    if(Object.keys(createdProject).length !== 0 && Object.keys(project).length === 0){
      console.log(createdProject, 'createdProject')
      setCreatedData(createdProject)
      setBoard_project_id(createdProject?.boardProjectId?.board_project_id);
    }
  }, [createdProject]);

  useEffect(() => {
    if(save === true && board_project_id !== undefined && status === 1){
      handleOk();
    }
  }, [save, board_project_id,status]);

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
        const amountOfMHFD = res.amounts.find((x: any) => x.business_name === 'MHFD');
        setCost(amountOfMHFD.values);
        setCompleteCosts(res);
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