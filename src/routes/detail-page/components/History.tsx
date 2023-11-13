import React, { useEffect, useState } from 'react';
import { Col,  Row, } from 'antd';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
const History = ({projectId}: {projectId: any}) => {
  const [editedDates] = useState(['Test']);
  const [historicCosts, setHistoricCosts] = useState([]);
  useEffect(() => {
    if(projectId){
      datasets.getData(SERVER.GET_HISTORIC_COSTS_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricCosts(historicValues);
      });
    }
  } ,[projectId]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="history">HISTORY</h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row className="history-detailed-layout">
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className='history-detailed-body'>
        <ul className="list-history">
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
              <p><span>{prefix}</span>{boldLegend} <span>changed the <b>{code_cost_type_name} Cost </b> to {formatter.format(element.cost)} on {dateParsed}.</span></p>
            </div>
          </div>)
        })
      }
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default History;
