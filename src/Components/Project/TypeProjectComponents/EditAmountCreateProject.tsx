import React, { useEffect, useState } from 'react';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import useCostDataFormattingHook from 'hook/custom/useCostDataFormattingHook';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { formatter } from 'Components/Work/Request/RequestViewUtil';
import AmountNumericInput from './AmountNumericInput';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { BOARD_PROJECT_COST } from 'Config/endpoints/board-project';
import { BOARD_STATUS_TYPES, MHFD_ACRONYM, PMTOOLS, WORK_PLAN, YEAR_LOGIC_2024 } from 'constants/constants';
import { getBoardStatus } from 'dataFetching/workRequest';

const EditAmountCreateProject = ({
  index,
  type,
  project_id,
  getTotalCost,
  save,
  subType,
  sponsor,
  estimatedCostInput,
  originLocation,
  importedId,
  isEdit
}:{
  index: number,
  type: string,
  project_id: any,
  getTotalCost: any,
  save: any,
  subType: any,
  sponsor: any,
  estimatedCostInput: any,
  originLocation: string | undefined,
  importedId: number,
  isEdit: boolean
}) => {
  const {
    columns2: columns,
    year: startYear,
    tabKey,
    boardStatus,
    namespaceId,
    isImported
  } = useRequestState();
  const { loadOneColumn, loadColumns } = useRequestDispatch();
  const { status, createdProject, completeCosts } = useProjectState();
  const { setCreatedProject, sendProjectToBoardYear, setCompleteCosts } = useProjectDispatch();
  const [project, setProject] = useState<any>({})
  const [board_project_id, setBoard_project_id] = useState<any>()
  const [createdData, setCreatedData] = useState<any>({})
  const isMaintenance = tabKey === 'Maintenance'
  const priorFundingString = 'priorFunding';
  const [isDisabledAmountInput, setIsDisabledAmountInput] = useState<boolean>(false);
  const [amountsTouched, setAmountsTouched] = useState<any>({req1: true, req2: true, req3: true, req4: true, req5: true, req11: true, req12: true});
  // const [completeCosts, setCompleteCosts] = useState<any>({});
  const isWorkPlan = namespaceId.type === WORK_PLAN;
  const [cost, setCost] = useState<any>({
    req1: null,
    req2: null,
    req3: null,
    req4: null,
    req5: null,
    req11: null,
    req12: null,
  });

  const getSumOfcosts = () => {
    const sumcost = [
      'req1',
      'req2',
      'req3',
      'req4',
      'req5',
      'req11',
      'req12'
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

  const handleOk = (boardProjectId: number) => {
    let newCostToSend:any = [];
    const boardInfo = createdData?.boardValues ? createdData.boardValues : namespaceId;
    if(completeCosts?.amounts) {
      newCostToSend = completeCosts?.amounts.map((x: any) => {
        if (x.business_name === 'MHFD' && (boardInfo.type === WORK_PLAN ? x.code_cost_type_id ===21 : x.code_cost_type_id === 22 )) {
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
            code_cost_type_id: boardInfo.type === WORK_PLAN ? 21 : 22,
            business_associates_id: 4585,
            business_name: "MHFD",
            code_partner_type_id: 88,
            values: {
              req1: cost.req1,
              req2: cost.req2,
              req3: cost.req3,
              req4: cost.req4,
              req5: cost.req5,
              req11: cost.req11,
              req12: cost.req12
            }
          }
        ]
    }
    const filteredAmounts = newCostToSend.filter((item:any) => {
      return !(item.business_name === 'MHFD' && item.code_partner_type_id === 11);
    });
    const newCompleteCosts = {
      ...completeCosts,
      amounts: filteredAmounts,
      isMaintenance: false
    }
    // const send = { ...cost, isMaintenance };
    const sendToWorkPlan = (isEdit && isWorkPlan) || sponsor === MHFD_ACRONYM ? true : false;
    const send = {...newCompleteCosts, isWorkPlan: sendToWorkPlan, isMaintenance, amountsTouched, boardId: boardInfo};
    datasets.putData(
      BOARD_PROJECT_COST(boardProjectId),
      send,
      datasets.getToken()
    ).then((res: any) => {
      // setCost(res.newCost);
      if (originLocation !== PMTOOLS) {
        res.columnsChanged.forEach((columnNumber: number) => {
          loadOneColumn(columnNumber);
        });
      }
      if (namespaceId.type === WORK_PLAN
        && boardStatus === 'Approved' &&
        namespaceId.year >= YEAR_LOGIC_2024
      ) {
        let subTypeSend = '';
        const MhfdAmmounts = send?.amounts?.find((obj: any) => obj.code_cost_type_id === 21);
        let years: { extraYears: number[]; extraYearsAmounts: number[] } = {extraYears:[], extraYearsAmounts:[]};  
        if (namespaceId.projecttype === 'Maintenance') {
          subTypeSend = subType;
          years = convertObjectToArraysMaintenance(MhfdAmmounts?.values, namespaceId.year);
        }else{
          years = convertObjectToArrays(MhfdAmmounts?.values, namespaceId.year);
        }
        console.log(createdData)
        const sendBody = {
          project_id: createdData.project_id,
          year: namespaceId.year,
          extraYears: years.extraYears,
          sponsor,
          project_type: namespaceId.projecttype,
          extraYearsAmounts: years.extraYearsAmounts,
          subType: subTypeSend,
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
    })
      .catch((err: any) => {
        console.log(err);
      });
      setCreatedProject({});      
  };  

  function convertObjectToArraysMaintenance(obj: any, currentYear: number) {
    const extraYears = [];
    const extraYearsAmounts = [];
    const value = obj[`req1`];
    const valueYear2 = obj[`req11`];
    const valueYear3 = obj[`req12`];
    if (value !== null && value !== 0) {
      extraYears.push(+currentYear + 1 - 1);
      extraYearsAmounts.push(value);
    }
    if (valueYear2 !== null && valueYear2 !== 0) {
      extraYears.push(+currentYear + 2 - 1);
      extraYearsAmounts.push(valueYear2);
    }
    if (valueYear3 !== null && valueYear3 !== 0) {
      extraYears.push(+currentYear + 3 - 1);
      extraYearsAmounts.push(valueYear3);
    }
    return { extraYears, extraYearsAmounts };
  }

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
    if (Object.keys(createdProject).length !== 0 && Object.keys(project).length === 0) {
      setCreatedData(createdProject)
      setBoard_project_id(createdProject?.boardProjectId?.board_project_id);
    }
  }, [createdProject]);

  useEffect(() => {
    if(save === true && (board_project_id !== undefined || importedId) && status === 1){
      const boardProjectId = importedId ? importedId : board_project_id;
      handleOk(boardProjectId);
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
        const amountOfMHFD = res.amounts.find((x: any) => x.business_name === 'MHFD' && (namespaceId.type === WORK_PLAN ? x.code_cost_type_id ===21 : x.code_cost_type_id === 22 ));
        setCost(amountOfMHFD.values);
        setCompleteCosts(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [board_project_id]);


  useEffect(() => {
    if(isWorkPlan){
      if ((project_id === undefined || board_project_id === undefined) && (sponsor !== MHFD_ACRONYM)){
        setIsDisabledAmountInput(true);
      } else {
        setIsDisabledAmountInput(false);
      }
    }
  }, [project_id,board_project_id,sponsor]);

    const costDataList = useCostDataFormattingHook(tabKey, subType, startYear, board_project_id, true);

    useEffect(() => {
      if(!isWorkPlan){
        const checkStatus = async () => {
          const boards = await getBoardStatus({
            type: 'WORK_REQUEST',
            year: `${startYear}`,
            locality: sponsor
          });
          const statuses = boards.status;
          const isUnderReview = statuses === 'Under Review';
          setIsDisabledAmountInput(!isUnderReview);
        };
        checkStatus();
      }
    }, [sponsor]);

  return (
  <div className='sec-edit-amount'>
    <div className="sub-title-project">
      <h5 className="requestor-information">{index}. Edit Amount </h5>
    </div>
    <p>How much funding from MHFD is being requested for the following years:</p>
      <b>Total Requested Funding: {formatter.format(getSumOfcosts())}</b>
      <br/>
      {/* <b>Estimated Project Cost: {formatter.format(getTotalCost() ? getTotalCost() : 0)}</b> */}
      <b>Estimated Project Cost: {formatter.format(estimatedCostInput ? estimatedCostInput : 0)}</b>
    <div className='edit-amount-create-project'>
      <div className={type === 'maintenance' ?'edit-amount-content-maintenance':'edit-amount-content'}>
      {
        costDataList.map((item: any) => {
          return (
            (item.show && item.key !== priorFundingString) && 
            
            
            <div className='edit-amount' key={item.key}>
              <label className="sub-title">{item.label} </label>
              <AmountNumericInput disabled={(isDisabledAmountInput || boardStatus === BOARD_STATUS_TYPES.APPROVED) ? true: false} key={item.key} value={cost[item.key]?.toLocaleString('en-US')} onChange={(value: any) => setCost({ ...cost, [item.key]: value })} />
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