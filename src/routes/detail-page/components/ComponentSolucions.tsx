import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useDetailedState } from "hook/detailedHook";
import { useMapState } from "hook/mapHook";

const ComponentSolucions = () => {
  const {detailed} = useDetailedState();
  const {
    componentsByProblemId: componentsOfProblems
  } = useMapState()
  const dataSolution = componentsOfProblems ? componentsOfProblems.map((data:any, index: number)=> {
    return {
      key: index,
      component: data.type ? data.type : '',
      cost: data.estimated_cost? data.estimated_cost : '',
      complete: data.complete_cost ? data.complete_cost : '',
      total_cost: data.percen? data.percen : '',
      completepercen: Math.round((data.component_count_complete/data.component_count_total)*100),
    }
  }) : {};
  const total = componentsOfProblems.reduce((prev: any, next: any) => prev + next.estimated_cost, 0);
  const totalComponents = componentsOfProblems.reduce((prev: any, next: any) => prev + next.component_count_total, 0);
  const columns = [
    {
      title: <>Action</>,
      dataIndex: 'component',
      key: 'component',
      width:'30%',
      sorter: (a:any, b:any) =>  a.component.localeCompare(b.component),
    },
    {
      title: <>Cost</>,
      dataIndex: 'cost',
      key: 'cost',
      width:'20%',
      render: (estimated_cost: number) => '$' + new Intl.NumberFormat("en-EN").format(Math.round(estimated_cost)),
     sorter: (a:any, b:any) => a?.cost - b?.cost,
    },
    {
      title: <>% Complete</>,
      dataIndex: 'completepercen',
      key: 'completepercen',
     // render: (completepercen: number) => `${completepercen ? completepercen : 0}%`,
      width:'20%',
      render: (completepercen: any) => `${completepercen}%`,
      sorter: (a:any, b:any) => a?.completepercer - b?.completepercer,
    },
    {
      title: <>% of Total Cost</>,
      dataIndex: 'total_cost',
      width:'30%',
      key: 'total_cost',
      render: (percen: any) => `${Math.round(percen)}%`,
      sorter: (a:any, b:any) => a?.total_cost - b?.total_cost,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{paddingBottom:'15px', paddingTop:'20px', marginRight:'35px'}} id="component-solutions">PROPOSED ACTIONS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'74%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={componentsOfProblems ?  dataSolution : {}} columns={columns} pagination={false}/>
          {componentsOfProblems.length > 0 && <div className="value-total">
            <p className="table-total" style={{width:'calc(30% + 0px)'}}>{`Total Proposed Cost (${totalComponents})`}</p><p style={{width:'calc(20% + 0px)'}}>${new Intl.NumberFormat("en-EN").format(total)}</p>
          </div>}
        </Col>
      </Row>
    </>
  )
}

export default ComponentSolucions;