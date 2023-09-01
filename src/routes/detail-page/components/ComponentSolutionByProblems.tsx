import React from 'react';
import { Col, Row, Table, Tooltip } from 'antd';
import { useDetailedState } from 'hook/detailedHook';
import { useMapState } from 'hook/mapHook';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ComponentSolucionsByProblems = () => {
  const { detailed } = useDetailedState();
  const { componentsByProblemId: componentsOfProblems } = useMapState();
  const total = componentsOfProblems.reduce((prev: any, next: any) => prev + next.estimated_cost, 0);

  const componentSolutionData = componentsOfProblems
    ? componentsOfProblems.map((data: any, index: number) => {
        return {
          key: index,
          type: data.type,
          estimated_cost: data.estimated_cost,
          percen: data.percen,
          complete_cost: data.complete_cost,
          completepercen: Math.round((data.component_count_complete / data.component_count_total) * 100),
        };
      })
    : {};
  const totalComponents = componentsOfProblems.reduce((prev: any, next: any) => prev + next.component_count_total, 0);

  const columns = [
    {
      title: <>Actions</>,
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      sorter: (a: any, b: any) => a?.length - b?.length,
    },
    {
      title: <>Cost <Tooltip title={
        <div style={{zIndex:"1000"}}>Cost is adjusted for inflation.</div>
      }><ExclamationCircleOutlined style={{opacity:"0.4"}}/></Tooltip></>,
      dataIndex: 'estimated_cost',
      key: 'estimated_cost',
      width: '20%',
      render: (estimated_cost: number) => '$' + new Intl.NumberFormat('en-EN').format(Math.round(estimated_cost)),
      sorter: (a: any, b: any) => a?.estimated_cost - b?.estimated_cost,
    },
    {
      title: <>% Complete</>,
      dataIndex: 'completepercen',
      key: 'completepercen',
      width: '20%',
      render: (completepercen: number) => `${completepercen ? completepercen : 0}%`,
      sorter: (a: any, b: any) => a?.comletepercen - b?.completepercen,
    },
    {
      title: <>% of Total Cost</>,
      dataIndex: 'percen',
      width: '30%',
      key: 'percen',
      render: (percen: any) => `${Math.round(percen)}%`,
      sorter: (a: any, b: any) => a?.percen - b?.percen,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-header">
          <h3 className="detail-problems-component-title-header" id="component-solutions">
            PROPOSED ACTIONS
          </h3>
          <div className="detail-problems-component-header-right"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="detail-problems-component-table">
          <Table dataSource={componentsOfProblems ? componentSolutionData : {}} columns={columns} pagination={false} />
          {componentsOfProblems.length > 0 && (
            <div className="table-value-total">
              <p
                className="table-total-font table-total-adjust"
              >{`Total Proposed Cost (${totalComponents})`}</p>
              <p className='table-total-adjust'>
                ${new Intl.NumberFormat('en-EN').format(total)}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ComponentSolucionsByProblems;
