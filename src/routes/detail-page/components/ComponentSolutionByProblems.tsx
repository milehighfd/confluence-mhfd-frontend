import React, { useEffect } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDetailedState } from "hook/detailedHook";
import { useMapState } from "hook/mapHook";

const ComponentSolucionsByProblems = () => {
  const {detailed} = useDetailedState();
  const {
    componentsByProblemId: componentsOfProblems
  } = useMapState();
  let totalCost = 0;
  const total = componentsOfProblems.reduce((prev: any, next: any) => prev + next.estimated_cost, 0);
  const componentSolutionData = componentsOfProblems ? componentsOfProblems.map((data:any, index: number)=> {
    totalCost = totalCost + data.estimated_cost? data.estimated_cost : 0;
    return {
      key: index,
      type: data.type,
      estimated_cost: data.estimated_cost,
      percen: data.percen,
      complete_cost: data.complete_cost,
    }
  }) : {};
  const columns = [
    {
      title: <>Actions</>,
      dataIndex: 'type',
      key: 'type',
      width:'30%',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Cost</>,
      dataIndex: 'estimated_cost',
      key: 'estimated_cost',
      width:'20%',
      render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(Math.round(estimated_cost)),
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>% Complete</>,
      dataIndex: 'complete_cost',
      key: 'complete_cost',
      width:'20%',
      render: (complete_cost: number) => `${complete_cost ? Math.round((complete_cost/total)*100) : 0}%`,
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>% of Total Cost</>,
      dataIndex: 'percen',
      width:'30%',
      key: 'percen',
      render: (percen: any) => `${Math.round(percen)}%`,
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="component-solutions">PROPOSED ACTIONS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'68%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={componentsOfProblems ?  componentSolutionData : {}} columns={columns} pagination={false}/>
          {componentsOfProblems.length > 0 && <div className="value-total">
            <p className="table-total" style={{width:'calc(30% + 2px)'}}>Total Proposed Cost</p><p style={{width:'calc(20% + 0px)'}}>${new Intl.NumberFormat("en-EN").format(totalCost)}</p>
          </div>}
        </Col>
      </Row>
    </>
  )
}

export default ComponentSolucionsByProblems;