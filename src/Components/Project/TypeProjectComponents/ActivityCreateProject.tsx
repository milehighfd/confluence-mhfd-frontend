import { Select } from "antd"
import React, { useEffect, useState } from "react"
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from "moment";

export const ActivitiCreateProject = ({projectId, data}: {projectId: any, data: any}) => {
  const [historicCosts, setHistoricCosts] = useState([]);
  const [historicIndaction, setHistoricIndaction] = useState([]);
  const [historicAttachment, setHistoricAttachment] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  useEffect(() => {
    console.log('projectId',projectId);
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
    }
  } ,[projectId]);
  useEffect(() => {
    if(data !== 'no data'){
      console.log('data',data);
    }
  }, [data]);
  useEffect(() => {
    console.log('historicIndaction',historicIndaction);
  }, [historicIndaction]);
  return (
    <div className="body-project">
      {/* <label className="sub-title">Filter project activity by</label>
      <br></br>
      <Select defaultValue="Filter project activity by" style={{ width: '50%' }} onChange={() => {}}>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
      </Select> */}
      {
        historicAttachment.map((element: any) => {
          let prefix = '';
          let boldLegend = element.userModified !== null ? `${element?.userModified?.firstName} ${element?.userModified?.lastName}`: `${element?.created_by}`;
          const indaction_name = element?.attachment_reference_key;
          const dateParsed = moment(element?.last_modified_date).format('MM/DD/YY');
          return (<div className="activiti-item">
            <div>
              <p><span>{prefix}</span>{boldLegend} <span> added a new Attachment <b>({indaction_name}) </b> on {dateParsed}.</span></p>
            </div>
          </div>)
        })
      }
      {
        historicIndaction.map((element: any) => {
          let prefix = '';
          let boldLegend = `${element?.userModified?.firstName} ${element?.userModified?.lastName}`;;
          const indaction_name = element?.action_name;
          const dateParsed = moment(element?.modified_date).format('MM/DD/YY');
          return (<div className="activiti-item">
            <div>
              <p><span>{prefix}</span>{boldLegend} <span>added a new Independent Action <b>{indaction_name} </b> to {formatter.format(element.cost)} on {dateParsed}.</span></p>
            </div>
          </div>)
        })
      }
      {
        historicCosts.map((element: any) => {
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
          return (<div className="activiti-item">
            <div>
              <p><span>{prefix}</span>{boldLegend} <span>changed the <b>{code_cost_type_name} Cost</b> to {formatter.format(element.cost)} on {dateParsed}.</span></p>
            </div>
          </div>)
        })
      }
      
    </div>
  )
}
