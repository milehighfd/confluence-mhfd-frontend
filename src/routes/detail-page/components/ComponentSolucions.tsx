import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined } from "@ant-design/icons";

const ComponentSolucions = () => {
  const columns = [
    {
      title: <>Component</>,
      dataIndex: 'component',
      key: 'component',
      render: (component:any) => (
        <p className={"table-" + component[1]}>{component[0]}</p>
      ),
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Cost</>,
      dataIndex: 'cost',
      key: 'cost',
      render: (cost:any) => (
        <p className={"table-" + cost[1]}>{cost[0]}</p>
      ),
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
    {
      title: <>Status</>,
      dataIndex: 'status',
      key: 'status',
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
      key: 'type',
      sorter: (a:any, b:any) => a.agreement.length - b.agreement.length,
    },
  ];
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="component-solutions">COMPONENT & SOLUTIONS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px', width:'68%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-detail-modal">
          <Table dataSource={DATA_SOLUTIONS} columns={columns} />
        </Col>
      </Row>
    </>
  )
}

export default ComponentSolucions;