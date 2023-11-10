import { Select } from "antd"
import React, { useEffect, useState } from "react"
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from "moment";

export const ActivitiCreateProject = ({projectId}: {projectId: any}) => {
  const [historicCosts, setHistoricCosts] = useState([]);
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
    }
  } ,[projectId]);
  return (
    <div className="body-project">
      {/* <label className="sub-title">Filter project activity by</label>
      <br></br>
      <Select defaultValue="Filter project activity by" style={{ width: '50%' }} onChange={() => {}}>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
        <Select.Option value="Filter project activity by">Filter project activity by</Select.Option>
      </Select> */}
      {
        historicCosts.map((element: any) => {
          console.log('element', element);
          let prefix = '';
          let boldLegend = '';
          let code_data_source_id = element?.codeSourceData?.code_data_source_type_id;
          if(code_data_source_id === 1 ) {
            boldLegend = `${element?.userModified?.firstName} ${element?.userModified?.lastName}`;
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
            {/* <div>
              <p><span>{prefix}</span>{boldLegend} <span>changed the {code_cost_type_name} Cost to {formatter.format(element.cost)} on {dateParsed}.</span></p>
            </div> */}
          </div>)
        })
      }
      
    </div>
  )
}
