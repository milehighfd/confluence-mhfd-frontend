import React, { useEffect } from "react";
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
  } = useMapState();
  let totalCost = 0;
  const dataSolution = detailed?.componentCost ? detailed?.componentCost.map((data:any)=> {
    totalCost = totalCost + data.cost? data.cost : 0;
    return {
      key: data.code_cost_type_id,
      component: data.name ? data.name : 'N/A',
      cost: data.cost? '$'+data.cost : 'N/A',
      status: data.status? data.status : 'N/A',
      type: data.type? data.type : 'N/A',
    }
  }) : {};
  const columns = [
    {
      title: <>Action</>,
      dataIndex: 'component',
      key: 'component',
      with:'30%',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Cost</>,
      dataIndex: 'cost',
      key: 'cost',
      with:'20%',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Status</>,
      dataIndex: 'status',
      key: 'status',
      with:'20%',
      render: (status:any) => (
        <span className={'span-' + status}>
          {status}
        </span> 
      ),
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Solution Type</>,
      dataIndex: 'type',
      with:'30%',
      key: 'type',
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
          {detailed?.componentCost && <Table dataSource={detailed?.componentCost ?  dataSolution : {}} columns={columns} pagination={false}/>}
          <div className="value-total">
            <p className="table-total" style={{width:'calc(21.5% + 0px)'}}>Total Estimated Cost</p><p style={{width:'calc(20% + 0px)'}}>${totalCost}</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ComponentSolucions;