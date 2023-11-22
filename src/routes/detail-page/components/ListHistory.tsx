import React, { useEffect, useState } from 'react';
import { Col,  Row, } from 'antd';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
const ListHistory = ({projectId}: {projectId: any}) => {
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
    date: moment(element?.created).format('YYYY-MM-DD HH:mm:ss'),
    dateOriginal: element?.created,
    display: (
      <div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} removed the {year} cost value in the {board_year} {type_of_board} Cost for {partner_type} previously at {formatter.format(element.cost)} on {dateParsed}.
            </span>
          </p>
        </div>
      </div>
    ),
  });
  const addOrUpdate = (values: any) => {
    let answer = '';
    if (values.length === 1 ) {
      answer = values[0].is_active === true ? 'added': 'removed'
    } else if (values.length > 0) {
      const hasActive = values.filter((element: any) => element.is_active === true);
      if (hasActive.length > 0) {
        answer = 'updated';
      } else {
        answer = 'removed';
      }
    }
    return answer;
  }
  const getRenderAddByKey = (
    codePartnerId:any,
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
    if ( codePartnerId === 88) { 
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} added the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for MHFD Funding to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>
    } else if ( codePartnerId === 11 || codePartnerId === 12) {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} added the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for {partner} ({ codePartnerId === 11 ? 'Sponsor': 'Co-Sponsor'}) to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>
    }
    return renderValue;
  }
  const getRenderUpdateByKey = (
    codePartnerID:any,
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
    if (codePartnerID === 88) {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} changed the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for MHFD Funding from {formatter.format(costUpdated)} to {formatter.format(costAdded)} on {dateParsed}.</span></p>
        </div>
      </div>;
    } else if ( codePartnerID === 11 || codePartnerID === 12) {
      renderValue = <div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} changed the {yearOfChange} cost value in the {boardYear} {labelCodeCostType} for {partner} ({ codePartnerID === 11 ? 'Sponsor': 'Co-Sponsor'}) from {formatter.format(costUpdated)} to {formatter.format(costAdded)} on {dateParsed}.</span></p>
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
        date: moment(element?.last_modified).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: element?.last_modified,
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} changed the {code_cost_type_name} Cost to {formatter.format(element.cost)} on {dateParsed}.</span></p>
        </div>
      </div>)
      })
    });
    return hCosts;
  }
  const getChangedValuesToDisplay = (valuesToFormat: any, codePartnerId: any, prefix: any, boldLegend: any, dateParsed: any) => {
    const arrayHistoricValues = [];
    for(let i = 1; i < valuesToFormat.length - 1 ;++i) {
      const currentValue = valuesToFormat[i];
      const previousValue = valuesToFormat[i+1];
      const code_cost_type_id = currentValue?.code_cost_type_id;
      let labelCodeCostType = 'Work Request Cost';
      if (code_cost_type_id === 21 || code_cost_type_id === 41) {
        labelCodeCostType = 'Work Plan Cost';
      }
      const costAdded = currentValue?.cost;
      const costUpdated = previousValue?.cost;
      const currentBoardYear = currentValue?.boardProjectCostData.boardProjectData.board.year;
      const currentYearOfChange = +currentBoardYear + (i - 1);
      const display = {
        date: moment(currentValue?.created).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: currentValue?.created,
        display: getRenderUpdateByKey(codePartnerId, prefix, boldLegend, currentYearOfChange, currentBoardYear, labelCodeCostType, costAdded, costUpdated, dateParsed, currentValue?.projectPartnerData?.businessAssociateData[0].business_name)
      };
      arrayHistoricValues.push(display);
    }
    return arrayHistoricValues;
  }
  const getValuesToAddDisplay = (addValue: any, index: any, codePartnerId: any, prefix: any, boldLegend: any, labelCodeCostType: any, dateParsed: any) => {
    const costAdded = addValue.cost;
    const currentBoardYear = addValue?.boardProjectCostData.boardProjectData.board.year;
    const currentYearOfChange = +currentBoardYear + (index - 1);
    const display = {
      date: moment(addValue?.created).format('YYYY-MM-DD HH:mm:ss'),
      dateOriginal: addValue?.created,
      display: getRenderAddByKey(codePartnerId, prefix,boldLegend, currentYearOfChange, currentBoardYear, labelCodeCostType, costAdded, dateParsed, addValue?.projectPartnerData?.businessAssociateData[0].business_name)
    };
    return display;
  }
  const formatElementAddOrUpdate = (valuesByReq: any, codePartnerId: any, index: any) => {
    const newArrayOfHistoric: any = [];
    const typeList = addOrUpdate(valuesByReq);
    const valuesToFormat = [...valuesByReq];
    const element = valuesToFormat[0];
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
    if (typeList === 'added') {
      const costAdded = element.cost;
      const display = {
        date: moment(element?.created).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: element?.created,
        display: getRenderAddByKey(codePartnerId, prefix,boldLegend, yearOfChange, boardYear, labelCodeCostType, costAdded, dateParsed, element?.projectPartnerData?.businessAssociateData[0].business_name)
      };
      newArrayOfHistoric.push(display);
    } else if (typeList === 'updated') {
      const previousValue = valuesToFormat[1];
      const costAdded = element?.cost;
      const costUpdated = previousValue?.cost;
      const display = {
        date: moment(element?.created).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: element?.created,
        display: getRenderUpdateByKey(codePartnerId, prefix, boldLegend, yearOfChange, boardYear, labelCodeCostType, costAdded, costUpdated, dateParsed, element?.projectPartnerData?.businessAssociateData[0].business_name)
      };
      newArrayOfHistoric.push(display);
    } else if (typeList === 'removed') {
      const removeValue = valuesToFormat[0];
      if ( removeValue ) {
        const type_of_board = (removeValue.code_cost_type_id === 22 || removeValue.code_cost_type_id === 42) ? 'Work Request' : 'Work Plan';
        const partner_type = +codePartnerId === 88 ? 'MHFD Funding' : (+codePartnerId === 11 ?`${removeValue?.projectPartnerData?.businessAssociateData[0]?.business_name} (Sponsor)` : `${removeValue?.projectPartnerData?.businessAssociateData[0]?.business_name} (Co-Sponsor)` );
        const dateParsed = moment(removeValue?.last_modified).format('MM/DD/YY');
        newArrayOfHistoric.push(formatElement(removeValue, prefix, boldLegend, boardYear, yearOfChange, type_of_board, partner_type, dateParsed));
      } 
      if (valuesToFormat.length > 1) {
        let arrayValues = getChangedValuesToDisplay(valuesToFormat, codePartnerId, prefix, boldLegend, dateParsed);
        newArrayOfHistoric.push(...arrayValues);
      }
      const addValue = valuesToFormat[valuesToFormat.length - 1];
      if (addValue) {
        const display = getValuesToAddDisplay(addValue, index, codePartnerId, prefix, boldLegend, labelCodeCostType, dateParsed);
        newArrayOfHistoric.push(display);
      } 
    }
    return newArrayOfHistoric;
  }
  const getHistoricAmountsCostRender = (historicValues: any) => {
    const newArrayOfHistoric: any = [];
    // group hictoricvalues based on projectpartnerdata group by code_partner_type_id 
    const groupedHistoricValues: any = {};
    historicValues.forEach((element: any) => {
      if (!groupedHistoricValues[element?.projectPartnerData?.businessAssociateData[0]?.business_name]) {
        groupedHistoricValues[element?.projectPartnerData?.businessAssociateData[0]?.business_name] = [];
      }
      groupedHistoricValues[element?.projectPartnerData?.businessAssociateData[0]?.business_name].push(element);
    });
    // group groups in historic values based on boardProjectCostData and req_position
    const groupedHistoricValuesByBoardProjectCostData: any = {};
    Object.keys(groupedHistoricValues).forEach((key: any) => {
      groupedHistoricValuesByBoardProjectCostData[key] = {};
      groupedHistoricValues[key].forEach((element: any) => {
        if (!groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position]) {
          groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position] = [];
        }
        groupedHistoricValuesByBoardProjectCostData[key][element?.boardProjectCostData?.req_position].push(element);
      });
    });
    Object.keys(groupedHistoricValuesByBoardProjectCostData).forEach((key: any) => {
        // {first, last} added the {year} cost value in the {board year} WR/WP Cost for MHFD Funding to {y} on 10/14/23.
      for(let i = 1; i <= 5; i++) {
        const codePartnerTypeId = groupedHistoricValuesByBoardProjectCostData[key][i] ? groupedHistoricValuesByBoardProjectCostData[key][i][0]?.projectPartnerData?.code_partner_type_id : '';
        const workrequestValues = groupedHistoricValuesByBoardProjectCostData[key][i] ? groupedHistoricValuesByBoardProjectCostData[key][i].filter((element: any) => element.code_cost_type_id === 22 || element.code_cost_type_id === 42) : [];
        const workplanValues = groupedHistoricValuesByBoardProjectCostData[key][i] ? groupedHistoricValuesByBoardProjectCostData[key][i].filter((element: any) => element.code_cost_type_id === 21 || element.code_cost_type_id === 41) : [];
        if (workrequestValues.length > 0) {
          const newValues = formatElementAddOrUpdate(workrequestValues, codePartnerTypeId, i);
          newValues.forEach((element: any) => {
            newArrayOfHistoric.push(element);
          });
        }
        if (workplanValues.length > 0) {
          const newValues = formatElementAddOrUpdate(workplanValues, codePartnerTypeId, i);
          newValues.forEach((element: any) => {
            newArrayOfHistoric.push(element);
          });
        }
      }
    });
    return newArrayOfHistoric;
  }
  useEffect(() => {
    let listToSort: any = [];
    const hProjectValues = historicProject.map((element: any) => {
      let prefix = '';
      let boldLegend = element?.userModified !== null ? `${element?.userModified?.firstName} ${element?.userModified?.lastName}`: `${element?.last_modified_by}`;
      const dateParsed = moment(element?.modified_date).format('MM/DD/YY');
      return ({
        date: moment(element?.modified_date).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: element?.modified_date,
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} modified the project on {dateParsed}.</span></p>
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
          date: moment(element?.modified_date).format('YYYY-MM-DD HH:mm:ss'),
          dateOriginal: element?.modified_date,
          display: (<div className="activiti-item">
          <div>
            <p><span>{prefix} {boldLegend} added a new Independent Action {indaction_name}  to {formatter.format(element.cost)} on {dateParsed}.</span></p>
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
        date: moment(mainproposedaction?.modified_date).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: mainproposedaction?.modified_date,
        display: (<div className="activiti-item">
            <div>
              <p><span>{prefix} {boldLegend} modified the proposed action list on {dateParsed}.</span></p>
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
        date: moment(element?.last_modified_date).format('YYYY-MM-DD HH:mm:ss'),
        dateOriginal: element?.last_modified_date,
        display: (<div className="activiti-item">
        <div>
          <p><span>{prefix} {boldLegend} added a new Attachment ({indaction_name})  on {dateParsed}.</span></p>
        </div>
      </div>)
      })
    });
    const hCosts = getHistoricAmountsCostRender(historicAmountCost);
    const historicCost = getHistoricCostRender(historicCosts);
    // merge all the h arrays in listToSort and then sort it by date 
    listToSort = listToSort.concat(hProjectValues, hIndactionValues, hAttachment, hCosts, historicCost, hProposedActionValues);
    // listToSort.sort((a: any, b: any) => b.date - a.date);
    listToSort.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    });
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
    <div style={{marginTop:'24px'}}>
      {
        renderList.map((element: any) => {
          return element.display;
        })
      }
    </div>
  )
}

export default ListHistory;
