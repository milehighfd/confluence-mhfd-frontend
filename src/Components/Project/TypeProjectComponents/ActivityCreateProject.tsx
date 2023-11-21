import { Select } from "antd"
import React, { useEffect, useState } from "react"
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from "moment";

export const ActivitiCreateProject = ({projectId, data}: {projectId: any, data: any}) => {
  const [historicCosts, setHistoricCosts] = useState([]);
  const [historicIndaction, setHistoricIndaction] = useState([]);
  const [historicAttachment, setHistoricAttachment] = useState([]);
  const [historicDetail, setHistoricDetail] = useState([]);
  const [historicProject, setHistoricProject] = useState([]);
  const [historicProposedAction, setHistoricProposedAction] = useState([]);
  const [historicAmountCost, setHistoricAmountCost] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  useEffect(() => {
    if(projectId){
      datasets.getData(SERVER.GET_HISTORIC_COSTS_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricCosts(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_INDACTION_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricIndaction(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_ATTACHMENT_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricAttachment(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_DETAIL_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricDetail(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricProject(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_PROPOSEDACTION_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricProposedAction(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_AMOUNTCOST_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricAmountCost(historicValues);
      });
    }
  } ,[projectId]);

  const formatElement = (element:any,prefix:any, boldLegend:any, board_year:any, year:any, type_of_board:any, partner_type:any, dateParsed:any) => ({
    date: moment(element?.last_modified),
    display: (
      <div className="activiti-item">
        <div>
          <p><span>{prefix}</span><b>{boldLegend}</b> 
            <span>
              removed the {year} cost value in the {board_year} {type_of_board} Cost for {partner_type} previously at {formatter.format(element.cost)} on {dateParsed}.
            </span>
          </p>
        </div>
      </div>
    ),
  });
  const addOrUpdate = (values: any) => {
    let answer = '';
    if (values.length === 1 ) {
      answer = values[0].is_active === true ? 'added': ''
    } else if (values.length > 0) {
      const hasActive = values.filter((element: any) => element.is_active === true);
      if (hasActive.length > 0) {
        answer = 'updated';
      } else {
        answer = '';
      }
    }
    return answer;
  }
  const getRenderAddByKey = (
    key:any,
    prefix: any,
    boldLegend: any,
    yearOfChange: any, 
    boardYear: any,
    labelCodeCostType: any,
    costAdded: any,
    dateParsed: any,
    partner: any = 'MHFD Funding'
  ) => {
    let renderValue = undefined;
    if ( key === '88') { 
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix}</span><b>{boldLegend}</b> <span>added the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for MHFD Funding to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>
    } else if ( key === '11' || key === '12') {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix}</span><b>{boldLegend}</b> <span>added the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for {partner} ({ key === '11' ? 'Sponsor': 'Co-Sponsor'}) to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>
    }
    return renderValue;
  }
  const getRenderUpdateByKey = (
    key:any,
    prefix: any,
    boldLegend: any,
    yearOfChange: any, 
    boardYear: any,
    labelCodeCostType: any,
    costAdded: any,
    costUpdated: any,
    dateParsed: any,
    partner: any = 'MHFD Funding'
  ) => {
    let renderValue = undefined;
    if (key === '88') {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix}</span><b>{boldLegend}</b> <span>changed the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for MHFD Funding from {formatter.format(costUpdated)} to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>;
    } else if ( key === '11' || key === '12') {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix}</span><b>{boldLegend}</b> <span>changed the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for {partner} ({ key === '11' ? 'Sponsor': 'Co-Sponsor'}) from {formatter.format(costUpdated)} to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>
    }
    return renderValue;
  }
  const getHistoricCostRender = (historicValues: any) => {
    const hCosts = historicValues.map((element: any) => {
      let prefix = '';
      let boldLegend = '';
      let code_data_source_id = element?.codeSourceData?.code_data_source_type_id;
      if (!element.codeSourceData) {
        prefix = 'Missing source type attribute: ';
      } else if(code_data_source_id === 1 ) {
        if (element.userModified) {
          boldLegend = `${element?.userModified?.firstName} ${element?.userModified?.lastName}`;
        } else {
          boldLegend = `${element?.modified_by}`;
        }
        
      } else if (code_data_source_id === 7) {
        boldLegend = `Confluence`;
      } else if (code_data_source_id === 99) {
        prefix = 'An '
        boldLegend = `Unknown Source`;
      } else if (code_data_source_id >= 2 && code_data_source_id <= 6) {
        boldLegend = `${element?.codeSourceData?.update_source}`;
      }
      const code_cost_type_name = element?.code_cost_type?.cost_type_name;
      const dateParsed = moment(element?.last_modified).format('MM/DD/YY');
      return ({
        date: moment(element?.last_modified),
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix}</span>{boldLegend} <span>changed the <b>{code_cost_type_name} Cost</b> to {formatter.format(element.cost)} on {dateParsed}.</span></p>
        </div>
      </div>)
      })
    });
    return hCosts;
  }
  const formatElementAddOrUpdate = (valuesByReq: any, key: any, index: any) => {
    const newArrayOfHistoric: any = [];
    const typeList = addOrUpdate(valuesByReq);
    const element = valuesByReq[0];
    const dateParsed = moment(element?.last_modified).format('MM/DD/YY');
    let boldLegend = '';
    let prefix = '';
    let code_data_source_id = element?.codeSourceData?.code_data_source_type_id;
    if (!element.codeSourceData) {
      prefix = 'Missing source type attribute: ';
    } else if(code_data_source_id === 1 ) {
      if (element?.userModified) {
        boldLegend = `${element?.userModified?.firstName} ${element?.userModified?.lastName} `;
      } else {
        boldLegend = `${element?.modified_by} `;
      }
      
    } else if (code_data_source_id === 7) {
      boldLegend = `Confluence `;
    } else if (code_data_source_id === 99) {
      prefix = 'An '
      boldLegend = `Unknown Source `;
    } else if (code_data_source_id >= 2 && code_data_source_id <= 6) {
      boldLegend = `${element?.codeSourceData?.update_source}`;
    }
    const boardYear = element?.boardProjectCostData.boardProjectData.board.year;
    const yearOfChange = +boardYear + (index - 1);
    const code_cost_type_id = element?.code_cost_type_id;
    let labelCodeCostType = 'Work Request Cost';
    if (code_cost_type_id === 21 || code_cost_type_id === 41) {
      labelCodeCostType = 'Work Plan Cost';
    }
    console.log('About to add element', element, 'with', labelCodeCostType);
    if (typeList === 'added') {
      const costAdded = element.cost;
      const display = {
        date: moment(element?.last_modified),
        display: getRenderAddByKey(key, prefix,boldLegend, yearOfChange, boardYear, labelCodeCostType, costAdded, dateParsed, element?.projectPartnerData?.businessAssociateData[0].business_name)
      };
      newArrayOfHistoric.push(display);
    } else if (typeList === 'updated') {
      const previousValue = valuesByReq[1];
      const costAdded = element?.cost;
      const costUpdated = previousValue?.cost;
      const display = {
        date: moment(element?.last_modified),
        display: getRenderUpdateByKey(key, prefix, boldLegend, yearOfChange, boardYear, labelCodeCostType, costAdded, costUpdated, dateParsed, element?.projectPartnerData?.businessAssociateData[0].business_name)
      };
      newArrayOfHistoric.push(display);
    } else {
      console.log('now inserting value', typeList, element);
    }
    return newArrayOfHistoric;
  }
  const getHistoricAmountsCostRender = (historicValues: any) => {
    const newArrayOfHistoric: any = [];
    // group hictoricvalues based on projectpartnerdata group by code_partner_type_id 
    const groupedHistoricValues: any = {};
    historicValues.forEach((element: any) => {
      if (!groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id]) {
        groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id] = [];
      }
      groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id].push(element);
    });
    // group groups in historic values based on boardProjectCostData and req_position
    const groupedHistoricValuesByBoardProjectCostData: any = {};
    console.log('groupedHistoricValues', groupedHistoricValues);
    Object.keys(groupedHistoricValues).forEach((key: any) => {
      groupedHistoricValuesByBoardProjectCostData[key] = {};
      groupedHistoricValues[key].forEach((element: any) => {
        if (!groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position]) {
          groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position] = [];
        }
        groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position].push(element);
      });
    });
    console.log('groupedHistoricValuesByBoardProjectCostData', groupedHistoricValuesByBoardProjectCostData);
    const partnerKeys = Object.keys(groupedHistoricValuesByBoardProjectCostData);
    partnerKeys.forEach((partnerKey:any) => {
      if (groupedHistoricValuesByBoardProjectCostData[partnerKey]) {
        const reqsPositionsMHFDString = Object.keys(groupedHistoricValuesByBoardProjectCostData[partnerKey]);
        const reqsPositionsMHFD = reqsPositionsMHFDString.map(element => +element);
          reqsPositionsMHFD.forEach((element:any) => {
                groupedHistoricValuesByBoardProjectCostData[partnerKey][element].forEach((item:any) => {

                let boldLegend = '';
                let prefix = '';
                let code_data_source_id = item?.codeSourceData?.code_data_source_type_id;
                if (!item.codeSourceData) {
                  prefix = 'Missing source type attribute: ';
                } else if(code_data_source_id === 1 ) {
                  if (item?.userModified) {
                    boldLegend = `${item?.userModified?.firstName} ${item?.userModified?.lastName} `;
                  } else {
                    boldLegend = `${item?.modified_by}`;
                  }
                } else if (code_data_source_id === 7) {
                  boldLegend = `Confluence`;
                } else if (code_data_source_id === 99) {
                  prefix = 'An '
                  boldLegend = `Unknown Source`;
                } else if (code_data_source_id >= 2 && code_data_source_id <= 6) {
                  boldLegend = `${item?.codeSourceData?.update_source}`;
                }

                if (!item.is_active) {
                  const board_year= item.boardProjectCostData.boardProjectData.board.year;
                  const year = +board_year + (+element) - 1;
                  const type_of_board = (item.code_cost_type_id === 22 || item.code_cost_type_id === 42) ? 'Work Request' : 'Work Plan';
                  const partner_type = +partnerKey === 88 ? 'MHFD Funding' : (+partnerKey === 11 ?`${item.projectPartnerData.businessAssociateData[0].business_name} (Sponsor)` : `${item.projectPartnerData.businessAssociateData[0].business_name} (Co-Sponsor)` );
                  const dateParsed = moment(item?.last_modified).format('MM/DD/YY');
                  newArrayOfHistoric.push(formatElement(item, prefix, boldLegend, board_year, year, type_of_board, partner_type, dateParsed));
                }
              });
          });
      }
    });
    // return arrayOfHistoric;
    // ADDED 
    Object.keys(groupedHistoricValuesByBoardProjectCostData).forEach((key: any) => {
        // {first, last} added the {year} cost value in the {board year} WR/WP Cost for MHFD Funding to {y} on 10/14/23.
      for(let i = 1; i <= 5; i++) {
        const workrequestValues = groupedHistoricValuesByBoardProjectCostData[key][i] ? groupedHistoricValuesByBoardProjectCostData[key][i].filter((element: any) => element.code_cost_type_id === 22 || element.code_cost_type_id === 42) : [];
        const workplanValues = groupedHistoricValuesByBoardProjectCostData[key][i] ? groupedHistoricValuesByBoardProjectCostData[key][i].filter((element: any) => element.code_cost_type_id === 21 || element.code_cost_type_id === 41) : [];
        console.log('work request values', workrequestValues);
        console.log('work plan values', workplanValues);
        if (workrequestValues.length > 0) {
          const newValues = formatElementAddOrUpdate(workrequestValues, key, i);
          newValues.forEach((element: any) => {
            newArrayOfHistoric.push(element);
          });
        }
        if (workplanValues.length > 0) {
          const newValues = formatElementAddOrUpdate(workplanValues, key, i);
          newValues.forEach((element: any) => {
            newArrayOfHistoric.push(element);
          });
        }
      }
    });
    console.log('New Array of historic', newArrayOfHistoric);
    return newArrayOfHistoric;
  }
  useEffect(() => {
    let listToSort: any = [];
    const hProjectValues = historicProject.map((element: any) => {
      let prefix = '';
      let boldLegend = element?.userModified !== null ? `${element?.userModified?.firstName} ${element?.userModified?.lastName}`: `${element?.last_modified_by}`;
      const dateParsed = moment(element?.last_modified_date).format('MM/DD/YY');
      return ({
        date: moment(element?.last_modified_date),
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix}</span>{boldLegend} <span> modified the project on {dateParsed}.</span></p>
        </div>
      </div>)
      })
    });
    // make variables like hprojectvalues with this other ones: called historicIndaction, historicAttachment, historicCosts, historicDetail
    const hIndactionValues = historicIndaction.map((element: any) => {
      let prefix = '';
      let boldLegend = element?.userModified !== null ? `${element?.userModified?.firstName} ${element?.userModified?.lastName}`: `${element?.created_by}`;
      const indaction_name = element?.action_name;
      const dateParsed = moment(element?.modified_date).format('MM/DD/YY');
      return ({
          date: moment(element?.modified_date),
          display: (<div className="activiti-item">
          <div>
            <p><span>{prefix}</span>{boldLegend} <span>added a new Independent Action <b>{indaction_name} </b> to {formatter.format(element.cost)} on {dateParsed}.</span></p>
          </div>
        </div>)
      });
    });
    const mainproposedaction: any = historicProposedAction[0];
    let hProposedActionValues: any = [];
    if (mainproposedaction) {
    let prefix = '';
      let boldLegend = mainproposedaction?.userModified !== null ? `${mainproposedaction?.userModified?.firstName} ${mainproposedaction?.userModified?.lastName}`: `${mainproposedaction?.last_modified_by}` ;
      const dateParsed = moment(mainproposedaction?.modified_date).format('MM/DD/YY');
       hProposedActionValues = {
        date: moment(mainproposedaction?.modified_date),
        display: (<div className="activiti-item">
            <div>
              <p><span>{prefix}</span>{boldLegend} <span>modified the proposed action list on {dateParsed}.</span></p>
            </div>
          </div>)
      }
      
    }
    
    const hAttachment = historicAttachment.map((element: any) => {
      let prefix = '';
      let boldLegend = element?.userModified !== null ? `${element?.userModified?.firstName} ${element?.userModified?.lastName}`: `${element?.last_modified_by}`;
      const indaction_name = element?.attachment_reference_key;
      const dateParsed = moment(element?.last_modified_date).format('MM/DD/YY');
      return ({
        date: moment(element?.last_modified_date),
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix}</span>{boldLegend} <span> added a new Attachment <b>({indaction_name}) </b> on {dateParsed}.</span></p>
        </div>
      </div>)
      })
    });
    const hCosts = getHistoricAmountsCostRender(historicAmountCost);
    const historicCost = getHistoricCostRender(historicCosts);
    // merge all the h arrays in listToSort and then sort it by date 
    listToSort = listToSort.concat(hProjectValues, hIndactionValues, hAttachment, hCosts, historicCost, hProposedActionValues);
    listToSort.sort((a: any, b: any) => b.date - a.date);
    setRenderList(listToSort);

  } ,[
    historicAttachment,
    historicCosts,
    historicAmountCost,
    historicDetail,
    historicIndaction,
    historicProject,
    historicProposedAction
  ]);
  return (
    <div className="body-project">
      {/* <label className="sub-title">Filter project activity by</label>
      <br></br>
      <Select defaultValue="Filter project activity by" style={{ width: '50%' }} onChange={() => {}}>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
      </Select> */}
      {
        renderList.map((element: any) => {
          return element.display;
        })
      }
      
    </div>
  )
}
