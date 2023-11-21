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
    }
  } ,[projectId]);

  const formatElement = (element:any, boldLegend:any, board_year:any, year:any, type_of_board:any, partner_type:any, dateParsed:any) => ({
    date: moment(element?.last_modified),
    display: (
      <div className="activiti-item">
        <div>
          <p>
            {`${boldLegend} `}
            <span>
              removed the {year} cost value in the {board_year} {type_of_board} Cost for {partner_type} previously at {element.cost} on {dateParsed}.
            </span>
          </p>
        </div>
      </div>
    ),
  });

  const getHistoricCostRender = (historicValues: any) => {
    const removedCosts:any = [];
    const arrayOfHistoric = historicCosts.map((element: any) => {
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
    console.log('Historic costs', historicValues);
    // group hictoricvalues based on projectpartnerdata group by code_partner_type_id 
    const groupedHistoricValues: any = {};
    historicValues.forEach((element: any) => {
      if (!groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id]) {
        groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id] = [];
      }
      groupedHistoricValues[element?.projectPartnerData?.code_partner_type_id].push(element);
    });
    console.log('groupedHistoricValues', groupedHistoricValues);
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
    console.log('groupedHistoricValuesByBoardProjectCostData', groupedHistoricValuesByBoardProjectCostData);
    const partnerKeys = Object.keys(groupedHistoricValuesByBoardProjectCostData);
    partnerKeys.forEach((partnerKey:any) => {
      if (groupedHistoricValuesByBoardProjectCostData[partnerKey]) {
        const reqsPositionsMHFDString = Object.keys(groupedHistoricValuesByBoardProjectCostData[partnerKey]);
        const reqsPositionsMHFD = reqsPositionsMHFDString.map(element => +element);
          reqsPositionsMHFD.forEach((element:any) => {
              groupedHistoricValuesByBoardProjectCostData[partnerKey][element].forEach((item:any) => {
                let userName = item?.modified_by;
                if(item?.userModified){
                   userName = `${item.userModified.firstName} ${item.userModified.lastName}`;
                }
                if (!item.is_active) {
                  const board_year= item.boardProjectCostData.boardProjectData.board.year;
                  const year = +board_year + (+element) - 1;
                  const type_of_board = item.code_cost_type_id === 22 || item.code_cost_type_id === 42 ? 'Work Request' : 'Work Plan';
                  const partner_type = +partnerKey === 88 ? 'MHFD Funding' : (+partnerKey === 11 ?`${item.projectPartnerData.businessAssociateData[0].business_name} (Sponsor)` : `${item.projectPartnerData.businessAssociateData[0].business_name} (Co-Sponsor)` );
                  const dateParsed = moment(item?.last_modified).format('MM/DD/YY');
                  removedCosts.push(formatElement(item, userName, board_year, year, type_of_board, partner_type, dateParsed));
                }
              });
          });
      }
    });

    console.log('removedCosts', removedCosts);
    console.log('arrayOfHistoric', arrayOfHistoric);
    return removedCosts;
    // return arrayOfHistoric;
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
    const hCosts = getHistoricCostRender(historicCosts);
    // merge all the h arrays in listToSort and then sort it by date 
    listToSort = listToSort.concat(hProjectValues, hIndactionValues, hAttachment, hCosts, hProposedActionValues);
    listToSort.sort((a: any, b: any) => b.date - a.date);
    setRenderList(listToSort);

  } ,[
    historicAttachment,
    historicCosts,
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
