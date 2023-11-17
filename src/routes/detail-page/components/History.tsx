import React, { useEffect, useState } from 'react';
import { Col,  Row, } from 'antd';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
const History = ({projectId}: {projectId: any}) => {
  const [editedDates] = useState(['Test']);
  const [historicCosts, setHistoricCosts] = useState([]);
  const [historicAttachment, setHistoricAttachment] = useState([]);
  const [historicProject, setHistoricProject] = useState([]);
  const [renderList, setRenderList] = useState([]);
  useEffect(() => {
    if(projectId){
      datasets.getData(SERVER.GET_HISTORIC_COSTS_BY_PROJECT(projectId)).then((historicValues)=>{
        setHistoricCosts(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_ATTACHMENT_BY_PROJECT(projectId)).then((historicValues)=>{
        console.log(historicValues);
        setHistoricAttachment(historicValues);
      });
      datasets.getData(SERVER.GET_HISTORIC_BY_PROJECT(projectId)).then((historicValues)=>{
        console.log(historicValues);
        setHistoricProject(historicValues);
      });
    }
  } ,[projectId]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
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
    const hCosts = historicCosts.map((element: any) => {
      let prefix = '';
      let boldLegend = '';
      let code_data_source_id = element?.codeSourceData?.code_data_source_type_id;
      if (!element.codeSourceData) {
        prefix = 'Missing source type attribute: ';
      } else if(code_data_source_id === 1 ) {
        if (element?.userModified) {
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
    // merge all the h arrays in listToSort and then sort it by date 
    listToSort = listToSort.concat(hProjectValues, hAttachment, hCosts);
    listToSort.sort((a: any, b: any) => b.date - a.date);
    setRenderList(listToSort);

  } ,[
    historicAttachment,
    historicCosts,
    historicProject,
  ]);
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
          renderList.map((element: any) => {
            return element.display;
          })
        }
          </ul>
        </Col>
      </Row>
    </>
  )
}

export default History;
